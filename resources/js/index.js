import {ViteSSG} from 'vite-ssg';
import {createPinia} from 'pinia';
import {useHead} from '@unhead/vue';
import App from 'components/App.vue';
import {routes} from 'router/routes';
import 'sass/base/_bootstrap.scss';

export const createApp = ViteSSG(
    App,
    {
        routes,
        scrollBehavior(to, _from, savedPosition) {
            if (savedPosition) return savedPosition;
            if (to.hash) return {el: to.hash, behavior: 'smooth', top: 80};
            return {top: 0};
        },
    },
    async ({app, isClient}) => {
        const pinia = createPinia();
        app.use(pinia);

        app.runWithContext(() => {
            useHead({htmlAttrs: {lang: 'zh-Hant'}});
        });

        // Vercel Analytics + Speed Insights：只在瀏覽器端注入（避免 SSG prerender 載入 window API）。
        // 僅在部署於 Vercel 時實際收集資料，本機開發會 no-op。
        if (isClient) {
            const [{inject}, {injectSpeedInsights}] = await Promise.all([
                import('@vercel/analytics'),
                import('@vercel/speed-insights'),
            ]);

            inject();
            injectSpeedInsights();
        }
    },
);
