<template>
	<view class="content">
		<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
			:duration="duration" lazy-render>
			
			<swiper-item v-for="item in swiperList" :key="item.id">
				<image :src="item.image" :alt="item.title" mode="widthFix" class="swiper-image"></image>
				 <view class="swiper-desc" v-if="item.title">{{ item.title }}</view>
			</swiper-item>
		</swiper>
		 <!-- <uni-list>
			 <uni-list-item direction="row" v-for="item in stories" :key="item.id" :title="item.title" >
				<template v-slot:body>
					<view class="uni-list-box uni-content">
						<view class="uni-title uni-ellipsis-2">{{item.title}}</view>
						<view class="uni-note">
							<text>{{item.hint}}</text>
						</view>
					</view>
				</template>
			
				<template v-slot:footer>
					<view class="uni-thumb" style="margin: 0;">
						<image :src="item.image" mode="aspectFill"></image>
					</view>
				</template>
			</uni-list-item>
		 </uni-list> -->
		 <!-- 通过 loadMore 组件实现上拉加载效果，如需自定义显示内容，可参考：https://ext.dcloud.net.cn/plugin?id=29 -->
		<uni-list>
		  <template v-for="(item, index) in stories" :key="item.id">
		    <!-- 如果是第一条或者日期有变化，则插入日期分割线 -->
		    <uni-list-item direction="row" v-if="isShowDivider(index)" >
		    <template v-slot:header>
				<view class="uni-divider__content">
				  <text>{{item.date.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')}}</text>
				</view>
				<view class="uni-divider__line"></view>
			</template>
			</uni-list-item>
		
		    <!-- 正常的列表项 -->
		    <uni-list-item direction="row" :title="item.title">
		      <template v-slot:body>
		        <view class="uni-list-box uni-content">
		          <view class="l-title uni-ellipsis-2">{{item.title}}</view>
		          <view class="uni-note">
		            <text>{{item.hint}}</text>
		          </view>
		        </view>
		      </template>
		      <template v-slot:footer>
		        <view class="uni-thumb" style="margin: 0;">
		          <image :src="item.image" mode="aspectFill"></image>
		        </view>
		      </template>
		    </uni-list-item>
		  </template>
		</uni-list>
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
				currentDate: '', // 初始化为今天的日期
				previousDate: '', // 上一个的日期
			}
		},
		onLoad() {
			this.currentDate = this.formatDate(new Date())
			this.previousDate = this.currentDate
		},
		methods: {
			 formatDate(date) {
			  const year = date.getFullYear();
			  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以需要+1
			  const day = String(date.getDate()).padStart(2, '0');
			  return `${year}-${month}-${day}`;
			},
			
			isShowDivider(index) {
				if (this.stories[index].date !== this.previousDate) {
				    this.previousDate = this.stories[index].date;
					console.log(this.previousDate)
					if(index!==0){
						 return true;
					}
				}
				return false;
			},
			
			// 触底之后触发函数，
			getmorenews() {
				//this.loadStatu = true
				//this.listStatus = 'loading'
				//每次滑动都递减一天
				const date_ = new Date(this.currentDate);
				console.log(date_);
				date_.setDate(date_.getDate() - 1); // 日期减一
				//console.log(date_);
				let currentDate_ = this.formatDate(date_);
				console.log('currentDate_:'+currentDate_);
				getZhihuNewsList(currentDate_).then(result => {
					console.log("getZhihuNewsList,result:");
					console.log(result);
					this.currentDate = this.formatDate(date_);
					this.stories = this.stories.concat(result.stories);
				});
			}
		},
		mounted() {
			console.log("mounted")
			console.log('currentDate:'+this.currentDate);
			getZhihuNewsList(this.currentDate).then(result => {
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
			this.getmorenews()
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

	.l-title {
		font-weight: bold;
		font-size: 30rpx;
		color: #3b4144;
	}
	
	.uni-content {
		padding-right: 10rpx;
	}

	.uni-note {
		display: flex;
		margin: 0;
		justify-content: space-between;
	}

	.thumb-image {
		width: 100%;
		height: 100%;
	}

	/*布局和溢出隐藏规则*/
	.ellipsis {
		display: flex;
		overflow: hidden;
	}

	.uni-ellipsis-1 {
		overflow: hidden;
		white-space: nowrap;  /*nowrap;：强制文本在一行内显示，不允许换行*/
		text-overflow: ellipsis;
	}

	/*多行文本的省略效果*/
	.uni-ellipsis-2 {
		overflow: hidden;
		/*表示当文本内容超出所在容器的宽度时，用省略号来代替超出的部分*/
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
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
	
	.date-divider {
	  color: #8f8f94;
	  font-size: 12rpx;
	  font-weight: bold;
	}
	.line-divider {
	  height: 1px;
	  width: 75%;
	  margin-left: 10rpx;
	  margin-top: 15rpx;
	  background-color: #D8D8D8; /* 分割线颜色 */
	}
</style>
