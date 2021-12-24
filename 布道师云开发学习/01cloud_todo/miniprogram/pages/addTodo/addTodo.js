// 云数据库初始化
const db = wx.cloud.database();
const todos = db.collection('todos');

Page({
  data: {
    image: null
  },
  pageData: {
    locationObj: {}
  },

  selectImage:function(e){
    // 选择图片
    wx.chooseImage({
      success: res => {
        console.log(res)
        // 后端上传图片的api
        wx.cloud.uploadFile({
          cloudPath: `${Math.floor(Math.random()* 100000000)}.jpg`,
          filePath: res.tempFilePaths[0]
        }).then(res => {
          console.log(res.fileID)
          this.setData({
            image: res.fileID
          })
        }).catch(err => {
          console.log(err)
        })
      }
    })
  },

  onSubmit: function(event){
    console.log(event)
    todos.add({
      data: {
        title: event.detail.value.title,
        image: this.data.image,
        location: this.pageData.locationObj
      }
    }).then(res => {
      console.log(res)
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        success: res2 => {
          // console.log(res2)
          // 页面跳转并传参
          wx.redirectTo({
            url: `../todoInfo/todoInfo?id=${res._id}`
          })
        }
      })
    })
  },

  chooseLocation: function(){
    wx.chooseLocation({
      success: res => {
        // console.log(res)
        let locationObj = {
          latitude: res.latitude,
          longitude: res.longitude,
          name: res.name,
          address: res.address
        }
        this.pageData.locationObj = locationObj
      }
    })
  }
})