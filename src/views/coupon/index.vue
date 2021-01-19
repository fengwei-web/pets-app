<template>
  <div class="coupon">
    <div
      class="coupon_list flex flex--align-items--center flex--justify-content--space-between"
      v-for="item in 10"
      :key="item"
    >
      <div class="coupon_list_price flex flex--align-items--end">
        <p><b>¥</b>10<b>.00</b></p>
      </div>
      <div class="coupon_list_info flex flex--row">
        <h3>砍价优惠劵</h3>
        <p>2019.03.01-2019.04.30</p>
        <span>适用于服务</span>
      </div>
      <van-button
        class="coupon_list_state"
        round
        type="info"
      >使用</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'couponList'
}
</script>

<style lang="less" scoped>
  .coupon{
    height: 100%;
    padding: 0 18px;
    background: #fff;
    overflow-y: auto;
    .coupon_list{
      height: 96px;
      border: 2px solid #000;
      padding: 0 21px 0 14px;
      margin-bottom: 11px;
      &:last-of-type{
        margin-bottom: 0;
      }
      .coupon_list_price{
        color: #F7B500;
        p{
          font-size: 33px;
          font-weight: bold;
          b{
            font-size: 11px;
            &:nth-child(2){
              font-size: 18px;
            }
          }
        }
      }
      .coupon_list_info{
        color: #333;
        h3{
          font-size: 18px;
        }
        p{
          font-size: 10px;
          margin: 7px 0;
        }
        span{
          font-size: 14px;
        }
      }
      .coupon_list_state{
        // width: 54px;
        height: 21px;
        background: #95E2F4;
        border: none;
        /deep/ .van-button__content{
          span{
            font-size: 12px;
            color: #333;
          }
        }
      }
    }
  }
</style>
