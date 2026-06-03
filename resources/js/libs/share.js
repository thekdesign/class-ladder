/**
 * 把作答編碼進網址，做「連結比較」用（純前端、無後端）。
 * answers 為 9 格、每格 1~5 → 編成 9 位數字字串，例如 "352414235"。
 */
import {QUESTIONS} from 'data/questions';

export const encodeAnswers = (answers = []) => answers
    .map((s) => (typeof s === 'number' && s >= 1 && s <= 5 ? String(s) : '0'))
    .join('');

export const decodeAnswers = (str) => {
    if (typeof str !== 'string' || str.length !== QUESTIONS.length) return null;

    const arr = [];

    for (const ch of str) {
        const n = Number(ch);

        if (!Number.isInteger(n) || n < 1 || n > 5) return null;
        arr.push(n);
    }

    return arr;
};
