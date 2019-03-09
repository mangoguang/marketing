<template>
  <mt-swipe class="wrapper" :auto="2000">
    <mt-swipe-item 
      :style="{backgroundImage:'url(' + item.src + ')',backgroundSize: 'contain'}"
      v-for='(item,index) in imgList' :key='index'
      @click.native="goNext(index)">
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui';
import Vue from 'vue'
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
  data() {
    return {
      imgList: [{
        src: './static/images/p1.png'
      },{
        src: './static/images/p2.png'
      },{
        src: './static/images/p3.png'
      }]
    }
  },
  methods: {
    goNext(index) {
      console.log('index', index)
      this.$router.push({path: '/gallery'})
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 70.13vw;
  height: 21.33vw;
}
</style>


