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

  changeSelected: function (e) {
    const {
      index
    } = e.currentTarget.dataset;
    this.setData({
      ...this.data,
      selected: index
    })
  },

  addButton: function (e) {
    console.log(e);
    var that = this;
    console.log(e.currentTarget.dataset.id)
    var uid = app.globalData.uid
    console.log("uid:" + uid)
    if (!app.globalData.uid) {
      wx.showToast({
        title: '请先注册或登录',
        duration: 1000,
        icon: 'none'
      })
    } else {
      wx.request({
        url: app.getHeader() + '/insertOrder',
        method: 'POST',
        /*header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'//
        },*/
        data: {
          "rentId": e.currentTarget.dataset.id,
          "uid": uid
        },
        success: function (res) {
          console.log(res);
          if (res.data != "failure") {
            wx.showToast({
              title: '预约成功',
              icon: 'success',
              duration: 2000
            })
            // wx.request({
            //   url: app.getHeader() + '/updateParkInfoById',
            //   method: 'post',
            //     header: {
            //       'content-type': 'application/x-www-form-urlencoded;charset=utf-8'//
            //     },
            //   data: { "id": e.currentTarget.dataset.id,"loca": e.currentTarget.dataset.parkAddress,"isOk":0,"uid":uid}
            // })

          } else {
            wx.showToast({
              title: '预约失败',
              duration: 1000,
              icon: 'none'
            })
          }

        },
        fail() {
          console.log('xxsad')
        }
      })
    }
  },
})