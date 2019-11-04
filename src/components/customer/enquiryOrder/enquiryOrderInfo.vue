<template>
  <div class="enquiryOrderInfo">
    <div class="address-icon"></div>
    <div class="address-right">
      <ul>
        <li>
          <!-- 收货人：{{ `*${list.username ? list.username.slice(1, 10) : ''}` }} -->
          收货人：{{ list.username }}
          <span>{{ list.phone }}</span>
          <!-- <span>{{ `******${list.phone ? list.phone.slice(6, 11) : ''}` }}</span> -->
          <div class="phone"></div>
        </li>
        <li>收货地址：{{ address }}</li>
        <!-- <li>收获地址：{{ `******${list.address ? list.address.slice(6, 50) : ''}` }}</li> -->
        <li>需求日期：{{ turnDate(list.demandTime) }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex, { mapMutations, mapState } from 'vuex'
import mango from '../../../js'

export default {
  props: {
    list: {
      type: [Object, Array],
      default: [],
      required: false
    }
  },
  watch: {
    list() {
      if (this.list.addressId) {
        this.getAddress()
      }
    }
  },
  data() {
    return {
      address: ''
    }
  },
  methods: {
    //获取地址
    getAddress() {
      // console.log(111,this.list.addressId)
      let id = this.list.addressId
      mango
        .getAjax('/v2/app/address', {
          addressId: id
        })
        .then(res => {
          if (res.data) {
            this.address =
              res.data.provinceName +
              res.data.cityName +
              res.data.districtName +
              res.data.address +
              res.data.housingEstate
          }
        })
        .catch(reject => {
          if (reject === 510) {
            this.getAddress()
          }
        })
    },
    // 将日期格式2018-01-01改成2018年01月01日
    turnDate(date) {
      if (date) {
        let arr = date.split('-')
        if (arr.length > 1) {
          return `${arr[0]}年${arr[1]}月${arr[2]}日`
        } else {
          return date
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.enquiryOrderInfo {
  background: #fff;
  display: flex;
  align-items: center;
  padding: 5.333vw 0;
  font-size: 3.73vw;
  color: #363636;
  //height: 28vw;
  overflow: scroll;
  // justify-content: space-between;
  .address-right {
    min-height: 20vw;
    flex: 1;
  }
  .address-icon {
    background: url('../../../assets/imgs/address.png') no-repeat center;
    background-size: 100% 100%;
    width: 6.46vw;
    height: 6.53vw;
    margin-left: 4.13vw;
    margin-right: 5.06vw;
  }
  span {
    color: #999;
    margin-left: 6.66vw;
  }
  li:nth-child(1) {
    display: flex;
    align-items: center;
  }
  .phone {
    background: url('../../../assets/imgs/phone.png') no-repeat center;
    background-size: 100% 100%;
    width: 3.06vw;
    height: 3.06vw;
    margin-left: 1vw;
  }
}
</style>
