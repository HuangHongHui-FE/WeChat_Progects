// pages/self_hty/self_hty.js
Page({

  /**
   * 页面的初始数据
   */
  data:{
    self_money: []
  },
  onLoad: function (options) {
    const that = this
    const userinfo = wx.getStorageSync('userinfo')
    const self_money = userinfo.self_money
    // 转换成正确的格式time,date
    that.setData({
      self_money: self_money
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})