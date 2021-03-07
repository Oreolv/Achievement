import Vue from 'vue'
import App from './App'
import api from './common/api'
import uView from "uview-ui";
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.config.productionTip = false
Vue.use(uView);
Vue.prototype.$api = api
App.mpType = 'app'

let _this = this
const app = new Vue({
    ...App
})
app.$mount()
