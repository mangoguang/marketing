<template>
  <div class="customerDescript">
    <ul>
      <li is="customerLi" :leftText="'头像'" :icon="true" >
        <unLoadVia class="upload" :select='select'/>
        <!--select表示直接选择照片-->
      </li>
      <li is="customerLi" :leftText="'客户称呼'" :start='"*"'>
        <input v-model="newCustomerInfo.username" type="text" placeholder="请填写客户称呼" class="name">
      </li>
      <li is="sexSelect" :sexVal="newCustomerInfo.sex"  @sexChange="sexChange" class="sex"></li>
      <!-- <li is="customerLi" :leftText="'客户性别'" :icon="true" :start='"*"' @click.native="selectSex">
        <span>{{newCustomerInfo.sex == 1 ? '男' : '女'}}</span>
      </li> -->
       <li is="customerLi" :leftText="'客户生日'" :icon="true" @click.native="selectStoreDate">
        <span :style="newCustomerInfo.birthday?'color: #363636':color ">{{turnDate(newCustomerInfo.birthday) || '请选择客户生日'}}</span>
      </li>
      <!-- <li is="customerLi" :leftText="'客户生日'" :icon="true" @click.native="selectStoreDate">
        <span>{{turnDate(newCustomerInfo.storeDate)}}</span>
      </li> -->
      <li is="ageSelect" :ageVal="newCustomerInfo.age"  @ageChange="ageChange"></li>
      <li is="customerLi" :leftText="'客户电话'">
        <input v-model="newCustomerInfo.phone" type="text" placeholder="请填写客户电话">
      </li>
      <li is="customerLi" :leftText="'客户微信'">
        <input v-model="newCustomerInfo.weChat" type="text" placeholder="请填写客户微信号">
      </li>
      <li is="customerLi" :leftText="'客户 QQ'">
        <input v-model="newCustomerInfo.qq" type="text" placeholder="请填写客户 QQ">
      </li>
      <li is="customerLi" :leftText="'客户职业'">
        <input v-model="newCustomerInfo.duty" type="text" placeholder="请填写客户职业">
      </li>
      <!-- <li is="areaSelect" @areaChange="areaChange"></li> -->
       <li is="customerLi" :leftText="'客户地址'" :icon="true" @click.native='toNewAdress'>
         <span>地址管理</span>
        <!-- <input v-model="newCustomerInfo.address" type="text"  placeholder="请填写客户地址"> -->
      </li>
      <li class="textarea">
        <h3>客户描述</h3>
        <textarea v-model="newCustomerInfo.remark" placeholder="描述一下情况吧"></textarea>
      </li>
      <!-- <li is="sourceSelect" :sourceVal="newCustomerInfo.source" @sourceChange="sourceChange"></li> -->
      
      <!-- <li is="addressSelect" :addressVal="newCustomerInfo.address" @addressChange="addressChange"></li> -->
      <!-- <li is="customerLi" :leftText="'客户来源'" :icon="true" @click.native="selectSource">
        <span>{{newCustomerInfo.source || '请选择客户来源'}}</span>
      </li> -->
      <!-- <li is="customerLi" :leftText="'客户地区'" :icon="true" @click.native="selectArea">
        <span>{{provinceName ? `${provinceName} ${cityName} ${countyName}` : '请选择客户地区'}}</span>
      </li> -->
      <!-- <addressSelect></addressSelect> -->
      <!-- <li is="customerLi" :leftText="'留店时长'" :icon="true" @click.native="selectTime">
        <span>{{newCustomerInfo.leaveStore || '请选择客户留店时间'}}</span>
      </li> -->
      <!-- <li is="leaveStoreSelect" :leaveStoreVal="newCustomerInfo.leaveStore" @leaveStoreChange="leaveStoreChange"></li> -->
      <!-- <li class="important">
        关键程度
        <div>
          <button 
          v-for="(item, index) in importantBtns" 
          :key="`importantBtns${index}`"
          @click="changeImportant(index)"
          :class="{on: item.status}">{{item.name}}</button>
        </div>
      </li> -->
      <!-- <li class="urgency">
        是否紧急 -->
        <!-- <div>
          <button 
          v-for="(item, index) in importantBtns" 
          :key="`importantBtns${index}`"
          @click="changeImportant(index)"
          :class="{on: item.status}">{{item.name}}</button>
        </div> -->
        <!-- <div class="switchBox"><mt-switch v-model="urgency"></mt-switch></div> -->
      <!-- </li> -->
    </ul>
    
    <!-- <div class="btnBox">
      <big-btn :text="'下一步'" @click.native="saveCustomerInfo"></big-btn>
    </div> -->
    <!-- mint-ui组件 -->
    <div class="mintComponent">
      <!-- 性别选择插件 -->
      <!-- <mt-popup 
      position="bottom"
      v-model="popupVisible">
        <mt-picker
        :slots="slots"
        @change="onValuesChange"
        ref="Picker"></mt-picker>
      </mt-popup> -->
      <!-- 日期选择插件 -->
      <mt-datetime-picker
        ref="datePicker1"
        type="date"
        v-model="today"
        :startDate="new Date('1930-01-01')"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="setStoreDate1"
        >
      </mt-datetime-picker>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuex, { mapMutations, mapState } from "vuex"
