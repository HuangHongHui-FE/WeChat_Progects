Page({
  data: {
    ing:[],
    latitude:0,  // 定位的位置
    longitude: 0
  },

  onLoad: function() {
    const that = this
    const userinfo = wx.getStorageSync('userinfo')
    const ing = userinfo.ing
    wx.getLocation({
      type: 'gcj02',
      isHighAccuracy: "true",
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        that.setData({
          latitude:latitude,
          longitude: longitude,
          ing:ing
        })
      },
      fail(err){
        wx.getSetting({
          success: function(res){
            var statu = res.authSetting;
            if (!statu["scope.userLocation"]){
              wx.showModal({
                cancelColor: 'cancelColor',
                title: '请授权当前位置',
                content: '请确认授权您的地理位置，否则地图功能将无法使用',
                success: function(r){
                  // console.log(r)
                  if (r.confirm){
                    wx.openSetting({
                      success: function(data){
                        if (data.authSetting["scope.userLocation"] === "true"){
                          wx.getLocation({
                            type: 'gcj02',
                            isHighAccuracy: "true",
                            success (res) {
                              const latitude = res.latitude
                              const longitude = res.longitude
                              that.setData({
                                latitude:latitude,
                                longitude: longitude,
                                ing:ing
                              })
                            }
                          })
                        }
                      }
                    })
                  }
                }
              })
            }
          }
        })
      }  
    })
  },

  btn_luxian:function(e){
    const item = e.currentTarget.dataset.item
    // item.iconPath="../../images/标记.png"
    // item.height= 25
    // item.width=25
    let plugin = requirePlugin('routePlan');
    let key = 'AEOBZ-V72WX-7SD4U-ZJT55-AHKVK-XHFFB';  //使用在腾讯位置服务申请的key
    let referer = '体测分数计算';   //调用插件的app的名称
    let endPoint = JSON.stringify({  //终点
        'name': item.title,
        'latitude': item.latitude,
        'longitude': item.longitude
    });
    wx.navigateTo({
        url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint,
    });
  },

  btn_daohang:function(e){
    const item = e.currentTarget.dataset.item
    wx.openLocation({
      latitude: parseFloat(item.latitude),
      longitude: parseFloat(item.longitude),
      name: item.title,
      address: "导航到我的车位"
    })
  }
})