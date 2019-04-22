<template>
  <ul class="infoHeader">
    <li>全部订单({{count}})</li>
    <li @click="select" class="select">筛选</li>
  </ul>
</template>

<script>
export default {
  name: 'infoHeader',
  props: ['title', 'count'],
  data() {
    return {
      fix:'',
      top:''
    }
  },
  mounted() {

  },
  methods: {
    select() {
      this.$emit('select')
    }
  }
}
</script>

<style lang="scss" scoped>
  .infoHeader{
    display: flex;
    justify-content: space-between;
    margin: 0;
    padding: 0 4.8vw;
    color: #666;
    // top: 6vw;
    // z-index: 10;
    line-height: 6vw;
    background: #fff;
    li:last-child{
      position: relative;
      padding: 0 4vw;
      background: url('../../../assets/imgs/select.png') no-repeat;
      background-size: 2.5vw 2.5vw;
      background-position: right 0 center;
    }
    .select::after{
      content: '';
      display: block;
      width: 1px;
      height: 4vw;
      background: #666;
      position: absolute;
      top: 50%;
      margin-top: -2vw;
      left: 0;
    }
  }
</style>

