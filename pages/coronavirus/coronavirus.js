//获取应用实例
var app = getApp()
Page({
  data: {
    // 新闻列表数据
    list: [],
    // 国内疫情统计数据
    statisticsData: [],
    // 疫情提示
    tipsArr: [],
    // 全球疫情统计数据
    globalStatisticsData: [],
    // 疫情统计数据更新时间
    updateTime: 0,

    dataObj: {
      confirmedCount: '累计确诊人数',
      curedCount: '治愈人数',
      currentConfirmedCount: '现存确诊人数',
      deadCount: '死亡人数',
      seriousCount: '重症人数',
      suspectedCount: '疑似感染人数',
    },
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },
  onLoad: function () {
    const {
      dataObj
    } = this.data;
    // 请求疫情数据
    wx.request({
      url: 'https://lab.isaaclin.cn/nCoV/api/overall',
      method: 'GET',
      success: (res) => {
        /**
         * confirmedCount 累计确诊人数
         * curedCount 治愈人数
         * currentConfirmedCount 现存确诊人数
         * deadCount 死亡人数
         * seriousCount 重症人数
         * suspectedCount 疑似感染人数
         * updateTime 更新时间
         * globalStatistics 全球疫情数据
         */
        const {
          confirmedCount,
          curedCount,
          currentConfirmedCount,
          deadCount,
          seriousCount,
          suspectedCount,
          updateTime,
          globalStatistics,
          note1,
          note2,
          note3,
          remark1,
          remark2,
          remark3
        } = res.data.results[0];
        console.log(res.data.results[0]);
        const statisticsDataArr = [{
            text: dataObj.confirmedCount,
            count: confirmedCount,
          },
          {
            text: dataObj.curedCount,
            count: curedCount,
          },
          {
            text: dataObj.currentConfirmedCount,
            count: currentConfirmedCount,
          },
          {
            text: dataObj.deadCount,
            count: deadCount,
          },
          {
            text: dataObj.seriousCount,
            count: seriousCount,
          },
          {
            text: dataObj.suspectedCount,
            count: suspectedCount,
          },
        ]
        const tipsArr = [note1, note2, note3, remark1, remark2, remark3]
        this.setData({
          ...this.data,
          updateTime: new Date(updateTime).toLocaleDateString(),
          statisticsData: statisticsDataArr,
          tipsArr
        })
      },
      fail() {
        console.log('获取错误')
      }
    })
    setTimeout(() => {
      // 请求疫情新闻
      wx.request({
        url: 'https://lab.isaaclin.cn/nCoV/api/news?page=1&num=10',
        method: 'GET',
        success: (res) => {
          console.log(res);
          const data = res.data.results.map((item) => {
            item.pubDate = new Date(Number(item.pubDate)).toLocaleDateString();
            return item;
          })
          this.setData({
            ...this.data,
            list: data,
          })
        },
        fail() {
          console.log('获取错误')
        }
      })
    }, 1000)
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