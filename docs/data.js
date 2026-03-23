import { STUDY_ITEMS } from "./study-items.js";

// すべて静的データ。外部APIなしで動きます。
export const APP_INFO = {
  title: "ハングル・スタート200",
  subtitle: "超初心者向けの韓国語学習アプリ",
  totalPhrases: 200,
};

export const BASIC_VOWELS = [
  {
    "id": "v-ㅏ",
    "symbol": "ㅏ",
    "name": "아",
    "roman": "a",
    "hint": "アに近い",
    "tip": "口を大きく開けて短く。",
    "example": "아",
    "exampleRoman": "a",
    "group": "基本母音"
  },
  {
    "id": "v-ㅑ",
    "symbol": "ㅑ",
    "name": "야",
    "roman": "ya",
    "hint": "ヤに近い",
    "tip": "ㅏ の前に y が入るイメージ。",
    "example": "야",
    "exampleRoman": "ya",
    "group": "基本母音"
  },
  {
    "id": "v-ㅓ",
    "symbol": "ㅓ",
    "name": "어",
    "roman": "eo",
    "hint": "オとアの間",
    "tip": "口を縦に開きつつ、唇を丸めすぎない。",
    "example": "어",
    "exampleRoman": "eo",
    "group": "基本母音"
  },
  {
    "id": "v-ㅕ",
    "symbol": "ㅕ",
    "name": "여",
    "roman": "yeo",
    "hint": "ヨに近い",
    "tip": "ㅓ の前に y が入るイメージ。",
    "example": "여",
    "exampleRoman": "yeo",
    "group": "基本母音"
  },
  {
    "id": "v-ㅗ",
    "symbol": "ㅗ",
    "name": "오",
    "roman": "o",
    "hint": "オに近い",
    "tip": "唇を少し丸めて上向きに。",
    "example": "오",
    "exampleRoman": "o",
    "group": "基本母音"
  },
  {
    "id": "v-ㅛ",
    "symbol": "ㅛ",
    "name": "요",
    "roman": "yo",
    "hint": "ヨに近い",
    "tip": "ㅗ の前に y が入るイメージ。",
    "example": "요",
    "exampleRoman": "yo",
    "group": "基本母音"
  },
  {
    "id": "v-ㅜ",
    "symbol": "ㅜ",
    "name": "우",
    "roman": "u",
    "hint": "ウに近い",
    "tip": "唇を丸めて前に出す。",
    "example": "우",
    "exampleRoman": "u",
    "group": "基本母音"
  },
  {
    "id": "v-ㅠ",
    "symbol": "ㅠ",
    "name": "유",
    "roman": "yu",
    "hint": "ユに近い",
    "tip": "ㅜ の前に y が入るイメージ。",
    "example": "유",
    "exampleRoman": "yu",
    "group": "基本母音"
  },
  {
    "id": "v-ㅡ",
    "symbol": "ㅡ",
    "name": "으",
    "roman": "eu",
    "hint": "日本語にないウ",
    "tip": "口を横に引いて、唇を丸めない。",
    "example": "으",
    "exampleRoman": "eu",
    "group": "基本母音"
  },
  {
    "id": "v-ㅣ",
    "symbol": "ㅣ",
    "name": "이",
    "roman": "i",
    "hint": "イに近い",
    "tip": "口角を少し横に。",
    "example": "이",
    "exampleRoman": "i",
    "group": "基本母音"
  }
];
export const COMBINED_VOWELS = [
  {
    "id": "v-ㅐ",
    "symbol": "ㅐ",
    "name": "애",
    "roman": "ae",
    "hint": "エに近い",
    "tip": "ㅏ と ㅣ の中間を意識。",
    "example": "애",
    "exampleRoman": "ae",
    "group": "合成母音"
  },
  {
    "id": "v-ㅒ",
    "symbol": "ㅒ",
    "name": "얘",
    "roman": "yae",
    "hint": "イェに近い",
    "tip": "ㅐ に y が入るイメージ。",
    "example": "얘",
    "exampleRoman": "yae",
    "group": "合成母音"
  },
  {
    "id": "v-ㅔ",
    "symbol": "ㅔ",
    "name": "에",
    "roman": "e",
    "hint": "エに近い",
    "tip": "初心者は ㅐ とまとめて覚えてもOK。",
    "example": "에",
    "exampleRoman": "e",
    "group": "合成母音"
  },
  {
    "id": "v-ㅖ",
    "symbol": "ㅖ",
    "name": "예",
    "roman": "ye",
    "hint": "イェに近い",
    "tip": "ㅔ に y が入るイメージ。",
    "example": "예",
    "exampleRoman": "ye",
    "group": "合成母音"
  },
  {
    "id": "v-ㅘ",
    "symbol": "ㅘ",
    "name": "와",
    "roman": "wa",
    "hint": "ワに近い",
    "tip": "ㅗ + ㅏ の組み合わせ。",
    "example": "와",
    "exampleRoman": "wa",
    "group": "合成母音"
  },
  {
    "id": "v-ㅙ",
    "symbol": "ㅙ",
    "name": "왜",
    "roman": "wae",
    "hint": "ウェに近い",
    "tip": "ㅗ + ㅐ の組み合わせ。",
    "example": "왜",
    "exampleRoman": "wae",
    "group": "合成母音"
  },
  {
    "id": "v-ㅚ",
    "symbol": "ㅚ",
    "name": "외",
    "roman": "oe",
    "hint": "ウェに近い",
    "tip": "口の形を保ったまま素早く。",
    "example": "외",
    "exampleRoman": "oe",
    "group": "合成母音"
  },
  {
    "id": "v-ㅝ",
    "symbol": "ㅝ",
    "name": "워",
    "roman": "wo",
    "hint": "ウォに近い",
    "tip": "ㅜ + ㅓ の組み合わせ。",
    "example": "워",
    "exampleRoman": "wo",
    "group": "合成母音"
  },
  {
    "id": "v-ㅞ",
    "symbol": "ㅞ",
    "name": "웨",
    "roman": "we",
    "hint": "ウェに近い",
    "tip": "ㅜ + ㅔ の組み合わせ。",
    "example": "웨",
    "exampleRoman": "we",
    "group": "合成母音"
  },
  {
    "id": "v-ㅟ",
    "symbol": "ㅟ",
    "name": "위",
    "roman": "wi",
    "hint": "ウィに近い",
    "tip": "唇を丸めたまま ㅣ に移る。",
    "example": "위",
    "exampleRoman": "wi",
    "group": "合成母音"
  },
  {
    "id": "v-ㅢ",
    "symbol": "ㅢ",
    "name": "의",
    "roman": "ui",
    "hint": "ウィ / イに近い",
    "tip": "単語の位置で聞こえ方が変わる。",
    "example": "의",
    "exampleRoman": "ui",
    "group": "合成母音"
  }
];
export const BASIC_CONSONANTS = [
  {
    "id": "c-ㅇ",
    "symbol": "ㅇ",
    "name": "이응",
    "roman": "(silent / ng)",
    "hint": "頭では無音",
    "tip": "母音を始めるための土台。終わりでは『ン』。",
    "example": "아 / 앙",
    "exampleRoman": "a / ang",
    "group": "基本子音"
  },
  {
    "id": "c-ㄱ",
    "symbol": "ㄱ",
    "name": "기역",
    "roman": "g/k",
    "hint": "ガとカの間",
    "tip": "語頭ではやわらかめ。",
    "example": "가",
    "exampleRoman": "ga",
    "group": "基本子音"
  },
  {
    "id": "c-ㄴ",
    "symbol": "ㄴ",
    "name": "니은",
    "roman": "n",
    "hint": "ナ行",
    "tip": "舌先を上の歯ぐきに軽く当てる。",
    "example": "나",
    "exampleRoman": "na",
    "group": "基本子音"
  },
  {
    "id": "c-ㄷ",
    "symbol": "ㄷ",
    "name": "디귿",
    "roman": "d/t",
    "hint": "ダとタの間",
    "tip": "日本語のタより息が少ない。",
    "example": "다",
    "exampleRoman": "da",
    "group": "基本子音"
  },
  {
    "id": "c-ㄹ",
    "symbol": "ㄹ",
    "name": "리을",
    "roman": "r/l",
    "hint": "ラとルの中間",
    "tip": "舌を軽くはじく。",
    "example": "라",
    "exampleRoman": "ra",
    "group": "基本子音"
  },
  {
    "id": "c-ㅁ",
    "symbol": "ㅁ",
    "name": "미음",
    "roman": "m",
    "hint": "マ行",
    "tip": "唇をしっかり閉じる。",
    "example": "마",
    "exampleRoman": "ma",
    "group": "基本子音"
  },
  {
    "id": "c-ㅂ",
    "symbol": "ㅂ",
    "name": "비읍",
    "roman": "b/p",
    "hint": "バとパの間",
    "tip": "日本語のパより息が弱い。",
    "example": "바",
    "exampleRoman": "ba",
    "group": "基本子音"
  },
  {
    "id": "c-ㅅ",
    "symbol": "ㅅ",
    "name": "시옷",
    "roman": "s",
    "hint": "サ行",
    "tip": "ㅣ, ㅑ, ㅕ の前では少し『シ』寄り。",
    "example": "사",
    "exampleRoman": "sa",
    "group": "基本子音"
  },
  {
    "id": "c-ㅈ",
    "symbol": "ㅈ",
    "name": "지읒",
    "roman": "j",
    "hint": "ジャ行",
    "tip": "語頭ではやわらかい。",
    "example": "자",
    "exampleRoman": "ja",
    "group": "基本子音"
  },
  {
    "id": "c-ㅊ",
    "symbol": "ㅊ",
    "name": "치읓",
    "roman": "ch",
    "hint": "チャ行",
    "tip": "ㅈ より息が強い。",
    "example": "차",
    "exampleRoman": "cha",
    "group": "基本子音"
  },
  {
    "id": "c-ㅋ",
    "symbol": "ㅋ",
    "name": "키읔",
    "roman": "k",
    "hint": "強いカ",
    "tip": "息をはっきり出す激音。",
    "example": "카",
    "exampleRoman": "ka",
    "group": "基本子音"
  },
  {
    "id": "c-ㅌ",
    "symbol": "ㅌ",
    "name": "티읕",
    "roman": "t",
    "hint": "強いタ",
    "tip": "息をはっきり出す激音。",
    "example": "타",
    "exampleRoman": "ta",
    "group": "基本子音"
  },
  {
    "id": "c-ㅍ",
    "symbol": "ㅍ",
    "name": "피읖",
    "roman": "p",
    "hint": "強いパ",
    "tip": "息をはっきり出す激音。",
    "example": "파",
    "exampleRoman": "pa",
    "group": "基本子音"
  },
  {
    "id": "c-ㅎ",
    "symbol": "ㅎ",
    "name": "히읗",
    "roman": "h",
    "hint": "ハ行",
    "tip": "のどから息を出す。",
    "example": "하",
    "exampleRoman": "ha",
    "group": "基本子音"
  }
];
export const EXTRA_CONSONANTS = [
  {
    "id": "c-ㄲ",
    "symbol": "ㄲ",
    "name": "쌍기역",
    "roman": "kk",
    "hint": "ッカのように強い",
    "tip": "濃音。息よりも力強さ。",
    "example": "까",
    "exampleRoman": "kka",
    "group": "発展子音"
  },
  {
    "id": "c-ㄸ",
    "symbol": "ㄸ",
    "name": "쌍디귿",
    "roman": "tt",
    "hint": "ッタのように強い",
    "tip": "濃音。口の中で詰まる感じ。",
    "example": "따",
    "exampleRoman": "tta",
    "group": "発展子音"
  },
  {
    "id": "c-ㅃ",
    "symbol": "ㅃ",
    "name": "쌍비읍",
    "roman": "pp",
    "hint": "ッパのように強い",
    "tip": "濃音。唇に力を入れる。",
    "example": "빠",
    "exampleRoman": "ppa",
    "group": "発展子音"
  },
  {
    "id": "c-ㅆ",
    "symbol": "ㅆ",
    "name": "쌍시옷",
    "roman": "ss",
    "hint": "強いサ",
    "tip": "息より締まりを意識。",
    "example": "싸",
    "exampleRoman": "ssa",
    "group": "発展子音"
  },
  {
    "id": "c-ㅉ",
    "symbol": "ㅉ",
    "name": "쌍지읒",
    "roman": "jj",
    "hint": "ッジャのように強い",
    "tip": "濃音。硬く出す。",
    "example": "짜",
    "exampleRoman": "jja",
    "group": "発展子音"
  }
];

