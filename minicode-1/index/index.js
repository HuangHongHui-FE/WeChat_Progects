const app = getApp()

Page({
  jump: function () {
    wx.navigateTo({
      url: './test',
      events: {
        acceptDataFromOpenedPage: function (data) {
          console.log(data)
        },
      },
      success: function (res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'send from opener page' })
      }
    })
  },
})
