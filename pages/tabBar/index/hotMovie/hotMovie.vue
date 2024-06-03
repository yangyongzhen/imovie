<template>
	<view  class="wrapper">
		<!-- 电影列表 -->
		<scroll-view  :scroll-y="true"
			    :show-scrollbar="false"
			    class="scroll">
			<view class="movie-box">
				<view v-for="(item, index) in hotList" :key="index" class="movie-item">
					<image :src="item.cover"  mode="heightFix"></image>
					 <view class="movie-item-title">{{ ellipsis(item.title) }}</view>
						<view class="movie-rate">
							<uni-rate :readonly="true" :value="item.rate/2" size=12 active-color="#ffaa00" color="#DADADA">
							</uni-rate>
							<text class="movie-rate-t">{{item.rate}}</text>
						</view>
				</view>
			</view>
			<uni-load-more :status="listStatus" :contentText="contentText" v-if="loadStatu"></uni-load-more>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				contentText: {
					contentdown: "加载更多",
					contentrefresh: "正在加载...",
					contentnomore: "我是有底线的"
				},
				movieInfo: [], // 电影列表
				hotList: [
				        {
				          id: 1,
				          cover: '/static/hot/1.jpg',
				          title: '标题提提提提提11111',
				          description: '描述1',
						  rate:10
				        },
				        {
				          id: 2,
				          cover: '/static/hot/2.jpg',
				          title: '标题2',
				          description: '描述2',
						   rate:2
				        },
				        {
				          id: 3,
				          cover: '/static/hot/3.jpg',
				          title: '标题3',
				          description: '描述3',
						   rate:8
				        },
						{
						  id: 4,
						  cover: '/static/hot/4.jpg',
						  title: '标题4',
						  description: '描述4',
						   rate:7
						},
						,
						{
						  id: 5,
						  cover: '/static/hot/5.jpg',
						  title: '标题5',
						  description: '描述5',
						   rate:5
						}
					]
			};
		},
		onReachBottom: function() { // 页面触底触发
			console.log('触底’')
			this.getmorenews()
		},
		methods:{
			// 名称超出显示省略号
			ellipsis(value) {
				if (!value) return '';
				if (value.length > 7) {
					return value.slice(0, 6) + '...'
				}
				return value
			},
			// 触底之后触发函数，
			getmorenews() {
				var that = this
				that.loadStatu = true
				if (that.movieInfo.length > 89) {
					that.listStatus = 'noMore'
					return
				}
				that.listStatus = 'loading'
			}
		}
	}
</script>

<style scoped lang="scss">
.wrapper {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		background-color: #F4F4F4;
	}
	
	.scroll{
		height:100%;
		width: 100%;
		white-space: nowrap;
		margin-top:10rpx;
	}
	
	.movie-box{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding-left: 10rpx;
		padding-right: 10rpx;
	}
	
	.movie-item {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  width: 220rpx;
	  height: 350rpx;
	  margin-right: 22rpx;
	}
	.movie-item-title {
	  color: #606266;
	  font-size: 8rpx;
	  margin-top: 10rpx;
	}
	.movie-rate {
		height: 40rpx;
		line-height: 40rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15rpx;
	}
	
	.movie-rate-t {
		margin-right: 4rpx;
		font-size: 8rpx;
	}
</style>
