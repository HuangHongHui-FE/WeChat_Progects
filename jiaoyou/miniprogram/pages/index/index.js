//index.js
import {request} from "../../request/index.js";

// 


// import crypto from 'crypto-js';
// import { Base64 } from 'js-base64';

// // 计算签名。
// function computeSignature(accessKeySecret, canonicalString) {
//   return crypto.enc.Base64.stringify(crypto.HmacSHA1(canonicalString, accessKeySecret));
// }

// const date = new Date();
// date.setHours(date.getHours() + 1);
// const policyText = {
//   expiration: date.toISOString(), // 设置policy过期时间。
//   conditions: [
//     // 限制上传大小。
//     ["content-length-range", 0, 1024 * 1024 * 1024],
//   ],
// };

// async function getFormDataParams() {
//   // const credentials = await axios.get('/getToken')
//   request({ 
//     url: "/getToken", 
//     header: {'content-type': 'application/json',
//       'Authorization': that.pageData.token
//     }
//   })
//   .then(result => {
//     console.log(result)
//     // 如果token过期
//     if(result.status === 500){
//       that.loginRes()
//       return wx.showToast({
//         title: '出错,请重新提交',
//         icon: 'error',
//         duration: 2000
//       })
//     }

//     if(result.code!=200){
//       return wx.showToast({
//         title: '出错',
//         icon: 'error',
//         duration: 2000
//       })
//     }
//   })

//   const policy = Base64.encode(JSON.stringify(policyText)) // policy必须为base64的string。
//   const signature = computeSignature(credentials.AccessKeySecret, policy)
//   const formData = {
//     OSSAccessKeyId: credentials.AccessKeyId,
//     signature,
//     policy,
//     'x-oss-security-token': credentials.SecurityToken 
//   }
//   return formData
// }

//




// wx.uploadFile({
//   url: host, // 开发者服务器的URL。
//   filePath: filePath,
//   name: 'file', // 必须填file。
//   formData: {
//     key,
//     policy,
//     OSSAccessKeyId: ossAccessKeyId,
//     signature,
//     'x-oss-security-token': securityToken // 使用STS签名时必传。
//   },
//   success: (res) => {
//     if (res.statusCode === 204) {
//       console.log('上传成功');
//     }
//   },
//   fail: err => {
//     console.log(err);
//   }
// });


///


