//app.js
App({
  onLaunch: function () {
    // if(!wx.getStorageSync('token')){
      // wx.login({
      //   success: (res) => {
      //     console.log(res)
      //     const code = res.code
  
          // wx.request({
          //   url: '/login',
          //   header: {'content-type': 'application/json'},
          //   method: 'post',
          //   data: {
          //     code
          //   },
          //   success: (result) =>{
          //     console.log(result)
          //     if(result.code!=200){
          //       return wx.showToast({
          //         title: '出错',
          //         icon: 'error',
          //         duration: 2000
          //       })
          //     }
          //     let token = result.data
          //     wx.setStorage({
          //       key: "token",
          //       data: token
          //     })
          //   }
          // })
    //     }
    //   })
    // }
  }
})
