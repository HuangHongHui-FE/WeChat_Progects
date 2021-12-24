// pages/demo17/demo17.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad");
    // onLoad 发送页面请求来初始化页面数据
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide");
  },

  /**
   * 生命周期函数--监听页面卸载  也是可以通过页面跳转来演示
   */
  onUnload: function () {
    console.log("onUnload")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作 先要在app.json中"enablePullDownRefresh": true,
   */
  onPullDownRefresh: function () {
    console.log("onPullDownRefresh");
  },

  /**
   * 页面上拉触底事件的处理函数   可用来上拉加载下一页操作
   */
  onReachBottom: function () {
    console.log("onReachBottom");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("onShareAppMessage");
  },

  /**
   *  页面滚动  就可以触发 
   */
  onPageScroll(){
    console.log("onPageScroll");
  },

  /**
   * 页面尺寸发生变化的时候  触发
   * 小程序发生了横竖屏切换的时候触发
   */
  onresize(){
    console.log("onResize");
  }

  /**
   * 1 必须要求当前页面 也是 tabbar页面
   * 2 点击自己的tab item的时候才会触发
   */
})