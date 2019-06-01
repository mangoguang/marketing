<template>
  <div class="customerSearch">
    <div class="radio" >
      <radioComp v-for="(item,index) in text" :key="index" :textVal = 'item'
        v-model="radioVal" @change="changeVal"/>
    </div>
    <div class="inp">
      <input v-model="phone" :type="inpType" :placeholder="chooseVal" v-show='inpType=="number"' onkeypress="if(event.keyCode == 101){return false}"/>
      <input v-model="phone" :type="inpType" :placeholder="chooseVal" v-show='inpType=="text"'/>
     
    </div>
    <chooseShop />
    <div class="btn">
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
import chooseShop from './chooseShop'
import selectTips from './selectTips'
export default {
  name:'customerSearch',
  components: {radioComp,selectTips,chooseShop},
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
      inpType: '',
      pressType: ''
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
    myFunction(e) {
      console.log(e.keyCode)
      if(e.keyCode == 101) {
      }
    },
    //新建客户时候验证手机/微信号
    toCustomerInfo() {
      let type = this.radioVal === '客户手机'? 'phone' : 'wechat'
      if(type === 'phone') {
        this.phoneTest(type)
      }else {
        let wechat = this.weChatText()
        if(wechat) {
          this.sendPhoneTest(type)
        }
      }
    },
    //验证微信
    weChatText() {
      let result;
      var wx = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/
      if(!wx.test(this.phone)) {
        mango.tip('请输入正确的微信号')
        result = false
      }else {
        result = true
      }
      return result
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
      .catch(reject => {
        if(reject === 510) {
          this.sendPhoneTest(type)
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
      height: 11.733vw;
      font-size: 12px;
      line-height: 11.6vw;
    }
    input{
      width: 80vw;
      padding: 0 8vw;
      color: $fontCol;
      box-sizing: border-box;
      border-radius: 5.8665vw;
      background:#ebebeb;
    }
    
    }
    .btn{
      text-align: center;
      margin-top: 9.333vw;
      & > button{
      width: 80vw;
      height:11.733vw;
      // background: $btnCol;
      border-radius: 5.8665vw;
      color: #fff;
      background: #007AFF;
      border:1px solid #005DC2;
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
