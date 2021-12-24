// 1 获取用户的收货地址
//   1 绑定点击事件
//   2 调用内置api 获取收货地址
// 2 获取 用户对小程序所授予获取地址的权限 状态 scope
//   1 假设 用户 点击获取收货地址的提示框 确定
//     scope的值为true
//   2 假设用户没调用过获取收货地址的api
//     scope undefined
//   3 假设 用户 点击收货地址的提示框 取消
//     scope 的值 false
//     1 引导用户自己打开 授权页面设置，当用户重新给与 获取地址权限的时候
//     2 获取收货地址
//   4 把获取到的收货地址存到 本地存储中
// 2 页面加载完毕
//   1 获取本地储存中的地址数据
//   2 把数据设置给data中的一个变量
// 3 onShow
//   0 回到商品详情页面，第一次添加商品的时候 手动添加了属性
//     1 num=1;
//     2 checked=true 
//   1 获取缓存中的购物车数组
//   2 把购物车数据 填充到data中
// 4 全选的实现 数据的展示
//   1 onShow 获取缓存中的购物车数组
//   2 根据购物车中的商品数据 所有的商品都被选中 checked=true  全选就被选中
// 5 总价格与总数量
//   1 都需要商品被选中，采纳他来计算
//   2 获取购物车数组
//   3 遍历
//   4 判断商品是否被选中
//   5 总价格 += 商品单价*商品数量
//   6 总数量 += 商品的数量
//   7 把计算后的商品的价格和数量 设置回data中
// 6 商品的选中
//   1 绑定change事件
//   2 获取到被修改的商品对象
//   3 商品对象的选中状态 取反
//   4 重新填充回data中的缓存中
//   5 重新计算全选数量，总价格。。。
// 7 全选和反选
//   1 全选复选框绑定事件 change
//   2 获取 data中的全选变量 allChecked
//   3 直接取反 allChecked = !allChecked
//   4 遍历购物车数组 让里面的选中状态跟随 allChecked改变而改变
//   5 把购物车数组 和 allChecked 重新设置回data 把购物车重新设置回缓存中
// 8 商品数量的编辑
//   1 "+"  "-" 按钮 绑定同一个点击事件 区分的关键 自定义属性
//     1 "+" "+1"
//     2 "-" "-1"
//   2 传递被点击的商品id goods_id
//   3 获取data中的购物车数组 来获取需要被修改的商品对象
//   4 当购物车的数量 =1 同时用户点击 "-"
//     弹窗提示 询问用户 是否要删除
//     1 确定  直接执行删除
//     2 取消  什么都不做
//   4 直接修改商品的数量 num
//   5 把data数组 重新设置回 缓存中 和data中  this.setCart
// 9 点击结算
//   1 判断有没有收货地址信息
//   2 判断用户有没有选购商品
//   3 经过以上的验证 跳转到支付页面！

