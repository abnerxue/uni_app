(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"293a":function(t,e,n){"use strict";var i,s=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.logisn=2},t.e1=function(e){t.logisn=1})},o=[];n.d(e,"b",function(){return s}),n.d(e,"c",function(){return o}),n.d(e,"a",function(){return i})},"4e45":function(t,e,n){},"5b90":function(t,e,n){"use strict";var i=n("4e45"),s=n.n(i);s.a},"7cda":function(t,e,n){"use strict";n.r(e);var i=n("96cc"),s=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);e["default"]=s.a},"96cc":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n("2250"),s=n("9acd"),o={data:function(){return{users:"",passwords:"",type:"password",logisn:1,mobile:"",verification:"",time:0,sendCodeTitle:"发送验证码",tan:!1,message:""}},methods:{login:function(e){var n=this;1==e?i.isEmpty(n.users)?(n.message="请输入账号",n.tan=!0,setTimeout(function(){n.tan=!1},1300)):i.isEmpty(n.passwords)?(n.message="请输入密码",n.tan=!0,setTimeout(function(){n.tan=!1},1300)):i.postJSON("/login/login?ajax=true",{name:n.users,password:s.hex_md5(n.passwords)},function(t){0==t.data.code?(n.message=t.data.message,n.tan=!0,setTimeout(function(){n.tan=!1},1300)):i.loginSuccess(t.data,1)}):2==e&&(i.isEmpty(n.mobile)?(n.message="手机号不能为空",n.tan=!0,setTimeout(function(){n.tan=!1},1300)):i.reg_phone(n.mobile)?plus.device.getInfo({success:function(e){var s=t.getSystemInfoSync().platform,o="";if("android"!=s){var a=plus.ios.invoke("ASIdentifierManager","sharedManager");if(plus.ios.invoke(a,"isAdvertisingTrackingEnabled")){var u=plus.ios.invoke(a,"advertisingIdentifier");o=plus.ios.invoke(u,"UUIDString"),plus.ios.deleteObject(u)}plus.ios.deleteObject(a)}var c=t.getSystemInfoSync(),r=i.get_getui_cid(),d={phone:n.mobile,captcha:n.verification,source:i.source,position:i.position,uuid:e.uuid,imei:e.imei,cid:r,brand:c.brand,model:c.model,location:c.cacheLocation,idfa:o};i.postJSON("/login/login_captcha",d,function(t){i.loginSuccess(t.data,1)})}}):(n.message="请输入正确的手机号",n.tan=!0,setTimeout(function(){n.tan=!1},1e3)))},privacy:function(e){t.navigateTo({url:"../privacy/privacy?id="+e})},codes:function(){var t=this;i.isEmpty(t.mobile)?(t.tan=!0,t.message="手机号不能为空",setTimeout(function(){t.tan=!1},1300)):i.reg_phone(t.mobile)?i.postJSON("/login/login_captcha_sms",{phone:t.mobile},function(e){"1"==e.data.code?(t.tan=!0,t.message="短息发送成功",setTimeout(function(){t.tan=!1},1300),t.time=60,t.timer()):(t.tan=!0,t.message="短息发送失败",setTimeout(function(){t.tan=!1},1300))}):(t.tan=!0,t.message="请输入正确的手机号",setTimeout(function(){t.tan=!1},1300))},timer:function(){this.time>0?(this.time--,this.sendCodeTitle=this.time+"s",setTimeout(this.timer,1e3)):(this.time=0,this.sendCodeTitle="发送验证码",this.disabled=!1)},types:function(){"password"==this.type?this.type="text":this.type="password"},wx_login:function(){t.getProvider({service:"oauth",success:function(t){}})}}};e.default=o}).call(this,n("6e42")["default"])},d7f5:function(t,e,n){"use strict";(function(t){n("5e93"),n("921b");i(n("66fd"));var e=i(n("f598"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},f598:function(t,e,n){"use strict";n.r(e);var i=n("293a"),s=n("7cda");for(var o in s)"default"!==o&&function(t){n.d(e,t,function(){return s[t]})}(o);n("5b90");var a,u=n("f0c5"),c=Object(u["a"])(s["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],a);e["default"]=c.exports}},[["d7f5","common/runtime","common/vendor"]]]);