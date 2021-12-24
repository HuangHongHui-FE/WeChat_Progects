/**
 * 1 发送请求获取数据
 * 2 点击轮播图 预览大图
 *    1. 给轮播图绑定点击事件
 *    2. 调用api
 * 3 点击加入购物车
 *   1 先获取绑定的点击事件
 *   2 获取缓存中的购物车数据 数组格式
 *   3 先判断 当前的商品是否已经存在于购物车
 *   4 已经存在，则修改商品数据 执行购物车数量++ 重新把购物车数组填充到缓存中
 *   5 不存在购物车的数组中，则直接给其添加一个新元素 新元素带上 数量属性 num 重新把购物车数组填充到缓存中
 *   6 弹出提示
 */
import {request} from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },
  // 商品对象
  GoodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options;
    this.getGoodsDetail(goods_id);
    
  },

  // 获取商品详情数据
  async getGoodsDetail(goods_id){
    const goodsObj=await request({url:"/goods/detail", data:{goods_id}});
    this.GoodsInfo=goodsObj;
    this.setData({
      goodsObj
      // 除去多余的 前面的也要改
      // goodsObj:{
      //   goods_name: goodsObj.data.message.goods_name,
      //   goods_price: goodsObj.data.message.goods_price,
      //   goods_introduce: goodsObj.data.message.goods_introduce,
      //   pics: goodsObj.data.message.pics
      // }

      // iphone部分手机不识别 webp图片格式
      // 最好找到后台让他改
      // 临时自己改 确保后台存在 1 webp => 1. jpg
    })
  },
  // 点击轮播图放大预览
  handlePreviewImage(e){
    // 1 先构造要预览的图片数组
    const urls = this.GoodsInfo.data.message.pics.map(v=>v.pics_mid);
    // 2 接收传递过来的图片url
    const current=e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    })
  },
  // 点击加入购物车事件
  handleCartAdd(){
    // 获取缓存中的购物车 数组
    let cart = wx.getStorageSync("cart")||[];
    // 判断 商品对象是否存在于购物车数组中
    let index=cart.findIndex(v => v.data.message.goods_id===this.GoodsInfo.data.message.goods_id);
    if(index===-1){
      // 不存在 第一次添加
      this.GoodsInfo.num=1;
      this.GoodsInfo.checked=true;
      cart.push(this.GoodsInfo);
    }else{
      // 已经存在购物车的数据， 执行 num++
      cart[index].num++;
    }
    // 5 把购物车重新添加回缓存中
    wx.setStorageSync("cart", cart);
    // 弹窗提示
    wx:wx.showToast({
      title: '加入成功',
      icon: 'success',
      // 防止用户手抖疯狂点击按钮
      mask: true
    });
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