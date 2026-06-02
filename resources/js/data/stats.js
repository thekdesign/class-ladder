/**
 * 台灣真實統計數據（用於校準級距、結果文案與「數據出處」頁）
 *
 * 每筆都標年份與來源；個人薪資 vs 家戶所得口徑不同，引用時勿混用。
 * 來源以主計總處、內政部不動產資訊平台、財政部為主。
 */

export const SOURCES = {
    dgbasIncome: {
        label: '主計總處《家庭收支調查》2024（民國 113 年）',
        url: 'https://money.udn.com/money/story/10869/8942800',
    },
    dgbasSalary: {
        label: '主計總處《受僱員工全年總薪資中位數及分布統計》2023（民國 112 年）',
        url: 'https://www.dgbas.gov.tw/News_Content.aspx?n=3602&s=234206',
    },
    dgbasWealth: {
        label: '主計總處《家庭財富分配統計》2021（民國 110 年底）',
        url: 'https://www.thenewslens.com/article/202097',
    },
    moiHousing: {
        label: '內政部不動產資訊平台《房價負擔能力統計》2024 Q4',
        url: 'https://pip.moi.gov.tw/Publicize/Info/E1050',
    },
    motTax: {
        label: '財政部《綜合所得稅課稅級距》2025 報稅適用',
        url: 'https://www.dot.gov.tw/singlehtml/ch26?cntId=f55dca4144f54f7195a5ddfce4c08fbe',
    },
};

/**
 * 關鍵統計卡片：放在結果頁與數據頁。
 * value 為展示字串、figure 為主要數字、unit 補充。
 */
export const STATS = [
    {
        id: 'salaryMedian',
        category: '個人薪資',
        title: '受僱員工全年總薪資中位數',
        figure: '52.5',
        unit: '萬 / 年',
        detail: '約等於月薪 4.4 萬（含獎金）。贏過一半的受僱者，就站在這條線上。',
        year: '2023',
        sourceKey: 'dgbasSalary',
    },
    {
        id: 'salaryTop10',
        category: '個人薪資',
        title: '個人年薪「前 10%」門檻',
        figure: '127.9',
        unit: '萬 / 年',
        detail: '全年總薪資第 9 十分位（D9）。跨過這條線，個人薪資贏過全台九成受僱者。',
        year: '2023',
        sourceKey: 'dgbasSalary',
    },
    {
        id: 'salaryBottom',
        category: '個人薪資',
        title: '年薪後段（D3）',
        figure: '41.3',
        unit: '萬 / 年',
        detail: '第 3 十分位。年薪低於此，大致落在全台受僱者的後 1/4。',
        year: '2023',
        sourceKey: 'dgbasSalary',
    },
    {
        id: 'householdIncomeMedian',
        category: '家庭所得',
        title: '家庭可支配所得中位數',
        figure: '98.5',
        unit: '萬 / 戶',
        detail: '平均數則為 116.5 萬。這是「一整個家庭一年能花用的錢」的中間值。',
        year: '2024',
        sourceKey: 'dgbasIncome',
    },
    {
        id: 'householdIncomeTop20',
        category: '家庭所得',
        title: '最高所得 20% 家庭',
        figure: '235.7',
        unit: '萬 / 戶',
        detail: '最低 20% 家庭為 38.4 萬，高低差距 6.14 倍。',
        year: '2024',
        sourceKey: 'dgbasIncome',
    },
    {
        id: 'wealthMedian',
        category: '家庭財富',
        title: '家庭淨資產中位數',
        figure: '894',
        unit: '萬 / 戶',
        detail: '平均每戶淨值 1,638 萬（被高資產家庭拉高）。淨值 = 房+股+存款−負債。',
        year: '2021',
        sourceKey: 'dgbasWealth',
    },
    {
        id: 'wealthTop20',
        category: '家庭財富',
        title: '最富 20% 家庭平均淨值',
        figure: '5,133',
        unit: '萬 / 戶',
        detail: '最窮 20% 家庭僅 76.7 萬，差距達 66.9 倍。',
        year: '2021',
        sourceKey: 'dgbasWealth',
    },
    {
        id: 'priceToIncome',
        category: '居住負擔',
        title: '全國房價所得比',
        figure: '10.76',
        unit: '倍',
        detail: '不吃不喝近 11 年才買得起一間房。台北市 16.43 倍、新北市 14.08 倍。',
        year: '2024 Q4',
        sourceKey: 'moiHousing',
    },
    {
        id: 'mortgageBurden',
        category: '居住負擔',
        title: '全國房貸負擔率',
        figure: '46.62',
        unit: '%',
        detail: '每月近一半收入要拿去繳房貸，已超過國際 30% 的「過度負擔」警戒線。',
        year: '2024 Q4',
        sourceKey: 'moiHousing',
    },
    {
        id: 'taxTopBracket',
        category: '稅務',
        title: '綜所稅最高級距（40%）門檻',
        figure: '498',
        unit: '萬',
        detail: '綜合所得淨額逾 498 萬適用 40% 稅率，是體感「頂層」的稅務分界線。',
        year: '2025 報稅',
        sourceKey: 'motTax',
    },
];

export const getStat = (id) => STATS.find((s) => s.id === id);
