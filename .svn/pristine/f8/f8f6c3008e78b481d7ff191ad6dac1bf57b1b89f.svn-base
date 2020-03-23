<template>
	<view class="flex-column">
		<view class="content">
			<image class="logo" src="../../static/up-circle.png" />
			<view class="mainInfo">
				<text class="title">{{ info }} | {{ Minfo }}</text>
				<text class="tip">\n{{ Mtip }}</text>
			</view>
			<text class="line" />
		</view>
		<view>
			<view class="infoContentTitle">
				<image class="infoPic" src="../../static/info-circle.png" />
				<text class="infoTitle">更新摘要</text>
			</view>
			<view class="infoContent">
				<text class="updateInfo">{{ updateInfo }}</text>
			</view>
		</view>
		<view v-if="!currentIsLatest">
			<view class="infoContentTitle">
				<image class="infoPic" src="../../static/sync.png" />
				<text class="infoTitle">更新大小</text>
			</view>
			<view class="infoContent">
				<text class="updateInfo">{{ packgeSize }}</text>
			</view>
		</view>
		<view class="minorContent bottom_aera">
			<!-- startProgress 为true 和  currentIsLatest为false 则显示下载进度  -->
			<view v-if="startProgress && !currentIsLatest" class="smallTitle">
				<text>下载进度:{{ downloadProgress }}%</text>
				<progress :percent="downloadProgress" stroke-width="4" />
			</view>
			<!-- startProgress 下载进行  默认值false  currentIsLatest 当前版本就是最新版本 默认值true-->
			<button v-if="!startProgress || !currentIsLatest" type="primary" @click="handleUpdate()">立即更新</button> 
			<button v-if="currentIsLatest" :loading="buttonLoading" type="primary" @click="getLatest()">检查更新</button>
		</view>
	</view>
</template>

