<template>
    <div class="flex flex-col min-h-screen">
        <header class="sticky top-0 z-40 backdrop-blur-md bg-ink-950/80 border-b border-steel-800/60">
            <div class="max-w-[1080px] mx-auto px-5 sm:px-7 py-3.5 flex items-center justify-between">
                <RouterLink :to="{name: 'HOME_INDEX'}" class="flex items-center gap-2.5 group">
                    <LadderMark class="w-8 h-8 transition-transform group-hover:-translate-y-0.5" />
                    <div class="flex flex-col leading-tight">
                        <span class="font-display font-bold text-[0.95rem] text-steel-50 tracking-wide">台灣社會階層測驗</span>
                        <span class="font-mono text-[0.58rem] tracking-[0.2em] text-teal-300/70 uppercase">CLASS LADDER · TW</span>
                    </div>
                </RouterLink>

                <nav class="flex items-center gap-1 sm:gap-2 text-sm">
                    <RouterLink :to="{name: 'QUIZ_INDEX'}" class="nav-link">測驗</RouterLink>
                    <RouterLink :to="{name: 'DATA_INDEX'}" class="nav-link">數據出處</RouterLink>
                </nav>
            </div>
        </header>

        <main class="flex-1 w-full">
            <RouterView v-slot="{Component}">
                <Transition name="route-fade" mode="out-in">
                    <component :is="Component" />
                </Transition>
            </RouterView>
        </main>

        <footer class="text-center px-5 py-8 text-xs text-steel-500 space-y-2 border-t border-steel-800/60 mt-16">
            <div class="max-w-[640px] mx-auto leading-relaxed">
                本測驗為一般性社會階層自我評估工具，分數級距與文案以公開統計校準，僅供反思參考，不構成任何財務、投資或人生建議。
            </div>
            <div class="flex flex-wrap justify-center items-center gap-2 pt-1">
                <RouterLink :to="{name: 'DATA_INDEX'}" class="text-teal-400 hover:text-teal-300 transition-colors">數據出處與方法</RouterLink>
                <span class="text-steel-700">·</span>
                <span class="font-mono text-[0.58rem] tracking-[0.2em] text-steel-600 uppercase">CLASS LADDER</span>
                <span class="text-steel-700">·</span>
                <span>Made in Taiwan</span>
            </div>
        </footer>
    </div>
</template>

<script>
import LadderMark from 'components/illustrations/LadderMark.vue';

export default {
    name: 'AppContainer',
    components: {LadderMark},
};
</script>

<style lang="scss" scoped>
.nav-link {
    padding: 0.375rem 0.85rem;
    border-radius: 9999px;
    color: theme('colors.steel.300');
    transition: color 0.18s, background-color 0.18s;

    &:hover {
        color: theme('colors.teal.300');
        background-color: rgba(17, 161, 176, 0.12);
    }

    &.router-link-active {
        color: theme('colors.teal.300');
        background-color: rgba(17, 161, 176, 0.16);
    }
}

.route-fade-enter-active,
.route-fade-leave-active {
    transition: opacity 240ms ease, transform 240ms ease;
}
.route-fade-enter-from {
    opacity: 0;
    transform: translateY(8px);
}
.route-fade-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}
</style>
