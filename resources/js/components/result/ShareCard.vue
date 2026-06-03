<template>
    <!-- 隱藏在畫面外、專供 html2canvas 截圖用 — 比直接拍主結論卡更乾淨可控 -->
    <div ref="cardEl"
         class="share-card font-sans"
         :class="{'share-card--story': format === 'story'}"
         aria-hidden="true">
        <div class="share-card__inner">
            <!-- 品牌列 -->
            <div class="share-card__header">
                <div class="share-card__brand">
                    <svg viewBox="0 0 32 32" class="share-card__brand-icon" aria-hidden="true">
                        <rect x="3"
                              y="22"
                              width="5"
                              height="7"
                              rx="1.5"
                              fill="#FB7185" />
                        <rect x="11"
                              y="17"
                              width="5"
                              height="12"
                              rx="1.5"
                              fill="#FBBF24" />
                        <rect x="19"
                              y="11"
                              width="5"
                              height="18"
                              rx="1.5"
                              fill="#24C2CE" />
                        <rect x="27"
                              y="4"
                              width="5"
                              height="25"
                              rx="1.5"
                              fill="#A78BFA" />
                    </svg>
                    <span>台灣社會階層測驗</span>
                </div>
                <div class="share-card__zone" :style="{color: tier.color}">{{ tier.zone }}</div>
            </div>

            <!-- 主體：稱號 + 特權 PR + 總分 -->
            <div class="share-card__body">
                <div class="share-card__label">我的階層定位</div>
                <div class="share-card__name" :style="{color: tier.color}">{{ tier.name }}</div>
                <div class="share-card__persona">
                    <span class="share-card__persona-name">{{ persona.name }}</span>
                    <span class="share-card__persona-tag">{{ persona.tagline }}</span>
                </div>
                <div class="share-card__score">
                    <span class="share-card__score-num" :style="{color: tier.color}">{{ percent }}</span>
                    <span class="share-card__score-unit">特權 PR</span>
                    <span class="share-card__score-max">總分 {{ total }} / {{ maxScore }}</span>
                </div>
            </div>

            <!-- 光譜定位 -->
            <div class="share-card__spectrum">
                <div class="share-card__track-wrap">
                    <div class="share-card__track">
                        <div
                            v-for="t in tiers"
                            :key="t.id"
                            class="share-card__seg"
                            :style="{flex: t.max - t.min + 1, background: t.id === tier.id ? t.color : segDim(t.color)}"
                        ></div>
                    </div>
                    <div class="share-card__marker" :style="{left: `${percent}%`, background: tier.color}"></div>
                </div>
                <div class="share-card__scale">
                    <span v-for="t in tiers" :key="t.id">{{ t.min }} {{ t.short }}</span>
                </div>
            </div>

            <!-- 三種資本（PR） -->
            <div class="share-card__dims">
                <div v-for="dim in dimensions" :key="dim.key" class="share-card__dim">
                    <div class="share-card__dim-label">{{ dim.label }}</div>
                    <div class="share-card__dim-value" :style="{color: tier.color}">{{ dim.pr }}<span>PR</span></div>
                </div>
            </div>

            <!-- 頁尾 -->
            <div class="share-card__footer">
                <span>用主計總處・內政部的真實數據量出你的定位</span>
                <span class="share-card__mark">CLASS LADDER · TW</span>
            </div>
        </div>
    </div>
</template>

<script>
import {ref, computed} from 'vue';
import {TIERS} from 'data/tiers';
import {MAX_SCORE} from 'data/questions';
import {useQuizStore} from 'stores/quiz/quiz';

