import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/test1',
      name: 'test1',
      component: () => import('./pages/test1')
    },
    {
      path: '/test2',
      name: 'test2',
      component: () => import('./pages/test2')
    },
    {
      path: '/test3',
      name: 'test3',
      component: () => import('./pages/test3')
    },
    {
      path: '/test4',
      name: 'test4',
      component: () => import('./pages/test4')
    }
  ]
});

export default router;
