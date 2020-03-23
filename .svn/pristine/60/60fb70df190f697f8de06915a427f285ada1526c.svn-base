<template>
	<view class="backgrounds">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!--#endif-->
		<!-- 提示弹窗 -->
		<view class="tan" v-show="tan">
			<text>{{message}}</text>
		</view>
		<!-- 轮播图 -->
		<view class="swiper-vido">
			<swiper indicator-dots="true" class="banner">
				<swiper-item v-for="(slide, slides) in slide" :key="slides">
					<image class="banner" :src="slide"></image>
				</swiper-item>
			</swiper>
			<view class="returnbut">
				<view class="return" @click="goback()">
					<image src="../../static/productdetail/productleft.png"></image>
				</view>
				<view class="share" @click="goshare()">
					<image src="../../static/productdetail/productshare.png"></image>
				</view>
			</view>
			<view class="currentmessage">
				<view class="currentprice">当前价:￥<text class="currentprices">{{data.currentPrice}}</text></view>
				<view class="currenttime">距结束：
					<uni-countdown class="example-body" :minute="0" splitorColor="white" backgroundColor="#74181B" color="white" :second="data.timeRemaining" />
				</view>
			</view>
		</view>
		<!-- 标题 价格 -->
		<view class="title-money">
			<view class="title">{{ goods.title }}</view>
			<view class="price">
				<view class="pricename">起</view>
				<view class="pricenum">￥20</view>
				<view class="pricename">加</view>
				<view class="pricenum">￥20</view>
				<view class="pricename">保</view>
				<view class="pricenum">￥20</view>
				<view class="pricename">延</view>
				<view class="pricenum">5分钟</view>
			</view>
		</view>
		<view class="icons">
			<view><image src="../../static/productdetail/hege.png"></image><text>国家权威检测</text></view>
			<view class="shuxian"></view>
			<view><image src="../../static/productdetail/hege.png"></image><text>假一赔百万</text></view>
			<view class="shuxian"></view>
			<view><image src="../../static/productdetail/hege.png"></image><text>7天退换</text></view>
			<view class="shuxian"></view>
			<view><image src="../../static/productdetail/hege.png"></image><text>满100包邮</text></view>
		</view>
		<view class="pricetip" >
			<!-- v-if="bid_record.length!=0" -->
			<view class="auctiontitle">
				<view>出价记录</view>
				<view class="colors" @click="refresh">刷新出价</view>
			</view>
			<view class="tip">
				<view class="tipmessage">
					<view class="tipuser">
						<image src="../../static/logos.png"></image>
					</view>
					<view class="tipusertel">
						<view class="usertel">
							<view>13715246688</view>
							<view class="usertip">领先</view>
						</view>
						<view class="usertime">2019-09-12 12:11:11</view>
					</view>
				</view>
				<view class="tipprice">￥123</view>
			</view>
			<view class="tip">
				<view class="tipmessage">
					<view class="tipuser">
						<image src="../../static/logos.png"></image>
					</view>
					<view class="tipusertel">
						<view class="usertel">
							<view>13715246688</view>
							<view class="usertips">出局</view>
						</view>
						<view class="usertime">2019-09-12 12:11:11</view>
					</view>
				</view>
				<view class="tipprice">￥123</view>
			</view>
		</view>
		<view class="auction">
			<view class="auctiontitle">
				<view>拍卖说明</view>
				<view class="colors" @click="paimai=true">更多</view>
			</view>
			<view class="simpleauction">
				<view class="auctionimage">
					<image src="../../static/productdetail/chujia.png"></image><text>参与出价</text>
				</view>
				<view class="auctionimages">
					<image src="../../static/productdetail/jiantou.png"></image>
				</view>
				<view class="auctionimage">
					<image src="../../static/productdetail/jiagao.png"></image><text>价高者得</text>
				</view>
				<view class="auctionimages">
					<image src="../../static/productdetail/jiantou.png"></image>
				</view>
				<view class="auctionimage">
					<image src="../../static/productdetail/zhifu.png"></image><text>支付货款</text>
				</view>
				<view class="auctionimages">
					<image src="../../static/productdetail/jiantou.png"></image>
				</view>
				<view class="auctionimage">
					<image src="../../static/productdetail/get.png"></image><text>获得宝贝</text>
				</view>
			</view>
		</view>
		<view class="shangpinguige" v-show="paimai==true">
			<view class="shangpin">
				<view class="shangpinguige-title">
					<view class="shangpinguige-titles">拍卖说明</view>
					<view class="coloe" @click="paimai=false"><text class="iconfont icon-guanbi"></text></view>
				</view>
				<view class="paidetail">
					<view class="paimaititle">拍卖流程</view>
					<view class="simpleauction">
						<view class="auctionimage1">
							<image src="../../static/productdetail/chujia1.png"></image><text>参与出价</text>
						</view>
						<view class="auctionimages">
							<image src="../../static/productdetail/jiantou1.png"></image>
						</view>
						<view class="auctionimage1">
							<image src="../../static/productdetail/jiagao1.png"></image><text>价高者得</text>
						</view>
						<view class="auctionimages">
							<image src="../../static/productdetail/jiantou1.png"></image>
						</view>
						<view class="auctionimage1">
							<image src="../../static/productdetail/zhifu1.png"></image><text>支付货款</text>
						</view>
						<view class="auctionimages">
							<image src="../../static/productdetail/jiantou1.png"></image>
						</view>
						<view class="auctionimage1">
							<image src="../../static/productdetail/get1.png"></image><text>获得宝贝</text>
						</view>
					</view>
					<view class="paimaititle">保证金说明</view>
					<view class="paimaiwenzi">
						竞买人需支付30元保证金方可参与拍卖，在竞拍倒计时结束前均可缴纳保证金参与竞拍，竞拍结束后，除买受人外，其他竞买人缴纳保证金将即刻解冻，资金将在三个工作日内由原渠道退回。买受人若未在48小时内支付所有款项，本平台将扣除之前所缴纳保证金，不予退还。若同时竞拍多个商品，则须缴纳多份保证金（30元/份），以保证顺利竞拍所有您想要竞拍的商品。
					</view>
					<view class="paimaititle">竞拍规则</view>
					<view class="paimaiwenzi">
						拍卖开始后，已缴纳保证金的竞买人可以进行出价操作，竞买人须按一定要求竞价（如：固定初始竞价、固定加价幅度），不得在出价已领先情况下连续出价，扰乱竞拍秩序。
						竞拍结束后，以结束时最高出价为成交价，系统会自动为买受人提供一个待支付的订单，买受人须在限定时间内支付货款，否则流拍，保证金不予退还。
						为保证竞拍的公平性，若有竞买人在距离拍卖结束5分钟内出价，则拍卖结束时间自动延时5分钟，直到商品拍出。
						拍品非商品，不支持7天无理由退货，若经复检存在质量问题，则按“假一赔三”条款处理。
					</view>
				</view>
			</view>
		</view>
		<view class="tabb">
			<view class="tabbar">
				<view :class="tag == 0 ? 'tag' : ''" @click="tag = 0">图文详情</view>
			</view>
			<view class="specifications" v-show="tag==0">
				<view class="specifications-title">
					<view class="specifications-titles">商品规格</view>
					<view class="colors" @click="guige=true" v-if="tep.length>5">更多</view>
				</view>
				<view class="specifications-ci">
					<view class="specifications-vonr">
						<text class="specifications-content"  v-for="(item,i) in tep">{{item}}</text>
					</view>
					<view class="specifications-vonrs">
						<text class="specifications-contents" v-for="(item,i) in norms">{{item}}</text>
					</view>
				</view>
			</view>
			<view class="image">
				<image class="image-list" v-for="imagelist in imagelist" :src="imagelist" @click="imagelists"></image>
			</view>
			<view class="baoxian">
				<view><text class="qiannan"> 千年古刹</text><text class="qiannan"> 高僧加持</text></view>
				<view class="images">
					<image :src="baoxians1" v-for="baoxians1 in baoxians" @click="image(baoxians)"></image>
				</view>
			</view>
			<view class="baoxian">
				<view class="titles"><text>怀南会携手中国人保财险</text></view>
				<view class="images">
					<image :src="baoxians1" v-for="baoxians1 in baoxian" @click="image(baoxian)"></image>
				</view>
			</view>
		</view>
		<!-- 全部商品规格 -->
		<view class="shangpinguige" v-show="guige==true">
			<view class="shangpin">
				<view class="shangpinguige-title">
					<view class="shangpinguige-titles">商品规格</view>
					<view class="coloe" @click="guige=false"><text class="iconfont icon-guanbi"></text></view>
				</view>
				<view class="shangpinguige-tan">
					<view class="specifications-ci">
						<view class="specifications-vonr">
							<text class="specifications-contents" v-for="(item,i) in tep">{{item}}</text>
						</view>
						<view class="specifications-vonrs">
							<text class="specifications-contents" v-for="(item,i) in norms">{{item}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="image">
			<image class="image-list" v-for="imagelist in imagelist" :src="imagelist" @click="imagelists"></image>
		</view>
		<view class="baoxian">
			<view><text class="qiannan"> 千年古刹</text><text class="qiannan"> 高僧加持</text></view>
			<view class="images">
				<image :src="baoxians1" v-for="baoxians1 in baoxians" @click="image(baoxians)"></image>
			</view>
		</view>
		<view class="baoxian">
			<view class="titles"><text>怀南会携手中国人保财险</text></view>
			<view class="images">
				<image :src="baoxians1" v-for="baoxians1 in baoxian" @click="image(baoxian)"></image>
			</view>
		</view>
		<view class="recommend_good baoxian-bottom">
			<view class="recommend_goods">推荐商品</view>
			<view class="goods">
				<view class="good" v-for="goods in good" @click="del(goods.gid)">
					<image :src="goods.thumb" class="goods-images"></image>
					<view class="goods-title_price">
						<view class="good_title">{{goods.title}}</view>
						<view class="good_price">￥{{goods.price}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部栏 -->
		<view class="bottom">
			<view class="rel">
				<view class="kefu" @click="kefu">
					<text class="iconfont icon-kefu icon_kefu"></text>
					<view>客服</view>
				</view>
			</view>
			<view class="rels">
				<view class="addcart" @click="bids=true">出个价</view>
			</view>
		</view>
		<view class="bid" v-if="bids==true">
			<view class="bids">
				<view class="lead">
					<view></view>
					<view>领先价:￥{{data.currentPrice}}</view>
					<view @click="bids=false"><text class="iconfont icon-guanbi coles"></text></view>
				</view>
				<view class="input_bid">
					<text class="iconfont icon-bianji bianji"></text>￥
					<input type="number" :placeholder="currentPrice" class="inputs"> 
					<!-- adjust-position  键盘弹起是否向上推页面 -->
					<view class="minus" @click="currentPrices('-')">-1</view>
					<view class="add" @click="currentPrices('+')">+1</view>
				</view>
				<button class="bid_btn" @click="bid()">确认出价</button>
			</view>
		</view>
	</view>
</template>

<script>
	const server = require('../../utils/server');
	import uniCountdown from '@/components/uni-countdown/uni-countdown.vue'
	export default {
		data() {
			return {
				id: 0,//竞价id
				slide: [], //轮播图
				goods: [],//商品信息
				tag: 0, //选项卡
				specifications: [], //商品规格
				imagelist: [], //商品图片
				data:{},//竞价数据
				bid_record:[],//出价记录
				bids:false,//出价
				tan: false, //弹窗
				message: '', //弹窗提示语
				norms: {}, //全部商品属性内容
				tep: [], //全部商品属性
				key: "",
				guige: false,
				paimai: false,
				baoxian: ['https://www.huainanhui.com/upload/image/article/2019/12/02/0936334940.jpg',
					'https://www.huainanhui.com/upload/image/article/2019/11/16/1339053567.png'
				],
				baoxians: ['https://www.huainanhui.com/upload/image/article/2019/10/25/1555365094.jpg',
					'https://www.huainanhui.com/upload/image/article/2019/10/25/1557289313.jpg'
				],
				good: [], //推荐商品列表
				currentPrice:0,//当前价格
				auction_list:[]//出价记录
			};
		},
		components: {
			uniCountdown,
		},
		onLoad(option) {
			let that = this;
			that.id = option.id;
			server.getJSON('/api/auction/bidding_list',{
				span:3,
				aid:that.id
				},res=>{
					console.log(res)
					that.auction_list = res.data;
				})
			server.getJSON(
				'/api/auction/detail', {
					id: that.id
				},
				function(res) {
					that.data = res.data;
					that.currentPrice = res.data.currentPrice;
					that.slide = res.data.goods.imgs; //轮播图
					that.goods = res.data.goods;
					let shangpin = res.data.goods.norms; // 商品规格
					that.norms = res.data.goods.norms;
					for (var key in that.norms) {
						that.key = key;
						that.tep.push(that.key)
					}
					that.group = res.data.group;
					that.seckill = res.data.seckill;
					let i = 0
					Object.keys(shangpin).forEach(function(key) {
						i++;
						if (i <= 5) {
							that.specifications[key] = shangpin[key]
						}
					});
					that.imagelist = res.data.goods.imgs;
					server.getJSON('/goods/recommend_goods/345', res => {
						that.good = res.data;
						uni.hideLoading();
					})
				}
			);

		},
		methods: {
			// 刷新出价记录
			refresh(){
				let that = this;
				server.getJSON('/api/auction/bidding_list',{
					span:3,
					aid:that.id
					},res=>{
						console.log(res)
						that.auction_list = res.data;
					})
			},
			// 返回
			goback() {
				uni.navigateBack()
			},
			//预览图片
			image(images) {
				uni.previewImage({
					urls: images,
				});
			},
			//预览图片
			imagelists() {
				let that = this;
				uni.previewImage({
					urls: that.imagelist,
				});
			},
			//出价  加减
			currentPrices(curre){
				let num = 5;
				if(curre=='-'){
					if(this.data.currentPrice>=this.currentPrice){
						
					}else{
						this.currentPrice --;
					}
				}else{
					this.currentPrice ++;
				}
			},
			//出价
			bid(aid){
				let that = this;
				if(uni.getStorageSync('token')==''||uni.getStorageSync('token')==null){
					that.message ='你还未登录，请先登录'
					that.tan = true;
					setTimeout(function(){
						that.tan = false
						uni.navigateTo({
							url:'../login/login'
						})
					},1500)
				}else{
					if(that.currentPrice<=that.data.currentPrice){
						that.tan = true;
						that.message = '出价失败，出价金额不得低于最高价'
						setTimeout(function(){
							that.tan = false
						},2500)
					}else{
						server.postJSON('/api/auction/bidding_price',{
							token:uni.getStorageSync('token'),
							aid:that.data.id,
							price:that.currentPrice
						},res=>{
							that.message = res.data.message;
							that.tan = true;
							setTimeout(function(){
								that.tan = false
							},2500)
							if(res.data.code==0){
								setTimeout(function(){
									uni.navigateTo({
										url:'../index/jingjiapay?aid='+that.data.id
									})
								},2500)
							}
						})
					}
				}
			},
			//客服
			kefu(){
				uni.navigateTo({
					url:'../kefu/kefu'
				})
			}
		}
	};
</script>

<style>
	uni-page-body,
	uni-page-refresh {
		height: 100%;
	}

	.backgrounds {
		background: #f5f5f5;
		min-height: 100%;
	}

	.banner {
		width: 100%;
		height: 750rpx;
	}

	.swiper-vido {
		width: 100%;
		height: 750rpx;
		background: #000000;
		position: relative; 
	}
	.bid{
		background: rgba(000,000,000,0.5);
		top: 0;
		width: 100%;
		height: 100%;
		position: fixed;
		padding:  0 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		z-index: 66;
		justify-content: center;
	}
	.bids{
		background: white;
		border-radius: 10rpx;
		width: 100%;
		height: 511rpx;
		display: flex;
		flex-direction: column;
		padding:0 40rpx;
		box-sizing: border-box;
	}
	.bid_btn{
		width: 100%;
		height: 88rpx;
		background:#DD0812;
		border-radius: 10rpx;
		color: white;
		line-height: 88rpx;
	}
	.lead{
		display: flex;
		justify-content: space-between;
		width: 100%;
		font-size: 32rpx;
		color: #1C0000;
		margin: 30rpx 0 40rpx;
	}
	.input_bid{
		width: 100%;
		height: 128rpx;
		border:2rpx solid #74181B;
		border-radius:10rpx;
		margin: 0 0 70rpx;
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		box-sizing: border-box;
		justify-content: space-around;
		color: #74181B;
	}
	.minus{
		width: 80rpx;
		height: 80rpx;
		background:#F5F5F5;
		border-radius: 80rpx;
		font-size: 24rpx;
		color: #808080;
		line-height: 80rpx;
		text-align: center;
	}
	.add{
		width: 80rpx;
		height: 80rpx;
		background:#E9D1D2;
		border-radius: 80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 24rpx;
		color: #8E161A;
	}
	.coles{
		font-size:26rpx;
	}
	.bianji{
		color:#74181B;
		margin-right: 10rpx;
	}
	.inputs{
		width: 300rpx;
	}
	.video {
		width: 100%;
		height: 600rpx;
	}

	.tab {
		position: absolute;
		left: 0;
		bottom: 30rpx;
		width: 100%;
		height: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.returnbut {
		position: absolute;
		top: 30rpx;
		height: 70rpx;
		width: 92%;
		padding: 0 4%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.return image,
	.share image {
		width: 70rpx;
		height: 70rpx;
	}

	.currentmessage {
		position: absolute;
		bottom: 0;
		left: 0;
		height: 88rpx;
		width: 92%;
		padding: 0 4%;
		background: #8E161A;
		color: #FFFFFF;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.currentprices{
		font-size: 32rpx;
		color: white;
	}
	.currenttime{
		display: flex;
		align-items: center;
	}
	.videos-img {
		width: 100rpx;
		height: 50rpx;
		background: white;
		border-radius: 40rpx;
		font-size: 24rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 16rpx;
	}

	.active-tab {
		background: #74181b;
		color: white;
		border-radius: 40rpx;
		font-size: 24rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 16rpx;
		width: 100rpx;
		height: 50rpx;
	}

	.title-money {
		width: 100%;
		padding: 30rpx 30rpx;
		padding-bottom: 20rpx;
		box-sizing: border-box;
		height: auto;
		background: white;
		display: flex;
		justify-content: center;
		flex-direction: column;
		margin-bottom: 8rpx;
	}

	.price {
		color: #dd0812;
		font-size: 26rpx;
		display: flex;
		align-items: center;
	}

	.pricename {
		align-items: center;
		display: flex;
		justify-content: center;
		border: 1rpx solid #74181B;
		border-radius: 4rpx;
		width: 28rpx;
		font-size: 18rpx;
		height: 28rpx;
		line-height: 30rpx;
	}

	.pricenum {
		color: #808080;
		font-size: 26rpx;
		margin:0 26rpx 0 6rpx;
	}

	.yuanjia {
		margin-left: 20rpx;
		text-decoration: line-through;
		color: #808080;
		font-size: 28rpx;
	}

	.title {
		font-size: 32rpx;
		font-weight: 600;
		margin-bottom: 20rpx;
	}

	.icons {
		width: 100%;
		height: 60rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #74181b;
		font-size: 26rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		background: white;
		margin-bottom: 8rpx;
	}
	.shuxian{
		height: 24rpx;
		width: 1px;
		background: #808080;
	}
	.icons image{
		width: 20rpx;
		height: 24rpx;
	}
	.pricetip {
		margin-bottom: 16rpx;
		padding: 20rpx 0;
		background: #FFFFFF;
		height: auto;
		width: 100%;
	}

	.tip {
		margin: 30rpx 0;
		font-size: 28rpx;
		box-sizing: border-box;
		display: flex;
		padding: 0 30rpx;
		justify-content: space-between;
		align-content: center;
	}

	.tipmessage {
		display: flex;
		align-content: center;
	}

	.tipusertel {
		line-height: 40rpx;
		margin-left: 16rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.usertel {
		display: flex;
	}

	.usertip {
		margin-left: 30rpx;
		color: #FFFFFF;
		width: 76rpx;
		height: 40rpx;
		border-radius: 4rpx;
		background: #74181b;
		text-align: center;
		align-items: center;
		font-size: 26rpx;
	}

	.usertips {
		margin-left: 30rpx;
		color: #FFFFFF;
		width: 76rpx;
		height: 40rpx;
		border-radius: 4rpx;
		background: #C3C3C3;
		text-align: center;
		align-items: center;
		font-size: 26rpx;
	}

	.usertime {
		font-size: 26rpx;
		color: #9A9A9A;
	}

	.tipuser image {
		width: 80rpx;
		height: 80rpx;
	}

	.tipprice {
		font-size: 30rpx;
		line-height: 80rpx;
		color: #74181B;
		font-weight: 550;
	}

	/* 拍卖说明 */
	.auction {
		background: #FFFFFF;
		height: auto;
		width: 100%;
		padding: 20rpx 0;
	}

	.auctiontitle {
		font-size: 30rpx;
		box-sizing: border-box;
		padding: 0 30rpx;
		height: 60rpx;
		line-height: 60rpx;
		display: flex;
		justify-content: space-between;
	}

	.colors {
		color: #808080;
		font-size: 26rpx;
	}

	.simpleauction {
		width: 100%;
		height: 180rpx;
		align-items: center;
		justify-content: center;
		display: flex;
	}

	.auctionimage1 {
		width: 110rpx;
		height: auto;
		font-size: 26rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
	}

	.auctionimage1 image {
		width: 50rpx;
		height: 50rpx;
		margin: 16rpx 30rpx;
	}

	.auctionimage {
		width: 120rpx;
		height: auto;
		font-size: 28rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
	}

	.auctionimage image {
		width: 90rpx;
		height: 90rpx;
		margin: 16rpx;
	}

	.auctionimages {
		width: 60rpx;
		height: 90rpx;
		justify-content: center;
		text-align: center;
	}

	.auctionimages image {
		width: 40rpx;
		height: 18rpx;
	}

	/* 拍卖详细说明 */
	.paidetail {
		padding: 0rpx 30rpx;
		font-size: 28rpx;
	}

	.paimaititle {
		font-size: 30rpx;
		font-weight: 550;
	}

	.paimaiwenzi {
		margin: 22rpx 0;
		line-height: 46rpx;
	}

	.tabbar {
		width: 100%;
		padding-left: 30rpx;
		height: 90rpx;
		font-size: 28rpx;
		font-weight: 600;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		background: white;
		margin-top: 16rpx;
	}

	.tag {
		color: #74181B;
	}

	.specifications {
		padding: 0 36rpx;
		box-sizing: border-box;
		width: 100%;
		background: white;
	}

	.specifications-title {
		display: flex;
		justify-content: space-between;
		margin-bottom: 30rpx;
	}

	.specifications-titles {
		color: #2E2E2E;
		font-size: 26rpx;
		font-weight: 600;
	}

	.gengduo {
		color: #808080;
		font-size: 20rpx;
	}

	.specifications-ci {
		display: flex;

	}

	.specifications-vonr {
		display: flex;
		flex-direction: column;
		width: 200rpx;
	}

	.specifications-vonrs {
		display: flex;
		flex-direction: column;
	}

	.specifications-content {
		color: #585757;
		font-size: 26rpx;
		margin-bottom: 20rpx;
	}

	.specifications-contents {
		max-width: 450rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #1C0000;
		font-size: 26rpx;
		margin-left: 60rpx;
		margin-bottom: 20rpx;
	}

	.image {
		margin-top: 20rpx;
	}

	.image-list {
		width: 100%;
		height: 750rpx;
		display: block;
	}

	.bottom {
		position: fixed;
		width: 100%;
		height: 100rpx;
		bottom: 0;
		background: white;
		left: 0;
		display: flex;
	}



	.rel{
		width:20%;
		height: 100%;
		display: flex;
		font-size: 26rpx;
		color: #4A4A4A;
		align-items: center;
		justify-content: space-around;
	}
	.kefu{
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		justify-content: space-around;
		padding: 10rpx 0;
		box-sizing: border-box;
	}
	.icon_kefu{
		font-size: 34rpx;
	}
	.cart{
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		justify-content: space-around;
		padding: 10rpx 0;
		box-sizing: border-box;
	}
	.rels{
		width: 80%;
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
	}
	.addcart {
		width: 577rpx;
		height: 66rpx;
		background: #74181B;
		color: #FFFFFF;
		font-size: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 36rpx;
	}

	.buy {
		width: 50%;
		background: #DD0812;
		height: 100%;
		color: #FFFFFF;
		font-size: 30rpx;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.shangpinguige {
		background: rgba(46, 46, 46, 0.4);
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 50;
		top: 0;
		left: 0;
	}

	.shangpin {
		height: auto;
		width: 100%;
		border-radius: 16rpx 16rpx 0 0;
		background: white;
		position: absolute;
		bottom: 0;
		padding-bottom: 20rpx;
	}

	.shangpinguige-title {
		display: flex;
		margin-top: 20rpx;
		margin-bottom: 16rpx;
	}

	.shangpinguige-titles {
		width: 90%;
		height: 70rpx;
		font-size: 32rpx;
		font-weight: 600;
		line-height: 70rpx;
		text-align: center;
		margin-left: 10%;
	}

	.coloe {
		width: 10%;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
	}

	.shangpinguige-tan {
		padding-left: 36rpx;
	}

	.baoxian {
		background: white;
		box-sizing: border-box;
		padding: 30rpx;
		margin-top: 20rpx;
		text-align: center;
		color: #74181B;
		font-size: 28rpx;
	}

	.qiannan {
		margin: 0 10rpx;
	}

	.baoxian-bottom {
		margin-bottom: 110rpx;
	}

	.titles {
		margin-bottom: 20rpx;
	}

	.images {
		display: flex;
	}
	.images image{
		width: 344rpx;
		height: 244rpx;
	}
	.recommend_good {
		padding: 0 14rpx;
		box-sizing: border-box;
		background: #F5F5F5;
	}

	.recommend_goods {
		margin: 30rpx 0;
		width: 100%;
		color: #1C0000;
		font-size: 32rpx;
		text-align: center;
	}

	.goods {
		display: flex;
		width: 100%;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.good {
		width: 351rpx;
		height: 482rpx;
		display: flex;
		flex-direction: column;
		margin-bottom: 20rpx;
		background: white;
	}

	.goods-images {
		width: 100%;
		height: 351rpx;
	}

	.goods-title_price {
		height: 131rpx;
		width: 100%;
		padding: 20rpx;
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		justify-content: space-between;
	}

	.good_title {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 100%;
		color: #1C0000;
		font-size: 26rpx;
	}

	.good_price {
		color: #DD0812;
		font-size: 32rpx;
	}
</style>
