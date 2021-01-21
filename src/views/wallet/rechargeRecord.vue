<template>
  <div class="recharge">
    <div
      class="recharge_list flex flex--align-items--center flex--justify-content--space-between"
      v-for="(item,index) in 15"
      :key="index"
    >
      <div class="recharge_list_pic">
        <img src="../../../static/formal/chongzhi.png" alt="">
      </div>
      <div class="recharge_list_cen">
        <h3>现金充值</h3>
        <p>2019-07-01 16:12:12</p>
      </div>
      <div class="recharge_list_rig flex flex--align-items--end">
        <p>+ 712</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rechargeRecord'
}
</script>

<style lang="less" scoped>
  .recharge{
    height: 100%;
    background: #fff;
    overflow-y: auto;
    padding: 0 15px;
    .recharge_list{
      width: 100%;
      height: 70px;
      border-bottom: 1px solid #F4F5F7;
      .recharge_list_pic{
        width: 49px;
        height: 49px;
        border-radius: 50%;
        overflow: hidden;
        img{
          width: 100%;
        }
      }
      .recharge_list_cen{
        flex: 1;
        margin-left: 17px;
        h3{
          font-size: 14px;
          color: #333;
        }
        p{
          font-size: 11px;
          color: #666;
          margin-top: 10px;
        }
      }
      .recharge_list_rig{
        height: 49px;
        p{
          height: 20px;
          line-height: 20px;
          font-size: 14px;
          font-weight: bold;
          color: #E41F35;
        }
      }
    }
  }
</style>
