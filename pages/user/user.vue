<template>
	<view @touchstart="start" @touchend="end">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">  
		    <view class="top_view"></view>  
		</view>  
		<!--#endif-->
		<view class="bottoms">
			<view class="setting" @click="set()"><text class="iconfont icon-shezhi"></text></view>
			<view class="usermessage" v-show="showState">
				<view class="usermessage-img"><image :src="goods.avatar"></image></view>
				<view class="usermessage-user">
					<view class="user-name">{{ goods.userName }}</view>
					<view class="user-level">
						<view class="user-level-img"><image src="../../static/order/member.png"></image></view>
						<view class="user-level-writing"><text>普通会员</text></view>
					</view>
				</view>
			</view>
			<view class="user-card">
				<view class="usercard-bottom">
					<view class="usercard-bottom-item" @click="showRedPaper()">
						<view class="item-top">
							<text>{{ goods.redPaperCount }}</text>
						</view>
						<view class="item-bottom"><text>红包</text></view>
					</view>
					<block><view class="line"></view></block>
					<view class="usercard-bottom-item" @click="showScore()">
						<view class="item-top">
							<text>{{ goods.score }}</text>
						</view>
						<view class="item-bottom"><text>积分</text></view>
					</view>
					<block><view class="line"></view></block>
					<view class="usercard-bottom-item" @click="showMoney()">
						<view class="item-top"><text>0</text></view>
						<view class="item-bottom"><text>余额</text></view>
					</view>
				</view>
			</view>
			<view class="member" @click="gomember()">
				<view class="member-title">
					<view class="member-titleimg"><image src="../../static/order/members.png"></image></view>
					<view>会员中心</view>
				</view>
				<view class="member-line"></view>
				<view class="member-word">
					<p>享会员最高立减100元</p>
					<p>更有超值好礼最多立省八万元</p>
				</view>
				<view class="member-right"><image src="../../static/order/user-right.png"></image></view>
			</view>
			<view class="nav-div">
				<view class="nav-font-con" @click="allorder(1)">
					<image src="../../static/order/all.png" class="nav-con"></image>
					<view class="nav-font"><text>全部订单</text></view>
				</view>
				<view class="nav-font-con" @click="allorder(2)">
					<image src="../../static/order/pay.png" class="nav-con"></image>
					<view class="nav-font"><text>待付款</text></view>
				</view>
				<view class="nav-font-con" @click="allorder(3)">
					<image src="../../static/order/address.png" class="nav-con"></image>
					<view class="nav-font"><text>待收货</text></view>
				</view>
				<view class="nav-font-con" @click="shoho()">
					<image src="../../static/order/shoho.png" class="nav-cons"></image>
					<view class="nav-font"><text>退款/售后</text></view>
				</view>
				<view class="nav-font-con" @click="allorder(4)">
					<image src="../../static/order/comment.png" class="nav-con"></image>
					<view class="nav-font"><text>待评价</text></view>
				</view>
			</view>
			<view class="pintuan">
				<view class="pintuancontent" @click="goGroup()">
					<view class="contentitle">
						<view><text>我的拼团</text></view>
						<view><image src="../../static/left.png"></image></view>
					</view>
					<swiper vertical="true" autoplay="true" circular="true" interval="3000" style="height: 80rpx;" v-if="group_list!=null">
						<swiper-item class="content" v-for="group in group_list">
							<view class="pintuantu"><image :src="group.thumb"></image></view>
							<view>
								<view class="part"><image src="../../static/group/pintuan.png"></image>我参与的拼团</view>
								<view class="contentzi">还差{{group.goodsNum-group.joinNum}}人拼团成功，邀请好友参加拼团更快哦~</view>
							</view>
						</swiper-item>	
					</swiper>
					<view class="content" style="text-align: center;" v-else>
						<text class="contentzi">你还没有参与任何拼团，快去发起拼团吧~</text>
					</view>
				</view>
			</view>
			<view class="culomnline"></view>
			<view class="list">
				<view title="地址管理" @click="goAddress()" class="list-one">
					<view><text>地址管理</text></view>
					<view><image src="../../static/left.png"></image></view>
				</view>
				<view title="分享中心" @click="goShare()" class="list-one">
					<view><text>分享中心</text></view>
					<view><image src="../../static/left.png"></image></view>
				</view>
				<view title="关于" @click="goAbout()" class="list-one">
					<view><text>关于</text></view>
					<view><image src="../../static/left.png"></image></view>
				</view>
			</view>
			<view class="text-area" >
			
			</view>
		</view>
		<bottomtabbar tags="5"></bottomtabbar>
	</view>
