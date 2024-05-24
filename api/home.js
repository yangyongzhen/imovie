
	
export const getSwiperList = async () => {
  try {
	console.log('getSwiperList request');
    const response = await uni.$http.get('/api/v1/home/swiperdata');
	console.log(response.data.list);
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