import { getSetting,chooseAddress,openSetting ,showToast} from "../../utils/asyncWx";
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice: 0,
    totalNum: 0
  },

  // 点击收货地址
  // handleChooseAddress(){
  //   // wx.chooseAddress({
  //   //   success: (result) => {
  //   //     console.log(result);
  //   //   },
  //   // });

  //   // wx.getSetting({
  //   //   success: (result) => {
  //   //     console.log(result);
  //   //   }
  //   // });

  //   // 获取 权限状态
  //   wx.getSetting({
  //     success: (result) => {
  //       // 2 获取权限状态 主要发现一些 属性名很怪异的时候 都要使用[] 形式来获取属性值
  //       const scopeAddress = result.authSetting["scope.address"];
  //       if(scopeAddress===true || scopeAddress===undefined){
  //         wx.chooseAddress({
  //           success: (result1) => {
  //             console.log(result1);
  //           }
  //         });
  //       }else{
  //         // 3 用户 以前拒绝过权限 先诱导用户打开授权界面
  //         wx.openSetting({
  //           success: (result2) => {
  //             // 可以调用收货地址代码
  //             wx.chooseAddress({
  //               success: (result3) => {
  //                 console.log(result3)
  //               },
  //             });
  //           }
  //         });
  //       }
  //     }
  //   })
  // },

  // 点击收货地址
  async handleChooseAddress(){
    try{
    // 1 获取权限状态
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
    // // 2 判断权限状态
    // if (scopeAddress === true || scopeAddress === undefined){
    //   // 3 调用api
    //   const res2 = await chooseAddress();
    //   console.log(res2);
    // }else{
    //   // 3 先引导用户打开授权界面
    //   await openSetting();
    //   // 调用获取地址的api
    //   const res2 = await chooseAddress();
    //   console.log(res2);
    // }

    // 2 判断权限状态
      if (scopeAddress === false){
        await openSetting();
      }
      // 调用获取地址的api
      const res2 = await chooseAddress();
      // console.log(res2);
      // 存入到缓存中
      wx.setStorageSync("address", res2);
    } catch (error){
      console.log(error);
    }
  },
  // 商品的选中
  handleItemChange(e){
    // console.log(e);
    // 1 获取被修改的商品的id
    const goods_id = e.currentTarget.dataset.id;
    // 2 获取购物车数组
    let {cart}=this.data;
    // 3 找到被修改的商品对象
    let index=cart.findIndex(v=>v.data.message.goods_id===goods_id);
    // 4 选中状态取反
    cart[index].checked= !cart[index].checked;
    this.setCart(cart);
  },
  // 设置购物车状态栏同时计算 底部工具栏的数据 全选总价格 购买的数据
  setCart(cart){
    let allChecked=true;
    // 1 总价格总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice+=v.num*v.data.message.goods_price;
        totalNum += v.num;
      }else{
        allChecked=false;
      }
    })
    // 判断数组是否为空
    allChecked = cart.length!=0?allChecked:false;
    // 2 给data赋值
    this.setData({
      // address,
      cart,
      allChecked,
      totalPrice,
      totalNum
    });
    wx.setStorageSync("cart",cart);
  },
  // 商品的全选功能
  handleItemAllCheck(){
    // 1 获取data中的数据
    let {cart, allChecked} = this.data;
    // 2 修改值
    allChecked = !allChecked;
    // 3 循环修改cart数组 中的商品选中状态
    cart.forEach(v=>v.checked=allChecked);
    // 把修改后的值 填充回data或者缓存中
    this.setCart(cart);
  },
  // 商品的数量编辑功能
  handleItemNumEdit(e){
    // 1 获取传递过来的参数
    const {operation, id}=e.currentTarget.dataset;
    // 2 获取购物车数组
    let {cart}=this.data;
    // 3 找到需要修改的商品的索引
    const index=cart.findIndex(v=>v.data.message.goods_id===id);
    // 4 判断是否要执行删除
    if(cart[index].num===1&&operation===-1){
      // 4.1 弹窗提示
      wx.showModal({
        title: "提示",
        content: "你是否要删除",
        success :(res) =>{
          if (res.confirm){
            cart.splice(index, 1);
            this.setCart(cart);
          } else if(res.cancel) {
            console.log("拥护点击取消")
          }
        }
      })
    } else {
      // 4 进行修改数量
      cart[index].num += operation;
      // 设置回缓存和data中
      this.setCart(cart);
    }
  },
  async handlePay(){
    // 判断收货地址
    const {address, totalNum} = this.data;
    if(!address.userName){
      await showToast({title: "你还没有选择收货地址"});
      return;
    }
    // 判断用户有没有选购商品
    if(totalNum===0){
      await showToast({title:"你还没有选购商品"});
      return;
    }else{
    // 跳转到支付页面
    wx.navigateTo({
      url: "/pages/pay/index"
    });}
  },
  // 点击结算
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

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
    // 1 获取缓存中的收货地址信息
    const address=wx.getStorageSync('address');
    // 1 获取缓存中的购物车数据
    const cart=wx.getStorageSync('cart')||[];
    this.setData({address});
    this.setCart(cart);
    // 1 计算全选
  // every 数组方法 会遍历 会接收一个回调函数 那么 每一个回调函数都返回true 那么 every方法的返回值为true
  // 只要有一个回调函数返回了false 那么不再循环执行,直接返回false
  // 空数组调用every ,返回值为true
    // const allChecked = cart.length?cart.every(v=>v.checked):false;
    let allChecked=true;
    // 1 总价格总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice+=v.num*v.data.message.goods_price;
        totalNum += v.num;
      }else{
        allChecked=false;
      }
    })
    // 判断数组是否为空
    allChecked = cart.length!=0?allChecked:false;
    // 2 给data赋值
    this.setData({
      address,
      cart,
      allChecked,
      totalPrice,
      totalNum
    });
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