<template>
  <div class="peopleWork paddingTop">
    <mybanner :title='title'/>
    <SelectComponent></SelectComponent>
    <div class="barBox">
      <chartsTit :text="'人效-整体'">
        <h6>单位：万元</h6>
      </chartsTit>
      <div :style="{height: `100vw`}" ref="peopleWorkContainer" ></div>
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
      <div ref="areaPeopleWorkContainer" ></div>
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
import chartsInit from '../../../utils/chartsInit'
import Vuex, { mapState, mapMutations, mapGetters } from 'vuex'
import SelectComponent from '../../../components/select/selectComponent'
Vue.use(VueRouter)
Vue.use(Vuex)
import Bar from '../../../components/charts/bar'
import chartsTit from '../../../components/charts/title'
import RouterLink from '../../../components/charts/routerLink'
import mybanner from '../../../components/banner'

export default {
  name:'peopleWork',
  components:{
    Bar,
    chartsTit,
    RouterLink,
    mybanner,
    SelectComponent
  },data(){
    return{
      ajaxData: {},
      peopleWorkData: {}, 
      areaPeopleWorkData: {},
      height: 100,
      title:'人效报表',
      endTime: mango.getLocalTime('end'),
      cityMsg: ''
    }
  }, created() {
    // 获取本地存储信息
    let [ajaxData, cityMsg] = [localStorage.getItem('ajaxData'), localStorage.getItem('cityMsg')]
    this.cityMsg = cityMsg ? JSON.parse(cityMsg) : {}
    this.ajaxData = JSON.parse(ajaxData)
  },
  mounted(){
    console.log(123456, this.cityMsg)
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
      console.log(123, this.citySelect)
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
      if (this[`${chartsName}Data`].series) {
        chartsInit(this, chartsName, 'vertical', true)
      }
    },
    areaPeopleWorkData() {
      const chartsName = 'areaPeopleWork'
      if (this[`${chartsName}Data`].series) {
        chartsInit(this, chartsName, 'horizontal', true)
      }
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
          res = res.data
          mango.sortYears(res)
          res.yAxisData = [mango.chartsBotTit(res)]
          // res.average = res.siblings
          _this.peopleWorkData = res
        }
      })
    },
    getareaPeopleWorkData(date, city, level) {  //接口没有
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
          res = res.data
          // _this.height = 200
          _this.areaPeopleWorkData = res
        }
      })
    }
  }
}
</script>
