<template>
  <li class="sourceSelect">
    <ul>
      <li is="customerLi" :leftText="'所属门店'" :start='"*"' :icon="true" @click.native="selectShop">
        <!-- <span>{{shopVal || '请选择门店'}}</span> -->
        <span>{{ val }}</span>
      </li>
      <!-- 性别选择插件 -->
      <!-- <li>
      <mt-popup 
      position="bottom"
      v-model="popupVisible">
        <mt-picker
        :slots="slots"
        @change="onValuesChange"
        ref="sourcePicker"></mt-picker>
      </mt-popup>
      </li> -->
    </ul>
  </li>
</template>

<script>

import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex, { mapMutations, mapState } from "vuex"
import { Picker, Popup } from 'mint-ui'
import {btnList} from '../../utils/gallery'
Vue.component(Picker.name, Picker)
Vue.component(Popup.name, Popup)
import customerLi from '../customer/customerLi'

export default {
  name: 'shopSelect',
  components:{customerLi},
  data() {
    return {
      slots: [{values: []}],
      popupVisible: false,
      key: false,
      shop: [],
      shopName: '',
      val: ''
    }
  },
  computed:{
    ...mapState({
      shopVal: state => state.select.shopVal,
      shopList: state => state.chooseShop.shopList,
      shopVal: state => state.chooseShop.shopVal
    })
  },
  mounted() {
    let shops = localStorage.getItem('shops')
    this.shops = btnList(JSON.parse(shops), 0)
    this.initShopList(this.shops)
    // this.getShopName()
    this.hasList()
  },
  methods:{
    ...mapMutations(["setShopVal", 'initShopList']),
    hasList() {
      this.val =  this.shopVal? this.shopVal : (this.shopList && this.shopList.length? this.shopList[0].name: '')
    },
    getShopName() {
      let shopName = []
      if(this.shops) {
        this.shops.forEach((item, index) => {
        shopName.push(item.name)
        this.slots[0].values = shopName
      });
      }
    },
    selectShop() {
      console.log(123)
      this.$router.push({
        path: '/chooseShop'
      })
      // if(this.shopVal === '') {
      //   this.setShopVal(this.slots[0].values[0])
      // }else {
      //   this.$refs.sourcePicker.setSlotValue(0, this.shopVal)
      // }
      // this.popupVisible = true
    },
    onValuesChange(picker, values) {
      if(this.key) {
        this.$emit('shopChange', values[0])
      }else {
        this.key = true
      }
    }
  }
  }

</script>

<style lang="scss">
  .sourceSelect{
    ul{
      width: 100%;
    }
  }
</style>