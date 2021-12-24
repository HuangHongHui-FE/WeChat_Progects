Page({
  data:{
    userinfo: "",
  },


  onShow:function(){
    const that = this
    const userinfo = wx.getStorageSync("userinfo")
    if(userinfo){
      that.setData({
        userinfo: true
      })
    }
  }
})