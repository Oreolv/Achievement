import Vue from 'vue'
import App from './App'
import api from 'common/api'
import uView from "uview-ui";
Vue.use(uView);
Vue.prototype.$api = api
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
