<!--  -->
<template>
  <ul :class="`checkContent ${status ? 'open' : 'close'}`">
    <li v-for="(item, index) in list"
        @click="toCheckDetail(item.id,index)"
        :key="`checkContent${index}`"
        :class="{done: item.status}">{{item.name}}</li>
  </ul>
</template>

<script>
export default {
  props: ['list', 'status'],
  components: {
  },
  data () {
    return {

    }
  },
  methods: {
    toCheckDetail (standardId, index) {
      this.$emit('onGetStandardId', { standardId, index })
      this.$router.push({ path: '/checkDetail' })
    }
  }
}
</script>
<style lang='scss' scoped>
.checkContent {
  li {
    position: relative;
    color: #2d2d2d;
    padding: 0 4vw;
    font-size: 16px;
    line-height: 3em;
    background: #fff;
  }
  li::after {
    display: block;
    content: "";
    width: 100%;
    height: 1px;
    position: absolute;
    left: 0;
    bottom: 0;
    background: #f8f8f8;
    transform: scaleY(0.5);
  }
  li.done {
    background: url(../../../assets/imgs/4s/starCheck/yes_blue.png) no-repeat,
      #fff;
    background-size: 4.2vw auto;
    background-position: right 4vw top 50%;
  }
}
.close {
  display: none;
}
</style>