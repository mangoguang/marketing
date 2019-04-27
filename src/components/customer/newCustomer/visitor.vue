<template>
  <div class="visitor">
    <ul>
      <li is="leaveStoreSelect"  @leaveStoreChange="leaveStoreChange"></li>
      <li is="customerLi" :leftText="'进店日期'" :icon="true" @click.native="selectStoreDate">
        <span :style="timeColor">{{turnDate(newCustomerInfo.arrivalDate) || turnDate(Time)}}</span>
      </li>
      <li is="shopSelect"></li>
      <li class="textarea">
        <remark :title="'备注'">
          <textarea v-model="newCustomerInfo.remark" name="" id="" placeholder="描述一下情况吧"></textarea>
        </remark>
      </li>
      <li class="saveBtn"><big-btn :text="'保存'" @click.native="saveCustomerInfo" class="myBtn"></big-btn></li>
    </ul>
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
import { IndexModel } from "../../../utils/index";
const indexModel = new IndexModel();
import Vue from "vue"
import {Picker, Popup, MessageBox, DatetimePicker} from 'mint-ui'
import Vuex, { mapMutations, mapState} from 'vuex'
import leaveStoreSelect from '../../select/leaveStoreSelect'
import shopSelect from '../../select/shopSelect'
Vue.component(Picker.name, Picker)
Vue.component(Popup.name, Popup)
Vue.component(DatetimePicker.name, DatetimePicker)
import customerLi from '../customerLi'
import bigBtn from '../bigBtn'
import remark from '../remark'
import mango from '../../../js'
export default {
  name:'visitor',
  props: ['fromName'],
  components: {
    customerLi,
    bigBtn,
    remark,
    leaveStoreSelect,
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
    let shops = localStorage.getItem('shops')
    this.shops = JSON.parse(shops)
    this.Time = mango.indexTimeB(this.today)[1]
  },
  watch: {
    fromName() {
      if(this.fromName === 'chooseShop') {
        this.timeColor = this.newCustomerInfo.arrivalDate? 'color: #363636' :'color: #999'
      }else {
        this.initData()
      }
      let val = this.getShopVal()
      this.getShopId(val)
    }
  },
  computed: {
     ...mapState({
      leaveStoreVal: state => state.select.leaveStoreVal,
      shopList: state => state.chooseShop.shopList,
      newCustomerInfo: state => state.customer.newCustomerInfo
    })
  },
  methods: {
    ...mapMutations([
      'setLeaveStoreVal',
      'setNewCustomerInfo'
    ]),
     //初始化数据
    initData() {
      this.setNewCustomerInfo({})
      this.setLeaveStoreVal('')
    },
    //获取门店的值
    getShopVal() {
      let val
      if(this.shopList && this.shopList.length) {
        this.shopList.forEach((item, index) => {
          if(item.status) {
            val = item.name
          }
        })
      }
      return val
    },
    //获取门店id
    getShopId(name) {
      if(this.shops && this.shops.length) {
        this.shops.forEach((item, index) => {
          if(item.name === name) {
            this.shopId = item.id
          }
      });
      }
      this.newCustomerInfo.shopId = this.shopId
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    //选择日期
    selectStoreDate() {
      this.$refs.datePicker.open()
    },
    setStoreDate(value) {
      this.timeColor = 'color: #363636'
      this.$set(this.newCustomerInfo, 'arrivalDate', mango.indexTimeB(value)[1])
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    //留店时长
    leaveStoreChange(val) {
      // console.log('sex改变了：', val)
      this.setLeaveStoreVal(val)
      this.newCustomerInfo.residentTime = val
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    saveCustomerInfo() {
      let parmas = this.getParmas()
      indexModel.getVisitor(parmas,'post').then(res => {
        if(res.status === 1) {
          this.$router.push('/Customer')
        }
      })
    },
    //获取参数
    getParmas() {
       let [params,tempObj] = [{
        'opportunity.residentTime': this.newCustomerInfo.residentTime,
        'opportunity.shopId': this.newCustomerInfo.shopId,
        'opportunity.arrivalDate': this.newCustomerInfo.arrivalDate || this.Time,
        'remark': this.newCustomerInfo.remark
      }, {}]
      for (let key in params) {
        if (params[key]) {
          tempObj[key] = params[key]
        }
      }
      return tempObj
    },
    //日期转换
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
 .myBtn {
    background:rgba(0,122,255,1)!important;
    border: .13vw solid rgba(0,93,194,1)!important;
  }
</style>
