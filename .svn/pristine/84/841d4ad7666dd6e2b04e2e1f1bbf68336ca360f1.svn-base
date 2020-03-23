<template>
	<view>
		<view class="res">
			<view class="tabbar">
				<view @click="search"><text class="iconfont icon-sousuo"></text></view>
				<view @click="home(0)" :class="tab==0?'active':''">竞价</view>
				<view @click="home(1)" :class="tab==1?'active':''">推荐</view>
				<view @click="home(2)" :class="tab==2?'active':''">直购</view>
				<image src="../../static/message.jpg" class="icon-ldang"></image>
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
		props:["tab"],
		methods: {
			home(id){
				if(id==0){
					uni.redirectTo({
						url:'./jingjia'
					})
				}else if(id==1){
					uni.redirectTo({
						url:'./index'
					})
				}else{
					uni.redirectTo({
						url:'./zhigou'
					})
				}
			},
			// 搜索
			search(){
				uni.navigateTo({
					url:'./search'
				})
			}
		}
	}
</script>

<style>
	.res{
		position: relative;
		width: 100%;
		height: 90rpx;
		background: white;
	}
.tabbar{
	position: fixed;
	width: 100%;
	height: 90rpx;
	display: flex;
	padding: 0 30rpx;
	justify-content: space-between;
	box-sizing: border-box;
	background: white;
	align-items: center;
	z-index: 50;
	color:#9A9A9A ;
	font-size:32rpx;
}
.icon-ldang{
	width: 30rpx;
	height: 33rpx;
}
.active{
	color: #74181B;
	font-size: 36rpx;
	border-bottom: 2px solid #74181B;
	font-weight:550;
	height:50rpx;
	padding: 0 10rpx;
}
</style>
