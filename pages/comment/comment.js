// pages/comment/comment.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'cloud://b2-7gkwgld706d8a245.6232-b2-7gkwgld706d8a245-1322544397/logo.png'
    ],
    a:[],
    t_length:0,
    length:''
  },
  bindText: function (e) {
    var t_text = e.detail.value.length;
    // console.log(t_text)
    this.setData({
      t_length: t_text
    }) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var b= ['a','b','c','d','e','f','g','h','i','j']
    console.log(b)

    this.setData({
      a:b,
      length:b.length
    })
  },

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