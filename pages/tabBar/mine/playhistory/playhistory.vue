<template>
	<view class="wrapper">
		
		<uni-list>
		  <template v-for="(item, index) in playrecords" :key="item.id">
		    <!-- 正常的列表项 -->
		    <uni-list-item direction="row" :title="item.mv.title" @click.native=goToVideoPlay(item) link  >
		      <template v-slot:body>
		        <view class="uni-list-box uni-content">
		          <view class="l-title uni-ellipsis-2">{{item.mv.title}}</view>
		          <view class="uni-note">
		            <text>上映:{{item.mv.year}}</text>
					<text>{{item.time}}</text>
		          </view>
		        </view>
		      </template>
		      <template v-slot:footer>
		        <view class="uni-thumb" style="margin: 0;">
		          <image :src="item.mv.images" mode="aspectFill"></image>
		        </view>
		      </template>
		    </uni-list-item>
		  </template>
		</uni-list>
	
	</view>
</template>

<script>
	import history from '@/utils/playhistory.js';
	export default {
		data() {
			return {
				playrecords:[],
			}
		},
		onLoad() {
			console.log('playhistory onLoad');
			history.initPlayHistory();
			this.playrecords = history.getAllPlayRecords();
		},
		methods: {
			goToVideoPlay(item){
				console.log("goToVideoPlay:")
				const mvString = encodeURIComponent(JSON.stringify(item.mv));
				uni.navigateTo({
					url: `/pages/tabBar/index/detail/videoplay/videoplay?id=${item.id}&mv=${mvString}&isHistory=true&playtime=${item.playTime}&tvindex=${item.tvIndex}`
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/uni-ui.scss';
	.wrapper {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		background-color: #F4F4F4;
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
</style>
