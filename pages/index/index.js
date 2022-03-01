//获取应用实例
var app = getApp()
const infoExample = {
  title: '见或不见',
  content: `你见，或者不见我
  　　我就在那里
  　　不悲不喜
  　　你念，或者不念我
  　　情就在那里
  　　不来不去
  　　你爱，或者不爱我
  　　爱就在那里
  　　不增不减
  　　你跟，或者不跟我
  　　我的手就在你手里
  　　不舍不弃
  　　来我的怀里
  　　或者
  　　让我住进你的心里
  　　默然相爱
  　　寂静欢喜
  `
}
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
    list: [infoExample, infoExample, infoExample, infoExample, infoExample, infoExample, infoExample, infoExample]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onReachBottom:function(){
    const {
      isLoading
    } = this.data;
    if (isLoading) {
      return;
    }
    this.setData({
      ...this.data,
      isLoading: true,
    }, () => {
      setTimeout(() => {
        this.setData({
          ...this.data,
          isLoading: false,
          list: [...this.data.list, infoExample, infoExample, infoExample, infoExample]
        })
      }, 500)
    })
  },
  /**
   * 监听滚动事件加载信息
   * @param {*} e 
   */
  // onPageScroll: function (e) {
  //   const {
  //     isLoading
  //   } = this.data;
  //   if (isLoading) {
  //     return;
  //   }
  //   const query = wx.createSelectorQuery();
  //   query.select('#page').boundingClientRect((rect) => {
  //     const windowHeight = wx.getSystemInfoSync().windowHeight;
  //     if (windowHeight + e.scrollTop >= rect.height - 96) {
  //       console.log(windowHeight, e.scrollTop, rect.height);
  //       this.setData({
  //         ...this.data,
  //         isLoading: true,
  //       }, () => {
  //         setTimeout(() => {
  //           this.setData({
  //             ...this.data,
  //             isLoading: false,
  //             list: [...this.data.list, infoExample]
  //           })
  //         }, 500)
  //       })
  //     }
  //   }).exec();
  // },

  /**
   * 查看详情
   */
  viewDetails: function (e) {
    const {
      title,
      content
    } = e.currentTarget.dataset.data;
    wx.navigateTo({
      url: '../coronavirusNews/coronavirusNews?info=' + JSON.stringify({
        title,
        summary: content
      }),
    })
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
    // var that = this;
    // wx.request({
    //   url: app.getHeader() + '/getAllPark',
    //   method: 'GET',
    //   header: {
    //     'content-type': 'application/json;charset=UTF-8' // 默认值
    //   },
    //   success: function (res) {
    //     console.log(res);
    //     that.setData({
    //       list: res.data,
    //       //gl: app.getHeader() +'/img'
    //     })
    //   },
    //   fail() {
    //     console.log('获取错误')
    //   }
    // })
  },
  inputBind: function (event) {
    this.setData({
      inputValue: event.detail.value
    })
    console.log('bindInput' + this.data.inputValue)

  },
  suo: function (event) {
    var that = this

    /**
     * keyword string 搜索关键词 ; 这里是 this.data.inputValue
     * start int 分页起始值 ; 这里是 0
     */
    wx.request({
      url: app.getHeader() + '/getParkByParkName',
      data: {
        parkName: this.data.inputValue
      },
      method: 'GET',
      success: function (res1) {
        // console.log(res1.data)
        // console.log(res1.data.parkName)
        if (!that.data.inputValue) {
          //没有搜索词 友情提示
          wx.showToast({
            title: '请重新输入',
            duration: 2000,
          })
        } else if (res1.data == null) {
          //搜索词不存在 友情提示
          wx.showToast({
            title: '关键词不存在',
            duration: 2000,
          })
        } else {
          var a = [{
            feeScale: res1.data.feeScale,
            parkLocation: res1.data.parkLocation,
            parkName: res1.data.parkName,
            parkNumber: res1.data.parkNumber
          }]
          // var searchData = res.data
          that.setData({
            list: a
          })

        }
      },

      fail() {
        console.log('获取错误')
      }

    })


  }
})