// const { request } = require("../../request");
import {request} from "../../request/index.js";
// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧的菜单数据
    leftMenuList: [],
    // 右侧的菜单数据
    rightContent: [],
    // 被点击的左侧的菜单
    currentIndex: 0,
    // 右侧内容的滚动条距离顶部的距离
    scrollTop: 0
  },
  // 接口的返回数据
  Cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
     * 0 web中的本地存储和小程序的本地存储的区别
     *   1 写代码的方式
     *     web: localStorage.setItem("key","value")  localStorage.getItem("key")
     *     小程序中：wxwx.setStorageSync('key', "value");  wx.getStorageSync("key")
     *   2 存的时候 有没有做类型转换
     *     web 都先调用toString(),把数据变成字符串再存进去
     *     微信小程序不变换类型，存进去什么类型，出来也是什么类型
     * 
     */
    /**
     * 1 先判断一下本地储存中有没有旧的数据
     * {time:Data.now(),data:[...]}
     * 2 没有旧的数据 直接发送请求
     * 3 有旧的数据 同时旧的数据没有过期 就使用 本地储存的旧数据
     */

     // 1 获取本地储存的数据（小程序中也存在本地储存技术）
     const Cates = wx.getStorageSync("cates")
     //2 判断
     if(!Cates){
      // 不存在  则发送请求获取数据
      this.getCates();
    } else{
      // 有旧的数据 定义过期时间 10s 改成五分钟
      if (Date.now() - Cates.time > 1000 * 10) {
        //重新发送请求
        this.getCates();
      }else{
        //可以使用旧的数据
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v=>v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },

  // 获取分类数据
  getCates(){
    request({
      url: "/categories"
    })
      .then(res => {
        this.Cates = res.data.message;

        // 把接口的数据存入到本地存储中
        wx.setStorageSync('cates', {time:Date.now(), data:this.Cates});

        // 构造左侧的大菜单数据
        let leftMenuList = this.Cates.map(v=>v.cat_name);
        // 构造右侧的商品数据
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      })
  },
  // 左侧菜单的点击事件
  handleItemTap(e){
    /**
     * 1 获取被点击的标题身上的索引
     * 2 给data中的currentIndex赋值
     * 3 根据不同的索引来渲染右侧的商品内容
     */
    const {index}=e.currentTarget.dataset;  //index = e.currentTarget.dataset.index
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      // 重新设置 右侧内容的scroll-view标签距离顶部的距离
      scrollTop: 0
    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})