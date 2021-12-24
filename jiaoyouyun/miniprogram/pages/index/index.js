const app = getApp()
const db = wx.cloud.database()
const _ = db.command

Page({
  onShareAppMessage() {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: '校园交U'
        })
      }, 2000)
    })
    return {
      title: '加入我们，结交更多校友',
      path: '/pages/index/index',
      promise
    }
  },
  data: {
    // 遮罩层标志
    putBodyMask: false,
    putGirlMask: false,
    xuzhiMask: true,
    // 抽出的遮罩层
    outBodyMask: false,
    outGirlMask: false,
    // 交友宣言
    textareaBody: '',
    textareaGirl: '',
    // qq微信号
    numberBody: '',
    numberGirl: '',
    // 上传图片预览的src
    srcListBody: [],
    srcListGirl: [],

    // 放入的学校
    arrayBody4: ["河南理工大学", "焦作大学", "焦作师范"],
    indexBody4: 0,
    
    // 选择qq微信号
    // arrayBody: ["我的微信号", "我的QQ号"],
    // indexBody: 0,
    // 纸条的生命
    arrayBody2: ["被抽中一次销毁", "被抽中两次销毁", "被抽中三次销毁"],
    indexBody2: 0,
    arrayBody3: ["河南理工大学", "焦作大学", "焦作师范"],
    indexBody3: 0,

    // 放入的学校
    arrayGirl4: ["河南理工大学", "焦作大学", "焦作师范"],
    indexGirl4: 0,
    // 选择qq微信号
    // arrayGirl: ["我的微信号", "我的QQ号"],
    // indexGirl: 0,
    // 纸条的生命
    arrayGirl2: ["被抽中一次销毁", "被抽中两次销毁", "被抽中三次销毁"],
    indexGirl2: 0,
    arrayGirl3: ["河南理工大学", "焦作大学", "焦作师范"],
    indexGirl3: 0,

    // 添加图片的加号
    addMask: true
  },

  pageData: {
    filePath: '',
    cloudPath: ''
  },

  onLoad: function() {
    // formData
    // console.log(formData())

    const that = this
    if (wx.getUserProfile) {
      that.setData({
        canIUseGetUserProfile: false,
      })
    }

    wx.cloud.callFunction({
      name: 'login_yun'
    }).then(res => {
      console.log(res)
      if(res.result.status === 200){
        app.globalData.openId = res.result.user_data.data[0].openId
      }else{
        app.globalData.openId = res.result.openId
      }
    })
  },

  putBody: function(e){
    const that = this

    that.setData({
      putBodyMask: true
    })
  },

  // 点击放入一张男生纸条
  putGirl: function(e){
    const that = this

    that.setData({
      putGirlMask: true
    })
  },

  // 点击取出一张男生纸条
  // outBody: function(e){
  //   const that = this

  //   that.setData({
  //     outBodyMask: true
  //   })
  // },

  // 点击取出一张男生纸条
  // outGirl: function(e){
  //   const that = this

  //   that.setData({
  //     outGirlMask: true
  //   })
  // },

  // 遮罩层点击取消遮罩层
  cancelHide: function(){
    const that = this
    that.pageData = {
      filePath: '',
      cloudPath: ''
    }
    that.setData({
      putBodyMask: false,
      outBodyMask: false,
      putGirlMask: false,
      outGirlMask: false,
      xuzhiMask: false,
      srcListBody: [],
      srcListGirl: [],
      textareaBody: '',
      textareaGirl: '',
      numberBody: '',
      numberGirl: '',
      indexGirl3: 0,
      indexGirl2: 0,
      indexGirl4: 0,
      indexBody3: 0,
      indexBody2: 0,
      indexBody4: 0
    })
  },

  // 选择本地图片
  chooseImgBody: function(){
    const that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res)=> {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        if(res.tempFiles[0].size > 1200000){
          return wx.showToast({
            title: '图片过大',
            icon: 'error',
            duration: 2000
          })
        }

        // if(that.data.srcListBody.length + res.tempFilePaths.length > 1){
        //   return wx.showToast({
        //     title: '最多上传5张图片',
        //     icon: 'error',
        //     duration: 2000
        //   })
        // }
        // let srcListCom = that.data.srcListBody.concat(res.tempFilePaths)

        const filePath = res.tempFilePaths[0]
        let timeStamp = Date.parse(new Date());
        const cloudPath = "image/" + timeStamp + filePath.match(/\.[^.]+?$/)[0]
        that.pageData.filePath = filePath
        that.pageData.cloudPath = cloudPath
        that.setData({
          srcListBody: res.tempFilePaths
        })
      }
    })
  },

  // 选择本地图片
  chooseImgGirl: function(){
    const that = this
    wx.chooseImage({
      count: 5,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        if(res.tempFiles[0].size > 1200000){
          return wx.showToast({
            title: '图片过大',
            icon: 'error',
            duration: 2000
          })
        }
        
        const filePath = res.tempFilePaths[0]
        let timeStamp = Date.parse(new Date());
        const cloudPath = "image/" + timeStamp + filePath.match(/\.[^.]+?$/)[0]
        that.pageData.filePath = filePath
        that.pageData.cloudPath = cloudPath
        that.setData({
          srcListGirl: res.tempFilePaths
        })
      }
    })
  },

  // 选择QQ还是微信
  // bindSexChange: function (e) {
  //   console.log('picker qq发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     indexBody: e.detail.value
  //   })
  // },

  bindLiveChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexBody2: parseInt(e.detail.value)
    })
  },

  //抽取时 学校的选择
  bindSchoolChangeOut: function(e){
    console.log('picker school发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexBody3: parseInt(e.detail.value)
    })
  },
  // 放入时，学校的选择
  bindSchoolChangePut: function(e){
    console.log('picker  school发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexBody4: parseInt(e.detail.value)
    })
  },


  // 女 选择QQ还是微信
  // bindSexChangeGirl: function (e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     indexGirl: e.detail.value
  //   })
  // },
  // 女
  bindLiveChangeGirl: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexGirl2: parseInt(e.detail.value)
    })
  },

  // 女 抽取时 学校的选择
  bindSchoolChangeOutGirl: function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexGirl3: parseInt(e.detail.value)
    })
  },
  // 女  放入时，学校的选择
  bindSchoolChangePutGirl: function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexGirl4: parseInt(e.detail.value)
    })
  },

  // 男的输入微信框
  numberInputBody: function(e){
    this.setData({
      numberBody: e.detail.value
    })
  },

  // 女的输入微信框
  numberInputGirl: function(e){
    this.setData({
      numberGirl: e.detail.value
    })
  },

  // 宣言的输入
  textareaInputBody: function(e){
    this.setData({
      textareaBody: e.detail.value
    })
  },

  // 宣言的输入
  textareaInputGirl: function(e){
    this.setData({
      textareaGirl: e.detail.value
    })
  },


  // 放入一张男生纸条，点击确认放入
  surePutBodyBtn: function(e){
    const that = this
    if(that.data.textareaBody.length === 0){
      return wx.showToast({
        title: '请填写交友宣言',
        icon: 'error',
        duration: 2000
      })
    }
    if(that.pageData.cloudPath=='' && that.pageData.filePath==''){
      return wx.showToast({
        title: '请选择交友图片',
        icon: 'error',
        duration: 2000
      })
    }

    if(that.data.numberBody.length === 0){
      return wx.showToast({
        title: '微信号不能为空',
        icon: 'error',
        duration: 2000
      })
    }
    if(!(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/).test(that.data.numberBody) && !(/^[a-zA-Z]([-_a-zA-Z0-9]{6,20})$/).test(that.data.numberBody)){
      return wx.showToast({
        title: '微信号格式错误',
        icon: 'error',
        duration: 2000
      })
    }
    let cloudPath = that.pageData.cloudPath
    let filePath = that.pageData.filePath
    wx.showLoading({
      title: '图片上传中',
      mask: true
    })
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success: function(res){
        wx.hideLoading()
        console.log(res)
        wx.showLoading({
          title: '信息上传中',
          mask: true
        })
        // 上传图片完成后上传数据
        db.collection("body_girl_yun").add({
          data: {
            location: that.data.indexBody4,
            weChatId: that.data.numberBody,
            picture: res.fileID,
            life: that.data.indexBody2 + 1,
            des: that.data.textareaBody,
            sex: 1,
            openId: app.globalData.openId,
            time: new Date().getTime()
          }
        }).then(result => {
          wx.hideLoading()
          
          console.log(result)
          that.pageData = {
            filePath: '',
            cloudPath: ''
          }
          that.setData({
            putBodyMask: false,
            srcListBody: [],
            textareaBody: '',
            numberBody: ''
          })
          
          wx.switchTab({
            url: '/pages/history/history',
            success: res=>{
              wx.showToast({
                title: '放入纸条成功',
                icon: 'success'
              })
            },
            fail: err => {
              wx.showToast({
                title: err,
                icon: 'error'
              })
            }
          })
          
        }).catch(
          console.error
        )
      }
    })

    
  },

  // 确认上传女生纸条
  surePutGirlBtn: function(e){
    const that = this
    if(that.data.textareaGirl.length < 20){
      return wx.showToast({
        title: '交友宣言太短',
        icon: 'error',
        duration: 2000
      })
    }
    if(that.pageData.cloudPath=='' || that.pageData.filePath==''){
      return wx.showToast({
        title: '请选择交友图片',
        icon: 'error',
        duration: 2000
      })
    }
    if(that.data.numberGirl.length === 0){
      return wx.showToast({
        title: '微信号不能为空',
        icon: 'error',
        duration: 2000
      })
    }
    if(!(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/).test(that.data.numberGirl) && !(/ ^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/).test(that.data.numberGirl)){
      return wx.showToast({
        title: '微信号格式错误',
        icon: 'error',
        duration: 2000
      })
    }
    wx.showLoading({
      title: '图片上传中',
      mask: true
    })
    let cloudPath = that.pageData.cloudPath
    let filePath = that.pageData.filePath
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success: function(res){
        wx.hideLoading()
        wx.showLoading({
          title: '信息上传中',
          mask: true
        })
        console.log(res)
        // 上传图片完成后上传数据
        db.collection("body_girl_yun").add({
          data: {
            location: that.data.indexGirl4,
            weChatId: that.data.numberGirl,
            picture: res.fileID,
            life: parseInt(that.data.indexGirl2) + 1,
            des: that.data.textareaGirl,
            sex: 2,
            openId: app.globalData.openId,
            time: new Date().getTime()
          }
        }).then(result => {
          wx.hideLoading()
          
          that.pageData = {
            filePath: '',
            cloudPath: ''
          }
          that.setData({
            putGirlMask: false,
            srcListGirl: [],
            textareaGirl: '',
            numberGirl: ''
          })

          wx.switchTab({
            url: '/pages/history/history',
            success: res=>{
              wx.showToast({
                title: '放入纸条成功',
                icon: 'success'
              })
            },
            fail: err => {
              wx.showToast({
                title: err,
                icon: 'error'
              })
            }
          })

          console.log(result)
        }).catch(
          console.error
        )
      }
    })

  },

  // 确认抽取一张男生纸条
  sureOutBodyBtn: function(){
    const that = this
    
    wx.showLoading({
      title: '随机抽取中',
      mask: true
    })
    // 随机抽取
    db.collection('body_girl_yun').aggregate().match({
        sex: 1,
        location: parseInt(that.data.indexBody3),
        life: _.gt(0)  // 生命值要大于0
      }).sample({ size: 1}).end()
    .then(res => {
      wx.hideLoading()
      // 数据库没有这个学校的男生的纸条就
      if(res.list.length == 0){
        return wx.showToast({
          title: '此学校暂无纸条',
          icon: 'error',
          mask: true
        })
      }

      console.log(res)
      // 生命值减一， 生命值为0的不会抽出来
      db.collection('body_girl_yun').where({
        _id: res.list[0]._id
      }).update({
        data: {
          life: parseInt(res.list[0].life) - 1
        }
      }).then( resultUpdate => {
        wx.showToast({
          title: '抽取成功',
          icon: 'success',
          mask: true
        })
      }).catch(err=>{
        wx.showToast({
          title: err,
          icon: 'error'
        })
      })
      

      // 并将数据添加到 body_girl_yun_put
      db.collection('body_girl_yun_put').add({
        data: {
          picture: res.list[0].picture,
          des: res.list[0].des,
          location: res.list[0].location,
          sex: res.list[0].sex,
          weChatId: res.list[0].weChatId,
          openId: app.globalData.openId,
          time: new Date().getTime()
        }
      }).then( resultAdd => {

        wx.switchTab({
          url: '/pages/history/history',
          success: res=>{
            wx.showToast({
              title: '抽出纸条成功',
              icon: 'success'
            })
          },
          fail: err => {
            wx.showToast({
              title: err,
              icon: 'error'
            })
          }
        })

        // console.log("数据add"resultAdd)
        that.setData({
          outBodyMask: false
        })
      }).catch(err=>{
        wx.showToast({
          title: err,
          icon: 'error'
        })
      })
    })

    // db.collection('body_girl_yun').where({
    //   sex: 1,
    //   location: parseInt(that.data.indexBody3)
    // }).get().then(res => {
    //   console.log(res)
    // }).catch(
    //   console.error
    // )
  },

  // 确认抽取一张女生纸条
  sureOutGirlBtn: function(){
    wx.showLoading({
      title: '随机抽取中',
      mask: true
    })
    const that = this
    db.collection('body_girl_yun').aggregate().match(
      {
        sex: 2,
        location: parseInt(that.data.indexGirl3),
        life: _.gt(0)
      }
    )
    .sample({
      size: 1
    })
    .end().then(res => {
      wx.hideLoading()
      // 如果没有抽到纸条
      if(res.list.length == 0){
        return wx.showToast({
          title: '此学校暂无纸条',
          icon: 'error',
          mask: true
        })
      }
      db.collection('body_girl_yun').where({
        _id: res.list[0]._id
      }).update({
        data: {
          life: parseInt(res.list[0].life) - 1
        }
      }).then( res => {
        wx.showToast({
          title: '抽取成功',
          icon: 'success',
          mask: true
        })
      }).catch(err=>{
        wx.showToast({
          title: '抽取失败',
          icon: 'error'
        })
      })

      // 并将数据添加到 body_girl_yun_put
      db.collection('body_girl_yun_put').add({
        data: {
          picture: res.list[0].picture,
          des: res.list[0].des,
          location: res.list[0].location,
          sex: res.list[0].sex,
          weChatId: res.list[0].weChatId,
          openId: app.globalData.openId,
          time: new Date().getTime()
        }
      }).then( resultAdd => {
        
        wx.switchTab({
          url: '/pages/history/history',
          success: res=>{
            wx.showToast({
              title: '抽出纸条成功',
              icon: 'success'
            })
          },
          fail: err => {
            wx.showToast({
              title: err,
              icon: 'error'
            })
          }
        })

        console.log("数据add" + resultAdd)
        that.setData({
          outGirlMask: false
        })
      }).catch(err=>{
        wx.showToast({
          title: '抽取失败',
          icon: 'error'
        })
      })

    }).catch(err=>{
      wx.showToast({
        title: '抽取失败',
        icon: 'error'
      })
    })
  },

  // 点击UU须知
  xuzhi: function(){
    this.setData({
      xuzhiMask: true
    })
  },
  // 联系客服
  contact: function(){
    console.log()
  }
})
