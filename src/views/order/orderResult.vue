<template>
  <div class="result">
    <div class="result_con flex flex--row">
      <div class="result_con_box flex flex--row flex--align-items--center flex--justify-content--center">
        <div class="result_con_box_price flex flex--align-items--end">
          <b>¥</b>
          <h3>10</h3>
          <p>.00</p>
        </div>
        <p>恭喜您支付成功</p>
      </div>
      <div class="result_con_fot flex flex--align-items--center flex--justify-content--space-between">
        <p>支付方式：</p>
        <span>微信支付</span>
      </div>
    </div>

    <div class="result_btns flex flex--align-items--center flex--justify-content--space-between">
      <van-button>查看订单</van-button>
      <van-button>返回首页</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderResult'
}
</script>

<style lang="less" scoped>
  .result{
    .result_con{
      height: 200px;
      background: #fff;
      .result_con_box{
        flex: 1;
        .result_con_box_price{
          color: #F23E10;
          b{
            font-size: 11px;
            margin-bottom: 5px;
          }
          h3{
            font-size: 33px;
          }
          p{
            font-size: 18px;
            margin-bottom: 5px;
          }
        }
        p{
          font-size: 13px;
          color: #666;
          margin-top: 25px;
        }
      }
      .result_con_fot{
        height: 44px;
        border-top: 1px solid #F2F4F7;
        padding: 0 19px;
        p{
          font-size: 13px;
          color: #232A30;
        }
        span{
          font-size: 13px;
          color: #666;
        }
      }
    }
    .result_btns{
      padding: 39px 72px;
      .van-button{
        width: 104px;
        height: 32px;
        background: #949CDF;
        border: none;
        color: #fff;
      }
    }
  }
</style>
