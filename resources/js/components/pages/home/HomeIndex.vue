<template>
    <div class="max-w-[1080px] mx-auto px-5 sm:px-7">
        <!-- Hero -->
        <section class="pt-12 sm:pt-20 pb-12 text-center max-w-[760px] mx-auto animate-fade-up">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-medium mb-6">
                <span class="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse-dot"></span>
                7 題 · 真實數據校準 · 純前端、不蒐集任何資料
            </div>
            <h1 class="font-display text-4xl sm:text-[3.4rem] font-bold text-steel-50 leading-[1.15] tracking-tight mb-5">
                你，站在台灣社會的
                <span class="text-teal-300">哪一層</span>？
            </h1>
            <p class="text-base sm:text-lg text-steel-300 leading-relaxed mb-9">
                用社會學家 Bourdieu 的
                <span class="text-steel-100 font-medium">三種資本</span>
                ——經濟、文化、社會——拆解你的「特權值」，<br class="hidden sm:block" />
                9 道題量出你在台灣社會結構中的實質定位。
                <br class="hidden sm:block" />
                每個級距都對照
                <span class="text-steel-100 font-medium">主計總處、內政部</span>
                的真實統計，不只是心理測驗。
            </p>
            <div class="flex flex-wrap gap-3 justify-center">
                <RouterLink
                    :to="{name: 'QUIZ_INDEX'}"
                    class="inline-flex items-center gap-2 px-7 py-3.5 bg-teal-500 hover:bg-teal-400 active:bg-teal-600 text-ink-950 font-bold rounded-full shadow-glow transition-all"
                >
                    開始測驗
                    <span class="text-lg leading-none">→</span>
                </RouterLink>
                <RouterLink
                    v-if="store.complete"
                    :to="{name: 'RESULT_INDEX'}"
                    class="inline-flex items-center gap-2 px-6 py-3.5 border border-steel-700 hover:border-teal-500/60 text-steel-200 hover:text-teal-300 font-medium rounded-full transition-all"
                >
                    看上次結果（{{ store.total }} 分）
                </RouterLink>
            </div>
        </section>

        <!-- 分數光譜 -->
        <section class="mb-14 animate-fade-up" style="animation-delay: 80ms;">
            <div class="rounded-xl2 border border-steel-800/70 bg-ink-900/60 p-6 sm:p-8 shadow-panel">
                <div class="flex items-baseline justify-between mb-4">
                    <h2 class="font-display text-lg font-bold text-steel-100">四個階層級距</h2>
                    <span class="font-mono text-xs text-steel-500">總分 9 – 45</span>
                </div>

                <div class="flex h-3 rounded-full overflow-hidden mb-5">
                    <div
                        v-for="t in tiers"
                        :key="t.id"
                        :style="{flex: t.max - t.min + 1, background: t.color}"
                    ></div>
                </div>

                <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div
                        v-for="t in tiers"
                        :key="t.id"
                        class="rounded-xl border border-steel-800/70 bg-ink-950/40 p-4"
                    >
                        <div class="flex items-center gap-2 mb-1.5">
                            <span class="w-2.5 h-2.5 rounded-full" :style="{background: t.color}"></span>
                            <span class="font-mono text-xs text-steel-400">{{ t.min }}–{{ t.max }} 分</span>
                        </div>
                        <div class="font-bold text-steel-100 text-sm leading-snug">{{ t.name }}</div>
                        <div class="text-xs mt-0.5" :style="{color: t.color}">{{ t.zone }}</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 三種資本 -->
        <section class="mb-14">
            <h2 class="font-display text-lg font-bold text-steel-100 mb-1">拆解你的三種資本</h2>
            <p class="text-sm text-steel-500 mb-4">privilege（特權）不只是錢——Bourdieu 把它拆成三種可累積、可繼承的資本。</p>
            <div class="grid sm:grid-cols-3 gap-3">
                <div
                    v-for="(dim, i) in dimensions"
                    :key="dim.key"
                    class="rounded-xl2 border border-steel-800/70 bg-ink-900/50 p-5 hover:border-teal-500/40 transition-colors"
                >
                    <span class="font-mono text-xs text-teal-400/80">0{{ i + 1 }}</span>
                    <div class="font-bold text-steel-100 mt-1.5">{{ dim.label }}</div>
                    <div class="text-sm text-steel-400 mt-0.5">{{ dim.sub }}</div>
                </div>
            </div>
        </section>

        <!-- 真實數據 teaser -->
        <section class="mb-16">
            <div class="flex items-baseline justify-between mb-4">
                <h2 class="font-display text-lg font-bold text-steel-100">不是憑感覺，是有數字的</h2>
                <RouterLink :to="{name: 'DATA_INDEX'}" class="text-sm text-teal-400 hover:text-teal-300">看全部出處 →</RouterLink>
            </div>
            <div class="grid sm:grid-cols-3 gap-3">
                <div
                    v-for="s in teaserStats"
                    :key="s.id"
                    class="rounded-xl2 border border-steel-800/70 bg-ink-900/50 p-5"
                >
                    <div class="text-xs text-steel-500 mb-2">{{ s.title }}</div>
                    <div class="flex items-baseline gap-1.5">
                        <span class="font-display text-3xl font-bold text-teal-300 font-tabular">{{ s.figure }}</span>
                        <span class="text-sm text-steel-400">{{ s.unit }}</span>
                    </div>
                    <div class="text-xs text-steel-500 mt-2 leading-relaxed">{{ s.detail }}</div>
                </div>
            </div>
        </section>

        <!-- 結尾 CTA -->
        <section class="text-center pb-8">
            <RouterLink
                :to="{name: 'QUIZ_INDEX'}"
                class="inline-flex items-center gap-2 px-7 py-3.5 bg-teal-500 hover:bg-teal-400 text-ink-950 font-bold rounded-full shadow-glow transition-all"
            >
                花 2 分鐘，量出你的定位
                <span class="text-lg leading-none">→</span>
            </RouterLink>
        </section>
    </div>
</template>

<script>
import {TIERS} from 'data/tiers';
import {DIMENSIONS} from 'data/questions';
import {STATS} from 'data/stats';
import {useQuizStore} from 'stores/quiz/quiz';

export default {
    name: 'HomeIndex',
    setup() {
        const store = useQuizStore();

        return {
            store,
            tiers: TIERS,
            dimensions: Object.values(DIMENSIONS),
            teaserStats: [
                STATS.find((s) => s.id === 'salaryMedian'),
                STATS.find((s) => s.id === 'priceToIncome'),
                STATS.find((s) => s.id === 'wealthMedian'),
            ],
        };
    },
};
</script>
