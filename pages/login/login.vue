<template>
	<view>
		<!-- 提示弹窗 -->
		<view class="tan" v-show="tan">
			<text>{{message}}</text>
		</view>
		<view class="backgrounds"></view>
		<view class="login">
			<view class="logos">
				<image src="../../static/logos.png" class="logo"></image>
			</view>
			<!-- 账号登录 -->
			<view class="inputs marg" v-show="logisn==1">
				<view  class="inputss">
					<input type="text" class="input" v-model="users" placeholder="请输入账号" />
				</view>
			</view>
			<view class="inputs marg" v-show="logisn==1">
				<view  class="inputss">
					<input :type="type" class="input" v-model="passwords" placeholder="请输入密码" />
					<text class="iconfont icon-chakanmima1" @click="types" v-show="type=='password'"></text>
					<text class="iconfont icon-chakanmima" @click="types" v-show="type=='text'"></text>
				</view>
			</view>
			<!-- 手机号登录 -->
			<view class="inputs marg" v-show="logisn==2">
				<view  class="inputss">
					<input type="text" class="input" v-model="mobile" placeholder="请输入手机号" />
					<!-- <view class="buttons">{{sendCodeTitle}}</view> -->
				</view>
			</view>
			<view class="inputs marg" v-show="logisn==2">
				<view  class="inputss">
					<input type="text" class="input" v-model="verification" placeholder="请输入验证码" />
					<view class="buttons" @click="codes">{{sendCodeTitle}}</view>
				</view>
			</view>
			<view class="login-switch">
				<view class="login-switchs">
					<view class="" @click="wx_login">
						<image class="wx-login" src="../../static/wx.png"></image>
					</view>
					<view class="moblie-login" v-show="logisn==1" @click="logisn=2">使用手机号码登录</view>
					<view class="moblie-login" v-show="logisn==2" @click="logisn=1">使用账号密码登录</view>
				</view>
			</view>
			<view class="btn">
				<!-- 账号 -->
				<button class="btns" @click="login(1)" v-show="logisn==1">登录</button>
				<!-- 手机号 -->
				<button class="btns" @click="login(2)" v-show="logisn==2">登录</button>
			</view>
			<view class="protocol">登录即代表已阅读并同意<view class="nameprotocol" @click="privacy(1)">《怀南会用户协议》</view>和<view class="nameprotocol" @click="privacy(2)">《怀南会用户隐私政策》</view></view>
		</view>
	</view>
</template>

<script>
	const server = require('../../utils/server');
	const MD5 = require('../../utils/md5_min');
