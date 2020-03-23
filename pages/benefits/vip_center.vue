<template>
	<view>
		<view class="bakcs"></view>
		<view class="back">
			<view class="vip">
				<view class="news">
					<view class="head_image">
						<image class="news_image" src="../../static/user_image.png"></image>
						<view class="new_php">
							<view>1*********4</view>
							<view class="sign_image">
								<image src="../../static/order/member.png" class="icon_image"></image>
								<view class="sign">普通会员</view>
							</view>
						</view>
					</view>
					<view class="vip_btn" @click="vip_btn">立即开通</view>
				</view>
				<view class="vip_interests_title">
					<view class="vip_hr"></view>
					<view class="">会员权益</view>
					<view class="vip_hr"></view>
				</view>
			</view>
			<view class="member_class">
				<view class="ordinary_vip" :class="tag==1?'actives':''" @click="tag=1">
					<image class="vip_sign"  src="../../static/ordinary.png"></image>
					<view class="price_vip"><text class="memey">￥</text>0</view>
					<view>普通会员</view>
				</view>
				<view class="gold_vip" :class="tag==2?'actives':''" @click="tag=2">
					<image class="vip_sign" src="../../static/gold.png"></image>
					<view class="price_vip"><text class="memey">￥</text>268</view>
					<view>黄金会员</view>
				</view>
				<view class="platinum_vip" :class="tag==3?'actives':''" @click="tag=3">
					<image class="vip_sign" src="../../static/platinum.png"></image>
					<view class="price_vip"><text class="memey">￥</text>568</view>
					<view class="vip_member">铂金会员</view>
				</view>
				<view class="diamonds_vip" :class="tag==4?'actives':''" @click="tag=4">
					<image class="vip_sign" src="../../static/diamonds.png"></image>
					<view class="price_vip"><text class="memey">￥</text>1680</view>
					<view>钻石会员</view>
				</view>
			</view>
			<view class="interests">
				<view class="interests_vip">
					<view class="intere">
						<image src="../../static/benefits/ticket.png" v-if="tag>1" class="interests_image"></image>
						<image src="../../static/vip/vip2_1.png" v-if="tag==1" class="interests_image"></image>
						<view>景区门票</view>
					</view>
					<view class="intere">
						<image src="../../static/benefits/birthday.png" v-if="tag>1" class="interests_image"></image>
						<image src="../../static/vip/vip2_2.png" v-if="tag==1" class="interests_image"></image>
						<view>生日礼物</view>
					</view>
					<view class="intere">
						<image src="../../static/benefits/ceremony.png" v-if="tag>1" class="interests_image"></image>
						<image src="../../static/vip/vip2_3.png" v-if="tag==1" class="interests_image"></image>
						<view>开光祈福法会</view>
					</view>
					<view class="intere">
						<image src="../../static/benefits/kefu.png" v-if="tag>1" class="interests_image"></image>
						<image src="../../static/vip/vip2_4.png" v-if="tag==1" class="interests_image"></image>
						<view>专属客服</view>
					</view>
					<view class="intere">
						<image src="../../static/benefits/rebate.png" v-if="tag>1" class="interests_image"></image>
						<image src="../../static/vip/vip2_5.png" v-if="tag==1" class="interests_image"></image>
						<view>邀请返利</view>
					</view>
					<view class="intere">
						<image src="../../static/benefits/auction.png" v-if="tag>1" class="interests_image"></image>
						<image src="../../static/vip/vip2_6.png" v-if="tag==1" class="interests_image"></image>
						<view>拍卖免保证金</view>
					</view>
					<view class="intere">
						<image src="../../static/vip/vip1_7.png" v-if="tag>2" class="interests_image"></image>
						<image src="../../static/vip/vip2_7.png" v-if="tag<=2" class="interests_image"></image>
						<view>红包</view>
					</view>
					<view class="intere">
						<image src="../../static/vip/vip1_8.png" v-if="tag>2" class="interests_image"></image>
						<image src="../../static/vip/vip2_8.png" v-if="tag<=2" class="interests_image"></image>
						<view>购物打折</view>
					</view>
				</view>
				<view class="interests-btn" @click="interests">
					查看全部
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tag:1,
			}
		},
		methods: {
			// 会员中心
			vip_btn(){
				uni.navigateTo({
					url:'../paymember/paymember'
				})
			},
			// 会员权益
			interests(){
				uni.navigateTo({
					url:'./vip_interests'
				})
			}
		}
	}
