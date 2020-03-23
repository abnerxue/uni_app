<template>
	<view>
		<view class="bottomtab">
				<view class="bottabbar" :class="tags==1? 'actives' : '' " @click="home">
					<image src="../../static/first1.jpg" class="ims" v-if="tags==1"></image>
					<image src="../../static/first.jpg" class="ims" v-else></image>
					<view>首页</view>
				</view>
				<view class="bottabbar" :class="tags==3 ? 'actives' : '' " @click="classfy">
					<image src="../../static/class1.jpg" class="ims" v-if="tags==3"></image>
					<image src="../../static/class.jpg" class="ims" v-else></image>
					<view>分类</view>
				</view>
				<view class="bottabbar" :class="tags==2 ? 'actives' : '' " @click="wiki">
					<image src="../../static/wiki1.jpg" class="ims" v-if="tags==2"></image>
					<image src="../../static/wiki.jpg" class="ims" v-else></image>
					<view>百科</view>
				</view>
				<view class="bottabbar" :class="tags==4 ? 'actives' : '' " @click="cart">
					<image src="../../static/cart1.jpg" class="ims" v-if="tags==4"></image>
					<image src="../../static/cart.jpg" class="ims" v-else></image>
					<view>购物车</view>
				</view>
				<view class="bottabbar" :class="tags==5 ? 'actives' : '' " @click="user">
					<image src="../../static/user1.jpg" class="ims" v-if="tags==5"></image>
					<image src="../../static/user.jpg" class="ims" v-else></image>
					<view>我的</view>
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
			home(){
				uni.redirectTo({
					url:"/pages/index/index"
				})
			},
			wiki(){
				uni.redirectTo({
					url:"/pages/wiki/wiki"
				})
			},
			classfy(){
				uni.redirectTo({
					url:"/pages/classfy/classfy"
				})
			},
			cart(){
				let token = uni.getStorageSync('token');
				if(token=''||token=='null'||token==null||token<5){
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}else{
					uni.redirectTo({
						url:"/pages/cart/cart"
					})
				}
			},
			user(){
				let token = uni.getStorageSync('token');
				
				if(token=''||token=='null'||token==null||token<5){
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}else{
					uni.redirectTo({
						url:"/pages/user/user"
					})
				}
			}
		}
	}
</script>

<style>
.bottomtab{
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 100rpx;
	display: flex;
	justify-content: space-between;
	background: white;
	z-index: 55;
}

.bottabbar{
	
	width: 20%;
	height: 100%;
	text-align: center;
	font-size:24rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction:column;
}
.ims{
	width: 40rpx;
	height: 40rpx;
}
.actives{
	color:#74181B;
}
</style>
