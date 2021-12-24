const app = getApp()
// import { request } from "../../request/request.js";
const db = wx.cloud.database()
const markers = db.collection('markers')
const user = db.collection("user")
Page({
  data: {
    latitude: 35.21277,
    longitude: 113.2366,  // 到时候要换成近的一个
    self_markers: [

    ],  // 所有管理员车位标记点
    userinfo_admin: false
  },

  onLoad: function (options) {
    const markers_old = wx.getStorageSync("markers")
    
    const marks_get = []
    if (!markers_old.marks || Date.now() - markers_old.time > 1000 * 10){
      wx.cloud.callFunction({
        name: "getmarkers"
      }).then(res=>{
        markers.where({}).get().then(r=>{
          for (var i = 0; i<r.data.length; i++ )
          {
            for(var j=0; j<r.data[i].markers.length; j++)
            {
              marks_get.push(r.data[i].markers[j])
            }
          }
          wx.setStorageSync('markers', {markers:r.data, time:Date.now()})
        })
      })
    }
  },
  markstap: function(e){
    const that = this
    const userinfo = wx.getStorageSync("userinfo")

    // 请求数据库中的最新车位是否空位信息
    user.where({
      _id: userinfo._id
    })
    .get({
      success: function(res) {
        console.log(res)
        for(var i=0; i<res.data[0].self_markers.length; i++)
        {
          if(res.data[0].self_markers[i].iconPath == "../../images/定位.png")
          {
            res.data[0].self_markers[i].iconPath = "../../images/定位3.png"
          } 
        }
        that.setData({
          self_markers:res.data[0].self_markers
        })
      }
    })
  },

  onReady: function () {

  },

  onShow: function () {
    const that = this
    const userinfo = wx.getStorageSync('userinfo')
    user.where({_id: userinfo._id}).get({
      success:function(result){
        console.log(result)
        if(result.data[0].isAdmin==false)
        {
          wx.removeStorageSync('userinfo')
          wx.setStorageSync('userinfo', result.data[0])
        }
        for(var i=0; i<result.data[0].self_markers.length; i++)
        {
          if(result.data[0].self_markers[i].iconPath == "../../images/定位.png")
          {
            result.data[0].self_markers[i].iconPath = "../../images/定位3.png"
          } 
        }
        that.setData({
          userinfo_admin: result.data[0].isAdmin,
          self_markers: result.data[0].self_markers,
          latitude: result.data[0].self_markers[0].latitude,
          longitude: result.data[0].self_markers[0].longitude
        })
      }
    })
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