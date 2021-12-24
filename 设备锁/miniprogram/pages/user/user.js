const db = wx.cloud.database()
const user = db.collection('user')
Page({
  data: {
    userinfo: "",
    history: {},
    ing: ""
  },


  onLoad: function(options) {


    // user.doc('isAdmin').watch({
    //   onChange: function(snapshot) {
    //     console.log('snapshot', snapshot)
    //   },
    //   onError: function(err) {
    //     console.error('the watch closed because of error', err)
    //   }
    // })





    // user.where({
    //   name: 'isAdmin' //这里通过名字找到Messages数据集合中叫“老王”的那一条数据，也即为要监控的数据
    // }).watch({
    //   onChange: function (snapshot) {
        
    //     //监控数据发生变化时触发
    //     console.log('docs\'s changed events', snapshot.docChanges)
    //     // console.log('query result snapshot after the event', snapshot.docs)
    //     // console.log('is init data', snapshot.type === 'init')
        

    //   },
    //   onError:(err) => {
    //     console.error(err)
    //   }
    // })
  },
  onShow:function(e){
    const userinfo = wx.getStorageSync('userinfo')
    if(userinfo){
      this.setData({
        userinfo: userinfo
      })
    } 
  },


  getUserProfile(e){
    const that = this
    wx.getUserProfile({
      desc: '用于显示个人资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        that.setData({
          userinfo: res.userInfo
        })

        wx.showLoading({
          title: "授权中",
        })
        wx.cloud.callFunction({
          name: "getOpenId"
        }).then(res=>{
          // console.log(res);
          const openid = res.result.openid
          // 从数据库中查找该用户的openid是否存在
          user.where({_openid:openid}).get().then(result=>{
            if(result.data.length != 0){
              that.setData({
                userinfo: result.data[0]
              })
              // 把刚从数据库获取的self_markers的  定位2  改为  定位
              for(var i=0;i<result.data[0].self_markers.length;i++)
              {
                result.data[0].self_markers[i].iconPath = "../../images/定位.png"
              }
              wx.setStorageSync('userinfo', result.data[0])
              wx.hideLoading()
            }else{
              user.add({
                data:{
                  ...userinfo,  // 所有获取的userinfo信息
                  creatTime: db.serverDate(),
                  ing: [],
                  history: [],
                  isAdmin: false,
                  self_hty:[],
                  self_markers: [],
                  self_money: []
                }
              }).then(res=>{
                // console.log(res);
                user.where({_id:res.id}).get().then(r=>{
                  this.setData({
                    userinfo: r.data[0]
                  })
                  wx.setStorageSync('userinfo', r.data[0])
                  wx.hideLoading()
                })
              })
            }
          })
        })
      },
      fail:(res) => {
        wx.showModal({
          content: "授权登录才能操作",
          showCancel: false
        })
      }
    })

    // const userinfo = that.data.userinfo_all
    // if (!userinfo){
    //   wx.showModal({
    //     content: "授权登录才能操作",
    //     showCancel: false
    //   })
    // }else{
    //   wx.showLoading({
    //     title: "授权中",
    //   })
    //   wx.cloud.callFunction({
    //     name: "getOpenId"
    //   }).then(res=>{
    //     // console.log(res);
    //     const openid = res.result.openid
    //     // 从数据库中查找该用户的openid是否存在
    //     user.where({_openid:openid}).get().then(result=>{
    //       // console.log(result.data.length);
    //       if(result.data.length != 0){
    //         this.setData({
    //           userinfo: result.data[0]
    //         })
    //         // 把刚从数据库获取的self_markers的  定位2  改为  定位
    //         for(var i=0;i<result.data[0].self_markers.length;i++)
    //         {
    //           result.data[0].self_markers[i].iconPath = "../../images/定位.png"
    //         }
    //         wx.setStorageSync('userinfo', result.data[0])
    //         wx.hideLoading()
    //       }else{
    //         user.add({
    //           data:{
    //             ...userinfo,  // 所有获取的userinfo信息
    //             creatTime: db.serverDate(),
    //             ing: [],
    //             history: [],
    //             isAdmin: false,
    //             self_hty:[],
    //             self_markers: [],
    //             self_money: []
    //           }
    //         }).then(res=>{
    //           // console.log(res);
    //           user.where({_id:res.id}).get().then(r=>{
    //             this.setData({
    //               userinfo: r.data[0]
    //             })
    //             wx.setStorageSync('userinfo', r.data[0])
    //             wx.hideLoading()
    //           })
    //         })
    //       }
    //     })
    //   })
    // }
  }
})
