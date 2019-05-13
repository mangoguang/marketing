<template>
  <mt-swipe :class="myClass" :auto="auto" @change="handleChange" >
    <mt-swipe-item
      :style="{'backgroundImage':'url('+ item.imgUrl + ')','backgroundSize': '100% 100%','width':'100%','height': '100%'}"
      v-for="(item,index) in list"
      :key="index"
      :data-type="index"
    ></mt-swipe-item>
  </mt-swipe>
</template>

<script>
import { mapMutations } from "vuex";
import { Swipe, SwipeItem } from "mint-ui";
import Vue from "vue";
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
  props: ["list", "auto", 'myClass'],
  watch: {
    list() {
      if (this.list && this.list.length) {
        this.setImgUrl(this.list[0].imgUrl);
      }
    }
  },
  created() {
    if (this.list && this.list.length) {
      this.setImgUrl(this.list[0].imgUrl);
    }
  },
  methods: {
    ...mapMutations(["setImgUrl"]),
    handleChange(index) {
      this.setImgUrl(this.list[index].imgUrl);
    }
  }
};
</script>

<style lang="scss">
.tukuHome {
  width: 70.13vw;
  height: 21.33vw;
  .mint-swipe-indicators {
    //right: 10%;
    left:initial;
    right:2.666vw;
    bottom:1.333vw;
    .mint-swipe-indicator {
      background: rgba(255, 255, 255, 0.5);
      width: 1.06vw;
      height: 1.06vw;
      border-radius: 50%;
    }
    .is-active {
      background: #fff;
      width: 1.06vw;
      height: 1.06vw;
      border-radius: 50%;
      opacity: 1;
    }
  }
}

.tukuDetails {
  .mint-swipe-indicators {
    //right: 78%;
    left:4.266vw;
    transform: none;
    -webkit-transform: none;
    .mint-swipe-indicator {
      background: rgba(54, 54, 54, 0.6);
      width: 1.06vw;
      height: 1.06vw;
      border-radius: 50%;
    }
    .is-active {
      background: rgba(54, 54, 54, 0.8);
      width: 2.46vw;
      height: 1.06vw;
      border-top-left-radius: 30%;
      border-bottom-left-radius: 30%;
      border-top-right-radius: 30%;
      border-bottom-right-radius: 30%;
    }
  }
}

.home {
  .mint-swipe-indicators {
    right:2.666vw;
    left:initial;
    transform: none;
    -webkit-transform: none;
    .mint-swipe-indicator {
      background: rgba(255, 255, 255, 0.5);
      width: 1.33vw;
      height: 1.33vw;
    }
    .is-active {
      background: #fff;
      width: 2.66vw;
      height: 1.33vw;
      // border-radius: 350%;
      border-top-left-radius: 30%;
      border-bottom-left-radius: 30%;
      border-top-right-radius: 30%;
      border-bottom-right-radius: 30%;
      opacity: 1;
    }
  }
}

.msManage {
  .mint-swipe-indicators {
    right: 0;
    .mint-swipe-indicator {
      background: rgba(255, 255, 255, 0.5);
      width: 1.33vw;
      height: 1.33vw;
    }
    .is-active {
      background: #fff;
      width: 2.66vw;
      height: 1.33vw;
      // border-radius: 350%;
      border-top-left-radius: 30%;
      border-bottom-left-radius: 30%;
      border-top-right-radius: 30%;
      border-bottom-right-radius: 30%;
      opacity: 1;
    }
  }
}

</style>



