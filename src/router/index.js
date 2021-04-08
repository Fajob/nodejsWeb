import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    /* {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, */
    {
      path: '/',
      name: 'login',
      component: resolve => require(['../views/login/index.vue'], resolve)
    },
    {
      path: '/index',
      name: 'index',
      component: resolve => require(['../views/index/index.vue'], resolve)
    },
    {
      path: '/chatting',
      name: 'chatting',
      component: resolve => require(['../views/chat/chatting.vue'], resolve)
    }
  ]
})
