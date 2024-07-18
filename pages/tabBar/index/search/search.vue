<template>
	<view class="wrapper">
		
		<view class="top">
			<view class="search-bar-box">
			 <uni-search-bar 
			       @confirm="onSearch" 
			       placeholder="搜索" 
			       @input="onInput" 
			       :focus="true" 
			       :maxlength="50" 
			       :clearbutton="true"
			     />
			</view>
		</view>
		
		<uni-list>
		  <template v-for="(item, index) in out" :key="item.id">
		    <!-- 正常的列表项 -->
		    <uni-list-item direction="row" :title="item.title" :to="'/pages/tabBar/index/detail/detail?id='+item.id">
		      <template v-slot:body>
		        <view class="uni-list-box uni-content">
		          <view class="l-title uni-ellipsis-2">{{item.title}}</view>
		          <view class="uni-note">
		            <text>{{item.year}}</text>
		          </view>
		        </view>
		      </template>
		      <template v-slot:footer>
		        <view class="uni-thumb" style="margin: 0;">
		          <image :src="item.cover" mode="aspectFill"></image>
		        </view>
		      </template>
		    </uni-list-item>
		  </template>
		</uni-list>
	
	</view>
</template>

<script>
	import { getMovieSearch } from '@/api/search.js';
	export default {
		data() {
			return {
				title: 'Hello',
				out:[],
			}
		},
		onLoad() {

		},
		
		methods: {
			
			onInput(value) {
				console.log('输入内容:', value);
				getMovieSearch(value,0,10).then(result => {
					console.log("getMovieSearch,result:");
					console.log(result);
					this.out = result.data;
				});
			},
			onSearch(value) {
				console.log('搜索内容:', value);
				getMovieSearch(value,0,10).then(result => {
					console.log("getMovieSearch,result:");
					console.log(result);
					this.out = result.data;
				});
			},

		}
	}
</script>

<style scoped lang="scss">
	@import '@/common/uni-ui.scss';
	
	.wrapper {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		background-color: #F4F4F4;
	}
	
	.top {
	}
	
	.search-bar-box {
	  background-color: #55aaff; 
	  padding: 6rpx;
	  border-radius: 4rpx; 
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
