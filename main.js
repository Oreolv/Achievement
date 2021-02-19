import Vue from 'vue'
import App from './App'
import VueResource  from 'vue-resource'
import uView from "uview-ui";
Vue.use(uView);
Vue.use(VueResource) 
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
