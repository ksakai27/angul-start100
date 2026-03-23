import {
  CHOSEONG_ORDER,
  JUNGSEONG_ORDER,
  INITIAL_ROMAN,
  VOWEL_ROMAN,
} from "./data.js";

export const JONGSEONG_ORDER = [
  "",
  "ㄱ",
  "ㄲ",
  "ㄳ",
  "ㄴ",
  "ㄵ",
  "ㄶ",
  "ㄷ",
  "ㄹ",
  "ㄺ",
  "ㄻ",
  "ㄼ",
  "ㄽ",
  "ㄾ",
  "ㄿ",
  "ㅀ",
  "ㅁ",
  "ㅂ",
  "ㅄ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

const COMBINED_VOWELS = new Set(["ㅐ", "ㅒ", "ㅔ", "ㅖ", "ㅘ", "ㅙ", "ㅚ", "ㅝ", "ㅞ", "ㅟ", "ㅢ"]);
const DOUBLE_CONSONANTS = new Set(["ㄲ", "ㄸ", "ㅃ", "ㅆ", "ㅉ"]);
const ASPIRATED_CONSONANTS = new Set(["ㅋ", "ㅌ", "ㅍ", "ㅊ"]);
const SIMPLE_CODA_TO_ONSET = {
  "ㄱ": "ㄱ",
  "ㄲ": "ㄲ",
  "ㅋ": "ㅋ",
  "ㄴ": "ㄴ",
  "ㄷ": "ㄷ",
  "ㅌ": "ㅌ",
  "ㄹ": "ㄹ",
  "ㅁ": "ㅁ",
  "ㅂ": "ㅂ",
  "ㅍ": "ㅍ",
  "ㅅ": "ㅅ",
  "ㅆ": "ㅆ",
  "ㅇ": "ㅇ",
  "ㅈ": "ㅈ",
  "ㅊ": "ㅊ",
  "ㅎ": "ㅎ",
};

export const FINAL_ROMAN = {
  "": "",
  "ㄱ": "k",
  "ㄲ": "k",
  "ㄳ": "k",
  "ㄴ": "n",
  "ㄵ": "n",
  "ㄶ": "n",
  "ㄷ": "t",
  "ㄹ": "l",
  "ㄺ": "k",
  "ㄻ": "m",
  "ㄼ": "l",
  "ㄽ": "l",
  "ㄾ": "l",
  "ㄿ": "p",
  "ㅀ": "l",
  "ㅁ": "m",
  "ㅂ": "p",
  "ㅄ": "p",
  "ㅅ": "t",
  "ㅆ": "t",
  "ㅇ": "ng",
  "ㅈ": "t",
  "ㅊ": "t",
  "ㅋ": "k",
  "ㅌ": "t",
  "ㅍ": "p",
  "ㅎ": "t",
};

export function isHangulSyllable(char) {
  if (!char) return false;
  const codePoint = char.codePointAt(0);
  return codePoint >= 0xac00 && codePoint <= 0xd7a3;
}

export function composeHangulSyllable(onset, vowel, coda = "") {
  const onsetIndex = CHOSEONG_ORDER.indexOf(onset);
  const vowelIndex = JUNGSEONG_ORDER.indexOf(vowel);
  const codaIndex = JONGSEONG_ORDER.indexOf(coda);
  if (onsetIndex < 0 || vowelIndex < 0 || codaIndex < 0) return "";
  const codePoint = 0xac00 + onsetIndex * 21 * 28 + vowelIndex * 28 + codaIndex;
  return String.fromCodePoint(codePoint);
}

export function decomposeHangulSyllable(char) {
  if (!isHangulSyllable(char)) return null;
  const syllableIndex = char.codePointAt(0) - 0xac00;
  const onset = CHOSEONG_ORDER[Math.floor(syllableIndex / (21 * 28))];
  const vowel = JUNGSEONG_ORDER[Math.floor((syllableIndex % (21 * 28)) / 28)];
  const coda = JONGSEONG_ORDER[syllableIndex % 28];
  return {
    type: "syllable",
    syllable: char,
    onset,
    vowel,
    coda,
    onsetRoman: INITIAL_ROMAN[onset] || "",
    vowelRoman: VOWEL_ROMAN[vowel] || "",
    codaRoman: FINAL_ROMAN[coda] || "",
  };
}

export function splitHangulText(text) {
  return [...String(text || "")].map((char) => {
    const syllable = decomposeHangulSyllable(char);
    if (syllable) return syllable;
    return { type: "raw", value: char };
  });
}

function cloneTokens(tokens) {
  return tokens.map((token) => {
    if (token.type === "raw") return { ...token };
    return { ...token };
  });
}

function tokenToRoman(token) {
  if (token.type === "raw") return token.value;
  return `${INITIAL_ROMAN[token.onset] || ""}${VOWEL_ROMAN[token.vowel] || ""}${FINAL_ROMAN[token.coda] || ""}`;
}

function syncSyllableValue(token) {
  if (token.type !== "syllable") return token;
  token.syllable = composeHangulSyllable(token.onset, token.vowel, token.coda);
  token.onsetRoman = INITIAL_ROMAN[token.onset] || "";
  token.vowelRoman = VOWEL_ROMAN[token.vowel] || "";
  token.codaRoman = FINAL_ROMAN[token.coda] || "";
  return token;
}

function buildPairLabel(left, right) {
  return `${left.syllable}${right.syllable}`;
}

function addUniqueNote(notes, text) {
  if (!text) return;
  if (!notes.includes(text)) notes.push(text);
}

function applyPronunciationRules(tokens) {
  const working = cloneTokens(tokens);
  const notes = [];

  for (let index = 0; index < working.length - 1; index += 1) {
    const current = working[index];
    const next = working[index + 1];
    if (current.type !== "syllable" || next.type !== "syllable") continue;

    const pair = buildPairLabel(current, next);
    const { coda } = current;
    const { onset, vowel } = next;

    if (!coda) continue;

    if (["ㄷ", "ㅌ"].includes(coda) && onset === "ㅇ" && vowel === "ㅣ") {
      current.coda = "";
      next.onset = coda === "ㄷ" ? "ㅈ" : "ㅊ";
      syncSyllableValue(current);
      syncSyllableValue(next);
      addUniqueNote(notes, `${pair}: 받침 ${coda} と ㅣ が近づいて、${next.syllable} のような音になりやすいです。`);
      continue;
    }

    if (coda === "ㅎ" && onset === "ㅇ") {
      current.coda = "";
      syncSyllableValue(current);
      addUniqueNote(notes, `${pair}: 받침 ㅎ が弱くなりやすく、息の音が薄く聞こえます。`);
      continue;
    }

    if (onset === "ㅇ" && SIMPLE_CODA_TO_ONSET[coda]) {
      current.coda = "";
      next.onset = SIMPLE_CODA_TO_ONSET[coda];
      syncSyllableValue(current);
      syncSyllableValue(next);
      addUniqueNote(notes, `${pair}: 받침 ${coda} が次の母音へつながる連音の形です。`);
      continue;
    }

    if (["ㄴ", "ㅁ"].includes(onset)) {
      if (["ㄱ", "ㄲ", "ㅋ", "ㄳ", "ㄺ"].includes(coda)) {
        current.coda = "ㅇ";
        syncSyllableValue(current);
        addUniqueNote(notes, `${pair}: 받침 ${coda} が ${onset} の前で ㅇ 音に近づく鼻音化の形です。`);
      } else if (["ㄷ", "ㅅ", "ㅆ", "ㅈ", "ㅊ", "ㅌ", "ㅎ"].includes(coda)) {
        current.coda = "ㄴ";
        syncSyllableValue(current);
        addUniqueNote(notes, `${pair}: 받침 ${coda} が ${onset} の前で ㄴ 音に近づく鼻音化の形です。`);
      } else if (["ㅂ", "ㅍ", "ㅄ", "ㄼ", "ㄿ"].includes(coda)) {
        current.coda = "ㅁ";
        syncSyllableValue(current);
        addUniqueNote(notes, `${pair}: 받침 ${coda} が ${onset} の前で ㅁ 音に近づく鼻音化の形です。`);
      }
    }

    if (current.coda === "ㄹ" && next.onset === "ㄴ") {
      next.onset = "ㄹ";
      syncSyllableValue(next);
      addUniqueNote(notes, `${pair}: ㄹ と ㄴ が続くと、ㄹㄹ に近く聞こえやすいです。`);
      continue;
    }

    if (current.coda === "ㄴ" && next.onset === "ㄹ") {
      current.coda = "ㄹ";
      syncSyllableValue(current);
      addUniqueNote(notes, `${pair}: ㄴ と ㄹ が続くと、ㄹㄹ に近く聞こえやすいです。`);
    }
  }

  return {
    tokens: working,
    notes,
  };
}

export function romanizeText(text) {
  return splitHangulText(text)
    .map((token) => tokenToRoman(token))
    .join("");
}

export function getLastSyllable(text) {
  const syllables = splitHangulText(text).filter((token) => token.type === "syllable");
  return syllables.length ? syllables[syllables.length - 1] : null;
}

export function endsWithBatchim(text) {
  const last = getLastSyllable(text);
  return Boolean(last && last.coda);
}

export function analyzeStudyText(text) {
  const sourceText = String(text || "");
  const tokens = splitHangulText(sourceText);
  const syllables = tokens.filter((token) => token.type === "syllable");
  const writtenRoman = tokens.map((token) => tokenToRoman(token)).join("");
  const pronunciation = applyPronunciationRules(tokens);
  const spokenRoman = pronunciation.tokens.map((token) => tokenToRoman(token)).join("");
  const spokenText = pronunciation.tokens
    .map((token) => (token.type === "syllable" ? token.syllable : token.value))
    .join("");

  return {
    sourceText,
    writtenRoman,
    spokenRoman,
    spokenText,
    notes: pronunciation.notes,
    syllables: syllables.map((token) => {
      const jamo = token.coda ? [token.onset, token.vowel, token.coda] : [token.onset, token.vowel];
      const latinParts = [
        token.onset === "ㅇ" ? "(silent)" : INITIAL_ROMAN[token.onset] || "",
        VOWEL_ROMAN[token.vowel] || "",
        ...(token.coda ? [FINAL_ROMAN[token.coda] || ""] : []),
      ].filter(Boolean);
      return {
        syllable: token.syllable,
        onset: token.onset,
        vowel: token.vowel,
        coda: token.coda,
        jamo,
        jamoText: jamo.join(" + "),
        latinParts,
        latinText: latinParts.join(" + "),
        roman: tokenToRoman(token),
        hasBatchim: Boolean(token.coda),
      };
    }),
  };
}

export function detectSoundTags(text, analysis, options = {}) {
  const activeAnalysis = analysis || analyzeStudyText(text);
  const tags = new Set();

  activeAnalysis.syllables.forEach((syllable) => {
    if (syllable.hasBatchim) tags.add("パッチム");
    if (COMBINED_VOWELS.has(syllable.vowel)) tags.add("合成母音");
    if (DOUBLE_CONSONANTS.has(syllable.onset) || DOUBLE_CONSONANTS.has(syllable.coda)) tags.add("濃音");
    if (ASPIRATED_CONSONANTS.has(syllable.onset) || ASPIRATED_CONSONANTS.has(syllable.coda)) tags.add("激音");
    if (syllable.onset === "ㅇ" || syllable.coda === "ㅇ") tags.add("ㅇ");
  });

  if (activeAnalysis.notes.some((note) => note.includes("連音"))) tags.add("連音");
  if (activeAnalysis.notes.length) tags.add("音変化");
  if (options.type === "word") tags.add("単語");
  if (options.type === "phrase") tags.add("フレーズ");
  if (options.spoken) tags.add("会話形");

  return [...tags];
}
