// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/index.less'//共用样式
import VueLazyLoad from 'vue-lazyload';
import VueScroller from 'vue-scroller';
import store from './store';
Vue.use(VueScroller);//引用这个组件后，会多一个全局组件scroller

Vue.use(VueLazyLoad);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // template: '<div>hello World</div>',
  // render(createElement){
  //   return createElement('div','hello world zsx')
  // },
  //run time only 是基于.vue文件
//   render(h){//只基于根文件
//     return h(App)
// },
  ...App,//直接将组件解构放到 当前实例下即可
//   components: { App }
});
