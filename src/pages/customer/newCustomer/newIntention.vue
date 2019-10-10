<template>
  <div class="newIntention">
    <my-banner :title="'新增意向'"
               class="banner" />
    <button class="submit"
            :style="{top:top}"
            @click="submit">保存</button>
    <new-demand :changeCode="change"
                class="newDemand"
                :fromName='fromName'
                :type='"demand"'
                :addressType='"intention"' />
    <div class="title">
      <p></p>
      <span>跟进情况</span>
    </div>
    <new-record :fromName='fromName' />
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import { mapState, mapMutations } from 'vuex'
import { btnList } from '../../../utils/gallery'
import newDemand from '../../../components/customer/newCustomerInfo/newDemand'
import newRecord from '../../../components/customer/newCustomerInfo/newRecord'
import myBanner from '../../../components/banner'
import mango from '../../../js'
let Base64 = require('js-base64').Base64
export default {
  components: { newDemand, myBanner, newRecord },
  data() {
    return {
      top: '',
      fromName: '',
      shops: '',
      shopId: '',
      codeList: {},
      path: ''
    }
  },
  computed: {
    ...mapState({
      newCustomerInfo: state => state.customer.newCustomerInfo
    }),
    ...mapState(['Files'])
  },
  watch: {
    //初始进来的时候初始化数据
    fromName() {
      if (this.fromName === 'NewCustomer') {
        this.initData()
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === '/CustomerInfo') {
        vm.fromName = 'NewCustomer'
      } else if (from.name === '/enquiryInfo') {
        vm.fromName = 'NewCustomer'
      } else {
        vm.fromName = 'other'
      }
      // vm.fromName = from.name === '/CustomerInfo' || '/enquiryInfo'? 'NewCustomer' : 'other'
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == '/CustomerInfo') {
      this.clearData()
      this.setCheckedList([])
    } else if (to.name == '/enquiryInfo') {
      this.clearData()
      this.setCheckedList([])
    }
    next(vm => {})
  },
  mounted() {
    this.isIPhoneX()
    /* let inputs=document.getElementsByTagName("input");
    for(let i=0;i<inputs.length;i++){
      inputs[i].click=function(){
        this.scrollIntoView();
      }
    } */
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
      'setAddressId',
      'setFollowVal',
      'setFollowTiming',
      'setFiles',
      'setPicVal'
    ]),
    initData() {
      this.setNewCustomerInfo({})
      /* let shopsList = btnList(this.shops,0) */
      //this.$set(this.newCustomerInfo,'orgId',this.$route.query.orgId)
      //let shopId=this.initShop();
      //this.$set(this.newCustomerInfo,'shopId',shopId)
      this.$set(this.newCustomerInfo, 'imgLen', 0)
      this.$set(this.newCustomerInfo, 'imgs', '')
      //this.initShopList(shopsList)
      this.getShopVal()
      this.setCheckedList([])
      this.$set(this.newCustomerInfo, 'urgency', 'false')
      this.$set(this.newCustomerInfo, 'level', 'A')
      this.$set(this.newCustomerInfo, 'dataFiles', new FormData())
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    initShop() {
      let shopId
      let shops = localStorage.getItem('shops')
      this.shops = JSON.parse(shops)
      if (this.shops && this.shops.length) {
        this.shops.map((item, index) => {
          if (item.crmId === this.$route.query.orgId) {
            shopId = item.id
          }
        })
        return shopId
      }
    },
    clearData() {
      this.setNewCustomerInfo({})
      this.setCheckedList([])
      this.setFiles([])
      this.setPicVal([])
    },
    changeStr(str) {
      let string = str.replace(/[\ud800-\udbff][\udc00-\udfff]/g, '')
      return string
    },
    submit() {
      let temp = this.whichFollowData(this.newCustomerInfo)
      if (temp) {
        // let formdata = this.newCustomerInfo.dataFiles
        let dutyReg = /^[\u4E00-\u9FA5a-zA-Z0-9\s，。？；：《》【】！、%]{1,}$/
        if (
          this.newCustomerInfo.competingGoods !== '' &&
          !dutyReg.test(this.newCustomerInfo.competingGoods)
        ) {
          MessageBox.alert('竞品产品不能输入特殊字符及表情符号')
          return
        }
        let remarkReg = /[\ud800-\udbff][\udc00-\udfff]/g
        let reg = /^[\u4E00-\u9FA5a-zA-Z0-9\s，。？；：《》【】！、%]{1,}$/
        if (
          this.newCustomerInfo.remark2 !== '' &&
          remarkReg.test(this.newCustomerInfo.remark2)
        ) {
          this.newCustomerInfo.remark2 = this.changeStr(
            this.newCustomerInfo.remark2
          )
          MessageBox.alert('备注信息不能输入特殊字符及表情符号')
          return
        }
        if (
          this.newCustomerInfo.remark2 !== '' &&
          !reg.test(this.newCustomerInfo.remark2)
        ) {
          MessageBox.alert('备注信息不能输入特殊字符及表情符号')
          return
        }
        if (
          this.newCustomerInfo.situation !== '' &&
          remarkReg.test(this.newCustomerInfo.situation)
        ) {
          this.newCustomerInfo.situation = this.changeStr(
            this.newCustomerInfo.situation
          )
          MessageBox.alert('跟进情况不能输入特殊字符及表情符号')
          return
        }
        if (
          this.newCustomerInfo.situation !== '' &&
          !reg.test(this.newCustomerInfo.situation)
        ) {
          MessageBox.alert('跟进情况不能输入特殊字符及表情符号')
          return
        }
        if (
          this.newCustomerInfo.plan !== '' &&
          remarkReg.test(this.newCustomerInfo.plan)
        ) {
          this.newCustomerInfo.plan = this.changeStr(this.newCustomerInfo.plan)
          MessageBox.alert('下一步跟进计划不能输入特殊字符及表情符号')
          return
        }
        if (
          this.newCustomerInfo.plan !== '' &&
          !reg.test(this.newCustomerInfo.plan)
        ) {
          MessageBox.alert('下一步跟进计划不能输入特殊字符及表情符号')
          return
        }
        let formdata = new FormData()
        // let file = this.newCustomerInfo.dataFiles.getAll('record.dataFile')
        //   for(let i = 0; i < file.length; i++){
        //   formdata.append('record.dataFile',file[i]);
        // }

        if (this.newCustomerInfo.imgs) {
          const imgs = this.newCustomerInfo.imgs
          for (var key in imgs) {
            formdata.append('record.dataFile', imgs[key])
          }
        }

        let obj = this.updateParams(this.newCustomerInfo)
        let arr = []
        for (var key in obj) {
          formdata.append(key, obj[key])
          arr.push(key)
        }
        mango
          .getFormAjax('/v3/app/opportunity/update', formdata, arr, obj)
          .then(res => {
            if (res.status) {
              MessageBox.alert('保存成功！').then(action => {
                this.$router.go(-1)
                this.setFiles([])
                this.setPicVal([])
              })
            } else {
              MessageBox.alert('保存失败！')
            }
          })
          .catch(reject => {
            if (reject === 510) {
              this.submit()
            }
          })
        /* .catch((reject) => {
          MessageBox.alert(reject);
        }) */
      }
    },
    //获取门店的值
    getShopName() {
      let val
      if (this.descriptShopList && this.descriptShopList.length) {
        this.descriptShopList.forEach((item, index) => {
          if (item.status) {
            val = item.name
          }
        })
      }
      return val
    },
    //获取门店id
    getShopId(name) {
      if (this.shops && this.shops.length) {
        this.shops.forEach((item, index) => {
          if (item.name === name) {
            this.shopId = item.id
          }
        })
      }
      this.$set(this.newCustomerInfo, 'shopId', this.shopId)
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    change(val) {
      console.log(val)
      this.codeList = val
    },
    //判断根据情况哪个没有填写
    whichFollowData(obj) {
      let temp
      for (var key in obj) {
        /*if(!obj['productArr']) {
          MessageBox.alert('请选择意向产品')
          return
        }else */ if (
          !obj['shopId']
        ) {
          MessageBox.alert('请选择门店')
          return
        } else if (!obj['arrivalDate']) {
          MessageBox.alert('请选择进店日期')
          return
        } /* else if(!obj['residentTime']) {
          MessageBox.alert('请选择留店时长')
          return
        } */ else if (
          !obj['source']
        ) {
          MessageBox.alert('请选择客户来源')
          return
        } else if (!obj['addressId']) {
          MessageBox.alert('请选择客户地址')
          return
        }
        if (!obj['source2']) {
          MessageBox.alert('请选择跟进方式')
          return
        } else if (!obj['followDate']) {
          MessageBox.alert('请选择跟进时间')
          return
        } else if (!obj['residentTime2']) {
          MessageBox.alert('请选择跟进时长')
          return
        } /* else if(!obj['nextDate']) {
          MessageBox.alert('请选择下次跟进日期')
          return
        } */ else if (
          !obj['situation']
        ) {
          MessageBox.alert('请描述跟进情况')
          return
        } /* else if(!obj['plan']) {
          MessageBox.alert('请填写下一步跟进计划')
          return
        } */ else {
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
      if (obj.productArr && obj.productArr.length) {
        newArr.forEach((item, index) => {
          this.$set(tempObj, `opportunity.goodsList[${index}].goodsId`, item.id)
          this.$set(
            tempObj,
            `opportunity.goodsList[${index}].quantity`,
            item.quantity
          )
        })
      }
      let temp = {
        customerId: this.$route.query.id,
        'opportunity.shopId': obj.shopId,
        'opportunity.addressId': obj.addressId,
        'opportunity.arrivalDate':
          obj.arrivalDate || mango.indexTimeB(new Date())[1],
        'opportunity.deliverDate': obj.deliverDate,
        'opportunity.source': this.codeList.sourceCode || 'Natural',
        'opportunity.residentTime': obj.residentTime, //留店时长
        'opportunity.stylePref': this.codeList.spCode, //风格
        'opportunity.progress': this.codeList.pgCode, //进度
        'opportunity.colorPref': this.codeList.colorCode, //颜色偏好
        'opportunity.competingGoods': obj.competingGoods,
        'opportunity.buyReason': this.codeList.brCode, //购买原因
        'opportunity.budget': obj.budget, //预算
        'opportunity.depositPaid': obj.depositPaid, //已缴定金
        'opportunity.argreeDiscount': parseInt(obj.argreeDiscount) * 10, //协议折扣，例：80（百分之80折扣）
        'opportunity.remark': obj.remark2,
        'opportunity.urgency': obj.urgency, //是否紧急
        'opportunity.level': obj.level, //等级
        'record.source': obj.source2,
        'record.followDate': obj.followDate,
        'record.residentTime': obj.residentTime2, //跟进时长
        'record.nextDate': obj.nextDate,
        'record.situation': obj.situation,
        'record.plan': obj.plan
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
      if (phone === 'iphonex') {
        this.top = '14vw'
      } else {
        this.top = '8vw'
      }
    }
  },
  destroyed() {
    this.setSourceVal('')
    this.setLeaveStoreVal('')
    this.setBuyReason('')
    this.setStylePref('')
    this.setProgress('')
    this.setColorPref('')
    this.setHouseType('')
    this.setElevatorVal('')
    //this.setAddressId('')
    this.setFollowVal('')
    this.setFollowTiming('')
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
  .title {
    display: flex;
    align-items: center;
    color: #363636;
    font-weight: bold;
    margin: 2vw 0;
    padding-left: 2vw;
    box-sizing: border-box;
    p {
      background: #007aff;
      width: 0.53vw;
      height: 4vw;
      margin-right: 2.6vw;
    }
  }
  // .footer {
  //   color: #909090;
  //   font-size: 3.2vw;
  //   text-align: center;
  // }
}
</style>