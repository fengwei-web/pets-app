<template>
  <div class="takeOutRecord" @scroll="listScroll($event)">
    <div
      class="takeOutRecord_list flex flex--align-items--center flex--justify-content--space-between"
      v-for="(item,index) in takeOutList"
      :key="index"
    >
      <div class="takeOutRecord_list_left">
        <h3>{{ item.remark }}</h3>
        <p>{{ item.ctime }}</p>
      </div>
      <div class="takeOutRecord_list_right flex flex--align-items--end">
        <p>- {{ item.amount }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { withdrawalRecord } from '@/api/withdrawal'
export default {
  name: 'takeOutRecord',
  data () {
    return {
      page: 1, // 页数
      limit: 10, // 每页大小
      takeOutList: [] // 提现记录数据
    }
  },
  created () {
    // 获取提现明细数据
    this.getWithdrawalRecord()
  },
  methods: {
    // 获取提现明细数据
    async getWithdrawalRecord () {
      const parame = {
        token: '5748c39c8381ad3fd323ba55283cc809cfbebf82',
        page: this.page,
        limit: this.limit
      }
      const { data } = await withdrawalRecord(parame)
      const { lists } = data.response_data
      this.takeOutList.push(...lists)
    },
    // 监听到底事件
    listScroll ($event) {
      if ((parseInt($event.target.clientHeight) + parseInt($event.target.scrollTop)) === parseInt($event.target.scrollHeight)) {
        if (this.takeOutList.length % this.limit === 0) {
          this.page++
          this.getWithdrawalRecord()
        } else {
          this.$toast('暂无更多数据')
        }
      }
    }
  }
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
