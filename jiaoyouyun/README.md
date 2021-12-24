## 1 登录



| 地址GET  | /login                                                       |
| -------- | ------------------------------------------------------------ |
| 请求参数 | code值                                                       |
| 描述     | 必须带code值                                                 |
| 返回结果 | token 值 （前端需要保存才能使用其他接口，请求头Authorization带上） |

## 2 新增纸条

| 地址post | /addNodeDo                                               |
| -------- | -------------------------------------------------------- |
| 请求参数 | json值 如下，注意所有值都不能为空 其中微信号要满足其形式 |
| 描述     | 新增纸条                                                 |
| 返回结果 | 成功数量                                                 |



```json
{
    "location":0,                 // 大学信息：0：河南理工大学，1：焦作大学 ，2：焦作师专
    "weChatId":"111111111",       // 微信号
    "picture":"https://pic.imgdb.cn/item/60542237524f85ce29f2db7e.jpg",// 图片地址
    "life":1,                     // 销毁次数：1 抽到一次后结束，2：抽到3次后结束 3 ： 抽到五次后结束  4： 用不结束
    "des":"wfg",                // 个人描述
    "sex":1                     // 纸条性别 ： 1 ： 男 2 ： 女
}
```

## 3 查询我的纸条

| 地址GET  | /getUserById                |
| -------- | --------------------------- |
| 请求参数 | 无 但是 必须要带请求头token |
| 描述     | 查询我所存放的纸条          |
| 返回结果 | 查询的结果 如下             |
|          |                             |

```json
      {
            "id": 1,                                              // 纸条主键 可能有用
          
            "location": 0,                                        // 大学信息：0：河南理工大学，1：焦作大学 ，2：焦作师专
          
            "picture": "https://pic.imgdb.cn/item/60542237524f85ce29f2db7e.jpg",  // 图片地址
          
            "life": 1,                                         // 销毁次数：1 抽到一次后结束，2：抽到3次后结束 3 ： 抽到五次后结束  4： 用不结束
          
            "des": "wfg",                                     // 个人描述
          
            "game": 0,                                       // 爱好 暂无用处
          
            "deleted": 1,                                     // deleted : 1 代表存活 暂无用处
                                                                      
            "sex": 1                                           // 纸条性别 ： 1 ： 男 2 ： 女
        }
```

## 4 抽取女生



| 地址GET  | /getUserGirl         |
| -------- | -------------------- |
| 请求参数 | location，以及请求头 |
| 描述     | 抽取女生纸条         |
| 返回结果 | 女生纸条 如上        |

## 5 抽取男生

| 地址GET  | /getUserBoy          |
| -------- | -------------------- |
| 请求参数 | location，以及请求头 |
| 描述     | 抽取男生纸条         |
| 返回结果 | 男生纸条 如上        |

## 6 查询我抽到的纸条

| 地址GET  | /getUserExtraNode |
| -------- | ----------------- |
| 请求参数 | 请求头            |
| 描述     | 抽取我抽到的纸条  |
| 返回结果 | 很多纸条 如下     |

```json
 {
     "id": 1,
     "location": 0,
     "picture": "https://pic.imgdb.cn/item/60542237524f85ce29f2db7e.jpg",
     "life": 1,
     "des": "wfg",
     "game": 0,
     "deleted": 0,
     "sex": 1,
     "weChatId": "2324543435dsf"
 },
{
    "id": 1,     //纸条id
    "location": 0,
    "picture": "https://pic.imgdb.cn/item/60542237524f85ce29f2db7e.jpg",
    "life": 1,
    "des": "wfg",
    "game": 0,
    "deleted": 0,
    "sex": 1,
     "weChatId": "2324543435dsf"
},
```

## 7 删除 我抽到的纸条

| 地址GET  | /delExtraNode                            |
| -------- | ---------------------------------------- |
| 请求参数 | 请求头以及 纸条主键（纸条id）nodeId 如下 |
| 描述     | 删除了我抽到的纸条                       |
| 返回结果 | 嘤嘤 被你删了                            |

```
localhost:8080/delExtraNode?nodeId=1
```

## 8 删除 用户本人指定纸条

| 地址GET  | /delNodeByUser                           |
| -------- | ---------------------------------------- |
| 请求参数 | 请求头以及 纸条主键（纸条id）nodeId 如下 |
| 描述     | 删除我所创建的纸条                       |
| 返回结果 | 删除的条数                               |

```
localhost:8080/delNodeByUser?nodeId=1
```





```js
wx.request({
    url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    data: {},  // 均为默认值
    header: {'content-type': 'application/json'},
    menthod: 'get',
    dataType: 'json',
    responseType: 'text',
    success: (result) => {
        this.setData({
            swiperList: result.data.message
        })
    },
    fail: () => {},
    complete: () => {}
})
```



```
{
    "code": 200,
    "message": "操作成功",
    		   "data":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzZXNzaW9uS2V5IjoicWhNN0VXalpwWHBQUkFzL2hrWEtvdz09Iiwid3hPcGVuSWQiOiJvS29NQzVXMC12OXdsN0tOTEpXZVl4bXNIRHd3IiwiZXhwIjoxNjM0NTQzNjIzLCJ1c2VySWQiOjEsImp3dElkIjoiNTZhOWQ3ZWUtODc0Ny00MTM3LTk0OGEtYTNlZjhkMjI3MmJkIn0.XE1inAZykGitXM0gZcRlR6vnNvg5pEWmLRkxT13-u7Q"
}
```





```js
sureOutBodyBtn: function(){
    const that = this

    // 随机抽取
    wx.showLoading({
      title: '随机抽取中',
      mask: true
    })
    db.collection('body_girl_yun').aggregate().match({
        sex: 1,
        location: parseInt(that.data.indexBody3)
      }).sample({ size: 1}).end()
    .then(res => {
      wx.hideLoading()
      if(res.list.length == 0){
        return wx.showToast({
          title: '此学校暂无纸条',
          icon: 'error',
          mask: true
        })
      }
      console.log(res)
      // 如果纸条生命为一，直接从数据库删除纸条
      if(res.list[0].life == 1){
        db.collection('body_girl_yun').where({
          _id: res.list[0]._id
        }).remove().then( result => {
          console.log("删除了life为1的纸条"+result)
          if(result.errMsg == 'collection.remove:ok'){
            wx.showToast({
              title: '抽取成功',
              icon: 'success',
              mask: true
            })
          }
        }).catch(
          console.error
        )
      // 纸条生命大于一,生命减一 
      }else{
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
        }).catch(
          console.error
        )
      }

      // 并将数据添加到 body_girl_yun_put
      db.collection('body_girl_yun_put').add({
        data: {
          picture: res.list[0].picture,
          des: res.list[0].des,
          location: res.list[0].location,
          sex: res.list[0].sex,
          weChatId: res.list[0].weChatId,
          openId: app.globalData.openId
        }
      }).then( resultAdd => {
        // console.log("数据add"resultAdd)
        that.setData({
          outBodyMask: false
        })
      }).catch(
        console.error
      )
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
```

