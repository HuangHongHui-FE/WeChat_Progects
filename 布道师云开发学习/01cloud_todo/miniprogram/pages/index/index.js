const db = wx.cloud.database();
const todos = db.collection('todos');
Page({
  data: {
    tasks: []
  },
  onLoad: function (options) {
    // this.getData(res => {});
    this.getData();
  },

  // 监听页面显示
  onShow: function () {

  },

  // 监听用户下拉动作
  onPullDownRefresh: function () {
    this.getData(res => {
      wx.stopPullDownRefresh();
      this.pageData.skip = 0;  // 下拉刷新时，重新请求第一页
    });
    
  },
  // 获取数据, this.setData完后再执行callback匿名函数
  getData: function(callback){
    if(!callback){
      callback = res => {}
    }
    // loading提示框
    wx.showLoading({
      title: '数据加载中',
    })
    todos.skip(this.pageData.skip).get().then(res => {  // 分页查询
      let oldData = this.data.tasks;
      this.setData({
        tasks: oldData.concat(res.data)
      }, res => {
        this.pageData.skip = this.pageData.skip + 20;
        wx.hideLoading();
        callback();
      })
    })
  },

  // 页面上拉触底事件的处理函数
  onReachBottom: function () {
    this.getData();
  },
  pageData: {
    skip: 0
  }
})