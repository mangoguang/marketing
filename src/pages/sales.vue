<!-- <keep-alive> -->
<template>
  <div class="sales">
    <Bar :data="brandData" :vertical="'vertical'"></Bar>
    <Bar :data="categoryData" :vertical="'vertical'"></Bar>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import mango from '../js'
import Vuex, { mapState, mapMutations, mapGetters } from 'vuex'
Vue.use(VueRouter)
Vue.use(Vuex)
import Bar from '../components/charts/bar'
// import Pie from '../components/charts/pie'
export default {
  name: 'sales',
  components: {
    Bar
  },
  data () {
    return {
      brandData: {
        legendData: ['利润', '支出', '收入'],
        yAxisData: ['3D', 'V6', '0769', '凯奇', '慕思儿童'],
        seriesData: [{
          "data": [ 7, 1, 3, 1, 2 ],
          "name": "2018-07"
        }, {
          "data": [ 2, 5, 18, 1, 6 ],
          "name": "2017-08"
        }]
      }, 
      categoryData: {
        legendData: ['利润', '支出', '收入'],
        yAxisData: ['广东', '广西', '福建', '江苏', '床湖南品', '上海'],
        seriesData: [{
          "data": [ 107, 121, 183, 191, 302, 288 ],
          "name": "2018-07"
        }, {
          "data": [ 112, 145, 198, 171, 186, 300 ],
          "name": "2017-08"
        }]
      }
    }
  },
  mounted(){
    this.getBrandData()
    mango.test()
    console.log(11223344, this.$refs.main)
    this.setHomeArr([1, 2, 3, 4])
    this.setHomeTit('首页标题')
    this.setHomeText('123木头人')
  },
  computed: {
    test() {
      console.log(333, this.$store)
    },
    ...mapState({
      homeTit: state => 'just test',
      homeText: state => state.home.homeText,
      homeArr: state => state.home.homeArr
    }),
    ...mapGetters([
      'homeArrFilter'
    ])
  },
  methods:{
    ...mapMutations([
      'setHomeTit',
      'setHomeText',
      'setHomeArr'
    ]),
    goToChild() {
      this.$router.push({ path: '/child' })
    },
    // asyn function() {

    // }
    // ajax请求
    getBrandData() {
      const url = 'https://derucci.net/app/login.api'
      // return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: url,
          headers: {
            'UUID': 'e10adc3949ba59abbe56e057f20f883e'
          },
          params: {
            account: '18080028',
            password: 'e10adc3949ba59abbe56e057f20f883e'
          }
        })
        .then((res) => {
          console.log(123, res)
        })
      // })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
 