import { DatetimePicker, Picker, Popup, Switch } from 'mint-ui'

Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Picker.name, Picker)
Vue.component(Popup.name, Popup)
Vue.component(Switch.name, Switch)
import customerLi from '../customerLi'
import bigBtn from '../bigBtn'
import unLoadVia from '../customerShare/loadPic'
import sexSelect from '../../select/sexSelect'
import ageSelect from '../../select/ageSelect'
import sourceSelect from '../../select/sourceSelect'
import leaveStoreSelect from '../../select/leaveStoreSelect'
import addressSelect from '../../select/addressSelect'
import areaSelect from '../../select/areaSelect'
import mango from '../../../js'
import variable from '../../../js/variable'
import {turnParams,changeFormData} from '../../../utils/customer'
export default {
  name:'customerDescript',
  props: ['btns', 'select', 'fromName'],
  components: {
    customerLi,
    bigBtn,
    sexSelect,
    sourceSelect,
    leaveStoreSelect,
    addressSelect,
    areaSelect,
    ageSelect,
    unLoadVia
  },
  data(){
    return{
      ImgStatus: false,
      importantBtns: mango.btnList(['高', '中', '低'],0),
      // importantBtns: mango.btnList(['高', '中', '低'], 0),
      // slots: [],
      // sexList: [{values: ['男', '女']}],
      // sourceList: [{values: ['异业联盟', '设计师介绍', '自然进店', '老客带单']}],
      // leaveStoreList: [{values: ['15分钟', '30分钟']}],
      // leaveStoreList: [{values: ['15分钟', '30分钟', '45分钟', '1小时以上']}],
      areaList: [],
      // popupVisible: false,
      // proto: '',
      today: new Date(),
      province: [],
      provinceName: '',
      city: [],
      cityName: '',
      county: [],
      countyName: '',
      parentBtns: [],
      urgency:false,
      color: 'color: #999'
    }
  },
  watch: {
    //初始进来的时候初始化数据
    fromName() {
      if(this.fromName === 'NewCustomer') {
        this.setInitData()
      }
    }
  },
  computed: {
    ...mapState({
      newCustomerInfo: state => state.customer.newCustomerInfo,
      sexVal: state => state.select.sexVal,
      ageVal: state => state.select.ageVal,
      areaVal: state => state.select.areaVal,
      sourceVal: state => state.select.sourceVal,
      leaveStoreVal: state => state.select.leaveStoreVal,
      upLoadUrl: state => state.loadImgUrl.upLoadUrl
    })
  },
  created() {
    //获取本地缓存信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    this.parentBtns = this.btns
  },
  mounted() {
    // this.$set(this.newCustomerInfo, 'birthday', '')
  },
  methods: {
    ...mapMutations([
      "setNewCustomerInfo",
      'setSexVal',
      'setAreaVal',
      'setSourceVal',
      'setLeaveStoreVal',
      'setAgeVal'
    ]),
    //选择地址
    toNewAdress() {
      this.$router.push({path: '/newAddress'})
    },
    checkBtnStatus(obj) {
      for (let i = 0; i < this.importantBtns.length; i++) {
        this.importantBtns[i].status = (obj.important - 1) === i
        // this.importantBtns[i].status = (obj.important - 1) === i
      }
      // obj.sex = obj.sex == 1 ? '男' : '女'
    },
    changeImportant(index) {
      this.importantBtns.forEach((element, i) => {
        element.status = index === i
      })
      this.newCustomerInfo.important = index + 1
    },
    // changeImportant(index) {
    //   this.importantBtns.forEach((element, i) => {
    //     element.status = index === i
    //   })
    //   this.newCustomerInfo.urgency = index + 1
    // },
    // selectSex() {
    //   this.slots = this.sexList
    //   this.proto = 'sex'
    //   // 设置性别选择插件的初始值
    //   this.$refs.Picker.setSlotValue(0, this.newCustomerInfo.sex)
    //   this.popupVisible = true
    // },
    selectStoreDate() {
      this.$refs.datePicker1.open()
      this.color = 'color: #363636'
    },
    // selectSource() {
    //   this.slots = this.sourceList
    //   this.proto = 'source'
    //   // 设置性别选择插件的初始值
    //   this.$refs.Picker.setSlotValue(0, this.newCustomerInfo.source)
    //   this.popupVisible = true
    // },
    // selectArea() {
    //   this.slots = this.areaList
    //   this.proto = 'area'
    //   // 设置地区选择插件的初始值
    //   this.$refs.Picker.setSlotValue(0, this.provinceName)
    //   this.$refs.Picker.setSlotValue(1, this.cityName)
    //   this.$refs.Picker.setSlotValue(2, this.countyName)
    //   this.popupVisible = true
    // },
    // selectTime() {
    //   this.slots = this.leaveStoreList
    //   this.proto = 'leaveStore'
    //   // 设置性别选择插件的初始值
    //   this.$refs.Picker.setSlotValue(0, this.newCustomerInfo.source)
    //   this.popupVisible = true
    // },
    setStoreDate1(value) {
      // this.newCustomerInfo.storeDate = mango.indexTimeB(value)[0]
      this.$set(this.newCustomerInfo,'birthday',mango.indexTimeB(value)[1])
      // console.log('选择的日期', mango.indexTimeB(value)[0], this.newCustomerInfo.storeDate)
    },
    areaChange(val) {
      // console.log('选择的地区：', val)
      this.newCustomerInfo.province = val.provinceCode
      this.newCustomerInfo.city = val.cityCode
      this.newCustomerInfo.area = val.countyCode
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    sexChange(val) {
      // console.log('sex改变了：', val)
      this.newCustomerInfo.sex = val === '男' ? 'Mr.' : 'Ms.'
      this.setSexVal(val)
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    ageChange(val) {
      // console.log('age改变了：', val)
      this.setAgeVal(val)
      this.newCustomerInfo.age = val
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    sourceChange(val) {
      // console.log('sex123改变了：', val)
      this.setSourceVal(val)
      this.newCustomerInfo.source = val
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    leaveStoreChange(val) {
      // console.log('sex改变了：', val)
      this.setLeaveStoreVal(val)
      this.newCustomerInfo.leaveStore = val
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    addressChange(val) {
      // console.log('addresschange')
      // this.newCustomerInfo.leaveStore = val
    },
    checkForm() {
      if (this.username) {
        
      } else {
        console.log('客户姓名未填写')
      }
    },
    //设置默认值
    setInitData() {
      this.setNewCustomerInfo({})
      this.setAgeVal('')
      let record = {
        followDate: ''
      }
      let parmas = {
        // 'phone': '15013999052',
        // 'opportunity.shopId': '1108926117386739714',
        // 'opportunity.arrivalDate': '2019-04-01',
        // 'opportunity.source': 'Natural'
      }
      this.setNewCustomerInfo(parmas)
      // if(this.$route.query.phone) {
      //   this.newCustomerInfo.phone = this.$route.query.phone
      // }else if(this.$route.query.wechat) {
      //   this.newCustomerInfo.weChat = this.$route.query.wechat
      // }
      // this.$set(this.newCustomerInfo, 'storeDate', mango.indexTimeB(this.today)[1])
      // if(!this.newCustomerInfo.important) {
      //   this.$set(this.newCustomerInfo, 'important', 1)
      // }         //关键程度默认选择1，但是没有点击的时候不会保存数据。
      // if(!this.newCustomerInfo.storeDate) {
      //   this.$set(this.newCustomerInfo, 'storeDate', mango.indexTimeB(new Date())[1])
      // } //如果没有选进店时间。默认选择今天
     
    },
    saveCustomerInfo() {
      let testPhoneNum = variable.testPhone(this.newCustomerInfo.phone)
      if(testPhoneNum) {
        let [obj, id] = [this.newCustomerInfo, this.$route.params.id]
        this.setInitData()
        this.setNewCustomerInfo(obj)
        this.parentBtns[0].status = false
        this.parentBtns[1].status = true
        this.$emit('changeBtnsStatus', this.parentBtns)
      }else {
        mango.tip('请填写正确的手机号码')
      }
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
    },
    // 将日期格式2018年01月01日改成2018-01-01
    returnDate(date) {
      if (date) {
        if (date.indexOf('年') !== -1) {
          return date.replace(/年/, "-").replace(/月/, "-").replace(/日/, "")
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
.customerDescript{
  background: $bgCol;
 
  &>li{
    padding: 0 5vw;
  }
  li{
    // display: flex;
    // direction: row;
    color: $fontCol ;
    line-height: 3em;
    // padding-left: 4vw;
    div{
      // display: flex;
      direction: row;
      margin-left: 5vw;
      align-items: center;
      button{
        display: block;
        background: #fff;
        width: 15vw;
        margin-right: 1vw;
        text-align: center;
        line-height: 2em;
        height: 2em;
        border-radius: 1vw;
        color: $fontSubCol;
      }
      .on{
        color: $btnCol;
        background: $btnSubCol;
      }
    }
  }
  li:nth-child(1) {
    padding: 2vw 4vw;
    img {
      width: 14.66vw;
      height: 14.66vw;
      // border: 1px solid #e1e1e1;
      margin-left: 10vw;
    }
  }
  li:nth-child(6){
    margin-top: 5vw;
    border-top: 1px solid #ccc;
  }
  .btnBox{
    width: 100vw;
    display: flex;
    justify-content: center;
  }
  .urgency,.important{
    padding: 4vw 5vw 0 5vw;
  }
  .urgency{
    margin-bottom: 4vw;
  }
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
  .name{
    margin-left: -3vw;
    box-sizing: border-box;
  }
  
}
</style>
