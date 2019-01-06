<template>
  <div class="peopleWork paddingTop">
    <mybanner :title='title'/>
    <SelectComponent></SelectComponent>
    <div class="barBox">
      <chartsTit :text="'人效-整体'">
        <h6>单位：万元</h6>
      </chartsTit>
      <div v-show="!peopleWorkShow" :style="{height: `100vw`}" ref="peopleWorkContainer" ></div>
      <noData v-show="peopleWorkShow"></noData>
      <!-- <Bar
      :data="peopleWorkData"
      :vertical="'vertical'"
      :height="100"
      :salesVal="true"></Bar> -->
    </div>
    <div class="barBox">
      <chartsTit :text="'人效-各店'">
        <h6>单位：万元</h6>
      </chartsTit>
      <div v-show="!areaPeopleWorkShow" ref="areaPeopleWorkContainer" ></div>
      <noData v-show="areaPeopleWorkShow"></noData>
      <!-- <Bar
      :data="areaPeopleWorkData"
      :vertical="'horizontal'"
      :height="300"
      :salesVal="true"></Bar> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import mango from '../../../js'
import chartsInit,{chanrtDom, emptyData} from '../../../utils/chartsInit'
import Vuex, { mapState, mapMutations, mapGetters } from 'vuex'
import SelectComponent from '../../../components/select/selectComponent'
Vue.use(VueRouter)
Vue.use(Vuex)
import Bar from '../../../components/charts/bar'
import chartsTit from '../../../components/charts/title'
import RouterLink from '../../../components/charts/routerLink'
import mybanner from '../../../components/banner'
import noData from '../../../components/charts/noData'

export default {
  name:'peopleWork',
  components:{
    Bar,
    chartsTit,
    RouterLink,
    mybanner,
    SelectComponent,
    noData
  },data(){
    return{
      ajaxData: {},
      peopleWorkData: {}, 
      areaPeopleWorkData: {},
      height: 100,
      title:'人效报表',
      endTime: mango.getLocalTime('end'),
      cityMsg: '',
      key1:false,
      key2:false,
      peoWorkchanrtDom1:'',
      peoWorkchanrtDom2:'',
      i:0,
      peopleWorkShow: false,
      areaPeopleWorkShow: false
    }
  }, created() {
    // 获取本地存储信息
    let [ajaxData, cityMsg] = [localStorage.getItem('ajaxData'), localStorage.getItem('cityMsg')]
    this.cityMsg = cityMsg ? JSON.parse(cityMsg) : {}
    this.ajaxData = JSON.parse(ajaxData)
  },
  mounted(){
    this.getpeopleWorkData(this.endTime, this.cityMsg.cityName, this.cityMsg.cityLevel)
    this.getareaPeopleWorkData(this.endTime, this.cityMsg.cityName, this.cityMsg.cityLevel)
  },
  computed: {
    test() {
      // console.log(333, this.$store)
    },
    ...mapState({
      citySelect: state => state.select.citySelect,
      startTimeSelect: state => state.select.startTimeSelect,
      endTimeSelect: state => state.select.endTimeSelect
    })
  },
  watch: {
    citySelect() {
      if (this.endTimeSelect && this.endTimeSelect != '') {
        this.getpeopleWorkData(this.endTimeSelect, this.citySelect.cityName, this.citySelect.cityLevel)
        this.getareaPeopleWorkData(this.endTimeSelect, this.citySelect.cityName, this.citySelect.cityLevel)
      }
    },
    endTimeSelect() {
      if (this.endTimeSelect && this.endTimeSelect != '') {
        this.getpeopleWorkData(this.endTimeSelect, this.citySelect.cityName, this.citySelect.cityLevel)
        this.getareaPeopleWorkData(this.endTimeSelect, this.citySelect.cityName, this.citySelect.cityLevel)
      }
    },
    peopleWorkData() {
      const chartsName = 'peopleWork'
      if(this.key1) {
        if (this[`${chartsName}Data`].series) {
          // 检测数据是否为空
          this[`${chartsName}Show`] = emptyData(this[`${chartsName}Data`].series)
          chartsInit(this, chartsName, 'vertical', true)
          this.peoWorkchanrtDom1 = chanrtDom
        }
      }
    },
    areaPeopleWorkData() {
      const chartsName = 'areaPeopleWork'
      if(this.key2) {
        if (this[`${chartsName}Data`].series) {
          // 检测数据是否为空
          this[`${chartsName}Show`] = emptyData(this[`${chartsName}Data`].series)
          chartsInit(this, chartsName, 'horizontal', true)
          this.peoWorkchanrtDom2 = chanrtDom
          if(this.i > 1){
            try {
              this.peoWorkchanrtDom2.resize()
            } catch (error) {
              console.log(error)
            }
          }
        }
      }
    }
  },
  beforeDestroy(){
    if(this.peoWorkchanrtDom1) {
      this.peoWorkchanrtDom1.dispose()
    }
    if(this.peoWorkchanrtDom2) {
      this.peoWorkchanrtDom2.dispose()
    }
  },
  methods:{
    ...mapMutations([
      'setHomeTit',
      'setHomeText',
      'setHomeArr'
    ]),
    // goToChild() {
    //   this.$router.push({ path: '/child' })
    // },
    // 人效-整体
    getpeopleWorkData(date, city, level) {
      mango.loading('open')
      let _this = this
      mango.getAjax(this, 'people/work', {
        cityLevel: level,
        // cityName: city,
        cityName: '苏州市',
        date: date,
        tenantId: this.ajaxData.tenantId
      }).then((res) => {
        mango.loading('close')
        if (res) {
          this.key1 = true
          res = res.data
          mango.sortYears(res)
          res.yAxisData = [mango.chartsBotTit(res)]
          // res.average = res.siblings
          _this.peopleWorkData = res
        }
      })
    },
    getareaPeopleWorkData(date, city, level) {  //接口没有
      this.i += 1
      mango.loading('open')
      let _this = this
      mango.getAjax(this, 'people/work/shop', {
        date: date,
        tenantId: this.ajaxData.tenantId,
        cityLevel: level,
        // cityName: '苏州市'
        cityName: city
      }).then((res) => {
        mango.loading('close')
        if (res) {
          let newData = mango.getNewArr(res.data.series[0].data,res.data.series[1].data,res.data.yAxisData,res.data.idsData)
          this.$set(res.data,'idsData',newData[3])
          this.$set(res.data.series[0],'data',newData[1])
          this.$set(res.data.series[1],'data',newData[2])
          this.$set(res.data,'yAxisData',newData[0])
          this.key2 = true
          res = res.data
          // _this.height = 200
          _this.areaPeopleWorkData = res
        }
      })
    }
  }
}
</script>
