// pages/menus/menus.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //存放轮播图数据的列表
    
    swiperlist:[],
    //存放九宫格数据的方法
    imgUrls: [
      'cloud://b2-7gkwgld706d8a245.6232-b2-7gkwgld706d8a245-1322544397/logo.png'
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.getswiperlist()
    // this.getgridlist()
  },
  
  //获取轮播图数据的方法
//   getswiperlist(){
//     wx.request({
//       url: 'https://applet-base-api-t.itheima.net/slides',
//       method:'GET',
//       success:(res)=>{
//           console.log(res)
//           this.setData({
//               swiperlist:res.data
//           })
//       }
//     })
//   },
  //获取九宫格数据的方法
//    getgridlist(){
//    wx.request({
//      url: 'https://applet-base-api-t.itheima.net/categories',
//      method:'GET',
//      success:(res)=>{
//          //console.log(res)
//          this.setData({
//              gridlist:res.data
//          })
//      }
//    })
//    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})