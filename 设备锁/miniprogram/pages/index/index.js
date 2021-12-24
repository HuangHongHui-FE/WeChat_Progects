const app = getApp()
// import { request } from "../../request/request.js";
const db = wx.cloud.database()
const mk = db.collection('markers')

var QQMapWX = require('../../request/qqmap-wx-jssdk');

// 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: 'AEOBZ-V72WX-7SD4U-ZJT55-AHKVK-XHFFB', // 必填
});

Page({
  data: {
    userinfo: "",
    name: "",
    latitude: 34.74725,  // 默认定位位置
    longitude: 113.62503,
    marks:[

    ],
    marks_middle: [],
    polyline: [],
    latitude3: 0,
    longitude3: 0, // 点击标记点
    markers_old: [],
    _id: "",
    scale: 18,
    title: ""
  },

  onLoad: function() {
    const that = this
    wx.getLocation({
      type: "gcj02",
      isHighAccuracy: true,
      success(res){
        that.setData({
          latitude:res.latitude,
          longitude:res.longitude
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
                                scale: 18
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

    // const that = this
    const userinfo = wx.getStorageSync("userinfo")
    const markers_old = wx.getStorageSync("markers")
    if(userinfo){
      that.setData({
        userinfo: true,
      })
    }
    const marks_get = []
    if (!markers_old.marks || Date.now() - markers_old.time > 1000 * 10){
      wx.cloud.callFunction({
        name: "getmarkers"
      }).then(res=>{
        mk.where({}).get().then(r=>{
          // console.log(r)

          // 为了marks在地图上显示全部标记点
          for (var i = 0; i<r.data.length; i++ )
          {
            for(var j=0; j<r.data[i].markers.length; j++)
            {
              marks_get.push(r.data[i].markers[j])
              // 为了把在数据库获取的  定位2  都转换为  定位
              r.data[i].markers[j].iconPath = "../../images/定位.png"
            }
          }

          that.setData({
            marks: marks_get
          })

          wx.setStorageSync('markers', {markers:r.data, time:Date.now()})
        })
      })
    }else{
      var markers = []
      for(var i=0; i<markers_old.markers.length; i++)
      {
        for(var j = 0; j<markers_old.markers[i].markers.length; j++)
        {
          markers.push(markers_old.markers[i].markers[j])
        }
      }
        this.setData({
          marks: markers
        })
    }
  },

  onShow:function(){


    // wx.startLocationUpdateBackground({
    //   success(res) {
    //    console.log('开启后台定位', res)
    //   },
    //   fail(res) {
    //    console.log('开启后台定位失败', res)
    //   }
    //  })
    //  wx.onLocationChange(function(res) {
    //   // console.log('location change', res)

    //  })
  },

  jia_scale:function(e){
    const that = this
    const scale = that.data.scale
    if(scale < 20){
      that.setData({
        scale: scale + 1
      })
    }
  },

  jian_scale:function(e){
    const that = this
    const scale = that.data.scale
    if(scale > 3){
      that.setData({
        scale: scale-1
      })
    }
  },


  getlocation: function(e){
    const that = this;
    wx.getLocation({
      type: 'gcj02',
      isHighAccuracy: "true",
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        that.setData({
          latitude:latitude,
          longitude: longitude,
          scale: 18
        })
      },
      fail(err){
        wx.getSetting({
          success: function(res){
            // console.log(res)
            var statu = res.authSetting;
            if (!statu["scope.userLocation"]){
              wx.showModal({
                cancelColor: 'cancelColor',
                // showCancel: false,
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
                                scale: 18
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


// 点击标记点触发
  markstap: function(e){
    const that = this
    const id = parseInt(e.detail.markerId.toString().slice(0, -6))  // 8
    const count = e.detail.markerId.toString().slice(-6)  // 000001
    const markers = wx.getStorageSync("markers")
    for(var i =0; i<markers.markers.length; i++)
    {
      if (markers.markers[i].count == count)
      {
        that.data._id = markers.markers[i]._id
        that.data.latitude3 = markers.markers[i].markers[id-1].latitude
        that.data.longitude3 = markers.markers[i].markers[id-1].longitude
        that.data.title = markers.markers[i].markers[id-1].title
        break
      }
    }
    mk.where({
      _id: that.data._id
    })
    .get({
      success: function(res) {
        for(var i=0; i<markers.markers.length;i++)
        {
          if(markers.markers[i]._id == res.data[0]._id)
          {
            for(var j=0; j<res.data[0].markers.length; j++)
            {
              if(res.data[0].markers[j].iconPath == "../../images/定位.png")
              {
                res.data[0].markers[j].iconPath = "../../images/定位3.png"
              }
            }
            markers.markers[i] = res.data[0]
            break;
          }
        }
        
        var markers_get = []
        for(var i=0; i<markers.markers.length; i++)
        {
          for(var j = 0; j<markers.markers[i].markers.length; j++)
          {
            markers_get.push(markers.markers[i].markers[j])
          }
        }
        that.setData({
          marks: markers_get,
          marks_middle: [
            {
              latitude: that.data.latitude3,
              longitude: that.data.longitude3,
            }
          ]
        })
      }
    })

    const latitude3 = that.data.latitude3
    const longitude3 = that.data.longitude3

    qqmapsdk.direction({
      mode: 'walking',
      // get_mp: 1,

      to:{
        latitude: latitude3,
        longitude: longitude3
      },
      success: function (res) {
        var ret = res;
        var coors = ret.result.routes[0].polyline, pl = [];
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          pl.push({ latitude: coors[i], longitude: coors[i + 1] })
        }

        pl.unshift({latitude:that.data.latitude, longitude:that.data.longitude})
        pl.push({latitude:latitude3,longitude:longitude3})
        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
        that.setData({
          latitude: pl[0].latitude,
          longitude: pl[0].longitude,
          polyline: [{
            points: pl,
            color: "#0000FF", width: 4
          }]
        })
      },
      fail: function (error) {
        wx.showModal({
          content: "出现小错误，请重试！",
          showCancel: false,
        })
      },
      complete: function (res) {
        // console.log(res);
      }
    })
  },
// 点击地图触发
  getMap_location: function(e){
    // console.log(e)
    const that = this
    that.setData({
      marks_middle: [],
      polyline:[]
    })
  },
  getluxian: function(e){
    // console.log(e)
    const that = this;
    const marks = e.currentTarget.dataset.item

    if(marks.length == 0)
    {
      wx.showModal({
        content: "请先选择要去的车位",
        showCancel: false,
      })
    }else{
      // let plugin = requirePlugin('routePlan');
      let key = 'AEOBZ-V72WX-7SD4U-ZJT55-AHKVK-XHFFB';  //使用在腾讯位置服务申请的key
      let referer = '体测分数计算';   //调用插件的app的名称
      let endPoint = JSON.stringify({  //终点
          'name': that.data.title,
          'latitude': e.currentTarget.dataset.item[0].latitude,
          'longitude': e.currentTarget.dataset.item[0].longitude
      });
      wx.navigateTo({
          url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint,
      });
    }
  },
  getyuyin:function(e){
    // console.log(e)
    const that = this
    wx.openLocation({
      latitude: parseFloat(e.currentTarget.dataset.item[0].latitude),
      longitude: parseFloat(e.currentTarget.dataset.item[0].longitude),
      scale: 18,
      name: that.data.title,
      address: "去选择的车位"
    })

  }
})
