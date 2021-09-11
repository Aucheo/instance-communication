import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Index from '../views/index/Index.vue';
import ChatPage from '../views/chatPage/ChatPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/chatPage',
    name: 'ChatPage',
    component: ChatPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
