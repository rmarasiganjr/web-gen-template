import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/HomeView.vue';
import LoginPage from '../views/LoginView.vue';
import DashboardPage from '../views/DashboardView.vue';
import NotFound from '../views/error/NotFound.vue';
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/dashboard',
    name: 'DashboardPage',
    component: DashboardPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/:catchAll(.*)', // this matches all non-matching routes
    component: NotFound, // redirect to the 404 component
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isLoggedIn = store.state.authToken;

  if (requiresAuth && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
