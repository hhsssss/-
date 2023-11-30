Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 转盘奖品背景
    bg: "https://6232-b2-7gkwgld706d8a245-1322544397.tcb.qcloud.la/%E8%BD%AC%E7%9B%98/chaocai.JPG",
    // 转盘箭头抽奖按钮
    arrows: "https://6232-b2-7gkwgld706d8a245-1322544397.tcb.qcloud.la/A31C8C906E2493BC7AF87C846CAE208B.png",
    // 抽奖状态，是否转完了
    isTurnOver: true,
    // 转的总圈数，最后一圈可能不满
    num_total: 20
  },

  // 点击抽奖按钮
  lottery() {
    // 如果不在抽奖状态中，则执行抽奖旋转动画
    if (this.data.isTurnOver) {
      // 把抽奖状态改为未完成
      this.setData({
        isTurnOver: false
      })
      // 假设已经调取后端接口拿到抽奖后返回的ID
      let prize_id = 3; // 可以替换为后端返回的抽奖结果ID

      // 先顺时针转19圈
      let num_total = this.data.num_total;
      let angle = 360 * 10; // 19圈对应的角度
      let animationRotate = wx.createAnimation({
        duration: 3000, // 转19圈所需时间，可根据实际情况调整
        timingFunction: 'linear' // 匀速转动
      });
      animationRotate.rotate(angle).step();
      this.setData({
        animationRotate: animationRotate.export()
      });

      // 在最后一圈中旋转到随机角度
      setTimeout(() => {
        this.rotate(prize_id);
      }, 2000); // 延时2秒后执行抽奖旋转动画
    } else {
      wx.showToast({
        title: '请勿重复点击',
        icon: 'none'
      })
    }
  },

  // 旋转动画方法
  rotate(prize_id) {
    // 执行完动画所需要的时间
    let _duration = 5000; // 可根据实际情况调整
    let animationRotate = wx.createAnimation({
      duration: _duration,
      timingFunction: 'ease' // 动画以低速开始，然后加快，在结束前变慢
    });
    let angle = Math.ceil(Math.random() * 360); // 生成一个随机的旋转角度
    animationRotate.rotate(angle).step();
    this.setData({
      animationRotate: animationRotate.export()
    });
    // 设置倒计时，保证最后一圈执行完了，才更改状态
    setTimeout(() => {
      this.setData({
        isTurnOver: true,
        num_total: 20 // 重置为初始圈数
      });
    }, _duration);
  }

});
