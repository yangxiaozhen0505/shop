import Vue from 'vue'
import Router from 'vue-router'
import Home from 'containers/Home'
import List from 'containers/List'
import Collect from 'containers/Collect'
import Add from 'containers/Add'
import Update from 'containers/Update'


Vue.use(Router);//router是vue的插件 需要use一下 才可以用

export default new Router({
  routes: [
    {
      path: '/home',
      component: Home
    },
    {
      path: '/list',
      component: List
    },
    {
      path: '/collect',
      component: Collect
    },
    {
      path: '/add',
      component: Add
    },
    {
      path:'/update/:id',//this.$route.id
      component:Update
    },
    {
      path: '*',
      redirect:'/home'
    }
  ],
  linkActiveClass:'active'
})
