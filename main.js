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
Vue.prototype.checkLogin = function(backpage,backtype){
	var token = uni.getStorageSync('token');
	var username = uni.getStorageSync('username');
	if(token==''||username==''){
		uni.showToast({
			title: '请先登录',
			icon: 'none',
		})
		setTimeout(function() {
			uni.redirectTo({
				url:'/pages/login/login?backpage='+backpage+'&backtype='+backtype
			})
		}, 1500)
		
		return false;
	}
	return [token,username];
}
let _this = this
const app = new Vue({
    ...App
})
app.$mount()
