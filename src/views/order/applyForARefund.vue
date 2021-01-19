<template>
  <!-- 申请退款页面 -->
  <div class="refund">
    <div class="refund_cell">
      <van-cell title="退款方式" is-link value="不想要了" />
    </div>
    <div class="refund_title">
      <h3>描述</h3>
    </div>
    <div class="refund_text">
      <van-field
        v-model="message"
        rows="5"
        type="textarea"
        maxlength="200"
        placeholder="请输入店铺简介，不超过200字"
      />
    </div>
    <div class="refund_btn">
      <van-button type="primary" color="#949CDF" block>提交</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'applyForARefund',
  data () {
    return {
      message: ''
    }
  }
}
</script>

<style lang="less" scoped>
  .refund{
    height: 100%;
    background: #fff;
    .refund_cell{
      border-top: 7px solid #FAFAFB;
      padding: 0 16px;
      /deep/ .van-cell{
        border-bottom: 1px solid #EEEEEE;
        padding-left: 0;
        padding-right: 0;
        .van-cell__title{
          span{
            font-size: 14px;
            font-weight: bold;
            color: #333;
          }
        }
        .van-cell__value{
          flex: 3;
          span{
            font-size: 13px;
            color: #999;
          }
        }
      }
    }
    .refund_title{
      padding: 17px 16px;
      h3{
        margin-top: 5px;
        font-size: 15px;
        color: #333;
      }
    }
    .refund_text{
      /deep/ .van-cell__value{
        background: #F7F8FC;
        padding: 12px 13px;
      }
    }
    .refund_btn{
      padding: 0 16px;
      position: fixed;
      bottom: 109px;
      left: 0;
      right: 0;
    }
  }
</style>
