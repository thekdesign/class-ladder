<template>
    <div class="max-w-[780px] mx-auto px-5 sm:px-7 pt-8 sm:pt-12 pb-10">
        <!-- 尚未作答 -->
        <div v-if="!store.complete" class="text-center py-20 animate-fade-up">
            <div class="text-5xl mb-4">🪜</div>
            <h2 class="font-display text-2xl font-bold text-steel-100 mb-2">還沒有結果</h2>
            <p class="text-steel-400 mb-7">你還沒完成 7 題作答，先去測驗吧。</p>
            <RouterLink
                :to="{name: 'QUIZ_INDEX'}"
                class="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-400 text-ink-950 font-bold rounded-full shadow-glow transition-all"
            >
                開始測驗 →
            </RouterLink>
        </div>

        <template v-else>
            <!-- 主結果卡 -->
            <section
                class="rounded-xl2 border bg-ink-900/60 p-7 sm:p-9 shadow-panel animate-fade-up"
                :style="{borderColor: hexAlpha(tier.color, 0.5)}"
            >
                <div class="flex items-center justify-between mb-6">
                    <span class="font-mono text-xs text-steel-400">你的階層定位</span>
                    <span class="font-mono text-xs px-2.5 py-1 rounded-full" :style="{background: hexAlpha(tier.color, 0.14), color: tier.color}">
                        {{ tier.min }}–{{ tier.max }} 分區間
                    </span>
                </div>

                <div class="flex flex-col sm:flex-row sm:items-end gap-5 sm:gap-8 mb-7">
                    <div>
                        <div class="font-mono text-sm mb-1" :style="{color: tier.color}">{{ tier.zone }}</div>
                        <h1 class="font-display text-3xl sm:text-4xl font-bold text-steel-50 leading-tight">{{ tier.name }}</h1>
                    </div>
                    <div class="sm:ml-auto text-right">
                        <div class="font-display font-bold leading-none font-tabular" :style="{color: tier.color}">
                            <span class="text-6xl">{{ store.total }}</span>
                            <span class="text-2xl text-steel-500"> / 35</span>
                        </div>
                    </div>
                </div>

                <!-- 光譜定位 -->
                <div class="relative mb-2">
                    <div class="flex h-3 rounded-full overflow-hidden">
                        <div
                            v-for="t in tiers"
                            :key="t.id"
                            :style="{flex: t.max - t.min + 1, background: hexAlpha(t.color, t.id === tier.id ? 1 : 0.32)}"
                        ></div>
                    </div>
                    <div
                        class="absolute -top-1 w-5 h-5 rounded-full border-2 border-ink-950 shadow-lg transition-all duration-700"
                        :style="{left: `calc(${store.percent}% - 10px)`, background: tier.color}"
                    ></div>
                </div>
                <div class="flex justify-between font-mono text-[0.6rem] text-steel-600 mb-7">
                    <span>7 生存</span>
                    <span>20 陣痛</span>
                    <span>27 翻身</span>
                    <span>35 頂層</span>
                </div>

                <p class="text-steel-200 leading-relaxed mb-4">{{ tier.summary }}</p>
                <div class="rounded-xl border border-steel-800 bg-ink-950/50 p-4">
                    <div class="text-xs font-medium mb-1.5" :style="{color: tier.color}">⟶ 下一步戰術</div>
                    <p class="text-sm text-steel-300 leading-relaxed">{{ tier.tactic }}</p>
                </div>
            </section>

            <!-- 構面拆解 -->
            <section class="mt-8">
                <h2 class="font-display text-lg font-bold text-steel-100 mb-4">你的四個構面</h2>
                <div class="rounded-xl2 border border-steel-800/70 bg-ink-900/50 p-6 space-y-4">
                    <div v-for="dim in store.dimensions" :key="dim.key">
                        <div class="flex items-baseline justify-between mb-1.5">
                            <span class="text-sm text-steel-200">{{ dim.label }}</span>
                            <span class="font-mono text-xs text-steel-400">{{ dim.score }} / {{ dim.max }}</span>
                        </div>
                        <div class="h-2 rounded-full bg-steel-800 overflow-hidden">
                            <div
                                class="h-full rounded-full origin-left animate-bar-grow"
                                :style="{width: `${(dim.score / dim.max) * 100}%`, background: tier.color}"
                            ></div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 對照真實數據 -->
            <section class="mt-8">
                <div class="flex items-baseline justify-between mb-4">
                    <h2 class="font-display text-lg font-bold text-steel-100">{{ tier.anchorIntro }}</h2>
                    <RouterLink :to="{name: 'DATA_INDEX'}" class="text-sm text-teal-400 hover:text-teal-300">全部出處 →</RouterLink>
                </div>
                <div class="grid sm:grid-cols-2 gap-3">
                    <div
                        v-for="s in anchorStats"
                        :key="s.id"
                        class="rounded-xl2 border border-steel-800/70 bg-ink-900/50 p-5"
                    >
                        <div class="text-xs text-steel-500 mb-2">{{ s.title }}（{{ s.year }}）</div>
                        <div class="flex items-baseline gap-1.5 mb-2">
                            <span class="font-display text-3xl font-bold font-tabular" :style="{color: tier.color}">{{ s.figure }}</span>
                            <span class="text-sm text-steel-400">{{ s.unit }}</span>
                        </div>
                        <div class="text-xs text-steel-400 leading-relaxed mb-2.5">{{ s.detail }}</div>
                        <a
                            :href="sources[s.sourceKey].url"
                            target="_blank"
                            rel="noopener"
                            class="font-mono text-[0.62rem] text-steel-600 hover:text-teal-400 transition-colors break-all"
                        >
                            ↗ {{ sources[s.sourceKey].label }}
                        </a>
                    </div>
                </div>
            </section>

            <!-- 同儕悄悄話 -->
            <section class="mt-8 rounded-xl2 border border-teal-500/20 bg-teal-500/5 p-6">
                <div class="text-xs font-medium text-teal-300 mb-2">🤫 同儕悄悄話</div>
                <p class="text-sm text-steel-300 leading-relaxed">{{ peerNote }}</p>
            </section>

            <!-- 行動 -->
            <section class="mt-9 flex flex-wrap gap-3 justify-center">
                <button
                    type="button"
                    class="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-ink-950 font-bold rounded-full shadow-glow transition-all"
                    @click="retake"
                >
                    重新測驗
                </button>
                <ShareButton />
                <button
                    type="button"
                    class="px-6 py-3 border border-steel-700 hover:border-teal-500/60 text-steel-200 hover:text-teal-300 font-medium rounded-full transition-all"
                    @click="share"
                >
                    {{ shareLabel }}
                </button>
            </section>
        </template>
    </div>
