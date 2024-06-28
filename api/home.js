

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
    const response = await uni.$http.post('/topmovie', {
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


// 获取即将上映的电影
export const getSoonMovie = async (start,count) => {
  try {
	console.log('getSoonMovie request');
	//const response = await uni.$http.post('/movie/in_theaters',{
    const response = await uni.$http.post('/soonmovie',{
		apikey: uni.$apiKey,start:start,count:count});
	
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


// 获取周电影榜单电影
export const getWeekMovie = async (start,count) => {
  try {
	console.log('getWeekMovie request');
	//const response = await uni.$http.post('/movie/in_theaters',{
    const response = await uni.$http.post('/weekmovie',{
		apikey: uni.$apiKey,start:start,count:count});
	
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

// 获取最新上映电影
export const getNewMovie = async (start,count) => {
  try {
	console.log('getNewMovie request');
	//const response = await uni.$http.post('/movie/in_theaters',{
    const response = await uni.$http.post('/newmovie',{
		apikey: uni.$apiKey,start:start,count:count});
	
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

// 获取电影详情
export const getMovieDetail = async (id) => {
  try {
	console.log('getMovieDetail request');
    const response = await uni.$http.post('/detailmovie',{
		id:id});
	
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