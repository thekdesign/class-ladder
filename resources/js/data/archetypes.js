/**
 * 預設「原型」：用於沒有朋友連結時也能比較（解決冷啟動）。
 * answers 對應 QUESTIONS 順序 [e1,e2,e3, c1,c2,c3, s1,s2,s3]，值 1~5。
 * 數字是依台灣常見樣態 + 真實分布捏的，讓三資本形狀有辨識度。
 */

export const ARCHETYPES = [
    {
        id: 'engineer',
        emoji: '👨‍💻',
        name: '竹科工程師',
        blurb: '高薪、有房、財商在線，生活重心在工作',
        answers: [4, 3, 3, 3, 4, 2, 3, 3, 2],
    },
    {
        id: 'renter',
        emoji: '🏙️',
        name: '雙北租屋小資族',
        blurb: '薪水中段、租金吃掉一截、資產還在起步',
        answers: [2, 1, 2, 2, 2, 2, 2, 2, 2],
    },
    {
        id: 'doctor2',
        emoji: '🩺',
        name: '醫師世家二代',
        blurb: '三種資本世襲，起跑點遙遙領先',
        answers: [5, 4, 4, 5, 4, 4, 4, 4, 5],
    },
    {
        id: 'lieflat',
        emoji: '🛋️',
        name: '躺平青年',
        blurb: '低物慾、低累積，主打一個無所謂',
        answers: [1, 2, 1, 3, 1, 2, 1, 2, 2],
    },
    {
        id: 'landlord',
        emoji: '🏠',
        name: '包租公',
        blurb: '資本利得為主，錢替他工作',
        answers: [5, 5, 5, 2, 4, 2, 4, 3, 3],
    },
    {
        id: 'creative',
        emoji: '🎨',
        name: '文青接案族',
        blurb: '品味與學養滿點，戶頭比較瘦',
        answers: [2, 1, 2, 4, 2, 5, 3, 3, 2],
    },
];

export const getArchetype = (id) => ARCHETYPES.find((a) => a.id === id);