export const LETTER_GROUPS = [
  ...BASIC_VOWELS,
  ...COMBINED_VOWELS,
  ...BASIC_CONSONANTS,
  ...EXTRA_CONSONANTS,
];

export const CHOSEONG_ORDER = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
export const JUNGSEONG_ORDER = ["ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ","ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ"];

export const CHART_INITIALS_BASIC = ["ㅇ","ㄱ","ㄴ","ㄷ","ㄹ","ㅁ","ㅂ","ㅅ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
export const CHART_INITIALS_ALL = ["ㅇ", ...CHOSEONG_ORDER.filter((letter) => letter !== "ㅇ")];
export const CHART_VOWELS_BASIC = ["ㅏ","ㅑ","ㅓ","ㅕ","ㅗ","ㅛ","ㅜ","ㅠ","ㅡ","ㅣ"];
export const CHART_VOWELS_ALL = [...JUNGSEONG_ORDER];

export const INITIAL_ROMAN = {
  "ㄱ":"g",
  "ㄲ":"kk",
  "ㄴ":"n",
  "ㄷ":"d",
  "ㄸ":"tt",
  "ㄹ":"r",
  "ㅁ":"m",
  "ㅂ":"b",
  "ㅃ":"pp",
  "ㅅ":"s",
  "ㅆ":"ss",
  "ㅇ":"",
  "ㅈ":"j",
  "ㅉ":"jj",
  "ㅊ":"ch",
  "ㅋ":"k",
  "ㅌ":"t",
  "ㅍ":"p",
  "ㅎ":"h"
};

export const VOWEL_ROMAN = {
  "ㅏ":"a",
  "ㅐ":"ae",
  "ㅑ":"ya",
  "ㅒ":"yae",
  "ㅓ":"eo",
  "ㅔ":"e",
  "ㅕ":"yeo",
  "ㅖ":"ye",
  "ㅗ":"o",
  "ㅘ":"wa",
  "ㅙ":"wae",
  "ㅚ":"oe",
  "ㅛ":"yo",
  "ㅜ":"u",
  "ㅝ":"wo",
  "ㅞ":"we",
  "ㅟ":"wi",
  "ㅠ":"yu",
  "ㅡ":"eu",
  "ㅢ":"ui",
  "ㅣ":"i"
};

export const KANA_HINTS = {
  "ㅏ":"アに近い",
  "ㅑ":"ヤに近い",
  "ㅓ":"オとアの間",
  "ㅕ":"ヨに近い",
  "ㅗ":"オに近い",
  "ㅛ":"ヨに近い",
  "ㅜ":"ウに近い",
  "ㅠ":"ユに近い",
  "ㅡ":"日本語にないウ",
  "ㅣ":"イに近い",
  "ㅐ":"エに近い",
  "ㅒ":"イェに近い",
  "ㅔ":"エに近い",
  "ㅖ":"イェに近い",
  "ㅘ":"ワに近い",
  "ㅙ":"ウェに近い",
  "ㅚ":"ウェに近い",
  "ㅝ":"ウォに近い",
  "ㅞ":"ウェに近い",
  "ㅟ":"ウィに近い",
  "ㅢ":"ウィ / イに近い",
  "ㄱ":"ガとカの間",
  "ㄲ":"強いカ",
  "ㄴ":"ナ行",
  "ㄷ":"ダとタの間",
  "ㄸ":"強いタ",
  "ㄹ":"ラとルの中間",
  "ㅁ":"マ行",
  "ㅂ":"バとパの間",
  "ㅃ":"強いパ",
  "ㅅ":"サ行",
  "ㅆ":"強いサ",
  "ㅇ":"頭では無音 / 終わりでン",
  "ㅈ":"ジャ行",
  "ㅉ":"強いジャ",
  "ㅊ":"チャ行",
  "ㅋ":"強いカ",
  "ㅌ":"強いタ",
  "ㅍ":"強いパ",
  "ㅎ":"ハ行"
};

export const PHRASES = STUDY_ITEMS;

export const SOUND_RULES = [
  {
    id: "rule-1",
    title: "1文字は 子音 + 母音 (+ パッチム)",
    detail: "가 = ㄱ + ㅏ、 강 = ㄱ + ㅏ + ㅇ のように、1音節ごとに部品を見られます。",
  },
  {
    id: "rule-2",
    title: "語頭の ㅇ は無音",
    detail: "안 の最初の ㅇ は音を出さず、母音から始めるための土台になります。",
  },
  {
    id: "rule-3",
    title: "パッチムは最後を止める音",
    detail: "밥 や 책 の最後は、母音を足さずに短く止めると韓国語らしく聞こえます。",
  },
  {
    id: "rule-4",
    title: "パッチム + 母音 で音がつながる",
    detail: "먹어요 は 머거요 に近く聞こえるように、받침 が次の母音へ移ることがあります。",
  },
  {
    id: "rule-5",
    title: "鼻音化で ng / n / m に近づく",
    detail: "감사합니다 の 합니 は、ㅂ + ㄴ が近づいて ham-ni のように聞こえやすいです。",
  },
  {
    id: "rule-6",
    title: "濃音と激音は強さが違う",
    detail: "ㅃ ㅆ ㅉ は濃音、ㅋ ㅌ ㅍ ㅊ は息を強く出す激音です。",
  },
  {
    id: "rule-7",
    title: "単語は 会話形 まで一緒に覚える",
    detail: "가다 → 가요、 오다 → 와요 のように、辞書の形と会話の形を並べて覚えると話しやすくなります。",
  },
];

export const PHRASE_CATEGORIES = [...new Set(PHRASES.map((phrase) => phrase.category))];
export const STREAM_CHALLENGES = [
  {
    "id": "s1",
    "title": "ウォームアップ5問",
    "detail": "母音クイズを5問だけ。声と口の形を合わせてスタート。",
    "tag": "配信開始向け"
  },
  {
    "id": "s2",
    "title": "10問ノーミス",
    "detail": "子音または母音で10問連続正解を狙おう。",
    "tag": "視聴者参加"
  },
  {
    "id": "s3",
    "title": "3回シャドーイング",
    "detail": "出たカードを音声のあとに3回まねして言う。",
    "tag": "発音練習"
  },
  {
    "id": "s4",
    "title": "コメント読み風",
    "detail": "配信カードから1つ選び、感情をこめて読んでみる。",
    "tag": "盛り上げ"
  },
  {
    "id": "s5",
    "title": "視聴者予想タイム",
    "detail": "意味を見せて、コメントでハングルを予想してもらう。",
    "tag": "参加型"
  },
  {
    "id": "s6",
    "title": "母音だけ耐久",
    "detail": "ㅏ / ㅓ / ㅗ / ㅜ / ㅡ / ㅣ を聞き分けるミニ対決。",
    "tag": "基礎固め"
  },
  {
    "id": "s7",
    "title": "早口ではなく丁寧に",
    "detail": "スピードを下げて、口の形を見せながら一音ずつ読む。",
    "tag": "学習重視"
  },
  {
    "id": "s8",
    "title": "今日の推しカード",
    "detail": "200カードから1つ引いて、その意味と音の仕組みもセットで覚える。",
    "tag": "締めにおすすめ"
  },
  {
    "id": "s9",
    "title": "ランダム文字チャレンジ",
    "detail": "組み合わせ表からランダム1文字。読めたら次へ。",
    "tag": "反射神経"
  },
  {
    "id": "s10",
    "title": "やさしい韓国語雑談",
    "detail": "自己紹介カテゴリのフレーズを3つ続けて読んでみる。",
    "tag": "会話づくり"
  }
];
export const HOME_STEPS = [
  {
    "step": "STEP 1",
    "title": "母音10個をまず覚える",
    "detail": "ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ を優先。カタカナは目安、音声で確認。"
  },
  {
    "step": "STEP 2",
    "title": "基本子音14個に進む",
    "detail": "ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅇ ㅈ ㅊ ㅋ ㅌ ㅍ ㅎ を反復。"
  },
  {
    "step": "STEP 3",
    "title": "組み合わせ表を声に出す",
    "detail": "아 가 나 다 ... の順で読むと定着しやすい。"
  },
  {
    "step": "STEP 4",
    "title": "200カードで実戦化",
    "detail": "フレーズと単語を、意味→音→部品の順で覚えると定着しやすい。"
  }
];
export const HYPE_MESSAGES = [
  "いい流れ！",
  "その調子！",
  "コメント欄も盛り上がるやつ！",
  "発音がだんだん安定してきた！",
  "ナイスコンボ！"
];
