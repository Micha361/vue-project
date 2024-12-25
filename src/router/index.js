import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import Users from '../views/users.vue'; 
import Bills from '../views/bills.vue';
import Tournament from '../views/Tournament.vue';
import Plan from '../views/Plan.vue';
import Account from '../views/Account.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HelloWorld,
  },
  {
    path: '/users',
    name: 'Users',
    component: Users, 
  },
  {
    path: '/bills',
    name: 'Bills',
    component: Bills, 
  },
  {
    path: '/Tournament',
    name: 'Tournament',
    component: Tournament, 
  },
  {
    path: '/Plan',
    name: 'Training-Plan',
    component: Plan, 
  },
  {
    path: '/Account',
    name: 'Account',
    component: Account, 
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
