// 200個の学習カード。フレーズと単語を混ぜて、会話とハングルを同時に覚えやすくしています。
export const STUDY_ITEMS = [
  {
    "id": "p001",
    "hangul": "안녕하세요",
    "meaning": "こんにちは / こんばんは",
    "category": "あいさつ",
    "type": "phrase",
    "customNote": "最初の ㅇ は無音です。 안 = (無音)+a+n、 요 = yo の形まで追うと読みやすくなります。"
  },
  {
    "id": "p002",
    "hangul": "안녕",
    "meaning": "やあ / じゃあね",
    "category": "あいさつ",
    "type": "phrase"
  },
  {
    "id": "p003",
    "hangul": "감사합니다",
    "meaning": "ありがとうございます",
    "category": "あいさつ",
    "type": "phrase",
    "customNote": "합니 では ㅂ が次の ㄴ に引っぱられて ㅁ に近く聞こえやすく、감사함니다 のように感じることがあります。"
  },
  {
    "id": "p004",
    "hangul": "고마워요",
    "meaning": "ありがとう",
    "category": "あいさつ",
    "type": "phrase"
  },
  {
    "id": "p005",
    "hangul": "죄송합니다",
    "meaning": "申し訳ありません",
    "category": "あいさつ",
    "type": "phrase"
  },
  {
    "id": "p006",
    "hangul": "미안해요",
    "meaning": "ごめんなさい",
    "category": "あいさつ",
    "type": "phrase"
  },
  {
    "id": "p007",
    "hangul": "괜찮아요",
    "meaning": "大丈夫です",
    "category": "あいさつ",
    "type": "phrase",
    "customNote": "괜 の ㅙ は合成母音で wae に近い音です。 ㅊ は息をしっかり出す子音です。"
  },
  {
    "id": "p008",
    "hangul": "네",
    "meaning": "はい",
    "category": "あいさつ",
    "type": "phrase"
  },
  {
    "id": "p009",
    "hangul": "아니요",
    "meaning": "いいえ",
    "category": "あいさつ",
    "type": "phrase"
  },
  {
    "id": "p010",
    "hangul": "좋아요",
    "meaning": "いいです / 好きです",
    "category": "あいさつ",
    "type": "phrase",
    "customNote": "좋아 では 받침 ㅎ が弱くなり、会話では 조아요 に近く聞こえます。"
  },
  {
    "id": "p011",
    "hangul": "싫어요",
    "meaning": "いやです / 好きではありません",
    "category": "あいさつ",
    "type": "phrase"
  },
  {
    "id": "p012",
    "hangul": "반갑습니다",
    "meaning": "はじめまして / 会えてうれしいです",
    "category": "あいさつ",
    "type": "phrase"
  },
  {
    "id": "p013",
    "hangul": "잘 부탁드립니다",
    "meaning": "よろしくお願いします",
    "category": "あいさつ",
    "type": "phrase"
  },
  {
    "id": "p014",
    "hangul": "또 만나요",
    "meaning": "また会いましょう",
    "category": "あいさつ",
    "type": "phrase"
  },
  {
    "id": "p015",
    "hangul": "안녕히 가세요",
    "meaning": "さようなら（去る人へ）",
    "category": "あいさつ",
    "type": "phrase"
  },
  {
    "id": "p016",
    "hangul": "안녕히 계세요",
    "meaning": "さようなら（残る人へ）",
    "category": "あいさつ",
    "type": "phrase",
    "customNote": "계 は gye のように読みます。 ㅖ が入るので ye 系の音を確認すると覚えやすいです。"
  },
  {
    "id": "p017",
    "hangul": "좋은 아침이에요",
    "meaning": "おはようございます",
    "category": "あいさつ",
    "type": "phrase"
  },
  {
    "id": "p018",
    "hangul": "잘 자요",
    "meaning": "おやすみなさい",
    "category": "あいさつ",
    "type": "phrase"
  },
  {
    "id": "p019",
    "hangul": "잘 지냈어요?",
    "meaning": "元気でしたか",
    "category": "あいさつ",
    "type": "phrase"
  },
  {
    "id": "p020",
    "hangul": "수고하셨어요",
    "meaning": "お疲れさまでした",
    "category": "あいさつ",
    "type": "phrase"
  },
  {
    "id": "p021",
    "hangul": "저는 ___예요",
    "meaning": "私は___です",
    "category": "自己紹介",
    "type": "phrase",
    "customNote": "저 는 jeo-neun。 예요 は『です』のやさしい言い方です。"
  },
  {
    "id": "p022",
    "hangul": "이름이 뭐예요?",
    "meaning": "名前は何ですか",
    "category": "自己紹介",
    "type": "phrase",
    "customNote": "뭐 は mwo。 ㅝ が入るので wo 音に注意します。"
  },
  {
    "id": "p023",
    "hangul": "제 이름은 ___예요",
    "meaning": "私の名前は___です",
    "category": "自己紹介",
    "type": "phrase"
  },
  {
    "id": "p024",
    "hangul": "일본 사람이에요",
    "meaning": "日本人です",
    "category": "自己紹介",
    "type": "phrase"
  },
  {
    "id": "p025",
    "hangul": "학생이에요",
    "meaning": "学生です",
    "category": "自己紹介",
    "type": "phrase"
  },
  {
    "id": "p026",
    "hangul": "회사원이에요",
    "meaning": "会社員です",
    "category": "自己紹介",
    "type": "phrase"
  },
  {
    "id": "p027",
    "hangul": "취미는 뭐예요?",
    "meaning": "趣味は何ですか",
    "category": "自己紹介",
    "type": "phrase",
    "customNote": "취 は chwi。 ㅟ は wi に近い合成母音です。"
  },
  {
    "id": "p028",
    "hangul": "한국어를 공부해요",
    "meaning": "韓国語を勉強しています",
    "category": "自己紹介",
    "type": "phrase"
  },
  {
    "id": "p029",
    "hangul": "천천히 말해 주세요",
    "meaning": "ゆっくり話してください",
    "category": "自己紹介",
    "type": "phrase"
  },
  {
    "id": "p030",
    "hangul": "다시 말해 주세요",
    "meaning": "もう一度言ってください",
    "category": "自己紹介",
    "type": "phrase"
  },
  {
    "id": "p031",
    "hangul": "잘 못 들었어요",
    "meaning": "よく聞こえませんでした",
    "category": "自己紹介",
    "type": "phrase"
  },
  {
    "id": "p032",
    "hangul": "조금 할 수 있어요",
    "meaning": "少しできます",
    "category": "自己紹介",
    "type": "phrase"
  },
  {
    "id": "p033",
    "hangul": "한국에 가고 싶어요",
    "meaning": "韓国に行きたいです",
    "category": "自己紹介",
    "type": "phrase"
  },
  {
    "id": "p034",
    "hangul": "저는 도쿄에 살아요",
    "meaning": "私は東京に住んでいます",
    "category": "自己紹介",
    "type": "phrase"
  },
  {
    "id": "p035",
    "hangul": "몇 살이에요?",
    "meaning": "何歳ですか",
    "category": "自己紹介",
    "type": "phrase"
  },
  {
    "id": "p036",
    "hangul": "스물다섯 살이에요",
    "meaning": "25歳です",
    "category": "自己紹介",
    "type": "phrase"
  },
  {
    "id": "p037",
    "hangul": "직업이 뭐예요?",
    "meaning": "職業は何ですか",
    "category": "自己紹介",
    "type": "phrase"
  },
  {
    "id": "p038",
    "hangul": "저는 초보예요",
    "meaning": "私は初心者です",
    "category": "自己紹介",
    "type": "phrase"
  },
  {
    "id": "p039",
    "hangul": "같이 공부해요",
    "meaning": "一緒に勉強しましょう",
    "category": "自己紹介",
    "type": "phrase",
    "customNote": "같이 は ㅌ + ㅣ が近づいて 가치 のように聞こえやすい代表例です。"
  },
  {
    "id": "p040",
    "hangul": "한국 드라마를 좋아해요",
    "meaning": "韓国ドラマが好きです",
    "category": "自己紹介",
    "type": "phrase"
  },
  {
    "id": "p041",
    "hangul": "이거 뭐예요?",
    "meaning": "これは何ですか",
    "category": "勉強・会話",
    "type": "phrase"
  },
  {
    "id": "p042",
    "hangul": "저거 뭐예요?",
    "meaning": "あれは何ですか",
    "category": "勉強・会話",
    "type": "phrase"
  },
  {
    "id": "p043",
    "hangul": "어떻게 읽어요?",
    "meaning": "どう読みますか",
    "category": "勉強・会話",
    "type": "phrase"
  },
  {
    "id": "p044",
    "hangul": "어떻게 써요?",
    "meaning": "どう書きますか",
    "category": "勉強・会話",
    "type": "phrase"
  },
  {
    "id": "p045",
    "hangul": "뜻이 뭐예요?",
    "meaning": "意味は何ですか",
    "category": "勉強・会話",
    "type": "phrase"
  },
  {
    "id": "p046",
    "hangul": "예문을 보여 주세요",
    "meaning": "例文を見せてください",
    "category": "勉強・会話",
    "type": "phrase"
  },
  {
    "id": "p047",
    "hangul": "발음을 알려 주세요",
    "meaning": "発音を教えてください",
    "category": "勉強・会話",
    "type": "phrase"
  },
  {
    "id": "p048",
    "hangul": "맞아요",
    "meaning": "合っています",
    "category": "勉強・会話",
    "type": "phrase"
  },
  {
    "id": "p049",
    "hangul": "틀려요",
    "meaning": "間違っています",
    "category": "勉強・会話",
    "type": "phrase"
  },
  {
    "id": "p050",
    "hangul": "이해했어요",
    "meaning": "理解しました",
    "category": "勉強・会話",
    "type": "phrase"
  },
  {
    "id": "p051",
    "hangul": "다시 설명해 주세요",
    "meaning": "もう一度説明してください",
    "category": "勉強・会話",
    "type": "phrase"
  },
  {
    "id": "p052",
    "hangul": "메모할게요",
    "meaning": "メモします",
    "category": "勉強・会話",
    "type": "phrase"
  },
  {
    "id": "p053",
    "hangul": "연습할게요",
    "meaning": "練習します",
    "category": "勉強・会話",
    "type": "phrase"
  },
  {
    "id": "p054",
    "hangul": "같이 읽어요",
    "meaning": "一緒に読みましょう",
    "category": "勉強・会話",
    "type": "phrase"
  },
  {
    "id": "p055",
    "hangul": "소리 내서 읽어요",
    "meaning": "声に出して読みます",
    "category": "勉強・会話",
    "type": "phrase"
  },
  {
    "id": "p056",
    "hangul": "천천히 따라 해요",
    "meaning": "ゆっくり真似します",
    "category": "勉強・会話",
    "type": "phrase"
  },
  {
    "id": "p057",
    "hangul": "한 글자씩 봐요",
    "meaning": "一文字ずつ見ます",
    "category": "勉強・会話",
    "type": "phrase"
  },
  {
    "id": "p058",
    "hangul": "받침이 있어요",
    "meaning": "パッチムがあります",
    "category": "勉強・会話",
    "type": "phrase",
    "customNote": "받침이 は 받치미 に近く聞こえます。 받침 ㅁ が次の母音へつながる連音の例です。"
  },
  {
    "id": "p059",
    "hangul": "소리가 이어져요",
    "meaning": "音がつながります",
    "category": "勉強・会話",
    "type": "phrase"
  },
  {
    "id": "p060",
    "hangul": "왜 이렇게 발음해요?",
    "meaning": "なぜこう発音しますか",
    "category": "勉強・会話",
    "type": "phrase",
    "customNote": "왜 は wae。 合成母音 ㅙ の音をここで確認できます。"
  },
  {
    "id": "p061",
    "hangul": "진짜요?",
    "meaning": "本当ですか",
    "category": "リアクション",
    "type": "phrase",
    "customNote": "진짜 の ㅉ は濃音です。息ではなく、のどをキュッと締める感じで出します。"
  },
  {
    "id": "p062",
    "hangul": "정말요?",
    "meaning": "本当に？",
    "category": "リアクション",
    "type": "phrase"
  },
  {
    "id": "p063",
    "hangul": "대박",
    "meaning": "すごい",
    "category": "リアクション",
    "type": "phrase",
    "customNote": "박 の 받침 ㄱ は最後で止める音です。 daebak の最後を長く伸ばさないのがコツです。"
  },
  {
    "id": "p064",
    "hangul": "멋져요",
    "meaning": "すてきです",
    "category": "リアクション",
    "type": "phrase"
  },
  {
    "id": "p065",
    "hangul": "귀여워요",
    "meaning": "かわいいです",
    "category": "リアクション",
    "type": "phrase"
  },
  {
    "id": "p066",
    "hangul": "재밌어요",
    "meaning": "面白いです",
    "category": "リアクション",
    "type": "phrase",
    "customNote": "있어 の並びでは 받침 ㅆ が次の母音へつながりやすく、이써 のように聞こえます。"
  },
  {
    "id": "p067",
    "hangul": "재미없어요",
    "meaning": "つまらないです",
    "category": "リアクション",
    "type": "phrase"
  },
  {
    "id": "p068",
    "hangul": "어려워요",
    "meaning": "難しいです",
    "category": "リアクション",
    "type": "phrase"
  },
  {
    "id": "p069",
    "hangul": "쉬워요",
    "meaning": "易しいです",
    "category": "リアクション",
    "type": "phrase"
  },
  {
    "id": "p070",
    "hangul": "바빠요",
    "meaning": "忙しいです",
    "category": "リアクション",
    "type": "phrase",
    "customNote": "ㅃ は濃音です。やわらかい b ではなく、強く締めた音になります。"
  },
  {
    "id": "p071",
    "hangul": "좋아해요",
    "meaning": "好きです",
    "category": "リアクション",
    "type": "phrase"
  },
  {
    "id": "p072",
    "hangul": "사랑해요",
    "meaning": "愛しています / 大好きです",
    "category": "リアクション",
    "type": "phrase"
  },
  {
    "id": "p073",
    "hangul": "행복해요",
    "meaning": "幸せです",
    "category": "リアクション",
    "type": "phrase"
  },
  {
    "id": "p074",
    "hangul": "피곤해요",
    "meaning": "疲れています",
    "category": "リアクション",
    "type": "phrase"
  },
  {
    "id": "p075",
    "hangul": "배고파요",
    "meaning": "お腹がすきました",
    "category": "リアクション",
    "type": "phrase"
  },
  {
    "id": "p076",
    "hangul": "목말라요",
    "meaning": "のどが渇きました",
    "category": "リアクション",
    "type": "phrase"
  },
  {
    "id": "p077",
    "hangul": "떨려요",
    "meaning": "緊張します",
    "category": "リアクション",
    "type": "phrase"
  },
  {
    "id": "p078",
    "hangul": "신기해요",
    "meaning": "不思議です / 興味深いです",
    "category": "リアクション",
    "type": "phrase"
  },
  {
    "id": "p079",
    "hangul": "웃겨요",
    "meaning": "おもしろい / ウケる",
    "category": "リアクション",
    "type": "phrase"
  },
  {
    "id": "p080",
    "hangul": "괜찮습니다",
    "meaning": "大丈夫です（より丁寧）",
    "category": "リアクション",
    "type": "phrase"
  },
  {
    "id": "p081",
    "hangul": "물 주세요",
    "meaning": "水をください",
    "category": "食事・カフェ",
    "type": "phrase"
  },
  {
    "id": "p082",
    "hangul": "커피 주세요",
    "meaning": "コーヒーをください",
    "category": "食事・カフェ",
    "type": "phrase"
  },
  {
    "id": "p083",
    "hangul": "메뉴 주세요",
    "meaning": "メニューをください",
    "category": "食事・カフェ",
    "type": "phrase"
  },
  {
    "id": "p084",
    "hangul": "맛있어요",
    "meaning": "おいしいです",
    "category": "食事・カフェ",
    "type": "phrase",
    "customNote": "맛있어요 は会話で 마시써요 に近く聞こえやすい単語です。 받침 ㅅ, ㅆ の動きを確認しやすいです。"
  },
  {
    "id": "p085",
    "hangul": "맛없어요",
    "meaning": "おいしくないです",
    "category": "食事・カフェ",
    "type": "phrase"
  },
  {
    "id": "p086",
    "hangul": "매워요",
    "meaning": "辛いです",
    "category": "食事・カフェ",
    "type": "phrase"
  },
  {
    "id": "p087",
    "hangul": "안 매워요",
    "meaning": "辛くないです",
    "category": "食事・カフェ",
    "type": "phrase"
  },
  {
    "id": "p088",
    "hangul": "달아요",
    "meaning": "甘いです",
    "category": "食事・カフェ",
    "type": "phrase"
  },
  {
    "id": "p089",
    "hangul": "차가워요",
    "meaning": "冷たいです",
    "category": "食事・カフェ",
    "type": "phrase"
  },
  {
    "id": "p090",
    "hangul": "뜨거워요",
    "meaning": "熱いです",
    "category": "食事・カフェ",
    "type": "phrase",
    "customNote": "뜨 は濃音 ㄸ。 거워 の ㅝ は wo に近い合成母音です。"
  },
  {
    "id": "p091",
    "hangul": "하나 주세요",
    "meaning": "1つください",
    "category": "食事・カフェ",
    "type": "phrase"
  },
  {
    "id": "p092",
    "hangul": "둘 주세요",
    "meaning": "2つください",
    "category": "食事・カフェ",
    "type": "phrase"
  },
  {
    "id": "p093",
    "hangul": "계산해 주세요",
    "meaning": "会計してください",
    "category": "食事・カフェ",
    "type": "phrase"
  },
  {
    "id": "p094",
    "hangul": "포장해 주세요",
    "meaning": "持ち帰りでお願いします",
    "category": "食事・カフェ",
    "type": "phrase"
  },
  {
    "id": "p095",
    "hangul": "여기서 먹어요",
    "meaning": "ここで食べます",
    "category": "食事・カフェ",
    "type": "phrase"
  },
  {
    "id": "p096",
    "hangul": "가지고 갈게요",
    "meaning": "持ち帰ります",
    "category": "食事・カフェ",
    "type": "phrase"
  },
  {
    "id": "p097",
    "hangul": "추천해 주세요",
    "meaning": "おすすめしてください",
    "category": "食事・カフェ",
    "type": "phrase"
  },
  {
    "id": "p098",
    "hangul": "물 더 주세요",
    "meaning": "水をもう少しください",
    "category": "食事・カフェ",
    "type": "phrase"
  },
  {
    "id": "p099",
    "hangul": "젓가락 주세요",
    "meaning": "箸をください",
    "category": "食事・カフェ",
    "type": "phrase"
  },
  {
    "id": "p100",
    "hangul": "잘 먹겠습니다",
    "meaning": "いただきます",
    "category": "食事・カフェ",
    "type": "phrase"
  },
  {
    "id": "p101",
    "hangul": "얼마예요?",
    "meaning": "いくらですか",
    "category": "買い物",
    "type": "phrase"
  },
  {
    "id": "p102",
    "hangul": "너무 비싸요",
    "meaning": "とても高いです",
    "category": "買い物",
    "type": "phrase"
  },
  {
    "id": "p103",
    "hangul": "조금 싸요",
    "meaning": "少し安いです",
    "category": "買い物",
    "type": "phrase"
  },
  {
    "id": "p104",
    "hangul": "할인돼요?",
    "meaning": "割引になりますか",
    "category": "買い物",
    "type": "phrase"
  },
  {
    "id": "p105",
    "hangul": "이거 주세요",
    "meaning": "これをください",
    "category": "買い物",
    "type": "phrase"
  },
  {
    "id": "p106",
    "hangul": "다른 색 있어요?",
    "meaning": "他の色はありますか",
    "category": "買い物",
    "type": "phrase"
  },
  {
    "id": "p107",
    "hangul": "입어 봐도 돼요?",
    "meaning": "試着してもいいですか",
    "category": "買い物",
    "type": "phrase",
    "customNote": "입어 は 받침 ㅂ が次の母音へつながり、이버 に近く聞こえます。"
  },
  {
    "id": "p108",
    "hangul": "큰 사이즈 있어요?",
    "meaning": "大きいサイズはありますか",
    "category": "買い物",
    "type": "phrase"
  },
  {
    "id": "p109",
    "hangul": "작은 사이즈 있어요?",
    "meaning": "小さいサイズはありますか",
    "category": "買い物",
    "type": "phrase"
  },
  {
    "id": "p110",
    "hangul": "카드 돼요?",
    "meaning": "カードは使えますか",
    "category": "買い物",
    "type": "phrase"
  },
  {
    "id": "p111",
    "hangul": "현금만 돼요?",
    "meaning": "現金だけですか",
    "category": "買い物",
    "type": "phrase"
  },
  {
    "id": "p112",
    "hangul": "영수증 주세요",
    "meaning": "レシートをください",
    "category": "買い物",
    "type": "phrase"
  },
  {
    "id": "p113",
    "hangul": "환불할 수 있어요?",
    "meaning": "返品できますか",
    "category": "買い物",
    "type": "phrase"
  },
  {
    "id": "p114",
    "hangul": "이게 더 좋아요",
    "meaning": "こちらのほうがいいです",
    "category": "買い物",
    "type": "phrase"
  },
  {
    "id": "p115",
    "hangul": "구경할게요",
    "meaning": "見て回ります",
    "category": "買い物",
    "type": "phrase"
  },
  {
    "id": "p116",
    "hangul": "잠깐만요",
    "meaning": "ちょっと待ってください",
    "category": "買い物",
    "type": "phrase"
  },
  {
    "id": "p117",
    "hangul": "선물이에요",
    "meaning": "プレゼントです",
    "category": "買い物",
    "type": "phrase",
    "customNote": "물이 のように ㄹ + 母音が続くと、선무리에요 に近く聞こえることがあります。"
  },
  {
    "id": "p118",
    "hangul": "선물 포장해 주세요",
    "meaning": "プレゼント包装してください",
    "category": "買い物",
    "type": "phrase"
  },
  {
    "id": "p119",
    "hangul": "품절이에요?",
    "meaning": "売り切れですか",
    "category": "買い物",
    "type": "phrase"
  },
  {
    "id": "p120",
    "hangul": "좀 더 생각할게요",
    "meaning": "もう少し考えます",
    "category": "買い物",
    "type": "phrase"
  },
  {
    "id": "p121",
    "hangul": "어디예요?",
    "meaning": "どこですか",
    "category": "移動・旅行",
    "type": "phrase"
  },
  {
    "id": "p122",
    "hangul": "화장실이 어디예요?",
    "meaning": "トイレはどこですか",
    "category": "移動・旅行",
    "type": "phrase"
  },
  {
    "id": "p123",
    "hangul": "지하철역이 어디예요?",
    "meaning": "地下鉄の駅はどこですか",
    "category": "移動・旅行",
    "type": "phrase",
    "customNote": "역 は yeok。 뒤에 이 が来ると音がつながって聞こえることもありますが、まずは 역 / 이 を分けて読む練習で十分です。"
  },
  {
    "id": "p124",
    "hangul": "왼쪽이에요",
    "meaning": "左です",
    "category": "移動・旅行",
    "type": "phrase"
  },
  {
    "id": "p125",
    "hangul": "오른쪽이에요",
    "meaning": "右です",
    "category": "移動・旅行",
    "type": "phrase"
  },
  {
    "id": "p126",
    "hangul": "똑바로 가세요",
    "meaning": "まっすぐ行ってください",
    "category": "移動・旅行",
    "type": "phrase"
  },
  {
    "id": "p127",
    "hangul": "여기에서 멀어요?",
    "meaning": "ここから遠いですか",
    "category": "移動・旅行",
    "type": "phrase"
  },
  {
    "id": "p128",
    "hangul": "가까워요",
    "meaning": "近いです",
    "category": "移動・旅行",
    "type": "phrase"
  },
  {
    "id": "p129",
    "hangul": "택시 불러 주세요",
    "meaning": "タクシーを呼んでください",
    "category": "移動・旅行",
    "type": "phrase"
  },
  {
    "id": "p130",
    "hangul": "버스가 언제 와요?",
    "meaning": "バスはいつ来ますか",
    "category": "移動・旅行",
    "type": "phrase"
  },
  {
    "id": "p131",
    "hangul": "몇 번 출구예요?",
    "meaning": "何番出口ですか",
    "category": "移動・旅行",
    "type": "phrase"
  },
  {
    "id": "p132",
    "hangul": "여기 앉아도 돼요?",
    "meaning": "ここに座ってもいいですか",
    "category": "移動・旅行",
    "type": "phrase"
  },
  {
    "id": "p133",
    "hangul": "사진 찍어 주세요",
    "meaning": "写真を撮ってください",
    "category": "移動・旅行",
    "type": "phrase",
    "customNote": "찍 の ㄲ は濃音、받침 ㄱ もあるので短く強く止める感じです。"
  },
  {
    "id": "p134",
    "hangul": "길을 몰라요",
    "meaning": "道が分かりません",
    "category": "移動・旅行",
    "type": "phrase"
  },
  {
    "id": "p135",
    "hangul": "도와주세요",
    "meaning": "助けてください",
    "category": "移動・旅行",
    "type": "phrase"
  },
  {
    "id": "p136",
    "hangul": "천천히 가 주세요",
    "meaning": "ゆっくり行ってください",
    "category": "移動・旅行",
    "type": "phrase"
  },
  {
    "id": "p137",
    "hangul": "표 한 장 주세요",
    "meaning": "切符を1枚ください",
    "category": "移動・旅行",
    "type": "phrase"
  },
  {
    "id": "p138",
    "hangul": "공항에 가요",
    "meaning": "空港へ行きます",
    "category": "移動・旅行",
    "type": "phrase"
  },
  {
    "id": "p139",
    "hangul": "호텔 예약했어요",
    "meaning": "ホテルを予約しました",
    "category": "移動・旅行",
    "type": "phrase"
  },
  {
    "id": "p140",
    "hangul": "짐이 많아요",
    "meaning": "荷物が多いです",
    "category": "移動・旅行",
    "type": "phrase"
  },
  {
    "id": "p141",
    "hangul": "시작할게요",
    "meaning": "始めます",
    "category": "配信・SNS",
    "type": "phrase"
  },
  {
    "id": "p142",
    "hangul": "같이 해요",
    "meaning": "一緒にやりましょう",
    "category": "配信・SNS",
    "type": "phrase"
  },
  {
    "id": "p143",
    "hangul": "채팅 읽을게요",
    "meaning": "チャットを読みます",
    "category": "配信・SNS",
    "type": "phrase"
  },
  {
    "id": "p144",
    "hangul": "댓글 고마워요",
    "meaning": "コメントありがとう",
    "category": "配信・SNS",
    "type": "phrase"
  },
  {
    "id": "p145",
    "hangul": "구독 감사합니다",
    "meaning": "登録ありがとうございます",
    "category": "配信・SNS",
    "type": "phrase"
  },
  {
    "id": "p146",
    "hangul": "좋아요 눌러 주세요",
    "meaning": "いいねを押してください",
    "category": "配信・SNS",
    "type": "phrase"
  },
  {
    "id": "p147",
    "hangul": "천천히 읽어 볼게요",
    "meaning": "ゆっくり読んでみます",
    "category": "配信・SNS",
    "type": "phrase"
  },
  {
    "id": "p148",
    "hangul": "오늘도 연습해요",
    "meaning": "今日も練習します",
    "category": "配信・SNS",
    "type": "phrase"
  },
  {
    "id": "p149",
    "hangul": "발음 도전이에요",
    "meaning": "発音チャレンジです",
    "category": "配信・SNS",
    "type": "phrase"
  },
  {
    "id": "p150",
    "hangul": "같이 맞혀 봐요",
    "meaning": "一緒に当ててみましょう",
    "category": "配信・SNS",
    "type": "phrase"
  },
  {
    "id": "p151",
    "hangul": "이거 들려요?",
    "meaning": "これ聞こえますか",
    "category": "配信・SNS",
    "type": "phrase"
  },
  {
    "id": "p152",
    "hangul": "화면 보여요?",
    "meaning": "画面見えますか",
    "category": "配信・SNS",
    "type": "phrase"
  },
  {
    "id": "p153",
    "hangul": "다시 해 볼게요",
    "meaning": "もう一度やってみます",
    "category": "配信・SNS",
    "type": "phrase"
  },
  {
    "id": "p154",
    "hangul": "오늘의 단어예요",
    "meaning": "今日の単語です",
    "category": "配信・SNS",
    "type": "phrase"
  },
  {
    "id": "p155",
    "hangul": "오늘의 문장이에요",
    "meaning": "今日の文です",
    "category": "配信・SNS",
    "type": "phrase"
  },
  {
    "id": "p156",
    "hangul": "더 크게 말해 볼게요",
    "meaning": "もっと大きく話してみます",
    "category": "配信・SNS",
    "type": "phrase"
  },
  {
    "id": "p157",
    "hangul": "어렵지만 재밌어요",
    "meaning": "難しいけど面白いです",
    "category": "配信・SNS",
    "type": "phrase"
  },
  {
    "id": "p158",
    "hangul": "틀려도 괜찮아요",
    "meaning": "間違えても大丈夫です",
    "category": "配信・SNS",
    "type": "phrase"
  },
  {
    "id": "p159",
    "hangul": "같이 응원해 주세요",
    "meaning": "一緒に応援してください",
    "category": "配信・SNS",
    "type": "phrase"
  },
  {
    "id": "p160",
    "hangul": "끝까지 가 봐요",
    "meaning": "最後まで行ってみましょう",
    "category": "配信・SNS",
    "type": "phrase"
  },
  {
    "id": "p161",
    "hangul": "사람",
    "meaning": "人",
    "category": "基本単語",
    "type": "word"
  },
  {
    "id": "p162",
    "hangul": "친구",
    "meaning": "友だち",
    "category": "基本単語",
    "type": "word"
  },
  {
    "id": "p163",
    "hangul": "이름",
    "meaning": "名前",
    "category": "基本単語",
    "type": "word"
  },
  {
    "id": "p164",
    "hangul": "나라",
    "meaning": "国",
    "category": "基本単語",
    "type": "word"
  },
  {
    "id": "p165",
    "hangul": "한국어",
    "meaning": "韓国語",
    "category": "基本単語",
    "type": "word"
  },
  {
    "id": "p166",
    "hangul": "학교",
    "meaning": "学校",
    "category": "基本単語",
    "type": "word"
  },
  {
    "id": "p167",
    "hangul": "회사",
    "meaning": "会社",
    "category": "基本単語",
    "type": "word"
  },
  {
    "id": "p168",
    "hangul": "집",
    "meaning": "家",
    "category": "基本単語",
    "type": "word"
  },
  {
    "id": "p169",
    "hangul": "방",
    "meaning": "部屋",
    "category": "基本単語",
    "type": "word"
  },
  {
    "id": "p170",
    "hangul": "책",
    "meaning": "本",
    "category": "基本単語",
    "type": "word"
  },
  {
    "id": "p171",
    "hangul": "물",
    "meaning": "水",
    "category": "基本単語",
    "type": "word"
  },
  {
    "id": "p172",
    "hangul": "밥",
    "meaning": "ごはん",
    "category": "基本単語",
    "type": "word"
  },
  {
    "id": "p173",
    "hangul": "커피",
    "meaning": "コーヒー",
    "category": "基本単語",
    "type": "word"
  },
  {
    "id": "p174",
    "hangul": "음식",
    "meaning": "食べ物",
    "category": "基本単語",
    "type": "word"
  },
  {
    "id": "p175",
    "hangul": "옷",
    "meaning": "服",
    "category": "基本単語",
    "type": "word"
  },
  {
    "id": "p176",
    "hangul": "가방",
    "meaning": "かばん",
    "category": "基本単語",
    "type": "word"
  },
  {
    "id": "p177",
    "hangul": "지하철",
    "meaning": "地下鉄",
    "category": "基本単語",
    "type": "word"
  },
  {
    "id": "p178",
    "hangul": "버스",
    "meaning": "バス",
    "category": "基本単語",
    "type": "word"
  },
  {
    "id": "p179",
    "hangul": "공항",
    "meaning": "空港",
    "category": "基本単語",
    "type": "word"
  },
  {
    "id": "p180",
    "hangul": "사진",
    "meaning": "写真",
    "category": "基本単語",
    "type": "word"
  },
  {
    "id": "p181",
    "hangul": "가다",
    "meaning": "行く",
    "category": "動詞・形容詞",
    "type": "word",
    "spoken": "가요",
    "example": "학교에 가요",
    "exampleMeaning": "学校に行きます",
    "customNote": "基本形の -다 を取って -요 をつけると、会話で使うやさしい形になります。"
  },
  {
    "id": "p182",
    "hangul": "오다",
    "meaning": "来る",
    "category": "動詞・形容詞",
    "type": "word",
    "spoken": "와요",
    "example": "집에 와요",
    "exampleMeaning": "家に来ます",
    "customNote": "오 + 아요 が縮んで 와요 になります。"
  },
  {
    "id": "p183",
    "hangul": "보다",
    "meaning": "見る",
    "category": "動詞・形容詞",
    "type": "word",
    "spoken": "봐요",
    "example": "드라마를 봐요",
    "exampleMeaning": "ドラマを見ます",
    "customNote": "보 + 아요 が縮んで 봐요 になります。"
  },
  {
    "id": "p184",
    "hangul": "먹다",
    "meaning": "食べる",
    "category": "動詞・形容詞",
    "type": "word",
    "spoken": "먹어요",
    "example": "밥을 먹어요",
    "exampleMeaning": "ごはんを食べます",
    "customNote": "書き方は 먹어요 のままですが、会話では 머거요 に近く聞こえることがあります。"
  },
  {
    "id": "p185",
    "hangul": "마시다",
    "meaning": "飲む",
    "category": "動詞・形容詞",
    "type": "word",
    "spoken": "마셔요",
    "example": "물을 마셔요",
    "exampleMeaning": "水を飲みます",
    "customNote": "시 + 어요 が縮んで 셔요 に近い形になります。"
  },
  {
    "id": "p186",
    "hangul": "하다",
    "meaning": "する",
    "category": "動詞・形容詞",
    "type": "word",
    "spoken": "해요",
    "example": "공부해요",
    "exampleMeaning": "勉強します",
    "customNote": "하다 は会話でとてもよく 해요 の形になります。"
  },
  {
    "id": "p187",
    "hangul": "자다",
    "meaning": "寝る",
    "category": "動詞・形容詞",
    "type": "word",
    "spoken": "자요",
    "example": "일찍 자요",
    "exampleMeaning": "早く寝ます"
  },
  {
    "id": "p188",
    "hangul": "배우다",
    "meaning": "学ぶ",
    "category": "動詞・形容詞",
    "type": "word",
    "spoken": "배워요",
    "example": "한국어를 배워요",
    "exampleMeaning": "韓国語を学びます",
    "customNote": "우 + 어요 が縮んで 워요 に近い形になります。"
  },
  {
    "id": "p189",
    "hangul": "쓰다",
    "meaning": "書く / 使う",
    "category": "動詞・形容詞",
    "type": "word",
    "spoken": "써요",
    "example": "이름을 써요",
    "exampleMeaning": "名前を書きます",
    "customNote": "ㅡ + 어요 で 써요 になります。"
  },
  {
    "id": "p190",
    "hangul": "듣다",
    "meaning": "聞く",
    "category": "動詞・形容詞",
    "type": "word",
    "spoken": "들어요",
    "example": "음악을 들어요",
    "exampleMeaning": "音楽を聞きます",
    "customNote": "듣다 は ㄷ 不規則で、母音が来ると 들어요 に変わります。"
  },
  {
    "id": "p191",
    "hangul": "크다",
    "meaning": "大きい",
    "category": "動詞・形容詞",
    "type": "word",
    "spoken": "커요",
    "example": "방이 커요",
    "exampleMeaning": "部屋が大きいです",
    "customNote": "ㅡ + 어요 で 커요 になります。"
  },
  {
    "id": "p192",
    "hangul": "작다",
    "meaning": "小さい",
    "category": "動詞・形容詞",
    "type": "word",
    "spoken": "작아요",
    "example": "가방이 작아요",
    "exampleMeaning": "かばんが小さいです"
  },
  {
    "id": "p193",
    "hangul": "빠르다",
    "meaning": "速い",
    "category": "動詞・形容詞",
    "type": "word",
    "spoken": "빨라요",
    "example": "버스가 빨라요",
    "exampleMeaning": "バスが速いです",
    "customNote": "르 が入る語は会話形で 빨라요 のように変わることがあります。"
  },
  {
    "id": "p194",
    "hangul": "느리다",
    "meaning": "遅い",
    "category": "動詞・形容詞",
    "type": "word",
    "spoken": "느려요",
    "example": "조금 느려요",
    "exampleMeaning": "少し遅いです"
  },
  {
    "id": "p195",
    "hangul": "쉽다",
    "meaning": "易しい",
    "category": "動詞・形容詞",
    "type": "word",
    "spoken": "쉬워요",
    "example": "이 단어는 쉬워요",
    "exampleMeaning": "この単語は易しいです",
    "customNote": "ㅂ 不規則で 쉽다 は 쉬워요 になります。"
  },
  {
    "id": "p196",
    "hangul": "어렵다",
    "meaning": "難しい",
    "category": "動詞・形容詞",
    "type": "word",
    "spoken": "어려워요",
    "example": "발음이 어려워요",
    "exampleMeaning": "発音が難しいです",
    "customNote": "ㅂ 不規則で 어렵다 は 어려워요 になります。"
  },
  {
    "id": "p197",
    "hangul": "오늘",
    "meaning": "今日",
    "category": "動詞・形容詞",
    "type": "word"
  },
  {
    "id": "p198",
    "hangul": "내일",
    "meaning": "明日",
    "category": "動詞・形容詞",
    "type": "word"
  },
  {
    "id": "p199",
    "hangul": "지금",
    "meaning": "今",
    "category": "動詞・形容詞",
    "type": "word"
  },
  {
    "id": "p200",
    "hangul": "조금",
    "meaning": "少し",
    "category": "動詞・形容詞",
    "type": "word"
  }
];
