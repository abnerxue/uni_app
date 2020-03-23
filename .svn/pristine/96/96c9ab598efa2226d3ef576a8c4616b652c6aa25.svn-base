<template>
	<view>
		<view class="head">
			<view class="headcontent">
				<view class="left">
					<image class="head-imagea" src="../../static/search.jpg"></image>
				</view>
				<view class="center">
					<text :class="tags==1?'active':'head-font'" @click="jingjia">竞价</text>
					<text :class="tags==2?'active':'head-font'" @click="home">推荐</text>
					<text :class="tags==3?'active':'head-font'" @click="zhigou">直购</text>
				</view>
				<view class="right">
					<image class="head-imageb" src="../../static/message.jpg"></image>
				</view>
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
		props:["tags"],
		methods: {
			jingjia(){
				uni.redirectTo({
					url:"./jingjia"
				})
			},
			home(){
				uni.redirectTo({
					url:"/pages/index/index"
				})
			},
			zhigou(){
				uni.redirectTo({
					url:"./zhigou"
				})
			}
		}
	}
</script>

<style>
/* 顶部栏 */
	.head {
		margin-bottom: 10rpx;
		background: #FFFFFF;
		width: 100%;
		height: 90rpx;
		padding-top: 50rpx;
		position: fixed;
		top: 0rpx;
		left: 0;
		z-index:100;
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-bottom: 1rpx solid #C8C7CC;
	}
	.headcontent{
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.center {
		text-align: center;
		width: 450rpx;
		margin-left: 40rpx;
		margin-right: 40rpx;
		/* float: left; */
	}
	.center  text{
		width: 150rpx;
		text-align: center;
	}
	.right{
		width: 50rpx;
		height: 50rpx;	
	}
	.left{
		width: 50rpx;
		height: 50rpx;
	}
	.head-imagea {
		width: 36rpx;
		height: 36rpx;
		position: fixed;
		top: 80rpx;
		left: 20rpx;
	}
	.head-imageb {
		width: 30rpx;
		height: 36rpx;
		position: fixed;
		top: 80rpx;
		right: 20rpx;
	}

	.head-font {
		width: 150rpx;
		font-family: Arial;
		font-size: 28rpx;
		padding: 20rpx 35rpx;
		color: #9A9A9A;
		font-weight: 300;
	}

	.active {
		text-align: center;
		width: 450rpx;
		margin-left: 40rpx;
			margin-right: 40rpx;
		/* line-height: 50rpx; */
		font-size: 36rpx;
		color: #74181B;
		font-weight: 550;
		border-bottom: 2px solid #74181B;
		padding-bottom: 8rpx;
	}
</style>
