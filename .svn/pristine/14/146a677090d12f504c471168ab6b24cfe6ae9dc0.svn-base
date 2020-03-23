<template>
	<view>
		<view class="refund-cause">
			<!-- 提示弹出 -->
			<view class="tan" v-show="tan">
				<text>{{message}}</text>
			</view>
			<view class="refund-title">请选择退款理由</view>
			<radio-group class="refund-list" @change="tuikuai">
				<view class="cause">
					<view class="left">七天无理由退换货</view>
					<view class="right">
						<radio  value="7天无理由退换货" color="#74181B" style="transform: scale(0.8);" />
					</view>
				</view>
				<view class="line"></view>
				<view class="cause" >
					<view class="left">商品描述不符</view>
					<view class="right">
						<radio  value="商品描述不符" color="#74181B" style="transform: scale(0.8);" />
					</view>
				</view>
				<view class="line"></view>
				<view class="cause" >
					<view class="left">质量问题</view>
					<view class="right">
						<radio  color="#74181B" value="质量问题" style="transform: scale(0.8);" />
					</view>
				</view>
			</radio-group>
		</view>
		<view class="refund-type">
			<view class="refund-title">请选择退款理由</view>
			<radio-group class="refund-list" @change="tuikuais">
				<view class="cause" >
					<view class="left">退货退款</view>
					<view class="right">
						<radio  color="#74181B"  value="1" style="transform: scale(0.8);" />
					</view>
				</view>
				<view class="line"></view>
				<view class="cause" >
					<view class="left">换货</view>
					<view class="right">
						<radio color="#74181B"  value="2" style="transform: scale(0.8);" />
					</view>
				</view>
				<view class="line"></view>
				<view class="cause" >
					<view class="left">退款</view>
					<view class="right">
						<radio  color="#74181B" value="3" style="transform: scale(0.8);" />
					</view>
				</view>
			</radio-group>
		</view>
		<view class="upimage">
			<view class="refund-title">请上传图片（最多5张）</view>
			<view class="loadimages">
				<view v-for="(item, index) in images" :key="index" class="loadimage">
					<image class="loadimg" :src="item"></image>
				</view>
				<view class="refund-image" @click="choose">
					<view class="refund-images">+</view>
				</view>
			</view>
		</view>
		<view class="refund-foot" @click="submit()"><text>点击提交</text></view>
	</view>
</template>


<script>
	const server = require('../../../utils/server')
	export default {
		data() {
			return {
				images: [],
				orderId: '',
				gid: 0,
				cause: '',
				type: 1,
				tan:false,
				message:''
			}
		},
		onLoad(option) {
			this.orderId = option.id;//orderid订单id
			this.gid = option.gid;// gid 商品id
		},
		methods: {
			// 退货理由
			tuikuai(e){
				this.cause = e.detail.value;
			},
			// 退货方式
			tuikuais(e){
				this.type = e.detail.value;
			},
			choose(){
				let that = this;
				uni.chooseImage({
				    success: (chooseImageRes) => {
					   const tempFilePaths = chooseImageRes.tempFilePaths;
				       uni.uploadFile({
				           url: server.apiUrl + '/api/upload/image', 
				           filePath: tempFilePaths[0],
				           name: 'userfile',
						   fileType: 'image',
				           formData: {
				               token: uni.getStorageSync('token'),
							   type:'returned'
				           },
				           success: (res) => {
								const strToObj = JSON.parse(res.data);
								that.images.push(strToObj.images_url)
				           }
				       });
				    }
				});
			},
			//退货
			submit(){
				uni.showLoading({
					title: '加载中'
				});
				let that = this;
				server.postJSON('/user/order/returned_purchase',{
					orderId:that.orderId,
					gid:that.gid,
					cause:that.cause,
					type:that.type,
					images:that.images,
					token:uni.getStorageSync('token')
				},res=>{
					that.message = res.data.message;
					uni.hideLoading();
					that.tan = true;
					if(res.data.code == 1){
						setTimeout(function(){
							uni.navigateBack({
								delta:1
							})
						},1000)	
					}else{
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
	.refund-cause {
		border-top: 1px solid #F5F5F5;
		width: 100%;
		height: auto;
		background: #FFFFFF;
		margin-bottom: 16rpx;
	}

	.refund-type {
		border-top: 1px solid #F5F5F5;
		width: 100%;
		height: auto;
		background: #FFFFFF;
		margin-bottom: 16rpx;
	}

	.cause {
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;
		height: 88rpx;
	}

	.line {
		width: 100%;
		height: 1px;
		background: #F5F5F5;
	}

	.refund-title {
		padding: 0 30rpx;
		line-height: 90rpx;
		align-items: center;
		font-size: 30rpx;
	}
	.refund-foot {
		position: fixed;
		bottom: 0rpx;
		width: 100%;
		height: 90rpx;
		display: block;
		text-align: center;
		background: #74181b;
		color: white;
		font-size: 28rpx;
	}

	.refund-foot text {
		line-height: 90rpx;
	}

	.radio {
		padding: 0rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		/* color:"red"; */
	}
	.upimage{
		width: 100%;
		height: auto;
		background: #FFFFFF;
		padding-bottom: 20rpx;
		margin-bottom: 60rpx;
	}
	.refund-image {
		width: 200rpx;
		height: 200rpx;
		border: 2px dashed #F5F5F5;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 30rpx;
	}
	.loadimage {
		width: 200rpx;
		height: 200rpx;
		margin-left: 30rpx;
		margin-bottom: 20rpx;
	}

	.loadimg {
		width: 200rpx;
		height: 200rpx;
		margin-bottom: 20rpx;
	}

	.refund-images {
		font-size: 70rpx;
		align-items: center;
		display: flex;
		justify-content: center;
	}

	.loadimages {
		margin: 10rpx 0;
		display: flex;
		flex-wrap: wrap;
	}
</style>
