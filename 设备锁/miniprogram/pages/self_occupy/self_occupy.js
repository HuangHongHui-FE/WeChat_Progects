// pages/delete/delete.js
const db = wx.cloud.database()
const user = db.collection('user')
const mk = db.collection('markers')
Page({
  data: {
    self_markers: [],  // 所有个人的车位
    markers_list: []  // 占用时，用来循环占用用的
  },
  checkboxChange:function(e){
    const that = this
    const markers_list = e.detail.value
    that.setData({
      markers_list: markers_list
    })
  },
  occupy:function(e){
    const that = this
    const userinfo = wx.getStorageSync('userinfo')
    const _id = userinfo._id.substr(0, 15)
    if(that.data.markers_list.length==0)
    {
      wx.showModal({
        content: "请选择要占用的车位",
        showCancel: false
      })
    }
    else
    {
      const markers_list = that.data.markers_list
      user.where({
        _id: userinfo._id,
      })
      .get({
        success: function(res) {
          console.log(res)
          // res.data 是包含以上定义的两条记录的数组
          const userinfo_new = res.data[0]
          const self_markers = res.data[0].self_markers
          const next = 1

          for(var i=1; i <= markers_list.length; i++)
          {
            for(var j=0; j<self_markers.length; j++)
            {
              if(self_markers[j].title == markers_list[i-1])
              {
                if(self_markers[j].iconPath == "../../images/定位2.png")
                {
                  wx.showModal({
                    content: "所选车位存在占用中的车位",
                    showCancel: false
                  })
                  next = 0
                  break
                }
              }
            }
          }

          if(next==1)
          {
            wx.showLoading({
              title: "正在提交中",
            })
            for(var i=1; i <= that.data.markers_list.length; i++)
            {
              for(var j=1; j<= userinfo_new.self_markers.length; j++)
              {
                if (that.data.markers_list[i-1] == userinfo_new.self_markers[j-1].title)
                {
                  userinfo_new.self_markers[j-1].iconPath = "../../images/定位2.png";
                  break;
                }
              }
            } 
            that.setData({
              self_markers: userinfo_new.self_markers,
              markers_list: []
            })
            mk.doc(_id).update({
              // data 传入需要局部更新的数据
              data: {
                markers:userinfo_new.self_markers
              }
            })

            // 更新个人self_markers
            user.doc(userinfo._id).update({
              // data 传入需要局部更新的数据
              data: {
                self_markers: userinfo_new.self_markers
              }
            })  
            .then(result=>{
              wx.hideLoading()
              wx.showModal({
                content: "占用提交成功",
                showCancel: false
              })
            })
          }
          else
          {
            next = 1
          }
        }
      }) 
    }
  },
  shifang:function(e){
    const that = this
    const userinfo = wx.getStorageSync('userinfo')
    const _id = userinfo._id.substr(0, 15)
    if(that.data.markers_list.length==0)
    {
      wx.showModal({
        content: "请选择要释放的车位",
        showCancel: false
      })
    }
    else
    {
      const markers_list = that.data.markers_list

      user.where({
        _id: userinfo._id,
      })
      .get({
        success: function(res) {
          // res.data 是包含以上定义的两条记录的数组
          const userinfo_new = res.data[0]
          const self_markers = res.data[0].self_markers
          const next = 1
          for(var i=1; i <= markers_list.length; i++)
          {
            for(var j=0; j<self_markers.length; j++)
            {
              if(self_markers[j].title == markers_list[i-1])
              {
                if(self_markers[j].iconPath == "../../images/定位.png")
                {
                  wx.showModal({
                    content: "所选车位存在空闲的车位",
                    showCancel: false
                  })
                  next = 0
                  break
                }
              }
            }
          }
          if(next==1)
          {
            wx.showLoading({
              title: "正在提交中",
            })
            for(var i=1; i <= that.data.markers_list.length; i++)
            {
              for(var j=1; j<= userinfo_new.self_markers.length; j++)
              {
                if (that.data.markers_list[i-1] == userinfo_new.self_markers[j-1].title)
                {
                  userinfo_new.self_markers[j-1].iconPath = "../../images/定位.png";
                  break;
                }
              }
            } 
            that.setData({
              self_markers: userinfo_new.self_markers,
              markers_list: []
            })
            mk.doc(_id).update({
              // data 传入需要局部更新的数据
              data: {
                markers:userinfo_new.self_markers
              }
            })

            user.doc(userinfo._id).update({
              // data 传入需要局部更新的数据
              data: {
                self_markers: userinfo_new.self_markers
              }
            })  
            .then(result=>{

              wx.hideLoading()
              wx.showModal({
                content: "释放提交成功",
                showCancel: false
              })
            })
          }
          else
          {
            next = 1
          }
        }
      }) 
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
    const userinfo = wx.getStorageSync('userinfo')
    this.setData({
      markers: userinfo.self_markers
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