<!--  -->
<template>

  <star-header :title="'星级检查'">
    <div class="tool">
      <egg-sort />
      <div class="search">
        <input type="text"
               v-model="searchVal">
      </div>
    </div>
  </star-header>

</template>

<script>
import starHeader from '../record/header'
import eggSort from '../filter/sort'

export default {
  components: {
    starHeader,
    eggSort
  },
  data () {
    return {
      searchVal: ''
    };
  }
}
</script>
<style lang='scss' scoped>
.tool {
  height: 40px;
  position: relative;
}
.search {
  width: 92px;
  height: 24px;
  background: rgba(247, 247, 247, 1);
  border-radius: 12px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 23px;
  &::before {
    content: "";
    display: block;
    width: 16px;
    height: 16px;
    background: url(../../../assets/imgs/4s/search@2x.png) center center / 100%
      100% no-repeat;
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
  }
  input {
    width: 100%;
    box-sizing: border-box;
    padding-left: 22px;
    padding-right: 5px;
  }
}
</style>