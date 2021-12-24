// pages/history/history.js
import {request} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: true,
    dataListPut: [],
    dataListOut: [],
    token: ''
  },
  pageData: {
    token: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    // wx.setStorage({
    //   key: "token",
    //   data: "token"
    // })
    wx.getStorage({
      key: 'token',
      success (res) {
        // console.log(res.data)
        that.pageData.token = res.data
      },
      fail(res){
        that.loginRes()
      }
      
    })
    this.getPutData()
  },

  // 发login
  loginRes: function(){
    wx.login({
      success: (res) => {
        console.log(res)
        const code = res.code

        wx.request({
          url: '/login',
          header: {'content-type': 'application/json'},
          method: 'post',
          data: {
            code
          },
          success: (result) =>{
            console.log(result)
            if(result.code!=200){
              return wx.showToast({
                title: '出错',
                icon: 'error',
                duration: 2000
              })
            }
            let token = result.data
            wx.setStorage({
              key: "token",
              data: token
            })
          }
        })
      }
    })
  },

  inBtn: function(){
    const that = this
    that.getPutData()
    that.setData({
      active: true
    })
  },
  outBtn: function(){
    const that = this
    that.getOutData()
    that.setData({
      active: false
    })
  },

  // 获取数据put
  getPutData: function(){
    const that = this
    request({ 
      url: "/getUserById", 
      header: {'content-type': 'application/json', 
      'Authorization': that.pageData.token
    }})
    .then(result => {
      // 如果token过期
      if(result.status === 500){
        that.loginRes()
        return wx.showToast({
          title: '出错,请重新提交',
          icon: 'error',
          duration: 2000
        })
      }

      if(result.code!=200){
        return wx.showToast({
          title: result.message,
          icon: 'error',
          duration: 2000
        })
      }
      
      console.log("获取put数据成功")
      that.setData({
        dataListPut: result.data
      })
    })
  },

  // 获取数据 out
  getOutData: function(){
    const that = this
    request({ 
      url: "/getUserExtraNode", 
      header: {'content-type': 'application/json', 
      'Authorization': that.pageData.token
    }})
    .then(result => {
      // 如果token过期
      if(result.status === 500){
        that.loginRes()
        return wx.showToast({
          title: '出错,请重新提交',
          icon: 'error',
          duration: 2000
        })
      }

      if(result.code!=200){
        return wx.showToast({
          title: '出错',
          icon: 'error',
          duration: 2000
        })
      }
      console.log("获取put数据成功")
      
      that.setData({
        dataListOut: result.data
      })
    })
  },

  // 删除放入的纸条
  deletePut: function(e){
    const that = this
    const id = e.target.dataset.id

    request({ 
      url: "/delNodeByUser", 
      data: {
        nodeId: id
      },
      header: {'content-type': 'application/json', 
      'Authorization': that.pageData.token
    }})
    .then(result => {
      // 如果token过期
      if(result.status === 500){
        that.loginRes()
        return wx.showToast({
          title: '出错,请重新提交',
          icon: 'error',
          duration: 2000
        })
      }

      if(result.code!=200){
        return wx.showToast({
          title: result.message,
          icon: 'error',
          duration: 2000
        })
      }

      console.log("删除成功")
      that.getPutData()
    })

  },

  // 删除抽到的纸条
  deleteOut: function(e){
    const that = this
    const id = e.target.dataset.id

    request({ 
      url: "/delExtraNode", 
      data: {
        nodeId: id
      },
      header: {'content-type': 'application/json', 
      'Authorization': that.pageData.token
    }})
    .then(result => {

      // 如果token过期
      if(result.status === 500){
        that.loginRes()
        return wx.showToast({
          title: '出错,请重新提交',
          icon: 'error',
          duration: 2000
        })
      }

      if(result.code!=200){
        return wx.showToast({
          title: result.message,
          icon: 'error',
          duration: 2000
        })
      }

      console.log("删除out成功")
      that.getPutData()
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