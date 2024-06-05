

export const getSwiperList = async () => {
  try {
	console.log('getSwiperList request');
    const response = await uni.$http.get('/swiperdata');
	console.log(response.data.data);
    if (response.statusCode !== 200) {
      uni.showToast({
        title: '数据请求失败! ',
        duration: 1500,
        icon: 'none',
      });
      return [];
    }
    return response.data.data;
  } catch (error) {
    console.error('Network request failed:', error);
    uni.showToast({
      title: '网络请求失败! ',
      duration: 1500,
      icon: 'none',
    });
    return [];
  }
};

export const getTop250 = async (start,count) => {
  try {
	console.log('getTop250 request');
    const response = await uni.$http.post('/movie/top250', {apikey: uni.$apiKey,
	start:start,count:count},{'Content-Type': 'application/x-www-form-urlencoded'});
	console.log(response);
    if (response.statusCode !== 200) {
      uni.showToast({
        title: '数据请求失败! ',
        duration: 1500,
        icon: 'none',
      });
      return [];
    }
    return response.data.list;
  } catch (error) {
    console.error('Network request failed:', error);
    uni.showToast({
      title: '网络请求失败! ',
      duration: 1500,
      icon: 'none',
    });
    return [];
  }
};

// 获取当前正在热映电影
export const getNowHot = async (start,count,city) => {
  try {
	console.log('getNowHot request');
	//const response = await uni.$http.post('/movie/in_theaters',{
    const response = await uni.$http.post('/hotmovie',{
		apikey: uni.$apiKey,city:city,start:start,count:count});
	
	console.log(response);
    if (response.statusCode !== 200) {
      uni.showToast({
        title: '数据请求失败! ',
        duration: 1500,
        icon: 'none',
      });
      return [];
    }
    return response.data;
  } catch (error) {
    console.error('Network request failed:', error);
    uni.showToast({
      title: '网络请求失败! ',
      duration: 1500,
      icon: 'none',
    });
    return [];
  }
};