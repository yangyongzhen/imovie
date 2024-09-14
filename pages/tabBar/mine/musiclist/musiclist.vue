<template>
	<view class="wrapper">
		
		<view class="top">
			<view class="search-bar-box">
			 <uni-search-bar 
			       @confirm="onSearch" 
			       placeholder="音乐搜索" 
			       @input="onInput" 
			       :focus="false" 
			       :maxlength="50" 
			       :clearbutton="true"
			     />
			</view>
		</view>
	
		<uni-list>
		  <template v-for="(item, index) in topMusic" :key="item.sid">
		    <!-- 正常的列表项 -->
		    <uni-list-item direction="row" :title="item.song" :to="'/pages/tabBar/mine/playsong/playsong?url='+item.url+
			'&song='+item.song +'&sing='+item.sing+'&cover='+item.cover+'&id='+item.sid" >
		      <template v-slot:body>
		        <view class="uni-list-box uni-content">
		          <view class="l-title uni-ellipsis-2">{{item.song}}</view>
		          <view class="uni-note">
		            <text>{{item.sing}}</text>
					<uni-icons type="headphones" color="#ff007f" size="22"></uni-icons>
		          </view>
		        </view>
		      </template>
		      <template v-slot:footer>
		        <view class="uni-thumb" style="margin: 0;">
		          <trigger-lazyLoad  :src="item.cover" mode="aspectFill"></trigger-lazyLoad>
		        </view>
		      </template>
		    </uni-list-item>
		  </template>
		</uni-list>
		<uni-load-more :status="listStatus" :contentText="contentText" v-if="loadStatu"></uni-load-more>
	
	</view>
</template>

<script>
	import { getTopWyMusic,searchMusic } from '@/api/music.js';
	export default {
		data() {
			return {
				title: 'Hello',
				topMusic:[],
				pageNum: 0, // 
				count:0,
				total:0,
				isSearch:false,
				searchVal:'',
				loadStatu: false, // loading是否显示
				listStatus: 'loading', // loading状态
				contentText: {
					contentdown: "加载更多",
					contentrefresh: "正在加载...",
					contentnomore: "到底了"
				},
			}
		},
		onLoad() {
			getTopWyMusic(0,12).then(result => {
				//this.swiperList = item;
				console.log("getTopWyMusic,result:");
				console.log(result);
				this.topMusic = result.data; 
				this.total = result.total;
				this.count = result.count;
				this.pageNum += result.data.length;
			});
		},
		onReachBottom: function() { // 页面触底触发
			console.log('触底’')
			if(!this.isSearch){
				this.getmoreMusics()
			}else{
				console.log('page:'+this.pageNum);
				if(this.pageNum == this.total){
					this.loadStatu = true
					this.listStatus = 'noMore'
					return;
				}else{
					this.loadStatu = true
					this.listStatus = 'more'
				}
				searchMusic(this.searchVal,this.pageNum,10).then(result => {
					console.log("searchMusic,result:");
					console.log(result.data.length);
					if(result.data.length !== 0){
						this.topMusic = this.topMusic.concat(result.data);
						this.count = result.count;
						this.pageNum += result.data.length;
						if(this.pageNum == this.total){
							this.loadStatu = true
							this.listStatus = 'noMore'
						}
					}
				});
			}
		},
		
		methods: {
			
			onInput(value) {
				console.log('输入内容:', value);
				searchMusic(value,0,10).then(result => {
					console.log("searchMusic,result:");
					console.log(result.data.length);
					if(result.data.length !== 0){
						this.isSearch = true;
						this.searchVal = value;
						this.pageNum = 0;
						this.topMusic = result.data;
						this.total = result.total;
						this.count = result.count;
						this.pageNum += result.data.length;
					}
				});
			},
			onSearch(value) {
				console.log('搜索内容:', value);
				// searchMusic(value,0,10).then(result => {
				// 	console.log("searchMusic,result:");
				// 	//console.log(result);
				// 	console.log(result.data.length);
				// 	if(result.data.length !== 0){
				// 		this.isSearch = true;
				// 		this.searchVal = value;
				// 		this.pageNum = 0;
				// 		this.topMusic = result.data;
				// 		this.total = result.total;
				// 		this.count = result.count;
				// 		this.pageNum += result.data.length;
				// 	}
					
				// });
			},
			// 触底之后触发函数，
			getmoreMusics() {
				console.log('page:'+this.pageNum);
				if(this.pageNum == this.total){
					this.loadStatu = true
					this.listStatus = 'noMore'
					return;
				}else{
					this.loadStatu = true
					this.listStatus = 'more'
				}
				
				getTopWyMusic(this.pageNum,12).then(result => {
					//this.swiperList = item;
					//that.loadStatu = false
					console.log("getTopWyMusic,result:");
					console.log(result);
					this.topMusic = this.topMusic.concat(result.data);
					this.count = result.count;
					this.pageNum += result.data.length;
		
					if(this.pageNum == this.total){
						this.loadStatu = true
						this.listStatus = 'noMore'
					}
				});
			}

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
	
	.title{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding-left: 10rpx;
		padding-right: 10rpx;
		margin-top: 15rpx;
	}
	.title-item{
		font-weight: bold;
	}
	.title-more{
		 color: #00aaff;
	}
	
	.search-bar-box {
	  background-color: rgba(85, 170, 255, 0.6);
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
