(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/active/active_list"],{"2da1":function(t,a,e){"use strict";e.r(a);var i=e("d561"),n=e.n(i);for(var o in i)"default"!==o&&function(t){e.d(a,t,function(){return i[t]})}(o);a["default"]=n.a},"9e21":function(t,a,e){"use strict";(function(t){e("5e93"),e("921b");i(e("66fd"));var a=i(e("e52f"));function i(t){return t&&t.__esModule?t:{default:t}}t(a.default)}).call(this,e("6e42")["createPage"])},a8d7:function(t,a,e){"use strict";var i,n=function(){var t=this,a=t.$createElement;t._self._c;t._isMounted||(t.e0=function(a){t.screening=!0},t.e1=function(a){t.screening=!1})},o=[];e.d(a,"b",function(){return n}),e.d(a,"c",function(){return o}),e.d(a,"a",function(){return i})},aa29:function(t,a,e){"use strict";var i=e("c437"),n=e.n(i);n.a},c437:function(t,a,e){},d561:function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i=e("2250"),n={data:function(){return{id:0,goodsList:[],requireUrl:"/api/group/get_list",requireDtae:{ajax:"true",span:15,page:1,sort:0},sort:0,name:"暂无商品",page:1,kill_tag:1,alls:0,data:{},message:"活动",screening:!1,primary_tab:[],secondary_tab:[],secondary_tab_id:0,group_tag:0}},onLoad:function(a){var e=this;e.id=a.id,t.showLoading({title:"加载中"}),1==a.id?(e.message="团购活动",e.requireUrl="/api/group/get_list",e.primary_tab=t.getStorageSync("first"),e.secondary_tab=t.getStorageSync("second")):2==a.id?(e.message="秒杀活动",e.requireUrl="/api/seckill/get_list",e.requireDtae.type=2):3==a.id&&(e.message="积分兑换",e.requireUrl="/api/score/get_list"),i.getJSON(e.requireUrl,e.requireDtae,function(a){408==a.statusCode?(e.name="网络请求超时，请刷新重试",t.hideLoading()):null!=a.data.list&&""!=a.data.list&&"null"!=a.data.list?(e.goodsList=a.data.list,t.hideLoading()):(e.name="暂无数据",t.hideLoading())})},methods:{details:function(a){var e=this;t.navigateTo({url:"./active_details?activityId="+a+"&id="+e.id})},all:function(){t.showLoading({title:"加载中"});var a=this;a.alls=0,a.group_tag=0,a.sort=2,a.secondary_tab_id=0,a.goodsList="",i.getJSON(a.requireUrl,a.requireDtae,function(e){408==e.statusCode?(a.name="网络请求超时，请刷新重试",t.hideLoading()):null!=e.data.list&&""!=e.data.list&&"null"!=e.data.list?(a.goodsList=e.data.list,t.hideLoading()):(a.name="暂无数据",t.hideLoading())})},price:function(){t.showLoading({title:"加载中"});var a=this;a.group_tag=1,a.alls=1,a.goodsList="",1==a.sort?a.sort=2:a.sort=1;var e={};e=0!=a.secondary_tab_id?{span:15,page:1,sort:a.sort,categoryId:a.secondary_tab_id}:{span:15,page:1,sort:a.sort},i.getJSON(a.requireUrl,e,function(e){408==e.statusCode?(a.name="网络请求超时，请刷新重试",t.hideLoading()):null!=e.data.list&&""!=e.data.list&&"null"!=e.data.list?(a.goodsList=e.data.list,t.hideLoading()):(a.name="暂无数据",t.hideLoading())})},panic_buying:function(){var a=this;t.showLoading({title:"加载中"}),a.requireUrl="/api/seckill/get_list",a.requireDtae.type=2,a.kill_tag=1,i.getJSON(a.requireUrl,a.requireDtae,function(e){408==e.statusCode?(a.name="网络请求超时，请刷新重试",t.hideLoading()):null!=e.data.list&&""!=e.data.list&&"null"!=e.data.list?(a.goodsList=e.data.list,t.hideLoading()):(a.name="暂无数据",t.hideLoading())})},coming_soon:function(){var a=this;t.showLoading({title:"加载中"}),a.requireUrl="/api/seckill/get_list",a.requireDtae.type=1,a.goodsList="",a.kill_tag=2,i.getJSON(a.requireUrl,a.requireDtae,function(e){408==e.statusCode?(a.name="网络请求超时，请刷新重试",t.hideLoading()):null!=e.data.list&&""!=e.data.list&&"null"!=e.data.list?(a.goodsList=e.data.list,t.hideLoading()):(a.name="暂无数据",t.hideLoading())})},second_id:function(t){var a=this;a.secondary_tab_id=t},xuanze:function(){var a=this;a.goods="",a.screening=!1,a.group_tag=2,i.getJSON(a.requireUrl,{page:1,span:15,sort:a.sort,categoryId:a.secondary_tab_id},function(e){a.goodsList=e.data.list,t.hideLoading()})}},onPullDownRefresh:function(){var a=this;a.goodsList="",a.page=1,1==a.id?0!=a.secondary_tab_id?a.data={span:15,page:1,sort:a.sort,categoryId:a.secondary_tab_id}:a.data={span:15,page:1,sort:a.sort}:2==a.id?a.data={span:15,page:1,type:a.requireDtae.type}:3==a.id&&(a.data={span:15,page:1}),i.getJSON(a.requireUrl,a.data,function(t){a.goodsList=t.data.list}),setTimeout(function(){t.stopPullDownRefresh()},1e3)},onReachBottom:function(){var a=this;t.showLoading({title:"加载中"}),a.page+=1,1==a.id?0!=a.secondary_tab_id?a.data={span:15,page:a.page,sort:a.sort,categoryId:a.secondary_tab_id}:a.data={span:15,page:a.page,sort:a.sort}:2==a.id?a.data={span:15,page:a.page,type:a.requireDtae.type}:3==a.id&&(a.data={span:15,page:a.page}),i.getJSON(a.requireUrl,a.data,function(e){if(null!=e){t.hideLoading();var i=e.data.list;if(i.length>0)for(var n in i)a.goodsList.push(i[n])}else setTimeout(function(){t.hideLoading()},5e3)})}};a.default=n}).call(this,e("6e42")["default"])},e52f:function(t,a,e){"use strict";e.r(a);var i=e("a8d7"),n=e("2da1");for(var o in n)"default"!==o&&function(t){e.d(a,t,function(){return n[t]})}(o);e("aa29");var s,r=e("f0c5"),d=Object(r["a"])(n["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);a["default"]=d.exports}},[["9e21","common/runtime","common/vendor"]]]);