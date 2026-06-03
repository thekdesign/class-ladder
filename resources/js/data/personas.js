/**
 * 資本「組成」診斷：Bourdieu 的重點不只是資本多寡，更是「組成比例」。
 * 同樣的特權 PR，三種資本的形狀不同，就是完全不同的人。
 *
 * 依三種資本的 PR（0~100）形狀分型，語氣走「有梗但中肯」。
 */

export const PERSONAS = {
    elite: {
        id: 'elite',
        emoji: '👑',
        name: '世襲菁英型',
        tagline: '三種資本通吃，起跑點直接贏在子宮',
        desc: '經濟、文化、社會資本全面領先。你玩的根本不是同一場遊戲——你拿的是創作者模式。守成與傳承，才是你真正的課題。',
    },
    nouveau: {
        id: 'nouveau',
        emoji: '💰',
        name: '暴發戶型',
        tagline: '錢到位了，氣質和人脈還在運送中',
        desc: '本錢主要押在經濟資本，文化與社會資本相對單薄。錢能買到很多東西，但買不到的那些（品味、圈子、底蘊），正好是你的下一關。',
    },
    genteel: {
        id: 'genteel',
        emoji: '📚',
        name: '清貴文青型',
        tagline: '談吐品味滿分，戶頭餘額…我們先不談這個',
        desc: '文化資本是你的強項，學養、品味、語言都不缺，就是經濟資本稍微跟不上理想。把你的才華變現，是這型人最大的功課。',
    },
    connector: {
        id: 'connector',
        emoji: '🤝',
        name: '人脈王型',
        tagline: '你可能不是最有錢的，但你誰都認識',
        desc: '社會資本是你的超能力，一通電話能搞定別人跑斷腿的事。下一步：把人脈轉化成實質的經濟與文化資本，威力加倍。',
    },
    steady: {
        id: 'steady',
        emoji: '⚖️',
        name: '穩扎穩打型',
        tagline: '沒有特別猛的，也沒有拖後腿的',
        desc: '三種資本平均發展、沒有明顯短板。低調，但這種人最耐震——遇到風浪不容易翻船，慢慢加碼就會穩穩往上。',
    },
    barehanded: {
        id: 'barehanded',
        emoji: '✊',
        name: '赤手空拳型',
        tagline: '三種資本都還在路上，但也代表沒有包袱',
        desc: '三項都還在累積階段。好消息是：接下來每一步都是淨增長，沒什麼好輸的。先選一種資本當突破口，集中火力。',
    },
};

/**
 * 依三資本 PR 形狀分型。
 * @param {Array} dims - dimensionScores() 的回傳，每項含 key 與 pr
 */
export const classifyPersona = (dims = []) => {
    const get = (key) => dims.find((d) => d.key === key)?.pr ?? 0;
    const eco = get('economic');
    const cul = get('cultural');
    const soc = get('social');
    const max = Math.max(eco, cul, soc);
    const min = Math.min(eco, cul, soc);
    const spread = max - min;

    if (min >= 67) return PERSONAS.elite;        // 三項都高
    if (max <= 34) return PERSONAS.barehanded;   // 三項都低
    if (spread <= 18) return PERSONAS.steady;    // 均衡中段

    // 失衡：看最突出的那種資本
    if (eco >= cul && eco >= soc) return PERSONAS.nouveau;
    if (cul >= eco && cul >= soc) return PERSONAS.genteel;

    return PERSONAS.connector;
};

/** 補強最弱資本的建議（放結果頁的「最弱一環」） */
export const CAPITAL_TIPS = {
    economic: '經濟資本最直接：先把儲蓄率拉到 20%、開始定額買大盤 ETF，讓錢替你加班。',
    cultural: '文化資本最難用錢買、也最會世代複製：固定閱讀、養一門才藝或外語，這是長期最高的隱形門檻。',
    social: '社會資本得刻意經營：主動進對的圈子、定期維繫關係——你的下一個機會，多半來自「人」而不是 104。',
};

/** 找出 PR 最低的資本 */
export const weakestCapital = (dims = []) => dims.reduce((lowest, d) => (d.pr < lowest.pr ? d : lowest), dims[0] || {pr: 0});
