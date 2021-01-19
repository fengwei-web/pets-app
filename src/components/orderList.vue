<template>
  <div class="order_list">
    <div class="order_list_head flex flex--align-items--center flex--justify-content--space-between">
      <div class="order_list_head_left flex flex--align-items--center">
        <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <p>Panda宠物馆</p>
      </div>
      <span>待付款</span>
    </div>

    <div class="order_list_box">
      <div class="order_list_box_term flex flex--align-items--center">
        <div class="order_list_box_term_pic">
          <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </div>
        <div class="order_list_box_term_rig">
          <h3>法国皇家ROYAL CANIN 小型犬</h3>
          <div class="order_list_box_term_rig_info flex flex--align-items--center">
            4个月<span>公</span>
          </div>
          <div class="order_list_box_term_rig_price flex flex--justify-content--space-between">
            ¥309<span>x 1</span>
          </div>
        </div>
      </div>
      <div class="order_list_box_term flex flex--align-items--center">
        <div class="order_list_box_term_pic">
          <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </div>
        <div class="order_list_box_term_rig">
          <h3>法国皇家ROYAL CANIN 小型犬</h3>
          <div class="order_list_box_term_rig_info flex flex--align-items--center">
            4个月<span>公</span>
          </div>
          <div class="order_list_box_term_rig_price flex flex--justify-content--space-between">
            ¥309<span>x 1</span>
          </div>
        </div>
      </div>
      <div class="order_list_box_actual_payment flex flex--justify-content--end">实付款：￥199.00</div>
    </div>
    <div
      class="order_list_foot flex flex--align-items--center flex--justify-content--end"
      v-if="type == 'order'"
    >
      <!-- <div class="order_list_foot_term">取消订单</div>
      <div class="order_list_foot_term">去付款</div>
      <div class="order_list_foot_term">申请退款</div> -->
      <div class="order_list_foot_term">查看物流</div>
      <div class="order_list_foot_term">申请售后</div>
      <div class="order_list_foot_term">确认收货</div>
      <div class="order_list_foot_term">去评价</div>
    </div>
    <div
      class="order_list_foot flex flex--align-items--center flex--justify-content--end"
      v-else
    >
      <div class="shopOrder_list_foot_term">查看</div>
      <div class="shopOrder_list_foot_term">发货</div>
      <div class="shopOrder_list_foot_term">退款</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderList',
  props: {
    type: {
      type: String,
      default: 'order'
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
  .order_list{
    // height: 205px;
    background: #ffffff;
    border-radius: 11px;
    margin-top: 10px;
    padding: 0 15px;
    .order_list_head{
      width: 100%;
      height: 54px;
      border-bottom: 1px solid #eee;
      .order_list_head_left{
        .van-image{
          width: 12px;
          height: 12px;
          margin-left: 5px;
        }
        p{
          font-size: 14px;
          color: #333;
          margin-left: 10px;
        }
      }
      span{
        font-size: 13px;
        color: #949CDF;
      }
    }
    .order_list_box{
      .order_list_box_term{
        margin-top: 22px;
        .order_list_box_term_pic{
          width: 90px;
          height: 90px;
          .van-image{
            width: 100%;
            height: 100%;
          }
        }
        .order_list_box_term_rig{
          flex: 1;
          height: 90px;
          padding-left: 16px;
          box-sizing: border-box;
          h3{
            width: 220px;
            font-size: 14px;
            color: #333;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .order_list_box_term_rig_info{
            font-size: 12px;
            color: #AAAEB7;
            margin-top: 8px;
            span{
              margin-left: 14px;
            }
          }
          .order_list_box_term_rig_price{
            font-size: 20px;
            color: #E41F35;
            margin-top: 23px;
            span{
              font-size: 14px;
              color: #5C5C5C;
            }
          }
        }
      }
      .order_list_box_actual_payment{
        padding: 20px 0;
        font-size: 14px;
        font-weight: bold;
        color: #081425;
      }
    }
    .order_list_foot{
      height: 63px;
      border-top: 1px solid #DEDEDE;
      .order_list_foot_term{
        padding: 7px;
        box-sizing: border-box;
        border: 1px solid #949cdf;
        border-radius: 4px;
        font-size: 13px;
        color: #949CDF;
        margin-right: 9px;
        &:last-of-type{
          margin-right: 0;
        }
      }
      .shopOrder_list_foot_term{
        padding: 7px 19px;
        box-sizing: border-box;
        border: 1px solid #949cdf;
        border-radius: 4px;
        font-size: 13px;
        color: #949CDF;
        margin-right: 9px;
        &:last-of-type{
          margin-right: 0;
        }
      }
    }
  }
</style>
