<template>
    <div class="max-w-[820px] mx-auto px-5 sm:px-7 pt-8 sm:pt-12 pb-10">
        <header class="mb-8 animate-fade-up">
            <h1 class="font-display text-3xl font-bold text-steel-50 mb-3">六種資本組成</h1>
            <p class="text-steel-300 leading-relaxed">
                Bourdieu 的重點不只是資本「多寡」，更是「組成比例」。同樣的特權 PR，三種資本（經濟／文化／社會）的形狀不同，就是完全不同的人。
                測完會依你的形狀判定其中一型。
            </p>
        </header>

        <div class="grid sm:grid-cols-2 gap-3">
            <div
                v-for="p in personas"
                :key="p.id"
                class="rounded-xl2 border border-steel-800/70 bg-ink-900/50 p-5"
            >
                <div class="flex items-center gap-2.5 mb-2">
                    <span class="text-3xl">{{ p.emoji }}</span>
                    <span class="font-display text-lg font-bold text-steel-50">{{ p.name }}</span>
                </div>
                <div class="text-sm text-teal-300 mb-2">「{{ p.tagline }}」</div>
                <p class="text-sm text-steel-400 leading-relaxed">{{ p.desc }}</p>
            </div>
        </div>

        <div class="text-center mt-10">
            <RouterLink
                :to="{name: 'QUIZ_INDEX'}"
                class="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-400 text-ink-950 font-bold rounded-full shadow-glow transition-all"
            >
                測測我是哪一型 →
            </RouterLink>
        </div>
    </div>
</template>

<script>
import {useHead} from '@unhead/vue';
import {PERSONAS} from 'data/personas';

export default {
    name: 'PersonasIndex',
    setup() {
        useHead({title: '六種資本組成 — 台灣社會階層測驗'});

        return {personas: Object.values(PERSONAS)};
    },
};
</script>
