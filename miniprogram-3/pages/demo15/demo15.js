// pages/demo15/demo15.js
Page({
  data: {
    list:[
      {
        id: 0,
        name: "🍓",
        value: "apple"
      },
      {
        id: 1,
        name: "🍇",
        value: "grape",
      },
      {
        id: 2,
        name: "🍌",
        value: "banana"
      }
    ]
  },
  // 复选框的选中的事件
  handleItemChange(e){
    // 获取被选中的值
    const checkedList = e.detail.value;
    this.setData({
      checkedList
    })
  }
})