<template>
  <div class="takeOutRecord">
    <div
      class="takeOutRecord_list flex flex--align-items--center flex--justify-content--space-between"
      v-for="(item,index) in 15"
      :key="index"
    >
      <div class="takeOutRecord_list_left">
        <h3>钱包提现</h3>
        <p>2019-07-01 16:12:12</p>
      </div>
      <div class="takeOutRecord_list_right flex flex--align-items--end">
        <p>- 7,12</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'takeOutRecord'
}
</script>

<style lang="less" scoped>
  .takeOutRecord{
    height: 100%;
    background: #fff;
    overflow-y: auto;
    padding: 0 15px;
    .takeOutRecord_list{
      // height: 70px;
      padding: 14px 0;
      border-bottom: 1px solid #F4F5F7;
      .takeOutRecord_list_left{
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
      .takeOutRecord_list_right{
        height: 40px;
        p{
          font-size: 14px;
          font-weight: bold;
          color: #E41F35;
        }
      }
    }
  }
</style>
