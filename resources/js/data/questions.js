/**
 * 測驗題庫：7 題，每題 5 個選項（A~E = 1~5 分），總分 7~35。
 *
 * 分四個構面（dimension）：資本實力、安全網、認知與環境、時間與主導權。
 * 部分選項帶 note：對照真實台灣數據，讓選擇當下就有「定位感」。
 */

export const DIMENSIONS = {
    capital: {key: 'capital', label: '資本實力', sub: '財務與資產結構'},
    safety: {key: 'safety', label: '安全網', sub: '抗風險與防禦力'},
    cognition: {key: 'cognition', label: '認知與環境', sub: '社會與文化資本'},
    autonomy: {key: 'autonomy', label: '時間與主導權', sub: '生活型態'},
};

export const QUESTIONS = [
    {
        id: 'q1',
        dimension: 'capital',
        title: '你的個人年薪或主要主動收入落在？',
        options: [
            {key: 'A', score: 1, label: 'NT$ 40 萬以下（接近基本工資）'},
            {key: 'B', score: 2, label: 'NT$ 40 ~ 70 萬（基層、服務業或一般內勤中位數區間）'},
            {key: 'C', score: 3, label: 'NT$ 70 ~ 150 萬（工程師、公教、上市櫃基層主管）', note: '年薪跨過 127.9 萬就擠進個人薪資前 10%'},
            {key: 'D', score: 4, label: 'NT$ 150 ~ 300 萬（科技業核心、資深專業職、專科醫學精英）'},
            {key: 'E', score: 5, label: 'NT$ 300 萬以上（高階主管、企業主、跨國專業經理人）'},
        ],
    },
    {
        id: 'q2',
        dimension: 'capital',
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
        id: 'q3',
        dimension: 'capital',
        title: '你的「淨資產」結構（存款＋股票現值＋房產現值扣除貸款）大約是？',
        options: [
            {key: 'A', score: 1, label: '處於負債，或淨資產在 NT$ 50 萬以下'},
            {key: 'B', score: 2, label: 'NT$ 50 ~ 300 萬之間'},
            {key: 'C', score: 3, label: 'NT$ 300 ~ 1,500 萬之間', note: '全台家庭淨資產中位數為 894 萬'},
            {key: 'D', score: 4, label: 'NT$ 1,500 ~ 5,000 萬之間'},
            {key: 'E', score: 5, label: 'NT$ 5,000 萬以上（甚至破億）', note: '最富 20% 家庭平均淨值 5,133 萬'},
        ],
    },
    {
        id: 'q4',
        dimension: 'safety',
        title: '若你或最親的家人突然生大病需長期照顧，或你非自願失業，財務能撐多久不變形？',
        options: [
            {key: 'A', score: 1, label: '連 1~2 個月都很難熬，會立刻陷入斷炊危機'},
            {key: 'B', score: 2, label: '靠微薄存款可以撐 3~6 個月，但內心會極度焦慮'},
            {key: 'C', score: 3, label: '依靠緊急預備金與基本醫療險、防癌險，可以安心支撐 1 年不工作'},
            {key: 'D', score: 4, label: '完善的資產配置（源源不絕的股利）與高額保險，完全不影響生活品質'},
            {key: 'E', score: 5, label: '家族有龐大母體資源或家族信託，這類風險只是數字變動，不構成生存威脅'},
        ],
    },
    {
        id: 'q5',
        dimension: 'cognition',
        title: '你平時主要的投資與理財行為是？',
        options: [
            {key: 'A', score: 1, label: '沒有餘錢可以投資，屬於標準的月光族或現賺現花'},
            {key: 'B', score: 2, label: '跟風定期定額或買高股息 ETF，但容易受市場波動影響心情'},
            {key: 'C', score: 3, label: '有系統地配置大盤市值型 ETF、個股或海外資產，明白複利與長線邏輯'},
            {key: 'D', score: 4, label: '除股市外，還涉足海內外房地產、一級市場，或能精準利用槓桿擴大資產'},
            {key: 'E', score: 5, label: '擁有專屬理財顧問、會計師或租稅規劃，投資以「家族資產傳承與避稅」為核心'},
        ],
    },
    {
        id: 'q6',
        dimension: 'cognition',
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
        id: 'q7',
        dimension: 'autonomy',
        title: '關於你的時間分配，你手頭的主導權有多少？',
        options: [
            {key: 'A', score: 1, label: '典型「拿時間與體力換錢」，完全受制於排班或主管，請假或生病就會少賺'},
            {key: 'B', score: 2, label: '朝九晚五責任制，壓力不小，薪水穩定但下班後身心俱疲，很難自我提升'},
            {key: 'C', score: 3, label: '具備高產值專業（如前後端工程師、核心技術職），有彈性／遠端／拒絕不合理要求的底氣'},
            {key: 'D', score: 4, label: '核心管理職或成熟自營商，已脫離一線勞動，可自由掌控高比例的日程'},
            {key: 'E', score: 5, label: '財富自由或資產全面自動化運轉，時間 100% 由自己定義，工作只是興趣的延伸'},
        ],
    },
];

export const TOTAL_QUESTIONS = QUESTIONS.length;
export const MIN_SCORE = TOTAL_QUESTIONS; // 7
export const MAX_SCORE = TOTAL_QUESTIONS * 5; // 35
