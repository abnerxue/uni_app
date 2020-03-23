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
			<swiper indicator-dots="true" class="banner" v-show="tab == 0">
				<swiper-item v-for="(slide, slides) in slide" :key="slides">
					<image class="banner" :src="slide"></image>
				</swiper-item>
			</swiper>
			<video :src="video" class="video" controls v-show="tab == 1"></video>
			<view class="tab">
				<view :class="tab == 0 ? 'active-tab' : 'videos-img'" @click="tab = 0">图片</view>
				<view :class="tab == 1 ? 'active-tab' : 'videos-img'" @click="tab = 1">视频</view>
			</view>
			<view class="returnbut">
				<view class="return" @click="goback()">
					<image src="../../static/productdetail/productleft.png"></image>
				</view>
				<view class="share" @click="goshare()">
					<image src="../../static/productdetail/productshare.png"></image>
				</view>
			</view>
		</view>
		<!-- 标题 价格 -->
		<view class="title-money">
			<view class="price">￥{{ goods.price }}</view>
			<view class="title">{{ goods.title }}</view>
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
		<!-- 评论 -->
		<view class="Comment">
			<view class="comment-title">
				<view>评论</view>
				<!-- <view class="gengduo">更多</view> -->
			</view>
			<view v-if="commentlist==false" class="pinjia">暂无评论</view>
			<view class="comment-conent" v-for="commentlist in commentlist">
				<view class="title-image">
					<view class="username">
						<image class="title-image-size" :src="commentlist.avatar"></image>
						<text class="user-name">{{ commentlist.userName }}</text>
					</view>
					<view class="dianzan"></view>
				</view>
				<view class="time">{{ commentlist.postTimeDate }}</view>
				<view class="comment-cont-font">{{ commentlist.content }}</view>
				<view class="comment-images">
					<image class="comment-image" :src="images" v-for="images in commentlist.images" @click="image(commentlist.images)"></image>
				</view>
			</view>
		</view>
		<view class="tabb">
			<view class="tabbar">
				<view :class="tag == 0 ? 'tag' : ''" @click="tag = 0">图文详情</view>
				<view :class="tag == 1 ? 'tag' : ''" @click="tag = 1">识玉轩</view>
				<view :class="tag == 2 ? 'tag' : ''" @click="tag = 2">我们的保障</view>
			</view>
			<view v-show="tag==0">
				<view class="specifications">
					<view class="specifications-title">
						<view class="specifications-titles">商品规格</view>
						<view class="gengduo" @click="guige=true" v-if="tep.length>5">更多</view>
					</view>
					<view class="specifications-ci">
						<view class="specifications-vonr">
							<text class="specifications-content" v-for="(item,i) in tep">{{item}}</text>
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
				<view class="baoxian ">
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
			</view>
			<view class="shiyuxuan" v-show="tag==1">
				<view class="fenlei">
					<view class="fenleititle1">翡翠透明度</view>
					<view class="fenleipeice">
						<view class="fenleiimage">
							<image src="../../static/productdetail/shiyuxuan/tu1.png"></image>
						</view>
						<view class="wenzi">
							<view class="fenleititle">玻璃种</view>
							<view class="fenleiwenzi">
								特征：透明<br/>
								肉眼观测：反光观察 / 内部汇聚光较强<br/>
								透光观察：多数光线可透过，内部特征清晰可见
							</view>
						</view>
					</view>
					<view class="fenleipeice">
						<view class="fenleiimage">
							<image src="../../static/productdetail/shiyuxuan/tu2.png"></image>
						</view>
						<view class="wenzi">
							<view class="fenleititle">冰玻种</view>
							<view class="fenleiwenzi">
								特征：半透明<br/>
								反射观察： 内部汇聚光强<br/>
								透光观察： 大部分光线可透过，内部特征可见
							</view>
						</view>
					</view>
					<view class="fenleipeice">
						<view class="fenleiimage">
							<image src="../../static/productdetail/shiyuxuan/tu3.png"></image>
						</view>
						<view class="wenzi">
							<view class="fenleititle">冰种</view>
							<view class="fenleiwenzi">
								特征：尚透明<br/>
								反射观察： 内部汇聚光弱<br/>
								透光观察： 部分光线可透过，内部特征尚可见
							</view>
						</view>
					</view>
					<view class="fenleipeice">
						<view class="fenleiimage">
							<image src="../../static/productdetail/shiyuxuan/tu4.png"></image>
						</view>
						<view class="wenzi">
							<view class="fenleititle">糯冰种</view>
							<view class="fenleiwenzi">
								特征：微透明<br/>
								肉眼观测：反射观察 / 内部有微量汇聚光<br/>
								透光观察 / 部分光线可透过，内部特征模糊可见
							</view>
						</view>
					</view>
					<view class="fenleipeice">
						<view class="fenleiimage">
							<image src="../../static/productdetail/shiyuxuan/tu5.png"></image>
						</view>
						<view class="wenzi">
							<view class="fenleititle">细糯种</view>
							<view class="fenleiwenzi">
								特征：不透明<br/>
								反射观察： 内部无汇聚光<br/>
								透光观察： 基本无光线透过， 内部特征不可见
							</view>
						</view>
					</view>
				</view>
				<view style="width: 100%;height: 16rpx;background: #F5F5F5;"></view>
				<view class="fenlei">
					<view class="fenleititle">翡翠的质地</view>
					<view class="fenleipeice1">
						<view class="fenleiimage1">
							<image src="../../static/productdetail/shiyuxuan/tu6.png"></image>
						</view>
						<view class="wenzi">
							<view class="fenleititle">极细/极纯净</view>
							<view class="fenleiwenzi">
								内部构造：矿物颗粒小于0.01mm<br/>
								肉眼观测： 内部构造非常紧密细腻，粒度均匀，高倍放大镜下不见颗粒及次生矿物填充痕隙。 外部仅有极不显眼的几处絮状物，不影响整体美观。
							</view>
						</view>
					</view>
					<view class="fenleipeice1">
						<view class="fenleiimage1">
							<image src="../../static/productdetail/shiyuxuan/tu7.png"></image>
						</view>
						<view class="wenzi">
							<view class="fenleititle">细/纯净</view>
							<view class="fenleiwenzi">
								特征：透明<br/>
								肉眼观测：反光观察 / 内部汇聚光较强<br/>
								透光观察 / 多数光线可透过，内部特征清晰可见
							</view>
						</view>
					</view>
					<view class="fenleipeice1">
						<view class="fenleiimage1">
							<image src="../../static/productdetail/shiyuxuan/tu8.png"></image>
						</view>
						<view class="wenzi">
							<view class="fenleititle">较细/较纯净</view>
							<view class="fenleiwenzi">
								内部构造：矿物颗粒小于0.05～0.1.mm<br/>
								肉眼观测： 结构致密，粒度尚均匀，高倍放大镜下见少量颗粒及次生矿物填充痕隙。明显的内、外特征，肉眼可见，对整体美观有轻微影响。
							</view>
						</view>
					</view>
					<view class="fenleipeice1">
						<view class="fenleiimage1">
							<image src="../../static/productdetail/shiyuxuan/tu9.png"></image>
						</view>
						<view class="wenzi">
							<view class="fenleititle">粗/尚纯净</view>
							<view class="fenleiwenzi">
								内部构造：矿物颗粒小于0.1～0.5mm<br/>
								肉眼观测： 结构不够致密，粒度不均匀。高倍放大镜下见细小矿物填充痕隙， 细微的内、外特征，肉眼可见，对整体美观有些影响。
							</view>
						</view>
					</view>
					<view class="fenleipeice1">
						<view class="fenleiimage1">
							<image src="../../static/productdetail/shiyuxuan/tu10.png"></image>
						</view>
						<view class="wenzi">
							<view class="fenleititle">较粗/不纯净</view>
							<view class="fenleiwenzi">
								内部构造：矿物颗粒大于0.5mm<br/>
								肉眼观测： 结构疏松，粒度大小不均。肉眼可见颗粒及次生矿物填充痕隙等， 内、外特征很明显，肉眼可辨，对整体美观有较明显影响。
							</view>
						</view>
					</view>
				</view>
				<view style="width: 100%;height: 16rpx;background: #F5F5F5;"></view>
				<view class="fenlei">
					<view class="fenleititle">和田玉分类</view>
					<view class="fenleipeice2">
						<view class="fenleiimage2">
							<image src="../../static/productdetail/shiyuxuan/tu11.png"></image>
						</view>
						<view class="wenzi">
							<view class="fenleititle">白玉</view>
							<view class="fenleiwenzi">
								颜色洁白，细腻，滋润，微透明，宛如羊脂者称羊脂白玉；不透明，光泽较差者为白玉。
							</view>
						</view>
					</view>
					<view class="fenleipeice2">
						<view class="fenleiimage2">
							<image src="../../static/productdetail/shiyuxuan/tu12.png"></image>
						</view>
						<view class="wenzi">
							<view class="fenleititle">青玉和青白玉</view>
							<view class="fenleiwenzi">
								色呈深灰绿至蓝绿色，不透明；青白玉是青玉与白玉之间的过渡类型，呈灰绿色。
							</view>
						</view>
					</view>
					<view class="fenleipeice2">
						<view class="fenleiimage2">
							<image src="../../static/productdetail/shiyuxuan/tu13.png"></image>
						</view>
						<view class="wenzi">
							<view class="fenleititle">碧玉</view>
							<view class="fenleiwenzi">
								深绿色(菠菜绿色)，质地较粗。碧玉除新疆所产外，我国玉器工艺界把和国外所产的软玉也统称为碧玉。
							</view>
						</view>
					</view>
					<view class="fenleipeice2">
						<view class="fenleiimage2">
							<image src="../../static/productdetail/shiyuxuan/tu14.png"></image>
						</view>
						<view class="wenzi">
							<view class="fenleititle">墨玉</view>
							<view class="fenleiwenzi">
								主要含分散的碳质或石墨而呈灰黑色或灰黑与白色相间的条带。如果完全是黑色的，称墨玉。
							</view>
						</view>
					</view>
					<view class="fenleipeice2">
						<view class="fenleiimage2">
							<image src="../../static/productdetail/shiyuxuan/tu15.png"></image>
						</view>
						<view class="wenzi">
							<view class="fenleititle">黄玉</view>
							<view class="fenleiwenzi">
								是地表水中褐铁矿渗入白玉中造成的，米黄至黄色。
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="ensure" v-show="tag==2">
				<view class="guarantee">
					<view class="guaranteepiece">
						<view class="piecetitle">
							<view class="left">
								<view class="leftimage"><image src="../../static/productdetail/yuantou.png"></image></view>
								<text>源头直供</text>
							</view>
							<view class="right">01</view>
						</view>
						<view class="piecewenzi">
							怀南会致力于打造一家值得信赖的知名企业，我们愿把天然玉石的祥瑞带给每一位消费者。怀南会所有出售的宝贝均来自产业源头一手货源。
						</view>
					</view>
					<view class="guaranteepiece">
						<view class="piecetitle">
							<view class="left">
								<view class="leftimage"><image src="../../static/productdetail/shougong.png"></image></view>
								<text>手工雕琢</text>
							</view>
							<view class="right">02</view>
						</view>
						<view class="piecewenzi">
							怀南会致力于发掘玉石之大美为目标，以弘扬中华玉石文化为己任，融合古典和现代风，每一件玉石都传递着幸福美满的祝福，是佩戴和收藏的上佳之选。
						</view>
					</view>
					<view class="guaranteepiece">
						<view class="piecetitle">
							<view class="left">
								<view class="leftimage"><image src="../../static/productdetail/shengxin.png"></image></view>
								<text>省心省力</text>
							</view>
							<view class="right">03</view>
						</view>
						<view class="piecewenzi">
							怀南会立足玉石源头，恪守“怀七分仁义，存三分名利”的古训，追求长久共赢。通过互联网+珠宝的新零售模式，省去中间环节直接为终端消费者提供优质玉石，大大降低了销售成本，用以回馈消费者，怀南会怀南会将秉承“专业省心超值”一贯经营理念，虔诚为广大玉石爱好者用心服务。
						</view>
					</view>
					<view class="guaranteepiece">
						<view class="piecetitle">
							<view class="left">
								<view class="leftimage"><image src="../../static/productdetail/fujian.png"></image></view>
								<text>接受正规复检</text>
							</view>
							<view class="right">04</view>
						</view>
						<view class="piecewenzi">
							怀南会的玉石100%通过国家权威珠宝检测部门检测。毛料检测-雕刻抛光后的产品把关-摄影中心单品拍照时检测国家权威珠宝部门检测- -物流中心发货前的检查，五大关口层层把守，保证消费者买到心仪的天然玉石，做值得消费者信赖的玉石供应商
						</view>
					</view>
					<view class="guaranteepiece">
						<view class="piecetitle">
							<view class="left">
								<view class="leftimage"><image src="../../static/productdetail/qitian.png"></image></view>
								<text>七天无理由退换</text>
							</view>
							<view class="right">05</view>
						</view>
						<view class="piecewenzi">
							怀南会坚持精耕细作，做到专心、专注、专业，力求让顾客买得放心，退换舒心。怀南会出售的所有玉石，自签收之日起，在不影响二次销售的情况下，七日内均可自由发起退换要求，确保您买到最称心的玉石并带给您最优质的购物体验。
						</view>
					</view>
				</view>
				<view class="guarantee">
					<view class="piece">
						<view class="pieceimage">
							<image src="../../static/productdetail/image.png"></image>
						</view>
						<view class="piecejieshao">
							<view class="jieshaotitle">关于图片</view>
							<view class="piecewenzi">怀南会的每一张图片都是实物多角度拍摄而成，我们努力将这个差异降到最低，力求还原真实。</view>
						</view>
					</view>
					<view class="piece">
						<view class="pieceimage">
							<image src="../../static/productdetail/menu.png"></image>
						</view>
						<view class="piecejieshao">
							<view class="jieshaotitle">关于显示</view>
							<view class="piecewenzi">世界上没有完全相同的两块玉石，也没有显示效果完全相同的的两台显示器，整个交易最终以实物为准。</view>
						</view>
					</view>
					<view class="piece">
						<view class="pieceimage">
							<image src="../../static/productdetail/chicun.png"></image>
						</view>
						<view class="piecejieshao">
							<view class="jieshaotitle">关于尺寸</view>
							<view class="piecewenzi">为了让消费者最清晰观察玉石细节，们对部分图片做了放大处理(我们所标注的尺寸误差不超过1毫米)。</view>
						</view>
					</view>
					<view class="piece">
						<view class="pieceimage">
							<image src="../../static/productdetail/pinzhi.png"></image>
						</view>
						<view class="piecejieshao">
							<view class="jieshaotitle">关于品质</view>
							<view class="piecewenzi">怀南会提供的每一件宝贝都经过国家权威珠宝检测中心检测，并附带相关检测证书。</view>
						</view>
					</view>
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

		<!-- 购买弹窗 -->
		<view class="buy-spring" v-show="buy">
			<view class="buys-spring">
				<view class="buy-goods-news">
					<view class="goods-pricy">
						<image class="goods-image" :src="goods.thumb"></image>
						<view class="goods-price-inventory">
							<view class="goods-price">￥{{ goods.price }}</view>
							<view class="inventory">剩余{{goods.inventory}}个</view>
						</view>
					</view>
					<view class="coles" @click="buy=false">X</view>
				</view>
				<view class="buy-number">
					<view>购买数量</view>
					<view class="btns">
						<view class="btn_-" @click="reduce_add('-')">-</view>
						<view class="btn">{{number}}</view>
						<view class="btn_-" @click="reduce_add('+')">+</view>
					</view>
				</view>
				<button class="btn-buy" @click="buys(goods.gid,2)">立即购买</button>
			</view>
		</view>
		<!-- 底部栏 -->
		<view class="bottom">
			<view class="rel">
				<view class="kefu" @click="kefu">
					<text class="iconfont icon-kefu icon_kefu"></text>
					<view>客服</view>
				</view>
				<view class="cart" @click="cart()">
					<text class="iconfont icon-gouwuche2 icon_kefu"></text>
					<view>购物车</view>
				</view>
			</view>
			<view class="rels">
				<view class="addcart" @click="addcart">加入购物车</view>
				<view class="buy" @click="buys(goods.gid,1)">立即购买</view>
			</view>
		</view>
	</view>
