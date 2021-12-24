// pages/add/add.js
const db = wx.cloud.database()
const user = db.collection('user')
const mk = db.collection('markers')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lat_error: "",
    lon_error: "",
    latitude_input: "",
    longitude_input: "",
    title: "",
    id: "",
    count: "",
    zhong: 1
  },
  latInput:function(e){
    const that = this
    // console.log(e)
    if (!(e.detail.value <= 90) ||  !(e.detail.value >= 0)){
      that.setData({
        lat_error:"输入的latitude数据有误！"
      })
    }else{
      that.setData({
        lat_error:"",
        latitude_input: e.detail.value
      })
    }
  },

  lonInput:function(e){
    const that = this
    // console.log(e)
    if (!(e.detail.value <= 180) || !(e.detail.value >= 0)){
      that.setData({
        lon_error:"输入的longitude数据有误！"
      })
    }else{
      that.setData({
        lon_error:"",
        longitude_input: e.detail.value
      })
    }
  },


  add_sub:function(e){
    // console.log(e)
    const that = this
    const latitude = that.data.latitude_input
    const longitude = that.data.longitude_input
    const userinfo = wx.getStorageSync('userinfo')
    const markers = wx.getStorageSync('markers')
    const _id = userinfo._id.substr(0, 15)

    if (that.data.lon_error=="输入的longitude数据有误！" || that.data.lat_error=="输入的latitude数据有误！"){
      wx.showModal({
        content: "输入数据都正确才能提交",
        showCancel: false
      })
    }else{
      for(var i=0; i<userinfo.self_markers.length; i++)
      {
        if(userinfo.self_markers[i].latitude == latitude && userinfo.self_markers[i].longitude == longitude)
        {
          that.data.zhong = 0
          wx.showModal({
            content: "此车位已存在",
            showCancel: false
          })
          break
        }
      }
      if(that.data.zhong == 1){
        wx.showLoading({
          title: "提交中",
        })
        if (userinfo.self_markers.length == 0)
        {
          that.setData({
            title: "0" + "--" + _id
          })
        }
        else
        {
          that.setData({
            title: parseInt(userinfo.self_markers[userinfo.self_markers.length-1].title.split("--")[0]) + 1 + "--" + _id
          }) 
        }
  
        // count为了组成 id
        for (var j=0; j<markers.markers.length; j++)
        {
          if (markers.markers[j]._id == _id)
          {
            that.setData({
              count: markers.markers[j].count
            })
                  // 操作id顺序(智能从一开始了)
            for(var i=0; i<userinfo.self_markers.length; i++)
            {
              if(userinfo.self_markers[i].id.toString().slice(0, -6) !== (i+1).toString())
              {
                userinfo.self_markers[i].id = parseInt((i + 1).toString() + that.data.count)
              }
            }
            break;
          }
        }

        // userinfo     push
        userinfo.self_markers.push({
          height: 20,
          iconPath: "../../images/定位.png",
          latitude: latitude,
          longitude: longitude,
          title: that.data.title,
          width: 20,
          id: parseInt((userinfo.self_markers.length+1).toString() + that.data.count.toString())
        })
        // markers    push
        for (var i = 0; i<markers.markers.length; i++)
        {
          if(_id == markers.markers[i]._id)
          {
            markers.markers[i].markers.push({
              height: 20,
              iconPath: "../../images/定位.png",
              latitude: latitude,
              longitude: longitude,
              title: that.data.title,
              width: 20,
              id: parseInt(userinfo.self_markers.length + that.data.count)
            })
          }
          break;
        }
        that.setData({
          latitude_input: "",
          longitude_input: "",
        })
  
        // 更新merkers
        mk.doc(_id).update({  
          // data 传入需要局部更新的数据
          data: {
            markers: userinfo.self_markers
          }
        })
        .then(result=>{
          wx.removeStorageSync("markers");
          wx.setStorageSync('markers', markers);
        }),
  
        // 更新个人self_markers
        user.doc(userinfo._id).update({
          // data 传入需要局部更新的数据
          data: {
            self_markers: userinfo.self_markers
          }
        })  
        .then(result=>{
          wx.removeStorageSync("userinfo");
          wx.setStorageSync('userinfo', userinfo)
          wx.hideLoading()
          wx.showModal({
            content: "提交成功，一天后会其他用户会自动更新车库信息",
            showCancel: false
          })
        })
      }else{
        that.data.zhong = 1
      }



      
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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