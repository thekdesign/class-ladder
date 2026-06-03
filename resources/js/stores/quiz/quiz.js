import {defineStore} from 'pinia';
import {QUESTIONS} from 'data/questions';
import {totalScore, answeredCount, isComplete, tierOf, dimensionScores, scorePercent} from 'libs/score';
import {classifyPersona, weakestCapital} from 'data/personas';

const STORAGE_KEY = 'class-ladder:answers:v2';
const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const emptyAnswers = () => QUESTIONS.map(() => undefined);

const loadFromStorage = () => {
    if (!isBrowser) return {answers: emptyAnswers()};
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return {answers: emptyAnswers()};
        const parsed = JSON.parse(raw);
        const answers = emptyAnswers();
        if (Array.isArray(parsed.answers)) {
            parsed.answers.forEach((s, i) => {
                if (typeof s === 'number' && i < answers.length) answers[i] = s;
            });
        }
        return {answers};
    } catch (e) {
        return {answers: emptyAnswers()};
    }
};

export const useQuizStore = defineStore('quiz', {
    state: () => ({
        ...loadFromStorage(),
        // 作答頁目前所在題索引（不持久化）
        currentIndex: 0,
    }),

    getters: {
        total: (state) => totalScore(state.answers),
        answered: (state) => answeredCount(state.answers),
        complete: (state) => isComplete(state.answers),
        percent: (state) => scorePercent(totalScore(state.answers)),
        tier: (state) => tierOf(totalScore(state.answers)),
        dimensions: (state) => dimensionScores(state.answers),
        persona: (state) => classifyPersona(dimensionScores(state.answers)),
        weakest: (state) => weakestCapital(dimensionScores(state.answers)),
        progress: (state) => Math.round((answeredCount(state.answers) / QUESTIONS.length) * 100),
    },

    actions: {
        answer(index, score) {
            const next = [...this.answers];
            next[index] = score;
            this.answers = next;
            this.persist();
        },
        setCurrentIndex(index) {
            this.currentIndex = Math.max(0, Math.min(QUESTIONS.length - 1, index));
        },
        reset() {
            this.answers = emptyAnswers();
            this.currentIndex = 0;
            this.persist();
        },
        persist() {
            if (!isBrowser) return;
            try {
                window.localStorage.setItem(STORAGE_KEY, JSON.stringify({answers: this.answers}));
            } catch (e) {
                // ignore quota / privacy mode
            }
        },
    },
});
