<template>
   <div class="time">
    <span class="demonstration">{{value}}</span>
    <el-date-picker
      v-model="value"
      type="date"
      style="width:5vw"
      value-format="yyyy-MM-dd">
      {{this.usd}}
    </el-date-picker>
  </div>
</template>

<script>

import Vue from 'vue'
import VueRouter from 'vue-router'


export default {
    data() {
      return {
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        value: ''
      };
    },
    computed:{
      usd(){
        var a = this.value
      //  a.substring(a.indexOf('?a=') + 1, a.indexOf('='))
        console.log(a)
      }
    }
  };

</script>

<style lang="scss" scoped>
.time{
  padding: 5.3vw 4.13vw;
}
</style>
