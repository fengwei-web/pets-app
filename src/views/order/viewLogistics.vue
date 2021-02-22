<template>
  <div class="viewLog">
    <div class="viewLog_info">
      <van-cell :border="false" title="运输公司" value="顺丰速运" />
      <van-cell :border="false" title="订单编号" value="1341652131567461563132" />
      <van-cell :border="false" title="订单状态" value="已取货" />
      <van-cell :border="false" title="官方电话" value="9532" />
    </div>

    <div class="viewLog_step">
      <van-steps
        direction="vertical"
        :active="1"
      >
        <van-step>
          <h3>包裹正在等待揽收</h3>
          <p>2019-05-06 10:30:12</p>
          <div
            class="viewLog_step_select flex flex--align-items--center flex--justify-content--center"
            slot="active-icon"
          >
            <p></p>
          </div>
          <div class="viewLog_step_no_select flex flex--align-items--center flex--justify-content--center"
            slot="inactive-icon"
          >
            <p></p>
          </div>
        </van-step>
        <van-step>
          <h3>您的包裹已出库</h3>
          <p>2019-05-06 10:30:12</p>
          <div
            class="viewLog_step_select flex flex--align-items--center flex--justify-content--center"
            slot="active-icon"
          >
            <p></p>
          </div>
          <div class="viewLog_step_no_select flex flex--align-items--center flex--justify-content--center"
            slot="inactive-icon"
          >
            <p></p>
          </div>
        </van-step>
        <van-step>
          <h3>您的订单开始处理</h3>
          <p>2019-05-06 10:30:12</p>
          <div
            class="viewLog_step_select flex flex--align-items--center flex--justify-content--center"
            slot="active-icon"
          >
            <p></p>
          </div>
          <div class="viewLog_step_no_select flex flex--align-items--center flex--justify-content--center"
            slot="inactive-icon"
          >
            <p></p>
          </div>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>

<script>
import { getExpres } from '@/api/order'
export default {
  name: 'viewLogistics',
  data () {
    return {

    }
  },
  created () {
    this.orderSn = this.$route.query.orderSn
    this.getViewLogistics()
  },
  methods: {
    async getViewLogistics () {
      const { data } = await getExpres({
        token: '5748c39c8381ad3fd323ba55283cc809cfbebf82',
        order_sn: this.orderSn
      })
      console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
  .viewLog{
    padding-top: 10px;
    .viewLog_info{
      padding: 10px 0;
      box-sizing: border-box;
      background: #fff;
      /deep/ .van-cell{
        .van-cell__title{
          span{
            font-size: 13px;
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
    .viewLog_step{
      margin-top: 64px;
      padding: 0 5px;
      /deep/.van-steps{
        background: #F6F6F6;
        .van-step--vertical .van-step__line{
          width: 0;
        }
        /deep/ .van-step__title{
          h3{
            color: #999999;
            font-size: 12px;
          }
          p{
            color: #999999;
            font-size: 12px;
          }
        }
        .van-step__title--active{
          h3{
            color: #E41F35;
            font-size: 12px;
          }
          p{
            color: #E41F35;
            font-size: 12px;
            // &.van-step--finish{
            //   color: #E41F35 !important;
            // }
          }
        }
        .viewLog_step_select{
          width: 12px;
          height: 12px;
          background: #fab7a3;
          border-radius: 50%;
          P{
            width: 6px;
            height: 6px;
            background: #ff6f44;
            border-radius: 50%;
          }
        }
        .viewLog_step_no_select{
          width: 12px;
          height: 12px;
          background: #edeaea;
          border-radius: 50%;
          p{
            width: 6px;
            height: 6px;
            background: #e3dede;
            border-radius: 50%;
          }
        }
      }
    }
  }
</style>
