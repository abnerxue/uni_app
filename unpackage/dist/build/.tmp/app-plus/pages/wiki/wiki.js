(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/wiki/wiki"],{"338e":function(t,e,n){"use strict";var a,i=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.change=1})},u=[];n.d(e,"b",function(){return i}),n.d(e,"c",function(){return u}),n.d(e,"a",function(){return a})},3720:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{}},props:["tags"],methods:{home:function(){t.redirectTo({url:"/pages/index/index"})},wiki:function(){t.redirectTo({url:"/pages/wiki/wiki"})},classfy:function(){t.redirectTo({url:"/pages/classfy/classfy"})},cart:function(){var e=t.getStorageSync("token");(e="null"==e||null==e||e<5)?t.navigateTo({url:"/pages/login/login"}):t.redirectTo({url:"/pages/cart/cart"})},user:function(){var e=t.getStorageSync("token");(e="null"==e||null==e||e<5)?t.navigateTo({url:"/pages/login/login"}):t.redirectTo({url:"/pages/user/user"})}}};e.default=n}).call(this,n("6e42")["default"])},"3ff8":function(t,e,n){},"8f30":function(t,e,n){"use strict";(function(t){n("5e93"),n("921b");a(n("66fd"));var e=a(n("95cb"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"95cb":function(t,e,n){"use strict";n.r(e);var a=n("338e"),i=n("f1a7");for(var u in i)"default"!==u&&function(t){n.d(e,t,function(){return i[t]})}(u);n("b802");var o,r=n("f0c5"),c=Object(r["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);e["default"]=c.exports},b2ff:function(t,e,n){"use strict";n.r(e);var a=n("b495"),i=n("e910");for(var u in i)"default"!==u&&function(t){n.d(e,t,function(){return i[t]})}(u);n("c11f");var o,r=n("f0c5"),c=Object(r["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);e["default"]=c.exports},b495:function(t,e,n){"use strict";var a,i=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"b",function(){return i}),n.d(e,"c",function(){return u}),n.d(e,"a",function(){return a})},b802:function(t,e,n){"use strict";var a=n("3ff8"),i=n.n(a);i.a},c11f:function(t,e,n){"use strict";var a=n("eb8f"),i=n.n(a);i.a},cec5:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("b2ff"));function i(t){return t&&t.__esModule?t:{default:t}}var u=n("2250"),o={data:function(){return{change:1,get_comment_list:[],about:[],data:{span:15,page:1,categoryId:72},page:1}},components:{bottomtabbar:a.default},methods:{baike:function(e){t.showLoading({title:"加载中"});var n=this;n.change=e,n.page=1,n.data.page=1,2==e?n.data.categoryId=80:3==e?n.data.categoryId=72:4==e&&(n.data.categoryId=78),u.getJSON("/api/article/get_list?ajax=true",n.data,function(e){n.about=e.data.list,t.hideLoading()})},images:function(e){t.previewImage({urls:e})},article:function(e,n){t.navigateTo({url:"./article?id="+e+"&title="+n})}},onLoad:function(){var e=this;t.showLoading({title:"加载中"}),u.getJSON("/goods/get_comment?ajax=true",{span:15,page:1,categoryId:0},function(n){t.hideLoading(),e.get_comment_list=n.data.list})},onReachBottom:function(){var e=this;t.showLoading({title:"加载中"}),e.page+=1,e.data.page+=1,1==e.change?u.getJSON("/goods/get_comment?ajax=true",{page:e.page,span:10,ajax:"true"},function(n){if(null!=n){t.hideLoading();var a=n.data.list;if(a.length>0)for(var i in a)e.get_comment_list.push(a[i])}else setTimeout(function(){t.hideLoading()},5e3)}):u.getJSON("/api/article/get_list?ajax=true",e.data,function(n){if(null!=n){t.hideLoading();var a=n.data.list;if(a.length>0)for(var i in a)e.about.push(a[i])}else setTimeout(function(){t.hideLoading()},5e3)})}};e.default=o}).call(this,n("6e42")["default"])},e910:function(t,e,n){"use strict";n.r(e);var a=n("3720"),i=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,function(){return a[t]})}(u);e["default"]=i.a},eb8f:function(t,e,n){},f1a7:function(t,e,n){"use strict";n.r(e);var a=n("cec5"),i=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,function(){return a[t]})}(u);e["default"]=i.a}},[["8f30","common/runtime","common/vendor"]]]);