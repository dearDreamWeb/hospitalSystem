const {
  queryNews
} = require('../../api/index')

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
    duration: 1000,
    inputValue: '',
    isLoading: false,
    list: [],
    page: 1,
    pageSize: 10,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onReachBottom: function () {
    const {
      page,
      pageSize,
      total,
      isLoading
    } = this.data;
    if (isLoading) {
      return;
    }
    if ((page + 1) * pageSize > total) {
      return;
    }
    this.setData({
      ...this.data,
      isLoading: true,
    }, async () => {
      let {
        page,
        pageSize,
        list,
        inputValue
      } = this.data;
      const res = await queryNews({
        searchContext: inputValue,
        page: page + 1,
        pageSize
      });

      this.setData({
        ...this.data,
        list: [...list, ...res.data.items],
        page: page + 1,
        total: res.data.total,
        isLoading: false,
      })
    })
  },

  /**
   * 查看详情
   */
  viewDetails: function (e) {
    const {
      title,
      content
    } = e.currentTarget.dataset.data;
    wx.navigateTo({
      url: '../coronavirusNews/coronavirusNews?title=' + title+'&summary='+encodeURIComponent(content),
    })
  },

  onShow: async function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
    this.getInitNewsList();
  },

  getInitNewsList: async function () {
    const {
      inputValue,
      pageSize
    } = this.data;
    const res = await queryNews({
      searchContext: inputValue,
      page: 1,
      pageSize
    });

    this.setData({
      ...this.data,
      list: res.data.items
    })
  },

  inputBind: function (event) {
    this.setData({
      inputValue: event.detail.value
    })
  },

})