<!--  -->
<template>
  <div class="selectPic">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(item,index) in list" :key="index"
                    :style="{backgroundColor:item.color}">
                    <div>
                      <img  preview :preview-text="item.color"
                            :src="item.text" alt=""
                            v-if='item.type=== "image"'>
                       <video-player  class="video-player vjs-custom-skin player"
                                      ref="videoPlayer"
                                      v-else
                                      :playsinline="true"
                                      :options="playerOptions"
                                      @play="onPlayerPlay($event)"
                                      >
                        </video-player>
                    </div>
    </swiper-slide>
    </swiper>
  </div>
</template>

<script>
let vm = null
import { videoPlayer } from 'vue-video-player';
import 'video.js/dist/video-js.css'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    swiper,
    swiperSlide,
    videoPlayer
  },
  data () {
    return {
      activeIndex: 0,
      swiperOption: {
         threshold : 50, //拖动的临界值，大于才能被拖动
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
            const realIndex = this.realIndex;
            if(vm.activeIndex === realIndex) {
              return
            }
            vm.handleClickSlide(realIndex);
          }
        }
      },
      list: [{
          text: './static/images/4s/1.png',
          color: 'pink',
          type: 'image'
        },{
          text: './static/images/4s/1.png',
          color: '#ccc',
          type: 'vedio'
        },{
          text: './static/images/4s/1.png',
          color: '#007aff',
          type: 'image'
        },{
          text: './static/images/4s/1.png',
          color: '#666',
          type: 'image'
      }],
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '2:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          src: 'http://vjs.zencdn.net/v/oceans.mp4',
          type: 'video/mp4'
        }],
        poster: "./static/images/4s/1.png", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
      }
    
    }
  },
  mounted() {
    //如果图片是异步生成的，在图片数据更新后调用：
    // this.$previewRefresh()
    vm = this
  },
  methods :{
    //当前图片的索引
    handleClickSlide(index) {
      this.activeIndex = index
      console.log('当前点击索引：', index);
    } ,
    //点击播放的时候全屏
    onPlayerPlay(player) {
      if(!player.isFullscreen()){ 
        player.requestFullscreen(); 
        player.isFullscreen(true); 
      }
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
  .player {
    background-color: #efefef;
    width: 100%;
    height: 100%;
  }
</style>