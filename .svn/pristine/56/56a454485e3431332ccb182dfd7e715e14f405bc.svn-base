<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!--#endif-->
		<view class="back">
			<!-- 提示弹窗 -->
			<view class="tan" v-show="tan==true">
				<text>{{message}}</text>
			</view>
			<!-- 自定义导航栏 -->
			<view class="head">
				<view class="heads" >
					<view @click="returns()"><text class="iconfont icon-left"></text></view>
					<view @click="title_exhibit=true">
					{{titles}} 
					<text class="iconfont icon-sanjiao sanjiaos"></text></view>
					<view></view>
				</view>
			</view>
			<!-- 总分类 -->
			<view class="class_fy" v-show="title_exhibit==true" @click="title_exhibit=false">
				<view class="class_fy_title">
					<view v-for="firsts in first" :class="fids==firsts.id?'title_active':'title'" @click="class_goods(firsts.id)">{{firsts.name}}</view>
				</view>
			</view>
			<view class="tasb">
				<view class="tab">
					<view :class="tab==1?'act':'tabs'" @click="bidding()">竞价</view>
					<view :class="tab==2?'act':'tabs'" @click="direct_purchase()">直购</view>
				</view>
			</view>
			<view class="tabbar" v-show="tab==2">
				<view class="tabbars">
					<view :class="choose==1?'screeningactive':'screening'" @click="all()">综合</view>
					<view :class="choose==2?'screeningactive':'screening'" @click="price_screening()" v-show="tab==2">价格</view>
					<view :class="choose==3?'screeningactive':'screening'" @click="screening = true" v-show="tab==2">筛选</view>
				</view>
			</view>
			<view class="tasb" v-show="options_title!=''|| price_range!=''">
				<view class="tasbs">
					<view class="options" v-show="options_title!=''">{{options_title}}</view>
					<view class="options" v-show="lowest_price!=''">{{lowest_price}}-{{highest_price}}</view>
				</view>
			</view>
			<view class="wu" v-if="goods==null">暂无商品</view>
			<view class="goods">
				<view class="goods_news" v-for="good in goods" @click="del(good.gid,good.id)">
					<image class="goods_image" :src="good.thumb"></image>
					<view class="goods_title">{{good.title}}</view>
					<view class="goods_price" v-if="tab==2">￥{{good.price}}</view>
					<view class="goods_price" v-if="tab==1">当前￥{{good.currentPrice}}</view>
				</view>
			</view>
			<!-- 筛选 -->
			<view class="screening_spring" :animation="animationData" v-show="screening==true" @click="screening=false">
				<view class="screen_spring" @click.native.stop>
					<view class="all">
						<view>
							<view>全部类目</view>
						</view>
						<view class="option_all">
							<view v-for="seconds in seconds" :class="seconds.id==categoryId?'option_active':'option'" @click="secon(seconds.id)">{{seconds.name}}</view>
						</view>
					</view>
					<view class="price">
						<view>
							<view>价格区间</view>
						</view>
						<view class="price_all">
							<view class="highest_price">
								<input type="number" v-model="lowest_price" class="highest_prices" placeholder="最低价">
							</view>
							<view class="pre">—</view>
							<view class="highest_price">
								<input type="number" v-model="highest_price" class="highest_prices" placeholder="最高价">
							</view>
						</view>
					</view>
					<view class="btbs">
						<view class="btn-screen">
							<view class="reset_btn">重置</view>
							<view class="are_btn" @click="screen">确定</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const server = require('../../utils/server');
	export default {
		data() {
			return {
				choose:1,
				tab: 2,
				page: 1,
				goods: [], //商品列表
				categoryId: 0, //子级分类id
				screening: false,
				fids: 0, //父级分类id
				first: [], //父级列表
				second: [], //子级列表
				seconds: [], //符合当前页面的标题
				titles: '翡翠', //标题
				title_exhibit: false, //分类名称状态
				options_title: '', //筛选条件的名称
				highest_price: '', //最高价
				lowest_price: '', //最低价
				price_range: '', //价格区间
				tan: false, //提示信息状态
				message: '', //提示内容
				animationData: {},
				sort: 0, //0商品gid降序排序，1价格升序排序，2价格降序排序，3销量升序排序，4销量降序排序
			}
		},
		onLoad(option) {
			uni.showLoading({
				title: '加载中'
			});
			let that = this;
			that.tab = option.tab;
			if(option.tab==null||option.tab==undefined||that.tab==''){
				that.tab=2;
			}
			that.first = uni.getStorageSync('first'); //父级列表
			that.second = uni.getStorageSync('second'); //子级列表
			that.categoryId = option.categoryId; //子级分类id
			that.fids = option.fid; //父级分类id
			for (var i in that.first) {
				if (that.fids == that.first[i].id) {
					that.titles = that.first[i].name;
					Object.keys(that.second).forEach(function(key) {
						if (key == that.first[i].id) {
							that.seconds = that.second[key];
						}
					});
				}
			}
			if (that.categoryId == undefined || that.categoryId == '' || that.categoryId == null) {
				let url = '';
				if(that.tab!=2){
					url='/api/auction/get_list'
				}else{
					url='/api/goods/get'
				}
				server.getJSON(url,{
					categoryId: that.fids,
					span: 15,
					page: 1,
					sort: 0,
				}, res => {
					that.goods = res.data.list;
					uni.hideLoading();
				})
			} else {
				for (var i in that.seconds) {
					if (that.categoryId == that.seconds[i].id) {
						that.options_title = that.seconds[i].name;
					}
				}
				server.getJSON('/api/goods/get', {
					categoryId: that.categoryId,
					span: 15,
					page: 1,
					sort: 0,
				}, res => {
					that.goods = res.data.list;
					uni.hideLoading();
				})
			}
		},
		methods: {
			// 返回
			returns(){
				uni.navigateBack({
					delta:1
				})
			},
			//竞价
			bidding() {
				let that = this;
				that.tab = 1;
				that.options_title = '';
				that.price_range = '';
				that.categoryId = 0
				server.getJSON('/api/auction/get_list', {
					categoryId: that.fids,
					span: 15,
					page: 1,
					sort: 0,
				}, res => {
					console.log(res)
					that.goods = res.data.list;
					uni.hideLoading();
				})
			},
			//直购
			direct_purchase() {
				let that = this;
				that.tab = 2;
				if (that.categoryId == undefined || that.categoryId == '' || that.categoryId == null) {
					server.getJSON('/api/goods/get', {
						categoryId: that.fids,
						span: 15,
						page: 1,
						sort: 0,
					}, res => {
						that.goods = res.data.list;
						uni.hideLoading();
					})
				} else {
					server.getJSON('/api/goods/get', {
						categoryId: that.categoryId,
						span: 15,
						page: 1,
						sort: 0,
					}, res => {
						that.goods = res.data.list;
						uni.hideLoading();
					})
				}
			},
			// 商品详情页
			del(gid,id) {
				if(this.tab==1){
					uni.navigateTo({
						url: '../jingjiadetail/jingjiadetail?id=' + id
					})
				}else if(this.tab==2){
					uni.navigateTo({
						url: '../product/product_details?gid=' + gid
					})
				}
			},
			class_goods(id) {
				uni.redirectTo({
					url: './classfy_list?fid=' + id+'&tab='+this.tab
				})
			},
			secon(se_id) {
				this.categoryId = se_id;
			},
			// 筛选
			screen() {
				let that = this;
				that.choose = 3;
				that.goods = '';
				if (that.lowest_price == '' && that.highest_price == '' || that.lowest_price != '' && that.highest_price != '') {
					that.price_range = that.lowest_price + '_' + that.highest_price;
					that.screening = false;
					if (that.categoryId == undefined || that.categoryId == '' || that.categoryId == null) {
						server.getJSON('/api/goods/get', {
							categoryId: that.fids,
							priceRange: that.price_range,
							span: 15,
							page: 1,
							sort: 0,
						}, res => {
							that.goods = res.data.list;
							uni.hideLoading();
						})
					} else {
						for (var i in that.seconds) {
							if (that.categoryId == that.seconds[i].id) {
								that.options_title = that.seconds[i].name;
							}
						}
						that.price_range = that.lowest_price + '_' + that.highest_price;
						server.getJSON('/api/goods/get', {
							categoryId: that.categoryId,
							priceRange: that.price_range,
							span: 15,
							page: 1,
							sort: 0,
						}, res => {
							that.goods = res.data.list;
							uni.hideLoading();
						})
					}
				} else if (that.lowest_price == '') {
					that.message = '请输入最低价'
					that.tan = true;
					setTimeout(function() {
						that.tan = false;
					}, 1000)
				} else if (that.highest_price == '') {
					that.message = '请输入最高价'
					that.tan = true;
					setTimeout(function() {
						that.tan = false;
					}, 1000)
				}
			},
			// 价格升序降序
			price_screening() {
				uni.showLoading({
					title: '加载中'
				});
				let that = this;
				that.choose=2;
				that.goods = '';
				if (that.sort == 0) {
					that.sort = 2;
				}
				if (that.sort == 1) {
					that.sort = 2;
				} else if (that.sort == 2) {
					that.sort = 1;
				}
				if (that.categoryId == undefined || that.categoryId == '' || that.categoryId == null) {
					server.getJSON('/api/goods/get', {
						categoryId: that.fids,
						priceRange: that.price_range,
						span: 15,
						page: 1,
						sort: that.sort,
					}, res => {
						that.goods = res.data.list;
						uni.hideLoading();
					})
				} else {
					server.getJSON('/api/goods/get', {
						categoryId: that.categoryId,
						priceRange: that.price_range,
						span: 15,
						page: 1,
						sort: that.sort,
					}, res => {
						that.goods = res.data.list;
						uni.hideLoading();
					})
				}
			},
			// 综合
			all() {
				uni.showLoading({
					title: '加载中'
				});
				let that = this;
				that.choose=1;
				that.options_title = '';
				that.price_range = '';
				that.goods = '';
				that.categoryId = 0;
				that.sort = 0;
				server.getJSON('/api/goods/get', {
					categoryId: that.fids,
					priceRange: that.price_range,
					span: 15,
					page: 1,
					sort: that.sort
				}, res => {
					that.goods = res.data.list;
					uni.hideLoading();
				})
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			let that = this;
			that.page = 1;
			if(that.tab==1){
				server.getJSON('/api/auction/get_list', {
					categoryId: that.categoryId,
					span: 15,
					page: 1,
					sort: 0,
				}, res => {
					console.log(res)
					that.goods = res.data.list;
					uni.hideLoading();
				})
			}else{
				if (that.categoryId == undefined || that.categoryId == '' || that.categoryId == null) {
					server.getJSON('/api/goods/get', {
						categoryId: that.fids,
						priceRange: that.price_range,
						span: 15,
						page: 1,
						sort: that.sort,
					}, res => {
						console.log(res)
						that.goods = res.data.list;
						uni.hideLoading();
					})
				} else {
					server.getJSON(
						'/api/goods/get', {
							categoryId: that.categoryId,
							page: 1,
							span: 15,
							sort: 0,
						},
						function(res) {
							console.log(res)
							that.goods = res.data.list;
						}
					);
				}
			}
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
			if(that.tab==1){
				server.getJSON('/api/auction/get_list', {
					categoryId: that.categoryId,
					span: 15,
					page: that.page,
					sort: 0,
				}, res => {
					that.goods = res.data.list;
					uni.hideLoading();
				})
			}else{
				if (that.categoryId == undefined || that.categoryId == '' || that.categoryId == null) {
					server.getJSON(
						'/api/goods/get', {
							categoryId: that.fids,
							page: that.page,
							priceRange: that.price_range,
							span: 15,
							sort: that.sort,
						},
						function(res) {
							if (res != null) {
								uni.hideLoading();
								let result = res.data.list;
								if (result.length > 0) {
									for (var i in result) {
										that.goods.push(result[i]);
									}
								}
							} else {
								setTimeout(function() {
									uni.hideLoading();
								}, 5000);
							}
						}
					);
				} else {
					server.getJSON(
						'/api/goods/get', {
							categoryId: that.categoryId,
							page: that.page,
							span: 15,
							sort: 0,
						},
						function(res) {
							if (res != null) {
								uni.hideLoading();
								let result = res.data.list;
								if (result.length > 0) {
									for (var i in result) {
										that.goods.push(result[i]);
									}
								}
							} else {
								setTimeout(function() {
									uni.hideLoading();
								}, 5000);
							}
						}
					);
				}
			}
		},
	}
</script>

<style>
	.tasb {
		position: relative;
		height: 90rpx;
		width: 100%;
		border-bottom: 1px solid #F7F7F7;
		z-index: 50;
	}

	/* 分类标题 */
	.class_fy {
		width: 100%;
		height: 100%;
		background: rgba(000, 000, 000, 0.5);
		z-index: 100;
		position: fixed;
		top: 0;
		padding: 150rpx 30rpx;
		box-sizing: border-box;
	}
	.sanjiaos{
		font-size: 26rpx;
	}
	.class_fy_title {
		width: 100%;
		background: #FFFFFF;
		padding: 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		border-radius: 8rpx;
	}

	.title {
		width: 180rpx;
		height: 54rpx;
		color: #4A4A4A;
		border: 1px solid #E9E9E9;
		font-size: 28rpx;
		line-height: 54rpx;
		text-align: center;
		border-radius: 8rpx;
		margin: 14rpx 10rpx;
	}

	.title_active {
		width: 180rpx;
		height: 54rpx;
		color: #74181B;
		border: 1px solid #74181B;
		font-size: 28rpx;
		line-height: 54rpx;
		text-align: center;
		border-radius: 8rpx;
		margin: 14rpx 10rpx;
	}

	.tasbs {
		position: fixed;
		height: 90rpx;
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		background: white;
		margin-top: -3px;
	}

	.options {
		padding: 10rpx 30rpx;
		background: #F5F5F5;
		font-size: 28rpx;
		color: #1C0000;
		border-radius:40rpx;
		margin-right: 30rpx;
	}

	.tab {
		position: fixed;
		height: 90rpx;
		width: 100%;
		color: #808080;
		font-size: 30rpx;
		display: flex;
		justify-content: space-around;
		padding: 0 50rpx;
		box-sizing: border-box;
		background: white;
	}

	.tabs {
		height: 100%;
		display: flex;
		align-items: center;
		width: 100rpx;
		justify-content: center;

	}

	.act {
		height: 96%;
		display: flex;
		align-items: center;
		color: #1C0000;
		border-bottom: 2px solid #74181B;
		width: 100rpx;
		justify-content: center;
		z-index: 100;
		font-weight: 550;
	}

	.tabbar {
		position: relative;
		height: 68rpx;
		width: 100%;
	}

	.tabbars {
		position: fixed;
		height: 64rpx;
		width: 100%;
		background: white;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		color: #808080;
		z-index: 50;
		margin-top: -1px;
		border-top:1rpx solid #F5F5F5  ;
		border-bottom: 1rpx solid #F5F5F5;
	}

	.screening {
		color:  #808080;
	}
	.screeningactive{
		color: #74181B;
	}
	.wu{
		height: 600rpx;
		width:100%;
		text-align: center;
		line-height: 600rpx;
	}
	.goods {
		background: #F5F5F5;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 20rpx 16rpx;
		box-sizing: border-box;
	}

	.goods_news {
		width: 350rpx;
		height: 506rpx;
		background: white;
		border-radius: 16rpx;
		margin-bottom: 20rpx;
	}

	.goods_image {
		height: 368rpx;
		width: 100%;
		border-top-right-radius: 16rpx;
		border-top-left-radius: 16rpx;
	}

	.goods_title {
		padding: 0 20rpx;
		box-sizing: border-box;
		width: 100%;
		color: #1C0000;
		font-size: 28rpx;
		margin: 10rpx 0;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.goods_price {
		padding: 0 20rpx;
		box-sizing: border-box;
		width: 100%;
		color: #DD0812;
		font-size: 34rpx;
	}

	.screening_spring {
		position: fixed;
		height: 100%;
		width: 100%;
		background: rgba(000, 000, 000, 0.5);
		z-index: 80;
		top: 0;
		display: flex;
		justify-content: flex-end;
	}


	.screen_spring {
		background: white;
		width: 90%;
		height: 100%;
	}

	.btbs {
		position: fixed;
		bottom: 0;
		width: 90%;
	}

	.btn-screen {
		width: 100%;
		height: 92rpx;
		font-size: 34rpx;
		display: flex;
		justify-content: space-between;
	}

	.reset_btn {
		width: 50%;
		height: 100%;
		background: #E9E9E9;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #808080;
	}

	.are_btn {
		width: 50%;
		height: 100%;
		background: #74181B;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
	}

	.all {
		padding: 0 30rpx;
		box-sizing: border-box;
		width: 100%;
		color: #1C0000;
		font-size: 30rpx;
		margin-top: 60rpx;
	}

	.price {
		font-size: 30rpx;
		padding: 0 30rpx;
		margin-top: 40rpx;
		width: 100%;
		box-sizing: border-box;
		color: #1C0000;
	}

	.price_all {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-top: 30rpx;
	}

	.highest_price {
		width: 276rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
		background: #F5F5F5;
		border: 1px solid #C3C3C3;
		box-sizing: border-box;
		border-radius: 30rpx;
		justify-content: center;
		padding: 0 20rpx;
	}

	.pre {
		display: flex;
		align-items: center;
		justify-content: center;
		color: #9A9A9A;
	}

	.highest_prices {
		display: flex;
		align-items: center;
		color: #9A9A9A;
		font-size: 28rpx;
		text-align: center;
	}

	.option {
		box-sizing: border-box;
		background: #F5F5F5;
		font-size: 28rpx;
		color: #1C0000;
		width: 188rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		border-radius: 30px;
		margin-right: 16rpx;
		margin-bottom: 26rpx;
	}

	.option_active {
		box-sizing: border-box;
		background: #E4D1D2;
		font-size: 28rpx;
		color: #1C0000;
		width: 188rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		border-radius: 30px;
		margin-right: 16rpx;
		margin-bottom: 26rpx;
	}

	.option_all {
		margin-top: 30rpx;
		display: flex;
		flex-wrap: wrap;
	}

	.actives {
		background-color: #E4D1D2;
	}
</style>
