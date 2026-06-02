/**
 * 純計分邏輯（與 Vue / store 解耦，可單測、可在 Node 直跑）。
 *
 * answers: 長度 7 的陣列，每格為該題選項分數 (1~5)，未答為 undefined。
 */
import {QUESTIONS, MIN_SCORE, MAX_SCORE} from 'data/questions';
import {DIMENSIONS} from 'data/questions';
import {getTierByScore} from 'data/tiers';

export const answeredCount = (answers = []) => answers.filter((s) => typeof s === 'number').length;

export const isComplete = (answers = []) => answeredCount(answers) === QUESTIONS.length;

export const totalScore = (answers = []) => answers.reduce((sum, s) => sum + (typeof s === 'number' ? s : 0), 0);

/** 把總分換算成 0~100 的百分位光譜位置（純視覺用，非統計分位） */
export const scorePercent = (score) => {
    const span = MAX_SCORE - MIN_SCORE;
    return Math.round(((score - MIN_SCORE) / span) * 100);
};

export const tierOf = (score) => getTierByScore(score);

/** 各構面得分：回傳 [{key,label,sub,score,max}]，給結果頁的雷達／長條用 */
export const dimensionScores = (answers = []) => {
    const buckets = {};
    QUESTIONS.forEach((q, i) => {
        const s = typeof answers[i] === 'number' ? answers[i] : 0;
        if (!buckets[q.dimension]) buckets[q.dimension] = {score: 0, max: 0};
        buckets[q.dimension].score += s;
        buckets[q.dimension].max += 5;
    });

    return Object.values(DIMENSIONS).map((dim) => ({
        ...dim,
        score: buckets[dim.key]?.score || 0,
        max: buckets[dim.key]?.max || 0,
    }));
};