export default {
	data() {
		return {
			users:"",
			passwords:'',
			type:'password',
			logisn:1,
			mobile:'',
			verification: "", //验证码
			time: 0, //发送验证码的倒计时
			sendCodeTitle: '发送验证码',
			tan:false, //弹窗
			message:'', //弹窗提示语
		};
	},
	methods: {
		login(loginid){
			let that = this;
			if(loginid==1){
				if (server.isEmpty(that.users)) {
					that.message = "请输入账号"
					that.tan = true;
					setTimeout(function(){
						that.tan = false;
					},1300)
				} else if (server.isEmpty(that.passwords)) {
					that.message = "请输入密码"
					that.tan = true;
					setTimeout(function(){
						that.tan = false;
					},1300)
				} else {
					server.postJSON(
						'/login/login?ajax=true', {
							name: that.users,
							password: MD5.hex_md5(that.passwords)
						},
						function(res) {
							if(res.data.code==0){
								that.message = res.data.message
								that.tan = true;
								setTimeout(function(){
									that.tan = false;
								},1300)
							}else{
								server.loginSuccess(res.data,1);
							}
						}
					);
				}
			}else if(loginid==2){
				if (server.isEmpty(that.mobile)) {
					that.message = "手机号不能为空"
					that.tan = true;
					setTimeout(function(){
						that.tan = false;
					},1300)
				} else if (!server.reg_phone(that.mobile)) {
					that.message = "请输入正确的手机号"
					that.tan = true;
					setTimeout(function(){
						that.tan = false;
					},1000)
				} else {
					plus.device.getInfo({
						success:function(e){
							var platform = uni.getSystemInfoSync().platform;  // 获取是Android  还是 ios
							var idfa = '';
							if(platform!='android'){
								var manager = plus.ios.invoke('ASIdentifierManager', 'sharedManager');  
								if(plus.ios.invoke(manager, 'isAdvertisingTrackingEnabled')){  
								    var identifier = plus.ios.invoke(manager, 'advertisingIdentifier');  
								    idfa = plus.ios.invoke(identifier, 'UUIDString');  
								    plus.ios.deleteObject(identifier);  
								}  
								plus.ios.deleteObject(manager);
							}
							var t = uni.getSystemInfoSync();
							var cid = server.get_getui_cid();
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
								location: t.cacheLocation, //手机位置信息
								idfa:idfa,
							}
							server.postJSON(
								'/login/login_captcha',
								data,
								function(res) {
									server.loginSuccess(res.data,1);
								}
							);
						}
					})
				}
			}
		},
		privacy(id){
			uni.navigateTo({
				url:'../privacy/privacy?id='+id
			})
		},
		// 获取验证码
		codes(){
			let that = this;
			if (server.isEmpty(that.mobile)) {
				that.tan = true;
				that.message = '手机号不能为空';
				setTimeout(function(){
					that.tan = false;
				},1300)
			} else if (!server.reg_phone(that.mobile)) {
				that.tan = true;
				that.message = '请输入正确的手机号';
				setTimeout(function(){
					that.tan = false;
				},1300)
			} else {
				server.postJSON(
					'/login/login_captcha_sms', {
						phone: that.mobile
					},
					function(res) {
						if (res.data.code == '1') {
							that.tan = true;
							that.message = '短息发送成功';
							setTimeout(function(){
								that.tan = false;
							},1300)
							that.time = 60;
							that.timer();
						} else {
							that.tan = true;
							that.message = '短息发送失败';
							setTimeout(function(){
								that.tan = false;
							},1300)
						}
					}
				);
			}
		},
		timer: function() { //验证码的倒计时
			if (this.time > 0) {
				this.time--;
				this.sendCodeTitle = this.time+'s';
				setTimeout(this.timer, 1000);
			} else {
				this.time = 0;
				this.sendCodeTitle = "发送验证码";
				this.disabled = false;
			}
		},
		// 查看密码
		types(){
			if(this.type=='password'){
				this.type = 'text'
			}else{
				this.type='password'
			}
		},
		// 微信登录
		wx_login(){
			uni.getProvider({
			    service: 'oauth',
			    success: function (res) {
					uni.login({
					  provider: 'weixin',
					  success: function (loginRes) {
						server.postJSON('/api/login/wx_openid',{
							openid:loginRes.authResult.openid
						},res=>{
							if(res.data.login==1){
								server.loginSuccess(res.data,1);
							}else{
								uni.navigateTo({
									url:'./bond?openid='+loginRes.authResult.openid
								})
							}
						})
					  }
					});
			    }
			});
		}
	}
};
</script>

<style>
	.login{
		width: 100%;
	}
.backgrounds {
	background: #fafafa;
	width: 100%;
	height: 10rpx;
}
.logos {
	width: 100%;
	height: 250rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.logo {
	width: 120rpx;
	height: 120rpx;
}
.inputs{
	width: 100%;
	height: 80rpx;
	padding: 0 30rpx;
	box-sizing: border-box;
}
.inputss{
	width: 100%;
	height: 80rpx;
	border-bottom: 1px solid #E9E9E9;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 20rpx;
	box-sizing: border-box;
}
.buttons{
	color: #74181B;
	font-size: 20rpx;
	border:1px solid #74181B;
	width: 160rpx;
	height: 60rpx;
	border-radius: 14rpx;
	line-height: 60rpx;
	text-align: center;
}
.marg{
	margin-bottom: 40rpx;
}
.input{
	color: #9A9A9A;
	font-size: 24rpx;
	height: 70rpx;
	width: 440rpx;
	border: none;
}
.login-switch{
	padding: 0 30rpx;
	box-sizing: border-box;
	width: 100%;
	height: 80rpx;
	margin-bottom: 40rpx;
}
.login-switchs{
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	padding: 0 20rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.wx-login{
	width: 36rpx;
	height: 36rpx;
}
.moblie-login{
	font-size: 26rpx;
}
.btn{
	width: 100%;
	padding: 0  30rpx;
	box-sizing: border-box;
}
.btns{
	background: #74181B;
	color: white;
}
.protocol{
	margin-top: 20rpx;
	font-size: 20rpx;
	padding: 0 30rpx 0 30rpx;
	box-sizing: border-box;
	height: 50rpx;
	line-height: 50rpx;
	color: #9A9A9A;
	display: flex;
}
.nameprotocol{
	color: #74181B;
}
</style>
