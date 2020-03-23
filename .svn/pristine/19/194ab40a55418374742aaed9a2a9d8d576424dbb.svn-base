<template>
	<view>
		<view class="tan" v-show="tans">
			<text>{{message}}</text>
		</view>
		<view  class="share">
			<!-- <image :src="url+'/index/user_spread_qrcode.html?presenter='+uid" class="qr"></image> -->
			<image src="../../static/share.png" class="beijing"></image>
			<view class="shares">
				<view class="btn_shares">
					<view class="btn_share" @click="tan=true">立即邀请好友</view>
				</view>
				<view class="ranking_list">
					<view class="ranking_lists">
						<swiper vertical="true" autoplay="true" circular="true" interval="3000" style="height: 60rpx;width: 280rpx;">
							<swiper-item v-for="ranking in ranking_list">
								<view class="news">{{ ranking.userName}}赚了{{ranking.profit}}元</view>
							</swiper-item>
						</swiper>
					</view>
					<view class="ranking" @click="list=true">排行榜</view>
				</view>
				<view class="active_rules">
					<view class="title_rules">活动规则</view>
					<view class="step_acitve">
						<view class="steps">
							<view class="step_1">1</view>
							<view class="stePs_1">
								<text>邀请新人</text>
								<text>好友</text>
							</view>
						</view>
						<view class="steps">
							<view class="step_1">2</view>
							<view class="stePs_1">
								<text>扫描二维</text>
								<text>码下载并注册</text>
							</view>
						</view>
						<view class="steps">
							<view class="step_1">3</view>
							<view class="stePs_1">
								<text>好友消费</text>
								<text>终身返现</text>
							</view>
						</view>
					</view>
					<view class="del_rules" @click="goguize()">详细规则</view>
				</view>
				<view class="reward">
					<view class="reward-title">我的现金奖励</view>
					<view class="reward_balance">
						<view class="reward_font">可兑换金额(元)	<text class="balance">0</text></view>
						<view class="reward_btn" @click="duihuan()">立即兑换</view>
					</view>
				</view>
			</view>
		</view>
		<view class="spring" v-show="list==true">
			<view class="springlist">
				<view class="listtitle">排行榜</view>
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="list" @scroll="scroll">
					<view class="list-line"  v-for="ranking in ranking_list">
						<view><image :src="ranking.avatar"></image><image v-show="ranking.avatar==''" src="http://test.huainanhui.com/avatar.png"></image></view>
						<view class="message">
							<view class="messagetel">{{ ranking.userName}}</view>
							<view>邀请{{ranking.number}}名好友共获得{{ranking.profit}}元现金</view>
						</view>
					</view>
					
				</scroll-view>
			</view>
			<view @click="list=false" class="close"><text>x</text></view>
		</view>
		<view class="spring" v-show="tan==true">
			<view class="springs">
				<image src="../../static/share1.png" class="spring_image"></image>
				<view class="conents">
					<view class="conent">
						<view class="image-title_name">
							<view class="slogan_1">源头厂家直供<text class="slogans_1">自营更放心</text></view>
							<view class="slogan_2">来怀南会,开启你的购物之旅吧!</view>
							<view class="head_image"><image class="iamge_haed"></image><text class="name">188****4564</text></view>
						</view>
						<image class="qrcode" :src="url+'/index/user_spread_qrcode.html?presenter='+uid"></image>
					</view>
					<view>
						<view class="btn_yaoqing" @click="save()">分享</view>
					</view>
				</view>
			</view>
			<view @click="tan=false" class="close"><text>x</text></view>
		</view>
	</view>
</template>

<script>
	const server = require('../../utils/server');
	export default {
		data() {
			return {
				image:'',
				uid:'',
				url:'',
				tan:false,
				tans:false,
				list:false,
				ranking_list:{} //排行榜	
			}
		},
		onLoad() {
			let that = this;
			that.url = server.apiUrl;
			that.uid = uni.getStorageSync('uid');
			let token = uni.getStorageSync('token');
			if (token.length == '') {
				server.noLogin('你未登录，请先登录');
			} else {
				server.getJSON(
					'/api/popularize/ranking_list', res => {
						that.ranking_list = res.data;
					}
				)
			}
		},
		methods: {
			goguize(){
				uni.navigateTo({
					url:'./guize'
				})
			},
			duihuan(){
				uni.navigateTo({
					url:'./cashawards'
				})
			},
			save(){
				let that = this;
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    href: "www.huainanhui.com?presenter="+that.uid,
				    title: "怀南会",
				    imageUrl: "https://img.huainanhui.com/image/slide/2019/12/06/102316647.jpg",
				    success: function (res) {
				        //console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        //console.log("fail:" + JSON.stringify(err));
				    },
				});
			}
		}
	}
</script>

<style>
	.share {
		display: flex;
		flex-direction: column;
	}
