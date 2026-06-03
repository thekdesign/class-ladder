<template>
    <ShareCard ref="squareRef" format="square" />
    <ShareCard ref="storyRef" format="story" />
    <button
        type="button"
        :disabled="busy"
        class="px-6 py-3 border font-medium rounded-full transition-all"
        :class="busy ? 'border-steel-800 text-steel-500 cursor-wait' : 'border-steel-700 hover:border-teal-500/60 text-steel-200 hover:text-teal-300'"
        @click="run('square')"
    >
        {{ labels.square }}
    </button>
    <button
        type="button"
        :disabled="busy"
        class="px-6 py-3 border font-medium rounded-full transition-all"
        :class="busy ? 'border-steel-800 text-steel-500 cursor-wait' : 'border-steel-700 hover:border-teal-500/60 text-steel-200 hover:text-teal-300'"
        @click="run('story')"
    >
        {{ labels.story }}
    </button>
</template>

<script>
import {ref, reactive, onMounted} from 'vue';
import ShareCard from 'components/result/ShareCard.vue';
import {useQuizStore} from 'stores/quiz/quiz';

export default {
    name: 'ShareButton',
    components: {ShareCard},
    setup() {
        const store = useQuizStore();
        const squareRef = ref(null);
        const storyRef = ref(null);
        const busy = ref(false);
        const supportsFileShare = ref(false);
        const labels = reactive({square: '下載結果圖', story: '限動直式版'});

        const FORMATS = {
            square: {scale: 2, suffix: '', share: false},
            story: {scale: 1.5, suffix: '_限動版', share: true},
        };

        const resetLabels = () => {
            labels.square = '下載結果圖';
            labels.story = supportsFileShare.value ? '限動直式版' : '下載限動版';
        };

        onMounted(() => {
            try {
                const probe = new File([new Uint8Array([0])], 'probe.png', {type: 'image/png'});
                supportsFileShare.value = Boolean(navigator.canShare && navigator.canShare({files: [probe]}));
            } catch (e) {
                supportsFileShare.value = false;
            }
            resetLabels();
        });

        const run = async (format) => {
            if (busy.value) return;

            const cfg = FORMATS[format];
            const el = (format === 'square' ? squareRef.value : storyRef.value)?.cardEl;

            if (!el) return;

            busy.value = true;
            labels[format] = '產圖中…';
            try {
                const html2canvas = (await import('html2canvas-pro')).default;
                const canvas = await html2canvas(el, {
                    backgroundColor: '#0C1120',
                    scale: cfg.scale,
                    logging: false,
                    useCORS: true,
                });

                const filename = `台灣社會階層測驗-${store.total}分${cfg.suffix}.png`;
                const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
                const file = blob ? new File([blob], filename, {type: 'image/png'}) : null;
                const text = `我在「台灣社會階層測驗」測出 ${store.total} 分（特權 PR ${store.percent}）：${store.tier.name}・${store.persona.name}`;

                if (cfg.share && file && navigator.canShare && navigator.canShare({files: [file]})) {
                    try {
                        await navigator.share({files: [file], title: '台灣社會階層測驗', text});
                        labels[format] = '已分享 ✓';
                    } catch (e) {
                        if (e && e.name === 'AbortError') {
                            resetLabels();
                        } else {
                            triggerDownload(canvas, filename);
                            labels[format] = '已下載 ✓';
                        }
                    }
                } else {
                    triggerDownload(canvas, filename);
                    labels[format] = '已下載 ✓';
                }
            } catch (e) {
                console.error('[ShareButton] capture failed:', e);
                labels[format] = '產圖失敗，請重試';
            } finally {
                busy.value = false;
                setTimeout(resetLabels, 2200);
            }
        };

        const triggerDownload = (canvas, filename) => {
            const link = document.createElement('a');
            link.download = filename;
            link.href = canvas.toDataURL('image/png');
            link.click();
        };

        return {squareRef, storyRef, busy, labels, run};
    },
};
</script>
