<!-- <keep-alive> -->
<template>
  <div class="areaStoreSales paddingTop2">
    <mybanner :title='title'/>
    <div class="barBox">
      <chartsTit :text="'各区域销售额对比'">
        <h6>单位：万元</h6>
      </chartsTit>
      <ul class="areaStoreBox">
        <li v-for="(item, index) in areaStoreSalesData" :key="`${index}areaStore`">
          
          <h4>{{item.name}}</h4>
          <p></p>
          <div :id = "`areaStoreSalesContainer${index}`"></div>
          <!-- <Bar
          @chartsClick="chartsEvent"
          :data="item"
          :vertical="'horizontal'"
          :height="100"
          :salesVal="true"></Bar> -->
        </li>
      </ul>
    </div>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import mango from '../../../js'
import chartsInit,{chanrtDom} from '../../../utils/chartsInit'
import Vuex, { mapState, mapMutations, mapGetters } from 'vuex'
Vue.use(VueRouter)
Vue.use(Vuex)
import Bar from '../../../components/charts/bar'
import chartsTit from '../../../components/charts/title'
import RouterLink from '../../../components/charts/routerLink'
import mybanner from '../../../components/banner'
export default {
  name: 'areaStoreSales',
  components: {
    Bar,
    chartsTit,
    RouterLink,
    mybanner
  },
  data () {
    return {
      ajaxData: {},
      areaStoreSalesData: [],
      title:'销售额报表',
      key:false,
      areaSalchanrtDom1:[]
    }
  },
  created() {
    // 获取本地存储信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    // console.log('本地村粗：：：', this.ajaxData)
  },
  mounted(){
    this.getStoreSalesData()
  },
  computed: {

  },
  beforeDestroy(){
    for(let i = 0; i < this.areaSalchanrtDom1.length; i ++){
      if(this.areaSalchanrtDom1[i]) {
        this.areaSalchanrtDom1[i].dispose()
      }
    }
  },
  watch: {
    // 各门店销售额对比
    areaStoreSalesData() {
      for (let i = 0; i < this.areaStoreSalesData.length; i++) {
        chartsInit(this, 'areaStoreSales', 'horizontal', true, null, null, i)
        this.areaSalchanrtDom1.push(chanrtDom)
      }
      // const chartsName = 'areaStoreSales'
      // if (this[`${chartsName}Data`].series) {
      //   chartsInit(this, chartsName, 'horizontal', true)
      // }
    }
  },
  methods:{
    getStoreSalesData() {
      let _this = this
      mango.getAjax(this, 'area/shop/sales', {
        date: '2018-08',
        tenantId: this.ajaxData.tenantId
      }).then((res) => {
        if (res) {
          this.key = true
          res = res.data
          // 柱状图需要检测到数据改变时才渲染，故开始时数据需要有初始状态。
          let arr = []
          for (let i =0; i < res.length; i++) {
            arr.push({})
          }
          _this.areaStoreSalesData = arr
          setTimeout(() => {
            _this.areaStoreSalesData = res
          }, 10);
        }
      })
    },
    chartsEvent(data) {
      // console.log('点击图表传回的数据：', data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.areaStoreSales{
  // background:#f8f8f8;
}
.areaStoreBox{
  background: #f8f8f8;
  h4{
    margin: 0 2%;
    padding-left: 5vw;
  }
  h4:after{
    width: 1vw;
    height: 1vw;
    background: #363636;
  }
}
</style>
 