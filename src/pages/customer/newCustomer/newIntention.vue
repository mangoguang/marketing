<template>
  <div class="newIntention">
    <my-banner :title="'新增意向'" class="banner"/>
    <button class="submit" :style="{top:top}" @click="submit">保存</button>
    <new-demand :changeCode="change" class="newDemand" :fromName='fromName' :type='"demand"' :addressType='"intention"' />
    <p class="footer">到底啦</p>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import {mapState,mapMutations} from 'vuex'
import {btnList} from '../../../utils/gallery'
import newDemand from '../../../components/customer/newCustomerInfo/newDemand'
import myBanner from '../../../components/banner'
import mango from '../../../js'
export default {
  components: { newDemand, myBanner },
  data () {
    return {
      top: '',
      fromName:'',
      shops: '',
      shopId: '',
      codeList: {},
      path: ''
    };
  },
  computed: {
    ...mapState({
       newCustomerInfo: state => state.customer.newCustomerInfo
    })
  },
  watch: {
     //初始进来的时候初始化数据
    fromName() {
      if(this.fromName === 'NewCustomer') {
        this.initData()
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fromName = from.name === '/CustomerInfo'? 'NewCustomer' : 'other'
    })
  },
  beforeRouteLeave(to, from, next) {
     if(to.name == '/CustomerInfo'){
       this.clearData()
      }
    next(vm => {
     
    })
  },
  mounted() {
    let shops = localStorage.getItem('shops')
    this.shops = JSON.parse(shops)
    this.isIPhoneX()
  },
  methods: {
    ...mapMutations([
      'setNewCustomerInfo',
      'initShopList',
      'getShopVal',
      'setSourceVal',
      'setLeaveStoreVal',
      'setBuyReason',
      'setStylePref',
      'setProgress',
      'setColorPref',
      'setHouseType',
      'setElevatorVal',
      'setCheckedList',
      'setAddressId'
      ]),
    initData() {
      this.setNewCustomerInfo({})
      let shopsList = btnList(this.shops,0)
      this.initShopList(shopsList)
      this.getShopVal()
      this.setCheckedList([])
      this.$set(this.newCustomerInfo,'urgency','false')
      this.$set(this.newCustomerInfo,'level','A')
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    clearData() {
      this.setNewCustomerInfo({})
      this.setCheckedList([])
    },
    submit() {
      let temp = this.whichFollowData(this.newCustomerInfo)
      if(temp) {
        let formdata = new FormData()
        let obj = this.updateParams(this.newCustomerInfo)
        let arr = []
        for(var key in obj) {
          formdata.append(key,obj[key])
          arr.push(key)
        }
        mango.getFormdataAjax('/v3/app/opportunity/update', formdata, arr).then((res) => {
          if(res.status) {
            MessageBox.alert('保存成功！').then(action => {
              this.$router.go(-1)
            })
          }else {
            MessageBox.alert('保存错误')
          }
        })
      }
     
    },
    //获取门店的值
    getShopName() {
      let val
      if(this.descriptShopList && this.descriptShopList.length) {
        this.descriptShopList.forEach((item, index) => {
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
      this.$set(this.newCustomerInfo,'shopId',this.shopId)
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    change(val) {
      this.codeList = val
    },
    //判断根据情况哪个没有填写
    whichFollowData(obj) {
      let temp;
      for(var key in obj) {
        if(!obj['productArr']) {
          MessageBox.alert('请选择意向产品')
          return
        }else if(!obj['shopId']) {
          MessageBox.alert('请选择门店')
          return
        }else if(!obj['arrivalDate']) {
          MessageBox.alert('请选择进店日期')
          return
        }else if(!obj['residentTime']) {
          MessageBox.alert('请选择留店时长')
          return
        }else if(!obj['source']) {
          MessageBox.alert('请选择客户来源')
          return
        }else if(!obj['addressId']) {
          MessageBox.alert('请选择客户地址')
          return
        }else {
          temp = true
        }
      }
      return temp
    },
     //获取参数
     updateParams(obj) {
      let tempObj = {}
      let newArr = obj.productArr
      //意向产品名称和数量
      if(obj.productArr && obj.productArr.length) {
         newArr.forEach((item, index) => {
          this.$set(tempObj, `opportunity.goodsList[${index}].goodsId`,item.id)
          this.$set(tempObj, `opportunity.goodsList[${index}].quantity`,item.quantity)
        })
      }
      let temp = {
        'customerId':this.$route.query.id,
        'opportunity.shopId': obj.shopId,
        'opportunity.addressId': obj.addressId,
        'opportunity.arrivalDate': obj.arrivalDate || mango.indexTimeB(new Date())[1],
        'opportunity.source': this.codeList.sourceCode || 'Natural',
        'opportunity.residentTime': obj.residentTime,   //留店时长
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
        'opportunity.level': obj.level   //等级
      }
      for (let key in temp) {
        if (temp[key] || temp[key] === 0) {
          tempObj[key] = temp[key]
        }
      }
      return tempObj
    },
    //判断是否iphoneX
    isIPhoneX() {
      let phone = this.phoneSize()
      if(phone === 'iphonex') {
        this.top = '14vw'
      }else {
        this.top = '8vw'
      }
    }
  },
  destroyed(){
    this.setSourceVal('')
    this.setLeaveStoreVal('')
    this.setBuyReason('')
    this.setStylePref('')
    this.setProgress('')
    this.setColorPref('')
    this.setHouseType('')
    this.setElevatorVal('')
    this.setAddressId('')
  }
}
</script>
<style lang='scss' scoped>
.newIntention {
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  box-sizing: border-box;
  .submit {
    position: fixed;
    top: 0;
    right: 4vw;
    z-index: 999;
    color: #007aff;
    font-size: 3.73vw;
    font-weight: bold;
  }
  .newDemand {
    margin-top: 16vw;
    // width: 100vw;
    // height: 90vh;
  }
  .footer {
    color: #909090;
    font-size: 3.2vw;
    text-align: center;
  }
}
</style>