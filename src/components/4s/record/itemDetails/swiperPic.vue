<!--  -->
<template>
  <div class="selectPic">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(item,index) in list" :key="index"
                    :style="{backgroundColor:item.color}">
                    <div>
                      <img  preview :preview-text="item.color"
                            :src="item.text" alt="">
                    </div>
    </swiper-slide>
    </swiper>
  </div>
</template>

<script>
let vm = null
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        //  threshold : 100, //拖动的临界值，大于才能被拖动
        lazy: {				//图片懒加载
          loadPrevNext: true,
          oadPrevNextAmount: 1
        },
        slideActiveClass : 'swiper-slide-active',
        preventClicksPropagation : false,//拖动释放不会触发click
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 30,
          stretch: 40,
          depth: 100,
          modifier: 1,
          slideShadows : true
        },
        // loop : true,
        on: {
          click: function () {
            console.log(this)
            const realIndex = this.realIndex;
            vm.handleClickSlide(realIndex);
          }
        }
      },
      list: [{
        text: './static/images/4s/1.png',
        color: 'pink'
      },{
        text: './static/images/4s/1.png',
        color: '#ccc'
      },{
        text: './static/images/4s/1.png',
        color: '#007aff'
      },{
        text: './static/images/4s/1.png',
        color: '#666'
      }]
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted() {
    //如果图片是异步生成的，在图片数据更新后调用：
    // this.$previewRefresh()
    vm = this
 
    // console.log('this is current swiper instance object', this.swiper)
  },
  methods :{
    handleClickSlide(index) {
      console.log('当前点击索引：', index);
    } 
  }
}
</script>
<style lang='scss' scoped>
  .selectPic {
    width: 100vw;
    height: 60vw;
    padding: 12.5vw;
    box-sizing: border-box;
  }
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 200px;
    height: 300px;
    opacity: 0.5;
    border-radius: 1.3vw;
    img {
      width: 100%;
      height: auto;
      border-radius: 1.3vw;
    }
  }
  .swiper-slide-active {
    opacity: 1;
    width: 200px;
  }
</style>