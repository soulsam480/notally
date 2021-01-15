import Vue from 'vue';
import VueRouter, { NavigationGuardNext, Route } from 'vue-router';
import Home from '../views/Home.vue';
Vue.use(VueRouter);
import { auth } from '../firebase/index';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to: Route, from: Route, next: NavigationGuardNext) => {
      if (!auth.currentUser) {
        next();
      } else {
        if (to.query.redirect) {
          next(to.query.redirect as string);
        } else {
          next('/boards');
        }
      }
    },
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue'),
    beforeEnter: (to: Route, from: Route, next: NavigationGuardNext) => {
      if (auth.currentUser) {
        next();
      } else {
         next(`/?redirect=${to.path}`);
      }
    },
  },
  {
    path: '/boards',
    name: 'Boards',
    component: () => import('../views/Boards.vue'),
    beforeEnter: (to: Route, from: Route, next: NavigationGuardNext) => {
      if (auth.currentUser) {
        next();
      } else {
        next(`/?redirect=${to.path}`);
      }
    },
    children: [
      {
        path: ':_slug',
        name: 'Board',
        component: () => import('../views/Board.vue'),
        params: true,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
