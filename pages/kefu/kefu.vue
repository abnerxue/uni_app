<template>
	<view>
		<web-view :webview-styles="webviewStyles" :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			}
		},
		onLoad(option) {
			let that = this;
			that.url = "https://chat.sobot.com/chat/h5/v2/index.html?sysnum=e772a07377c14e239174ee712efa2647";
		}
	}
</script>

<style>

</style>
