/**
 * 1 用户上滑页面 滚动条触底 开始加载下一页数据
 *   1 找到滚动条触底事件 微信小程序开发文档中
 *   2 判断还有没有下一页数据
 *      1 获取总页数  只有总条数
 *        总页数 = Math.ceil(总条数 / 页容量  pagesize)
 *        总页数 = Math.ceil(23 / 10) = 3
 *      2 获取当前页码 pagenum
 *      3 判断一下当前页码是否大于等于总页数
 *   3 假如没下一页数据，弹出提示
 *   4 假如还有数据，则加载
 *      1 当前的页码++
 *      2 重新发送请求
 *      3 数据请求回来后要对data中的数组进行拼接
 * 2 下拉刷新页面
 *   1 重置数据数组，重置页码，设置为1
 *   2 重新发送请求
 *   3 数据回来后速度关闭等待效果
 */
import {request} from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList:[]
  },

  // 接口要的参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  // 总页数
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.QueryParams.cid=options.cid;
    this.getGoodsList();
  },
  // 获取商品列表数据
  async getGoodsList(){
    const res = await request({url:"/goods/search", data:this.QueryParams});
    // console.log(res);
    // 获取总条数
    const total = res.data.message.total;
    // 计算总页数
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
    // console.log(this.totalPages);
    this.setData({
      // 拼接数组
      goodsList: [...this.data.goodsList,...res.data.message.goods]
    })
    wx.stopPullDownRefresh();
  },

  // getGoodsList(){
  //   request({ url: "/goods/search"})
  //   .then(result => {
  //     this.setData({
  //       goodsList: result.data.message.goods
  //     })
  //   })
  // },

  // 标题点击事件 从子组件传递过来
  handleTabsItemChange(e){
    // 获取被点击的标题索引
    // console.log(e);
    const {index} = e.detail;
    // 修改原数组
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    // 赋值到data中
    this.setData({
      tabs
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
    // console.log("刷新");
    this.setData({
      goodsList:[]
    }),
    this.QueryParams.pagenum=1;
    this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log("页面触底");
    // 1 判断还有没有下一页数据
    if(this.QueryParams.pagenum>=this.totalPages){
      // console.log("没有下一页数据")
      wx.showToast({
        title: '没有下一页数据',
      })
    }else{
      // console.log("还有下一页数据")
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})