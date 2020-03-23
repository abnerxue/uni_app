<template>
	<view class="background">
		<view class="xinr">
			<image class="back-image" src="../../static/xinren.png"></image>
			<view class="image-content">
				<view class="images" >
					<image class="imagess" src="../../static/xinre.png"></image>
					<view class="momey"><view class="qian">￥</view>8</view>
					<view class="momeys">满100可用<view class="quanchan">全场通用</view></view>
				</view>
				<view class="images" >
					<image class="imagess" src="../../static/xinre.png"></image>
					<view class="momey"><view class="qian">￥</view>18</view>
					<view class="momeys">满200可用<view class="quanchan">全场通用</view></view>
				</view>
			<view class="images" >
				<image class="imagess" src="../../static/xinre.png"></image>
				<view class="momey"><view class="qian">￥</view>58</view>
				<view class="momeys">满500可用<view class="quanchan">全场通用</view></view>
			</view>
				<view class="images" >
					<image class="imagess" src="../../static/xinre.png"></image>
					<view class="momey"><view class="qian">￥</view>118</view>
					<view class="momeys">满1000可用<view class="quanchan">全场通用</view></view>
				</view>
				<view class="images" >
					<image class="imagess" src="../../static/xinre.png"></image>
					<view class="momey"><view class="qian">￥</view>236</view>
					<view class="momeys">满2000可用<view class="quanchan">全场通用</view></view>
				</view>
			<view class="images" >
				<image class="imagess" src="../../static/xinre.png"></image>
				<view class="momey"><view class="qian">￥</view>336</view>
				<view class="momeys">满3000可用<view class="quanchan">全场通用</view></view>
			</view>
				<view class="ima-btn" @click="login">{{message}}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			message:'立即领取'
		};
	},
	methods: {
		login(){
			if(this.message=='立即领取'){
				uni.navigateTo({
					url:'../login/login'
				})
			}
		}
	},
	onLoad() {
		if(uni.getStorageSync('token')==''){
			this.message = '立即领取'
		}else{
			this.message = '已领取'
		}
	}
};
</script>

<style>
.background {
	background: linear-gradient(#c50704, #ef1b28, #ef1b28);
	height: 100%;
	width: 100%;
}
.back-image {
	width: 100%;
	height:460rpx;
}
.image-content{
	width: 100%;
	margin-top: 30rpx;
	padding: 20rpx 30rpx 0 30rpx;
	display: flex;
	flex-wrap: wrap;
	box-sizing: border-box;
	justify-content: space-around;
}
.images{
	width: 284rpx;
	height: 287rpx;
	position: relative;
	margin-bottom: 30rpx;
}
.imagess{
	width: 100%;
	height: 100%;
}
.qian{
	font-size: 42rpx;
	margin-top: 20rpx;
}
.momey{
	position: absolute; 
	padding-top: 20rpx;
	width: 100%;
	height: 50%;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #DD0812;
	font-weight: 600;
	font-size: 74rpx;
	padding-right: 20rpx;
	box-sizing: border-box;
}
.momeys{
	position: absolute;
	height: 50%;
	width: 100%;
	bottom: 0;
	left: 0;
	padding-top: 20rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #F2D7A2;
	font-size: 36rpx;
	flex-direction: column;
}
.quanchan{
	font-size: 22rpx;
}
.ima-btn{
	width: 400rpx;
	height: 90rpx;
	/* background: linear-gradient(#FBE7C4,#F3D087, #FBE7C4); */
	background: gray;
	color: #463821;
	font-size: 44rpx;
	border-radius: 50rpx;
	line-height: 90rpx;
	text-align: center;
	margin-top:40rpx;
	margin-bottom: 90rpx;
}
</style>
