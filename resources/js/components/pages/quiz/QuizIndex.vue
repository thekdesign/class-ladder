<template>
    <div class="max-w-[720px] mx-auto px-5 sm:px-7 pt-8 sm:pt-12 pb-10">
        <!-- 進度條 -->
        <div class="mb-8">
            <div class="flex items-center justify-between mb-2.5">
                <span class="font-mono text-xs text-steel-400">
                    第 <span class="text-teal-300">{{ index + 1 }}</span> / {{ total }} 題
                </span>
                <span class="font-mono text-xs text-steel-500">{{ store.answered }} / {{ total }} 已作答</span>
            </div>
            <div class="h-1.5 rounded-full bg-steel-800 overflow-hidden">
                <div
                    class="h-full bg-gradient-to-r from-teal-400 to-teal-300 rounded-full transition-all duration-500"
                    :style="{width: `${((index + 1) / total) * 100}%`}"
                ></div>
            </div>
        </div>

        <Transition name="q-swap" mode="out-in">
            <div :key="question.id" class="animate-fade-up">
                <!-- 構面 -->
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink-900 border border-steel-800 text-xs mb-4">
                    <span class="text-teal-400 font-medium">{{ dimension.label }}</span>
                    <span class="text-steel-600">·</span>
                    <span class="text-steel-400">{{ dimension.sub }}</span>
                </div>

                <h2 class="font-display text-xl sm:text-2xl font-bold text-steel-50 leading-snug mb-7">
                    {{ question.title }}
                </h2>

                <!-- 選項 -->
                <div class="space-y-3">
                    <button
                        v-for="opt in question.options"
                        :key="opt.key"
                        type="button"
                        class="option"
                        :class="{'option--active': store.answers[index] === opt.score}"
                        @click="select(opt.score)"
                    >
                        <span class="option__key">{{ opt.key }}</span>
                        <span class="flex-1 text-left">
                            <span class="block text-steel-100 leading-snug">{{ opt.label }}</span>
                            <span v-if="opt.note" class="block text-xs text-teal-400/80 mt-1.5">📊 {{ opt.note }}</span>
                        </span>
                        <span class="option__check">✓</span>
                    </button>
                </div>
            </div>
        </Transition>

        <!-- 導覽 -->
        <div class="flex items-center justify-between mt-9">
            <button
                type="button"
                class="px-4 py-2 text-sm text-steel-400 hover:text-steel-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                :disabled="index === 0"
                @click="prev"
            >
                ← 上一題
            </button>

            <button
                v-if="isLast && store.complete"
                type="button"
                class="px-6 py-2.5 bg-teal-500 hover:bg-teal-400 text-ink-950 font-bold rounded-full shadow-glow transition-all"
                @click="goResult"
            >
                看我的階層定位 →
            </button>
            <button
                v-else
                type="button"
                class="px-4 py-2 text-sm text-steel-400 hover:text-steel-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                :disabled="typeof store.answers[index] !== 'number'"
                @click="next"
            >
                下一題 →
            </button>
        </div>
    </div>
</template>

<script>
import {computed} from 'vue';
import {useRouter} from 'vue-router';
import {useHead} from '@unhead/vue';
import {QUESTIONS, DIMENSIONS, TOTAL_QUESTIONS} from 'data/questions';
import {useQuizStore} from 'stores/quiz/quiz';

export default {
    name: 'QuizIndex',
    setup() {
        const store = useQuizStore();
        const router = useRouter();

        useHead({title: '作答中 — 台灣社會階層測驗'});

        // 已完成過的測驗，重新進來時清空上次選項（重測 = 從零開始、不預填、不殘留）。
        // 作答到一半（未完成）則保留進度，重整或返回不會弄丟答案。
        if (store.complete) store.reset();

        const index = computed(() => store.currentIndex);
        const question = computed(() => QUESTIONS[index.value]);
        const dimension = computed(() => DIMENSIONS[question.value.dimension]);
        const isLast = computed(() => index.value === TOTAL_QUESTIONS - 1);

        const next = () => store.setCurrentIndex(index.value + 1);
        const prev = () => store.setCurrentIndex(index.value - 1);
        const goResult = () => router.push({name: 'RESULT_INDEX'});

        const select = (score) => {
            store.answer(index.value, score);
            if (isLast.value) {
                if (store.complete) setTimeout(goResult, 260);
            } else {
                setTimeout(next, 220);
            }
        };

        return {
            store,
            index,
            question,
            dimension,
            isLast,
            total: TOTAL_QUESTIONS,
            select,
            next,
            prev,
            goResult,
        };
    },
};
</script>

<style lang="scss" scoped>
.option {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    width: 100%;
    padding: 1rem 1.1rem;
    border-radius: 16px;
    border: 1px solid theme('colors.steel.800');
    background: rgba(12, 17, 32, 0.5);
    transition: border-color 0.16s, background-color 0.16s, transform 0.12s;

    &:hover {
        border-color: theme('colors.teal.600');
        background: rgba(17, 161, 176, 0.07);
    }

    &:active {
        transform: scale(0.99);
    }

    &--active {
        border-color: theme('colors.teal.400');
        background: rgba(17, 161, 176, 0.12);

        .option__key {
            background: theme('colors.teal.400');
            color: theme('colors.ink.950');
            border-color: theme('colors.teal.400');
        }

        .option__check {
            opacity: 1;
            color: theme('colors.teal.300');
        }
    }
}

.option__key {
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    border: 1px solid theme('colors.steel.700');
    font-family: theme('fontFamily.mono');
    font-size: 0.85rem;
    color: theme('colors.steel.300');
    transition: all 0.16s;
}

.option__check {
    flex-shrink: 0;
    opacity: 0;
    font-size: 1.05rem;
    transition: opacity 0.16s;
}

.q-swap-enter-active,
.q-swap-leave-active {
    transition: opacity 200ms ease, transform 200ms ease;
}
.q-swap-enter-from {
    opacity: 0;
    transform: translateX(16px);
}
.q-swap-leave-to {
    opacity: 0;
    transform: translateX(-16px);
}
</style>
