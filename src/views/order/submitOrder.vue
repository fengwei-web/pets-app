<template>
  <div class="submit flex flex--row">
    <div class="submit_con">
      <div class="submit_con_address">
        <!-- <div class="submit_con_address_yes flex flex--align-items--center flex--justify-content--space-between">
          <div class="submit_con_address_yes_left">
            <div class="submit_con_address_yes_left_top flex flex--align-items--center">
              <h3 class="one_wap">刘小山</h3>
              <p class="one_wap">24355646767</p>
            </div>
            <div class="submit_con_address_yes_left_bot one_wap">收货地址：北京市 朝阳区人民法院 505室</div>
          </div>
          <div class="submit_con_address_yes_right flex flex--align-items--center">
            <i class="icon iconfont iconyoubianxiaojiantou"></i>
          </div>
        </div> -->
        <div class="submit_con_address_nothing flex flex--justify-content--center">请选择地址...</div>
      </div>

      <div class="submit_con_info">
        <div
          class="info_shop"
        >
          <div class="info_shop_head flex flex--align-items--center">
            <img src="../../../static/ceshi/dianpu_pic.png" alt="">
            <h3>Panda宠物生活馆</h3>
          </div>
          <div class="info_shop_box">
            <div
              class="info_shop_box_list flex flex--align-items--center"
              v-for="(item,index) in 2"
              :key="index"
            >
              <div class="info_shop_box_list_left">
                <van-image src="https://img.yzcdn.cn/vant/cat.jpeg"></van-image>
              </div>
              <div class="info_shop_box_list_right">
                <h3>法国皇家ROYAL CANIN 小型犬 1190</h3>
                <p>
                  4个月
                  <span>公</span>
                </p>
                <div class="info_shop_box_list_right_price flex flex--align-items--center flex--justify-content--space-between">
                    <h3>¥ 3900.00</h3>
                    <p>x1</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="info_message">
          <van-field v-model="message" placeholder="选填：给商家留言（45字以内） " maxlength="45" />
        </div>

        <div class="info_cell">
          <van-cell title="商品金额" value="¥ 3900.00" :border="false"/>
          <van-cell title="运费" value="¥ 3900.00" :border="false"/>
        </div>
      </div>
    </div>

    <div class="submit_foot flex flex--align-items--center flex--justify-content--space-between">
      <div class="submit_foot_left flex flex--align-items--end">
        ￥120.
        <p>00</p>
      </div>
      <van-button type="info">提交订单</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'submitOrder',
  data () {
    return {
      message: ''
    }
  }
}
</script>

<style lang="less" scoped>
.submit{
  height: 100%;
  .submit_con{
    flex: 1;
    overflow-y: auto;
    padding: 0 15px;
    padding-top: 12px;
    .submit_con_address{
      background: #ffffff;
      border-radius: 4px;
      box-shadow: 0px 2px 6px 6px rgba(242,244,250,0.50);
      .submit_con_address_yes{
        padding: 38px 17px;
        .submit_con_address_yes_left{
          width: 286px;
          margin-right: 20px;
          .submit_con_address_yes_left_top{
            h3{
              max-width: 50%;
              font-size: 15px;
              color: #081425;
            }
            p{
              width: 50%;
              font-size: 14px;
              color: #666666;
              margin-left: 20px;
              margin-top: 2px;
            }
          }
          .submit_con_address_yes_left_bot{
            width: 286px;
            font-size: 14px;
            font-weight: 500;
            color: #081425;
            margin-top: 16px;
          }
        }
        .submit_con_address_yes_right{
          i{
            font-size: 13px;
            color: #999999;
          }
        }
      }
      .submit_con_address_nothing{
        padding: 28px 17px;
        font-size: 14px;
        color: #081425;
      }
    }
    .submit_con_info{
      width: 345px;
      background: #ffffff;
      border-radius: 4px;
      margin-top: 8px;
      padding: 0 12px;
      padding-bottom: 33px;
      box-sizing: border-box;
      .info_shop{
        margin-top: 10px;
        padding-bottom: 31px;
        .info_shop_head{
          padding: 15px 0;
          img{
            width: 12px;
            height: 12px;
          }
          h3{
            font-size: 13px;
            color: #333;
            margin-left: 8px;
          }
        }
        .info_shop_box{
          .info_shop_box_list{
            margin-top: 10px;
            .info_shop_box_list_left{
              width: 86px;
              height: 86px;
              .van-image{
                width: 100%;
                height: 100%;
                border-radius: 4px;
                overflow: hidden;
              }
            }
            .info_shop_box_list_right{
              flex: 1;
              height: 86px;
              margin-left: 15px;
              h3{
                font-size: 14px;
                color: #333;
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
              p{
                font-size: 12px;
                color: #AAAEB7;
                margin-top: 10px;
                span{
                  margin-left: 10px;
                }
              }
              .info_shop_box_list_right_price{
                margin-top: 8px;
                h3{
                  font-size: 13px;
                  color: #333;
                }
                p{
                  font-size: 12px;
                  color: #666666;
                  margin-top: 0;
                }
              }
            }
          }
        }
      }
      .info_message{
        background: #f9fafe;
        padding: 5px 8px;
        .van-cell{
          background: #f9fafe;
          padding: 0;
        }
      }
      .info_cell{
        margin-top: 10px;
      }
    }
  }
  .submit_foot{
    height: 50px;
    background: #ffffff;
    box-shadow: 0px -1px 4px 0px rgba(215,219,225,0.50);
    padding: 0 7px 0 15px;
    .submit_foot_left{
      font-size: 18px;
      font-weight: bold;
      color: #E41F35;
      p{
        font-size: 14px;
        margin-bottom: 1px;
      }
    }
  }
  .van-button{
    height: 40px;
    background: #949CDF;
    border-color: #949CDF;
  }
}
</style>
