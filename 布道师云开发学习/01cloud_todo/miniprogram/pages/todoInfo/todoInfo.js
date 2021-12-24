const db = wx.cloud.database()
const todo = db.collection("todos")

Page({

  data: {
    task: {}
  },

  pageData: {

  },

  onLoad: function (options) {
    this.pageData.id = options.id
    // 根据_id查询数据
    todo.doc(options.id).get().then(res => {
      // console.log(res)
      this.setData({
        task: res.data
      })
    })
  },
  // 导航
  viewLocation(){
    wx.openLocation({
      latitude: this.data.task.location.latitude,
      longitude: this.data.task.location.longitude,
      name: this.data.task.location.name,
      address: this.data.task.location.address
    })
  }
})