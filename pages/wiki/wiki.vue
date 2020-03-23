<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">  
		    <view class="top_view"></view>  
		</view>  
		<!--#endif-->
		<view class="bottoms">
			<view id="tab-bar" class="scroll-h" >
				<view class="scroll-hs">
					<view class="tab-item" @click="change=1">
						<text :class="change==1 ? 'tab-item-title-active' : 'tab-item-title'">买家互动</text>
					</view>
					<view class="tab-item" @click="baike(2)">
						<text :class="change==2 ? 'tab-item-title-active' : 'tab-item-title'" >关于我们</text>
					</view>
					<view class="tab-item" @click="baike(3)">
						<text :class="change==3 ? 'tab-item-title-active' : 'tab-item-title'" >珠宝知识</text>
					</view>
					<view class="tab-item"  @click="baike(4)">
						<text :class="change==4 ? 'tab-item-title-active' : 'tab-item-title'">通证资讯</text>
					</view>
				</view>
			</view>
			<view class="content" v-if="change==1">
				<view class="comment" v-for="get_comment_list in get_comment_list">
					<view class="comment-user">
						<view class="comment-user-message">
							<view class="user-message-img">
								<image :src="get_comment_list.avatar"></image>
								<text class="user-message-name">{{get_comment_list.userName}}</text>
							</view>
							
						</view>
					</view>
					<view class="comment-time">
						<text>{{get_comment_list.postTimeDate}}</text>
					</view>
					<view class="comment-wenzi">
						<text>
							{{get_comment_list.content}}
						</text>
					</view>
					<view class="comment-img">
						<view class="comment-img-img"  v-for=" get_comment_listimages in get_comment_list.images">
							<image :src="get_comment_listimages" @click="images(get_comment_list.images)"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="about" v-if="change==2">
				<view class="about-list" v-for="about in about" @click="article(about.id,about.title)">
					<view class="about-list-title"><text>{{about.title}}</text></view>
					<view><image src="../../static/left.png"></image></view>
				</view>
			</view>
			<view class="kownledge" v-if="change==3">
				<view class="kownledge-content" v-for="zhu in about" @click="article(zhu.id,zhu.title)">
					<view class="kownledge-left">
						<view class="kownledge-title">{{zhu.title}}</view>
						<view class="kownledge-time">{{zhu.updateTime}}</view>
					</view>
					<view class="kownledge-right">
						<image :src="zhu.thumb"></image>
					</view>
				</view>	
			</view>
			<view class="about" v-if="change==4">
				<view class="about-list" v-for="tozheng in about"  @click="article(tozheng.id,tozheng.title)">
					<view class="about-list-title">【通证资讯】<text>{{tozheng.title}}</text></view>
					<view ><image src="../../static/left.png"></image></view>
				</view>
				
			</view>
		</view>
		<bottomtabbar tags="2"></bottomtabbar>
	</view>
</template>

<script>
	import bottomtabbar from 'pages/bottomtabbar/bottomtabbar';
	const server = require('../../utils/server');
	export default {
		data() {
			return {
				change:1,
				get_comment_list:[],//评论列表
				about:[],//关于我们
				data:{
					span:15,
					page:1,
					categoryId:72
				},
				page:1,
			}
		},
		components:{
			bottomtabbar
		},
		methods: {
			baike(changes){
				uni.showLoading({
				    title: '加载中'
				});
				let that = this;
				that.change =changes;
				that.page = 1;
				that.data.page = 1;
				if(changes==2){
					that.data.categoryId = 80; //关于我们
				}else if(changes==3){
					that.data.categoryId = 72; //珠宝知识
				}else if(changes==4){
					that.data.categoryId = 78; //通正资讯
				}
				server.getJSON('/api/article/get_list?ajax=true',that.data,res=>{
					that.about=res.data.list;
					uni.hideLoading();
				})
			},
			// 预览图片
			images(images){
				uni.previewImage({
					urls: images,
				});
			},
			article(id,title){
				uni.navigateTo({
					url:'./article?id='+id+'&title='+title
				})
			}
		},
		onLoad() {
			let that = this;
			uni.showLoading({
			    title: '加载中'
			});
			server.getJSON('/goods/get_comment?ajax=true',{
				span:15,
				page:1,
				categoryId:0
			},res=>{
				uni.hideLoading();
				that.get_comment_list=res.data.list;
			})
		},
		//上拉数据
		onReachBottom() { //触底获取新的商品
			let that = this;
			uni.showLoading({
			    title: '加载中'
			});
			that.page += 1;
			that.data.page += 1;
			if(that.change==1){
				server.getJSON(
					'/goods/get_comment?ajax=true',
					{
						page: that.page,
						span: 10,
						ajax: 'true',
					},
					function(res) {
						if(res!=null){
							 uni.hideLoading();
							 let result = res.data.list;
							 if (result.length > 0) {
							 	for (var i in result) {
							 		that.get_comment_list.push(result[i]);
							 	}
							 }
						}else{
							setTimeout(function() {
								uni.hideLoading();
							}, 5000);
						}
					}
				);
			}else {
				server.getJSON(
					'/api/article/get_list?ajax=true',
					that.data,
					function(res) {
						if(res!=null){
							 uni.hideLoading();
							 let result = res.data.list;
							 if (result.length > 0) {
							 	for (var i in result) {
							 		that.about.push(result[i]);
							 	}
							 }
						}else{
							setTimeout(function() {
								uni.hideLoading();
							}, 5000);
						}
					}
				);
			}
		},
	}
