<!--  -->
<template>
  <div class="filterIcon" @click="handleClick">
    <span class="line">|</span>
    <span>筛选</span>
    <img class="icon" src="../../../assets/imgs/4s/filter.png" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleClick() {
      this.$emit('handleFilter',true)
    }
  }
};
</script>
<style lang='scss' scoped>
.filterIcon {
  .line {
    margin-right: 4.26vw;
  }
  img {
    width: 2.4vw;
    height: auto;
  }
}
</style>