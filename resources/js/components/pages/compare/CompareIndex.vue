<template>
    <div class="max-w-[780px] mx-auto px-5 sm:px-7 pt-8 sm:pt-12 pb-10">
        <!-- 無效連結 -->
        <div v-if="!their" class="text-center py-20 animate-fade-up">
            <div class="text-5xl mb-4">🔗</div>
            <h2 class="font-display text-2xl font-bold text-steel-100 mb-2">這個比較連結無效</h2>
            <p class="text-steel-400 mb-7">網址裡沒有對方的作答資料，或格式不對。</p>
            <RouterLink
                :to="{name: 'QUIZ_INDEX'}"
                class="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-400 text-ink-950 font-bold rounded-full shadow-glow transition-all"
            >
                自己來測一份 →
            </RouterLink>
        </div>

        <template v-else>
            <header class="mb-7 animate-fade-up">
                <h1 class="font-display text-3xl font-bold text-steel-50 mb-2">資本對照</h1>
                <p class="text-steel-400">同樣的分數，資本「形狀」不同就是不同的人。把兩個人疊在一起看最清楚。</p>
            </header>

            <!-- 雷達疊圖 -->
            <section class="rounded-xl2 border border-steel-800/70 bg-ink-900/50 p-6 mb-6">
                <div class="max-w-[360px] mx-auto">
                    <CapitalRadar :series="radarSeries" />
                </div>
                <div class="flex justify-center gap-5 mt-3 text-sm">
                    <span class="flex items-center gap-2">
                        <span class="w-3 h-3 rounded-full" style="background:#24C2CE"></span>
                        <span class="text-steel-300">{{ mine ? '你' : '你（未作答）' }}</span>
                    </span>
                    <span class="flex items-center gap-2">
                        <span class="w-3 h-3 rounded-full" style="background:#A78BFA"></span>
                        <span class="text-steel-300">對方</span>
                    </span>
                </div>
            </section>

            <!-- 兩人摘要 -->
            <section class="grid grid-cols-2 gap-3 mb-6">
                <div
                    v-for="col in columns"
                    :key="col.who"
                    class="rounded-xl2 border bg-ink-900/50 p-5 text-center"
                    :style="{borderColor: hexAlpha(col.color, 0.4)}"
                >
                    <div class="text-xs text-steel-500 mb-1">{{ col.who }}</div>
                    <template v-if="col.summary">
                        <div class="text-3xl mb-1">{{ col.summary.persona.emoji }}</div>
                        <div class="font-bold text-steel-100 leading-snug">{{ col.summary.persona.name }}</div>
                        <div class="text-xs mt-0.5" :style="{color: col.summary.tier.color}">{{ col.summary.tier.name }}</div>
                        <div class="mt-3 font-display font-bold font-tabular leading-none" :style="{color: col.color}">
                            <span class="text-4xl">{{ col.summary.percent }}</span>
                            <span class="text-sm text-steel-500"> PR</span>
                        </div>
                    </template>
                    <template v-else>
                        <div class="text-3xl mb-1 opacity-40">❔</div>
                        <div class="text-sm text-steel-500 leading-relaxed">你還沒測過<br />測完就能比對</div>
                    </template>
                </div>
            </section>

            <!-- 勝負一句話 -->
            <section v-if="mine" class="rounded-xl2 border border-steel-800/70 bg-ink-950/40 p-4 mb-6 text-center text-sm text-steel-300">
                {{ verdict }}
            </section>

            <!-- 逐項資本對照 -->
            <section class="rounded-xl2 border border-steel-800/70 bg-ink-900/50 p-6 mb-8">
                <h2 class="font-display text-base font-bold text-steel-100 mb-4">三種資本逐項比</h2>
                <div class="space-y-5">
                    <div v-for="row in capitalRows" :key="row.key">
                        <div class="text-sm text-steel-200 mb-2">{{ row.label }}</div>
                        <div class="space-y-1.5">
                            <div class="flex items-center gap-2">
                                <span class="w-8 text-right font-mono text-[0.62rem] text-steel-500">你</span>
                                <div class="flex-1 h-2.5 rounded-full bg-steel-800 overflow-hidden">
                                    <div class="h-full rounded-full" :style="{width: `${row.mine}%`, background: '#24C2CE'}"></div>
                                </div>
                                <span class="w-9 font-mono text-xs text-steel-300">{{ mine ? row.mine : '–' }}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="w-8 text-right font-mono text-[0.62rem] text-steel-500">對方</span>
                                <div class="flex-1 h-2.5 rounded-full bg-steel-800 overflow-hidden">
                                    <div class="h-full rounded-full" :style="{width: `${row.their}%`, background: '#A78BFA'}"></div>
                                </div>
                                <span class="w-9 font-mono text-xs text-steel-300">{{ row.their }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div class="flex flex-wrap gap-3 justify-center">
                <RouterLink
                    v-if="!mine"
                    :to="{name: 'QUIZ_INDEX'}"
                    class="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-ink-950 font-bold rounded-full shadow-glow transition-all"
                >
                    測完我的再來比 →
                </RouterLink>
                <RouterLink
                    v-else
                    :to="{name: 'RESULT_INDEX'}"
                    class="px-6 py-3 border border-steel-700 hover:border-teal-500/60 text-steel-200 hover:text-teal-300 font-medium rounded-full transition-all"
                >
                    回我的完整結果
                </RouterLink>
            </div>
        </template>
    </div>
</template>

<script>
import {computed} from 'vue';
import {useRoute} from 'vue-router';
import {useHead} from '@unhead/vue';
import {decodeAnswers} from 'libs/share';
import {summarize} from 'libs/score';
import {DIMENSIONS} from 'data/questions';
import {useQuizStore} from 'stores/quiz/quiz';
import CapitalRadar from 'components/result/CapitalRadar.vue';

const hexAlpha = (hex, alpha) => {
    const h = hex.replace('#', '');

    return `rgba(${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)}, ${alpha})`;
};

const toPrMap = (summary) => {
    const map = {};

    summary.dimensions.forEach((d) => {
        map[d.key] = d.pr;
    });

    return map;
};

export default {
    name: 'CompareIndex',
    components: {CapitalRadar},
    setup() {
        const route = useRoute();
        const store = useQuizStore();

        useHead({title: '資本對照 — 台灣社會階層測驗'});

        const theirAnswers = computed(() => decodeAnswers(route.query.r));
        const their = computed(() => (theirAnswers.value ? summarize(theirAnswers.value) : null));
        const mine = computed(() => (store.complete ? summarize(store.answers) : null));

        const radarSeries = computed(() => {
            const series = [];

            if (mine.value) series.push({values: toPrMap(mine.value), color: '#24C2CE', fill: 0.2});
            if (their.value) series.push({values: toPrMap(their.value), color: '#A78BFA', fill: 0.2});

            return series;
        });

        const columns = computed(() => [
            {who: '你', color: '#24C2CE', summary: mine.value},
            {who: '對方', color: '#A78BFA', summary: their.value},
        ]);

        const capitalRows = computed(() => Object.values(DIMENSIONS).map((dim) => ({
            key: dim.key,
            label: dim.label,
            mine: mine.value ? toPrMap(mine.value)[dim.key] : 0,
            their: their.value ? toPrMap(their.value)[dim.key] : 0,
        })));

        const verdict = computed(() => {
            if (!mine.value || !their.value) return '';

            const diff = mine.value.percent - their.value.percent;

            if (diff === 0) return `平手！你們的特權 PR 都是 ${mine.value.percent}，只是資本形狀可能不同。`;
            if (diff > 0) return `你的特權 PR 高出對方 ${diff}。不過 PR 只是量表位置，資本怎麼組成、怎麼用，才是真正的差距。`;

            return `對方的特權 PR 高出你 ${-diff}。先別氣餒——看看是哪一種資本被拉開，那就是你的施力點。`;
        });

        return {their, mine, radarSeries, columns, capitalRows, verdict, hexAlpha};
    },
};
</script>
