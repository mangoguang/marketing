<template>
  <div class="newCustomerInfo">
    <my-banner :title="'新建客户信息'">
      <div class="save" @click="creatNewCustomer">保存</div>
    </my-banner>
    <ul>
      <li>
        <div class="title">
          <p ></p>
          <span>客户描述</span>
        </div>
      </li>
      <new-descript/>
    </ul>
    <ul>
      <li @click="controlDemand">
        <div class="title">
          <p ></p>
          <span>客户需求</span>
        </div>
        <div class="pullDown-icon">
          <img src="../../assets/imgs/newPullDown.png" :class="{changSide:isShowDemand}">
        </div>
      </li>
      <new-demand v-show="isShowDemand"/>
    </ul>
    <ul class="dealUl">
      <li @click="controlDaal">
        <div class="title">
          <p ></p>
          <span>洽谈记录</span>
        </div>
        <div class="pullDown-icon">
          <img src="../../assets/imgs/newPullDown.png"  :class="{changSide:isShowDeal}">
        </div>
      </li>
      <new-record v-show="isShowDeal"/>
    </ul>
    <!-- <new-descript v-show="this.btns[0].status" :btns="btns" @changeBtnsStatus="changeBtnsStatus" /> -->
    <!-- <new-demand v-show="this.btns[1].status" :btns="btns" @changeBtnsStatus="changeBtnsStatus" /> -->
    <!-- <new-record v-show="this.btns[2].status" :btns="btns" @changeBtnsStatus="changeBtnsStatus" /> -->
    <!-- <records v-show="this.btns[2].status"/> -->
  </div>
</template>

<script>
import Vuex, { mapMutations, mapState } from 'vuex'
import { MessageBox } from 'mint-ui'
import myBanner from '../../components/banner'
import newDemand from '../../components/customer/newCustomerInfo/newDemand'
import newDescript from '../../components/customer/newCustomerInfo/newDescript'
import newRecord from '../../components/customer/newCustomerInfo/newRecord'
// import records from '../../components/customer/customerInfo/records'
import mango from '../../js'
import variable from '../../js/variable'
import {returnDate} from '../../utils/customer'

