<template>
	<view class="back">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		 <!--  #endif -->
		<view class="tan" v-show="tan">
			<text>{{message}}</text>
		</view>
		<view class="head">
			<view class="heads modify">
				<navigator open-type="navigateBack"><text class="iconfont icon-left"></text></navigator>
				<view>修改昵称</view>
				<view class="save" @click="save">保存</view>
			</view>
		</view>
		<view class="savas">
			<input type="text" :placeholder="name" v-model="name">
		</view>
	</view>
</template>

<script>
	const server = require('../../../utils/server');
	export default {
		data() {
			return {
				name:'',
				tan:false,
				message:'修改成功'
			}
		},
		onLoad() {
			this.name = uni.getStorageSync('name');
		},
		methods: {
			save(){
				let that = this;
				server.postJSON('/api/user/nick_name',{
					token:uni.getStorageSync('token'),
					nickName:that.name
				},res=>{
					console.log(res)
					if(res.data.code==1){
						uni.setStorageSync('name',that.name)
						that.message = '修改成功'
						that.tan = true;
						setTimeout(function(){
							that.tan = false;
							uni.navigateBack({
								delta:1
							})
						},1000)
					}else{
						that.tan = true;
						that.message = '修改失败，请检查你的网络连接'
						setTimeout(function(){
							that.tan = false;
						},1000)
					}
				})
			}
		}
	}
</script>

<style>
.modify{
	justify-content: space-between;
	padding: 0 20rpx;
	box-sizing: border-box;
	font-weight: 400;
	color: #1C0000;
	font-size: 32rpx;
}
.save{
	color: #808080;
	font-size: 26rpx;
}
.savas{
	width: 100%;
	height:120rpx;
	background: white;
	display: flex;
	align-items: center;
	background: #FFFFFF;
	padding:0 20rpx; 
	box-sizing: border-box;
}
.savas input{
	width: 100%;
	color: #1C0000;
	font-size: 26rpx;
}
</style>
