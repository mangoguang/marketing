<template>
  <mt-swipe class="wrapper" :auto="auto" >
    <mt-swipe-item 
      :style="{backgroundImage:'url(' + item.src + ')',backgroundSize: 'contain'}"
      v-for='(item,index) in list' :key='index'
      :data-type="index">
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui';
import Vue from 'vue'
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
  props: ['list', 'auto']
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 70.13vw;
  height: 21.33vw;
}

</style>

<style lang="scss">
.mint-swipe-indicators {
  right: -3%;
    .mint-swipe-indicator {
      background: #fff;
      opacity: 0.5;
    }
    .is-active {
      background: #fff;
      // width: 3.4vw;
      // border-radius: 36%;
      opacity: 1;
    }
}
</style>



