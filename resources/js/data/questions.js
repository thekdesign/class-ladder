/**
 * 測驗題庫：以 Bourdieu「三種資本」拆解 privilege（特權）。
 * 3 種資本 × 每種 4 題 = 12 題，每題 5 個選項（A~E = 1~5 分），總分 12~60。
 *
 * - 經濟資本 economic：你手上的錢與資產（收入、房產、淨資產）
 * - 文化資本 cultural：知識、學養、品味、財商
 * - 社會資本 social：你認識誰、誰能幫你（同儕、人脈、原生靠山）
 *
 * 部分選項帶 note：對照真實台灣數據，讓選擇當下就有「定位感」。
 */

export const DIMENSIONS = {
    economic: {key: 'economic', label: '經濟資本', sub: '你手上的錢與資產'},
    cultural: {key: 'cultural', label: '文化資本', sub: '知識、學養、品味、財商'},
    social: {key: 'social', label: '社會資本', sub: '你認識誰、誰能幫你'},
};

export const QUESTIONS = [
    // ───────── 經濟資本 ─────────
    {
        id: 'e1',
        dimension: 'economic',
        title: '你的個人年薪或主要主動收入落在？',
        options: [
            {key: 'A', score: 1, label: 'NT$ 45 萬以下（接近基本工資、部分工時或社會新鮮人起薪）'},
            {key: 'B', score: 2, label: 'NT$ 45 ~ 65 萬（一般上班族中段）', note: '個人薪資中位數 52.5 萬落在這一段'},
            {key: 'C', score: 3, label: 'NT$ 65 ~ 100 萬（工程師、公教、上市櫃基層主管）'},
            {key: 'D', score: 4, label: 'NT$ 100 ~ 180 萬（科技業核心、資深專業職、專科醫師）', note: '年薪 127.9 萬是個人薪資前 10% 的門檻'},
            {key: 'E', score: 5, label: 'NT$ 180 萬以上（高階主管、企業主、跨國專業經理人）'},
        ],
    },
    {
        id: 'e2',
        dimension: 'economic',
        title: '關於房地產與居住狀態，你目前是？',
        options: [
            {key: 'A', score: 1, label: '在雙北或主要都會區租屋，且租金佔了收入的三分之一以上'},
            {key: 'B', score: 2, label: '住在老家或租屋，但目前薪水看不到在工作都市置產的可能'},
            {key: 'C', score: 3, label: '已置產（蛋白區或中南部），但每月房貸佔主動收入 35% 以上，稍微壓縮生活', note: '全國房貸負擔率已達 46.6%，房價所得比 10.76 倍'},
            {key: 'D', score: 4, label: '已置產（精華區），房貸繳納輕鬆，或名下有長輩留下的無貸款房產'},
            {key: 'E', score: 5, label: '名下有多處精華區不動產、土地，或主要收入來自租金等資本利得'},
        ],
    },
    {
        id: 'e3',
        dimension: 'economic',
        title: '你的「淨資產」結構（存款＋股票現值＋房產現值扣除貸款）大約是？',
        options: [
            {key: 'A', score: 1, label: '處於負債，或淨資產在 NT$ 50 萬以下'},
            {key: 'B', score: 2, label: 'NT$ 50 ~ 300 萬', note: '最低 20% 家庭平均淨值約 77 萬'},
            {key: 'C', score: 3, label: 'NT$ 300 ~ 900 萬', note: '全台家庭淨資產中位數為 894 萬'},
            {key: 'D', score: 4, label: 'NT$ 900 ~ 3,000 萬', note: '平均每戶淨值約 1,638 萬（被高資產家庭拉高）'},
            {key: 'E', score: 5, label: 'NT$ 3,000 萬以上', note: '最富 20% 家庭平均淨值 5,133 萬'},
        ],
    },
    {
        id: 'e4',
        dimension: 'economic',
        title: '若你或最親的家人突然生大病需長照、或你非自願失業，財務能撐多久不變形？',
        options: [
            {key: 'A', score: 1, label: '連 1~2 個月都很吃緊，會立刻陷入危機'},
            {key: 'B', score: 2, label: '靠存款能撐 3~6 個月，但內心會極度焦慮'},
            {key: 'C', score: 3, label: '有緊急預備金＋基本醫療／防癌險，撐一年沒問題'},
            {key: 'D', score: 4, label: '完善資產配置（穩定股利）＋高額保險，幾乎不影響生活品質'},
            {key: 'E', score: 5, label: '家族母體資源或信託在後面，這種風險只是數字變動'},
        ],
    },
    // ───────── 文化資本 ─────────
    {
        id: 'c1',
        dimension: 'cultural',
        title: '你的教育與成長環境（學歷、家庭的文化與栽培）大致是？',
        options: [
            {key: 'A', score: 1, label: '高中職以下，家中幾乎沒有藏書或藝文習慣'},
            {key: 'B', score: 2, label: '國內一般大學畢業，多半靠自己摸索'},
            {key: 'C', score: 3, label: '國內頂大或碩士，從小有栽培（才藝、補習、遊學）'},
            {key: 'D', score: 4, label: '海外名校或雙語環境，家中重視文化與教養'},
            {key: 'E', score: 5, label: '跨國菁英教育（私校／常春藤），家學淵源、文化資本世代累積'},
        ],
    },
    {
        id: 'c2',
        dimension: 'cultural',
        title: '你的財商與理財知識到什麼程度？',
        options: [
            {key: 'A', score: 1, label: '沒有餘錢投資，也沒在管錢，標準月光族'},
            {key: 'B', score: 2, label: '跟風定期定額或買高股息 ETF，但說不太出原理'},
            {key: 'C', score: 3, label: '懂複利與長線，有系統配置大盤 ETF／個股／海外資產'},
            {key: 'D', score: 4, label: '看得懂財報與總經、能運用槓桿，涉足房地產或一級市場'},
            {key: 'E', score: 5, label: '有專屬顧問與會計師，以家族傳承、節稅、資產架構為核心'},
        ],
    },
    {
        id: 'c3',
        dimension: 'cultural',
        title: '你的品味、文化消費與語言能力比較接近？',
        options: [
            {key: 'A', score: 1, label: '休閒以追劇、手遊、CP 值娛樂為主，外語幾乎用不到'},
            {key: 'B', score: 2, label: '偶爾旅遊、看展，能用簡單外語'},
            {key: 'C', score: 3, label: '有固定閱讀／藝文習慣或一門才藝，外語能順暢溝通'},
            {key: 'D', score: 4, label: '紅酒、藝術、高爾夫或音樂會是日常，雙語流利'},
            {key: 'E', score: 5, label: '收藏或贊助藝文，多語切換自如，品味本身就是社交貨幣'},
        ],
    },
    {
        id: 'c4',
        dimension: 'cultural',
        title: '你平常獲取與判斷資訊的方式，比較接近？',
        options: [
            {key: 'A', score: 1, label: '演算法推什麼就看什麼，很少查證'},
            {key: 'B', score: 2, label: '會看新聞和社群，但較少主動分辨來源可信度'},
            {key: 'C', score: 3, label: '有固定的優質資訊來源，會交叉查證、分得出雜訊'},
            {key: 'D', score: 4, label: '習慣讀一手資料／國外資訊／專業報告，判讀力強'},
            {key: 'E', score: 5, label: '有人脈或團隊幫你過濾，能拿到別人接觸不到的內部資訊'},
        ],
    },
    // ───────── 社會資本 ─────────
    {
        id: 's1',
        dimension: 'social',
        title: '你身邊最常接觸、討論事情的 5 個核心同儕圈，最常聊的話題是？',
        options: [
            {key: 'A', score: 1, label: '抱怨老闆、物價、優惠券、娛樂八卦或遊戲'},
            {key: 'B', score: 2, label: '討論哪裡買房性價比高、如何開源節流、精打細算生活開銷'},
            {key: 'C', score: 3, label: '討論特定專業技術優化、跳槽加薪、大盤轉折與資產配置'},
            {key: 'D', score: 4, label: '討論產業未來趨勢、創業賽道、跨國投資機會與優質資產轉移'},
            {key: 'E', score: 5, label: '討論商業資源整合、家族二代接班、跨國稅務與政策風向'},
        ],
    },
    {
        id: 's2',
        dimension: 'social',
        title: '遇到難題（找工作、就醫、法律、創業）時，你的人脈能幫你解決到什麼程度？',
        options: [
            {key: 'A', score: 1, label: '基本上只能靠自己 Google、自己硬扛'},
            {key: 'B', score: 2, label: '朋友能給點建議，但幫不上實質的忙'},
            {key: 'C', score: 3, label: '有幾個能幫你引薦、內推的人脈'},
            {key: 'D', score: 4, label: '一通電話就能找到該領域的專業人士幫忙'},
            {key: 'E', score: 5, label: '能動用跨界高層或直達決策者的資源'},
        ],
    },
    {
        id: 's3',
        dimension: 'social',
        title: '你的原生家庭能給你什麼樣的起跑資源？',
        options: [
            {key: 'A', score: 1, label: '我反而需要金援原生家庭'},
            {key: 'B', score: 2, label: '家裡幫不上忙，但至少不拖累我'},
            {key: 'C', score: 3, label: '需要時，家裡能支援頭期款或應急金'},
            {key: 'D', score: 4, label: '家裡有人脈與資源，能幫我引薦、鋪路'},
            {key: 'E', score: 5, label: '家族本身就是一張政商資源網，起跑點遠超多數人'},
        ],
    },
    {
        id: 's4',
        dimension: 'social',
        title: '除了朋友，你有沒有「能互相拉抬」的社群或組織？',
        options: [
            {key: 'A', score: 1, label: '基本上沒有，遇事多半單打獨鬥'},
            {key: 'B', score: 2, label: '有一些線上社團或同好，但很難轉成實質幫助'},
            {key: 'C', score: 3, label: '有校友會／產業社群／同事圈，需要時找得到人'},
            {key: 'D', score: 4, label: '身處有影響力的專業圈或商會，資源與機會會主動流過來'},
            {key: 'E', score: 5, label: '置身政商／家族／菁英網絡，圈子本身就是門檻與槓桿'},
        ],
    },
];

export const TOTAL_QUESTIONS = QUESTIONS.length;
export const MIN_SCORE = TOTAL_QUESTIONS; // 9
export const MAX_SCORE = TOTAL_QUESTIONS * 5; // 45

/** 每種資本的題數（用於 PR 換算：單一資本分數區間 = QUESTIONS_PER_CAPITAL ~ ×5） */
export const QUESTIONS_PER_CAPITAL = 4;
