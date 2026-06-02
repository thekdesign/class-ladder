<template>
    <div class="max-w-[560px] mx-auto px-5 text-center pt-24 pb-20 animate-fade-up">
        <div class="font-display text-7xl font-bold text-teal-400/80 font-tabular mb-3">404</div>
        <h1 class="font-display text-2xl font-bold text-steel-100 mb-2">這一層不存在</h1>
        <p class="text-steel-400 mb-8">你要找的頁面不在這座階梯上。</p>
        <RouterLink
            :to="{name: 'HOME_INDEX'}"
            class="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-400 text-ink-950 font-bold rounded-full shadow-glow transition-all"
        >
            回首頁
        </RouterLink>
    </div>
</template>

<script>
import {useHead} from '@unhead/vue';

export default {
    name: 'NotFound',
    setup() {
        useHead({title: '404 — 台灣社會階層測驗'});
    },
};
</script>
