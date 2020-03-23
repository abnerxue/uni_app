<template>
	<view>
		<view>
			<swiper class="swipers" :autoplay="swipers.autoplay" interval=false :duration="swipers.duration" :display-multiple-items="swipers.items" >
				<swiper-item class="swipers" v-for="images in image">
					<image :src="images.image"></image>
					<view>{{images.name}}</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swipers:{
					autoplay:true,
					interval:3000,
					duration:1000,
					items:3,
				},
				image:[
					{image:'../../static/ordinary.png',name:'普通会员'},
					{image:'../../static/gold.png',name:'黄金会员'},	
					{image:'../../static/platinum.png',name:'铂金会员'},
					{image:'../../static/diamonds.png',name:'钻石会员'}
				],
			}
		},
		methods: {

		}
	}
</script>

<style>
.swipers{
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
</style>
