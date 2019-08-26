<template>
  <div class="myRange">
    <h3>{{title}}</h3>
    <mt-range
      v-model="rangeValue"
      :min="0"
      :max="100"
      :step="10"
      :bar-height="2">
      <div slot="end">{{`${rangeValue}%`}}</div>
    </mt-range>
  </div>
</template>

<script>
import Vue from "vue"
import { Range } from 'mint-ui'
Vue.component(Range.name, Range)
export default {
  name:'myRange',
  props: ['title'],
  data(){
    return{
      rangeValue: 50
    }
  },
  watch: {
    'rangeValue': function() {
      this.$emit('changeVal', this.rangeValue)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/common.scss";
.myRange{
  padding: 5vw;
  h3{
    font-size: $fontSize;
  }
}
</style>
