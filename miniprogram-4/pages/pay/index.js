/**
 * 1 页面加载的时候
 *   1 从缓存中获取购物车数据 渲染到页面中
 *     这些数据  checked = true
 */
import { getSetting,chooseAddress,openSetting ,showToast} from "../../utils/asyncWx";
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    totalPrice: 0,
    totalNum: 0
  },
  // 设置购物车状态栏同时计算 底部工具栏的数据 全选总价格 购买的数据
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 1 获取缓存中的收货地址信息
    const address=wx.getStorageSync('address');
    // 1 获取缓存中的购物车数据
    let cart=wx.getStorageSync('cart')||[];
    // 过滤后的购物车数组
    cart=cart.filter(v=>v.checked);
    this.setData({address});
    // 1 总价格总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
        totalPrice+=v.num*v.data.message.goods_price;
        totalNum += v.num;
    })
    this.setData({
      cart,address,totalPrice,totalNum
    })
  }
})