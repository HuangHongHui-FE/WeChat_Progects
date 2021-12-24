// pages/home/home.js
const app = getApp()
const db = wx.cloud.database()
const _ = db.command

Page({
  /**
   * 页面的初始数据
   */
  data: {
    sexLs: ["男", "女"],
    sexIndex: 0,
    schLs: ["河南理工大学", "焦作大学", "焦作师范"],
    schIndex: 0,
    // 获取的页面数据
    dataList: []
  },
  pageData: {
    page: 0
  },

  // 请求数据(传递两个参数)
  getData: function(sexIndex, schIndex){
    console.log(this.pageData.page)
    const that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    db.collection('body_girl_yun').where({
      sex: sexIndex + 1,  // 数据库里面是男1， 女2
      location: schIndex,
      life: _.gt(0)   // 生命值要大于0
    }).skip(that.pageData.page * 5).limit(5).orderBy('time', 'desc').get().then(result => {
      console.log("1", result)
      wx.stopPullDownRefresh()
      if(result.data.length > 0){
        that.setData({
          dataList: that.data.dataList.concat(result.data)
        })
        wx.hideLoading()
      }else{
        wx.hideLoading()
        this.pageData.page--
        wx.showToast({
          title: '没有更多数据',
          icon: 'none'
        })
      }
    }).catch(
      console.error
    )
  },

  // 性别选择框点击
  bindSexChange: function(e){
    // console.log(e.detail.value)
    // 如果选择的条件变了,才重新发起请求
    if(e.detail.value == this.data.sexIndex){
      console.log('没变')
    }else{
      this.getData(parseInt(e.detail.value), this.data.schIndex)
      this.setData({
        sexIndex: parseInt(e.detail.value)
      })
    }
  },

  // 筛选的学校改变
  bindSchChange: function(e){
    // console.log(e.detail.value)
    // 如果选择的条件变了,才重新发起请求
    if(e.detail.value == this.data.schIndex){
      console.log('没变')
    }else{
      this.getData(this.data.sexIndex, parseInt(e.detail.value))
      this.setData({
        schIndex: parseInt(e.detail.value)
      })
    }
  },

  // 点击抽出
  pullOut(e){
    const that = this
    const item = e.target.dataset.item  // 整个纸条的所有数据
    // console.log(item)
    wx.showModal({
      title: '提示',
      content: '确认抽这张纸条?',
      success (res) {
        // 用户点击确定
        if (res.confirm) {
          wx.showLoading({
            title: '抽取中',
            mask: true
          })
          db.collection('body_girl_yun').where({
            _id: item._id,
            life: _.gt(0)
          }).get().then(res => {
            console.log(res.data[0])
            // 生命值减一
            db.collection('body_girl_yun').where({
              _id: item._id
            }).update({
              data: {
                life: parseInt(item.life) - 1
              }
            }).then( resultUpdate => {
              console.log(resultUpdate)
              wx.showToast({
                title: '抽取成功',
                icon: 'success',
                mask: true
              })
            }).catch(err=>{
              console.log("出错")
              wx.showToast({
                title: err,
                icon: 'error'
              })
            })
            

            // 并将数据添加到 body_girl_yun_put
            db.collection('body_girl_yun_put').add({
              data: {
                picture: item.picture,
                des: item.des,
                location: item.location,
                sex: item.sex,
                weChatId: item.weChatId,
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

              that.setData({
                dataList: []
              })
              that.pageData.page = 0

              that.getData(that.data.sexIndex, that.data.schIndex)
              
            }).catch(err=>{
              wx.showToast({
                title: err,
                icon: 'error'
              })
            })
          })
          
        } else if (res.cancel) {
          wx.showToast({
            title: '取消抽出',
            icon: 'error',
            mask: true
          })
        }
      }
    })
  },

  // 点击默认排序
  bindSort: function(){
    this.setData({
      sexIndex: 0,
      schIndex: 0,
      dataList: []
    })
    this.pageData.page = 0
    this.getData(0, 0)
  },

  // 跳到抽个对象
  goIndex: function(){
    wx.switchTab({
      url: '/pages/index/index',
      success: res => {
        wx.showToast({
          title: '跳转成功',
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 只有在index.js里面获取了openId， 所以如果没了openId要去那个页面获取
    if(app.globalData.openId == ''){
      wx.switchTab({
        url: '/pages/index/index',
        success: res => {
        },
        fail: err => {
          wx.showToast({
            title: err,
            icon: 'error'
          })
        }
      })
    }
    this.getData(0, 0)
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
    this.pageData.page = 0
    this.setData({
      dataList: []
    })
    this.getData(this.data.sexIndex, this.data.schIndex)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const that = this
    that.pageData.page++
    that.getData(that.data.sexIndex, that.data.schIndex)
    // that.setData({

    // })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})