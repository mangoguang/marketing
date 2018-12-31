<template>
  <li class="areaSelect">
    <ul>
      <li is="customerLi" :leftText="'客户地区'" :icon="true" @click.native="selectArea">
        <span>{{val}}</span>
      </li>
      <!-- 性别选择插件 -->
      <li>
        <mt-popup 
      position="bottom"
      v-model="popupVisible">
        <mt-picker
        :slots="slots"
        @change="onValuesChange"
        ref="areaPicker"></mt-picker>
      </mt-popup>
      </li>
    </ul>
  </li>
</template>

<script>

import Vue from 'vue'
import VueRouter from 'vue-router'
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
  props: ['areaVal'],
  data() {
    return {
      slots: [],
      popupVisible: false,
      val: '请选择客户地区',
      provinces: [],
      provinceName: '广东省',
      cityName: '惠州市',
      county: '惠东县'
    }
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
    selectArea() {
      this.popupVisible = true
      mango.key = false
    },
    onValuesChange(picker, values) {
        // if (values) {
        //   // 选择省级行政单位
        //   if (this.provinceName !== values[0]) {
        //     this.provinceName = values[0]
        //     console.log('省份改变了1::', values[0])
        //     // this.city = []
        //     console.log('省代码：', this.searchCode(this.province, values[0]))
        //     this.getCity(this.searchCode(this.province, values[0]))
        //     // this.customerDemand[this.proto]
        //   // 选择市级行政单位
        //   } else if (this.cityName !== values[1]) {
        //     this.cityName = values[1]
        //     console.log('城市改变了1::', values[1])
        //     // this.county = []
        //     this.getCounty(this.searchCode(this.city, values[1]))
        //   // 选择县级行政单位
        //   } else if (this.countyName !== values[2]) {
        //     this.countyName = values[2]
        //     console.log('地区改变了1::', values[2])
        //   }
        // }
      // if (!mango.key) {
      //   console.log('zhi改变了')
      //   this.getCity(this.getAreaCode(values[0], this.provinces))
      // }
      // console.log(values[0])
      // this.val = values[0]
      // this.$emit('selectArea', values[0])
    },
    getProvince() {
      mango.getAjax(this, 'province', {},'v3').then((res) => {
        res = res.data
        this.provinces = res
        if (res) {
          this.getCity(this.getAreaCode('广东省', this.provinces))
          this.slots = [{
            values: this.filtrateName(res),
            className: 'slot1'
          }]
        }
      })
    },
    getCity(province) {
      mango.getAjax(this, 'city', {
            province: province
          },'v3').then((res) => {
            res = res.data
            if (res) {
              this.city = res
              this.slots = [{
                values: this.filtrateName(this.provinces),
                className: 'slot1'
              }, {
                values: this.filtrateName(res),
                className: 'slot2'
              }]
            }
          })
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

<style lang="scss">
  .areaSelect{
    ul{
      width: 100%;
    }
  }
</style>