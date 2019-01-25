<template>
  <li class="areaSelect">
    <ul>
      <li is="customerLi" :leftText="'客户地区'" :icon="true" @click.native="selectArea" @touchmove="handleTouchmove" >
        <span>{{areaVal && areaVal.provinceName != '' ? `${areaVal.provinceName} ${areaVal.cityName} ${areaVal.countyName}` : '请选择客户地区'}}</span>
      </li>
      <!-- 性别选择插件 -->
      <li class="pickerContainer">
        <mt-popup 
      position="bottom"
      v-model="popupVisible">
        <mt-picker
        class="provincePicker"
        :slots="provinceSlots"
        @change="provinceChange"
        ref="areaPicker"></mt-picker>
        <mt-picker
        class="cityPicker"
        :slots="citySlots"
        @change="cityChange"
        ref="areaPicker"></mt-picker>
        <mt-picker
        class="countyPicker"
        :slots="countySlots"
        @change="countyChange"
        ref="countyPicker"></mt-picker>
      </mt-popup>
      </li>
    </ul>
  </li>
</template>

<script>

import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex, { mapMutations, mapState } from "vuex"
import { DatetimePicker, Picker, Popup } from 'mint-ui'
// import { DatetimePicker } from 'mint-ui'
import mango from '../../js'
// Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Picker.name, Picker)
Vue.component(Popup.name, Popup)
import customerLi from '../customer/customerLi'

export default {
  name: 'areaSelect',
  components:{customerLi},
  data() {
    return {
      provinceSlots: [],
      citySlots: [],
      countySlots: [],
      popupVisible: false,
      val: '请选择客户地区',
      provinces: [],
      citys: [],
      countys: [],
      provinceName: '',
      cityName: '',
      countyName: '',
      key: false
    }
  },
  computed:{
    ...mapState({
      areaVal: state => state.select.areaVal
    })
  },
  created() {
    //获取本地缓存信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
  },
  mounted() {
    this.getProvince()
    // this.$refs.areaPicker.setSlotValue(0, this.val == 1 ? '男' : '女')
  },
  methods:{
    ...mapMutations(["setAreaVal"]),
    handleTouchmove(e) {
      e.preventDefault()
    },
    selectArea() {
      this.popupVisible = true
      this.key = true
    },
    provinceChange(picker, values) {
      if (this.key) {
        this.provinceName = values[0]
        this.getCity(this.getAreaCode(values[0], this.provinces))
        this.citySlots = []
        this.countySlots = []
      }
      // console.log('省份；', values, this.provinceName, this.cityName)
    },
    cityChange(picker, values) {
      if (this.key) {
        this.cityName = values[0]
        this.getCounty(this.getAreaCode(values[0], this.citys))
        this.countySlots = []
      }
      console.log('城市：', values, this.provinceName, this.cityName)
    },
    countyChange(picker, values) {
      if (this.key) {
        this.countyName = values[0]
        // this.getCounty(this.getAreaCode(values[0], this.citys))
        // console.log('县区', values, this.provinces)
        let obj = {
          provinceName: this.provinceName,
          provinceCode: this.getAreaCode(this.provinceName, this.provinces),
          cityName: this.cityName,
          cityCode: this.getAreaCode(this.cityName, this.citys),
          countyName: this.countyName,
          countyCode: this.getAreaCode(this.countyName, this.countys)
        }
        this.$emit('areaChange', obj)
        this.setAreaVal(obj)
      }
    },
    // 根据省名/城市名/地区名匹配对应的行政代码。
    searchCode(arr, name) {
      for (let i = 0; i < arr.length; i ++) {
        if (arr[i].name.indexOf(name) !== -1) {
          return arr[i].code
        }
      }
    },
    getProvince() {
      mango.getAjax(this, 'province', {},'v3').then((res) => {
        res = res.data
        // this.getCity(res[0].code)
        this.provinces = res
        let temp = this.filtrateName(res)
        temp.unshift('请选择省份')
        if (res) {
          this.provinceSlots = [{
            values: temp,
            className: 'provinceSlot'
          }]
        }
      })
    },
    getCity(province) {
      // return new Promise((resolve, reject) => {
        mango.getAjax(this, 'city', {
          province: province
        },'v3').then((res) => {
          res = res.data
          if (res) {
            this.citys = res
            let temp = this.filtrateName(res)
            temp.unshift('请选择市')
            this.citySlots = [{
              values: temp,
              className: 'citySlot'
            }]
          }
          // resolve(res)
        })
      // })
    },
    getCounty(city) {
      // return new Promise((resolve, reject) => {
        mango.getAjax(this, 'area', {
          city: city
        },'v3').then((res) => {
          res = res.data
          if (res) {
            this.countys = res
            let temp = this.filtrateName(res)
            temp.unshift('请选择区县')
            this.countySlots = [{
              values: temp,
              className: 'countySlot'
            }]
          }
        })
      // })
    },
    filtrateName(arr) {
      return arr.map((item) => {
        return item.name
      })
    },
    getAreaCode(str, arr) {
      let index = -1
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name == str) {
          index = i
        }
      }
      if (arr[index]) {
        return arr[index].code
      } else {
        return false
      }
    }
  }
  }

</script>

<style lang="scss" scope>
  .areaSelect{
    ul{
      width: 100%;
    }
  }
  .pickerContainer{
    .mint-popup{
      width: 100vw;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      // align-items: flex-start;
    }
  }
  .provincePicker {
    flex: 0.4
  }
  .cityPicker {
    flex: 0.3
  }
  .countyPicker {
    flex: 0.3
  }
  .picker-item{
    font-size:3.38vw;
  }
</style>