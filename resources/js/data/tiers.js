/**
 * 四個社會階層級距（總分 7~35）。
 *
 * 每級：稱號、副標、色票、原版描述、戰術、以及「對照的真實台灣數據」(anchors)。
 * anchors 引用 data/stats.js 的 id，結果頁會把真實數字 + 出處渲染出來。
 */

export const TIERS = [
    {
        id: 'survival',
        min: 7,
        max: 12,
        zone: '生存防守區',
        name: '底層與財務弱勢',
        color: '#FB7185', // rose-400
        accent: 'rose',
        summary: '你目前在台灣的社會位置主要在「生存防守」。時間高度被勞動綁定，且缺乏對抗意外的安全網。',
        tactic: '這個階段的翻身戰術只有一個：極端開源（累積一門高產值技術）＋ 防禦（存下第一筆雷打不動的緊急預備金）。',
        anchors: ['salaryBottom', 'mortgageBurden'],
        anchorIntro: '你所在的位置，對照真實數據：',
    },
    {
        id: 'middle',
        min: 13,
        max: 20,
        zone: '痛感最深的陣痛區',
        name: '邊緣中產至核心中產',
        color: '#FBBF24', // amber-400
        accent: 'amber',
        summary: '這是多數台灣年輕人的交叉點。薪水在平均線上下、生活過得去，但面對房價與通膨有很深的「下流焦慮」，名下資產多為消費性（機車、國產車）。',
        tactic: '要擺脫焦慮，核心是把「勞動收入」轉化為「市值型資產（大盤 ETF、優質股權）」，讓錢開始幫你工作。',
        anchors: ['salaryMedian', 'householdIncomeMedian', 'priceToIncome'],
        anchorIntro: '你正卡在這幾條線中間：',
    },
    {
        id: 'elite',
        min: 21,
        max: 27,
        zone: '掌握選擇權的翻身區',
        name: '富裕中產與精英階層',
        color: '#24C2CE', // teal-400
        accent: 'teal',
        summary: '你已透過個人的專業壁壘（高階工程師、醫師、律師）成功突圍。進餐廳不再先看價格，生病失業有抗風險能力，名下資產開始產生複利。你擁有了生活的「主導權」。',
        tactic: '你已成功翻身，接下來要對抗的是資訊落差，以及資產的稅務／法律防護。',
        anchors: ['salaryTop10', 'householdIncomeTop20', 'wealthMedian'],
        anchorIntro: '你已經跨過這些門檻：',
    },
    {
        id: 'top',
        min: 28,
        max: 35,
        zone: '資本利得與資源傳承區',
        name: '頂層社會',
        color: '#A78BFA', // violet-400
        accent: 'violet',
        summary: '你或你的家族已是台灣前 1~5% 的群體。徹底脫離了出賣時間的階段，身處由資本利得、社會資源與核心資訊交織的網絡。下一代的起跑點與多數人截然不同。',
        tactic: '你的核心課題是跨世代的資源傳承與財富保值。',
        anchors: ['taxTopBracket', 'wealthTop20'],
        anchorIntro: '你對標的是金字塔頂端：',
    },
];

export const getTierByScore = (score) => TIERS.find((t) => score >= t.min && score <= t.max) || TIERS[0];

/** 同儕悄悄話：放在結果頁底部，緩衝測出陣痛區的挫折感 */
export const PEER_NOTE = '很多年輕人在台灣（尤其雙北）剛起步時，因為買不起房、淨資產還在累積，測出來往往落在 13~20 分的陣痛區。這很正常 —— 從「收入高」到「資產多」中間，需要時間的複利去發酵。';
