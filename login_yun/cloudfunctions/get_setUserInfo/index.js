const cloud = require('wx-server-sdk')
const md5 = require('md5')
 
//cloud.init()
cloud.init({
    traceUser: true,
    env: 'cloud1-1gn5uyhza8931345'
})
const db = cloud.database()
const usersTable = db.collection("user_yun")
const _ = db.command
 
// 云函数入口函数
exports.main = async(event, context) => {
    console.log(event)
    const wxContext = cloud.getWXContext()
    //更新当前信息
    if (event.update == true) {
      try {
        return await usersTable.doc(md5(wxContext.OPENID)).update({
          data: {
          userData: _.set(event.userData)
          },
        })
      } catch (e) {
        console.error("1", e)
      }
    } else if (event.getSelf == true) {
      //获取当前用户信息
      try {
        return await usersTable.doc(md5(wxContext.OPENID)).field({
          openid: false
        }).get()
      } catch (e) {
        console.error(e)
      }
    } else if (event.setSelf == true) {
      //添加当前用户信息
      try {
        return await usersTable.add({
          data: {
          _id: md5(wxContext.OPENID),
          openid: wxContext.OPENID,
          userData: event.userData,
          boughtList: [],
          messageList: [],
          ontransList: []
          }
        })
      } catch (e) {
        console.error(e)
      }
    } else if (event.getOthers == true) {
      //获取指定用户信息
      try {
        return await usersTable.doc(event.userId).field({
          userData: true
        }).get()
      } catch (e) {
        console.error(e)
      }
    }
}