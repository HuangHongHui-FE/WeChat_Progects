Page({
  data:{
    history: []
  },
  onLoad: function (options) {
    const that = this
    const userinfo = wx.getStorageSync('userinfo')
    const history = userinfo.history
    // 转换成正确的格式time,date
    that.setData({
      history: history
    })
  },
})