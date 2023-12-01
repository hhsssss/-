// pages/fk/fk.js
const db=wx.cloud.database()

Page({

  
  /**
   * 页面的初始数据
   */
  data: {
      dataobj:"",
      inputValue:""
  },
  
  
  formSubmit(e){
    var date=new Date();
    var year = date.getFullYear()
    var month = date.getMonth( ) +1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    var time =year+"- "+month+"-"+day+"-"+hour+" : "+minute+" : "+second
    var random =Math.floor(Math.random()*89999 + 10000)
    var liuyantext=e.detail.value.liuyantext;//var{ , }=e.detail.value.
    //文本检测
    this.setData({
      inputValue:liuyantext
    });
    wx.cloud.callFunction({
      name: 'ContentCheck' ,
      data: {
        txt: liuyantext},
      success (res) {
        // console.log('contentcheck-res',res)
    if (res.result.errCode==0) {
      db.collection( "board" ).add({
        data:{
          picurl: "cloud://b2-7gkwgld706d8a245.6232-b2-7gkwgld706d8a245-1322544397/my/匿名.png",
          random: random,
          time:time,
          content: liuyantext,
        }})
          wx.showToast({
            title:'已留言',
            icon: "success",
          });
          }else{
            // wx.hideLoadine()
          }
        },fail(err){
          console.log( 'ContentCheck-err' ,err)
          wx.showToast({
            icon: 'error',
            title:'文字违规',
          })
        }
      })
    },



    







  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady:function() {
    db.collection("board")
    .orderBy('time','desc')
    .get({
      success:res=>{
        this.setData({
          dataobj:res.data
        })
        console.log(res)
      }
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
  onPullDownRefresh:function() {
    this.setData({
      inputValue:""
    });
    db.collection("board").get({
      success:res=>{
        this.setData({
          dataobj:res.data
        })
      }
    })
    
    
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
