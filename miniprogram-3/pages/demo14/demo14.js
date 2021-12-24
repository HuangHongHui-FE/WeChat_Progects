// pages/demo14/demo14.js
Page({
  data: {
    gender: ""
  },
  handleChange(e){
    // 1 获取单选框中的值,通过回调得到e.detail.value
    //  console.log(e);
    let gender=e.detail.value;
    // 2 把值赋值给 data中的数据
    this.setData({
      gender
      //gender: gender
    })
  }
 
})