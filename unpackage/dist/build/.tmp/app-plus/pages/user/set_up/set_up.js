(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/set_up/set_up"],{"0e10":function(e,t,n){"use strict";(function(e){n("5e93"),n("921b");a(n("66fd"));var t=a(n("f6bc"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},"517a":function(e,t,n){},"5a77":function(e,t,n){"use strict";var a=n("517a"),i=n.n(a);i.a},"666f":function(e,t,n){"use strict";n.r(t);var a=n("96ba"),i=n.n(a);for(var u in a)"default"!==u&&function(e){n.d(t,e,function(){return a[e]})}(u);t["default"]=i.a},"96ba":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n("2250"),i={data:function(){return{image:"",name:""}},onShow:function(){var t=this;t.image=e.getStorageSync("image"),t.name=e.getStorageSync("name")},onLoad:function(){var t=this;t.image=e.getStorageSync("image"),t.name=e.getStorageSync("name")},methods:{logins:function(){e.setStorageSync("token",""),e.redirectTo({url:"/pages/index/index"})},updata:function(){var t=this;e.chooseImage({success:function(n){var i=n.tempFilePaths;e.uploadFile({url:a.apiUrl+"/api/upload/image ",filePath:i[0],name:"userfile",fileType:"image",formData:{token:e.getStorageSync("token"),type:"avatar"},success:function(n){n=JSON.parse(n.data);t.image=n.avatar,e.setStorageSync("image",t.image)}})}})},modify_nickname:function(){e.navigateTo({url:"modify_nickname"})}}};t.default=i}).call(this,n("6e42")["default"])},ad61:function(e,t,n){"use strict";var a,i=function(){var e=this,t=e.$createElement;e._self._c},u=[];n.d(t,"b",function(){return i}),n.d(t,"c",function(){return u}),n.d(t,"a",function(){return a})},f6bc:function(e,t,n){"use strict";n.r(t);var a=n("ad61"),i=n("666f");for(var u in i)"default"!==u&&function(e){n.d(t,e,function(){return i[e]})}(u);n("5a77");var o,r=n("f0c5"),c=Object(r["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);t["default"]=c.exports}},[["0e10","common/runtime","common/vendor"]]]);