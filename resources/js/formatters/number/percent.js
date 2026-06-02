/** 數字格式化小工具（純函式） */

export const clampPercent = (n) => Math.max(0, Math.min(100, n));

/** 把 0~1 或 0~100 的比例轉成「整數 %」字串 */
export const toPercent = (ratio) => {
    const v = ratio <= 1 ? ratio * 100 : ratio;
    return `${Math.round(clampPercent(v))}%`;
};
