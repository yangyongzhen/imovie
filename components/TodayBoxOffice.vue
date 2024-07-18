<template>
  <view class="today-box-office">
    <view class="header">
      <text class="title">今日票房</text>
      <text class="date">{{ boxOfficeData.day }}</text>
    </view>
	<scroll-view
	   :scroll-x="true"
	   :show-scrollbar="false"
	   class="scroll"
	 >
    <view class="list">
      <view class="item" v-for="(item, index) in topMovies" :key="index">
        <view class="rank">{{ index + 1 }}</view>
        <view class="info">
          <text class="name">{{ item.name }}</text>
          <text class="release-date">{{ item['release date'] }}</text>
          <text class="box-office">票房: {{ item['Box Office Million'] }}</text>
          <text class="share">占比: {{ item['Share of box office'] }}</text>
        </view>
      </view>
    </view>
	 </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      boxOfficeData: {
        day: '',
        Top_1: {},
        Top_2: {},
        Top_3: {},
        Top_4: {},
        Top_5: {},
        Top_6: {},
        Top_7: {},
        Top_8: {}
      }
    };
  },
  computed: {
    topMovies() {
      return [
        this.boxOfficeData.Top_1,
        this.boxOfficeData.Top_2,
        this.boxOfficeData.Top_3,
        this.boxOfficeData.Top_4,
        this.boxOfficeData.Top_5,
        this.boxOfficeData.Top_6,
        this.boxOfficeData.Top_7,
        this.boxOfficeData.Top_8
      ].filter(movie => movie.name);
    }
  },
  mounted() {
    this.fetchBoxOfficeData();
  },
  methods: {
    fetchBoxOfficeData() {
      // 模拟从服务器获取数据
      const mockData = {
        "code": "200",
        "day": "2024年07月18日 11:20",
        "Top_1": { "name": "抓娃娃", "release date": "上映3天 8.17亿", "Box Office Million": "2461.70万", "Share of box office": "68.2%", "Row Films": "42.9%", "Row seats": "52.0%" },
        "Top_2": { "name": "默杀", "release date": "上映16天 9.71亿", "Box Office Million": "532.81万", "Share of box office": "14.7%", "Row Films": "24.7%", "Row seats": "22.0%" },
        "Top_3": { "name": "神偷奶爸4", "release date": "上映7天 1.71亿", "Box Office Million": "284.66万", "Share of box office": "7.8%", "Row Films": "14.9%", "Row seats": "12.8%" },
        "Top_4": { "name": "头脑特工队2", "release date": "上映28天 3.15亿", "Box Office Million": "97.89万", "Share of box office": "2.7%", "Row Films": "3.3%", "Row seats": "2.6%" },
        "Top_5": { "name": "落凡尘", "release date": "上映7天 2078.0万", "Box Office Million": "55.76万", "Share of box office": "1.5%", "Row Films": "3.2%", "Row seats": "2.3%" },
        "Top_6": { "name": "云边有个小卖部", "release date": "上映27天 4.93亿", "Box Office Million": "38.99万", "Share of box office": "1.0%", "Row Films": "2.5%", "Row seats": "1.7%" },
        "Top_7": { "name": "从21世纪安全撤离", "release date": "点映 19.4万", "Box Office Million": "19.44万", "Share of box office": "0.5%", "Row Films": "3.3%", "Row seats": "2.4%" },
        "Top_8": { "name": "谯国夫人", "release date": "上映14天 516.4万", "Box Office Million": "8.46万", "Share of box office": "0.2%", "Row Films": "1.0%", "Row seats": "0.8%" }
      };
      this.boxOfficeData = mockData;
    }
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
  font-size: 14px;
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
  margin-bottom: 10px;
  background-color: #fff;
  padding: 20rpx;
  border-radius: 15rpx;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.rank {
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
  color: #ff9900;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200rpx;
}

.name {
  font-size: 26rpx;
  font-weight: bold;
}

.release-date, .box-office, .share {
  font-size: 14px;
  color: #666;
}
</style>