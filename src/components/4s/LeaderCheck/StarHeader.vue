<!--  -->
<template>

  <star-header :title="'星级检查'">
    <div class="tool">
      <egg-sort />
      <div class="search"
           @click="$router.push('/searchIndex')">
        <span>搜索</span>
        <!-- <input type="text"
               placeholder="搜索"
               @input="bindSearch"> -->
      </div>
    </div>
  </star-header>

</template>

<script>
import starHeader from '../record/header'
import eggSort from '../filter/sort'
import _ from 'lodash'

export default {
  components: {
    starHeader,
    eggSort
  },
  data() {
    return {}
  },
  methods: {
    bindSearch: _.debounce(function(e) {
      this.$emit('onSearch', e.target.value)
    }, 300)
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
  line-height: 24px;
  background: rgba(247, 247, 247, 1);
  border-radius: 12px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 23px;
  text-align: center;
  color: #999999;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    height: 24px;
    line-height: 24px;
    display: block;
    border: 1px solid transparent;
    box-sizing: border-box;
  }
  &::before {
    content: '';
    display: block;
    width: 16px;
    height: 16px;
    background: url(../../../assets/imgs/4s/search@2x.png) center center
      no-repeat;
    background-size: contain;
    // position: absolute;
    // top: 50%;
    // left: 19px;
    // transform: translateY(-50%);
  }
  input {
    width: 100%;
    box-sizing: border-box;
    padding-left: 38px;
    padding-right: 5px;
  }
  ::-webkit-input-placeholder {
    padding-left: 5px;
  }
}
</style>