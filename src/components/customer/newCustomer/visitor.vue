<template>
  <div class="visitor">
    <ul>
      <!-- <li is="customerLi" :leftText="'客户姓名'">
        <input v-model="info.username" type="text" placeholder="无名氏">
      </li> -->
      <!-- <li is="customerLi" :leftText="'客户性别'">
        <span @click="selectSex">{{info.sex || '男'}}</span>
      </li> -->
      <!-- <li is="sexSelect" :sexVal="info.sex" @sexChange="sexChange"></li> -->
      <!-- <li is="customerLi" :leftText="'意向产品'">
        <input v-model="info.demand" placeholder="填写客户意向产品" type="text">
      </li> -->
      <li is="leaveStoreSelect" :leaveStoreVal="info.leaveStore" @leaveStoreChange="leaveStoreChange"></li>
      <!-- <li is="customerLi" :leftText="'留店时间'" :icon="true">
        <span @click="selectTime">{{info.leaveStore || '选择客户留店时间'}}</span>
      </li> -->
      <li is="customerLi" :leftText="'进店日期'" :icon="true" @click.native="selectStoreDate">
        <span :style="timeColor">{{turnDate(info.storeDate) || Time}}</span>
      </li>
      <li is="shopSelect" @shopChange="shopChange"></li>
      <!-- <li is="customerLi" :leftText="'所属门店'" :icon="true" @click.native="selectShopId">
        <span>{{shopName}}</span>
      </li> -->
      <li class="textarea">
        <remark :title="'备注'">
          <textarea name="" id="" placeholder="描述一下情况吧"></textarea>
        </remark>
        <!-- <h3>备注：</h3>
        <textarea name="" id="" cols="30" rows="10"></textarea> -->
      </li>
      <!-- <my-range :title="'成交概率'" @changeVal="changeMyRangeVal" /> -->
      <!-- <li class="range">
        成交率
        <mt-range
          v-model="rangeValue"
          :min="0"
          :max="100"
          :step="5"
          :bar-height="5">
          <div slot="end">{{`${rangeValue}%`}}</div>
        </mt-range>
      </li> -->
      <li class="saveBtn"><big-btn :text="'保存'" @click.native="saveCustomerInfo"></big-btn></li>
    </ul>
      <mt-popup 
      class="picker"
      position="bottom"
      v-model="popupVisible">
        <mt-picker
        :slots="slots"
        @change="onValuesChange"
        ref="Picker"></mt-picker>
      </mt-popup>
        <mt-datetime-picker
        ref="datePicker"
        type="date"
        v-model="today"
        :startDate="new Date('1930-01-01')"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="setStoreDate">
      </mt-datetime-picker>
  </div>
</template>

