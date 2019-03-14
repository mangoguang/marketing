<template>
  <div class="m-right">
    <div class="pictureLink">
      <router-link to='/recommend'>
        <img :src="imgUrl" alt="">
      </router-link>
    </div>
    <m-slider class="m-slider" :list='imgSliderList' @click.native="goNext"/>
    <div class="classify">
      <ClassifyComp :type='listVal' :auto='2000'/>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import MSlider from './slider'
import ClassifyComp from './classifyProduct'
export default {
  components: { MSlider, ClassifyComp },
  computed: {
     ...mapState({
      listVal: state => state.leftNavList.listVal
    })
  },
  watch: {
    listVal() {
      this.changeImg()
    }
  },
  created() {
    this.changeImg()
  },
  data() {
    return {
      imgUrl: './static/images/p1.png',
      imgSliderList: [{
        src: './static/images/p2.png'
      },{
        src: './static/images/p1.png'
      },{
        src: './static/images/p3.png'
      }],
      isHot: true
    }
  },
  methods: {
    //改变图片
    changeImg () {
      if(this.listVal !== '热门推荐') {
        this.imgUrl = './static/images/p2.png'
        this.imgSliderList = [{
          src: './static/images/p4.png'
        },{
          src: './static/images/p3.png'
        },{
          src: './static/images/p2.png'
        }]
        this.isHot = false
      }else {
        this.isHot = true
        this.imgUrl = './static/images/p1.png'
        this.imgSliderList = [{
        src: './static/images/p2.png'
      },{
        src: './static/images/p1.png'
      },{
        src: './static/images/p3.png'
      }]
      }
    },
    //轮播图跳转到活动
    goNext(e) {
      let dom = e.target
      let className = dom.className.toLowerCase();
      if (className != "mint-swipe-item is-active") {
        return false;
      }
      let index = dom.getAttribute("data-type");
      this.$router.push({path: '/gallery'})
    }
  }
}
</script>

<style lang="scss" scoped>
.m-right {
  .pictureLink {
    padding: 4.26vw;
    padding-bottom: 3vw;
    img {
      width: 70.13vw;
      height: 21.33vw;
    }
  }
  .m-slider {
    margin-left: 4vw;
  }
}
</style>


