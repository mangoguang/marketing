<template>
  <li class="addressSelect">
    <ul>
      <li is="customerLi" :leftText="'客户地址'" :icon="true" @click.native="selectArea">
        <span>{{provinceName ? `${provinceName} ${cityName} ${areaName}` : '请选择客户地址'}}</span>
      </li>
      <li>
      <mt-popup 
        position="bottom"
        v-model="popupVisible">
        <mt-picker
          :slots="slots"
          @change="onValueChange"
          ref="picker"
          :visible-item-count="7"
          >
        </mt-picker>
      </mt-popup>
      </li>
    </ul>
  </li>
</template>

<script>

import Vue from 'vue'
import VueRouter from 'vue-router'
import { DatetimePicker, Picker, Popup } from 'mint-ui'
Vue.component(Picker.name, Picker)
Vue.component(Popup.name, Popup)
import customerLi from '../customer/customerLi'
import mango from '../../js'
export default {
  name: 'addressSelect',
  components:{customerLi},
  props: ['addressVal'],
  data() {
    return {
      provinceName: '',
      cityName: '',
      areaName: '',
      popupVisible: false,
      ajaxData: [],
      arr:'',
      provinceCode:'',
      slots:[],
      type:''
    }
  },
  watch:{
    
  },
  created() {
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
  },
  mounted() {

  },
  methods:{
    selectArea() {
      this.popupVisible = true
      this.getProvince()
    },
    onValueChange(picker, values) {

    },
    provinceChange() {
   
    },
    cityChange() {

    },
    areaChange() {

    },
    //获得省
    getProvince() {
      mango.getAjax(this, 'province', {},'v3').then((res) => {
        res = res.data 
        if (res) {
          this.province = res
          let obj=[]
          this.province.forEach((item,index) => {
            obj.push(item.name)
          })
          this.$set(this.slots[0],'values',obj)
          console.log(this.slots)
        }
      })
    },
    //获得市
    getCity(province) {
      mango.getAjax(this, 'city', {
        province: province
      },'v3').then((res) => {
        res = res.data
        if (res) {
          this.city = res
          let o=[]
          this.city.forEach((item,index) => {
            o.push(item.name)
          })
          this.$set(this.slots[1],'values',o)
          console.log(4444,this.slots)
          // this.slots[1].values = o
        }
      })
     
    },
    getArea(city) {
      console.log(mango.key)
      return new Promise((resolve, reject) => {
        mango.getAjax(this, 'area', {
          city: city
        },'v3').then((res) => {
          res = res.data
          if (res) {
            this.county = res
            this.slots = [{
              values: this.provinceNames,
              className: 'slot1'
            }, {
              values: this.cityNames,
              className: 'slot2'
            }, {
              values: this.countyNames,
              className: 'slot3'
            }]
          }
          resolve(res)
        })
      })
    },
     searchCode(arr, name) {
      for (let i = 0; i < arr.length; i ++) {
        if (arr[i].name.indexOf(name) !== -1) {
          return arr[i].code
        }
      }
    },
    getCode(name) {
      this.province.forEach((item,index) => {
        if(item.name === name) {
          this.provinceCode = item.code
        }
      })
    }
  }
  }

</script>

<style lang="scss">
  .addressSelect{
    ul{
      width: 100%;
    }
  }
</style>