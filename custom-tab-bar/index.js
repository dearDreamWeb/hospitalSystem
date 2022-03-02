Component({
  data: {
    selected: 0,
    color: "#000000",
    selectedColor: "#1396DB",
    allList: [{
      list1: [
        {
          "pagePath": "/pages/index/index",
          "text": "首页",
          "iconPath": "../images/park.png",
          "selectedIconPath": "../images/park1.png"
        },
        {
          "pagePath": "/pages/appointment/appointment",
          "text": "预约就诊",
          "iconPath": "../images/appoint.png",
          "selectedIconPath": "../images/appoint1.png"
        },
        // {
        //   "pagePath": "/pages/rent/rent",
        //   "text": "发布",
        //   "iconPath": "../images/4.png",
        //   "selectedIconPath": "../images/5.png"
        // },
        {
          "pagePath": "/pages/coronavirus/coronavirus",
          "text": "肺炎疫情",
          "iconPath": "../images/announce.png",
          "selectedIconPath": "../images/announce1.png"
        },
        {
          "pagePath": "/pages/my/my",
          "text": "我的",
          "iconPath": "../images/my2.png",
          "selectedIconPath": "../images/my.png"
        }
      ],

      list2: [
        {
          "pagePath": "pages/index/index",
          "text": "首页",
          "iconPath": "../images/park.png",
          "selectedIconPath": "../images/park1.png"
        },
        {
          "pagePath": "pages/appointment/appointment",
          "text": "预约就诊",
          "iconPath": "../images/appoint.png",
          "selectedIconPath": "../images/appoint1.png"
        },
        {
          "pagePath": "pages/rent/rent",
          "text": "发布",
          "iconPath": "../images/4.png",
          "selectedIconPath": "../images/5.png"
        },
        {
          "pagePath": "pages/coronavirus/coronavirus",
          "text": "肺炎疫情",
          "iconPath": "../images/announce.png",
          "selectedIconPath": "../images/announce1.png"
        },
        {
          "pagePath": "pages/my/my",
          "text": "我的",
          "iconPath": "../images/my2.png",
          "selectedIconPath": "../images/my.png"
        }
      ],
    }],
    list: []
  },
  attached() {
    this.setData({
      list: this.data.allList[0].list1
    })
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  },



})