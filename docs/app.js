import {
  APP_INFO,
  BASIC_VOWELS,
  COMBINED_VOWELS,
  BASIC_CONSONANTS,
  EXTRA_CONSONANTS,
  LETTER_GROUPS,
  CHOSEONG_ORDER,
  JUNGSEONG_ORDER,
  CHART_INITIALS_BASIC,
  CHART_INITIALS_ALL,
  CHART_VOWELS_BASIC,
  CHART_VOWELS_ALL,
  INITIAL_ROMAN,
  VOWEL_ROMAN,
  KANA_HINTS,
  PHRASES,
  PHRASE_CATEGORIES,
  SOUND_RULES,
  STREAM_CHALLENGES,
  HOME_STEPS,
  HYPE_MESSAGES,
} from "./data.js";
import { analyzeStudyText, detectSoundTags, endsWithBatchim } from "./hangul-tools.js";

const STORAGE_KEY = "hangul-start200-state-v2";
const DEFAULT_STATE = {
  theme: "light",
  knownItems: [],
  masteredItems: [],
  favoritePhrases: [],
  quiz: {
    answered: 0,
    correct: 0,
    bestCombo: 0,
  },
  mistakes: [],
  streakDays: 0,
  lastStudyDate: "",
  voiceName: "",
  audioRate: 0.95,
  autoplayAudio: false,
  lastMode: "vowels",
};

let appState = loadState();

const ALL_VOWELS = [...BASIC_VOWELS, ...COMBINED_VOWELS];
const ALL_CONSONANTS = [...BASIC_CONSONANTS, ...EXTRA_CONSONANTS];
const LETTER_BY_ID = new Map(LETTER_GROUPS.map((item) => [item.id, item]));
const LETTER_BY_SYMBOL = new Map(LETTER_GROUPS.map((item) => [item.symbol, item]));
const STUDY_ITEMS = PHRASES.map((phrase) => enrichStudyItem(phrase));
const PHRASE_BY_ID = new Map(STUDY_ITEMS.map((phrase) => [phrase.id, phrase]));
const STUDY_TAG_ORDER = ["パッチム", "合成母音", "ㅇ", "濃音", "激音", "連音", "音変化", "会話形"];
const STUDY_TAGS = STUDY_TAG_ORDER.filter((tag) => STUDY_ITEMS.some((item) => item.tags.includes(tag)));

const runtime = {
  currentSection: "home",
  lettersFilter: "all",
  chartInitialsMode: "basic",
  chartVowelsMode: "basic",
  randomChartEntry: null,
  phraseCategory: "all",
  phraseType: "all",
  phraseTag: "all",
  phraseSearch: "",
  favoritesOnly: false,
  randomPhraseId: "",
  quizMode: appState.lastMode || "vowels",
  quizTotal: 10,
  quizDeck: [],
  quizIndex: 0,
  currentQuestion: null,
  answeredCurrent: false,
  selectedAnswerId: "",
  currentCombo: 0,
  voices: [],
  voiceStatus: "",
  streamCard: null,
  streamReveal: false,
  streamTimerRemaining: 15,
  streamTimerHandle: null,
  messageTimer: null,
};

const synthSupported = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;

const el = {
  title: document.getElementById("app-title"),
  themeToggle: document.getElementById("theme-toggle"),
  globalMessage: document.getElementById("global-message"),
  liveRegion: document.getElementById("live-region"),
  navTabs: [...document.querySelectorAll(".nav-tab")],
  pages: [...document.querySelectorAll(".page")],
  homeSteps: document.getElementById("home-steps"),
  streakDays: document.getElementById("streak-days"),
  homeAccuracy: document.getElementById("home-accuracy"),
  homeBestCombo: document.getElementById("home-best-combo"),
  homeMastered: document.getElementById("home-mastered"),
  voiceSelect: document.getElementById("voice-select"),
  rateRange: document.getElementById("rate-range"),
  rateValue: document.getElementById("rate-value"),
  autoplayAudio: document.getElementById("autoplay-audio"),
  testAudio: document.getElementById("test-audio"),
  voiceStatus: document.getElementById("voice-status"),
  dailyPhraseCard: document.getElementById("daily-phrase-card"),
  lettersGrid: document.getElementById("letters-grid"),
  letterFilterButtons: [...document.querySelectorAll("[data-letter-filter]")],
  chartInitialButtons: [...document.querySelectorAll("[data-chart-initials]")],
  chartVowelButtons: [...document.querySelectorAll("[data-chart-vowels]")],
  chartWrap: document.getElementById("chart-wrap"),
  chartRandomCard: document.getElementById("chart-random-card"),
  quizModeButtons: [...document.querySelectorAll("[data-quiz-mode]")],
  quizTotalButtons: [...document.querySelectorAll("[data-quiz-total]")],
  startQuiz: document.getElementById("start-quiz"),
  quizStage: document.getElementById("quiz-stage"),
  phraseSearch: document.getElementById("phrase-search"),
  phraseRandom: document.getElementById("phrase-random"),
  favoritesOnly: document.getElementById("toggle-favorites-only"),
  phraseTypeRow: document.getElementById("phrase-type-row"),
  phraseCategoryRow: document.getElementById("phrase-category-row"),
  phraseTagRow: document.getElementById("phrase-tag-row"),
  phraseCount: document.getElementById("phrase-count"),
  soundRuleList: document.getElementById("sound-rule-list"),
  phraseRandomCard: document.getElementById("phrase-random-card"),
  phrasesGrid: document.getElementById("phrases-grid"),
  streamStage: document.getElementById("stream-stage"),
  streamHints: document.getElementById("stream-hints"),
  newStreamMission: document.getElementById("new-stream-mission"),
  streamRandomPhrase: document.getElementById("stream-random-phrase"),
  streamRandomSyllable: document.getElementById("stream-random-syllable"),
  streamReveal: document.getElementById("stream-reveal"),
  streamAudio: document.getElementById("stream-audio"),
  streamTimer: document.getElementById("stream-timer"),
  streamTimerButtons: [...document.querySelectorAll("[data-stream-timer]")],
  stopStreamTimer: document.getElementById("stop-stream-timer"),
  progressAnswered: document.getElementById("progress-answered"),
  progressAccuracy: document.getElementById("progress-accuracy"),
  progressBestCombo: document.getElementById("progress-best-combo"),
  progressFavorites: document.getElementById("progress-favorites"),
  mistakeList: document.getElementById("mistake-list"),
  phraseCategoryStats: document.getElementById("phrase-category-stats"),
  resetProgress: document.getElementById("reset-progress"),
};

init();

