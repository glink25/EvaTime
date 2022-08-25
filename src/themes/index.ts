const themes = [
  {
    name: 'skyline',
    path: '/skyline',
    component: () => import('@/views/Home.vue'),
  },
];

export const themeRoutes = [
  {
    path: '/theme',
    redirect: `/theme${themes[0].path}`,
  },
  ...themes.map(({ path, component }) => [
    {
      path: `/theme${path}/:config?`,
      component,
    },
  ]),
];
