// pages/details/details.js
let soucang=false
let content =''
let pinglun=[]
let collectionName=[]
let item1=[]
let imgurl=''
let _id=''
let option=''
Page(
    
    {
        // getContent(event){
        //     content=event.detail.value
        //     console.log(content);
        // },
        // fabiao(){
        //     let pinglunItem ={}
        //     pinglunItem.name='编程小石头'
        //     pinglunItem.content=content
        //     pinglun.push(pinglunItem)
        //     console.log(pinglun)


        // },

  /**
   * 页面的初始数据
   */
  data: {
      detalist:[],
      details:'',
      imgurl:'',
      soucang:false
  },
//   clickme(){
//     if(soucang){
//         this.setData({
//             imgurl:"../../images/tabs/sc-no.png"
//         })
//         soucang=false
//     }
//     else{
//         this.setData({
//             imgurl:"../../images/tabs/sc-yes.png"
//         })
//         soucang=true
//     }
//   },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
   console.log(options)
   collectionName = options.title;
   wx.cloud.database().collection(collectionName)
   .get({
    success:(res)=>{
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      console.log("成功",res)
      this.setData({
        detalist:[...this.data.detalist,...res.data],
        details:res.data
      })
      soucang=res.data.soucang;
    //   this.setData({
    //     imgurl:soucang?"../../images/tabs/sc-false.png":"../../images/tabs/sc-true.png"
    //   })
    //   const { soucang } =soucang;
    //   const dynamicSrc = `../../images/tabs/sc-${soucang}.png`;
    //   console.log(soucang)
    //   if(detalist.pinglun){
    //       pinglun=detalist.pinglun
    //       console.log(pinglun)
    //   }
    }
  })
  },

// clickme(event){
//      item1 = event.currentTarget.dataset.item;
// //   console.log("点击了组件，item数据为：", item);
//     console.log("星穹",item1);
//     console.log(item1.soucang);
//     soucang=item1.soucang
//   this.setData({     
//       imgurl:item1.soucang?'../../images/tabs/sc-true.png':'../../images/tabs/sc-false.png'
      
//   })
//   console.log(this.data.imgurl)
//    soucang=!soucang
//   console.log(soucang)
// },

clickme(event) {
    item1 = event.currentTarget.dataset.item;
    item1.shoucang=!item1.shoucang;
    
    console.log("星穹", item1);
    console.log(item1.soucang);
  
    // Update soucang property in the component's state
    this.setData({     
      soucang: item1.soucang,
      imgurl: item1.soucang ? '../../images/tabs/sc-true.png' : '../../images/tabs/sc-false.png'
    });
  
    console.log(this.data.imgurl);
    console.log(this.data.soucang);
  
    // Toggle the value of soucang
    //this.setData({
      //soucang: !this.data.soucang
   // });
  
    //console.log(this.data.soucang);
    wx.cloud.callFunction({
      name:'caozuo',
      data:{
          action:"shoucang",
          shoucang:item1.shoucang,
          id:item1._id,
          collectionName:collectionName
      }
      
  }).then(res=>{
      console.log("ok",res)
      
      
  }).catch(res=>{
      console.error("k",res)
      
  })
  },
  
  
  //跳转评论页
goDetail(event){
    console.log("原神",event.currentTarget.dataset.item)
    wx.navigateTo({
      url: '/pages/comment/comment?id='+event.currentTarget.dataset.item._id+'&title='+collectionName,
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