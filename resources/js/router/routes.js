import {PageRoute} from 'enums/navigation/PageRoute';

export const routes = [
    {
        path: '/',
        component: () => import('components/app/AppContainer.vue'),
        children: [
            {
                path: '',
                name: PageRoute.HOME_INDEX.key,
                component: () => import('components/pages/home/HomeIndex.vue'),
                meta: {title: '台灣社會階層自我評估測驗'},
            },
            {
                path: 'quiz',
                name: PageRoute.QUIZ_INDEX.key,
                component: () => import('components/pages/quiz/QuizIndex.vue'),
                meta: {title: '作答中'},
            },
            {
                path: 'result',
                name: PageRoute.RESULT_INDEX.key,
                component: () => import('components/pages/result/ResultIndex.vue'),
                meta: {title: '你的階層定位'},
            },
            {
                path: 'compare',
                name: PageRoute.COMPARE_INDEX.key,
                component: () => import('components/pages/compare/CompareIndex.vue'),
                meta: {title: '資本對照'},
            },
            {
                path: 'data',
                name: PageRoute.DATA_INDEX.key,
                component: () => import('components/pages/data/DataIndex.vue'),
                meta: {title: '數據出處與方法'},
            },
            {
                path: '404',
                name: PageRoute.NOT_FOUND.key,
                component: () => import('components/pages/NotFound.vue'),
                meta: {title: '找不到頁面'},
            },
        ],
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: {name: PageRoute.NOT_FOUND.key},
    },
];
