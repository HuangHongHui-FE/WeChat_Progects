//app.js
App({
  //  在应用第一次启动的时候会触发的事件
  onLaunch(){
    //在应用第一次启动的时候  获取用户的个人信息
    console.log("onLaunch");
    //aabbcc
  },

  //  2 应用被用户看到
  onShow(){
    //对应的数据或页面效果 重置
    console.log("onShow");
  },

  //  3 应用被隐藏了
  onHide(){
    //  暂停或者清除定时器
    console.log("Hide")
  },
  
  //  4 应用的代码发生了报错的时候
  onError(err){
    //在应用发生代码报错的时候，收集用户的错误信息，通过异步请求，京错误信息发送到后台
    // console.log("onError");
    console.log(err)
  },

  //  5 页面找不到就会触发
  //  应用第一次启动时，如果找不到第一个入口页面 才会触发
  onPageNotFound(){
    //  如果页面不存在了  通过js的方式来重新跳转页面 重新跳转到第二个首页
    //  不能调到tabbar页面，导航组件类似
    wx.navigateTo({
      url: '/pages/demo09/demo09',
    });
    console.log("onPageNotFound");
  }
})