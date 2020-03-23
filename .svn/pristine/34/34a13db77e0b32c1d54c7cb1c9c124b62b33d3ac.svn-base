<template>
	<view class="background">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">  
		    <view class="top_view"></view>  
		</view>  
		<!--#endif-->
		<view class="head">
			<view class="heads active_title">
				<navigator class="iconfont icon-left" open-type="navigateBack"></navigator>
				<view class="">{{message}}</view>
				<view></view>
			</view>
		</view>
		<view class="head" v-if="id == 1">
			<view class="heads heads_group">
				<view :class="group_tag==0?'active':''" @click="all">综合</view>
				<view :class="group_tag==1?'active':''" @click="price">价格</view>
				<view :class="group_tag==2?'active':''" @click="screening=true">筛选</view>
			</view>
		</view>
		<view class="head" v-if="id == 2">
			<view class="heads heads_group">
				<view class="panic_buying" :class="kill_tag==1?'kill_active':''" @click="panic_buying()">抢购中</view>
				<view class="coming_soon" :class="kill_tag==2?'kill_active':''" @click="coming_soon()">即将开始</view>
			</view>
		</view>
		<view class="">
			<view class="search-list">
				<view class="commodity" v-for="(goodsList, goodsLists) in goodsList" @click="details(goodsList.id)">
					<image class="commodity-iamge" :src="goodsList.thumb"></image>
					<view class="title-mony">
						<view class="title" v-if="id != 2">{{ goodsList.name }}</view>
						<view class="title" v-if="id == 2">{{ goodsList.title }}</view> 
						<view class="acti">
							<view class="mones">
								<text class="price" v-if="id<3">￥{{ goodsList.price }}</text>
								<view class="score" v-if="id == 3">积分{{ goodsList.score }}</view>
								<text class="originalCost" v-if="id<3">￥{{ goodsList.originalCost }}</text>
							</view>
							<button class="btn" v-if="id == 1">去拼团</button>
							<button class="btn" v-if="id == 2">去抢购</button>
							<button class="btn" v-if="id == 3">去兑换</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="screening" v-show="screening==true"  @click="screening=false">
			<scroll-view class="screen" @click.native.stop scroll-y="true">
				<!-- #ifdef APP-PLUS -->
				<view class="status_bar">
					<view class="top_view"></view>
				</view>
				<!--#endif-->
				<view class="screens">
					<view class="titles" v-for="first in primary_tab">
						<view class="father_title" >{{first.name}}</view>
						<view class="son_title" >
							<view class="son_titles" v-for="second in secondary_tab[first.id]" :class="second.id==secondary_tab_id?'second_active':''"  @click="second_id(second.id)">{{second.name}}</view>
						</view>
					</view>
				</view>
				<view class="btns_quedin">
					<view class="btns_choze">重置</view>
					<view class="quedin" @click="xuanze()">确定</view>
				</view>
			</scroll-view>
		</view>
		<!-- <view v-if="goodsList==''||goodsList==null||goodsList=='null'" class="tan">{{name}}</view> -->
	</view>
</template>