</template>

<script>
import bottomtabbar from 'pages/bottomtabbar/bottomtabbar';
const server = require('../../utils/server');

export default {
	data() {
		return {
			showState: true,
			tag: 0,
			goods: {},
			group_list:[],//团购订单列表
		};
	},
	components: {
		bottomtabbar,
		
	},
	onShow() {
		let token = uni.getStorageSync('token');
		let that = this;
		server.postJSON(
			'/api/user/home_index',
			{
				token: token
			},
			res => {
				that.goods = res.data.result;
				uni.setStorageSync('name',that.goods.name)
				uni.setStorageSync('image',that.goods.avatar)
			}
		);
	},
	onLoad() {
		let that = this;
		console.log(uni.getStorageSync('token'))
		server.postJSON(
			'/api/user/home_index',
			{
				token: uni.getStorageSync('token')
			},
			res => {
				console.log(res)
				that.goods = res.data.result;
				uni.setStorageSync('name',that.goods.name)
				uni.setStorageSync('image',that.goods.avatar)
			}
		);
		server.postJSON('/group/group_initiate?ajax=true', {
			page: 1,
			span: 15,
			token: uni.getStorageSync('token'),
			activity:1,
		}, res => {
			that.group_list = res.data.list;
			uni.hideLoading();
		})
	},
	methods: {
		gomember() {
			uni.navigateTo({
				url: '../benefits/vip_center'
			});
		},
		goGroup() {
			uni.navigateTo({
				url: './group_list/group_list'
			});
		},
		goShare(){
			uni.navigateTo({
				url: '../share/share'
			});
		},
		// 全部订单
		allorder(orderid){ //1 全部订单  2待付款  3 待收货  4待评价
			uni.navigateTo({
				url:'./allorders/allorders?orderid='+orderid
			})
		},
		//售后
		shoho(){
			uni.navigateTo({
				url:'./shoho/shoho'
			})
		},
		//地址管理
		goAddress(){
			uni.navigateTo({
				url:'./address/address_list?id=0'
			})
		},
		// 积分
		showScore(){
			uni.navigateTo({
				url:'./integral/integral'
			})
		},
		// 余额
		showMoney(){
			uni.navigateTo({
				url:'./balance/balance'
			})
		},
		// 红包列表
		showRedPaper(){
			uni.navigateTo({
				url:'./redPaper/redPaper'
			})
		},
		// 关于
		goAbout(){
			uni.navigateTo({
				url:'./about/about'
			})
		},
		goAbouts(){
			uni.navigateTo({
				url:'../lbt/lbt'
			})
		},
		// 设置
		set(){
			uni.navigateTo({
				url:'./set_up/set_up'
			})
		},
		start(e){
		   // e.changedTouches[0].clientX;
		   // e.changedTouches[0].clientY;
		   
		},
		end(e){
		    
		    // const subX=e.changedTouches[0].clientX-this.startData.clientX;
		    // const subY=e.changedTouches[0].clientY - this.startData.clientY;
		    // if(subY>50 || subY<-50){
		    //     console.log('上下滑')
		    // }else{
		    //     if(subX>100){
		    //         console.log('右滑')
		    //     }else if(subX<-100){
		    //         console.log('左滑')
		    //     }else{
		    //         console.log('无效')
		    //     }
		    // }
		}
	}
};
</script>

<style>
/* 设置 */
.setting {
	height: 40rpx;
	width: 100%;
	margin: 20rpx 0;
	text-align: right;
	padding: 0 30rpx;
	box-sizing: border-box;
	font-size: 36rpx;
}

.setting image {
	width: 40rpx;
	height: 40rpx;
}

/* 用户头像 */
.usermessage {
	align-items: center;
	margin: 20rpx 30rpx;
	width: 690rpx;
	height: 150rpx;
	display: flex;
	justify-content: flex-start;
}

.usermessage-img image {
	width: 120rpx;
	height: 120rpx;
}