<script>
import Vue from "vue"
import {Picker, Popup, MessageBox, DatetimePicker} from 'mint-ui'
import Vuex, { mapMutations, mapState} from 'vuex'
import leaveStoreSelect from '../../select/leaveStoreSelect'
import shopSelect from '../../select/shopSelect'
import sexSelect from '../../select/sexSelect'
Vue.component(Picker.name, Picker)
Vue.component(Popup.name, Popup)
Vue.component(DatetimePicker.name, DatetimePicker)
import customerLi from '../customerLi'
import bigBtn from '../bigBtn'
import myRange from '../myRange'
import remark from '../remark'
import mango from '../../../js'
export default {
  name:'visitor',
  components: {
    customerLi,
    bigBtn,
    myRange,
    remark,
    leaveStoreSelect,
    sexSelect,
    shopSelect
  },
  data(){
    return{
      info: {
        percent: 50
      },
      slots: [],
      proto: '',
      popupVisible: false,
      shopNameList: [{values: []}],
      shopName: '',
      shopId: '',
      today: new Date(),
      shops: [],
      Time: '',
      timeColor: 'color: #999'
    }
  },
  created() {
    //获取本地缓存信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    let shops = localStorage.getItem('shops')
    this.shops = JSON.parse(shops)
    this.Time = this.turnDate(mango.indexTimeB(this.today)[1])
  },
  computed: {
     ...mapState({
      sexVal: state => state.select.sexVal,
      leaveStoreVal: state => state.select.leaveStoreVal,
      shopVal: state => state.select.shopVal
    })
  },
  destroyed(){
    this.setSexVal('')
    this.setLeaveStoreVal('')
    this.setShopVal('')
  },
  methods: {
    ...mapMutations([
      'setSexVal',
      'setLeaveStoreVal',
      'setShopVal'
    ]),
    shopChange(val) {
      this.setShopVal(val)
    },
    selectStoreDate() {
      this.$refs.datePicker.open()
    },
    setStoreDate(value) {
      this.timeColor = 'color: #363636'
      this.$set(this.info, 'storeDate', mango.indexTimeB(value)[1])
    },
    // getShopName() {
    //   let shopName = []
    //   if(this.shops) {
    //     this.shops.forEach((item, index) => {
    //     shopName.push(item.name)
    //     this.shopNameList[0].values = shopName
    //   });
    //   }
    //   this.shopName = this.shopNameList[0].values[0]
    //   this.getShopID(this.shopName)
    //   this.$set(this.info, 'shopId', this.shopId)
    // },
    getShopID(name) {
      if(this.shops) {
        this.shops.forEach((item, index) => {
          if(item.name === name) {
            this.shopId = item.id
          }
      });
      this.$set(this.info, 'shopId', this.shopId)
      }
    },
    sexChange(val) {
      if(val === '') {
        val = 0
        this.info.sex = val
      } else {
        this.info.sex = val === '男' ? 1 : 2
      }
      this.setSexVal(val)
    },
    leaveStoreChange(val) {
      // console.log('sex改变了：', val)
      this.setLeaveStoreVal(val)
      this.info.leaveStore = val
    },
    saveCustomerInfo() {
      if(!this.info.username || this.info.username === '') {
        this.info.username = '无名氏'
      }
      this.getShopID(this.shopVal)
      let [params, tempObj] = [{
        account: this.ajaxData.account,   //登录账户
        tenantId: this.ajaxData.tenantId,
        'details.username': this.info.username,
        'details.sex': this.info.sex? this.info.sex : 0,
        'details.leaveStore': this.info.leaveStore,
        'demand.intention': this.info.intention,
        'demand.remark': this.info.remark,
        'record.probability': `${this.info.percent}%`,
        'demand.shopId': this.info.shopId,
        'details.storeDate':this.info.storeDate || mango.indexTimeB(new Date())[1]
      }, {}]
      for (let key in params) {
        if (params[key]) {
          tempObj[key] = params[key]
        }
      }
      if(this.info.shopId) {
        mango.getAjax(this, 'customer/update', tempObj,'v2', 'post').then((res) => {
        if (res) {
          MessageBox.alert('保存成功！').then(action => {
            this.$router.go(0)
          })
        }
        })
      }else{
        mango.tip('请选择门店')
      }
     


      // mango.getAjax(this, 'customer/update', tempObj,'v2', 'post').then((res) => {
      //   console.log('保存数据成功', res)
      // })
    },
    // selectShopId() {
    //   this.slots = this.shopNameList
    //   this.proto = 'shopId'
    //   // 设置性别选择插件的初始值
    //   this.$refs.Picker.setSlotValue(0, this.shopName)
    //   this.popupVisible = true
    // },
    selectSex() {
      this.proto = 'sex'
      this.slots = [{values: ['男', '女']}]
      this.popupVisible = true
    },
    selectTime() {
      this.proto = 'time'
      this.slots = [{values: ['15分钟', '30分钟', '45分钟', '1小时以上']}]
      this.popupVisible = true
    },
    setTime(value) {
      this.customerDemand.storeDate = mango.indexTimeB(value)[0]
    },
    changeMyRangeVal(val) {
      // console.log('mtrange:', val)
      this.info.percent = val
    },
    onValuesChange(picker, values) {
      if (this.proto === 'sex') {
        this.info.sex = values[0]
      } else {
        this.info.leaveStore = values[0]
      }
    },
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
@import "../../../assets/common.scss";
ul{
  display: flex;
  flex-direction: column;
  li{
    display: flex;
    h3{
      color: $fontCol;
      font-size: $fontSize;
      padding: 0 5vw;
      line-height: 3em;
      border-bottom: 1px solid #ccc;
    }
    textarea{
      background: #fff;
      width: 100vw;
      height: 40vw;
      padding: 3vw 5vw;
      box-sizing: border-box;
      font-size: $fontSize;
    }
  }
  li.textarea{
    display: block;
  }
  li.range{
    display: block;
    padding: 0 5vw;
  }
  .saveBtn{
    margin-top: 10vw;
  }
}
.picker{
  width: 100vw;
}
</style>
