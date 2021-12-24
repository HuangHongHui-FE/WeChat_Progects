export const request=(params)=>{  //params相当于参数
  //显示加载 效果
  wx.showLoading({
    title: '加载中',
    mask: true
  });
  
  //定义公共的url
  const baseUrl="https://apis.map.qq.com/ws/geocoder/v1/?location=";
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      url: baseUrl + params.location + "&" + params.key,
      success:(result)=>{
        resolve(result);
      },
      fail:(err)=>{
        reject(err);
      },
      complete:()=>{

          // 关闭正在等待的图标
          wx.hideLoading();
      }
    });
  })
}