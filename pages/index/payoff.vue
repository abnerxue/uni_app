<template>
	<view class="back">
		<view>
			<view class="baozheng">
				<view class="baozhengtip">
					<view class="tiptitle"><image src="../../static/productdetail/payoff%20.png"></image></view>
					<view class="price">保证金支付成功</view>
					<view>返回参与竞拍出价</view>
				</view>
			</view>
			
			<button class="zhifu" @click="payback()">返回</button>
		</view>
	</view>
</template>

<script>
	const server = require('../../utils/server')
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		methods: {
			payback(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>
.baozheng{
	width: 100%;
	text-align: center;
}
.baozhengtip{
	line-height: 60rpx;
	font-size: 26rpx;
	color: #4A4A4A;
	margin: 120rpx 0rpx 140rpx 0;
	border-radius: 8rpx;
}
.tiptitle{
	height: 150rpx;
	font-size: 28rpx;
	color: #9A9A9A;
	line-height:150rpx;
}
.tiptitle image{
	width: 120rpx;
	height: 120rpx;
}
.price{
	font-size: 28rpx;
	color: #1C0000;
}
.zhifu{
	background: #DD0812;
	color: white;
	font-size: 32rpx;
	height: 88rpx;
	width: 702rpx;
	margin: 0 auto;
	line-height: 88rpx;
}
</style>

