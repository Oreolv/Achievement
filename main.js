import Vue from 'vue'
import App from './App'
import api from './common/api'
import uView from "uview-ui";
Vue.config.productionTip = false
Vue.use(uView);
Vue.prototype.$api = api
App.mpType = 'app'
Vue.prototype.checkLogin = function(backpage, backtype) {
	var token = uni.getStorageSync('token');
	var username = uni.getStorageSync('username');
	if (token == '' || username == '') {
		uni.showToast({
			title: '请先登录',
			icon: 'none',
		})
		setTimeout(function() {
			uni.redirectTo({
				url: '/pages/login/login?backpage=' + backpage + '&backtype=' + backtype
			})
		}, 1500)

		return false;
	}
	return [token, username];
}
Vue.prototype.getFormatDate = function() {
	var date = new Date();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentDate = date.getFullYear() + "-" + month + "-" + strDate +
		" " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	return currentDate;
}
Vue.prototype.formatDate = function(inputTime) {
	var date = new Date(inputTime);
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	var h = date.getHours();
	h = h < 10 ? ('0' + h) : h;
	var minute = date.getMinutes();
	var second = date.getSeconds();
	minute = minute < 10 ? ('0' + minute) : minute;
	second = second < 10 ? ('0' + second) : second;
	return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}
let _this = this
const app = new Vue({
	...App
})
app.$mount()
