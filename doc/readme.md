
http://t.yushu.im/v2/movie/top250
https://douban.uieee.com/v2/movie/top250
https://douban.uieee.com/v2/movie/in_theaters  //正在热映
https://douban.uieee.com/v2/movie/coming_soon //即将上映
https://douban.uieee.com/v2/movie/us_box //北美票房
https://douban.uieee.com/v2/movie/new_movies //新片榜
https://douban.uieee.com/v2/movie/weekly //本周口碑榜

//搜索
https://douban.uieee.com/v2/movie/search?q=keyword
//搜索书籍
https://api.douban.com/v2/book/search?q=javascript&count=1
//条目信息
http://t.yushu.im/v2/movie/subject/3
//获取固定数量的数据
http://t.yushu.im/v2/movie/top250?start=0&count=20

curl --location --request POST 'https://api.douban.com/v2/movie/imdb/tt6718170' --data-urlencode 'apikey=0ab215a8b1977939201640fa14c66bab' 

 curl --location --request POST 'https://api.douban.com/v2/movie/top250' --data-urlencode 'apikey=0ab215a8b1977939201640fa14c66bab'
 
  curl --location --request POST 'https://api.douban.com/v2/movie/in_theaters?city=广州&start=0&count=10' --data-urlencode 'apikey=0ab215a8b1977939201640fa14c66bab'