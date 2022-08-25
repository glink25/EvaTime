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
  {
    path: '/theme/skyline/:config?',
    component: () => import('@/views/Home.vue'),
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', redirect: '/config' },
];

export const router = createRouter({ routes, history: createWebHashHistory() });
