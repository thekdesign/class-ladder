/**
 * 純計分邏輯（與 Vue / store 解耦，可單測、可在 Node 直跑）。
 *
 * answers: 長度 7 的陣列，每格為該題選項分數 (1~5)，未答為 undefined。
 */
import {QUESTIONS, MIN_SCORE, MAX_SCORE} from 'data/questions';
import {DIMENSIONS} from 'data/questions';
import {getTierByScore} from 'data/tiers';
import {classifyPersona, weakestCapital} from 'data/personas';
import {INHERITED_QUESTIONS, EARNED_QUESTIONS, inheritanceVerdict} from 'data/inheritance';

export const answeredCount = (answers = []) => answers.filter((s) => typeof s === 'number').length;

export const isComplete = (answers = []) => answeredCount(answers) === QUESTIONS.length;

export const totalScore = (answers = []) => answers.reduce((sum, s) => sum + (typeof s === 'number' ? s : 0), 0);

/** 把總分換算成 0~100 的百分位光譜位置（純視覺用，非統計分位） */
export const scorePercent = (score) => {
    const span = MAX_SCORE - MIN_SCORE;
    return Math.round(((score - MIN_SCORE) / span) * 100);
};

export const tierOf = (score) => getTierByScore(score);

/** 把分數換算成 0~100 的 PR（量表位置，非全國真實百分位） */
export const toPr = (score, min, max) => {
    if (max <= min) return 0;

    return Math.round(((score - min) / (max - min)) * 100);
};

/**
 * 各資本得分：回傳 [{key,label,sub,score,min,max,pr}]。
 * 給結果頁的三資本長條 + 每資本 PR 值用。
 */
export const dimensionScores = (answers = []) => {
    const buckets = {};
    QUESTIONS.forEach((q, i) => {
        const s = typeof answers[i] === 'number' ? answers[i] : 0;
        if (!buckets[q.dimension]) buckets[q.dimension] = {score: 0, count: 0};
        buckets[q.dimension].score += s;
        buckets[q.dimension].count += 1;
    });

    return Object.values(DIMENSIONS).map((dim) => {
        const score = buckets[dim.key]?.score || 0;
        const count = buckets[dim.key]?.count || 0;
        const min = count; // 每題最低 1 分
        const max = count * 5;

        return {...dim, score, min, max, pr: toPr(score, min, max)};
    });
};

/** 繼承 vs 自掙拆解：回傳兩邊分數、繼承占比、與一句評語 */
export const inheritanceSplit = (answers = []) => {
    const byId = {};

    QUESTIONS.forEach((q, i) => {
        byId[q.id] = typeof answers[i] === 'number' ? answers[i] : 0;
    });

    const inherited = INHERITED_QUESTIONS.reduce((sum, id) => sum + (byId[id] || 0), 0);
    const earned = EARNED_QUESTIONS.reduce((sum, id) => sum + (byId[id] || 0), 0);
    const total = inherited + earned;
    const inheritedPct = total ? Math.round((inherited / total) * 100) : 50;

    return {inherited, earned, inheritedPct, earnedPct: 100 - inheritedPct, verdict: inheritanceVerdict(inheritedPct)};
};

/**
 * 把一份 answers 整理成完整結果摘要（給結果頁、分享卡、比較頁共用）。
 * 純函式：傳入任意 answers 都能算，不依賴 store。
 */
export const summarize = (answers = []) => {
    const total = totalScore(answers);
    const dimensions = dimensionScores(answers);

    return {
        answers,
        total,
        percent: scorePercent(total),
        complete: isComplete(answers),
        tier: tierOf(total),
        dimensions,
        persona: classifyPersona(dimensions),
        weakest: weakestCapital(dimensions),
        inheritance: inheritanceSplit(answers),
    };
};
