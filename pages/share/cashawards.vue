<template>
	<view>
		<view class="upcash">
			<view>可兑换金额（元）</view>
			<view class="cashprice">0</view>
		</view>
		<view class="kong"></view>
		<view class="cashdetail">
			<view class="title">成功邀请</view>
			<view class="details">
				<view class="detail" v-for="cashlist in cashlist" v-if="cashlist==false||cashlist==null">暂无收益</view>
				<view class="detail" v-for="cashlist in cashlist" v-else>
					<view class="left">
						<view class="leftimage"><image src="../../static/user_image.png"></image></view>
						<view class="message">
							<view class="messagetel">{{cashlist.userName}}</view>
							<view>{{cashlist.mobile}}</view>
						</view>
					</view>
					<view class="right">
						<view>{{cashlist.orderNum}}</view>
						<view class="messagetel">＋ ￥{{cashlist.profit}}</view>
					</view>
				</view>
				<!-- <view class="detail">
					<view class="left">
						<view class="leftimage"><image src="../../static/user_image.png"></image></view>
						<view class="message">
							<view class="messagetel">183****1235</view>
							<view>18345687521</view>
						</view>
					</view>
					<view class="right">
						<view>×1</view>
						<view class="messagetel">＋ ￥448.00</view>
					</view>
				</view> -->
			</view>	
		</view>
	</view>
</template>

<script>
	const server = require('../../utils/server');
	export default {
		data() {
			return {
				cashlist:[]
			}
		},
		onLoad() {
			let token = uni.getStorageSync('token');
			let that = this;
			server.postJSON(
				'api/user/recommend?ajax=true',
				{
					token: token,
					page:1,
					span:10
				},
				function(res) {
					that.cashlist=res.data.list;
					console.log(res)
					console.log(that.cashlist)
				}
			);
// 			server.postJSON(
// 				'/user/invite/reward_list?ajax=true',
// 				{
// 					token: token,
// 					page:1,
// 					span:10
// 				},
// 				function(res) {
// 					console.log(res)
// 				}
// 			);
		},
		methods: {
			
		}
	}
</script>

<style>
.upcash{
	border-top: 1px solid #F5F5F5;
	width: 100%;
	height: 150rpx;
	text-align: center;
	align-items: center;
	font-size: 28rpx;
	color: #1C0000;
	padding-top: 30rpx;
}	
.cashprice{
	font-size: 34rpx;
	line-height: 80rpx;
}	
.kong{
	height: 20rpx;
	background:#F5F5F5;
}
.cashdetail{
	padding: 0 30rpx;
	width: 690rpx;
}
.title{
	height: 100rpx;
	font-size: 30rpx;
	line-height: 100rpx;
	border-bottom: 1px solid #F5F5F5;
	align-items: center;
	margin-bottom: 20rpx;
}
.details{
	font-size: 28rpx;
	height: auto;
}
.detail{
	height: 120rpx;
	color: #C5C5C5;
}
.detail,.left{
	display: flex;
	justify-content:space-between;
	align-items: center;
}
.messagetel{
	color: #1C0000;
}
.leftimage image{
	background: #000000;
	width: 90rpx;
	height: 90rpx;
	border-radius: 50rpx;
	line-height: 140rpx;
}
.right{
	text-align: end;
}
</style>