</template>

<script>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useHead} from '@unhead/vue';
import {TIERS, PEER_NOTE} from 'data/tiers';
import {SOURCES, getStat} from 'data/stats';
import {useQuizStore} from 'stores/quiz/quiz';
import ShareButton from 'components/result/ShareButton.vue';

const hexAlpha = (hex, alpha) => {
    const h = hex.replace('#', '');
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default {
    name: 'ResultIndex',
    components: {ShareButton},
    setup() {
        const store = useQuizStore();
        const router = useRouter();
        const shareLabel = ref('分享 / 複製連結');

        useHead({title: () => (store.complete ? `${store.tier.name}（${store.total} 分）— 台灣社會階層測驗` : '你的階層定位')});

        const retake = () => {
            store.reset();
            router.push({name: 'QUIZ_INDEX'});
        };

        const share = async () => {
            const url = typeof window !== 'undefined' ? window.location.href : '';
            const text = `我在「台灣社會階層測驗」測出 ${store.total} 分：${store.tier.name}（${store.tier.zone}）`;
            if (typeof navigator !== 'undefined' && navigator.share) {
                try {
                    await navigator.share({title: '台灣社會階層測驗', text, url});
                    return;
                } catch (e) {
                    // 使用者取消分享，落到複製
                }
            }
            if (typeof navigator !== 'undefined' && navigator.clipboard) {
                try {
                    await navigator.clipboard.writeText(`${text} ${url}`);
                    shareLabel.value = '已複製到剪貼簿 ✓';
                    setTimeout(() => {
                        shareLabel.value = '分享 / 複製連結';
                    }, 2000);
                } catch (e) {
                    shareLabel.value = '複製失敗，手動複製網址';
                }
            }
        };

        return {
            store,
            tiers: TIERS,
            sources: SOURCES,
            peerNote: PEER_NOTE,
            tier: store.tier,
            anchorStats: store.tier.anchors.map(getStat).filter(Boolean),
            hexAlpha,
            retake,
            share,
            shareLabel,
        };
    },
};
</script>
