// pages/admin_app/admin_app.js
const db = wx.cloud.database()
const sq_admin = db.collection('sq_admin')
const user = db.collection("user")
Page({
  data: {
    _id:"",
    type: ["地下停车场","露天停车场","个人停车位","小型停车场","大型停车场"],
    index: 0,
    region: ['河南省', '焦作市', '山阳区'],
    input_region: "河南省焦作市山阳区",
    input_number: "",
    input_address: "",
    sq_admin:[],
    userinfo_admin: false
  },
  typeChange:function(e){
    console.log(e)
    this.setData({
      index:e.detail.value
    })
  },
  RegionChange:function(e){
    console.log(e)
    this.setData({
      region:e.detail.value,
      input_region: e.detail.value[0] + e.detail.value[1] + e.detail.value[2]
    })
  },
  bind_number:function(e){
    this.setData({
      input_number:parseInt(e.detail.value)
    })
  },
  bind_address:function(e){
    this.setData({
      input_address:e.detail.value
    })
  },
  btn_submit:function(){
    const that = this
    const address = that.data.input_region + that.data.input_address
    wx.cloud.callFunction({
      name: "getSq_admin"
    }).then(res=>{
      // console.log(res);
      const openid = res.result.openid
      sq_admin.where({_openid:openid}).get().then(result=>{
        console.log(result.data[0])
        console.log(that.data.input_address)
        if(result.data.length != 0){
          sq_admin.doc(result.data[0]._id).update({
            data: {
              // 表示将 done 字段置为 true
              creatTime: db.serverDate(),
              userinfo_id:that.data._id,
              number:parseInt(that.data.input_number),
              type:that.data.type[that.data.index],
              address:address
            },
            success: function(res) {
              wx.showModal({
                content: '申请信息更新成功，请耐心等待审核',
                showCancel: false
              })
            }
          })
        }else{
          sq_admin.add({
            data:{
              creatTime: db.serverDate(),
              userinfo_id:that.data._id,
              number:parseInt(that.data.input_number),
              type:that.data.type[that.data.index],
              address:that.data.input_address
            }
          }).then(res=>{
            wx.showModal({
              content: '申请信息提交成功，请耐心等待审核',
              showCancel: false
            })
          })
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    const userinfo = wx.getStorageSync('userinfo')
    user.where({_id: userinfo._id}).get().then(result=>{
      if(result.data[0].isAdmin==true)
      {
        wx.removeStorageSync('userinfo')
        wx.setStorageSync('userinfo', result.data[0])
      }
      this.setData({
        _id:userinfo._id,
        userinfo_admin: result.data[0].isAdmin
      })
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