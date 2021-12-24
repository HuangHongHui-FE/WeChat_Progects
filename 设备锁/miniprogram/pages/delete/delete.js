const db = wx.cloud.database()
const user = db.collection('user')
const mk = db.collection('markers')
Page({
  data: {
    markers: [],  // 所有个人的车位
    markers_list: [],  // 删除时，用来循环删除用的
    count: ""
  },
  checkboxChange:function(e){
    const that = this
    const markers_list = e.detail.value
    that.setData({
      markers_list: markers_list
    })
  },
  delete:function(e){
    const that = this
    const markers = wx.getStorageSync('markers')
    const userinfo = wx.getStorageSync('userinfo')
    const _id = userinfo._id.substr(0, 15)
    if(that.data.markers_list.length==0)
    {
      wx.showModal({
        content: "请选择要删除的车位",
        showCancel: false
      })
    }
    else
    {
      wx.showLoading({
        title: "删除中",
      })

      for(var i=1; i <= that.data.markers_list.length; i++)
      {
        // 删除userinfo  self_markers中的
        for(var j=1; j<= userinfo.self_markers.length; j++)
        {
          if (that.data.markers_list[i-1] == userinfo.self_markers[j-1].title)
          {
            userinfo.self_markers.splice(j-1, 1);
            break;
          }
        }

        for(var k=0; k < markers.markers.length; k++)
        {
          for(var p=0; p<markers.markers[k].markers.length;p++)
          {
            if (that.data.markers_list[i-1] == markers.markers[k].markers[p].title)
            {
              markers.markers[k].markers.splice(p,1);
              break;
            }
          }
        }
      }
      // 删除完后的id是缺的

      // count为了组成 id
      for (var j=0; j<markers.markers.length; j++)
      {
        if (markers.markers[j]._id == _id)
        {
          markers.markers[j].markers = userinfo.self_markers
          
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
      that.setData({
        markers: userinfo.self_markers,
        markers_list: []
      })

      
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
          content: "删除成功",
          showCancel: false
        })
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