</script>

<style>
	/* 导航栏 */
	.bottoms{
		margin-bottom: 100rpx;
	}
.scroll-h{
	width: 750rpx;
	height: 90rpx;
	flex-direction: row;
	/* uni-tab-item: white-space; */
	white-space: nowrap;
	border-bottom: 1px solid #F1F1F1;
	position: relative;
	background: white;
}
.scroll-hs{
	position: fixed;
	width: 750rpx;
	height: 90rpx;
	flex-direction: row;
	/* uni-tab-item: white-space; */
	white-space: nowrap;
	border-bottom: 1px solid #F1F1F1;
	background: white;
	z-index: 50;
}
.tab-item{
	width: 187rpx;
	height: 100%;
	display: inline-block;
	flex-wrap: nowrap;
	text-align: center;
	float: left;
}
.tab-item-title{
	color: #555;
	font-size: 28rpx;
	line-height: 80rpx;
	/* flex-wrap: nowrap;
	white-space: nowrap; */
	
}
.tab-item-title-active{
	color: #555;
	font-size: 34rpx;
	font-weight: 550;
	line-height: 80rpx;
	color:#74181B;
	padding-bottom: 10rpx;
	border-bottom: 1.5px solid #74181B;
}

.content{
	margin-top: 20rpx;
	padding:0 30rpx ;
}
/* 买家互动 */
.comment{
	margin-top: 60rpx;
	font-size: 26rpx;
	width: 700rpx;
}
.comment-user{
	align-items: center;
	display: flex;
	justify-content: space-between;
}
.user-message-img{
	display: flex;
	align-items: center;
}
.user-message-name{
	font-weight: 550;
	padding-left: 10rpx;

}
.user-message-img image{
	width: 60rpx;
	height: 60rpx;
	border-radius: 30rpx;
}
.comment-time{
	margin-top: 16rpx;
	margin-bottom: 20rpx;
	color: #808080;
	font-size: 24rpx;
}
.comment-wenzi{
	line-height: 40rpx;
	color:#1C0000;
	font-size: 26rpx;
}
.comment-img{
	display: flex;
	width: 700rpx;
	overflow: auto;
}
.comment-img::-webkit-scrollbar {
	display: none;
}
.comment-img-img{
	margin:0rpx 6rpx;
	margin-top: 24rpx;
	width: 218rpx;
	height: 218rpx;
	border-radius: 8rpx;
	background: #303133;
}
.comment-img-img image{
	width: 218rpx;
	height: 218rpx;
}
/* 关于我们 */
.about{
	padding: 0 10rpx;
	font-size: 30rpx;
	font-weight: 550;
}
.about-list{
	display: flex;
	height: 90rpx;
	align-items: center;
	justify-content: space-between;
	width: 730rpx;
	border-bottom: 1px solid #F1F1F1;
}
.about-list-title{
	padding-left: 20rpx;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.about-list image{
	width: 16rpx;
	height: 28rpx;
	margin:0 22rpx;
}
/* 珠宝知识 */
.kownledge{
	margin-bottom: 10rpx;
	padding: 0 10rpx;
}
.kownledge-content{
	padding: 24rpx 0;
	width: 730rpx;
	height: 168rpx;
	align-items: center;
	border-bottom: 1px solid #F5F5F5;
	display: flex;
	justify-content: space-between;
}
.kownledge-left{
	padding: 0 20rpx;
	width: 460rpx;
}
.kownledge-title{
	font-size: 30rpx;
	font-weight: 550;
	word-break: break-all;
	word-wrap: break-word;
}
.kownledge-time{
	padding-top: 88rpx;
	font-size: 26rpx;
	color: #808080;
}
.kownledge-right{
	width: 160rpx;
	height: 160rpx;
	border-radius:10rpx;
	
}
.kownledge-right image{
	width: 160rpx;
	height: 160rpx;
}
</style>
