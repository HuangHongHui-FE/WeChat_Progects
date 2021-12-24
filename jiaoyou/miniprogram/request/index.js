// 同时发送异步代码的次数
let ajaxTimes = 0;
export const request=(params)=>{  //params相当于参数
  ajaxTimes++;
  //显示加载 效果
  wx.showLoading({
    title: '加载中',
    mask: true
  });
  
  //定义公共的url
  // const baseUrl="http://42.192.10.179:8081";
  const baseUrl="https://ayugudu.top";
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success:(result)=>{
        resolve(result);
      },
      fail:(err)=>{
        reject(err);
      },
      complete:()=>{
        ajaxTimes--;
        if(ajaxTimes===0){
          // 关闭正在等待的图标
          wx.hideLoading();
        }
      }
    });
  })
}