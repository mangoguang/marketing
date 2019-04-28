<template>
  <div class="customerSearch">
    <div class="radio" >
      <radioComp v-for="(item,index) in text" :key="index" :textVal = 'item'
        v-model="radioVal" @change="changeVal"/>
    </div>
    <div class="inp">
      <input v-model="phone" :type="inpType" :placeholder="chooseVal">
      <button @click="toCustomerInfo" type="button">新建</button>
    </div>
    <div class="tips" v-show="existStatus">
      <selectTips class="tips_box" :btnSelect='btnSelect' :tipsVal='tipsVal'/>
    </div>
  </div>
</template>

<script>
// import dealHeader from '../../components/customer/dealCustomer/dealHeader'
import mango from '../../../js'
import variable from '../../../js/variable'
import radioComp from './radioComp'
import selectTips from './selectTips'
export default {
  name:'customerSearch',
  components: {radioComp,selectTips},
  data(){
    return{
      phone: '',
      radioVal: '',
      text: [{
        name: '客户手机',
        id: 1
      },{
        name: '客户微信',
        id: 2
      }],
      chooseVal: '请输入客户手机号',
      existStatus: false,
      cusId: '',
      tipsVal: '手机号码已存在，',
      inpType: ''
    }
  },
  watch: {
    radioVal() {
      this.chooseVal = this.radioVal == '客户手机'? '请输入客户手机号' : '请输入客户微信号'
      this.inpType = this.radioVal == '客户手机'? 'number' : 'text'
      this.tipsVal = this.radioVal == '客户手机'? '手机号码已存在，' : '微信号已存在，'
    }
  },
  mounted() {
    this.radioVal = this.text[0].name
  },
  methods: {
    //新建客户时候验证手机/微信号
    toCustomerInfo() {
      let type = this.radioVal === '客户手机'? 'phone' : 'wechat'
      if(type === 'phone') {
        this.phoneTest(type)
      }else {
        if(this.phone) {
          this.sendPhoneTest(type)
        }else {
          mango.tip('请输入客户微信号')
        }
      }

     
    },
    //验证手机号
    phoneTest(type) {
      let testPhoneNum = variable.testPhone(this.phone)
      if(testPhoneNum) {
        this.sendPhoneTest(type)
      }else {
        mango.tip('请填写正确的手机号码')
      }
    },
    //请求
    sendPhoneTest(type) {
      mango.getAjax('/v3/app/customer/check', {
        value: this.phone,
        type: type
      }).then((res) => {
        res = res.data
        if (res) {
          this.existStatus = true
          this.cusId = res.customerId
        } else {
          this.$router.push({path: `/newCustomerInfo?${type}=${this.phone}`})
        }
      })
    },
    //单选框的值
    changeVal(val) {
      this.radioVal = val
    },
    //提示框的值
    btnSelect(val) {
      if(val) {
        this.$router.replace({path: '/customerInfo',query: {
          id:this.cusId
        }})
      }
      this.existStatus = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/common.scss";
.customerSearch{
  .radio {
    display: flex;
    justify-content: space-around;
    width: 60%;
    // margin-top: 20vw;
    // width: 100vw;
    // height: 50vw;
    margin-left: 15vw;
   
  }
  .inp{
    display: flex;
    padding: 0 10vw;
    // font-size: 0;
    input, button{
      display: block;
      height: 11.6vw;
      font-size: 12px;
      line-height: 11.6vw;
    }
    input{
      width: 61.4vw;
      padding: 0 8vw;
      color: $fontCol;
      box-sizing: border-box;
      border-top-left-radius: 5.8vw;
      border-bottom-left-radius: 5.8vw;
      background: url(../../../assets/imgs/search.png) no-repeat, #ebebeb;
      background-position: 3vw center;
      background-size: 4vw auto;
    }
    button{
      width: 18.6vw;
      // background: $btnCol;
      border-top-right-radius: 5.8vw;
      border-bottom-right-radius: 5.8vw;
      color: #fff;
      background:linear-gradient(0deg,rgba(0,122,255,1),rgba(59,154,255,1));
      box-shadow:0px 2px 0px 0px rgba(255,255,255,0.3);
      border-radius:0px 44px 44px 0px;
    }
  }
  .tips {
    background: rgba(0, 0, 0, 0.5);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    .tips_box {
      position: absolute;
      left: 12.66vw;
      top: 72.13vw;
    }
  }
}
</style>