export default {
  name:'newCustomerInfo',
  components:{myBanner, newDemand, newDescript, newRecord},
  data(){
    return{
      // btns: mango.btnList(['客户描述', '客户需求', '洽谈记录'], 0),
      name: '',
      phone: '',
      sex: '',
      topTitle: ['客户描述', '客户需求', '洽谈记录'],
      isShowDemand: false,
      isShowDeal: false
    }
  },
  computed: {
    ...mapState({
      newCustomerInfo: state => state.customer.newCustomerInfo,
      sexVal: state => state.select.sexVal,
      areaVal: state => state.select.areaVal,
      enterStoreVal: state => state.select.enterStoreVal,
      sourceVal: state => state.select.sourceVal,
      leaveStoreVal: state => state.select.leaveStoreVal
    })
  },
  mounted() {
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
  },
  destroyed(){
    this.setSexVal('')
    this.setAreaVal('')
    this.setEnterStoreVal('')
    this.setSourceVal('')
    this.setLeaveStoreVal('')
  },
  methods: {
    ...mapMutations([
      "setNewCustomerInfo",
      'setSexVal',
      'setAreaVal',
      'setSourceVal',
      'setLeaveStoreVal',
      'setEnterStoreVal'
    ]),
    //控制下面两个模块的显示隐藏
    controlDemand() {
      this.isShowDemand = !this.isShowDemand
    },
    controlDaal() {
      this.isShowDeal = !this.isShowDeal
    },
    //保存客户信息，新建客户	
    creatNewCustomer() {
      this.setInitData()
      let testPhoneNum = variable.testPhone(this.newCustomerInfo.phone)
      if(testPhoneNum) {
        mango.getAjax(this, 'customer/update', {
          account: this.ajaxData.account,   //登录账户
          tenantId: this.ajaxData.tenantId,
          ...this.updateParams(this.newCustomerInfo)
          },'v2', 'post').then((res) => {
            if (res.status) {
              MessageBox.alert('保存成功！').then(action => {
                this.$router.go(-1)
            })
          }
        })
      } else {
        mango.tip('请填写正确的手机号码')
      }
    },
    //初始化数据
    setInitData() {
      this.newCustomerInfo.percent = this.newCustomerInfo.percent + '%'
      if(!this.newCustomerInfo.sex) {
        this.$set(this.newCustomerInfo, 'sex', 0)
      }
      // if(this.newCustomerInfo.urgency){
      //   this.newCustomerInfo.urgency = 1
      // }else{
      //   this.newCustomerInfo.urgency = 9
      // }
      if(!this.newCustomerInfo.source) {
        this.newCustomerInfo.source = '自然进店'
      }
      if(!this.newCustomerInfo.important) {
        this.$set(this.newCustomerInfo, 'important', 1)
      }         //关键程度默认选择1，但是没有点击的时候不会保存数据。
      // if(!this.newCustomerInfo.storeDate) {
      //   this.$set(this.newCustomerInfo, 'storeDate', mango.indexTimeB(new Date())[1])
      // } //如果没有选进店时间。默认选择今天
    },
    //获取参数
     updateParams(obj) {
      let tempObj = {}
      let temp = {
        account: this.ajaxData.account,   //登录账户
        tenantId: this.ajaxData.tenantId,
        'details.username': obj.username,
        'details.sex': obj.sex,  //性别(1:男,2:女,0:未知)，
        'details.storeDate': returnDate(obj.storeDate),
        'details.phone': obj.phone,
        'details.source': obj.source,
        // 'details.province': '440000',
        // 'details.city': '441900',
        // 'details.area': '441911',
        'details.address': obj.address,
        'details.leaveStore': obj.leaveStore,    //留店时间，
        'details.urgency': obj.urgency,   //紧急，1/2/3级，一级最高
        'details.important': obj.important,  //重要，1/2/3级，一级最高
        'demand.intention': obj.intention,   //意向产品，
        'demand.colorPref': obj.colorPref,
        'demand.stylePref': obj.stylePref,
        'demand.buyReason': obj.buyReason,
        'demand.progress': obj.progress,
        'demand.roomNum': obj.roomNum,
        'demand.remark': obj.remark,
        'demand.shopId': obj.shopId,
        'record.followSituation': obj.followSituation,
        'record.probability': obj.percent,
        'record.followTime': returnDate(obj.followTime) || mango.indexTimeB(new Date())[1],   //默认为今天
        'record.followPlan': obj.followPlan
      }
      for (let key in temp) {
        if (temp[key] || temp[key] === 0) {
          tempObj[key] = temp[key]
        }
      }
      return tempObj
    }
    // infoSelect(index) {
    //   this.btns.forEach((element, i) => {
    //     element.status = i === index
    //   })
    // },
    // changeBtnsStatus(arr) {
    //   this.btns = arr
    // }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/common.scss";
.newCustomerInfo{
  background: $bgCol;
  padding-top: 16vw;
  position: relative;
  .save{
    color: #0071ff;
    width: 10vw;
    position: absolute;
    right: 0;
  }
  .dealUl{
    margin-top: 2vw;
  }
  ul{
    li{
      padding: 0 4.53vw;
      line-height: 11.2vw;
      display: flex;
      justify-content: space-between;
      background: #efeff4;
      border-bottom: 1px solid #ccc;
      .title{
        display: flex;
        align-items: center;
        color: #363636;
        font-weight: bold;
        p{
          background: #007aff;
          width: 0.53vw;
          height: 4vw;
          margin-right: 2.6vw;
        }
      }
      .pullDown-icon{
        img{
          width: 2.66vw;
        }
        .changSide {
          transform: rotate(180deg)
        }
      }
    }
  }
  .newCustomerInfoBtns{
    margin-top: 21vw;
    border-bottom: 1px solid #ccc;
  }
}
</style>
