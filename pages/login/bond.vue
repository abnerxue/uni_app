<template>
	<view>
		<!-- 提示弹窗 -->
		<view class="tan" v-show="tan">
			<text>{{message}}</text>
		</view>
		<view class="inputs marg">
			<view class="inputss">
				<view class="tip">手机号</view>
				<view><input type="text" class="input" v-model="mobile" placeholder="请输入手机号" /></view>
				<!-- <view class="buttons">{{sendCodeTitle}}</view> -->
			</view>
		</view>
		<view class="inputs marg">
			<view class="inputss">
				<view class="tip">验证码</view>
				<view><input type="text" class="input" v-model="verification" placeholder="请输入验证码" /></view>
				<view class="buttons" @click="codes">{{sendCodeTitle}}</view>
			</view>
		</view>
		<view class="btn" @click="binding()">
			<view class="btns">绑定此手机号</view>
		</view>
	</view>
</template>

<script>
	const server = require('../../utils/server');
	export default {
		data() {
			return {
				mobile: '',
				verification: "", //验证码
				sendCodeTitle: '发送验证码',
				tan: false, //弹窗
				message: '', //弹窗提示语
				openid: 0,
			}
		},
		onLoad(option) {
			this.openid = option.openid;
		},
		methods: {
			// 获取验证码
			codes() {
				let that = this;
				if (server.isEmpty(that.mobile)) {
					that.tan = true;
					that.message = '手机号不能为空';
					setTimeout(function() {
						that.tan = false;
					}, 1300)
				} else if (!server.reg_phone(that.mobile)) {
					that.tan = true;
					that.message = '请输入正确的手机号';
					setTimeout(function() {
						that.tan = false;
					}, 1300)
				} else {
					server.postJSON(
						'/api/sms/weixin_bind_captcha', {
							phone: that.mobile
						},
						function(res) {
							console.log(res)
							if (res.data.code == '1') {
								that.tan = true;
								that.message = res.data.message;
								setTimeout(function() {
									that.tan = false;
								}, 1300)
								that.time = 60;
								that.timer();
							} else {
								that.tan = true;
								that.message = res.data.message;
								setTimeout(function() {
									that.tan = false;
								}, 1300)
							}
						}
					);
				}
			},
			timer: function() { //验证码的倒计时
				if (this.time > 0) {
					this.time--;
					this.sendCodeTitle = this.time + 's';
					setTimeout(this.timer, 1000);
				} else {
					this.time = 0;
					this.sendCodeTitle = "发送验证码";
					this.disabled = false;
				}
			},
			// 绑定
			binding() {
				let that = this;
				if (server.isEmpty(that.mobile)) {
					that.message = "手机号不能为空"
					that.tan = true;
					setTimeout(function() {
						that.tan = false;
					}, 1300)
				} else if (!server.reg_phone(that.mobile)) {
					that.message = "请输入正确的手机号"
					that.tan = true;
					setTimeout(function() {
						that.tan = false;
					}, 1000)
				} else {
					// #ifdef APP-PLUS
					plus.device.getInfo({
						success: function(e) {
							var platform = uni.getSystemInfoSync().platform; // 获取是Android  还是 ios
							var idfa = '';
							if (platform != 'android') {
								var manager = plus.ios.invoke('ASIdentifierManager', 'sharedManager');
								if (plus.ios.invoke(manager, 'isAdvertisingTrackingEnabled')) {
									var identifier = plus.ios.invoke(manager, 'advertisingIdentifier');
									idfa = plus.ios.invoke(identifier, 'UUIDString');
									plus.ios.deleteObject(identifier);
								}
								plus.ios.deleteObject(manager);
							}
							var t = uni.getSystemInfoSync();
							var cid = server.get_getui_cid();
							// 获取用户信息
							uni.getUserInfo({
								success: function(infoRes) {
									var datas = JSON.stringify(infoRes.userInfo);
									var data = {
										phone: that.mobile, 
										captcha: that.verification,
										source: server.source,
										position: server.position,
										uuid: e.uuid,
										imei: e.imei,
										cid: cid,
										brand: t.brand, //手机品牌
										model: t.model, //手机型号
										idfa: idfa,
										location: t.cacheLocation, //手机位置信息
										wx_userinfo: datas 
									}
									server.postJSON(
										'/api/login/wx_bind',
										data,
										function(res) {
											if (res.data.login == 1) {
												uni.setStorageSync('token', res.data.token)
												uni.navigateBack({
													delta:2
												})
												that.tan = true;
												that.message = res.data.message;
												setTimeout(function() {
													that.tan = false;
													uni.navigateBack({
														delta: 1
													})
												}, 1300)
											} else {
												that.tan = true;
												that.message = res.data.message;
												setTimeout(function() {
													that.tan = false;
												}, 1300)
											}
										} 
									);
								}
							});
						}
					})
					// #endif
				}
			}
		}
	}
</script>

<style>
	.inputs {
		width: 100%;
		height: 80rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.inputss {
		width: 100%;
		height: 80rpx;
		border-bottom: 1px solid #E9E9E9;
		display: flex;
		align-items: center;
		/* justify-content: space-between; */
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.tip {
		width: 150rpx;
		color: #1C0000;
		font-size: 28rpx;
	}

	.input {
		color: #9A9A9A;
		font-size: 24rpx;
		height: 70rpx;
		width: 340rpx;
		border: none;
	}

	.buttons {
		margin-right: 0;
		color: #74181B;
		font-size: 20rpx;
		border: 1px solid #74181B;
		width: 160rpx;
		height: 60rpx;
		border-radius: 14rpx;
		line-height: 60rpx;
		text-align: center;
	}

	.btn {
		position: relative;
		width: 100%;
		height: 100rpx;
		margin-top: 20rpx;
	}

	.btns {
		position: fixed;
		width: 100%;
		height: 100rpx;
		bottom: 0;
		background: #74181B;
		color: #FFFFFF;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