function init() {
  el.title.textContent = APP_INFO.title;
  applyTheme();
  el.rateRange.value = String(appState.audioRate);
  el.rateValue.textContent = Number(appState.audioRate).toFixed(2);
  el.autoplayAudio.checked = Boolean(appState.autoplayAudio);

  bindEvents();
  renderHomeSteps();
  renderPhraseTypeButtons();
  renderPhraseCategoryButtons();
  renderPhraseTagButtons();
  renderSoundRuleList();
  renderLetters();
  renderChart();
  renderPhrases();
  renderHome();
  renderProgress();
  renderQuizControls();
  setRandomStreamMission();
  hydrateFromHash();

  if (synthSupported) {
    loadVoices();
    if (typeof window.speechSynthesis.addEventListener === "function") {
      window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    } else {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    window.setTimeout(loadVoices, 500);
  } else {
    runtime.voiceStatus = "このブラウザでは音声読み上げに対応していません。";
    renderVoiceControls();
  }
}

function bindEvents() {
  el.navTabs.forEach((button) => {
    button.addEventListener("click", () => switchSection(button.dataset.sectionTarget));
  });

  document.querySelectorAll("[data-jump-section]").forEach((button) => {
    button.addEventListener("click", () => {
      const section = button.dataset.jumpSection;
      switchSection(section);
    });
  });

  document.querySelectorAll("[data-start-quiz]").forEach((button) => {
    button.addEventListener("click", () => {
      runtime.quizMode = button.dataset.startQuiz;
      renderQuizControls();
      switchSection("quiz");
      startQuiz();
    });
  });

  window.addEventListener("hashchange", hydrateFromHash);

  el.themeToggle.addEventListener("click", () => {
    appState.theme = appState.theme === "dark" ? "light" : "dark";
    saveState();
    applyTheme();
  });

  el.voiceSelect.addEventListener("change", (event) => {
    appState.voiceName = event.target.value || "";
    saveState();
    renderVoiceControls();
  });

  el.rateRange.addEventListener("input", (event) => {
    appState.audioRate = clamp(Number(event.target.value), 0.7, 1.2);
    el.rateValue.textContent = appState.audioRate.toFixed(2);
    saveState();
  });

  el.autoplayAudio.addEventListener("change", (event) => {
    appState.autoplayAudio = event.target.checked;
    saveState();
  });

  el.testAudio.addEventListener("click", () => {
    speakText("안녕하세요");
  });

  el.letterFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      runtime.lettersFilter = button.dataset.letterFilter;
      renderLetters();
    });
  });

  el.lettersGrid.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-letter-action]");
    if (!actionButton) return;

    const { letterAction, letterId, text } = actionButton.dataset;
    if (letterAction === "speak") {
      speakText(text);
      markMastered(letterId);
      announce(`${text} を再生しました。`);
    }

    if (letterAction === "toggle-known") {
      toggleArrayItem(appState.knownItems, letterId);
      touchStudy();
      saveState();
      renderLetters();
      renderHome();
      renderProgress();
      const item = LETTER_BY_ID.get(letterId);
      announce(`${item?.symbol || "項目"} の状態を更新しました。`);
    }
  });

  el.chartInitialButtons.forEach((button) => {
    button.addEventListener("click", () => {
      runtime.chartInitialsMode = button.dataset.chartInitials;
      runtime.randomChartEntry = null;
      renderChart();
    });
  });

  el.chartVowelButtons.forEach((button) => {
    button.addEventListener("click", () => {
      runtime.chartVowelsMode = button.dataset.chartVowels;
      runtime.randomChartEntry = null;
      renderChart();
    });
  });

  el.chartWrap.addEventListener("click", (event) => {
    const cell = event.target.closest("[data-chart-syllable]");
    if (!cell) return;
    const syllable = cell.dataset.chartSyllable;
    const masteryId = cell.dataset.masteryId;
    speakText(syllable);
    markMastered(masteryId);
  });

  el.chartRandomCard.addEventListener("click", (event) => {
    const action = event.target.closest("[data-chart-random-action]");
    if (!action) return;
    if (action.dataset.chartRandomAction === "reroll") {
      runtime.randomChartEntry = pickRandomChartEntry();
      renderChartRandomCard();
      return;
    }
    if (action.dataset.chartRandomAction === "speak") {
      if (runtime.randomChartEntry) {
        speakText(runtime.randomChartEntry.syllable);
        markMastered(runtime.randomChartEntry.masteryId);
      }
    }
  });

  el.quizModeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      runtime.quizMode = button.dataset.quizMode;
      renderQuizControls();
    });
  });

  el.quizTotalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      runtime.quizTotal = Number(button.dataset.quizTotal) || 10;
      renderQuizControls();
    });
  });

  el.startQuiz.addEventListener("click", startQuiz);

  el.quizStage.addEventListener("click", (event) => {
    const answerButton = event.target.closest("[data-answer-id]");
    if (answerButton) {
      handleAnswer(answerButton.dataset.answerId);
      return;
    }

    const quizAction = event.target.closest("[data-quiz-action]");
    if (!quizAction) return;
    const action = quizAction.dataset.quizAction;

    if (action === "replay" && runtime.currentQuestion?.audioText) {
      speakText(runtime.currentQuestion.audioText);
    }

    if (action === "next") {
      goToNextQuestion();
    }

    if (action === "restart") {
      startQuiz();
    }
  });

  document.addEventListener("keydown", handleQuizHotkeys);

  el.phraseSearch.addEventListener("input", (event) => {
    runtime.phraseSearch = event.target.value.trim();
    renderPhrases();
  });

  el.phraseRandom.addEventListener("click", () => {
    runtime.randomPhraseId = pickRandom(STUDY_ITEMS)?.id || "";
    renderPhraseRandomCard();
  });

  el.favoritesOnly.addEventListener("click", () => {
    runtime.favoritesOnly = !runtime.favoritesOnly;
    el.favoritesOnly.classList.toggle("is-active", runtime.favoritesOnly);
    renderPhrases();
  });

  el.phraseTypeRow.addEventListener("click", (event) => {
    const button = event.target.closest("[data-phrase-type]");
    if (!button) return;
    runtime.phraseType = button.dataset.phraseType;
    renderPhraseTypeButtons();
    renderPhrases();
  });

  el.phraseCategoryRow.addEventListener("click", (event) => {
    const button = event.target.closest("[data-phrase-category]");
    if (!button) return;
    runtime.phraseCategory = button.dataset.phraseCategory;
    renderPhraseCategoryButtons();
    renderPhrases();
  });

  el.phraseTagRow.addEventListener("click", (event) => {
    const button = event.target.closest("[data-phrase-tag]");
    if (!button) return;
    runtime.phraseTag = button.dataset.phraseTag;
    renderPhraseTagButtons();
    renderPhrases();
  });

  [el.phrasesGrid, el.dailyPhraseCard, el.phraseRandomCard].forEach((node) => {
    node.addEventListener("click", handlePhraseAction);
  });

  el.newStreamMission.addEventListener("click", setRandomStreamMission);
  el.streamRandomPhrase.addEventListener("click", setRandomStreamPhrase);
  el.streamRandomSyllable.addEventListener("click", setRandomStreamSyllable);
  el.streamReveal.addEventListener("click", () => {
    runtime.streamReveal = true;
    renderStreamCard();
  });
  el.streamAudio.addEventListener("click", () => {
    if (runtime.streamCard?.audioText) {
      speakText(runtime.streamCard.audioText);
    } else {
      announce("このミッションには音声がありません。ランダムカードかランダム文字を選んでください。", 2600);
    }
  });

  el.streamTimerButtons.forEach((button) => {
    button.addEventListener("click", () => {
      startStreamTimer(Number(button.dataset.streamTimer) || 15);
    });
  });
  el.stopStreamTimer.addEventListener("click", stopStreamTimer);

  el.resetProgress.addEventListener("click", () => {
    const ok = window.confirm("学習記録をリセットします。よろしいですか？");
    if (!ok) return;
    appState = cloneDefaultState();
    saveState();
    stopStreamTimer();
    runtime.currentCombo = 0;
    runtime.quizDeck = [];
    runtime.currentQuestion = null;
    runtime.answeredCurrent = false;
    runtime.selectedAnswerId = "";
    runtime.randomPhraseId = "";
    renderAll();
    announce("学習記録をリセットしました。", 2600);
  });
}

function handlePhraseAction(event) {
  const actionButton = event.target.closest("[data-phrase-action]");
  if (!actionButton) return;
  const phraseId = actionButton.dataset.phraseId;
  const phrase = PHRASE_BY_ID.get(phraseId);
  if (!phrase) return;

  const action = actionButton.dataset.phraseAction;
  if (action === "speak") {
    speakText(phrase.learningText);
    markMastered(`phrase:${phrase.id}`);
    return;
  }

  if (action === "shadow") {
    speakRepeated(phrase.learningText, 3);
    markMastered(`phrase:${phrase.id}`);
    announce(`${phrase.learningText} を3回シャドーイングします。`, 2400);
    return;
  }

  if (action === "favorite") {
    toggleArrayItem(appState.favoritePhrases, phrase.id);
    saveState();
    renderPhrases();
    renderHome();
    renderProgress();
    announce(`${phrase.learningText} のお気に入り状態を更新しました。`);
  }
}

