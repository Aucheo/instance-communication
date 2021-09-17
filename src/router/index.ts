/*
 * @Author: Aucheo
 * @Date: 2021-09-06 16:33:36
 * @LastEditTime: 2021-09-16 13:13:05
 * @LastEditors: Aucheo
 * @Description:
 * @FilePath: \instance-conmunication\src\router\index.ts
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Index from '../views/index/Index.vue';
import SignUp from '../views/signUp/SignUp.vue';
import SignIn from '../views/signIn/SignIn.vue';
import ChatPage from '../views/chatPage/ChatPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: SignUp
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: SignIn
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
