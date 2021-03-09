<template>
  <div class="viewLog">
    <div class="viewLog_info">
      <van-cell :border="false" title="运输公司" :value="viewLog.order_info.express_name" />
      <van-cell :border="false" title="订单编号" :value="viewLog.order_info.express_num" />
      <van-cell :border="false" title="订单状态" :value="viewLog.order_info.status | setStatus" />
      <!-- <van-cell :border="false" title="官方电话" value="9532" /> -->
    </div>

    <div class="viewLog_step">
      <van-steps
        direction="vertical"
      >
        <van-step
          v-for="(item, index) in viewLog.lists"
          :key="index"
        >
          <h3>{{ item.context }}</h3>
          <p>{{ item.ftime }}</p>
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
      orderSn: '',
      token: '',
      viewLog: null
    }
  },
  created () {
    this.orderSn = this.$route.query.orderSn
    this.token = this.$route.query.token
    this.getViewLogistics()
  },
  filters: {
    setStatus (val) {
      let str = ''
      switch (val) {
        case 0:
          str = '待付款'
          break
        case 1:
          str = '待发货'
          break
        case 2:
          str = '待收货'
          break
        case 3:
          str = '已完成'
          break
        case 5:
          str = '已取消'
          break
        case 6:
          str = '申请退款'
          break
        case 7:
          str = '同意退款'
          break
        case 8:
          str = '完成退款'
          break
        case 9:
          str = '商家拒绝退款'
          break
        case 10:
          str = '申请售后'
          break
        case 11:
          str = '售后同意退款'
          break
        case 12:
          str = '售后完成退款'
          break
        case 13:
          str = '商家拒绝售后退款'
          break
      }
      return str
    }
  },
  methods: {
    async getViewLogistics () {
      const { data } = await getExpres({
        token: this.token,
        order_sn: this.orderSn
      })
      this.viewLog = data.response_data
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
