(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/update/index"],{"3b08":function(t,e,a){},"3c97":function(t,e,a){"use strict";a.r(e);var n=a("c6c5"),o=a("e96c");for(var s in o)"default"!==s&&function(t){a.d(e,t,function(){return o[t]})}(s);a("ee91");var r,c=a("f0c5"),i=Object(c["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);e["default"]=i.exports},9428:function(t,e,a){"use strict";(function(t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a("2250"),s={components:{},data:function(){return{info:"正在加载",Minfo:"未知",Mtip:"",updateInfo:"无",latest:{androidLink:"",iosLink:""},packgeSize:null,packgePath:null,downloadTask:null,downloadProgress:0,buttonLoading:!1,installed:!1,startProgress:!1,currentIsLatest:!0,url:""}},onReady:function(){var e=this;e.getLatest();var a=t.getStorageSync("updated");a.packgePath&&(e.packgePath=a.packgePath)},onShow:function(){var t=this;!0===t.installed&&t.packgePath&&(t.installed=!1,t.haveDownloaded())},onUnload:function(){var t=this;t.downloadTask&&(t.closeTask(),t.showToast("更新被取消"))},onPullDownRefresh:function(){var e=this;e.getLatest(),t.stopPullDownRefresh()},methods:{showToast:function(e){t.showToast({title:e,duration:3e3,icon:"none"})},installPackge:function(){var e=this;plus.runtime.install(e.packgePath,{force:!0}),e.installed=!0,t.setStorage({key:"updated",data:{completed:!0,packgePath:e.packgePath},success:function(t){console.log(n("成功保存更新记录"," at pages\\update\\index.vue:120"))}}),e.packgePath.match(RegExp(/.wgt/))&&(e.installed=!1,t.showModal({title:"提示",content:"应用将重启以完成更新",showCancel:!1,complete:function(){plus.runtime.restart()}}))},haveDownloaded:function(){var e=this;t.showModal({title:"更新尚未完成",content:"您已下载更新包，但是还没有完成安装，请问是否要继续安装更新包呢？",success:function(t){t.confirm?e.installPackge():t.cancel&&e.showToast("更新被取消")}})},getLatest:function(){var e=this;e.info="正在加载",e.Minfo="未知",e.updateInfo="无",e.buttonLoading=!0,e.latest=null;var a=t.getSystemInfoSync().platform;o.postJSON("/app/version/latest_version",{platform:a},function(t){if(t.data.versionNumber>o.versionNumber){t.data;e.buttonLoading=!1,e.currentIsLatest=!1,e.Mtip="发现新版本",e.info=t.data.versionCode,e.updateInfo=t.data.instructions,e.packgeSize=t.data.packgeSize+"MB",e.setMinfo(),e.url=t.data.url}else o.showErrgoBack("暂时没有可用更新")})},setMinfo:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"release",e=this;switch(t){case"base":e.Minfo="结构版";break;case"alpha":e.Minfo="内测版";break;case"beta":e.Minfo="公测版";break;case"rc":e.Minfo="终测版";break;case"release":e.Minfo="正式版";break;default:e.Minfo="未知"}},closeTask:function(){var t=this;t.downloadTask.abort(),t.downloadTask=null,t.startProgress=!1},createTask:function(e){var a=this;a.packgePath?a.haveDownloaded():(a.downloadProgress=0,a.startProgress=!0,a.downloadTask=t.downloadFile({url:e,success:function(e){200===e.statusCode&&t.saveFile({tempFilePath:e.tempFilePath,success:function(t){a.packgePath=t.savedFilePath,a.installPackge(),a.closeTask()}})}}),a.downloadTask.onProgressUpdate(function(t){a.downloadProgress=t.progress}))},handleUpdate:function(){var t=this;"android"===plus.os.name.toLowerCase()?t.url&&"#"!==t.url?t.createTask(t.url):t.showToast("未找到下载地址"):t.url&&"#"!==t.url?t.url.match(RegExp(/.wgt/))?t.createTask(t.url):plus.runtime.openURL(t.url):t.showToast("未找到ios商店地址")}}};e.default=s}).call(this,a("6e42")["default"],a("0de9")["default"])},c6c5:function(t,e,a){"use strict";var n,o=function(){var t=this,e=t.$createElement;t._self._c},s=[];a.d(e,"b",function(){return o}),a.d(e,"c",function(){return s}),a.d(e,"a",function(){return n})},c8f2:function(t,e,a){"use strict";(function(t){a("5e93"),a("921b");n(a("66fd"));var e=n(a("3c97"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("6e42")["createPage"])},e96c:function(t,e,a){"use strict";a.r(e);var n=a("9428"),o=a.n(n);for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);e["default"]=o.a},ee91:function(t,e,a){"use strict";var n=a("3b08"),o=a.n(n);o.a}},[["c8f2","common/runtime","common/vendor"]]]);