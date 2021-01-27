<template>
  <div class="cart flex flex--row">
    <div class="cart_con">
      <div
        class="cart_con_list"
        v-for="(item,index) in 10"
        :key="index"
      >
        <div class="cart_con_list_head flex flex--align-items--center">
          <img src="../../../static/ceshi/dianpu_pic.png" alt="">
          <h3>商家名称</h3>
          <i class="icon iconfont iconyoubianxiaojiantou"></i>
        </div>

        <div class="cart_con_list_box">
          <div
            class="cart_con_list_box_term flex flex--align-items--center"
            v-for="(shop,key) in 2"
            :key="key"
          >
            <div class="cart_con_list_box_term_state flex flex--align-items--center">
              <i class="icon iconfont icondanxuanxuanzhong" v-if="!isShow"></i>
              <i class="icon iconfont iconxuanzhong--" style="color: #949CDF;" v-else></i>
            </div>
            <div class="cart_con_list_box_term_big flex flex--align-items--center">
               <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" />
               <div class="cart_con_list_box_term_big_rig">
                 <h3>法国皇家ROYAL CANIN 小型犬</h3>
                 <p>4个月</p>
                 <b>¥309</b>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cart_foot flex flex--align-items--center">
      <div class="cart_foot_state flex flex--align-items--center">
        <i class="icon iconfont icondanxuanxuanzhong" v-if="!isShow"></i>
        <i class="icon iconfont iconxuanzhong--" style="color: #949CDF;" v-else></i>
        <b>全选</b>
      </div>
      <div class="cart_foot_price flex flex--align-items--center flex--justify-content--center">
        <div class="cart_foot_price_txt">合计：</div>
        <div class="cart_foot_price_money flex flex--align-items--end">
          ￥120.
          <p>00</p>
        </div>
      </div>
      <van-button class="cart_foot_btn" type="info">去结算</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cart',
  data () {
    return {
      isShow: false
    }
  }
}
</script>

<style lang="less" scoped>
  .cart{
    height: 100%;
    background: #fff;
    .cart_con{
      flex: 1;
      overflow-y: auto;
      .cart_con_list{
        border-bottom: 1px solid #EEEEEE;
        padding-bottom: 11px;
        .cart_con_list_head{
          padding: 16px 35px;
          img{
            width: 22px;
            height: 22px;
            margin-right: 11px;
          }
          h3{
            font-size: 14px;
            color: #333;
          }
          i{
            font-size: 10px;
            color: #A6A6A6;
            margin-left: 17px;
          }
        }
        .cart_con_list_box{
          .cart_con_list_box_term{
            padding-bottom: 10px;
            .cart_con_list_box_term_state{
              padding: 0 10px;
              i{
                font-size: 13px;
                color: #d8d1d1;
              }
            }
            .cart_con_list_box_term_big{
              height: 100px;
              flex: 1;
              padding: 0 21px 0 3px;
              .van-image{
                width: 100px;
                height: 100%;
                border-radius: 10px;
                overflow: hidden;
              }
              .cart_con_list_box_term_big_rig{
                flex: 1;
                height: 100px;
                padding-left: 19px;
                h3{
                  font-size: 14px;
                  color: #333;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                }
                p{
                  font-size: 12px;
                  color: #AAAEB7;
                  margin-top: 8px;
                }
                b{
                  font-size: 20px;
                  color: #E41F35;
                }
              }
            }
          }
        }
      }
    }
    .cart_foot{
      height: 49px;
      background: #ffffff;
      box-shadow: 0px -1px 4px 0px rgba(215,219,225,0.50);
      padding: 0 7px 0 15px;
      .cart_foot_state{
        i{
          font-size: 18px;
          color: #D8D1D1;
        }
        b{
          font-size: 15px;
          color: #333;
          margin-left: 14px;
        }
      }
      .cart_foot_price{
        flex: 1;
        .cart_foot_price_txt{
          font-size: 12px;
          color: #999;
        }
        .cart_foot_price_money{
          font-size: 18px;
          font-weight: bold;
          color: #E41F35;
          p{
            font-size: 14px;
            padding-bottom: 1px;
          }
        }
      }
      .cart_foot_btn{
        width: 129px;
        height: 40px;
        background: #949cdf;
        border-radius: 3px;
        border: none;
      }
    }
  }
</style>
