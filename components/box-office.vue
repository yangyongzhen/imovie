<!-- components/box-office.vue -->
<template>
  <view class="box-office">
    <view class="title">今日票房 {{ day }}</view>
    <scroll-view scroll-y class="scroll-content">
      <block v-for="(movie, index) in movies" :key="index">
        <view class="movie-item">
          <view class="rank">#{{ index + 1 }}</view>
          <view class="movie-name">{{ movie.name }}</view>
          <view class="movie-details">
            <text>上映: {{ movie['release date'] }}</text>
            <text>票房: {{ movie['Box Office Million'] }}</text>
            <text>占比: {{ movie['Share of box office'] }}</text>
          </view>
        </view>
      </block>
    </scroll-view>
  </view>
</template>

<script>
export default {
  name: 'BoxOffice',
  data() {
    return {
      day: '',
      movies: []
    };
  },
  mounted() {
    this.day = '2024年07月18日 11:20'; // 或者从API获取
    this.movies = this.convertToMoviesArray({
      Top_1: { "name": "抓娃娃", "release date": "上映3天 8.17亿", "Box Office Million": "2461.70万", "Share of box office": "68.2%", "Row Films": "42.9%", "Row seats": "52.0%" },
      Top_2: { "name": "默杀", "release date": "上映16天 9.71亿", "Box Office Million": "532.81万", "Share of box office": "14.7%", "Row Films": "24.7%", "Row seats": "22.0%" }
    });
  },
  methods: {
    convertToMoviesArray(data) {
      return Object.keys(data).map(key => data[key]);
    }
  }
};
</script>

<style scoped>
.box-office {
  display: flex;
  flex-direction: column;
  border: 1rpx solid #ccc;
  padding: 10rpx;
  width: 100%;
}
.title {
  font-size: 32rpx;
  margin-bottom: 10rpx;
}
.scroll-content {
  height: 400rpx;
}
.movie-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10rpx 0;
  border-bottom: 1rpx solid #eee;
}
.rank {
  width: 40rpx;
}
.movie-name {
  flex: 1;
  margin-right: 10rpx;
}
.movie-details {
  display: flex;
  flex-wrap: wrap;
}
.movie-details text {
  margin-right: 20rpx;
}
</style>
