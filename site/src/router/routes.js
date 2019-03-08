
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', redirect: '/home/1' },
      { path: '/home/:pageNum', component: () => import('pages/Index.vue') },
      { path: '/explain', component: () => import('pages/RankingSystem.vue') },
      { path: '/team/:team', component: () => import('pages/Team.vue') },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
