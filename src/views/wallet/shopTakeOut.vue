<template>
  <div class="shopTake">
    <div class="shopTake_head">
      <h3>当前可提现悬赏金额</h3>
      <b>333.00</b>
    </div>
    <div class="shopTake_form">
      <input type="text" placeholder="输入提现金额">
      <div class="shopTake_form_whole flex flex--justify-content--end">
        <p>提现全部</p>
      </div>
      <div class="shopTake_form_options flex flex--justify-content--space-between">
        <div class="shopTake_form_options_term flex flex--align-items--center flex--justify-content--center">
          <i class="icon iconfont icon_weixinzhifu"></i>
          微信支付
        </div>
        <div class="shopTake_form_options_term flex flex--align-items--center flex--justify-content--center">
          <i class="icon iconfont iconzhifubaozhifu" style="color: #1676fd;"></i>
          支付宝支付
        </div>
      </div>
    </div>
    <van-button class="shopTake_btn" type="info">提交</van-button>
  </div>
</template>

<script>
export default {
  name: 'shopTake'
}
</script>

<style lang="less" scoped>
  .shopTake{
    height: 100%;
    background: #fff;
    padding: 10px 15px;
    box-sizing: border-box;
    .shopTake_head{
      background: #949cdf;
      border-radius: 6px;
      padding: 29px 23px;
      h3{
        font-size: 18px;
        color: #fff;
      }
      b{
        display: block;
        font-size: 25px;
        color: #fff;
        margin-top: 12px;
      }
    }
    .shopTake_form{
      padding-top: 14px;
      input{
        width: 100%;
        height: 50px;
        background: #FAFAFB;
        font-size: 14px;
        padding: 0 16px;
        box-sizing: border-box;
        border: none;
        outline: none;
      }
      .shopTake_form_whole{
        padding-top: 9px;
        p{
          font-size: 13px;
          color: #666;
        }
      }
      .shopTake_form_options{
        padding-top: 30px;
        .shopTake_form_options_term{
          width: 150px;
          height: 48px;
          background: #ffffff;
          border-radius: 7px;
          box-shadow: 1px 3px 4px 1px rgba(218,221,226,0.50);
          font-size: 16px;
          font-weight: 500;
          font-family: 微软雅黑;
          color: #333;
          i{
            font-size: 30px;
            color: #44cd7c;
            margin-right: 15px;
          }
        }
      }
    }
    .shopTake_btn{
      width: 265px;
      background: #949CDF;
      border: none;
      position: fixed;
      bottom: 93px;
      left: 50%;
      margin-left: -132px;
    }
  }
</style>
