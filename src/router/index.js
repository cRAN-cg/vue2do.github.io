import Dashboard from '@/components/Dashboard';
import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '*',
      redirect: '/dashboard',
    },
  ],
});
