import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Users from '../views/users.vue'; 
import Bills from '../views/bills.vue';
import Tournament from '../views/Tournament.vue';
import Plan from '../views/Plan.vue';
import Account from '../views/Account.vue';
import Login from '../views/login.vue'; 

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }, 
  },
  {
    path: '/users',
    name: 'Users',
    component: Users, 
    meta: { requiresAuth: true },
  },
  {
    path: '/bills',
    name: 'Bills',
    component: Bills, 
    meta: { requiresAuth: true },
  },
  {
    path: '/Tournament',
    name: 'Tournament',
    component: Tournament, 
    meta: { requiresAuth: true },
  },
  {
    path: '/Plan',
    name: 'Training-Plan',
    component: Plan, 
    meta: { requiresAuth: true },
  },
  {
    path: '/Account',
    name: 'Account',
    component: Account, 
    meta: { requiresAuth: true },
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login'); 
  } else {
    next();
  }
});

export default router;