function handleQuizHotkeys(event) {
  if (runtime.currentSection !== "quiz" || !runtime.currentQuestion) return;

  if (["1", "2", "3", "4"].includes(event.key) && !runtime.answeredCurrent) {
    const option = runtime.currentQuestion.options[Number(event.key) - 1];
    if (option) {
      handleAnswer(option.id);
      event.preventDefault();
    }
  }

  if (event.key === " ") {
    if (runtime.currentQuestion.audioText) {
      speakText(runtime.currentQuestion.audioText);
      event.preventDefault();
    }
  }

  if (event.key === "Enter" && runtime.answeredCurrent) {
    goToNextQuestion();
    event.preventDefault();
  }
}

function hydrateFromHash() {
  const raw = window.location.hash.replace(/^#/, "");
  const section = ["home", "letters", "chart", "quiz", "phrases", "stream", "progress"].includes(raw)
    ? raw
    : "home";
  switchSection(section, false);
}

function switchSection(sectionId, updateHash = true) {
  runtime.currentSection = sectionId;
  el.pages.forEach((page) => {
    page.classList.toggle("is-active", page.id === sectionId);
  });
  el.navTabs.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.sectionTarget === sectionId);
  });
  if (updateHash) {
    window.location.hash = sectionId;
  }
}

function renderAll() {
  applyTheme();
  renderVoiceControls();
  renderPhraseTypeButtons();
  renderPhraseCategoryButtons();
  renderPhraseTagButtons();
  renderSoundRuleList();
  renderHome();
  renderLetters();
  renderChart();
  renderPhrases();
  renderQuizControls();
  renderQuizStage();
  renderStreamCard();
  renderProgress();
}

function renderHomeSteps() {
  el.homeSteps.innerHTML = HOME_STEPS.map((step) => {
    return `
      <article class="step-card">
        <strong>${escapeHtml(step.step)}</strong>
        <div>${escapeHtml(step.title)}</div>
        <div class="muted">${escapeHtml(step.detail)}</div>
      </article>
    `;
  }).join("");
}

function renderHome() {
  const answered = appState.quiz.answered;
  const accuracy = answered === 0 ? 0 : Math.round((appState.quiz.correct / answered) * 100);

  el.streakDays.textContent = String(appState.streakDays || 0);
  el.homeAccuracy.textContent = `${accuracy}%`;
  el.homeBestCombo.textContent = String(appState.quiz.bestCombo || 0);
  el.homeMastered.textContent = String(new Set([...appState.knownItems, ...appState.masteredItems]).size);

  const dailyPhrase = getDailyPhrase();
  el.dailyPhraseCard.innerHTML = buildPhraseCardHTML(dailyPhrase, {
    compact: true,
    highlight: true,
  });

  renderVoiceControls();
}

function renderVoiceControls() {
  if (!synthSupported) {
    el.voiceSelect.innerHTML = `<option>音声非対応</option>`;
    el.voiceSelect.disabled = true;
    el.voiceStatus.textContent = runtime.voiceStatus;
    return;
  }

  const voices = runtime.voices;
  const selected = getSelectedVoice();
  const options = voices.length
    ? voices
        .map((voice) => {
          const isSelected = selected && selected.name === voice.name;
          const label = `${voice.name} (${voice.lang})`;
          return `<option value="${escapeAttribute(voice.name)}" ${isSelected ? "selected" : ""}>${escapeHtml(label)}</option>`;
        })
        .join("")
    : `<option>音声を読み込み中...</option>`;

  el.voiceSelect.innerHTML = options;
  el.voiceSelect.disabled = !voices.length;
  el.voiceStatus.textContent = runtime.voiceStatus;
}

