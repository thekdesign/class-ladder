import {ref, onMounted} from 'vue';

/**
 * 數字從 0 滾到 target 的小動畫（SSR 安全、尊重 prefers-reduced-motion）。
 * @param {number} target 目標值
 * @param {number} duration 毫秒
 * @returns {import('vue').Ref<number>}
 */
export const useCountUp = (target, duration = 900) => {
    const value = ref(0);

    onMounted(() => {
        if (typeof window === 'undefined') {
            value.value = target;

            return;
        }

        const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (reduce || !target) {
            value.value = target;

            return;
        }

        const start = performance.now();
        const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);

            value.value = Math.round((1 - (1 - t) ** 3) * target);
            if (t < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    });

    return value;
};
