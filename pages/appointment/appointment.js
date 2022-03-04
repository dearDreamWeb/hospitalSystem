var app = getApp()
var uid;
Page({
  data: {
    selected: 0,
    list: [{
        text: '核酸预约',
        children: [{
          text: '核酸预约'
        }]
      },
      {
        text: '内科',
        children: [{
            text: '呼吸内科'
          },
          {
            text: '内分泌科',
          },
          {
            text: '消化内科',
          }
        ]
      },
      {
        text: '外科',
        children: [{
            text: '胃肠外科'
          },
          {
            text: '泌尿外科',
          },
          {
            text: '关节外科',
          }
        ]
      }
    ]
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },
  onReady: function () {
    // 页面渲染完成
  },

  /**
   * 切换科室
   * @param {*} e 
   */
  changeSelected: function (e) {
    const {
      index
    } = e.currentTarget.dataset;
    this.setData({
      ...this.data,
      selected: index
    })
  },

  jumpToDoctor: function (e) {
    const {
      data
    } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/doctors/doctors?data=${JSON.stringify(data)}`,
    })
  }

})