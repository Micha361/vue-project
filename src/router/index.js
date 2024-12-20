import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import Users from '../views/users.vue'; 
import Bills from '../views/bills.vue';
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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
