<template>
  <view class="today-box-office">
    <view class="header">
      <text class="title">今日票房</text>
      <text class="date">{{ topMovies.day }}</text>
    </view>
	<scroll-view
	   :scroll-x="true"
	   :show-scrollbar="false"
	   class="scroll"
	 >
    <view class="list">
      <view class="item" v-for="(item, index) in topMovies.data" :key="index">
        <view class="rank">{{ item.top }}</view>
        <view class="info">
          <text class="name">{{ item.name }}</text>
          <text class="release-date">{{ item.release_date }}</text>
          <text class="box-office">票房: {{ item.box_million }}</text>
          <text class="share">占比: {{ item.share_box }}</text>
        </view>
      </view>
    </view>
	 </scroll-view>
  </view>
</template>

<script>
	import { getPiaoMovie } from '@/api/home.js';
	export default {
    data() {
		return {
		  topMovies:{}
		}
	},

	mounted() {
		getPiaoMovie().then(result => {
			//this.swiperList = item;
			console.log("getPiaoMovie,result:");
			console.log(result);
			this.topMovies = result; 
		});
	},
	methods: {
	}
};
</script>

<style scoped>
.today-box-office {
  padding: 10rpx;
  background-color: #f5f5f5;
}

.scroll{
		height:220rpx;
		width: 100%;
		white-space: nowrap;
		margin-top:15rpx;
	}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.title {
  font-size: 30rpx;
  font-weight: bold;
}

.date {
  font-size: 20rpx;
  color: #888;
}

.list {
  display: flex;
  flex-direction: row;
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10rpx;
  background-color: #fff;
  padding: 20rpx;
  border-radius: 15rpx;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.rank {
  font-size: 32rpx;
  font-weight: bold;
  margin-right: 10px;
  color: #ff9900;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 305rpx;
}

.name {
  font-size: 26rpx;
  font-weight: bold;
}

.release-date, .box-office, .share {
  font-size: 20rpx;
  color: #666;
}
</style>