<script>
	const server = require('../../utils/server');
	export default {
		data() {
			return {
				id: 0,
				goodsList: [],
				requireUrl: '/api/group/get_list',
				requireDtae: {
					ajax: 'true',
					span: 15,
					page: 1,
					sort: 0
				},
				sort: 0, //排序规则（0商品id降序，1价格升序，2价格降序，3开团数量升序，4开团数量降序）
				name: '暂无商品',
				page: 1,
				kill_tag:1,//秒杀选项卡
				alls:0,//综合
				data:{},//参数
				message:'活动',
				screening:false,//筛选
				primary_tab: [], //一级选项卡
				secondary_tab:[],//二级选项卡
				secondary_tab_id: 0, //二级选项id
				group_tag:0,//团购选项选中
			};
		},
		onLoad(option) {
			let that = this;
			that.id = option.id;
			uni.showLoading({
				title: '加载中'
			});
			if (option.id == 1) {
				that.message = '团购活动'
				that.requireUrl = '/api/group/get_list';
				that.primary_tab = uni.getStorageSync('first');
				that.secondary_tab = uni.getStorageSync('second');
			} else if (option.id == 2) {
				that.message = '秒杀活动'
				that.requireUrl = '/api/seckill/get_list';
				that.requireDtae.type = 2
			} else if (option.id == 3) {
				that.message = '积分兑换'
				that.requireUrl = '/api/score/get_list';
			}
			server.getJSON(that.requireUrl, that.requireDtae, function(res) {
				if (res.statusCode == 408) {
					that.name = '网络请求超时，请刷新重试';
					uni.hideLoading();
				} else {
					if (res.data.list != null && res.data.list != '' && res.data.list != 'null') {
						that.goodsList = res.data.list;
						uni.hideLoading();
					} else {
						that.name = '暂无数据';
						uni.hideLoading();
					}
				}
			});
		},
		methods: {
			details(activityId) { //活动商品gid  活动id
				let that = this;
				uni.navigateTo({
					url: './active_details?activityId=' + activityId + '&id=' + that.id
				});
			},
			// 综合
			all() {
				uni.showLoading({
					title: '加载中'
				});
				let that = this;
				that.alls = 0;
				that.group_tag =0;//选中效果
				that.sort = 2;//初始化价格升序降序
				that.secondary_tab_id = 0;//清空筛选的条件
				that.goodsList = ''; //清空之前的数据
				server.getJSON(that.requireUrl, that.requireDtae, function(res) {
					if (res.statusCode == 408) {
						that.name = '网络请求超时，请刷新重试';
						uni.hideLoading();
					} else {
						if (res.data.list != null && res.data.list != '' && res.data.list != 'null') {
							that.goodsList = res.data.list;
							uni.hideLoading();
						} else {
							that.name = '暂无数据';
							uni.hideLoading();
						}
					}
				});
			},
			// 价格升序降序
			price() {
				uni.showLoading({
					title: '加载中'
				});
				let that = this;
				that.group_tag =1;//选中效果
				that.alls = 1;
				that.goodsList = ''; //清空之前的数据
				if (that.sort == 1) {
					that.sort = 2;
				} else {
					that.sort = 1;
				}
				let data ={};
				if(that.secondary_tab_id!=0){
					data={
						span: 15,
						page: 1,
						sort: that.sort,
						categoryId:that.secondary_tab_id
					}
				}else{
					data={
						span: 15,
						page: 1,
						sort: that.sort,
					}
				}
				server.getJSON(that.requireUrl,data, res => {
					if (res.statusCode == 408) {
						that.name = '网络请求超时，请刷新重试';
						uni.hideLoading();
					} else {
						if (res.data.list != null && res.data.list != '' && res.data.list != 'null') {
							that.goodsList = res.data.list;
							uni.hideLoading();
						} else {
							that.name = '暂无数据';
							uni.hideLoading();
						}
					}
				});
			},
			//抢购中
			panic_buying(){
				let that = this;
				uni.showLoading({
					title: '加载中'
				});
				that.requireUrl = '/api/seckill/get_list';
				that.requireDtae.type = 2;
				that.kill_tag = 1;
				server.getJSON(that.requireUrl, that.requireDtae, function(res) {
					if (res.statusCode == 408) {
						that.name = '网络请求超时，请刷新重试';
						uni.hideLoading();
					} else {
						if (res.data.list != null && res.data.list != '' && res.data.list != 'null') {
							that.goodsList = res.data.list;
							uni.hideLoading();
						} else {
							that.name = '暂无数据';
							uni.hideLoading();
						}
					}
				});
			},
			// 即将开始
			coming_soon(){
				let that = this;
				uni.showLoading({
					title: '加载中'
				});
				that.requireUrl = '/api/seckill/get_list';
				that.requireDtae.type = 1;
				that.goodsList = '';
				that.kill_tag = 2;
				server.getJSON(that.requireUrl, that.requireDtae, function(res) {
					if (res.statusCode == 408) {
						that.name = '网络请求超时，请刷新重试';
						uni.hideLoading();
					} else {
						if (res.data.list != null && res.data.list != '' && res.data.list != 'null') {
							that.goodsList = res.data.list;
							uni.hideLoading();
						} else {
							that.name = '暂无数据';
							uni.hideLoading();
						}
					}
				});
			},
			// 筛选 子级 标题
			second_id(id){
				let that = this;
				that.secondary_tab_id = id;
			},
			// 筛选 子级 标题
			xuanze(){
				let that = this;
				that.goods = '';
				that.screening = false;
				that.group_tag =2;//选中效果
				server.getJSON(
					that.requireUrl, {
						page: 1,
						span: 15,
						sort: that.sort,
						categoryId:that.secondary_tab_id,
					},
					function(res) {
						that.goodsList = res.data.list;
						uni.hideLoading();
					}
				);
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			let that = this;
			that.goodsList = '';
			that.page = 1;
			if(that.id==1){
				if(that.secondary_tab_id!=0){
					that.data={
						span: 15,
						page: 1,
						sort: that.sort,
						categoryId:that.secondary_tab_id
					}
				}else{
					that.data={
						span: 15,
						page: 1,
						sort: that.sort,
					}
				}
			}else if(that.id==2){ //秒杀
				that.data = {
					span:15,
					page:1,
					type:that.requireDtae.type
				}
			}else if(that.id==3){
				that.data = {
					span:15,
					page:1,
				}
			}
			server.getJSON(
				that.requireUrl,that.data,res=>{
					that.goodsList = res.data.list;
				}
			);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//上拉数据
		onReachBottom() { //触底获取新的商品
			let that = this;
			uni.showLoading({
				title: '加载中'
			});
			that.page += 1;
			if(that.id==1){
				if(that.secondary_tab_id!=0){
					that.data={
						span: 15,
						page: that.page,
						sort: that.sort,
						categoryId:that.secondary_tab_id
					}
				}else{
					that.data={
						span: 15,
						page: that.page,
						sort: that.sort,
					}
				}
			}else if(that.id==2){ //秒杀
				that.data = {
					span:15,
					page:that.page,
					type:that.requireDtae.type
				}
			}else if(that.id==3){
				that.data = {
					span:15,
					page:that.page,
				}
			}
			server.getJSON(
				that.requireUrl,that.data,
				function(res) {
					if (res != null) {
						uni.hideLoading();
						let result = res.data.list;
						if (result.length > 0) {
							for (var i in result) {
								that.goodsList.push(result[i]);
							}
						}
					} else {
						setTimeout(function() {
							uni.hideLoading();
						}, 5000);
					}
				}
			);
		},
	};
</script>

<style>
	.background {
		background: #f5f5f5;
		position: absolute;
		top: 0;
		height: 100%;
		width: 100%;
	}

	/* 团购 */
	.search-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 18rpx 18rpx;
	}

	.commodity {
		width: 350rpx;
		height: auto;
		border-radius: 8rpx;
		background: white;
		margin-bottom: 16rpx;
		display: flex;
		flex-direction: column;
	}

	.commodity-iamge {
		border-radius: 8rpx 8rpx 0 0;
		width: 100%;
		height: 350rpx;

	}

	.title-mony {
		width: 100%;
		height: 160rpx;
		padding: 10rpx 0 0 10rpx;
		box-sizing: border-box;
	}

	.title {
		font-size: 28rpx;
		margin-top: 10rpx;
		margin-bottom: 20rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 300rpx;
	}

	.momey {
		color: #df1821;
		font-weight: 400;
	}

	.acti {
		height: 60rpx;
		width: 100%;
		padding: 0 10rpx 0 0;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.originalCost {
		font-size: 20rpx;
		text-decoration: line-through;
		color: #808080;
	}

	.btn {
		width: 140rpx;
		height: 46rpx;
		border-radius: 30rpx;
		background: white;
		border: 1px solid #DD0812;
		color: #DD0812;
		font-size: 26rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0;
	}

	.price {
		color: #dd0812;
		font-size: 32rpx;
	}

	.scores {
		display: flex;
		padding: 0 10rpx 0 0;
		box-sizing: border-box;
		justify-content: space-between;
		align-items: center;
		height: 60rpx;
	}

	.score {
		color: #dd0812;
		font-size: 20rpx;
	}

	.mones {
		display: flex;
		flex-direction: column;
	}
	.active_title{
		align-items: center;
		justify-content: space-between;
		font-weight: 400;
		font-size: 32rpx;
		padding: 0 20rpx;
		color: white;
		box-sizing: border-box;
		background: linear-gradient(#DD0812,#C2060C);
	}
	.heads_group {
		align-items: center;
		justify-content: space-around;
		font-weight: 400;
		font-size: 32rpx;
		color: #808080;
	}
	/* 秒杀 */
	.kill_active{
		border-bottom:2px solid #DD0812;
		color: #1C0000;
		font-weight: 600;
	}
	.panic_buying{
		font-size: 28rpx;
		padding: 0 20rpx;
	}
	.coming_soon{
		font-size: 28rpx;
		padding: 0 20rpx;
	}
	.screening{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		background: rgba(000,000,000,0.5);
		z-index: 88;
		display: flex;
		justify-content: flex-end;
	}
	.screen{
		width: 644rpx;
		height: 100%;
		background: white;
		padding:30rpx 30rpx 0;
		box-sizing: border-box;
		overflow: scroll;
	}
	.screens{
		margin-bottom: 88rpx;
	}
	.titles{
		font-size: 26rpx;
		color: #1C0000;
		margin-bottom: 20rpx;
	}
	.btns_quedin{
		width: 644rpx;
		position: fixed;
		bottom: 0;
		right: 0;
		height: 88rpx;
		display: flex;
	}
	.btns_choze{
		width: 50%;
		height: 100%;
		background: #E9E9E9;
		color: #808080;
		font-size: 32rpx;
		line-height: 88rpx;
		text-align: center;
	}
	.quedin{
		width: 50%;
		height: 100%;
		background: #74181B;
		color:white;
		font-size: 32rpx;line-height: 88rpx;
		text-align: center;
	}
	.father_title{
		font-size: 28rpx;
		margin-bottom: 10rpx;
	}
	.son_title{
		display: flex;
		width: 100%;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.son_titles{
		width: 188rpx;
		height: 60rpx;
		border-radius: 40rpx;
		background: #F5F5F5;
		line-height: 60rpx;
		text-align: center;
		margin: 16rpx 0;
	}
	.second_active{
		background: #E4D1D2;
	}
	.good_title {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 100%;
		color: #1C0000;
	}
	
	.good_price {
		font-size: 26rpx;
	}
	
	.active{
		color: #74181B;
	}
</style>
