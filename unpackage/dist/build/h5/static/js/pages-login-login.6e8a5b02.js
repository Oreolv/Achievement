(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-login"],{"02e7":function(t,e,n){"use strict";var i=n("ad19"),a=n.n(i);a.a},"185d":function(t,e,n){"use strict";(function(t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{background:{backgroundColor:"#fcfcfc"},username:"",password:""}},methods:{register:function(){uni.navigateTo({url:"../register/register"})},login:function(){uni.showToast({title:"加载中",icon:"loading"}),t.callFunction({name:"login",data:{username:this.username,password:this.password},success:function(e){if(0===e.result.code){n.log(e),uni.setStorageSync("token",e.result.token),uni.setStorageSync("username",e.result.username),uni.setStorageSync("avatar",e.result.userInfo.avatar),uni.setStorageSync("uid",e.result.uid),uni.setStorageSync("cpId",e.result.userInfo.cpId),t.callFunction({name:"couple_info",data:{uid:e.result.userInfo.cpId},success:function(t){n.log(t),uni.setStorageSync("cpAvatar",t.result.userInfo.avatar),uni.setStorageSync("cpUsername",t.result.userInfo.username)}}),uni.showToast({title:"登录成功",icon:"none"});setTimeout((function(){uni.switchTab({url:"../index/index"})}),1500)}else uni.showToast({title:e.result.message,icon:"none"})},fail:function(){uni.showToast({title:"登录失败，请稍后再试",icon:"none"})}})}},onLoad:function(t){this.op=t}};e.default=i}).call(this,n("a9ff")["default"],n("5a52")["default"])},2139:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var i={uNavbar:n("a021").default,uInput:n("521b").default,uButton:n("6b82").default},a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"login"},[i("u-navbar",{attrs:{"is-back":!1,title:"登录","border-bottom":!1,"title-color":"#000",titleBold:!0}}),i("v-uni-view",{staticClass:"logo"},[i("v-uni-image",{attrs:{src:n("c891"),mode:""}})],1),i("v-uni-view",{staticClass:"title-box"},[i("v-uni-view",{staticClass:"title"},[t._v("登录浮生")]),i("v-uni-view",{staticClass:"des"},[t._v("记录生活 游戏人间")])],1),i("v-uni-view",{staticClass:"re"},[i("u-input",{staticClass:"input",attrs:{placeholder:"请输入账号",height:"80"},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),i("u-input",{staticClass:"input",attrs:{placeholder:"请输入密码",height:"80",type:"password"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),i("u-button",{staticClass:"login",attrs:{type:"warning",shape:"circle"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.login.apply(void 0,arguments)}}},[t._v("登录")]),i("v-uni-view",{staticClass:"between"},[t._v("没有账号？请注册")]),i("u-button",{staticClass:"register",attrs:{type:"warning",shape:"circle",plain:!0},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.register.apply(void 0,arguments)}}},[t._v("注册")])],1),i("v-uni-view",{staticClass:"bottom"},[i("v-uni-text",[t._v("登录注册即表示同意")]),i("v-uni-text",{staticStyle:{color:"#2979FF"}},[t._v("用户协议、隐私条款")])],1)],1)},o=[]},"2c32":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-page-body[data-v-707840f3]{overflow:auto}.between[data-v-707840f3]{text-align:center;font-size:12px;color:#999}.title-box[data-v-707840f3]{text-align:center;margin-top:20px}.title-box .title[data-v-707840f3]{font-weight:700;font-size:18px}.title-box .des[data-v-707840f3]{margin-top:5px;color:#999}.login[data-v-707840f3]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.logo[data-v-707840f3]{width:100px;height:100px;margin-top:30px}.logo uni-image[data-v-707840f3]{width:100%;height:100%}.re[data-v-707840f3]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;width:100%;padding:20px}.re .input[data-v-707840f3]{margin-top:10px;border-bottom:1px #999 solid;padding:5px}.re .login[data-v-707840f3]{margin:10px 0;margin-top:20px;width:100%}.re .register[data-v-707840f3]{margin-top:10px;width:100%}.bottom[data-v-707840f3]{position:fixed;bottom:20px;font-size:12px}',""]),t.exports=e},ad19:function(t,e,n){var i=n("2c32");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("11a8dc63",i,!0,{sourceMap:!1,shadowMode:!1})},c891:function(t,e,n){t.exports=n.p+"static/img/logo.d58a3c8f.png"},f2bf:function(t,e,n){"use strict";n.r(e);var i=n("2139"),a=n("f863");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("02e7");var r,s=n("f0c5"),u=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"707840f3",null,!1,i["a"],r);e["default"]=u.exports},f863:function(t,e,n){"use strict";n.r(e);var i=n("185d"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a}}]);