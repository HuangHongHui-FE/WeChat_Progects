const app = getApp()
const db = wx.cloud.database()
Page({

  onShareAppMessage() {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: '校园交U'
        })
      }, 2000)
    })
    return {
      title: '加入我们，结交更多校友',
      path: '/pages/history/history',
      promise 
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    active: true,
    dataListPut: [],
    dataListOut: [],
    schoolList: ["河南理工大学", "焦作大学", "焦作师范"],
    // 页数
    pagePut: 0,
    pageOut: 0
  },
  pageData: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    if(app.globalData.openId == ''){
      wx.switchTab({
        url: '/pages/index/index',
        success: res => {
        },
        fail: err => {
          wx.showToast({
            title: err,
            icon: 'error'
          })
        }
      })
    }

    const that = this
    that.getPutData()
  },

  inBtn: function(){
    const that = this
    that.getPutData()
    that.setData({
      active: true,
      pageOut: 0
    })
  },
  outBtn: function(){
    const that = this
    that.getOutData()
    that.setData({
      active: false,
      pagePut: 0
    })
  },
  

  // 获取数据put
  getPutData: function(e){
    const that = this
    if(e == 'pull'){
      wx.showLoading({
        title: '刷新中',
        mask: true
      })
    }else{
      wx.showLoading({
        title: '加载中',
        mask: true
      })
    }
    
    db.collection('body_girl_yun').where({
      openId: app.globalData.openId
    }).limit(10).orderBy('time', 'desc').get().then(res => {
      console.log(res)
      if(e=='pull'){
        wx.stopPullDownRefresh()
      }
      if(res.data.length == 0){
        that.setData({
          dataListPut: res.data
        })
        return wx.showToast({
          title: '没有数据',
          icon: 'none'
        })
      }
      that.setData({
        dataListPut: res.data
      })
      wx.hideLoading()
    }).catch(err=>{
      wx.hideLoading()
      wx.showToast({
        title: '加载数据失败',
        icon: 'error'
      })
    })
  },

  // 上划触底的事件
  getPutDataBottom: function(){
    const that = this
    let pagePut = that.data.pagePut + 1
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    db.collection('body_girl_yun').where({
      openId: app.globalData.openId
    }).skip(pagePut * 10).limit(10).orderBy('time', 'desc').get().then(res => {
      console.log(res)
      wx.hideLoading()
      // 还有数据
      if(res.data.length > 0){
        let all_data = that.data.dataListPut.concat(res.data)
        that.setData({
          dataListPut: all_data,
          pagePut: pagePut
        })
      }else{
        wx.hideLoading()
        wx.showToast({
          title: '没有更多数据',
          icon: 'none'
        })
      }
      
    })
  },

  // 获取数据 out
  getOutData: function(e){
    if(e == 'pull'){
      wx.showLoading({
        title: '刷新中',
        mask: true
      })
    }else{
      wx.showLoading({
        title: '加载中',
        mask: true
      })
    }
    const that = this
    db.collection('body_girl_yun_put').where({
      openId: app.globalData.openId
    }).limit(10).orderBy('time', 'desc').get().then(res => {
      if(e=='pull'){
        wx.stopPullDownRefresh()
      }
      // 没有放入抽取的纸条的数据
      if(res.data.length == 0){
        that.setData({
          dataListOut: res.data
        })
        return wx.showToast({
          title: '没有数据',
          icon: 'none'
        })
      }
      that.setData({
        dataListOut: res.data
      })
      wx.hideLoading()
      
    }).catch(err=>{
      wx.hideLoading()
      wx.showToast({
        title: '加载数据失败',
        icon: 'error'
      })
    })
  },

  // 上划触底的事件
  getOutDataBottom: function(){
    const that = this
    let pageOut = that.data.pageOut + 1
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    db.collection('body_girl_yun_put').where({
      openId: app.globalData.openId
    }).skip(pageOut * 10).limit(10).orderBy('time', 'desc').get().then(res => {
      console.log(res)
      wx.hideLoading()
      // 还有数据
      if(res.data.length > 0){
        let all_data = that.data.dataListOut.concat(res.data)
        that.setData({
          dataListOut: all_data,
          pageOut: pageOut
        })
      }else{
        wx.showToast({
          title: '没有更多数据',
          icon: 'none'
        })
      }
      
    })
  },

  // 删除放入的纸条
  deletePut: function(e){
    const that = this
    const _id = e.target.dataset.id

    wx.showModal({
      title: '提示',
      // content: '确认删除纸条?',
      content: '删除后友友大厅将不可见，确认?',
      success (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中',
            mask: true
          })
          db.collection("body_girl_yun").where({
            _id: _id
          }).remove().then(res => {
            wx.hideLoading()
            if(res.errMsg == 'collection.remove:ok'){
              that.getPutData()
            }else{
              wx.showToast({
                title: '删除失败',
                icon: 'error',
                mask: true
              })
            }
          }).catch(
            console.error
          )
        } else if (res.cancel) {
          wx.showToast({
            title: '删除取消',
            icon: 'error',
            mask: true
          })
        }
      }
    })
  },

  // 删除抽到的纸条
  deleteOut: function(e){
    const that = this
    const _id = e.target.dataset.id

    wx.showModal({
      title: '提示',
      content: '确认删除纸条?',
      success (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中',
            mask: true
          })
          db.collection("body_girl_yun_put").where({
            _id: _id
          }).remove().then(res => {
            wx.hideLoading()
            if(res.errMsg == 'collection.remove:ok'){
              that.getOutData()
            }else{
              wx.showToast({
                title: '删除失败',
                icon: 'error',
                mask: true
              })
            }
          }).catch(
            console.error
          )
          
        } else if (res.cancel) {
          wx.showToast({
            title: '删除取消',
            icon: 'error',
            mask: true
          })
        }
      }
    })
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
    const that = this
    that.setData({
      active: true
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    if(this.data.active == true){
      this.getPutData("pull")
    }else{
      this.getOutData("pull")
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.active==true){
      this.getPutDataBottom()
    }else{
      this.getOutDataBottom()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})