.usermessage-user {
	align-items: center;
	margin-left: 20rpx;
	font-size: 28rpx;
}

.user-level {
	margin-top: 20rpx;
	position: relative;
}

.user-level-img image {
	position: absolute;
	top: -3px;
	left: -2px;
	width: 45rpx;
	height: 45rpx;
}

.user-level-writing {
	/* align-items: center; */
	text-align: right;
	padding-right: 20rpx;
	width: 140rpx;
	height: 36rpx;
	background: #1c0000;
	font-size: 20rpx;
	line-height: 36rpx;
	border-radius: 40rpx;
	color: #fbe7c4;
}

.user-card {
	margin: 0 auto;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-content: center;
	height: 100rpx;
	border-radius: 15rpx;
	justify-content: space-between;
	/* background: linear-gradient(45deg, #ffff00, #f0ad4e); */
}

.usercard-bottom {
	width: 100%;
	height: 200rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}

.usercard-bottom-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 25%;
}

.item-top text {
	font-size: 31rpx;
	text-align: center;
	color: #5b441a;
}

.item-bottom text {
	font-size: 25rpx;
	text-align: center;
	color: #5b441a;
}

.line {
	height: 50rpx;
	width: 3rpx;
	margin: 0 20rpx;
	background-color: rgba(0, 0, 0, 0.2);
}

/* 会员中心 */
.member {
	display: flex;
	text-align: center;
	align-items: center;
	margin: 10rpx 20rpx;
	width: 710rpx;
	height: 120rpx;
	border-radius: 20rpx 20rpx 0rpx 0;
	background: #fbe7c4;
	font-size: 26rpx;
}

.member-title {
	display: flex;
	flex-direction: column;
	width: 160rpx;
}

.member-title image {
	width: 40rpx;
	height: 40rpx;
}

.member-line {
	width: 1rpx;
	height: 70rpx;
	background: #c8c7cc;
}

.member-word {
	padding-left: 30rpx;
	text-align: left;
	width: 380rpx;
}

.member-right {
	width: 100rpx;
	text-align: right;
}

.member-right image {
	width: 40rpx;
	height: 40rpx;
}

/* 订单分类 */
.nav-div {
	font-size: 26rpx;
	display: flex;
	width: 100%;
	justify-content: space-around;
	height: 50rpx;
	background: white;
	/* margin-bottom: 20rpx; */
	height: 140rpx;
	align-items: center;
}

.nav-con {
	text-align: center;
	align-items: center;
	height: 50rpx;
	width: 56rpx;
}
.nav-cons{
	text-align: center;
	align-items: center;
	height: 50rpx;
	width: 65rpx;
}

.nav-font-con {
	color: #4A4A4A;
	text-align: center;
}
.nav-font{
	margin-top: 10rpx;
}
.pintuan{
	margin-top: 20rpx;
	width: 718rpx;
	height: 186rpx;
	padding: 0rpx 16rpx;
}
.pintuancontent{
	height: 150rpx;
	font-size: 28rpx;
	background: #F5F5F5;
	border-radius: 8rpx;
	padding: 0 20rpx;
}
.contentitle{
	display: flex;
	line-height: 70rpx;
	justify-content: space-between;
	
}
.contentitle image{
	width: 12rpx;
	height: 20rpx;
}
.content{
	display: flex;
	font-size: 26rpx;
	color: #DD0812;
}
.pintuantu{
	width: 66rpx;
	height: 66rpx;
	border-radius: 8rpx;
	background: #130000;
	margin-right: 16rpx;
}
.pintuantu image{
	width: 66rpx;
	height: 66rpx;
	border-radius: 8rpx;
}
.part{
	
}
.part image{
	width: 26rpx;
	height: 22rpx;
	padding-right: 6rpx;
}
.contentzi{
	color: #808080;
	font-size: 24rpx;
}
.culomnline {
	width: 100%;
	height: 20rpx;
	background: #f8f6fc;
}

/* 下方列表 */
.list {
	margin: 0 30rpx;
	width: 690rpx;
	height: auto;
	font-size: 28rpx;
}

.list-one {
	width: 690rpx;
	height: 100rpx;
	border-bottom: 1px solid #ebeef5;
	align-items: center;
	display: flex;
	justify-content: space-between;
}

.list-one image {
	width: 18rpx;
	height: 30rpx;
}
</style>
