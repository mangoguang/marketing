<template>
  <mt-swipe class="wrapper" :auto="auto" @change="handleChange" >
    <mt-swipe-item 
      :style="{backgroundImage:'url('+ item.imgUrl + ')',backgroundSize: 'contain'}"
      v-for='(item,index) in list' :key='index'
      :data-type="index">
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
import {mapMutations} from 'vuex'
import { Swipe, SwipeItem } from 'mint-ui';
import Vue from 'vue'
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
  props: ['list', 'auto'],
  watch: {
    list() {
      if(this.list && this.list.length) {
        this.setImgUrl(this.list[0].imgUrl)
      }
    }
  },
  created() {
    if(this.list.length) {
      this.setImgUrl(this.list[0].imgUrl)
    }
  },
  methods: {
    ...mapMutations(['setImgUrl']),
    handleChange(index) {
      this.setImgUrl(this.list[index].imgUrl)
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

<style lang="scss">
// .mint-swipe-indicators {
//   right: -3%;
//     .mint-swipe-indicator {
//       background: #fff;
//       opacity: 0.5;
//     }
//     .is-active {
//       background: #fff;
//       opacity: 1;
//     }
// }
.mint-swipe-indicators {
  right: 76%;
    .mint-swipe-indicator {
      background: #363636;
      opacity: 0.6;
    }
    .is-active {
      background: #363636;
      width: 3.4vw;
      border-radius: 36%;
      opacity: 0.6;
    }
  }
</style>



