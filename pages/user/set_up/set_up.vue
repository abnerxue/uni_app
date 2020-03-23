<template>
	<view>
		<view class="back">
			<view>
				<view class="set_up_head_portrait">
					<view>头像</view>
					<image class="head_portrait" @click="updata()" :src="image"></image>
				</view>
				<view class="nickname" @click="modify_nickname()">
					<view>昵称</view>
					<view class="nicknames">{{name}}</view>
				</view>
				<view class="baiben">
					<view>版本升级</view>
					<view class="nicknames">V1.0.1</view>
				</view>
				<view class="baibens">
					<view>清除缓存</view>
					<view class="nicknames">0.0MB</view>
				</view>
				<view class="bnts">
					<button class="btn" @click="logins">退出登录</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const server = require('../../../utils/server');
	export default {
		data() {
			return {
				image:'',
				name:''
			}
		},
		onShow() {
			let that = this;
			that.image = uni.getStorageSync('image')
			that.name = uni.getStorageSync('name')
		},
		onLoad() {
			uni.getStorageInfo({
			    success: function (res) {
			        console.log(res);
			    }
			});
			let that = this;
			that.image = uni.getStorageSync('image')	
			that.name = uni.getStorageSync('name')
		},
		methods: {
			//退出登录
			logins() {
				uni.removeStorageSync('token');
				uni.getStorageInfo({
				    success: function (res) {
				        console.log(res);
				    }
				});
				uni.redirectTo({
					url: '/pages/index/index'
				});
			},
			updata(){
				uni.chooseImage({
				    success: (chooseImageRes) => {
					   const tempFilePaths = chooseImageRes.tempFilePaths;
				       uni.uploadFile({
				           url: server.apiUrl + '/api/upload/image ', ///api/upload/image 
						   // /user/avatar/modify_avatar?ajax=true
				           filePath: tempFilePaths[0],
				           name: 'userfile',
						   fileType: 'image',
				           formData: {
				               token: uni.getStorageSync('token'),
							   type:'avatar'
				           },
				           success: (res) => {
							   var res=JSON.parse(res.data)
							   this.image=res.avatar;
							   uni.setStorageSync('image',this.image)
				           }
				       });
				    }
				});
			},
			// 修改昵称
			modify_nickname(){
				uni.navigateTo({
					url:'modify_nickname'
				})
			}
		}
	}
</script>

<style>
.back {
		height: 100%;
		width: 100%;
		background: #F5F5F5;
		position: absolute;
		color: #1C0000;
		font-size: 26rpx;
	}
	.set_up_head_portrait{
		height: 126rpx;
		width: 100%;
		background: white;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding:0 36rpx;
		box-sizing: border-box;
		margin-top: 20rpx;
		border-bottom: 1rpx solid #F7F7F7;
	}
	.head_portrait{
		height: 76rpx;
		width: 76rpx;
	}
	.nickname{
		width: 100%;
		background: white;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding:0 36rpx;
		box-sizing: border-box;
		height: 92rpx;
		border-bottom: 1rpx solid #F7F7F7;
	}
	.baiben{
		width: 100%;
		background: white;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding:0 36rpx;
		box-sizing: border-box;
		height: 92rpx;
		border-bottom: 1rpx solid #F7F7F7;
		margin-top: 20rpx;
	}
	.baibens{
		width: 100%;
		background: white;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding:0 36rpx;
		box-sizing: border-box;
		height: 92rpx;
		border-bottom: 1rpx solid #F7F7F7;
	}
	.bnts{
		width: 100%;
		padding:0 36rpx;
		box-sizing: border-box;
		margin-top: 50rpx;
	}
	.btn{
		width: 100%;
		background: #74181B;
		height: 92rpx;
		color: white;
		font-size: 28rpx;
		line-height: 92rpx;
	}
</style>
