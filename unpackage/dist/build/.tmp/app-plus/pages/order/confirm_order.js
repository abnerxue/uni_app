(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/confirm_order"],{"16f3":function(a,t,e){"use strict";(function(a){e("5e93"),e("921b");r(e("66fd"));var t=r(e("fac6"));function r(a){return a&&a.__esModule?a:{default:a}}a(t.default)}).call(this,e("6e42")["createPage"])},1948:function(a,t,e){"use strict";e.r(t);var r=e("5571"),d=e.n(r);for(var n in r)"default"!==n&&function(a){e.d(t,a,function(){return r[a]})}(n);t["default"]=d.a},5571:function(a,t,e){"use strict";(function(a,r){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var d=e("2250"),n={data:function(){return{gid:"",number:"",goods:[],order_news:{},redPapers:0,totalMoneys:0,activityId:0,id:0,activityLaunchId:0,address:{},redPaperId:0,addressId:0,url:"",urls:"",data:{gid:0,number:0,token:a.getStorageSync("token"),activityId:0,activity:0,activityLaunchId:0,cart:[]},pay_data:{token:a.getStorageSync("token"),gid:0,number:0,redPaperId:0,addressId:{},activity:0,activityId:0,activityLaunchId:0,cart:[],memo:""},remarks:!1,cart_list_id:[]}},methods:{choose_redpaper:function(){a.navigateTo({url:"./choose_redPaper"})},choose_address:function(){a.navigateTo({url:"../user/address/address_list?id=1"})},pay:function(){var t=this;t.pay_data.gid=t.data.gid,t.pay_data.number=t.data.number,t.pay_data.redPaperId=t.redPaperId,t.pay_data.addressId=t.address.id,t.pay_data.activity=t.data.activity,t.pay_data.activityId=t.data.activityId,t.pay_data.activityLaunchId=t.data.activityLaunchId,t.pay_data.cart=t.data.cart,d.postJSON(t.urls,t.pay_data,function(e){console.log(r(t.pay_data," at pages\\order\\confirm_order.vue:134")),1==e.data.code&&a.redirectTo({url:"./pay?serialNumber="+e.data.serialNumber})})}},onShow:function(){a.getStorageSync("token");var t=this;d.postJSON(t.url,t.data,function(e){t.goods=e.data.goodsList,""==a.getStorageSync("address")||null==a.getStorageSync("address")?t.address=e.data.address[0]:t.address=a.getStorageSync("address"),t.order_news=e.data,""==a.getStorageSync("redpaper_price")||null==a.getStorageSync("redpaper_price")?t.redPapers=e.data.redPaper[0].redPaper/100:(t.redPapers=a.getStorageSync("redpaper_price"),t.redPaperId=a.getStorageSync("redpaper_Id")),t.totalMoneys=e.data.totalMoney-t.redPapers})},onLoad:function(t){a.getStorageSync("token");a.setStorageSync("redpaper_price",""),a.setStorageSync("redpaper_Id",""),a.setStorageSync("address","");var e=this;e.data.gid=t.gid,e.data.number=t.number,e.data.activity=t.id,e.data.activityId=t.activityId,e.data.activityLaunchId=t.activityLaunchId,a.setStorageSync("gid",t.gid),a.setStorageSync("number",t.number),void 0!=t.cartid?(e.url="/api/cart/pay_now?ajax=true",e.urls="/api/cart/settle_accounts_ajax?ajax=true",e.data.cart=a.getStorageSync("cart")):(e.url="/api/goods/settle_accounts?ajax=true",e.urls="/api/goods/buy?ajax=true"),d.postJSON(e.url,e.data,function(t){e.address=t.data.address[0],e.goods=t.data.goodsList,e.order_news=t.data,a.setStorageSync("redPaper",t.data.redPaper),null==t.data.redPaper||0==t.data.redPaper||""==t.data.redPaper||"null"==t.data.redPaper?a.setStorageSync("redpaper_price",0):(e.redPapers=t.data.redPaper[0].redPaper/100,e.redPaperId=t.data.redPaper[0].id),e.totalMoneys=t.data.totalMoney-e.redPapers})}};t.default=n}).call(this,e("6e42")["default"],e("0de9")["default"])},"5b24":function(a,t,e){"use strict";var r,d=function(){var a=this,t=a.$createElement;a._self._c;a._isMounted||(a.e0=function(t){a.remarks=!a.remarks})},n=[];e.d(t,"b",function(){return d}),e.d(t,"c",function(){return n}),e.d(t,"a",function(){return r})},"6ed0":function(a,t,e){},d04a:function(a,t,e){"use strict";var r=e("6ed0"),d=e.n(r);d.a},fac6:function(a,t,e){"use strict";e.r(t);var r=e("5b24"),d=e("1948");for(var n in d)"default"!==n&&function(a){e.d(t,a,function(){return d[a]})}(n);e("d04a");var o,c=e("f0c5"),i=Object(c["a"])(d["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],o);t["default"]=i.exports}},[["16f3","common/runtime","common/vendor"]]]);