.qr{
	z-index: 1;
	position:absolute;
	bottom: 90rpx;
	left: 300rpx;
	height: 150rpx;
	width: 150rpx;
}
.beijing {
	width: 750rpx;
	height: 720rpx;
}
.shares{
	background: #C41721;
	padding:0 20rpx 60rpx;
	box-sizing: border-box;
	width: 100%;
}
.btn_shares{
	width: 100%;
	display: flex;
}
.btn_share{
	width: 550rpx;
	height: 100rpx;
	background-image: linear-gradient(#FEF5D4, #FAD285, #F5AC2D);
	border-radius: 40rpx;
	color: #74181B;
	font-size: 45rpx;
	text-align: center;
	line-height: 100rpx;
	margin: 0 auto;
}
.btn_yaoqing{
	line-height: 68rpx;
	height: 68rpx;
	width: 100%;
	background-image: linear-gradient(#FBE7C4, #FAD893);
	border-radius: 40rpx;
	text-align: center;
	color: #74181B;
	font-size: 28rpx;
}
.close{
	font-size:48rpx ;
	margin-top: 20rpx;
	text-align: center;
	align-items: center;
	line-height: 80rpx;
	width: 88rpx;
	height: 88rpx;
	border-radius: 45rpx;
	border:2px solid #FADD9F;
	color: #FADD9F;
}
.ranking_list{
	display: flex;
	width: 100%;
	font-size:26rpx;
	color: #FBE7C4;
	justify-content: center;
	margin: 50rpx 0;
}

.ranking_lists{
	margin-right: 20rpx;
	text-align: center;
}
.ranking{
	color: #F8C466;
}
.active_rules{
	width: 100%;
	height: 304rpx;
	background: white;
	position: relative;
	border-radius: 12rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 40rpx;
}
.title_rules{
	position: relative;
	width: 214rpx;
	height: 60rpx;
	text-align: center;
	color: white;
	font-size: 32rpx;
	background: #E6003B;
	line-height: 60rpx;
	border-radius: 8rpx;
	top: -20rpx;
}
.step_acitve{
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 100%;
}
.steps{
	display: flex;
	flex-direction: column;
	font-size: 26rpx;
	color: #1C0000;
	align-items: center;
}
.step_1{
	width: 48rpx;
	height: 48rpx;
	background: #FAD68F;
	font-size: 28rpx;
	border-radius: 48rpx;
	line-height: 48rpx;
	text-align: center;
	margin-bottom: 16rpx;
}
.stePs_1{
	display: flex;
	flex-direction: column;
	align-items: center;
}
.del_rules{
	color: #F5C35A;
	font-size: 24rpx;
	width: 100%;
	height:80rpx;
	line-height: 80rpx;
	text-align: center;
}
.reward{
	width: 100%;
	height:220rpx;
	background: white;
	padding: 20rpx 30rpx 50rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	box-sizing: border-box;
	border-radius: 12rpx;
}
.reward-title{
	color: #1C0000;
	font-size: 32rpx;
	font-weight: 600;
	text-align: center;
}
.reward_balance{
	display: flex;
	justify-content: space-between;
}
.reward_font{
	font-size: 26rpx;
	color: #4A4A4A;
	display: flex;
	align-items: center;
}
.balance{
	color: #DD0812;
	font-size: 45rpx;
	margin-left: 10rpx;
}
.reward_btn{
	width: 172rpx;
	height: 58rpx;
	background: #FBDD9F;
	color: #4A4A4A;
	font-size:26rpx;
	text-align: center;
	line-height: 58rpx;
}
/* 排行榜 */
.springlist{
	background: white;
	display: flex;
	flex-direction: column;
	width: 630rpx;
	height: 668rpx;
	border-radius: 16rpx;
	position: relative;
	overflow:auto;
}
.listtitle{
	display: fixed;
	top: 0;
	width: 630rpx;
	height: 88rpx;
	border-radius: 16rpx 16rpx 0 0;
	text-align: center;
	line-height: 88rpx;
	font-size: 34rpx;
	background-image: linear-gradient(#FFF4E2, #F2D7A2);
	background: -webkit-gradient(linear, 0% 0%, 100% 0%, from(#FFF4E2), to(#F2D7A2));
}
/* 排行榜列表 */
.list{
	height: 550rpx;
}
.list::-webkit-scrollbar {
	display:none;
}
 
.list-line{
	display: flex;
	flex-direction: row;
	padding: 0 20rpx;
	font-size: 26rpx;
	color: #4A4A4A;
	height: 140rpx;
	align-items: center;
	border-bottom: 1px solid #E9E9E9;
}
.message{
	padding-left: 10rpx;
}
.list-line image{
	background: #000000;
	width: 90rpx;
	height: 90rpx;
	border-radius: 50rpx;
	line-height: 140rpx;
}
.messagetel{
	font-size: 30rpx;
	line-height: 44rpx;
	color: #1C0000;
}
/* 弹窗 */
.spring{
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: rgba(000,000,000,0.5);
}
.springs{
	background: white;
	display: flex;
	flex-direction: column;
	width: 590rpx;
	height: 875rpx;
	border-radius: 20rpx;
}
.spring_image{
	width: 100%;
	height: 574rpx;
}
.conents{
	padding: 30rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
}
.conent{
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
	margin-bottom: 26rpx;
}
.image-title_name{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.slogan_1{
	color: #74181B;
	font-size: 30rpx;
}
.slogans_1{
	margin-left: 10rpx;
}
.slogan_2{
	color: #1C0000;
	font-size: 24rpx;
}
.head_image{
	color: #1C0000;
	font-size: 26rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
}
.iamge_haed{
	width: 48rpx;
	height: 48rpx;
}
.name{
	margin-left: 20rpx;
}
.qrcode{
	width: 150rpx;
	height: 150rpx;
}
</style>
