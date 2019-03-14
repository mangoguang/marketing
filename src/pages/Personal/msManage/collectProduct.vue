<template>
  <div class="collect">
    <SwipeDelete v-for="(item, index) in list" :key="index" :list='item'/>
  </div>
</template>

<script>
import SwipeDelete from '../../../components/Gallery/collect/index'
export default {
  components: { SwipeDelete },
  data() {
    return {
      list: [{
        brand: '床',
        imgUrl: './static/images/bed1.jpg',
        title: '3D BCD1-046 克莱夫特克莱夫特克莱夫特克莱夫特',
        type: [{
          name: '热销'
        },{
          name: '人气'
        }],
        price: 22800,
        like: true,
        num: 1600
      },{
        brand: '床',
        imgUrl: './static/images/bed2.jpg',
        title: '歌蒂亚 BCG1-016 爱巢',
        type: [{
          name: '热销'
        }],
        price: 15800,
        like: false,
        num: 1628
      },{
        brand: '床',
        imgUrl: './static/images/bed3.jpg',
        title: '歌蒂亚 BCG1-016 天使之翼',
        type: [{
          name: '热销'
        },{
          name: '新品'
        }],
        price: 18800,
        like: false,
        num: 1628
      },{
        brand: '床',
        imgUrl: './static/images/bed4.jpg',
        title: 'V6 BCG1-016 路虎',
        type: [{
          name: '人气'
        }],
        price: 25800,
        like: true,
        num: 2200
      },{
        brand: '床',
        imgUrl: './static/images/bed4.jpg',
        title: 'V6 BCG1-016 路虎',
        type: [{
          name: '人气'
        }],
        price: 25800,
        like: true,
        num: 2200
      },{
        brand: '床',
        imgUrl: './static/images/bed4.jpg',
        title: 'V6 BCG1-016 爱巢',
        type: [{
          name: '人气'
        }],
        price: 25800,
        like: true,
        num: 2200
      }]
    }
  }
}
</script>

