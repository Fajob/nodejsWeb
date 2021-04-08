// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import axios from 'axios'
import Qs from 'qs'
import Common from "./js/common.js"

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import './css/style.css'

const host = process.env.NODE_ENV === 'production' ? '' : '/api'
const instance = axios.create({
  baseURL: host
})

Vue.prototype.$http = instance
Vue.prototype.axios = axios
Vue.prototype.qs = Qs

Vue.use(MintUI)
Vue.use(VueRouter)
// 当前位置的冗余导航
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Vuex)
Vue.use(Common)

Vue.config.productionTip = false

const store = new Vuex.Store({
	state: {
    adminInfo: '',//登陆人员信息
    users: [],//系统用户列表
    indexSelected: "tab3",//底部导航
  },
  actions: {

  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
