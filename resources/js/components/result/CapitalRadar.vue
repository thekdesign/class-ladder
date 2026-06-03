<template>
    <svg :viewBox="`0 0 ${W} ${H}`"
         class="w-full h-auto"
         role="img"
         aria-label="三種資本雷達圖">
        <!-- 同心三角格線 -->
        <polygon
            v-for="(poly, i) in gridPolys"
            :key="`g${i}`"
            :points="poly"
            fill="none"
            stroke="#262B3B"
            stroke-width="1"
        />
        <!-- 軸線 -->
        <line
            v-for="(ax, i) in axes"
            :key="`a${i}`"
            :x1="cx"
            :y1="cy"
            :x2="ax.x"
            :y2="ax.y"
            stroke="#262B3B"
            stroke-width="1"
        />
        <!-- 各 series 多邊形 -->
        <g v-for="(s, i) in seriesPolys" :key="`s${i}`">
            <polygon :points="s.points"
                     :fill="s.color"
                     :fill-opacity="s.fill"
                     :stroke="s.color"
                     stroke-width="2" />
            <circle v-for="(v, j) in s.vertices"
                    :key="j"
                    :cx="v.x"
                    :cy="v.y"
                    r="3.5"
                    :fill="s.color" />
        </g>
        <!-- 軸標籤 -->
        <text
            v-for="(ax, i) in axes"
            :key="`l${i}`"
            :x="ax.lx"
            :y="ax.ly"
            :text-anchor="ax.anchor"
            class="radar-label"
        >{{ ax.label }}</text>
    </svg>
</template>

<script>
import {computed} from 'vue';

const AXES = [
    {key: 'economic', label: '經濟', deg: -90},
    {key: 'cultural', label: '文化', deg: 30},
    {key: 'social', label: '社會', deg: 150},
];

export default {
    name: 'CapitalRadar',
    props: {
        // [{values: {economic, cultural, social}, color, fill, label}]
        series: {type: Array, default: () => []},
    },
    setup(props) {
        const W = 240;
        const H = 216;
        const cx = 120;
        const cy = 104;
        const R = 80;
        const labelR = 102;

        const pointAt = (value, deg) => {
            const rad = (deg * Math.PI) / 180;
            const r = (Math.max(0, Math.min(100, value)) / 100) * R;

            return {x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad)};
        };

        const axes = computed(() => AXES.map((ax) => {
            const edge = pointAt(100, ax.deg);
            const rad = (ax.deg * Math.PI) / 180;
            const lx = cx + labelR * Math.cos(rad);
            const ly = cy + labelR * Math.sin(rad) + 4;
            const anchor = ax.deg === -90 ? 'middle' : (Math.cos(rad) > 0 ? 'start' : 'end');

            return {x: edge.x, y: edge.y, lx, ly, anchor, label: ax.label};
        }));

        const gridPolys = computed(() => [25, 50, 75, 100].map((level) => AXES
            .map((ax) => {
                const p = pointAt(level, ax.deg);

                return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
            })
            .join(' ')));

        const seriesPolys = computed(() => props.series.map((s) => {
            const vertices = AXES.map((ax) => pointAt(s.values?.[ax.key] ?? 0, ax.deg));

            return {
                color: s.color || '#24C2CE',
                fill: s.fill ?? 0.22,
                points: vertices.map((v) => `${v.x.toFixed(1)},${v.y.toFixed(1)}`).join(' '),
                vertices,
            };
        }));

        return {W, H, cx, cy, axes, gridPolys, seriesPolys};
    },
};
</script>

<style lang="scss" scoped>
.radar-label {
    font-family: theme('fontFamily.mono');
    font-size: 11px;
    fill: theme('colors.steel.400');
    letter-spacing: 0.05em;
}
</style>