</template>

<script>
	const server = require('../../utils/server');
	// require('../../static/icon/iconfont.css');
	export default {
		data() {
			return {
				gid: 0, //商品id
				url: '/api/group/detail', // 活动商品详情接口
				slide: [], //轮播图
				video: '', //视频
				tab: 0, // 视频和图片切换样式
				goods: [],
				commentlist: [], //获取评论列表
				tag: 0,
				specifications: {}, //商品规格
				imagelist: [],
				group: [],
				tan: false, //弹窗
				message: '',
				norms: {}, //全部商品规格
				tep: [],
				key: "",
				guige: false,
				baoxian: ['https://www.huainanhui.com/upload/image/article/2019/12/02/0936334940.jpg',
					'https://www.huainanhui.com/upload/image/article/2019/11/16/1339053567.png'
				],
				baoxians: ['https://www.huainanhui.com/upload/image/article/2019/10/25/1555365094.jpg',
					'https://www.huainanhui.com/upload/image/article/2019/10/25/1557289313.jpg'
				],
				buy: false,
				number: 1, //数量
				good: [], //推荐商品列表	
			};
		},
		onLoad(option) {
			let that = this;
			uni.showLoading({
				title: '加载中'
			});
			that.gid = option.gid;
			server.getJSON(
				"/api/goods/detail", {
					gid: that.gid
				},
				function(res) {
					if (res.data.goods != null && res.data.goods != "null" && res.data.goods != '') {
						that.slide = res.data.goods.imgs; //轮播图
						that.video = res.data.goods.video[0]; //视频
						that.goods = res.data.goods;
						let shangpin = res.data.goods.norms; // 商品规格
						that.norms = res.data.goods.norms;
						for (var key in that.norms) {
							that.key = key;
							that.tep.push(that.key)
						}
						that.group = res.data.group;
						let i = 0
						Object.keys(shangpin).forEach(function(key) {
							i++;
							if (i <= 5) {
								that.specifications[key] = shangpin[key]
							}
						});
						that.imagelist = res.data.goods.imgs;
						//获取评论
						server.getJSON(
							'/goods/get_comment?ajax=true', {
								span: 3,
								page: 1,
								categoryId: res.data.goods.category
							},
							res => {
								that.commentlist = res.data.list;
							}
						);
					}
				}
			);
			server.getJSON('/goods/recommend_goods/345', res => {
				that.good = res.data;
				uni.hideLoading();
			})
		},
		methods: {
			goback() {
				uni.navigateBack()
			},
			goshare() {

			},
			//预览图片
			image(images) {
				uni.previewImage({
					urls: images,
				});
			},
			imagelists() {
				let that = this;
				uni.previewImage({
					urls: that.imagelist,
				});
			},
			//加入购物车
			addcart() {
				let token = uni.getStorageSync('token');
				let that = this;
				if (token = '' || token == 'null' || token == null || token < 10) {
					that.tan = true;
					that.message = "您未登录,请先登录";
					setTimeout(function() {
						that.tan = false;
						uni.navigateTo({
							url: "/pages/login/login"
						})
					}, 1000)
				} else {
					server.postJSON('/user/cart/add?ajax=true', {
						token: token,
						gid: that.gid,
						number: 1
					}, res => {
						that.tan = true;
						that.message = res.data.message;
						setTimeout(function() {
							that.tan = false;
						}, 1000)
					})
				}
			},
			// 确认订单
			buys(gid, id) {
				// goods.inventory
				let token = uni.getStorageSync('token');
				let that = this;
				if (token === '' || token == null || token < 10) {
					uni.navigateTo({
						url: '../login/login'
					})
				} else {
					if (id == 2) {
						uni.navigateTo({
							url: '../order/confirm_order?gid=' + gid + '&number=' + that.number
						})
					} else {
						if(that.goods.inventory != 0){
							if (that.goods.inventory == 1) {
								uni.navigateTo({
									url: '../order/confirm_order?gid=' + gid + '&number=1'
								})
							} else {
								that.buy = true;
							}
						}else{
							that.message = "商品库存不足";
							that.tan = true;
							setTimeout(function(){
								that.tan = false;
							},1300)
						}
					}
				}
			},
			reduce_add(string) {
				if (string == '-') {
					if (this.number > 1) {
						this.number--
					}
				} else {
					if(this.number<this.goods.inventory){
						this.number++
					}
				}
			},
			// 推荐商品进入详情页
			del(gid) {
				uni.redirectTo({
					url: 'product_details?gid=' + gid
				})
			},
			//购物车
			cart() {
				uni.navigateTo({
					url: '../cart/cart'
				})
			},
			//客服
			kefu() {
				uni.navigateTo({
					url: '../kefu/kefu'
				})
			}
		}
	};
