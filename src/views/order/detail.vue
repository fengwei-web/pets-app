<template>
  <!-- 订单详情页面 -->
  <div class="order_detail flex flex--row">
    <div class="order_detail_con">
      <div class="order_detail_head flex flex--align-items--center">
        <div class="order_detail_head_pic flex flex--justify-content--end">
          <p>等待付款</p>
        </div>
        <div class="order_detail_head_tip">
          剩3天订单将自动关闭
        </div>
      </div>
      <div class="order_detail_address flex flex--align-items--center flex--justify-content--space-between">
        <div class="order_detail_address_position flex flex--row">
          <i class="icon iconfont iconFrame1"></i>
        </div>
        <div class="order_detail_address_box flex flex--row flex--justify-content--space-between">
          <div class="order_detail_address_box_top flex flex--justify-content--space-between">
            <h3 class="one_wap">刘小华山</h3>
            <h3 class="one_wap">24355646767</h3>
          </div>
          <div class="order_detail_address_box_bot one_wap">北京市 朝阳区人民法院 505室</div>
        </div>
        <i class="icon iconfont iconyoubianxiaojiantou"></i>
      </div>
      <div class="order_detail_shop">
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
          <div class="order_list_box_actual_payment flex flex--justify-content--end">实付款：￥199.00</div>
          <div class="order_list_box_info">
            <div class="order_list_box_info_term flex flex--align-items--center flex--justify-content--space-between">
              <p>运送快递</p>
              <span>￥199.00</span>
            </div>
            <div class="order_list_box_info_term flex flex--align-items--center flex--justify-content--space-between">
              <p>实付款</p>
              <span>￥199.00</span>
            </div>
          </div>
        </div>
      </div>
      <div class="order_detail_info">
        <van-cell :border="false" title="支付方式" value="微信支付" size="large" />
        <van-cell :border="false" title="订单编号" value="1341652131567461563132" size="large" />
        <van-cell :border="false" title="创建时间" value="2020-12-12 13:23:42" size="large" />
        <van-cell :border="false" title="付款时间" value="2020-12-12 13:23:42" size="large" />
        <van-cell :border="false" title="发货时间" value="2020-12-12 13:23:42" size="large" />
        <van-cell :border="false" title="买家留言" value="请邮寄顺丰快递，这个货要的比较急" size="large" />
      </div>
    </div>
    <div class="order_detail_foot flex flex--align-items--center flex--justify-content--end">
      <div class="order_detail_foot_ash">取消订单</div>
      <!-- <div class="order_detail_foot_ash">申请退款</div> -->
      <!-- <div class="order_detail_foot_ash">查看物流</div> -->
      <div class="order_detail_foot_ash">申请售后</div>
      <div class="order_detail_foot_purple">去支付</div>
      <!-- <div class="order_detail_foot_purple">确认收货</div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderDetail'
}
</script>

<style lang="less" scoped>
.order_detail{
  height: 100%;
  .order_detail_con{
    flex: 1;
    overflow-y: auto;
    .order_detail_head{
      height: 99px;
      background: #2A2C3B;
      padding: 0 24px;
      .order_detail_head_pic{
        width: 132px;
        height: 40px;
        background: url("../../../static/formal/order_detail_state.png") no-repeat;
        background-size: 100% 100%;
        p{
          width: 84px;
          height: 26px;
          line-height: 26px;
          text-align: center;
          font-size: 13px;
          color: #fff;
        }
      }
      .order_detail_head_tip{
        font-size: 12px;
        color: #fff;
        margin-top: -15px;
        margin-left: 32px;
      }
    }
    .order_detail_address{
      padding: 20px 15px 16px 22px;
      background: #fff;
      border-radius: 4px 4px 0px 0px;
      .order_detail_address_position{
        height: 42px;
        .iconFrame1{
          margin-top: 2px;
          font-size: 16px;
          color: #333333;
        }
      }
      .order_detail_address_box{
        width: 286px;
        min-height: 42px;
        .order_detail_address_box_top{
          h3{
            width: 60%;
            font-size: 14px;
            font-weight: bold;
            color: #081425;
            &:last-of-type{
              width: 40%;
              text-align: right;
            }
          }
        }
        .order_detail_address_box_bot{
          font-size: 14px;
          color: #999999;
          width: 286px;
          margin-top: 10px;
        }
      }
      .iconyoubianxiaojiantou{
        font-size: 13px;
        color: #333333;
      }
    }
    .order_detail_shop{
      background: #ffffff;
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
        .order_list_box_info{
          padding-bottom: 26px;
          .order_list_box_info_term{
            margin-top: 16px;
            p{
              font-size: 14px;
              color: #333;
            }
            span{
              font-size: 13px;
              color: #081425;
            }
          }
        }
      }
    }
    .order_detail_info{
      width: 100%;
      margin: 10px 0;
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
  }
  .order_detail_foot{
    height: 49px;
    background: #ffffff;
    border-top: 1px solid #eee;
    box-shadow: 0px -1px 4px 0px rgba(215,219,225,0.50);
    padding: 0 15px;
    div{
      padding: 8px 26px;
      font-size: 14px;
      margin-right: 10px;
      &:last-of-type{
        margin-right: 0;
      }
      &.order_detail_foot_purple{
        background: #949CDF;
        color: #fff;
      }
      &.order_detail_foot_ash{
        border: 1px solid #dfdfdf;
        color: #333333;
      }
    }
  }
}
</style>
