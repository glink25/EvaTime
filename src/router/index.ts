import { themeRoutes } from '@/themes';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/config',
  },
  {
    path: '/config/:config?',
    component: () => import('@/views/Config.vue'),
  },
  ...themeRoutes,
  { path: '/:pathMatch(.*)*', name: 'NotFound', redirect: '/config' },
];

console.log(routes);

export const router = createRouter({ routes, history: createWebHashHistory() });
