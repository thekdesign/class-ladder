<template>
    <section class="mt-8 animate-fade-up">
        <a
            href="https://chill-retire.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            class="block group"
        >
            <div
                class="relative rounded-xl2 overflow-hidden shadow-panel transition-transform group-hover:-translate-y-0.5"
                style="background-color: #F47C1B; background-image: linear-gradient(135deg, #FF9A3D 0%, #F47C1B 55%, #D8620E 100%);"
            >
                <!-- 裝飾性太陽 -->
                <svg
                    class="absolute right-3 -top-6 opacity-20 pointer-events-none"
                    width="160"
                    height="160"
                    viewBox="0 0 160 160"
                    aria-hidden="true"
                >
                    <circle cx="80"
                            cy="80"
                            r="34"
                            fill="#FFFFFF" />
                    <g stroke="#FFFFFF" stroke-width="9" stroke-linecap="round">
                        <line x1="80"
                              y1="14"
                              x2="80"
                              y2="32" />
                        <line x1="80"
                              y1="128"
                              x2="80"
                              y2="146" />
                        <line x1="14"
                              y1="80"
                              x2="32"
                              y2="80" />
                        <line x1="128"
                              y1="80"
                              x2="146"
                              y2="80" />
                        <line x1="33"
                              y1="33"
                              x2="46"
                              y2="46" />
                        <line x1="114"
                              y1="114"
                              x2="127"
                              y2="127" />
                        <line x1="33"
                              y1="127"
                              x2="46"
                              y2="114" />
                        <line x1="114"
                              y1="46"
                              x2="127"
                              y2="33" />
                    </g>
                </svg>

                <div class="relative p-6 sm:p-7 text-white">
                    <div class="text-[0.62rem] font-mono tracking-widest uppercase opacity-80 mb-1">
                        § 姊妹站 · 順便看看
                    </div>
                    <h3 class="font-display font-bold text-xl sm:text-2xl mb-2 flex items-center gap-2">
                        ☀️ 那你，幾歲能退休？
                        <span class="text-base opacity-80 group-hover:translate-x-1 transition-transform">→</span>
                    </h3>
                    <p class="text-sm opacity-95 leading-relaxed mb-4 max-w-xl">
                        知道現在站哪一層了，也該看看未來。chill-retire 結合 FIRE 國際標準與台灣勞保勞退，
                        5 分鐘算出你的退休全景。
                    </p>
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-bold group-hover:bg-white/30 transition-colors">
                        去 chill-retire 算算
                        <span class="text-xs opacity-75">↗</span>
                    </div>
                </div>
            </div>
        </a>
    </section>
</template>

<script>
export default {
    name: 'SisterSiteCard',
};
</script>
