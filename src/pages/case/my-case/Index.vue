<template>
  <div class="my-case">
    <banner title="我的案例" />
    <goods-list v-for="i in 5"
                :key="i"
                title="标题文字"
                :right="[
    {
      content: '删除',
      handler: ''
    }
  ]" />
    <!-- <div class="no-data">
      <p>您还没有添加过案例哦<br>快去新增吧~</p>
    </div> -->
    <float-add-nav />
  </div>
</template>
<script>
import Banner from '@/components/banner'
import GoodsList from '@/components/case/MyCase/GoodsList'
import FloatAddNav from '@/components/case/MyCase/FloatAddNav'
export default {
  components: {
    Banner,
    GoodsList,
    FloatAddNav
  },
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.no-data {
  position: absolute;
  bottom: 151px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  &::before {
    content: '';
    display: block;
    height: 68px;
    width: 80px;
    background: url(~@/assets/imgs/case/形状749@2x.png) center center / 100%
      100% no-repeat;
  }
  &::after {
    content: '';
    display: block;
    height: 28px;
    width: 28px;
    background: url(~@/assets/imgs/case/pointer@2x.png) center center / 100%
      100% no-repeat;
  }
  & > p {
    font-size: 12px;
    font-weight: 400;
    color: rgba(144, 144, 144, 1);
    line-height: 18px;
    padding-top: 24px;
    padding-bottom: 167px;
    text-align: center;
  }
}
</style>