</script>

<style>
.back{
	background: #1C0000;
	width: 100%;
	height: 100%;
	position: absolute;
	padding:0 30rpx;
	box-sizing: border-box;
}
.bakcs{
	background: white;
	width: 100%;
	height: 500rpx;
	position: absolute;
	z-index: 1;
	bottom: 0;
}
.vip{
	width:100%;
	height:228rpx;
	margin-top: 60rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.news{
	width: 100%;
	height: 140rpx;
	background-image: linear-gradient(#F2DFB4, #F2D7A2);
	display: flex;
	padding: 0 30rpx;
	box-sizing: border-box;
	justify-content: space-between;
	align-items: center;
	border-radius: 16rpx;
}
.head_image{
	display: flex;
	align-items: center;
}
.news_image{
	width: 76rpx;
	height: 76rpx;
}
.new_php{
	margin-left: 20rpx;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.icon_image{
	width: 38rpx;
	height: 38rpx;
	position: absolute;
	left:0rpx;
}
.sign_image{
	display: flex;
	align-items: center;
	position: relative;
}
.sign{
	width:120rpx;
	height: 32rpx;
	line-height: 32rpx;
	background: #1C0000;
	color: #F2DBAB;
	font-size: 20rpx;
	border-radius: 15rpx;
	text-align: right;
	padding-right: 16rpx;
	margin-left: 20rpx;
}
.vip_btn{
	background-image: linear-gradient(#463821, #1D0101);
	color: #F3D087;
	font-size: 26rpx;
	width: 168rpx;
	height: 60rpx;
	border-radius: 30rpx;
	line-height: 60rpx;
	text-align: center;
}

.vip_interests_title{
	display: flex;
	color: #F3D087;
	font-size: 28rpx;
	align-items: center;
	justify-content: space-around;
	padding: 0 20rpx;
	box-sizing: border-box;
}
.vip_hr{
	border: 1px solid #65472E;
	width: 200rpx;
}
.member_class{
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-top: 100rpx;
}
.ordinary_vip{
	width: 168rpx;
	height: 127rpx;
	background-image: linear-gradient(#E4D9C8, #928970);
	border-radius: 10rpx;
	position: relative;
	font-size: 24rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: #463821;
}
.gold_vip{
	width: 168rpx;
	height: 127rpx;
	background-image: linear-gradient(#F2E7DB, #D8C597);
	border-radius: 10rpx;
	position: relative;
	display: flex;
	flex-direction: column;
	font-size: 22rpx;
	color: #463821;
	justify-content: center;
	align-items: center;
}
.platinum_vip{
	width: 168rpx;
	height: 127rpx;
	background-image: linear-gradient(#FAFAFC, #C5C5C5);
	border-radius: 10rpx;
	position: relative;
	font-size: 24rpx;
	display: flex;
	flex-direction: column;
	color: #463821;
	justify-content: center;
	align-items: center;
	
	
}
.diamonds_vip{
	width: 168rpx;
	color: #463821;
	height: 127rpx;
	justify-content: center;
	background-image: linear-gradient(#DFE2E6, #A7B0C1);
	border-radius: 10rpx;
	position: relative;
	font-size: 24rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.vip_sign{
	width: 84rpx;
	height: 84rpx;
	position: absolute;
	top: -40rpx;
	left: 40rpx;
}
.memey{
	font-size: 20rpx;
	margin-left: -10rpx;
}
.price_vip{
	font-size: 28rpx;
}
.vip_member{
	margin-top: 6rpx;
}

.actives{
	transform:scale(1.3);
	transition:0.5s;
	z-index: 50;
}
.interests_vip{
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 30rpx 0rpx;
	box-sizing: border-box;
}
.intere{
	flex: 25%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: #463821;
	font-size: 24rpx;
	margin-bottom: 40rpx;
}
.interests_image{
	width: 84rpx;
	height: 84rpx;
	margin:0  30rpx;
}
.interests{
	width: 100%;
	height: 456rpx;
	background: white;
	margin-top: 60rpx;
	position: relative;
	border-radius: 10rpx;
	z-index: 2;
}
.interests-btn{
	width: 100%;
	height: 92rpx;
	background: #F2DCAF;
	color: #463821;
	font-size: 28rpx;
	line-height: 92rpx;
	text-align: center;
	position: absolute;
	bottom: 0;
	border-radius: 10rpx;
}
</style>
