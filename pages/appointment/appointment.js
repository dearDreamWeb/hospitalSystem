const {
  getSection,
  getOutpatient,
} = require('../../api/index')
Page({
  data: {
    selected: 0,
    list: [],
    outpatientList: [],
  },
  onShow: async function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
    const res = await getSection();
    if (res.success) {
      const resOutpatient = await getOutpatient({
        sectionId: res.data.items[0].id
      });
      if (resOutpatient.success) {
        this.setData({
          ...this.data,
          selected:0,
          list: res.data.items,
          outpatientList: resOutpatient.data.items
        })
      }
    }
  },
  onReady: function () {
    // 页面渲染完成
  },

  /**
   * 切换科室
   * @param {*} e 
   */
  changeSelected: async function (e) {
    const {
      index,
      item,
    } = e.currentTarget.dataset;
    const res = await getOutpatient({
      sectionId: item.id
    });
    if (res.success) {
      this.setData({
        ...this.data,
        selected: index,
        outpatientList: res.data.items
      })
    }
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