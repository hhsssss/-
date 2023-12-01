// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event.pinglun)
 return await cloud.database().collection('Cfwsx').doc(event.id)
 .update({
   date:{
      pinglun:event.pinglun
   }
 }) .then(res => {
  console.log("添加评论成功", res);
  return res
})
.catch(err => {
  console.log("添加评论失败", err);
  return err
})
}