function renderLetters() {
  setActiveButtons(el.letterFilterButtons, runtime.lettersFilter, "letterFilter");
  const items = getFilteredLetters();

  if (!items.length) {
    el.lettersGrid.innerHTML = `<div class="empty-state panel">表示できる文字がありません。</div>`;
    return;
  }

  el.lettersGrid.innerHTML = items
    .map((item) => {
      const known = appState.knownItems.includes(item.id);
      const mastered = appState.masteredItems.includes(item.id);
      return `
        <article class="letter-card ${known ? "is-known" : ""}">
          <div class="letter-top">
            <span class="symbol-badge">${escapeHtml(item.group)}</span>
            <span class="meta-pill">${known ? "覚えた" : mastered ? "クイズ正解済み" : "学習中"}</span>
          </div>
          <div class="letter-symbol">${escapeHtml(item.symbol)}</div>
          <div class="letter-reading">${escapeHtml(item.roman)} / ${escapeHtml(item.hint)}</div>
          <div class="muted">${escapeHtml(item.name)} ・ 例: ${escapeHtml(item.example)} (${escapeHtml(item.exampleRoman)})</div>
          <div>${escapeHtml(item.tip)}</div>
          <div class="card-actions">
            <button class="small-btn" type="button" data-letter-action="speak" data-letter-id="${escapeAttribute(item.id)}" data-text="${escapeAttribute(item.example)}">🔊 発音</button>
            <button class="small-btn" type="button" data-letter-action="toggle-known" data-letter-id="${escapeAttribute(item.id)}">${known ? "✅ 覚えた" : "☑ 覚えたにする"}</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderChart() {
  setActiveButtons(el.chartInitialButtons, runtime.chartInitialsMode, "chartInitials");
  setActiveButtons(el.chartVowelButtons, runtime.chartVowelsMode, "chartVowels");

  const initials = runtime.chartInitialsMode === "all" ? CHART_INITIALS_ALL : CHART_INITIALS_BASIC;
  const vowels = runtime.chartVowelsMode === "all" ? CHART_VOWELS_ALL : CHART_VOWELS_BASIC;
  const rows = initials.map((initial) => buildChartRow(initial, vowels));

  el.chartWrap.innerHTML = `
    <table class="study-table">
      <thead>
        <tr>
          <th><div class="table-header">子音 / 母音</div></th>
          ${vowels
            .map((vowel) => {
              const letter = LETTER_BY_SYMBOL.get(vowel);
              return `
                <th>
                  <div class="table-header">${escapeHtml(vowel)}<span>${escapeHtml(VOWEL_ROMAN[vowel])} / ${escapeHtml(letter?.hint || "")}</span></div>
                </th>
              `;
            })
            .join("")}
        </tr>
      </thead>
      <tbody>
        ${rows
          .map((row) => {
            const rowLetter = LETTER_BY_SYMBOL.get(row.initial);
            return `
              <tr>
                <th>
                  <div class="table-row-label">${escapeHtml(row.initial)}<span>${escapeHtml(INITIAL_ROMAN[row.initial] || "(silent)")} / ${escapeHtml(rowLetter?.hint || "")}</span></div>
                </th>
                ${row.entries
                  .map((entry) => {
                    return `
                      <td>
                        <button class="table-cell" type="button" data-chart-syllable="${escapeAttribute(entry.syllable)}" data-mastery-id="${escapeAttribute(entry.masteryId)}">
                          <strong>${escapeHtml(entry.syllable)}</strong>
                          <span>${escapeHtml(entry.roman)}</span>
                        </button>
                      </td>
                    `;
                  })
                  .join("")}
              </tr>
            `;
          })
          .join("")}
      </tbody>
    </table>
  `;

  if (!runtime.randomChartEntry) {
    runtime.randomChartEntry = pickRandomChartEntry();
  }
  renderChartRandomCard();
}

function renderChartRandomCard() {
  const entry = runtime.randomChartEntry || pickRandomChartEntry();
  runtime.randomChartEntry = entry;
  if (!entry) {
    el.chartRandomCard.innerHTML = `<div class="empty-state">表示できる文字がありません。</div>`;
    return;
  }

  el.chartRandomCard.innerHTML = `
    <div class="random-card">
      <div class="card-meta">
        <span class="category-pill">ランダム文字</span>
        <span class="meta-pill">${escapeHtml(entry.initial)} + ${escapeHtml(entry.vowel)}</span>
      </div>
      <div class="stream-main">${escapeHtml(entry.syllable)}</div>
      <div class="stream-sub">${escapeHtml(entry.roman)} / ${escapeHtml(KANA_HINTS[entry.vowel] || "")}</div>
      <div class="card-actions">
        <button class="small-btn" type="button" data-chart-random-action="speak">🔊 再生</button>
        <button class="small-btn" type="button" data-chart-random-action="reroll">🎲 もう一回</button>
      </div>
    </div>
  `;
}

function renderQuizControls() {
  setActiveButtons(el.quizModeButtons, runtime.quizMode, "quizMode");
  setActiveButtons(el.quizTotalButtons, String(runtime.quizTotal), "quizTotal");
}

function startQuiz() {
  appState.lastMode = runtime.quizMode;
  saveState();

  const pool = createQuestionPool(runtime.quizMode);
  if (!pool.length) {
    el.quizStage.innerHTML = `<div class="empty-state">このモードの問題を作れませんでした。</div>`;
    return;
  }

  runtime.quizDeck = shuffle(pool).slice(0, Math.min(runtime.quizTotal, pool.length));
  runtime.quizIndex = 0;
  runtime.currentQuestion = runtime.quizDeck[0];
  runtime.answeredCurrent = false;
  runtime.selectedAnswerId = "";
  runtime.currentCombo = 0;
  renderQuizStage();
  if (runtime.currentQuestion?.audioText && (runtime.quizMode === "audio" || appState.autoplayAudio)) {
    queueAutoplay(runtime.currentQuestion.audioText);
  }
}

function renderQuizStage() {
  if (!runtime.currentQuestion) {
    renderQuizSummary();
    return;
  }

  const question = runtime.currentQuestion;
  const index = runtime.quizIndex + 1;
  const total = runtime.quizDeck.length;
  const answered = appState.quiz.answered;
  const accuracy = answered === 0 ? 0 : Math.round((appState.quiz.correct / answered) * 100);

  const resultMarkup = runtime.answeredCurrent
    ? `
        <div class="quiz-footer">
          <div class="result-pill ${runtime.selectedAnswerId === question.correctId ? "correct" : "wrong"}">
            ${runtime.selectedAnswerId === question.correctId ? "✅ 正解" : "❌ ちがいます"}
          </div>
          <div>${escapeHtml(question.explanation)}</div>
          <div class="card-actions">
            ${question.audioText ? `<button class="small-btn" type="button" data-quiz-action="replay">🔊 もう一回聞く</button>` : ""}
            <button class="primary" type="button" data-quiz-action="next">${index === total ? "結果を見る" : "次の問題へ"}</button>
          </div>
        </div>
      `
    : `<div class="quiz-footer"><div class="muted">${escapeHtml(question.tip)}</div></div>`;

  el.quizStage.innerHTML = `
    <article class="quiz-card">
      <div class="quiz-topbar">
        <span class="progress-pill">${index} / ${total}</span>
        <div class="quiz-stats">
          <span class="combo-pill">🔥 コンボ ${runtime.currentCombo}</span>
          <span class="progress-pill">正答率 ${accuracy}%</span>
        </div>
      </div>
      <div class="quiz-main">
        <p class="eyebrow">${escapeHtml(question.ask)}</p>
        <div class="${escapeAttribute(question.mainClass)}">${escapeHtml(question.main)}</div>
        ${question.sub ? `<div class="quiz-main-text">${escapeHtml(question.sub)}</div>` : ""}
      </div>
      <div class="card-actions">
        ${question.audioText ? `<button class="small-btn" type="button" data-quiz-action="replay">🔊 音声を聞く</button>` : ""}
      </div>
      <div class="answer-grid">
        ${question.options
          .map((option, optionIndex) => {
            const isCorrect = runtime.answeredCurrent && option.id === question.correctId;
            const isWrong = runtime.answeredCurrent && option.id === runtime.selectedAnswerId && option.id !== question.correctId;
            return `
              <button
                class="answer-btn ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}"
                type="button"
                data-answer-id="${escapeAttribute(option.id)}"
                ${runtime.answeredCurrent ? "disabled" : ""}
              >
                <strong>${optionIndex + 1}. ${escapeHtml(option.label)}</strong>
                <small>${escapeHtml(option.detail || "")}</small>
              </button>
            `;
          })
          .join("")}
      </div>
      ${resultMarkup}
    </article>
  `;
}

function renderQuizSummary() {
  const total = runtime.quizDeck.length;
  if (!total) {
    el.quizStage.innerHTML = `<div class="empty-state">モードを選んで「この設定で始める」を押してください。</div>`;
    return;
  }

  const correct = runtime.quizDeck.filter((question) => question.wasCorrect).length;
  const rate = Math.round((correct / total) * 100);
  const masteredNow = runtime.quizDeck.filter((question) => question.wasCorrect).length;

  el.quizStage.innerHTML = `
    <article class="quiz-card">
      <div class="quiz-main">
        <p class="eyebrow">クイズ終了</p>
        <div class="quiz-main-hangul">${rate}%</div>
        <div class="quiz-main-text">${correct} / ${total} 問 正解</div>
      </div>
      <div class="card-actions-stack">
        <div class="result-pill correct">今回覚えた項目: ${masteredNow}</div>
        <div class="muted">まちがえた項目は進捗ページに記録してあります。次は同じモードでも、別モードでもOKです。</div>
      </div>
      <div class="card-actions">
        <button class="primary" type="button" data-quiz-action="restart">もう一度このモードで挑戦</button>
      </div>
    </article>
  `;
}

function handleAnswer(answerId) {
  if (!runtime.currentQuestion || runtime.answeredCurrent) return;
  const question = runtime.currentQuestion;
  const isCorrect = answerId === question.correctId;
  runtime.answeredCurrent = true;
  runtime.selectedAnswerId = answerId;

  question.wasCorrect = isCorrect;
  appState.quiz.answered += 1;
  if (isCorrect) {
    appState.quiz.correct += 1;
    runtime.currentCombo += 1;
    appState.quiz.bestCombo = Math.max(appState.quiz.bestCombo, runtime.currentCombo);
    if (question.masteryId) {
      markMastered(question.masteryId, false);
    }
    announce(pickRandom(HYPE_MESSAGES), 1800);
  } else {
    runtime.currentCombo = 0;
    recordMistake(question.mistakeLabel || `${question.main} → ${question.correctLabel}`);
    announce("間違えても大丈夫。音をもう一回聞いてから次へ。", 2200);
  }

  touchStudy();
  saveState();
  renderQuizStage();
  renderHome();
  renderProgress();
}

function goToNextQuestion() {
  if (!runtime.currentQuestion) return;
  runtime.quizIndex += 1;
  runtime.selectedAnswerId = "";
  runtime.answeredCurrent = false;

  if (runtime.quizIndex >= runtime.quizDeck.length) {
    runtime.currentQuestion = null;
    renderQuizStage();
    return;
  }

  runtime.currentQuestion = runtime.quizDeck[runtime.quizIndex];
  renderQuizStage();
  if (runtime.currentQuestion.audioText && (runtime.quizMode === "audio" || appState.autoplayAudio)) {
    queueAutoplay(runtime.currentQuestion.audioText);
  }
}


function renderPhraseTypeButtons() {
  const types = [
    { id: "all", label: "全部" },
    { id: "phrase", label: "フレーズ" },
    { id: "word", label: "単語" },
  ];
  el.phraseTypeRow.innerHTML = types
    .map((type) => {
      const isActive = runtime.phraseType === type.id;
      return `<button class="chip ${isActive ? "is-active" : ""}" type="button" data-phrase-type="${escapeAttribute(type.id)}">${escapeHtml(type.label)}</button>`;
    })
    .join("");
}

function renderPhraseCategoryButtons() {
  const categories = ["all", ...PHRASE_CATEGORIES];
  el.phraseCategoryRow.innerHTML = categories
    .map((category) => {
      const isActive = runtime.phraseCategory === category;
      const label = category === "all" ? "全部" : category;
      return `<button class="chip ${isActive ? "is-active" : ""}" type="button" data-phrase-category="${escapeAttribute(category)}">${escapeHtml(label)}</button>`;
    })
    .join("");
}

function renderPhraseTagButtons() {
  const tags = ["all", ...STUDY_TAGS];
  el.phraseTagRow.innerHTML = tags
    .map((tag) => {
      const isActive = runtime.phraseTag === tag;
      const label = tag === "all" ? "音の特徴: 全部" : tag;
      return `<button class="chip ${isActive ? "is-active" : ""}" type="button" data-phrase-tag="${escapeAttribute(tag)}">${escapeHtml(label)}</button>`;
    })
    .join("");
}

function renderSoundRuleList() {
  el.soundRuleList.innerHTML = SOUND_RULES.map((rule) => {
    return `
      <article class="sound-rule-card">
        <strong>${escapeHtml(rule.title)}</strong>
        <div class="muted">${escapeHtml(rule.detail)}</div>
      </article>
    `;
  }).join("");
}

function renderPhrases() {
  el.favoritesOnly.classList.toggle("is-active", runtime.favoritesOnly);
  const phrases = getFilteredPhrases();
  const activeFilters = [
    runtime.phraseType !== "all" ? (runtime.phraseType === "word" ? "単語のみ" : "フレーズのみ") : "",
    runtime.phraseCategory !== "all" ? runtime.phraseCategory : "",
    runtime.phraseTag !== "all" ? runtime.phraseTag : "",
    runtime.favoritesOnly ? "★のみ" : "",
  ].filter(Boolean);
  el.phraseCount.textContent = `${phrases.length} / ${STUDY_ITEMS.length} 件${activeFilters.length ? ` ・ ${activeFilters.join(" / ")}` : ""}`;
  renderPhraseRandomCard();

  if (!phrases.length) {
    el.phrasesGrid.innerHTML = `<div class="empty-state panel">条件に合うカードがありません。</div>`;
    return;
  }

  el.phrasesGrid.innerHTML = phrases.map((phrase) => buildPhraseCardHTML(phrase)).join("");
}

function renderPhraseRandomCard() {
  if (!runtime.randomPhraseId) {
    el.phraseRandomCard.classList.add("hidden");
    el.phraseRandomCard.innerHTML = "";
    return;
  }
  const phrase = PHRASE_BY_ID.get(runtime.randomPhraseId);
  if (!phrase) {
    el.phraseRandomCard.classList.add("hidden");
    el.phraseRandomCard.innerHTML = "";
    return;
  }
  el.phraseRandomCard.classList.remove("hidden");
  el.phraseRandomCard.innerHTML = `
    <div class="card-meta">
      <span class="category-pill">ランダム1枚</span>
      <span class="meta-pill">${escapeHtml(phrase.category)} / ${escapeHtml(phrase.type === "word" ? "単語" : "フレーズ")}</span>
    </div>
    ${buildPhraseCardHTML(phrase, { compact: false, highlight: true })}
  `;
}

function renderStreamCard() {
  if (!runtime.streamCard) {
    setRandomStreamMission();
    return;
  }

  const card = runtime.streamCard;
  const revealedText = runtime.streamReveal ? card.reveal : "答えはまだ非表示です。視聴者に予想してもらってから表示。";

  el.streamStage.innerHTML = `
    <article class="stream-card">
      <div>
        <div class="card-meta">
          <span class="category-pill">${escapeHtml(card.tag)}</span>
          <span class="meta-pill">${escapeHtml(card.title)}</span>
        </div>
        <div class="stream-main">${escapeHtml(card.main)}</div>
        <div class="stream-sub">${escapeHtml(card.sub)}</div>
      </div>
      <div class="card-actions-stack">
        <div class="random-card">${escapeHtml(revealedText)}</div>
      </div>
    </article>
  `;

  const phraseFavorites = appState.favoritePhrases.length;
  el.streamHints.innerHTML = `
    <div class="random-card">視聴者向けひとこと: 「意味だけ先に見せて、コメントで予想してもらおう」</div>
    <div class="random-card">現在のベストコンボ: ${appState.quiz.bestCombo}</div>
    <div class="random-card">お気に入りカード数: ${phraseFavorites}</div>
  `;
}

function setRandomStreamMission() {
  const mission = pickRandom(STREAM_CHALLENGES);
  runtime.streamReveal = false;
  runtime.streamCard = {
    kind: "mission",
    title: mission.title,
    tag: mission.tag,
    main: mission.title,
    sub: mission.detail,
    reveal: "そのまま画面を見せて、まずは企画として宣言すると盛り上がります。",
    audioText: "",
  };
  renderStreamCard();
}

function setRandomStreamPhrase() {
  const phrase = pickRandom(STUDY_ITEMS);
  runtime.streamReveal = false;
  runtime.streamCard = {
    kind: "phrase",
    title: phrase.type === "word" ? "ランダム単語" : "ランダムカード",
    tag: `${phrase.category} / ${phrase.type === "word" ? "単語" : "フレーズ"}`,
    main: phrase.learningText,
    sub: phrase.meaning,
    reveal: `${phrase.displayReading} / ${phrase.soundNotes[0] || phrase.meaning}`,
    audioText: phrase.learningText,
  };
  renderStreamCard();
}

function setRandomStreamSyllable() {
  const entry = pickRandom(getChartEntries(CHART_INITIALS_BASIC, CHART_VOWELS_BASIC));
  runtime.streamReveal = false;
  runtime.streamCard = {
    kind: "syllable",
    title: "ランダム文字",
    tag: `${entry.initial} + ${entry.vowel}`,
    main: entry.syllable,
    sub: "まずは自分で読んでみる → 視聴者に予想してもらう",
    reveal: `${entry.roman} / ${KANA_HINTS[entry.vowel] || ""}`,
    audioText: entry.syllable,
  };
  renderStreamCard();
}

function startStreamTimer(seconds) {
  stopStreamTimer();
  runtime.streamTimerRemaining = seconds;
  el.streamTimer.textContent = String(runtime.streamTimerRemaining);
  runtime.streamTimerHandle = window.setInterval(() => {
    runtime.streamTimerRemaining -= 1;
    el.streamTimer.textContent = String(Math.max(runtime.streamTimerRemaining, 0));
    if (runtime.streamTimerRemaining <= 0) {
      stopStreamTimer();
      announce("タイムアップ！ コメント読みや答え合わせに切り替えましょう。", 2800);
    }
  }, 1000);
}

function stopStreamTimer() {
  if (runtime.streamTimerHandle) {
    window.clearInterval(runtime.streamTimerHandle);
    runtime.streamTimerHandle = null;
  }
  el.streamTimer.textContent = String(runtime.streamTimerRemaining || 15);
}

function renderProgress() {
  const answered = appState.quiz.answered;
  const accuracy = answered === 0 ? 0 : Math.round((appState.quiz.correct / answered) * 100);
  el.progressAnswered.textContent = String(answered);
  el.progressAccuracy.textContent = `${accuracy}%`;
  el.progressBestCombo.textContent = String(appState.quiz.bestCombo);
  el.progressFavorites.textContent = String(appState.favoritePhrases.length);

  if (!appState.mistakes.length) {
    el.mistakeList.innerHTML = `<div class="muted">まだ記録はありません。クイズで間違えた項目がここに表示されます。</div>`;
  } else {
    el.mistakeList.innerHTML = appState.mistakes
      .map((item) => {
        return `<div class="mistake-item">${escapeHtml(item.label)}<div class="muted">${escapeHtml(item.at)}</div></div>`;
      })
      .join("");
  }

  el.phraseCategoryStats.innerHTML = `
    <div class="category-list">
      ${PHRASE_CATEGORIES.map((category) => {
        const total = STUDY_ITEMS.filter((phrase) => phrase.category === category).length;
        const favorites = STUDY_ITEMS.filter(
          (phrase) => phrase.category === category && appState.favoritePhrases.includes(phrase.id)
        ).length;
        const mastered = STUDY_ITEMS.filter(
          (phrase) => phrase.category === category && appState.masteredItems.includes(`phrase:${phrase.id}`)
        ).length;
        return `
          <div class="category-bar">
            <strong>${escapeHtml(category)}</strong>
            <span class="muted">${mastered}/${total} 学習済み ・ ★${favorites}</span>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function createQuestionPool(mode) {
  switch (mode) {
    case "vowels":
      return buildLetterQuestions(ALL_VOWELS, "この母音の音は？");
    case "consonants":
      return buildLetterQuestions(ALL_CONSONANTS, "この子音の音は？");
    case "syllables":
      return buildSyllableQuestions();
    case "audio":
      return buildAudioQuestions();
    case "phrases":
      return buildPhraseQuestions();
    default:
      return [];
  }
}

function buildLetterQuestions(items, ask) {
  return items.map((item) => {
    const distractors = sampleWithout(
      items.filter((candidate) => candidate.id !== item.id),
      3
    );
    const options = shuffle([
      { id: item.id, label: item.roman, detail: item.hint },
      ...distractors.map((candidate) => ({ id: candidate.id, label: candidate.roman, detail: candidate.hint })),
    ]);
    return {
      id: `question-${item.id}`,
      ask,
      main: item.symbol,
      mainClass: "quiz-main-hangul",
      sub: `${item.name} / ${item.group}`,
      options,
      correctId: item.id,
      correctLabel: `${item.roman} / ${item.hint}`,
      explanation: `${item.symbol} は ${item.roman}。${item.tip}`,
      tip: `まず見て答え、次に 🔊 で確認すると定着しやすいです。`,
      audioText: item.example,
      masteryId: item.id,
      mistakeLabel: `${item.symbol} → ${item.roman}`,
    };
  });
}

function buildSyllableQuestions() {
  const entries = getChartEntries(CHART_INITIALS_BASIC, CHART_VOWELS_BASIC);
  return entries.map((entry) => {
    const distractors = sampleWithout(entries.filter((candidate) => candidate.id !== entry.id), 3);
    const options = shuffle([
      { id: entry.id, label: entry.roman, detail: `${entry.initial} + ${entry.vowel}` },
      ...distractors.map((candidate) => ({
        id: candidate.id,
        label: candidate.roman,
        detail: `${candidate.initial} + ${candidate.vowel}`,
      })),
    ]);
    return {
      id: `question-${entry.id}`,
      ask: "この組み合わせの読みは？",
      main: entry.syllable,
      mainClass: "quiz-main-hangul",
      sub: `${entry.initial} + ${entry.vowel}`,
      options,
      correctId: entry.id,
      correctLabel: entry.roman,
      explanation: `${entry.syllable} は ${entry.roman}。${entry.initial} と ${entry.vowel} の組み合わせです。`,
      tip: "行と列を意識して見ると覚えやすいです。",
      audioText: entry.syllable,
      masteryId: entry.masteryId,
      mistakeLabel: `${entry.syllable} → ${entry.roman}`,
    };
  });
}

function buildAudioQuestions() {
  const entries = getChartEntries(CHART_INITIALS_BASIC, CHART_VOWELS_BASIC);
  return entries.map((entry) => {
    const distractors = sampleWithout(entries.filter((candidate) => candidate.id !== entry.id), 3);
    const options = shuffle([
      { id: entry.id, label: entry.syllable, detail: entry.roman },
      ...distractors.map((candidate) => ({ id: candidate.id, label: candidate.syllable, detail: candidate.roman })),
    ]);
    return {
      id: `audio-${entry.id}`,
      ask: "音を聞いて正しい文字を選んでください",
      main: "🔊",
      mainClass: "quiz-main-hangul",
      sub: "再生ボタンかスペースキーで音を確認できます。",
      options,
      correctId: entry.id,
      correctLabel: entry.syllable,
      explanation: `正解は ${entry.syllable}。読みは ${entry.roman} です。`,
      tip: "最初は見た目で予想してから音を聞いてもOKです。",
      audioText: entry.syllable,
      masteryId: entry.masteryId,
      mistakeLabel: `音声 ${entry.syllable} (${entry.roman})`,
    };
  });
}

function buildPhraseQuestions() {
  return STUDY_ITEMS.map((phrase, index) => {
    const quizText = phrase.learningText;
    const detailText = phrase.spoken ? `基本形: ${phrase.hangul}` : phrase.displayReading;
    const meaningDirection = index % 2 === 0;
    if (meaningDirection) {
      const distractors = sampleWithout(STUDY_ITEMS.filter((candidate) => candidate.id !== phrase.id), 3);
      const options = shuffle([
        { id: phrase.id, label: quizText, detail: detailText },
        ...distractors.map((candidate) => ({
          id: candidate.id,
          label: candidate.learningText,
          detail: candidate.spoken ? `基本形: ${candidate.hangul}` : candidate.displayReading,
        })),
      ]);
      return {
        id: `phrase-q-${phrase.id}`,
        ask: "この意味に合う韓国語は？",
        main: phrase.meaning,
        mainClass: "quiz-main-text",
        sub: `${phrase.category} / ${phrase.type === "word" ? "単語" : "フレーズ"}`,
        options,
        correctId: phrase.id,
        correctLabel: quizText,
        explanation: `${quizText} = ${phrase.meaning} / ${phrase.soundNotes[0] || phrase.displayReading}`,
        tip: phrase.type === "word" ? "単語は会話形も一緒に覚えると話しやすくなります。" : "意味 → ハングル → 音声 の順で見ると覚えやすいです。",
        audioText: phrase.learningText,
        masteryId: `phrase:${phrase.id}`,
        mistakeLabel: `${phrase.meaning} → ${quizText}`,
      };
    }

    const distractors = sampleWithout(STUDY_ITEMS.filter((candidate) => candidate.id !== phrase.id), 3);
    const options = shuffle([
      { id: phrase.id, label: phrase.meaning, detail: `${phrase.category} / ${phrase.type === "word" ? "単語" : "フレーズ"}` },
      ...distractors.map((candidate) => ({
        id: candidate.id,
        label: candidate.meaning,
        detail: `${candidate.category} / ${candidate.type === "word" ? "単語" : "フレーズ"}`,
      })),
    ]);
    return {
      id: `phrase-q-${phrase.id}`,
      ask: "このハングルの意味は？",
      main: quizText,
      mainClass: "quiz-main-hangul",
      sub: detailText,
      options,
      correctId: phrase.id,
      correctLabel: phrase.meaning,
      explanation: `${quizText} = ${phrase.meaning} / ${phrase.soundNotes[0] || phrase.displayReading}`,
      tip: "音を聞いてから意味を確認すると、会話ごと覚えやすくなります。",
      audioText: phrase.learningText,
      masteryId: `phrase:${phrase.id}`,
      mistakeLabel: `${quizText} → ${phrase.meaning}`,
    };
  });
}

function buildChartRow(initial, vowels) {
  return {
    initial,
    entries: vowels.map((vowel) => createChartEntry(initial, vowel)),
  };
}

function getChartEntries(initials, vowels) {
  const entries = [];
  initials.forEach((initial) => {
    vowels.forEach((vowel) => {
      entries.push(createChartEntry(initial, vowel));
    });
  });
  return entries;
}

function createChartEntry(initial, vowel) {
  const syllable = composeSyllable(initial, vowel);
  const roman = `${INITIAL_ROMAN[initial] || ""}${VOWEL_ROMAN[vowel] || ""}`;
  return {
    id: `${initial}-${vowel}`,
    initial,
    vowel,
    syllable,
    roman,
    masteryId: `syllable:${syllable}`,
  };
}

function composeSyllable(initial, vowel) {
  const initialIndex = CHOSEONG_ORDER.indexOf(initial);
  const vowelIndex = JUNGSEONG_ORDER.indexOf(vowel);
  if (initialIndex < 0 || vowelIndex < 0) return "";
  const codePoint = 0xac00 + initialIndex * 21 * 28 + vowelIndex * 28;
  return String.fromCodePoint(codePoint);
}

function getFilteredLetters() {
  switch (runtime.lettersFilter) {
    case "vowels-basic":
      return BASIC_VOWELS;
    case "vowels-combined":
      return COMBINED_VOWELS;
    case "consonants-basic":
      return BASIC_CONSONANTS;
    case "consonants-extra":
      return EXTRA_CONSONANTS;
    case "known":
      return LETTER_GROUPS.filter((item) => appState.knownItems.includes(item.id));
    case "all":
    default:
      return LETTER_GROUPS;
  }
}


function getFilteredPhrases() {
  const keyword = runtime.phraseSearch.toLowerCase();
  return STUDY_ITEMS.filter((phrase) => {
    const categoryPass = runtime.phraseCategory === "all" || phrase.category === runtime.phraseCategory;
    const typePass = runtime.phraseType === "all" || phrase.type === runtime.phraseType;
    const tagPass = runtime.phraseTag === "all" || phrase.tags.includes(runtime.phraseTag);
    const favoritePass = !runtime.favoritesOnly || appState.favoritePhrases.includes(phrase.id);
    const keywordPass =
      !keyword ||
      [
        phrase.hangul,
        phrase.learningText,
        phrase.meaning,
        phrase.category,
        phrase.type,
        phrase.baseRoman,
        phrase.roman,
        phrase.spokenRoman,
        phrase.displayReading,
        phrase.hearingText,
        phrase.example || "",
        phrase.exampleMeaning || "",
        phrase.tags.join(" "),
        phrase.soundNotes.join(" "),
      ]
        .join(" ")
        .toLowerCase()
        .includes(keyword);
    return categoryPass && typePass && tagPass && favoritePass && keywordPass;
  });
}

function buildPhraseCardHTML(phrase, options = {}) {
  const favorite = appState.favoritePhrases.includes(phrase.id);
  const typeLabel = phrase.type === "word" ? "単語" : "フレーズ";
  const highlightClass = options.highlight ? "is-highlight" : "";
  const compact = Boolean(options.compact);
  const tags = phrase.tags.filter((tag) => !["フレーズ", "単語"].includes(tag)).slice(0, 5);
  const mainHangul = phrase.learningText || phrase.hangul;

  return `
    <article class="phrase-card ${favorite ? "is-favorite" : ""} ${highlightClass}">
      <div class="phrase-top">
        <span class="category-pill">${escapeHtml(phrase.category)}</span>
        <span class="meta-pill">${favorite ? "★ お気に入り" : escapeHtml(typeLabel)}</span>
      </div>
      <div class="phrase-hangul">${escapeHtml(mainHangul)}</div>
      ${phrase.spoken ? `<div class="spoken-pill">辞書の形: <strong>${escapeHtml(phrase.hangul)}</strong> → 会話でよく使う形: <strong>${escapeHtml(phrase.spoken)}</strong></div>` : ""}
      <div class="phrase-meaning">${escapeHtml(phrase.meaning)}</div>
      <div class="phrase-reading">alphabet: ${escapeHtml(phrase.displayReading || phrase.roman)}</div>
      ${phrase.spokenRoman && phrase.spokenRoman !== phrase.roman ? `<div class="muted">sound: ${escapeHtml(phrase.spokenRoman)} / ${escapeHtml(phrase.hearingText || phrase.learningText)}</div>` : ""}
      ${tags.length ? `<div class="tag-pill-row">${tags.map((tag) => `<span class="tag-pill">${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
      ${compact ? `<div class="muted">${escapeHtml(phrase.soundNotes[0] || "部品どおりにゆっくり読めばOKです。")}</div>` : buildPhraseDetailHTML(phrase)}
      <div class="card-actions">
        <button class="small-btn" type="button" data-phrase-action="speak" data-phrase-id="${escapeAttribute(phrase.id)}">🔊 再生</button>
        <button class="small-btn" type="button" data-phrase-action="shadow" data-phrase-id="${escapeAttribute(phrase.id)}">🎤 3回シャドー</button>
        <button class="small-btn" type="button" data-phrase-action="favorite" data-phrase-id="${escapeAttribute(phrase.id)}">${favorite ? "★ 外す" : "☆ お気に入り"}</button>
      </div>
    </article>
  `;
}

function buildPhraseDetailHTML(phrase) {
  return `
    <details class="phrase-details">
      <summary>音の部品を見る</summary>
      <div class="phrase-detail-stack">
        <div class="detail-line">
          <strong>今読む形</strong>
          <span>${escapeHtml(phrase.learningText)} / ${escapeHtml(phrase.spokenRoman || phrase.roman)}</span>
        </div>
        ${phrase.spoken ? `<div class="detail-line"><strong>辞書の形</strong><span>${escapeHtml(phrase.hangul)} / ${escapeHtml(phrase.baseRoman)}</span></div>` : ""}
        ${phrase.spoken ? `<div class="detail-block"><strong>会話でこう変わる</strong><div>${escapeHtml(phrase.hangul)} → ${escapeHtml(phrase.spoken)}</div><div class="muted">まず辞書の形を見て、次に会話形を声に出すと話し言葉ごと覚えやすくなります。</div></div>` : ""}
        <div class="detail-block">
          <strong>今読む形の部品</strong>
          <div class="sound-chip-grid">
            ${phrase.study.syllables.map((syllable) => `
              <div class="sound-chip">
                <strong>${escapeHtml(syllable.syllable)}</strong>
                <span>${escapeHtml(syllable.jamoText)}</span>
                <small>${escapeHtml(`${syllable.latinText} = ${syllable.roman}`)}</small>
              </div>
            `).join("")}
          </div>
        </div>
        ${phrase.spoken ? `<div class="detail-block"><strong>辞書の形の部品</strong><div class="sound-chip-grid">${phrase.baseStudy.syllables.map((syllable) => `
            <div class="sound-chip">
              <strong>${escapeHtml(syllable.syllable)}</strong>
              <span>${escapeHtml(syllable.jamoText)}</span>
              <small>${escapeHtml(`${syllable.latinText} = ${syllable.roman}`)}</small>
            </div>
          `).join("")}</div></div>` : ""}
        <div class="detail-block">
          <strong>なぜそう聞こえる？</strong>
          <ul class="detail-list">
            ${phrase.soundNotes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
          </ul>
        </div>
        ${buildPhraseExampleHTML(phrase)}
      </div>
    </details>
  `;
}

function buildPhraseExampleHTML(phrase) {
  if (!phrase.example) return "";
  return `
    <div class="detail-block">
      <strong>ひとこと練習</strong>
      <div class="example-hangul">${escapeHtml(phrase.example)}</div>
      <div class="muted">${escapeHtml(phrase.exampleMeaning || "")}</div>
    </div>
  `;
}

function getDailyPhrase() {
  const today = getTodayKey();
  const index = [...today].reduce((sum, char) => sum + char.charCodeAt(0), 0) % STUDY_ITEMS.length;
  return STUDY_ITEMS[index];
}



function enrichStudyItem(item) {
  const learningText = item.spoken || item.hangul;
  const baseStudy = analyzeStudyText(item.hangul);
  const study = analyzeStudyText(learningText);
  const generatedExample = getGeneratedWordExample(item);
  const soundNotes = uniqueStrings([
    ...study.notes,
    item.customNote || "",
    study.spokenText !== learningText ? `会話では ${study.spokenText} に近く聞こえることがあります。` : "",
    !study.notes.length && !item.customNote ? "特別な音変化は少ないので、部品どおりにゆっくり読めばOKです。" : "",
  ]);

  return {
    ...item,
    learningText,
    baseRoman: baseStudy.writtenRoman,
    roman: study.writtenRoman,
    spokenRoman: study.spokenRoman,
    displayReading: study.syllables.map((syllable) => syllable.roman).join(" · "),
    hearingText: study.spokenText !== learningText ? study.spokenText : "",
    baseStudy,
    study,
    soundNotes,
    tags: uniqueStrings([
      ...detectSoundTags(item.hangul, baseStudy, { type: item.type }),
      ...detectSoundTags(learningText, study, { type: item.type, spoken: item.spoken }),
    ]),
    example: item.example || generatedExample.text,
    exampleMeaning: item.exampleMeaning || generatedExample.meaning,
  };
}

function getGeneratedWordExample(item) {
  if (item.type !== "word" || item.category !== "基本単語") {
    return { text: "", meaning: "" };
  }
  const copula = endsWithBatchim(item.hangul) ? "이에요" : "예요";
  return {
    text: `${item.hangul}${copula}`,
    meaning: `${item.meaning}です`,
  };
}

function uniqueStrings(values) {
  return [...new Set(values.filter(Boolean))];
}

function loadVoices() {
  if (!synthSupported) return;
  const voices = window.speechSynthesis.getVoices();
  runtime.voices = [...voices].sort((a, b) => a.name.localeCompare(b.name, "ja"));

  if (!appState.voiceName) {
    const preferred = getPreferredVoice(runtime.voices);
    if (preferred) {
      appState.voiceName = preferred.name;
      saveState();
    }
  }

  const selected = getSelectedVoice();
  runtime.voiceStatus = selected
    ? `使用音声: ${selected.name} (${selected.lang})`
    : "韓国語音声が見つからないため、既定の音声で再生します。";
  renderVoiceControls();
}

function getPreferredVoice(voices) {
  return (
    voices.find((voice) => voice.lang.toLowerCase().startsWith("ko")) ||
    voices.find((voice) => /korean|한국/i.test(voice.name)) ||
    voices[0] ||
    null
  );
}

function getSelectedVoice() {
  if (!runtime.voices.length) return null;
  return runtime.voices.find((voice) => voice.name === appState.voiceName) || getPreferredVoice(runtime.voices);
}

function speakText(text, options = {}) {
  if (!synthSupported) {
    announce("このブラウザでは音声を再生できません。", 2400);
    return;
  }
  if (!text) return;

  const utterance = buildUtterance(text, options.rate ?? appState.audioRate);
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
  touchStudy();
  saveState();
  renderHome();
  renderProgress();
}

function speakRepeated(text, times = 3) {
  if (!synthSupported || !text) return;
  window.speechSynthesis.cancel();
  let count = 0;
  const speakNext = () => {
    if (count >= times) return;
    count += 1;
    const utterance = buildUtterance(text, appState.audioRate);
    utterance.onend = () => {
      window.setTimeout(speakNext, 350);
    };
    window.speechSynthesis.speak(utterance);
  };
  speakNext();
  touchStudy();
  saveState();
  renderHome();
  renderProgress();
}

function buildUtterance(text, rate = 0.95) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ko-KR";
  utterance.rate = clamp(Number(rate) || 0.95, 0.7, 1.2);
  const voice = getSelectedVoice();
  if (voice) utterance.voice = voice;
  return utterance;
}

function queueAutoplay(text) {
  window.setTimeout(() => {
    if (runtime.currentSection === "quiz" && runtime.currentQuestion?.audioText === text) {
      speakText(text);
    }
  }, 180);
}

function markMastered(id, shouldRender = true) {
  if (!id) return;
  if (!appState.masteredItems.includes(id)) {
    appState.masteredItems.push(id);
  }
  touchStudy();
  saveState();
  if (shouldRender) {
    renderHome();
    renderProgress();
  }
}

function recordMistake(label) {
  const timestamp = new Date().toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  appState.mistakes.unshift({ label, at: timestamp });
  appState.mistakes = appState.mistakes.slice(0, 12);
}

function touchStudy() {
  const today = getTodayKey();
  if (!appState.lastStudyDate) {
    appState.lastStudyDate = today;
    appState.streakDays = 1;
    return;
  }

  if (appState.lastStudyDate === today) return;

  const yesterday = getRelativeDayKey(-1);
  if (appState.lastStudyDate === yesterday) {
    appState.streakDays += 1;
  } else {
    appState.streakDays = 1;
  }
  appState.lastStudyDate = today;
}

function applyTheme() {
  document.documentElement.dataset.theme = appState.theme;
  el.themeToggle.textContent = appState.theme === "dark" ? "☀ ライト" : "🌙 ダーク";
}

function cloneDefaultState() {
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

function loadState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return cloneDefaultState();
    const parsed = JSON.parse(raw);
    return {
      ...cloneDefaultState(),
      ...parsed,
      knownItems: Array.isArray(parsed.knownItems) ? parsed.knownItems : [],
      masteredItems: Array.isArray(parsed.masteredItems) ? parsed.masteredItems : [],
      favoritePhrases: Array.isArray(parsed.favoritePhrases) ? parsed.favoritePhrases : [],
      mistakes: Array.isArray(parsed.mistakes) ? parsed.mistakes : [],
      quiz: {
        ...cloneDefaultState().quiz,
        ...(parsed.quiz || {}),
      },
    };
  } catch {
    return cloneDefaultState();
  }
}

function saveState() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
}

function announce(message, duration = 1800) {
  el.liveRegion.textContent = message;
  el.globalMessage.textContent = message;
  if (runtime.messageTimer) {
    window.clearTimeout(runtime.messageTimer);
  }
  runtime.messageTimer = window.setTimeout(() => {
    el.globalMessage.textContent = "";
  }, duration);
}

function toggleArrayItem(array, value) {
  const index = array.indexOf(value);
  if (index >= 0) {
    array.splice(index, 1);
  } else {
    array.push(value);
  }
}

function setActiveButtons(buttons, activeValue, datasetSuffix) {
  buttons.forEach((button) => {
    const key = button.dataset[datasetSuffix];
    button.classList.toggle("is-active", String(key) === String(activeValue));
  });
}

function sampleWithout(items, count) {
  return shuffle([...items]).slice(0, Math.min(count, items.length));
}

function shuffle(items) {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function pickRandom(items) {
  if (!items.length) return null;
  return items[Math.floor(Math.random() * items.length)];
}

function pickRandomChartEntry() {
  const initials = runtime.chartInitialsMode === "all" ? CHART_INITIALS_ALL : CHART_INITIALS_BASIC;
  const vowels = runtime.chartVowelsMode === "all" ? CHART_VOWELS_ALL : CHART_VOWELS_BASIC;
  return pickRandom(getChartEntries(initials, vowels));
}

function getTodayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function getRelativeDayKey(offset) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}