</script>

<style>
	/* 提示 */
	.tan {
		position: fixed;
		top: 60%;
		left: 50%;
		transform: translateX(-50%);
		font-size: 24rpx;
		z-index: 100;
		background: rgba(46, 46, 46, 0.8);
		padding: 20rpx 40rpx;
		color: white;
		border-radius: 16rpx;
		max-width: 100%;
		white-space: nowrap;
	}

	uni-page-body,
	uni-page-refresh {
		height: 100%;
	}

	.backgrounds {
		background: #f5f5f5;
		min-height: 100%;
	}

	.banner {
		width: 750rpx;
		height: 750rpx;
	}

	.swiper-vido {
		width: 750rpx;
		height: 750rpx;
		background: #000000;
		position: relative;
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
		padding: 0 30rpx;
		box-sizing: border-box;
		height: 180rpx;
		background: white;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	.price {
		color: #dd0812;
		font-size: 48rpx;
		font-weight: 600;
		margin-bottom: 10rpx;
	}

	.title {
		font-size: 30rpx;
		font-weight: 600;
	}

	.icons {
		width: 100%;
		margin: 10rpx 0;
		height: 60rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #74181b;
		font-size: 26rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		background: white;
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
	.Comment {
		background: white;
	}

	.comment-title {
		padding: 0 30rpx;
		box-sizing: border-box;
		color: #1c0000;
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 80rpx;
	}

	.colors {
		color: #808080;
	}

	.pinjia {
		text-align: center;
		width: 100%;
		font-size: 30rpx;
		padding-bottom: 30rpx;
	}

	.comment-conent {
		display: flex;
		flex-direction: column;
		padding: 0 36rpx;
		box-sizing: border-box;
		border-top: 1px solid #f3f3f3;
	}

	.title-image {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 26rpx;
		color: #808080;
		height: 80rpx;
	}

	.title-image-size {
		width: 60rpx;
		height: 60rpx;
	}

	.username {
		display: flex;
		align-items: center;
	}

	.user-name {
		color: #1c0000;
		font-size: 26rpx;
		margin-left: 16rpx;
	}

	.time {
		color: #9a9a9a;
		font-size: 26rpx;
	}

	.times {
		margin-left: 20rpx;
	}

	.comment-cont-font {
		word-wrap: break-word;
		color: #808080;
		font-size: 26rpx;
		margin: 30rpx 0;
	}

	.comment-images {
		overflow: auto;
		white-space: nowrap;
		width: 100%;
		/* height: 220rpx; */
		margin-bottom: 30rpx;
	}

	.comment-images::-webkit-scrollbar {
		display: none;
	}

	.comment-image {
		width: 220rpx;
		height: 220rpx;
		margin-right: 10rpx;
	}
	.tabbar {
		width: 100%;
		height: 90rpx;
		font-size: 28rpx;
		font-weight: 600;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background: white;
		margin-top: 10rpx;
	}

	.tag {
		color: #74181B;
	}

	.specifications {
		padding: 0rpx 36rpx;
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
		font-size: 28rpx;
		font-weight: 600;
	}

	.gengduo {
		color: #808080;
		font-size: 26rpx;
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

	.rel {
		width: 30%;
		height: 100%;
		display: flex;
		font-size: 26rpx;
		color: #4A4A4A;
		align-items: center;
		justify-content: space-around;
	}

	.kefu {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		justify-content: space-around;
		padding: 10rpx 0;
		box-sizing: border-box;
	}

	.icon_kefu {
		font-size: 34rpx;
	}

	.cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		justify-content: space-around;
		padding: 10rpx 0;
		box-sizing: border-box;
	}

	.rels {
		width: 70%;
		display: flex;
		height: 100%;
	}

	.addcart {
		width: 50%;
		height: 100%;
		background: #74181B;
		color: #FFFFFF;
		font-size: 30rpx;
		text-align: center;
		line-height: 100rpx;
		font-weight: 600;
	}

	.buy {
		width: 50%;
		background: #DD0812;
		height: 100%;
		color: #FFFFFF;
		font-size: 30rpx;
		text-align: center;
		line-height: 100rpx;
		font-weight: 600;
	}
	/* 识玉轩 */
	.shiyuxuan{
		background: #FFFFFF;
	}
	.fenleipeice2{
		margin-bottom: 8rpx;
		display: flex;
		height: 164rpx;
		background: #F5F5F5;
	}
	.fenleipeice2 image{
		width: 218rpx;
		height: 164rpx;
	}
	.fenleipeice1{
		margin-bottom: 8rpx;
		display: flex;
		height: 230rpx;
		background: #F5F5F5;
	}
	.fenleipeice1 image{
		width: 218rpx;
		height: 230rpx;
	}
	.fenlei{
		padding: 10rpx 30rpx;
	}
	.fenleipeice{
		margin-bottom: 8rpx;
		display: flex;
		height: 204rpx;
		background: #F5F5F5;
	}
	.fenleipeice image{
		width: 218rpx;
		height: 204rpx;
	}
	.wenzi{
		margin-left: 10rpx;
	}
	.fenleititle1{
		font-size: 28rpx;
		line-height: 70rpx;
		font-weight: 550;
	}
	.fenleititle{
		font-size: 28rpx;
		line-height: 50rpx;
		font-weight: 550;
	}
	.fenleiwenzi{
		font-size: 24rpx;
		line-height: 34rpx;
	}
	/* 我们的保障 */
	.ensure{
		margin-bottom: 100rpx;
		background: #FFFFFF;
	}
	.guarantee{
		padding: 0rpx 30rpx;
		width: 690rpx;
		font-size: 24rpx;
		color: #585757;
		margin-bottom: 30rpx;
	}
	.guaranteepiece{
		margin-bottom: 16rpx;
		background: #F5F5F5;
		height: auto;
		padding:20rpx 24rpx;
	}
	.piecetitle{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 60rpx;
		font-weight: 550;
		font-size: 28rpx;
		color: #1C0000;
	}
	.left{
		display: flex;
		line-height: 60rpx;
		align-items: center;
	}
	.leftimage{
		text-align: left;
		align-items: center;
		width: 40rpx;
		height: 50rpx;
	}
	.piecetitle image{
		width: 32rpx;
		height: 32rpx;
	}
	.right{
		font-size: 38rpx;
		color: #74181B;
		opacity: 22%;
	}
	.piecewenzi{
		line-height: 36rpx;
		font-size: 24rpx;
	}
	.piece{
		padding: 16rpx 24rpx;
		display: flex;
		background: #F5F5F5;
		margin-bottom: 10rpx;
	}
	.pieceimage image{
		width: 200rpx;
		height: 144rpx;
	}
	.piecejieshao{
		margin-left: 10rpx;
	}
	.jieshaotitle{
		font-size: 28rpx;
		color: #1C0000;
		line-height: 40rpx;
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
		border-radius: 30rpx 30rpx 0 0;
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

	.images image {
		width: 344rpx;
		height: 244rpx;
	}

	.buy-spring {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		background: rgba(000, 000, 000, 0.5);
		z-index: 100;
		display: flex;
		align-items: flex-end;
	}

	.buys-spring {
		width: 100%;
		height: 532rpx;
		background: white;
		border-radius: 26rpx 26rpx 0 0;
		padding: 30rpx 30rpx 12rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.buy-goods-news {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 218rpx;
	}

	.goods-pricy {
		display: flex;
	}

	.goods-image {
		width: 218rpx;
		height: 218rpx;
	}

	.goods-price-inventory {
		margin-left: 20rpx;
	}

	.goods-price {
		color: #DD0812;
		font-size: 38rpx;
	}

	.inventory {
		color: #585757;
		font-size: 28rpx;
		text-align: right;
		margin-top: 20rpx;
	}

	.btn-buy {
		background: #DD0812;
		color: #FFFFFF;
		font-size: 28rpx;
		height: 90rpx;
		line-height: 90rpx;
		width: 100%;
	}

	.btn {
		width: 78rpx;
		height: 66rpx;
		background: #F5F5F5;
		margin: 0 1px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 34rpx;
		color: #130000;
	}

	.btn_- {
		width: 78rpx;
		height: 66rpx;
		background: #F5F5F5;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 34rpx;
		color: #130000;
	}

	.btns {
		display: flex;
		width: 260rpx;
	}

	.buy-number {
		display: flex;
		justify-content: space-between;
		color: #585757;
		font-size: 28rpx;
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
