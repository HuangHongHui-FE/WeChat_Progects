Page({
  onLoad: function (option) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', { data: 'send from opened page' });
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      console.log(data)
    })
  }
})
