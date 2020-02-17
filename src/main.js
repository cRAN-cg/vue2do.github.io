// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

if ('serviceWorker' in navigator) {
  // eslint-disable-next-line no-unused-vars
  const registration = runtime.register({ scope: '/' });
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  created() {
    store.commit('initializeStore');
  },
});
