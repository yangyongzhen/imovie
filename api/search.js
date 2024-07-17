
// 影视搜索
export const getMovieSearch = async (q,start,count) => {
  try {
	console.log('getMovieSearch request');
	const response = await uni.$http.post('/searchmovie',{
		apikey: uni.$apiKey,q:q,start:start,count:count});
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