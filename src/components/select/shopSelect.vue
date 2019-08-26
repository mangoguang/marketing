<template>
  <li class="shopSelect">
    <ul>
      <li is="customerLi" :leftText="'所属门店'" :start='start' :icon="true" @click.native="selectShop">
        <span class='shop'>{{ val }}</span>
      </li>
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
  props: ['start','type'],
  components:{customerLi},
  data() {
    return {
      slots: [{values: []}],
      popupVisible: false,
      key: false,
      shopName: '',
      val: ''
    }
  },
  computed:{
    ...mapState({
      shopVal: state => state.chooseShop.shopVal,
      descriptShopVal: state => state.chooseShop.descriptShopVal
    })
  },
  watch: {
    shopVal() {
      this.hasList()
    },
    descriptShopVal() {
      this.hasList()
    }
  },
  mounted() {
    this.hasList()
  },
  methods:{
    ...mapMutations(['getShopVal']),
    hasList() {
      // this.val =  this.shopVal? this.shopVal : (this.shopList && this.shopList.length? this.shopList[0].name: '')
      if(this.type === 'descript') {
        this.val = this.descriptShopVal
      }else {
        this.val = this.shopVal
      }
      // console.log('shopval',this.val)
    },
    // getShopName() {
    //   let shopName = []
    //   if(this.shops) {
    //     this.shops.forEach((item, index) => {
    //     shopName.push(item.name)
    //     this.slots[0].values = shopName
    //   });
    //   }
    // },
    selectShop() {
      this.$router.push({
        path: '/chooseShop',
        query: {
          type: this.type
        }
      })
      // if(this.shopVal === '') {
      //   this.setShopVal(this.slots[0].values[0])
      // }else {
      //   this.$refs.sourcePicker.setSlotValue(0, this.shopVal)
      // }
      // this.popupVisible = true
    }
    // onValuesChange(picker, values) {
    //   if(this.key) {
    //     this.$emit('shopChange', values[0])
    //   }else {
    //     this.key = true
    //   }
    // }
  }
  }

</script>

<style lang="scss">
  .shopSelect{
    ul{
      width: 100%;
    }
  }
</style>