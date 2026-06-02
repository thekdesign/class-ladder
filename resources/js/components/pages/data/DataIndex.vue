<template>
    <div class="max-w-[820px] mx-auto px-5 sm:px-7 pt-8 sm:pt-12 pb-10">
        <header class="mb-9 animate-fade-up">
            <h1 class="font-display text-3xl font-bold text-steel-50 mb-3">數據出處與方法</h1>
            <p class="text-steel-300 leading-relaxed">
                這個測驗的分數級距與結果文案，盡量錨定在台灣官方／可靠統計上，而不是憑感覺分級。
                以下是每個數字的來源。個人薪資與家戶所得是<span class="text-steel-100">不同口徑</span>，引用時不要混用。
            </p>
        </header>

        <!-- 方法 -->
        <section class="mb-10 rounded-xl2 border border-steel-800/70 bg-ink-900/50 p-6">
            <h2 class="font-display text-base font-bold text-steel-100 mb-3">怎麼算分？</h2>
            <ul class="space-y-2 text-sm text-steel-300 leading-relaxed list-disc pl-5">
                <li>7 題、每題 5 個選項，A~E 分別對應 1~5 分，總分介於 <span class="font-mono text-steel-100">7 ~ 35</span>。</li>
                <li>分四個構面：資本實力（3 題）、安全網（1 題）、認知與環境（2 題）、時間與主導權（1 題）。</li>
                <li>總分落在四個級距之一，級距邊界參考下方真實分位數字校準。</li>
                <li>所有作答只存在你的瀏覽器（localStorage），不上傳、不蒐集、無後端。</li>
            </ul>
        </section>

        <!-- 數據卡，依分類分組 -->
        <section v-for="group in grouped" :key="group.category" class="mb-8">
            <h2 class="font-display text-sm font-bold text-teal-400 mb-3 tracking-wide">{{ group.category }}</h2>
            <div class="space-y-3">
                <div
                    v-for="s in group.items"
                    :key="s.id"
                    class="rounded-xl2 border border-steel-800/70 bg-ink-900/50 p-5"
                >
                    <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                        <span class="text-steel-100 font-medium">{{ s.title }}</span>
                        <span class="font-mono text-xs text-steel-500">{{ s.year }}</span>
                    </div>
                    <div class="flex items-baseline gap-1.5 mb-2">
                        <span class="font-display text-2xl font-bold text-teal-300 font-tabular">{{ s.figure }}</span>
                        <span class="text-sm text-steel-400">{{ s.unit }}</span>
                    </div>
                    <p class="text-sm text-steel-400 leading-relaxed mb-3">{{ s.detail }}</p>
                    <a
                        :href="sources[s.sourceKey].url"
                        target="_blank"
                        rel="noopener"
                        class="inline-flex items-center gap-1.5 font-mono text-[0.66rem] text-steel-500 hover:text-teal-400 transition-colors break-all"
                    >
                        ↗ {{ sources[s.sourceKey].label }}
                    </a>
                </div>
            </div>
        </section>

        <!-- 免責 -->
        <section class="rounded-xl2 border border-steel-800/70 bg-ink-950/40 p-6 text-sm text-steel-400 leading-relaxed">
            <p class="mb-2">
                ⚠️ 幾點誠實提醒：
            </p>
            <ul class="space-y-1.5 list-disc pl-5">
                <li>家庭財富分配統計（2021）官方僅公布到五等分位，<span class="text-steel-200">「前 5%／前 1% 門檻」並無官方數字</span>，本站頂層級因此改用「最富 20% 平均淨值」與「綜所稅 40% 級距」這兩個有出處的錨點。</li>
                <li>分數級距是為了「快速自我定位」做的近似切分，真實的階級流動遠比 7 題複雜。把它當反思的起點，不是判決書。</li>
            </ul>
        </section>

        <div class="text-center mt-10">
            <RouterLink
                :to="{name: 'QUIZ_INDEX'}"
                class="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-400 text-ink-950 font-bold rounded-full shadow-glow transition-all"
            >
                開始測驗 →
            </RouterLink>
        </div>
    </div>
</template>

<script>
import {useHead} from '@unhead/vue';
import {STATS, SOURCES} from 'data/stats';

export default {
    name: 'DataIndex',
    setup() {
        useHead({title: '數據出處與方法 — 台灣社會階層測驗'});

        const order = ['個人薪資', '家庭所得', '家庭財富', '居住負擔', '稅務'];
        const grouped = order
            .map((category) => ({category, items: STATS.filter((s) => s.category === category)}))
            .filter((g) => g.items.length);

        return {
            sources: SOURCES,
            grouped,
        };
    },
};
</script>
