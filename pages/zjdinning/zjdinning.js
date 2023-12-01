// pages/zjdinning/zjdinning.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query:[],
    zjdinning:[],
    page:1,
    pageSize:10,
    total:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getmgdinning()
  },
  getmgdinning(){
    wx.cloud.database().collection('zjyuan')
    .get({
        success:(res)=>{
          // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
          console.log(res)
          this.setData({
            zjdinning:[...this.data.zjdinning,...res.data]
          })
        }
      })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
        title: '紫荆园',
      })
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