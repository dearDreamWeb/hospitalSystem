//获取应用实例
var app = getApp()
Page({
  data: {
    imgUrls: [
      '../../images/slider_1.jpeg',
      '../../images/slider_2.jpeg',
      '../../images/slider_3.jpeg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://lab.isaaclin.cn/nCoV/api/news',
      method: 'GET',
      header: {
        'content-type': 'application/json;charset=UTF-8' // 默认值
      },
      success: function (res) {
        console.log(res.data.results);
        const data = res.data.results.map((item) => {
          item.pubDate = new Date(Number(item.pubDate)).toLocaleDateString();
          return item;
        })
        that.setData({
          list: data,
        })
      },
      fail() {
        console.log('获取错误')
      }
    })
  },
  jumpNewsInfo(e) {
    const {
      pubDate,
      title,
      summary,
      infoSource
    } = e.currentTarget.dataset.data;
    const newInfo = {
      pubDate,
      title,
      summary,
      infoSource
    }
    wx.navigateTo({
      url: '../coronavirusNews/coronavirusNews?info=' + JSON.stringify(newInfo),
    })
  }
})