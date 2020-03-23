<template>
	<view>
		<view class="back">
			<view class="comment_good">
				<view class="goods_news">
					<view class="goods">
						<image class="goods_image" :src="goods.thumb"></image>
						<view class="goods_title" >{{goods.name}}</view>
					</view>
					<view class="score">
						<text class="scores">评分</text><sx-rate  @change="onChange" :active-color="color.active"/><text class="praise">{{message}}</text>
					</view>
				</view>
				<view class="score_inputs">
					<textarea class="score_in" v-model="score_content" placeholder="亲,您对这个商品满意吗? 说说它的优点和美中不足的地方吧" maxlength='100'></textarea>
					<view class="coment_image">
						<image class="comment_image" :src="images" v-if="image!=''" v-for="images in image"></image>
						<view class="add_image" @click="add_images()">添加图片</view>
					</view>
				</view>
				<button class="submit" @click="submit">提交评价</button>
			</view>
		</view>
	</view>
</template>

<script>
	import SxRate from '@/components/sx-rate';
	const server = require('../../../utils/server')
	export default {
		data() {
			return {
				rate: 0, //
				color: {
					default: '#ccc',
					active: '#74181B'
				},
				message:'',
				image:[],//上传图片
				score_content:'',//评价内容
				order_id:0,//订单id
				goods:{},//商品信息
			}
		},
		components: {
			SxRate
		},
		onLoad(option) {
			let that = this;
			that.order_id = option.id;
			that.goods = uni.getStorageSync('good');
		},
		methods: {
			// 评分
			onChange(e){
				this.rateSync = e;
				if(e==1){
					this.message = '非常差'
				}else if(e==2){
					this.message = '差'
				}else if(e==3){
					this.message = '一般'
				}else if(e==4){
					this.message = '好'
				}else if(e==5){
					this.message = '非常好'
				}else{
					this.message = ''
				}
			},
			// 上传图片
			add_images(){
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
							   type:'comment'
				           },
				           success: (res) => {
								const strToObj = JSON.parse(res.data);
								that.image.push(strToObj.images_url)
				           }
				       });
				    }
				});
			},
			submit(){
				let that = this;
				server.postJSON('/user/order/comment?ajax=true',{
					token:uni.getStorageSync('token'),
					id:that.order_id,
					content:that.score_content,
					grade:that.rate,
					image:that.image
				},res=>{
					if(res.data.code==1){
						uni.redirectTo({
							url:'appraise_success'
						})
					}
				})
			}
		}
	}
</script>

<style>
.comment_good{
	width: 100%;
	background: #F5F5F5;
}
.goods_news{
	width: 100%;
	display: flex;
	flex-direction: column;
	height: 230rpx;
	background: white;
	margin-top: 1px;
	padding: 30rpx;
	box-sizing: border-box;
	justify-content: space-between;
}
.goods{
	display: flex;
}

.goods_image{
	width: 100rpx;
	height: 100rpx;
	margin-right: 20rpx;
}
.goods_title{
	color: #1C0000;
	font-size: 30rpx;
	-webkit-line-clamp: 2;
	display: -webkit-box;
	word-wrap: break-word;
	word-break: normal;
	text-overflow: ellipsis;
	-webkit-box-orient: vertical;
	overflow: hidden;
	width:600rpx;
}
.score{
	display:flex;
	align-items: center;
}
.scores{
	color: #1C0000;
	font-size: 34rpx;
	margin-right: 20rpx;
}
.praise{
	color: #C3C3C3;
	font-size: 28rpx;
	margin-left: 20rpx;
}

.score_inputs{
	width: 100%;
	display: flex;
	flex-direction: column;
	background: white;
	padding: 30rpx;
	box-sizing: border-box;
	border-top: 1px solid #F9F9F9;

}
.score_in{
	width: 100%;
	color: #C3C3C3;
	font-size: 30rpx;
}
.coment_image{
	display: flex;
}
.comment_image{
	width: 161rpx;
	height: 161rpx;
}
.add_image{
	background:url(../../../static/add_image.png) no-repeat;
	width: 161rpx;
	height: 161rpx;
	background-size:cover ;
	color: #C3C3C3;
	font-size: 26rpx;
	padding: 20rpx;
	box-sizing: border-box;
	line-height: 190rpx;
	text-align: center;
}
.submit{
	background: #74181B;
	color: #FFFFFF;
	font-size: 30rpx;
	height: 88rpx;
	line-height: 88rpx;
	width: 702rpx;
	margin-top: 60rpx;
}
</style>
