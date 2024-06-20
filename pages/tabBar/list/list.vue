<template>
	<view class="content">
	
		 <!-- <scroll-view  :scroll-y="true"
		 	    :show-scrollbar="false"
		 	    class="scroll"> -->
		<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
			:duration="duration" lazy-render>
			
			<swiper-item v-for="item in swiperList" :key="item.id">
				<image :src="item.image" :alt="item.title" mode="widthFix" class="swiper-image"></image>
				 <view class="swiper-desc" v-if="item.hint">{{ item.hint }}</view>
			</swiper-item>
		</swiper>
		 <uni-list>
			 <uni-list-item direction="row" v-for="item in stories" :key="item.id" :title="item.title" >
				<!-- 通过body插槽定义列表内容显示 -->
				<template v-slot:body>
					<view class="uni-list-box uni-content">
						<view class="uni-title uni-ellipsis-2">{{item.title}}</view>
						<view class="uni-note">
							<text>{{item.hint}}</text>
						</view>
					</view>
				</template>
				<!-- 通过footer插槽自定义图片右侧显示 -->
				<template v-slot:footer>
					<view class="uni-thumb" style="margin: 0;">
						<image :src="item.image" mode="aspectFill"></image>
					</view>
				</template>
			</uni-list-item>
		 </uni-list>
		 <!-- 通过 loadMore 组件实现上拉加载效果，如需自定义显示内容，可参考：https://ext.dcloud.net.cn/plugin?id=29 -->
		<uni-load-more v-if="loadStatu" :status="listStatus" />
	<!-- </scroll-view> -->
	</view>
</template>

<script>
	import { getZhihuNewsList } from '@/api/zhihu.js';
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				// 轮播图的数据列表，默认为空数组
				swiperList:[],
				// 日报数据列表，默认为空数组
				stories:[],
				loadStatu: false, // loading是否显示
				listStatus: 'loading', // loading状态
			}
		},
		onLoad() {

		},
		methods: {

		},
		mounted() {
			console.log("mounted")
			getZhihuNewsList('20240620').then(result => {
				console.log("getZhihuNewsList,result:");
				console.log(result);
				this.stories = result.stories;
				this.swiperList = result.stories;
			});
		},/**
		 * 下拉刷新回调函数
		 */
		onPullDownRefresh() {
			console.log('onPullDownRefresh')
		},
		/**
		 * 上拉加载回调函数
		 */
		onReachBottom() {
			console.log('onReachBottom')
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/uni-ui.scss';

	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}
	
	.content {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.uni-list-box {
		margin-top: 0;
	}

	.uni-content {
		padding-right: 10px;
	}

	.uni-note {
		display: flex;
		margin: 0;
		justify-content: space-between;
	}

	.tips {
		color: #67c23a;
		font-size: 14px;
		line-height: 40px;
		text-align: center;
		background-color: #f0f9eb;
		height: 0;
		opacity: 0;
		transform: translateY(-100%);
		transition: all 0.3s;
	}

	.tips-ani {
		transform: translateY(0);
		height: 40px;
		opacity: 1;
	}

	.list-picture {
		width: 100%;
		height: 145px;
	}

	.thumb-image {
		width: 100%;
		height: 100%;
	}

	.ellipsis {
		display: flex;
		overflow: hidden;
	}

	.uni-ellipsis-1 {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.uni-ellipsis-2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
	}
	
	.scroll{
		height:600rpx;
		width: 100%;
		margin-top:10rpx;
	}
	
	.swiper {
		width: 100%;
		height: 300rpx;
	}
	.swiper-image{
		width: 100%; 
		height: auto;
	}
	
	.swiper-desc {
	  position: absolute;
	  bottom: 20px;
	  left: 0;
	  right: 0;
	  color: #fff;
	  background-color: rgba(0, 0, 0, 0.5);
	  padding: 10px;
	  text-align: center;
	}
	
	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}
</style>
