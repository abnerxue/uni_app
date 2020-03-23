<template>
	<view class="images">
		<view class="uni-padding-wraps">
			<swiper class="uni-padding-wraps" :indicator-dots="indicatorDots" :duration="duration">
				<swiper-item v-for="(item,index) in guidelList" :key="index">
					<image class="uni-padding-wraps" :src="item.img"></image>
					<navigator v-if="index==guidelList.length-1" class="home" url="../index/index" open-type="redirect">立即体验</navigator>
				</swiper-item>
			</swiper>
		<!-- 	<view class="xieyi">
				<view @click="ys">隐私协议</view>
				<view @click="name">用户协议</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true, //是否显示指示灯
				duration: 500, //动画
				guidelList: [{
					img: "./../../static/guild/four/Android/1080_1882.png"
					},
					{
						img: "./../../static/guild/secend/Android/1080_1882.png"
					},
					{
						img: "./../../static/guild/three/Android/1080_1882.png"
					},
					{
						img: "./../../static/guild/first/Android/1080_1882.png"
					},
				]
			}
		},
		methods: {
			ys(){
				uni.navigateTo({
					url:"/pages/privacy/privacy?id=2"
				})
			},
			name(){
				uni.navigateTo({
					url:"/pages/privacy/privacy?id=1"
				})
			}
		},
		onLoad() {
			uni.setStorageSync("guide","555555");
		}
	}
</script>

<style>
	.home {
		position: absolute;
		bottom: 180upx;
		left: 38%;
		width: 200upx;
		height: 70upx;
		border: 1px solid #999999;
		border-radius: 25upx;
		text-align: center;
		line-height: 70upx;
	}

	.uni-padding-wraps {
		width: 100%;
		position: absolute;
		height: 100%;
	}
	.images{
		width: 100%;
		height: 100%;
	}
	.xieyi{
		position: absolute;
		bottom: 50upx;
		width: 100%;
		display:flex;
		justify-content: center;
		align-items: center;
	}
	.xieyi view{
		margin-right: 20upx;
		color: #007AFF;
	}
</style>
