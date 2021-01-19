<template>
  <div class="shopOrder flex flex--row">
    <div class="shopOrder_search">
      <van-search v-model="value" placeholder="请输入搜索关键词" />
    </div>

    <div class="shopOrder_box">
      <orderList type="shopOrder"></orderList>
      <orderList type="shopOrder"></orderList>
      <orderList type="shopOrder"></orderList>
      <orderList type="shopOrder"></orderList>
    </div>
  </div>
</template>

<script>
import orderList from '@/components/orderList'
export default {
  name: 'orderSearch',
  components: {
    orderList
  }
}
</script>

<style lang="less" scoped>
.shopOrder{
  height: 100%;
  .shopOrder_search{
    height: 67px;
    background: #fff;
    .van-search{
      height: 100%;
    }
  }
}

.shopOrder_box{
  flex: 1;
  overflow-y: auto;
}
</style>
