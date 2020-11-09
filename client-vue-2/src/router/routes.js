
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Users.vue') },
      { path: '/login', component: () => import('pages/Login.vue') }
    ]
  },
]

export default routes
