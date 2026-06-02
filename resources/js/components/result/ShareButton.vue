<template>
    <ShareCard ref="shareCardRef" />
    <button
        type="button"
        :disabled="busy"
        class="px-6 py-3 border font-medium rounded-full transition-all"
        :class="busy
            ? 'border-steel-800 text-steel-500 cursor-wait'
            : 'border-steel-700 hover:border-teal-500/60 text-steel-200 hover:text-teal-300'"
        @click="shareOrDownload"
    >
        {{ label }}
    </button>
</template>

<script>
import {ref, onMounted} from 'vue';
import ShareCard from 'components/result/ShareCard.vue';
import {useQuizStore} from 'stores/quiz/quiz';

export default {
    name: 'ShareButton',
    components: {ShareCard},
    setup() {
        const store = useQuizStore();
        const shareCardRef = ref(null);
        const busy = ref(false);
        const supportsFileShare = ref(false);
        const label = ref('分享結果圖');

        const resetLabel = () => {
            label.value = supportsFileShare.value ? '分享結果圖' : '下載結果圖';
        };

        onMounted(() => {
            // 探測「能不能分享檔案」：手機 Safari/Chrome 多半可以，桌機多半不行
            try {
                const probe = new File([new Uint8Array([0])], 'probe.png', {type: 'image/png'});
                supportsFileShare.value = Boolean(navigator.canShare && navigator.canShare({files: [probe]}));
            } catch (e) {
                supportsFileShare.value = false;
            }
            resetLabel();
        });

        const filename = () => `台灣社會階層測驗-${store.total}分.png`;

        const triggerDownload = (canvas) => {
            const link = document.createElement('a');
            link.download = filename();
            link.href = canvas.toDataURL('image/png');
            link.click();
        };

        const shareOrDownload = async () => {
            if (busy.value) return;
            busy.value = true;
            label.value = '產圖中…';
            try {
                const html2canvas = (await import('html2canvas-pro')).default;
                const el = shareCardRef.value?.cardEl;
                if (!el) throw new Error('找不到分享卡元素');

                const canvas = await html2canvas(el, {
                    // gotcha #3：給 solid fallback，避免漸層偶爾渲染失敗時拍出全透明
                    backgroundColor: '#0C1120',
                    scale: 2,
                    logging: false,
                    useCORS: true,
                });

                const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
                const file = blob ? new File([blob], filename(), {type: 'image/png'}) : null;
                const text = `我在「台灣社會階層測驗」測出 ${store.total} 分：${store.tier.name}（${store.tier.zone}）`;

                if (file && navigator.canShare && navigator.canShare({files: [file]})) {
                    // 原生分享面板（手機可直接丟 IG / LINE / 限動）
                    try {
                        await navigator.share({files: [file], title: '台灣社會階層測驗', text});
                        label.value = '已分享 ✓';
                    } catch (e) {
                        if (e && e.name === 'AbortError') {
                            resetLabel(); // 使用者取消分享，不強制下載
                        } else {
                            triggerDownload(canvas); // 分享失敗就退回下載
                            label.value = '已下載 ✓';
                        }
                    }
                } else {
                    // 不支援檔案分享（多數桌機）→ 直接下載 PNG
                    triggerDownload(canvas);
                    label.value = '已下載 ✓';
                }
            } catch (e) {
                console.error('[ShareButton] share/capture failed:', e);
                label.value = '產圖失敗，請重試';
            } finally {
                busy.value = false;
                setTimeout(resetLabel, 2200);
            }
        };

        return {shareCardRef, busy, label, shareOrDownload};
    },
};
</script>
