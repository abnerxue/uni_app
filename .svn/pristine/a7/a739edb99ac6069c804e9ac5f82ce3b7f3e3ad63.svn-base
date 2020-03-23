<template>
	<view class="center_container">
		<view class="center_container">
			<image class="logo_style" src="../../../static/logos.png"></image>
			<view class="text_appname">怀南会</view>
			<view class="text_grey">1.0.1</view>
		</view>
		<view class="center_container bottom_con">
			<view>
				<text class="text_link" @click="privacy(1)">用户协议</text>
				<text class="text_link" @click="privacy(2)">隐私协议</text>
			</view>
			<text class="text_copy">版权所有@2016-2020怀南汇保留一切权利</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			privacy(id){
				uni.navigateTo({
					url:'../../privacy/privacy?id='+id
				})
			},
		}
	}
</script>

<style>
	.center_container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-content: center;
		align-items: center;
	}

	.logo_style {
		height: 150rpx;
		width: 150rpx;
		margin-top: 117rpx;
		border-radius: 30rpx;
	}


	.text_appname {
		color: rgb(26, 26, 26);
		font-size: 31rpx;
		margin-top: 22rpx;
		margin-bottom: 13rpx;
	}

	.text_grey {
		color: rgba(26, 26, 26, 0.5);
		font-size: 28rpx;
	}

	.bottom_con {
		position: fixed;
		bottom: 33rpx;
	}


	.text_link {
		color: #005BBA;
		font-size: 20.8rpx;
		margin-right: 20rpx;
	}

	.text_copy {
		color: rgba(26, 26, 26, 0.5);
		font-size: 21rpx;
	}
</style>