const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    hasUserInfo: false,
    logged: false,
    takeSession: false,
    requestResult: '',
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl'),  // 如需尝试获取用户信息可改为false,
    // 遮罩层标志
    putBodyMask: false,
    putGirlMask: false,
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
    arrayBody4: ["河南理工大学", "焦作大学", "焦作师专"],
    indexBody4: 0,
    // 选择qq微信号
    // arrayBody: ["我的微信号", "我的QQ号"],
    // indexBody: 0,
    // 纸条的生命
    arrayBody2: ["被抽中一次销毁", "被抽中两次销毁", "被抽中三次销毁"],
    indexBody2: 0,
    arrayBody3: ["河南理工大学", "焦作大学", "焦作师专"],
    indexBody3: 0,

    // 放入的学校
    arrayGirl4: ["河南理工大学", "焦作大学", "焦作师专"],
    indexGirl4: 0,
    // 选择qq微信号
    // arrayGirl: ["我的微信号", "我的QQ号"],
    // indexGirl: 0,
    // 纸条的生命
    arrayGirl2: ["被抽中一次销毁", "被抽中两次销毁", "被抽中三次销毁"],
    indexGirl2: 0,
    arrayGirl3: ["河南理工大学", "焦作大学", "焦作师专"],
    indexGirl3: 0,

    // 添加图片的加号
    addMask: true
  },

  pageData: {
    token: ''
  },

  onLoad: function() {
    // formData
    // console.log(formData())

    const that = this
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: false,
      })
    }

    wx.getStorage({
      key: 'token',
      success (res) {
        that.pageData.token = res.data
      },
      fail(res){
        console.log("aaa")
        that.loginRes()
      }
    })
    // this.getUser()


  },

  // 发login
  loginRes: function(){
    console.log("bbb")
    wx.login({
      success: (res) => {
        console.log(res)
        const code = res.code

        // wx.request({
        //   url: 'https://ayugudu.top/login',
        //   header: {'content-type': 'application/json'},
        //   method: 'get',
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
        //     console.log("1q")
        //     let token = result.data
        //     wx.setStorage({
        //       key: "token",
        //       data: token
        //     })
        //   }
        // })
      }
    })
  },

  // getUser: function () {
  //   wx.login({
  //     success: (res) => {
  //       console.log(res)
  //       const code = res.code
        
  //       wx.getUserInfo({
  //         desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  //         success: (res2) => {
  //           console.log(res2)

  //           // wx.request({
  //           //   url: '',
  //           //   method: 'post',
  //           //   data: {
  //           //     code
  //           //   },
  //           //   success: (result) =>{
  //           //     console.log(result)
  //           //   }
  //           // })
  //         }
  //       })


  //       // wx.request({
  //       //   url: '',
  //       //   method: 'post',
  //       //   data: {
  //       //     code
  //       //   },
  //       //   success: (result) =>{
  //       //     console.log(result)
  //       //   }
  //       // })
  //     }

  //   })
  // },

  // getUserProfile() {
  //   // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  //   wx.getUserProfile({
  //     desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  //     success: (res) => {
  //       console.log(res)
  //       this.setData({
  //         avatarUrl: res.userInfo.avatarUrl,
  //         userInfo: res.userInfo,
  //         hasUserInfo: true,
  //       })
  //     }
  //   })
  // },

  // onGetUserInfo: function(e) {
  //   if (!this.data.logged && e.detail.userInfo) {
  //     this.setData({
  //       logged: true,
  //       avatarUrl: e.detail.userInfo.avatarUrl,
  //       userInfo: e.detail.userInfo,
  //       hasUserInfo: true,
  //     })
  //   }
  // },

  // 放入男生纸条
  
  // 
  
  // 点击放入一张男生纸条
  
  
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
  outBody: function(e){
    const that = this

    that.setData({
      outBodyMask: true
    })
  },

  // 点击取出一张男生纸条
  outGirl: function(e){
    const that = this

    that.setData({
      outGirlMask: true
    })
  },

  // 遮罩层点击取消遮罩层
  cancelHide: function(){
    const that = this
    
    that.setData({
      putBodyMask: false,
      outBodyMask: false,
      putGirlMask: false,
      outGirlMask: false,
      srcListBody: [],
      srcListGirl: [],
      textareaBody: '',
      textareaGirl: '',
      numberBody: '',
      numberGirl: ''
    })
  },
  cancelHideOut: function(){
    const that = this
    
    that.setData({
      outBodyMask: false
    })
  },

  // 选择本地图片
  chooseImgBody: function(){
    const that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res)




        const host = 'https://image-test-all.oss-cn-beijing.aliyuncs.com';
        const signature = '<signatureString>';
        const ossAccessKeyId = '<accessKey>';
        const policy = '<policyBase64Str>';
        const key = '<object name>';
        const securityToken = '<x-oss-security-token>';

        wx.uploadFile({
          url: host, // 开发者服务器的URL。
          // filePath: filePath,
          filePath: res.tempFilePaths[0],
          name: 'file', // 必须填file。
          formData: {
            key,
            policy,
            OSSAccessKeyId: ossAccessKeyId,
            signature,
            // 'x-oss-security-token': securityToken // 使用STS签名时必传。
          },
          success: (res) => {
            if (res.statusCode === 204) {
              console.log('上传成功');
            }
          },
          fail: err => {
            console.log(err);
          }
        });

        
        // if(that.data.srcListBody.length + res.tempFilePaths.length > 1){
        //   return wx.showToast({
        //     title: '最多上传5张图片',
        //     icon: 'error',
        //     duration: 2000
        //   })
        // }
        // let srcListCom = that.data.srcListBody.concat(res.tempFilePaths)
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
        
        if(that.data.srcListGirl.length + res.tempFilePaths.length > 5){
          return wx.showToast({
            title: '最多上传5张图片',
            icon: 'error',
            duration: 2000
          })
        }
        let srcListCom = that.data.srcListGirl.concat(res.tempFilePaths)
        that.setData({
          srcListGirl: srcListCom
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
      indexBody2: e.detail.value
    })
  },

  //抽取时 学校的选择
  bindSchoolChangeOut: function(e){
    console.log('picker school发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexBody3: e.detail.value
    })
  },
  // 放入时，学校的选择
  bindSchoolChangePut: function(e){
    console.log('picker  school发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexBody4: e.detail.value
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
      indexGirl2: e.detail.value
    })
  },

  // 女 抽取时 学校的选择
  bindSchoolChangeOutGirl: function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexGirl3: e.detail.value
    })
  },
  // 女  放入时，学校的选择
  bindSchoolChangePutGirl: function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexGirl4: e.detail.value
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
    console.log(e.detail.value)
    this.setData({
      textareaBody: e.detail.value
    })
  },

  // 宣言的输入
  textareaInputGirl: function(e){
    console.log(e.detail.value)
    this.setData({
      textareaGirl: e.detail.value
    })
  },


  // 放入一张男生纸条，点击确认放入
  surePutBodyBtn: function(e){
    const that = this
    if(that.data.numberBody.length === 0){
      return wx.showToast({
        title: '微信号不能为空',
        icon: 'error',
        duration: 2000
      })
    }
    if(that.data.textareaBody.length === 0){
      return wx.showToast({
        title: '请填写交友宣言',
        icon: 'error',
        duration: 2000
      })
    }
    request({ 
      url: "/addNodeDo", 
      header: {'content-type': 'application/json',
        'Authorization': that.pageData.token
      },
      data: {
        location: that.data.indexBody4,
        weChatId: that.data.numberBody,
        picture: "https://pic.imgdb.cn/item/6054223752.jpg",
        life: that.data.indexBody2 + 1,
        des: that.data.textareaBody,
        sex: 1
      }
    })
    .then(result => {
      console.log(result)
      // 如果token过期
      if(result.status === 500){
        that.loginRes()
        return wx.showToast({
          title: '出错,请重新提交',
          icon: 'error',
          duration: 2000
        })
      }

      if(result.code!=200){
        return wx.showToast({
          title: '出错',
          icon: 'error',
          duration: 2000
        })
      }


    })

  },

  // 确认上传女生纸条
  surePutGirlBtn: function(e){
    const that = this
    if(that.data.numberGirl.length === 0){
      return wx.showToast({
        title: '微信号不能为空',
        icon: 'error',
        duration: 2000
      })
    }
    if(that.data.textareaGirl.length === 0){
      return wx.showToast({
        title: '请填写交友宣言',
        icon: 'error',
        duration: 2000
      })
    }
    request({ 
      url: "/addNodeDo", 
      header: {'content-type': 'application/json', 
        'Authorization': that.pageData.token
      },
      data: {
        location: that.data.indexGirl4,
        weChatId: that.data.numberGirl,
        picture: "https://pic.imgdb.cn/item/6054223752.jpg",
        life: that.data.indexGirl2 + 1,
        des: that.data.textareaGirl,
        sex: 2
      }
    })
    .then(result => {
      // 如果token过期
      if(result.status === 500){
        that.loginRes()
        return wx.showToast({
          title: '出错,请重新提交',
          icon: 'error',
          duration: 2000
        })
      }

      console.log(result)
      if(result.code!=200){
        return wx.showToast({
          title: '出错',
          icon: 'error',
          duration: 2000
        })
      }
      // / 
    })
  },

  // 确认抽取一张男生纸条
  sureOutBodyBtn: function(){
    const that = this
    request({ 
      url: "/getUserBoy", 
      header: {'content-type': 'application/json', 
        'Authorization': that.pageData.token
      },
      data: {
        location: that.data.indexBody3
      }
    })
    .then(result => {
      // 如果token过期
      if(result.status === 500){
        that.loginRes()
        return wx.showToast({
          title: '出错,请重新提交',
          icon: 'error',
          duration: 2000
        })
      }

      console.log(result)
      if(result.code!=200){
        return wx.showToast({
          title: '出错',
          icon: 'error',
          duration: 2000
        })
      }

    })
  },

  // 确认抽取一张女生纸条
  sureOutGirlBtn: function(){
    const that = this
    request({ 
      url: "/getUserGirl", 
      header: {'content-type': 'application/json', 
        'Authorization': that.pageData.token
      },
      data: {
        location: that.data.indexGirl3
      }
    })
    .then(result => {
      // 如果token过期
      if(result.status === 500){
        that.loginRes()
        return wx.showToast({
          title: '出错,请重新提交',
          icon: 'error',
          duration: 2000
        })
      }

      console.log(result)
      if(result.code!=200){
        return wx.showToast({
          title: '出错',
          icon: 'error',
          duration: 2000
        })
      }

    })
  }



})
