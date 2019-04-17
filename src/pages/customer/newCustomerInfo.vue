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
      <new-descript :select='true' :fromName='fromName' />
    </ul>
    <ul>
      <li @click="controlDemand">
        <div class="title">
          <p ></p>
          <span>意向信息</span>
        </div>
        <div class="pullDown-icon">
          <img src="../../assets/imgs/newPullDown.png" :class="{changSide:isShowDemand}">
        </div>
      </li>
      <new-demand v-show="isShowDemand" :fromName='fromName' :changeCode="change"/>
    </ul>
    <ul class="dealUl">
      <li @click="controlDaal">
        <div class="title">
          <p ></p>
          <span>跟进情况</span>
        </div>
        <div class="pullDown-icon">
          <img src="../../assets/imgs/newPullDown.png"  :class="{changSide:isShowDeal}">
        </div>
      </li>
      <new-record v-show="isShowDeal" :fromName='fromName'/>
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
      topTitle: ['客户描述', '意向信息', '跟进情况'],
      isShowDemand: false,
      isShowDeal: false,
      shops: [],
      fromName: '',
      codeList: {}
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fromName = from.name
      if(from.name === 'chooseShop') {
        vm.isShowDemand = true
      }else {
        vm.setUpLoadUrl('')
      }
    })
  },
  computed: {
    ...mapState({
      newCustomerInfo: state => state.customer.newCustomerInfo,
      sexVal: state => state.select.sexVal,
      areaVal: state => state.select.areaVal,
      enterStoreVal: state => state.select.enterStoreVal,
      sourceVal: state => state.select.sourceVal,
      leaveStoreVal: state => state.select.leaveStoreVal,
      shopVal: state => state.select.shopVal
    })
  },
  mounted() {
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    let shops = localStorage.getItem('shops')
    this.shops = JSON.parse(shops)
  },
  destroyed(){
    this.setSexVal('')
    this.setAreaVal('')
    this.setEnterStoreVal('')
    this.setSourceVal('')
    this.setLeaveStoreVal('')
    this.setShopVal('')
    this.setAgeVal('')
    this.setBuyReason('')
    this.setStylePref('')
    this.setProgress('')
    this.setColorPref('')
  },
  methods: {
    ...mapMutations([
      "setNewCustomerInfo",
      'setSexVal',
      'setAreaVal',
      'setSourceVal',
      'setLeaveStoreVal',
      'setEnterStoreVal',
      'setShopVal',
      'setAgeVal',
      'setUpLoadUrl',
      'setBuyReason',
      'setStylePref',
      'setProgress',
      'setColorPref'
    ]),
    change(val) {
      this.codeList = val
    },
    //控制下面两个模块的显示隐藏
    controlDemand() {
      this.isShowDemand = !this.isShowDemand
    },
    controlDaal() {
      this.isShowDeal = !this.isShowDeal
    },
    //获得shopId
    getShopID(name) {
      let shopId
      if(this.shops) {
        this.shops.forEach((item, index) => {
          if(item.name === name) {
            shopId = item.id
          }
      });
      this.$set(this.newCustomerInfo, 'shopId', shopId)
      }
    },
    //保存客户信息，新建客户	
    creatNewCustomer() {
      mango.getAjax('/v3/app/customer/update', {
        ...this.updateParams(this.newCustomerInfo)
      },'post').then(res => {
        console.log(res)
      })
      // this.getShopID(this.shopVal)
      // let testPhoneNum = variable.testPhone(this.newCustomerInfo.phone)
      // if(testPhoneNum) {
      //   if(this.newCustomerInfo.shopId) {
      //     this.setInitData()
      //     mango.getAjax(this, 'customer/update', {
      //       account: this.ajaxData.account,   //登录账户
      //       tenantId: this.ajaxData.tenantId,
      //       ...this.updateParams(this.newCustomerInfo)
      //       },'v2', 'post').then((res) => {
      //         if (res.status) {
      //           MessageBox.alert('保存成功！').then(action => {
      //             this.$router.go(-1)
      //         })
      //       }
      //     })
      //   }else {
      //     mango.tip('请选择门店')
      //   }
      // } else {
      //   mango.tip('请填写正确的手机号码')
      // }
    },
    //初始化数据
    setInitData() {
      this.newCustomerInfo.sex = this.sexVal === ''? 0 : this.sexVal ==='男'? 1:2
      this.newCustomerInfo.leaveStore = this.leaveStoreVal
      if(!this.newCustomerInfo.source) {
        this.newCustomerInfo.source = '自然进店'
      }
     
    },
    //获取参数
     updateParams(obj) {
      let tempObj = {}
      let temp = {
        phone: obj.phone,
        username: obj.username,
        sex: obj.sex,  //性别(1:男,2:女,0:未知)，
        headPortrait: obj.headPortrait,
        birthday: obj.birthday,
        age: obj.age,
        qq:obj.qq,
        weChat: obj.weChat,
        duty: obj.duty,
        remark: obj.remark,
        
        'address.province': '广东',
        'address.city': '惠州市',
        'address.district': '惠阳区',
        'address.address': '高档别墅小区888号',
        'address.apartmentType': 'Villa',   //户型    
        'address.elevator': true,

        'opportunity.goodsList[0].goodsId': '1-44JIB6',          //意向产品多个
        'opportunity.goodsList[0].quantity': 2,

        'opportunity.shopId': obj.shopId,
        'opportunity.arrivalDate':obj.arrivalDate,
        // 'opportunity.deliverDate': obj.deliverDate,    //需求日期
        'opportunity.residentTime': obj.residentTime,   //留店时长
        'opportunity.source': this.codeList.sourceCode || 'Natural',
        'opportunity.stylePref': this.codeList.spCode,    //风格
        'opportunity.progress': this.codeList.pgCode,    //进度
        'opportunity.colorPref': this.codeList.colorCode,    //颜色偏好
        'opportunity.competingGoods': obj.competingGoods,
        'opportunity.buyReason': this.codeList.brCode,   //购买原因
        'opportunity.budget':obj.budget,    //预算
        'opportunity.depositPaid': obj.depositPaid,     //已缴定金
        'opportunity.argreeDiscount': parseInt(obj.argreeDiscount)*10,    //协议折扣，例：80（百分之80折扣）
        'opportunity.remark': obj.remark2,
        'opportunity.urgency': obj.urgency,   //是否紧急
        'opportunity.level': obj.level,   //等级
        'record.source': obj.source2,
        'record.followDate': obj.followDate,
        'record.residentTime': obj.residentTime2,   //跟进时长
        'record.nextDate': obj.nextDate,
        'record.situation': obj.situation,
        'record.plan': obj.plan,
        'record.dataFile': obj.dataFile
      }
      for (let key in temp) {
        if (temp[key] || temp[key] === 0) {
          tempObj[key] = temp[key]
        }
      }
      return tempObj
    }
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
