<template>
    <!-- 隱藏在畫面外、專供 html2canvas 截圖用 — 比直接拍主結論卡更乾淨可控 -->
    <div ref="cardEl" class="share-card font-sans" aria-hidden="true">
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

            <!-- 主體：稱號 + 分數 -->
            <div class="share-card__body">
                <div class="share-card__label">我的階層定位</div>
                <div class="share-card__name" :style="{color: tier.color}">{{ tier.name }}</div>
                <div class="share-card__score">
                    <span class="share-card__score-num" :style="{color: tier.color}">{{ total }}</span>
                    <span class="share-card__score-max">/ 35 分</span>
                </div>
            </div>

            <!-- 光譜定位 -->
            <div class="share-card__spectrum">
                <div class="share-card__track">
                    <div
                        v-for="t in tiers"
                        :key="t.id"
                        class="share-card__seg"
                        :style="{flex: t.max - t.min + 1, background: t.id === tier.id ? t.color : segDim(t.color)}"
                    ></div>
                    <div class="share-card__marker" :style="{left: `calc(${percent}% - 13px)`, background: tier.color}"></div>
                </div>
                <div class="share-card__scale">
                    <span>7 生存</span>
                    <span>20 陣痛</span>
                    <span>27 翻身</span>
                    <span>35 頂層</span>
                </div>
            </div>

            <!-- 四構面 -->
            <div class="share-card__dims">
                <div v-for="dim in dimensions" :key="dim.key" class="share-card__dim">
                    <div class="share-card__dim-label">{{ dim.label }}</div>
                    <div class="share-card__dim-value" :style="{color: tier.color}">{{ dim.score }}<span>/{{ dim.max }}</span></div>
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
    setup(_, {expose}) {
        const store = useQuizStore();
        const cardEl = ref(null);

        expose({cardEl});

        return {
            cardEl,
            tiers: TIERS,
            tier: computed(() => store.tier),
            total: computed(() => store.total),
            percent: computed(() => store.percent),
            dimensions: computed(() => store.dimensions),
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
    margin-bottom: 18px;
}
.share-card__score {
    display: flex;
    align-items: baseline;
    gap: 12px;
}
.share-card__score-num {
    font-size: 100px;
    font-weight: 900;
    line-height: 1;
    font-variant-numeric: tabular-nums;
}
.share-card__score-max {
    font-size: 34px;
    font-weight: 700;
    color: #5A6788;
}

.share-card__spectrum {
    margin: 28px 0;
}
.share-card__track {
    position: relative;
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
    top: -5px;
    width: 26px;
    height: 26px;
    border-radius: 999px;
    border: 4px solid #0C1120;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
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
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
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
    font-size: 17px;
    color: #5A6788;
    font-weight: 600;
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
</style>
