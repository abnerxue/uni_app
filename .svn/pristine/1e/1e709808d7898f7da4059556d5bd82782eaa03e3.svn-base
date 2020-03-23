<script>
	const server = require('./utils/server');
	export default {
		onLaunch: function() {
			// #ifdef APP-PLUS
			var platform = uni.getSystemInfoSync().platform;  // 获取是Android  还是 苹果手机
			var info = plus.push.getClientInfo();     //uni-app的推送   
			var cid = info.clientid;    //  7,8两行分开写是因为防止获取不到值  
			const updated = uni.getStorageSync('updated') // 尝试读取storage  如果已经更新过，会向本地存updated变量
			if (updated.completed === true) { // 如果上次刚更新过
				// 删除安装包及安装记录
				console.log('安装记录被删除，更新成功')
				uni.removeSavedFile({  // 删除本地安装包
					filePath: updated.packgePath,
					success: (res) => {
						uni.removeStorageSync('updated')  //删除存在本地updated变量
					}
				})
			} else if (updated.completed === false) {
				uni.removeStorageSync('updated')
				plus.runtime.install(updated.packgePath, {
					force: true
				})
				uni.setStorage({
					key: 'updated',
					data: {
						completed: true,
						packgePath: updated.packgePath
					},
					success: (res) => {
						console.log('成功安装上次的更新，应用需要重启才能继续完成')
					}
				})
				uni.showModal({
					title: '提示',
					content: '应用将重启以完成更新',
					showCancel: false,
					complete: () => {
						plus.runtime.restart()
					}
				})
			} else {
				let uuid = plus.device.uuid; // 获取手机的uuid  
				server.postJSON(
					'/app/version/latest_version', {
						platform: platform,  // Android  或  苹果
						source: server.source,   //  来源
						position: server.position,  // 广告位置
						cid: cid,   // uni-app 推送
						uuid:uuid   // 手机的uuid  手机标识
					},
					function(res) {
						if (res.data.versionNumber > server.versionNumber) { // 如果数据库中的app版本 大于 手机安装的app版本则跳转到更新页面
							uni.redirectTo({
								url: "/pages/update/index"  
							});
						}
					}
				);
			}
			var guide = uni.getStorageSync('guide');
			if(server.isEmpty(guide)){
				uni.redirectTo({
					url:"/pages/guide/guide"
				})
			}
			plus.screen.lockOrientation('portrait-primary'); //锁定
			var domModule = weex.requireModule('dom');
			domModule.addRule('fontFace', {
				'fontFamily': "uniicons",
				'src': "url('./static/uni.ttf')"
			});
			// #endif
		},
		onShow: function() {
			
		},
		onHide: function() {
			
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./static/icon/iconfont.css");  
	@import './static/icon/iconfont.css';/* 导入图标 */
	/* 提示 */
	.tan{
		position: fixed;
		top: 60%;
		left: 50%;
		transform: translateX(-50%);
		font-size: 24rpx;
		z-index: 99;
		background: rgba(46,46,46,0.8);
		padding: 20rpx 40rpx;
		color: white;
		border-radius:16rpx;
		max-width: 100%;
		white-space:nowrap;
	}
	/*设置状态栏 */
	.status_bar {  
	    height: var(--status-bar-height);  
	    width: 100%;  
	    background-color: #FFFFFF;  
	}  
	.top_view {  
	    height: var(--status-bar-height);  
	    width: 100%;  
	    position: fixed;  
	    background-color: #FFFFFF;  
	    top: 0;  
	    z-index: 999;  
	}
	/* 顶部导航栏样式 */
	.head {
		position: relative;
		height: 88rpx;
		width: 100%;
	}
	.heads {
		position: fixed;
		width: 100%;
		height: 88rpx;
		background: white;
		line-height: 90rpx;
		color: #1C0000;
		text-align: center;
		justify-content: space-between;
		font-size: 34rpx;
		font-weight: 600;
		z-index: 60;
		box-shadow: 0 3px 15px #F5F5F5;
		padding:0 30rpx;
		box-sizing: border-box;
		display: flex;
	}
	/* 导航栏箭头 */
	.arrowdown{
		margin-left: 10rpx;
		margin-top: 40rpx;
		width:0rpx;
		height:0rpx;
		border-width:14rpx 14rpx 0rpx;
		border-style:solid;
		border-color:#4A4A4A transparent transparent ;/*透明 透明  黑*/
	}
	.back {
		height: 100%;
		width: 100%;
		background: #F5F5F5;
		position: absolute;
	}
	/* 提示 */
	.tishi {
		background: rgba(0, 0, 0, 0.6);
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 100;
		padding: 0 50rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.tishis {
		width: 100%;
		height: 210rpx;
		background: white;
		border-radius: 16rpx;
	}
	.tishis-content{
		width: 100%;
		height: 56%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		color: #1C0000;
		border-bottom: 1px solid #E9E9E9;
	}
	.tishi-btn{
		width: 100%;
		height: 44%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.quedin{
		height: 100%;
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #74181B;
		font-size: 26rpx;
	}
	.quxiaos{
		height: 100%;
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		border-right: 1px solid #E9E9E9;
	}
</style>
