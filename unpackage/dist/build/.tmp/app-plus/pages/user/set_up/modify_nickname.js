(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/set_up/modify_nickname"],{"02c7":function(n,e,t){"use strict";var a=t("ad05"),u=t.n(a);u.a},"198c":function(n,e,t){"use strict";(function(n,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=t("2250"),c={data:function(){return{name:"",tan:!1,message:"修改成功"}},onLoad:function(){this.name=n.getStorageSync("name")},methods:{save:function(){var e=this;u.postJSON("/api/user/nick_name",{token:n.getStorageSync("token"),nickName:e.name},function(t){console.log(a(t," at pages\\user\\set_up\\modify_nickname.vue:44")),1==t.data.code?(n.setStorageSync("name",e.name),e.message="修改成功",e.tan=!0,setTimeout(function(){e.tan=!1,n.navigateBack({delta:1})},1e3)):(e.tan=!0,e.message="修改失败，请检查你的网络连接",setTimeout(function(){e.tan=!1},1e3))})}}};e.default=c}).call(this,t("6e42")["default"],t("0de9")["default"])},a0b0:function(n,e,t){"use strict";t.r(e);var a=t("198c"),u=t.n(a);for(var c in a)"default"!==c&&function(n){t.d(e,n,function(){return a[n]})}(c);e["default"]=u.a},ad05:function(n,e,t){},d411:function(n,e,t){"use strict";(function(n){t("5e93"),t("921b");a(t("66fd"));var e=a(t("d43b"));function a(n){return n&&n.__esModule?n:{default:n}}n(e.default)}).call(this,t("6e42")["createPage"])},d43b:function(n,e,t){"use strict";t.r(e);var a=t("fbd8"),u=t("a0b0");for(var c in u)"default"!==c&&function(n){t.d(e,n,function(){return u[n]})}(c);t("02c7");var o,i=t("f0c5"),r=Object(i["a"])(u["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);e["default"]=r.exports},fbd8:function(n,e,t){"use strict";var a,u=function(){var n=this,e=n.$createElement;n._self._c},c=[];t.d(e,"b",function(){return u}),t.d(e,"c",function(){return c}),t.d(e,"a",function(){return a})}},[["d411","common/runtime","common/vendor"]]]);