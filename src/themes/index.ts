import { RouteRecordRaw } from 'vue-router';

export const themes = [
  {
    name: 'skyline',
    path: '/skyline',
    component: () => import('@/themes/Skyline/Skyline.vue'),
  },
  {
    name: 'bubble',
    path: '/bubble',
    component: () => import('@/themes/Bubble/Bubble.vue'),
  },
];

export const themeRoutes = [
  {
    path: '/theme',
    redirect: `/theme${themes[0].path}`,
  },
  ...themes.map(({ path, component, name }) => ({
    name,
    path: `/theme${path}/:config?`,
    component,
  })),
] as RouteRecordRaw[];
