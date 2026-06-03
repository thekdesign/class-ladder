/**
 * 「繼承 vs 自掙」拆解：Bourdieu 的核心是資本「再生產」——
 * 多少特權是出廠配備（家庭給的），多少是自己掙的。
 *
 * 用現有 9 題的子集推算，不額外加題：
 * - 繼承面：教育/家庭文化(c1)、品味語言(c3，文化資本世代傳遞)、原生家庭靠山(s3)
 * - 自掙面：主動收入(e1)、財商(c2)、人脈經營(s2)
 * 房產/淨資產/同儕圈(e2/e3/s1) 混合難歸類，不納入此拆解。
 */

export const INHERITED_QUESTIONS = ['c1', 'c3', 's3'];
export const EARNED_QUESTIONS = ['e1', 'c2', 's2'];

export const inheritanceVerdict = (inheritedPct) => {
    if (inheritedPct >= 60) {
        return {
            label: '出廠配備充足型',
            desc: '你的特權有不少是「投對胎」附贈的——家庭、教育、人脈的底子先天就比較厚。善用它沒問題，但別整碗都當成自己的功勞。',
        };
    }
    if (inheritedPct >= 45) {
        return {
            label: '繼承自掙參半',
            desc: '起跑點家裡墊了一點，後面靠自己補上來，標準的中產努力組合。再往上，看你能不能把自掙的部分滾大。',
        };
    }

    return {
        label: '白手起家型',
        desc: '你的特權多半是自己一磚一瓦掙來的，先天紅利不多。硬，而且你撐住的東西通常更穩、更知道怎麼來的。',
    };
};
