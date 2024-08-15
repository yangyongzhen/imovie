<template>
	<view class="about">
		<view class="content">
			<view class="qrcode">
				<image src="/static/qrcode.png" @longtap="save"></image>
				<text class="tip">公众号[猫青年]</text>
			</view>
			<view class="qrcode">
				<image src="/static/qun.png" @longtap="save"></image>
				<text class="tip">扫码加入qq交流群:92381027,及时获取最新版体验</text>
			</view>
			<view class="desc">
				<text class="code">iMovie</text>
				是一个使用 <text class="code">Vue.js</text> 开发跨平台影视类应用。
				<text>
					声明：本应用是一个为学习跨端应用而开发的一个小程序，仅用于学习研究用途，内容搜索来自互联网。如有侵权，请联系邮箱534117529@qq.com.
				</text>
			</view>
			<view class="source">
				<view class="title">本示例源码获取方式：</view>
				<view class="source-list">
					<view class="source-cell">
						<text space="nbsp">1. 我的博客:</text>
						<uni-link href="https://blog.csdn.net/qq8864" text="https://blog.csdn.net/qq8864/"></uni-link>
					</view>
					<view class="source-cell">
						<text space="nbsp">2. QQ:534117529 WeiXin:yongzhen1111</text>
					</view>
					<view class="source-cell">
						<text space="nbsp">3. 开源地址:</text>
						<uni-link href="https://gitee.com/yyz116/imovie" text="https://gitee.com/yyz116/imovie"></uni-link>
					</view>
					<view class="source-cell">
						<text space="nbsp">4. 下载链接:关注公众号[猫青年],回复"影视"关键词获取。</text>
					</view>
				</view>
			</view>
			<!-- #ifdef APP-PLUS -->
			<button type="primary" @click="share">分享</button>
			<!-- #endif -->
		</view>
		<!-- #ifdef APP-PLUS -->
		<view class="version">
			当前版本：{{version}}
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				providerList: [],
				version: ''
			}
		},
		onLoad(params) {
			console.log('about onload');
			console.log(params);
			// #ifdef APP-PLUS
			this.version = plus.runtime.version;
			uni.getProvider({
				service: 'share',
				success: (result) => {
					const data = [];
					for (let i = 0; i < result.provider.length; i++) {
						switch (result.provider[i]) {
							case 'weixin':
								data.push({
									name: '分享到微信好友',
									id: 'weixin'
								});
								data.push({
									name: '分享到微信朋友圈',
									id: 'weixin',
									type: 'WXSceneTimeline'
								});
								break;
							case 'qq':
								data.push({
									name: '分享到QQ',
									id: 'qq'
								});
								break;
							default:
								break;
						}
					}
					this.providerList = data;
				},
				fail: (error) => {
					console.log('获取分享通道失败' + JSON.stringify(error));
				}
			});
			// #endif
		},
		methods: {
			
			save() {
				// #ifdef APP-PLUS
				uni.showActionSheet({
					itemList: ['保存图片到相册'],
					success: () => {
						plus.gallery.save('https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/app_download.png', function() {
							uni.showToast({
								title: '保存成功',
								icon: 'none'
							});
						}, function() {
							uni.showToast({
								title: '保存失败，请重试！',
								icon: 'none'
							});
						});
					}
				});
				// #endif
			},
			share(e) {
				if (this.providerList.length === 0) {
					uni.showModal({
						title: '当前环境无分享渠道!',
						showCancel: false
					});
					return;
				}
				let itemList = this.providerList.map(function(value) {
					return value.name;
				})
				uni.showActionSheet({
					itemList: itemList,
					success: (res) => {
						let provider = this.providerList[res.tapIndex].id;
						uni.share({
							provider: provider,
							scene: this.providerList[res.tapIndex].type && this.providerList[res.tapIndex].type === 'WXSceneTimeline' ?
								'WXSceneTimeline' : "WXSceneSession",
							type: (provider === "qq") ? 1 : 0,
							title: '欢迎体验uni-app',
							summary: 'uni-app 是一个使用 Vue.js 开发跨平台应用的前端框架',
							imageUrl: 'https://web-assets.dcloud.net.cn/unidoc/zh/8.jpg',
							href: "https://m3w.cn/uniapp",
							success: (res) => {
								console.log("success:" + JSON.stringify(res));
							},
							fail: (e) => {
								uni.showModal({
									content: e.errMsg,
									showCancel: false
								})
							}
						});
					}
				})
			}
		}
	}
</script>

<style>
	page,
	view {
		display: flex;
	}

	page {
		min-height: 100%;
		background-color: #F4F4F4;
	}

	image {
		width: 360rpx;
		height: 360rpx;
	}

	.about {
		flex-direction: column;
		flex: 1;
	}

	.content {
		flex: 1;
		padding: 30rpx;
		flex-direction: column;
		justify-content: center;
	}

	.qrcode {
		display: flex;
		align-items: center;
		flex-direction: column;
		margin-top: 10rpx;
	}

	.qrcode .tip {
		margin-top: 20rpx;
	}

	.desc {
		margin-top: 30rpx;
		display: block;
	}

	.code {
		color: #e96900;
		background-color: #f8f8f8;
	}

	button {
		width: 100%;
		margin-top: 40rpx;
	}

	.version {
		height: 80rpx;
		line-height: 80rpx;
		justify-content: center;
		color: #ccc;
	}

	.source {
		margin-top: 30rpx;
		flex-direction: column;
	}

	.source-list {
		flex-direction: column;
	}

	.link {
		color: #007AFF;
	}
</style>
