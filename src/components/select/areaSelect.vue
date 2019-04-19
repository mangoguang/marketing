<template>
  <li class="areaSelect">
    <ul>
      <li is="customerLi" :leftText="'客户地区'" :icon="true" @click.native="selectArea">
        <span>{{areaVal && areaVal.provinceName != '' ? `${areaVal.provinceName} ${areaVal.cityName} ${areaVal.countryName}` : '请选择客户地区'}}</span>
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
import {IndexModel} from '../../utils/index'
const indexModel = new IndexModel()
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
      countryName: '',
      key: false,
      cityKey: false,
      areaKey: false
    }
  },
  computed:{
    ...mapState({
      areaVal: state => state.select.areaVal,
      newCustomerInfo: state => state.customer.newCustomerInfo
    })
  },
  mounted() {
    this.getProvince()
    this.init()
  },
  methods:{
    ...mapMutations(["setAreaVal"]),
    init() {
      if(!this.newCustomerInfo.provinceName) {
        return
      } 
      this.color = 'color: #363636'
      let obj = {
        provinceName: this.newCustomerInfo.provinceName,
        cityName: this.newCustomerInfo.cityName,
        countryName: this.newCustomerInfo.countryName
      }
      this.setAreaVal(obj)
    },
    selectArea() {
      this.popupVisible = true
      this.key = true
    },
    provinceChange(picker, values) {
      if (this.key) {
        this.provinceName = values[0]
        this.getCity(this.getAreaCode(values[0], this.provinces)[0])

        this.citySlots = []
        this.countySlots = []
      }else {
        this.key = true
      }
    },
    cityChange(picker, values) {
      if (this.cityKey) {
        // console.log('city')
        this.cityName = values[0]
        this.getCounty(this.getAreaCode(values[0], this.citys)[0])
        this.countySlots = []
      }else {
        this.cityKey = true
      }
    },
    countyChange(picker, values) {
      if (this.areaKey) {
        // console.log('area')
        this.countryName = values[0]
        // this.getCounty(this.getAreaCode(values[0], this.citys)[0])
        // console.log('县区', values, this.provinces)
        let obj = {
          provinceName: this.provinceName,
          provinceCode: this.getAreaCode(this.provinceName, this.provinces)[1],
          cityName: this.cityName,
          cityCode: this.getAreaCode(this.cityName, this.citys)[1],
          countryName: this.countryName,
          countyCode: this.getAreaCode(this.countryName, this.countys)[1]
        }
        this.$emit('areaChange', obj)
        this.setAreaVal(obj)
      }else {
        this.areaKey = true
      }
    },
    // 根据省名/城市名/地区名匹配对应的行政代码。
    searchCode(arr, name) {
      for (let i = 0; i < arr.length; i ++) {
        if (arr[i].name.indexOf(name) !== -1) {
          return arr[i].id
        }
      }
    },
    getProvince() {
      indexModel.getCity('DR_STATE').then(res => {
        if(res.data) {
          this.getCity(res.data[0].id)
          this.provinces = res.data
          let temp = this.filtrateName(res.data)
          temp.unshift('请选择省份')
          this.provinceSlots = [{
            values: temp,
            className: 'provinceSlot'
          }]
        }
      })
      // mango.getAjax(this, 'province', {},'v3').then((res) => {
      //   res = res.data
      //   // this.getCity(res[0].id)
      //   this.provinces = res
      //   let temp = this.filtrateName(res)
      //   temp.unshift('请选择省份')
      //   if (res) {
      //     this.provinceSlots = [{
      //       values: temp,
      //       className: 'provinceSlot'
      //     }]
      //   }
      // })
    },
    getCity(province) {
      // console.log('city: provinceCode',province)
      indexModel.getCity('DR_CITY',province).then(res => {
        if(res.data) {
          this.citys = res.data
          let temp = this.filtrateName(res.data)
           temp.unshift('请选择市')
           this.citySlots = [{
              values: temp,
              className: 'citySlot'
            }]
        }
      })
        // mango.getAjax('/v1/api/public/address', {
        //   type: 'DR_CITY',
        //   parentCode: province
        // }).then((res) => {
        //   res = res.data
        //   if (res) {
        //     this.citys = res
        //     let temp = this.filtrateName(res)
        //     temp.unshift('请选择市')
        //     this.citySlots = [{
        //       values: temp,
        //       className: 'citySlot'
        //     }]
        //   }
        // })
    },
    getCounty(city) {
      indexModel.getCity('DR_COUNTY',city).then(res => {
        if(res.data) {
          this.countys = res.data
          let temp = this.filtrateName(res.data)
           temp.unshift('请选择区县')
           this.countySlots = [{
              values: temp,
              className: 'countySlot'
            }]
        }
      })
        // mango.getAjax(this, 'area', {
        //   city: city
        // },'v3').then((res) => {
        //   res = res.data
        //   if (res) {
        //     this.countys = res
        //     let temp = this.filtrateName(res)
        //     temp.unshift('请选择区县')
        //     this.countySlots = [{
        //       values: temp,
        //       className: 'countySlot'
        //     }]
        //   }
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
        return [arr[index].id,arr[index].code]
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
      display: flex;
      flex-direction: row;
      justify-content: center;
      // align-items: flex-start;
    }
  }
</style>