<script>
	const server = require('../../utils/server');
	export default {
		components: {

		},
		data() {
			return {
				info: '正在加载', // 主标题显示版本号
				Minfo: '未知', // 副标题显示版本类型
				Mtip: '', // 小提示标语
				updateInfo: '无', // 更新摘要
				latest: {androidLink:'', iosLink:''}, // 版本信息
				packgeSize: null, // 更新包大小
				packgePath: null, // 更新包的文件地址
				downloadTask: null, // 下载任务
				downloadProgress: 0, // 下载进度
				buttonLoading: false, // 加载 - 标记
				installed: false, // 是否执行了安装 - 标记
				startProgress: false, // 下载进行 - 标记
				currentIsLatest: true ,// 当前版本就是最新版本 - 标记
				url:''
			}
		},
		onReady() { //监听页面渲染，会在页面渲染之前执行
			let that = this;
			that.getLatest()  // 执行getlatest方法
			const updated = uni.getStorageSync('updated') 
			if (updated.packgePath) {  //app安装包的本地路径
				that.packgePath = updated.packgePath
			}
		},
		// 如果用户下载后没有完成安装，却回到app，则执行这里
		onShow() { // 监听页面显示，页面每次出现在屏幕上都会触发
			let that = this;
			if (that.installed === true && that.packgePath) { //installed 是否执行了安装 执行了为true 未执行未false 默认false  packgePath app本地安装包的路径
				that.installed = false //未安装
				that.haveDownloaded()  //haveDownloaded() 进行提示是否安装
			}
		},
		// 用户关闭页面时检查是否存在下载任务
		onUnload() {
			let that = this;
			if (that.downloadTask) { // downloadTask 为true 停止下载
				that.closeTask()
				that.showToast('更新被取消')
			}
		},
		// 下拉刷新更新
		onPullDownRefresh() {
			let that = this;
			that.getLatest()
			uni.stopPullDownRefresh() //停止当前页面下拉刷新
		},
		methods: {
			// 封装个Toast方便用
			showToast(text) {
				uni.showToast({
					title: text,
					duration: 3000,
					icon: 'none'
				})
			},
			installPackge() {
				let that = this;
				// 安装更新
				plus.runtime.install(that.packgePath, { //packgePath app包的本地路径
					force: true
				})
				that.installed = true //进行安装
				// 保存更新记录到stroage，方便下次启动app时删除安装包
				uni.setStorage({
					key: 'updated',
					data: {
						completed: true,
						packgePath: that.packgePath
					},
					success: (res) => {
						console.log('成功保存更新记录')
					}
				})
				// 判断是否为热更新（判断文件名中是否含有.wgt）
				if (that.packgePath.match(RegExp(/.wgt/))) {
					that.installed = false  
					uni.showModal({
						title: '提示',
						content: '应用将重启以完成更新',
						showCancel: false,
						complete: () => {
							plus.runtime.restart()  //重启app
						}
					})
				}
			},
			// 已经下载了更新包但是没有安装
			haveDownloaded() {
				let that = this;
				uni.showModal({
					title: '更新尚未完成',
					content: '您已下载更新包，但是还没有完成安装，请问是否要继续安装更新包呢？',
					success: (res) => {
						if (res.confirm) {  //确定
							// 安装
							that.installPackge() //进行安装
						} else if (res.cancel) {  //取消
							that.showToast('更新被取消')
						}
					}
				})
			},
			// 取得最新版本及其所有信息
			getLatest() {
				let that = this;
				that.info = '正在加载' // 主标题显示版本号  渲染页面
				that.Minfo = '未知' // 副标题显示版本类型
				that.updateInfo = '无' // 更新摘要
				that.buttonLoading = true;  // 为true  检查更新显示加载动画   默认是false
				that.latest = null; // 版本信息
				let platform = uni.getSystemInfoSync().platform; //获取是在哪个平台运行的  Android  或  苹果
				server.postJSON(
					'/app/version/latest_version', {
						platform: platform,
					},
					function(res) {
						if(res.data.versionNumber>server.versionNumber){  // 如果数据库中的app版本 大于 手机安装的app版本则跳转到更新页面
							const response = res.data 
							that.buttonLoading = false  // buttonLoading为false没有加载动画
							that.currentIsLatest = false  // 如果currentIsLatest为false 当前手机中的版本不是最新版本
							that.Mtip = '发现新版本' 
							that.info = res.data.versionCode //版本号
							that.updateInfo = res.data.instructions; // 更新说明
							that.packgeSize = res.data.packgeSize + 'MB' // 请求取得的packgeSize是字节大小，转换为保留两位小数的MB 包的大小
							that.setMinfo();   //调用  setMinfo()  下载的是什么版本
							that.url = res.data.url;  //app包的下载地址   重新跳转到onReady执行未执行完的代码
						} else {
							server.showErrgoBack('暂时没有可用更新');
						}
					}
				);
			},
			// 根据英文版本类型选择中文版本类型
			setMinfo(type='release') {
				let that = this;
				switch (type) {
					case 'base':
						that.Minfo = '结构版'
						break
					case 'alpha':
						that.Minfo = '内测版'
						break
					case 'beta':
						that.Minfo = '公测版'
						break
					case 'rc':
						that.Minfo = '终测版'
						break
					case 'release':
						that.Minfo = '正式版'
						break
					default:
						that.Minfo = '未知'
				}
			},
			// 关闭下载任务
			closeTask() {
				let that = this;
				that.downloadTask.abort() //中止下载
				that.downloadTask = null
				that.startProgress = false  // 下载是否在进行中
			},
			// 开始下载任务
			createTask(downloadLink) {
				let that = this;
				//判断是否已经存在任务
				if (that.packgePath) {  // 更新app包本地地址
					that.haveDownloaded()  //进行安装提示  是否进行安装
				} else {
					that.downloadProgress = 0 // 下载进度
					that.startProgress = true // 下载是否进行
					// 创建下载任务对象
					that.downloadTask = uni.downloadFile({ //进行下载 downloadFile
						url: downloadLink,  //下载app的地址 通过方法传参拿到url
						success: (res) => {
							if (res.statusCode === 200) {
								// 保存下载的安装包
								uni.saveFile({  //保存到本地 saveFile
									tempFilePath: res.tempFilePath,
									success: (res) => {
										that.packgePath = res.savedFilePath //本地路径
										// 进行安装
										that.installPackge()
										// 任务完成，关闭下载任务
										that.closeTask()
									}
								})
							}
						}
					})
					// 进度条更新
					that.downloadTask.onProgressUpdate((res) => {
						that.downloadProgress = res.progress
					})
				}
			},
			handleUpdate() {
				let that = this;	
				// 判断系统类型									plus.os.name 获得操作系统名称		2.plus.os.version 获得操作系统版本 plus.os.language 语言 plus.os.vendor 系统供应商
				if (plus.os.name.toLowerCase() === 'android') { //toLowerCase()方法是JavaScript中内置对象String的方法
					if (that.url && that.url !== '#') { // 我这里默认#也是没有地址，请根据业务自行修改
						// 安卓：创建下载任务
						that.createTask(that.url)
					} else {
						that.showToast('未找到下载地址')
					}
				} else {
					if (that.url && that.url !== '#') { // 我这里默认#也是没有地址，请根据业务自行修改
						// 苹果(A)：进行热更新（如果iosLink是wgt更新包的下载地址）判断文件名中是否含有.wgt
						if (that.url.match(RegExp(/.wgt/))) {
							that.createTask(that.url)
						} else {
							// 苹果(B)：打开商店链接（如果iosLink是苹果商店的地址）
							plus.runtime.openURL(that.url) //
						}
					} else {
						that.showToast('未找到ios商店地址')
					}
				}
			}
		}
	}
</script>

<style>
	.flex-column {
		display: flex;
		flex-direction: column;
	}

	.content {
		text-align: center;
	}

	.minorContent {
		width: 650upx;
		padding: 0 50upx;
	}

	.process {
		margin-top: 200upx;
		margin-left: 30%;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 100upx;
	}

	.title {
		font-size: 36upx;
		color: #373737;
		font-weight: bold;
	}

	.infoTitle {
		font-size: 32upx;
		color: #373737;
		padding-left: 15upx;
		font-weight: bold;
	}

	.tip {
		font-size: 28upx;
		color: #7E7E83;
		vertical-align: text-top;
	}

	.bottom_aera {
		position: absolute;
		bottom: 0;
		height: 12%;
	}

	.line {
		padding: 0 600upx;
		border-bottom: 2upx solid #D8D8D8;
	}

	.infoPic {
		height: 50upx;
		width: 50upx;
	}

	.infoContentTitle {
		display: flex;
		align-items: center;
		padding: 40upx 40upx;
	}

	.infoContent {
		display: flex;
		align-items: center;
	}

	.updateInfo {
		font-size: 28upx;
		color: #7E7E83;
		padding: 0 80upx;
	}

	.smallTitle {
		font-size: 26upx;
		font-weight: 500;
		padding: 20upx 0;
		line-height: 1.5;
		color: #888;
	}
</style>