const segDim = (hex) => {
    const h = hex.replace('#', '');
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, 0.28)`;
};

export default {
    name: 'ShareCard',
    props: {
        format: {type: String, default: 'square'}, // 'square' (800×800) | 'story' (1080×1920)
    },
    setup(_, {expose}) {
        const store = useQuizStore();
        const cardEl = ref(null);

        expose({cardEl});

        return {
            cardEl,
            tiers: TIERS,
            maxScore: MAX_SCORE,
            tier: computed(() => store.tier),
            total: computed(() => store.total),
            percent: computed(() => store.percent),
            dimensions: computed(() => store.dimensions),
            persona: computed(() => store.persona),
            segDim,
        };
    },
};
</script>

<style>
.share-card {
    position: fixed;
    left: -10000px;
    top: 0;
    width: 800px;
    height: 800px;
    pointer-events: none;
    z-index: -1;
    color: #F4F6FA;
    /* gotcha #3：solid + gradient 雙保險，避免 html2canvas 拍出全透明 */
    background-color: #0C1120;
    background-image: linear-gradient(150deg, #131C2E 0%, #0C1120 50%, #070A14 100%);
    overflow: hidden;
    font-family: 'Noto Sans TC', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
}

.share-card__inner {
    padding: 64px 60px;
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
}

.share-card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}
.share-card__brand {
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 700;
    font-size: 24px;
    color: #E5E9F1;
}
.share-card__brand-icon {
    width: 36px;
    height: 36px;
}
.share-card__zone {
    font-size: 18px;
    font-weight: 700;
}

.share-card__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}
.share-card__label {
    font-size: 22px;
    color: #7986A8;
    margin-bottom: 10px;
}
.share-card__name {
    font-size: 64px;
    font-weight: 900;
    line-height: 1.1;
    letter-spacing: -1px;
    margin-bottom: 14px;
}
.share-card__persona {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-bottom: 22px;
}
.share-card__persona-name {
    font-size: 30px;
    font-weight: 800;
    color: #E5E9F1;
}
.share-card__persona-tag {
    font-size: 20px;
    color: #7986A8;
}
.share-card__score {
    display: flex;
    align-items: baseline;
    gap: 14px;
}
.share-card__score-num {
    font-size: 100px;
    font-weight: 900;
    line-height: 1;
    font-variant-numeric: tabular-nums;
}
.share-card__score-unit {
    font-size: 26px;
    font-weight: 800;
    letter-spacing: 1px;
    color: #5A6788;
}
.share-card__score-max {
    font-size: 24px;
    font-weight: 600;
    color: #46506B;
    margin-left: auto;
    align-self: flex-end;
}

.share-card__spectrum {
    margin: 28px 0;
}
.share-card__track-wrap {
    position: relative;
}
.share-card__track {
    display: flex;
    height: 16px;
    border-radius: 999px;
    overflow: hidden;
}
.share-card__seg {
    height: 100%;
}
.share-card__marker {
    position: absolute;
    top: 50%;
    width: 26px;
    height: 26px;
    border-radius: 999px;
    border: 4px solid #0C1120;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
    transform: translate(-50%, -50%);
}
.share-card__scale {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    color: #5A6788;
}

.share-card__dims {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
    padding: 26px 0;
    border-top: 1px solid rgba(121, 134, 168, 0.25);
    border-bottom: 1px solid rgba(121, 134, 168, 0.25);
}
.share-card__dim-label {
    font-size: 15px;
    color: #7986A8;
    margin-bottom: 6px;
}
.share-card__dim-value {
    font-size: 30px;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
}
.share-card__dim-value span {
    font-size: 16px;
    color: #5A6788;
    font-weight: 600;
    margin-left: 4px;
}

.share-card__footer {
    margin-top: 26px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 15px;
    color: #7986A8;
}
.share-card__mark {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    letter-spacing: 2px;
    color: #46506B;
}

/* ───────── 直式 IG 限動版 1080×1920 ───────── */
.share-card--story {
    width: 1080px;
    height: 1920px;
    background-image: linear-gradient(165deg, #131C2E 0%, #0C1120 55%, #070A14 100%);
}
.share-card--story .share-card__inner {
    padding: 120px 96px;
}
.share-card--story .share-card__header {
    margin-bottom: 24px;
}
.share-card--story .share-card__brand {
    font-size: 36px;
    gap: 16px;
}
.share-card--story .share-card__brand-icon {
    width: 54px;
    height: 54px;
}
.share-card--story .share-card__zone {
    font-size: 30px;
}
.share-card--story .share-card__label {
    font-size: 34px;
    margin-bottom: 16px;
}
.share-card--story .share-card__name {
    font-size: 104px;
    margin-bottom: 24px;
}
.share-card--story .share-card__persona {
    gap: 6px;
    margin-bottom: 40px;
}
.share-card--story .share-card__persona-name {
    font-size: 46px;
}
.share-card--story .share-card__persona-tag {
    font-size: 30px;
}
.share-card--story .share-card__score-num {
    font-size: 168px;
}
.share-card--story .share-card__score-unit {
    font-size: 42px;
}
.share-card--story .share-card__score-max {
    font-size: 34px;
}
.share-card--story .share-card__spectrum {
    margin: 60px 0;
}
.share-card--story .share-card__track {
    height: 26px;
}
.share-card--story .share-card__marker {
    width: 42px;
    height: 42px;
    border-width: 6px;
}
.share-card--story .share-card__scale {
    font-size: 24px;
    margin-top: 22px;
}
.share-card--story .share-card__dims {
    padding: 56px 0;
    gap: 36px;
}
.share-card--story .share-card__dim-label {
    font-size: 24px;
    margin-bottom: 10px;
}
.share-card--story .share-card__dim-value {
    font-size: 48px;
}
.share-card--story .share-card__dim-value span {
    font-size: 24px;
}
.share-card--story .share-card__footer {
    margin-top: 48px;
    font-size: 24px;
}
.share-card--story .share-card__mark {
    font-size: 18px;
}
</style>
