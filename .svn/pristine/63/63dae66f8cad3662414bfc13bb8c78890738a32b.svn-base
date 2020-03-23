<template>
	<view>
		<view class="scrollbanner">
			<view class="triangle"></view>
			<view class="row">
				<view class="single">
					<view class="singleimg"><image src="../../static/benefits/birthday1.png"></image></view>
					<view><text>景区门票</text></view>
				</view>
				<view class="single">
					<view class="singleimg"><image src="../../static/benefits/ticket1.png"></image></view>
					<view><text>生日权益</text></view>
				</view>
				<view class="single">
					<view class="singleimg"><image src="../../static/benefits/ceremony1.png"></image></view>
					<view><text>开光祈福法会</text></view>
				</view>
				<view class="single">
					<view class="singleimg"><image src="../../static/benefits/birthday1.png"></image></view>
					<view><text>景区门票</text></view>
				</view>
				<view class="single">
					<view class="singleimg"><image src="../../static/benefits/ticket1.png"></image></view>
					<view><text>生日权益</text></view>
				</view>
				<view class="single">
					<view class="singleimg"><image src="../../static/benefits/ceremony1.png"></image></view>
					<view><text>开光祈福法会</text></view>
				</view>
			</view>
		</view>
		<view class="illustrate" @click="gopaymember()">
			<view class="illustrate-title">
				<text>权益说明</text>
			</view>
			<view class="illustrate-content">
				<text>
					尊贵的会员可在生日当天，尊贵的会员可在生日当天
					尊贵的会员可在生日当天，尊贵的会员可在生日当天
					尊贵的会员可在生日当天，尊贵的会员可在生日当天
				</text>
			</view>
			<view class="illustrate-title">
				<text>黄金会员：</text><text class="illustrate-price">价值58元</text>
			</view>
			<view class="illustrate-title">
				<text>黄金会员：</text><text class="illustrate-price">价值58元</text>
			</view>
			<view class="illustrate-title">
				<text>黄金会员：</text><text class="illustrate-price">价值58元</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			gopaymember(){
				uni.navigateTo({
					url:"../paymember/paymember"
				})
			}
		}
	}
</script>

<style>
.illustrate{
	margin: 20rpx 30rpx;
	
}
.illustrate-title{
	margin-top: 10rpx;
	margin-bottom: 10rpx;
	font-size: 30rpx;
}
.illustrate-price,.illustrate-content{
	font-size:30rpx;
	color: #969696;
}
.scrollbanner{	
	align-items: center;
	width: 750rpx;
	height: 300rpx;	
	background: #000000;
	position: relative;
}
.triangle{
	position: absolute;
	top:290rpx;
	left:370rpx;
	right: 370rpx;
	width: 20rpx;
	height: 10rpx;
	background: white;
}
.row{
	/* margin:30rpx 0rpx ; */
	height: 300rpx;
	display: flex;
	width: 750rpx;
	overflow: auto;
	text-justify: auto;
}
.row::-webkit-scrollbar {
		display: none;
	}
.single{
	padding-top: 20rpx;
	position: relative;
	width:300rpx;
	text-align: center;
	/* display: flex;
	flex-direction: column; */
}
.singleimg{
	text-align: center;
	width: 300rpx;
}
.single image{
	padding:0 25rpx;
	width: 200rpx;
	height: 200rpx;
}
.single text{
	padding: 0;
	font-size: 28rpx;
	color: #FBE7C4;
}
</style>
