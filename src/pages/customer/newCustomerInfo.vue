<template>
  <div class="newCustomerInfo" ref='newTop'>
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
      <new-descript :select='true' :fromName='fromName' :areaType='false'/>
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
      <new-demand v-show="isShowDemand" :fromName='fromName' :changeCode="change" :type='"demand"' :addressType='"newCustomer"'/>
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
import {IndexModel} from '../../utils/index'
import {btnList} from '../../utils/gallery'
const indexModel = new IndexModel() 

export default {
  name:'newCustomerInfo',
  components:{myBanner, newDemand, newDescript, newRecord},
  data(){
    return{
      name: '',
      phone: '',
      sex: '',
      topTitle: ['客户描述', '意向信息', '跟进情况'],
      isShowDemand: false,
      isShowDeal: false,
      shops: [],
      fromName: '',
      codeList: {},
      saveDataKey: true
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fromName = from.name
      if(from.name === 'chooseShop' || from.name === 'searchProduct' || from.name === 'intentionProduct') {
          vm.isShowDemand = true
          vm.isShowDeal = true
      }else {
        vm.setUpLoadUrl('')
        vm.setNewCustomerScroll(0)
        // vm.setNewCustomerInfo({})
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    if(to.name === 'NewCustomer') {
      this.setFiles([]);
      this.setPicVal([]);
      this.setNewCustomerInfo({})
    }
    next()
  },
  computed: {
    ...mapState({
      newCustomerInfo: state => state.customer.newCustomerInfo,
      sexVal: state => state.select.sexVal,
      areaVal: state => state.select.areaVal,
      enterStoreVal: state => state.select.enterStoreVal,
      sourceVal: state => state.select.sourceVal,
      leaveStoreVal: state => state.select.leaveStoreVal,
      shopVal: state => state.select.shopVal,
      upLoadUrl: state => state.loadImgUrl.upLoadUrl,
      newCustomerScroll: state => state.customerScroll.newCustomerScroll
    }),
    ...mapState(['Files'])
  },
  mounted() {
    let shops = localStorage.getItem('shops')
    this.shops = JSON.parse(shops)
    this.$refs.newTop.addEventListener('scroll', this.handleScroll,true)
    setTimeout(() => {
      this.$refs.newTop.scrollTop = this.newCustomerScroll
    }, 100);
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
    this.setHouseType('')
    this.setElevatorVal('')
    // this.setCheckedList([])
    this.setFollowVal('')
    this.setFollowTiming('')
  },
  methods: {
    handleScroll(e) {
      let top = e.target.scrollTop
      this.setNewCustomerScroll(top)
    },
    ...mapMutations([
      'setNewCustomerScroll',
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
      'setColorPref',
      'setHouseType',
      'setElevatorVal',
      'setCheckedList',
      'initShopList',
      'initDescriptShopList',
      'getShopVal',
      'setFiles',
      'setPicVal',
      'setFollowVal',
      'setFollowTiming'
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
    //base64转成formdata形式上传
    changeFormData(url,formdata,imgType) {
      let bytes = window.atob(url.split(",")[1]);
      let temp = new ArrayBuffer(bytes.length);
      let ia = new Uint8Array(temp);
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      //Blob对象
      let blob = new Blob([temp], { type: "image/jpeg" }); //type为图片的格式
      //FormData对象
      formdata.append(imgType, blob, Date.now() + ".jpg");
    },
    //保存客户信息，新建客户	
    creatNewCustomer() {
      let isHasPhone;
      if(this.$route.query.wechat&&this.newCustomerInfo.phone){
        mango.getAjax('/v3/app/customer/check', {
          value: this.newCustomerInfo.phone,
          type:'phone'
        }).then((res) => {
          if(res.data){
            MessageBox.alert('手机号码已存在').then(action => {
             isHasPhone=false;
            })
          }else{
            isHasPhone=true;
          }
        })
      }else{
        isHasPhone=true;
      }
      if(!isHasPhone){
        return;
      }
      
      //如果有填写验证微信号
      if(this.newCustomerInfo.weChat) {
        var wx = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/
        if(!wx.test(this.newCustomerInfo.weChat)) {
          MessageBox.alert('请填写正确的微信号')
          return
        }
      }
      if(!this.newCustomerInfo.sex) {
        MessageBox.alert('性别不能为空')
        return
      }else if(!this.newCustomerInfo.username) {
        MessageBox.alert('称呼不能为空')
        return
      }else if(!this.newCustomerInfo.province) {
        MessageBox.alert('请选择地区')
        return
      }else if(!this.newCustomerInfo.address) {
        MessageBox.alert('请填写客户地址')
        return
      }
      let result = this.hasFollowData(this.newCustomerInfo)
      //判断有没有填写跟进情况
      if(!result) {
        this.whichFollowData(this.newCustomerInfo)
      }else {
        //判断是第一次保存还是多次保存
        // let formdata;
        // if(this.saveDataKey) {
        //   this.saveDataKey = false
        //   //上传附件图片
        //   formdata = this.newCustomerInfo.dataFiles
        // }else {
          let formdata = new FormData()
          //头像的formdata
          this.upLoadUrl? this.changeFormData(this.upLoadUrl,formdata,'dataFile') : ''
          //附件
          if(this.newCustomerInfo.imgs) {
            const imgs = this.newCustomerInfo.imgs
            for(var key in imgs) {
              formdata.append('record.dataFile',imgs[key])
            }
          }
          // let file = this.newCustomerInfo.dataFiles.getAll('record.dataFile')
          //  for(let i = 0; i < file.length; i++){
          //   formdata.append('record.dataFile',file[i]);
          // }
          // if(this.newCustomerInfo.dataFiles.get('dataFile')) {
          //   formdata.append('dataFile',this.newCustomerInfo.dataFiles.get('dataFile'));
          // }
        // }
        let obj = this.updateParams(this.newCustomerInfo)
        let arr = []
        for(var key in obj) {
          formdata.append(key,obj[key])
          arr.push(key)
        }
        this.getData(formdata, arr, obj)
      }
    },
    //请求数据
    getData(formdata, arr, jsonData) {
      indexModel.updateCustomer(formdata,arr,jsonData).then(res => {
          console.log('res',res)
         if(res.code == 0) {
          if(res.status){
            MessageBox.alert('保存成功！').then(action => {
              this.$router.replace({path: '/customer'})
              this.setFiles([]);
              this.setPicVal([]);
            })
          }else{
             MessageBox.alert('保存失败！')
          }
        }else{
          MessageBox.alert(res.msg)
        }
      })
    },
    //初始化数据
    setInitData() {
      this.newCustomerInfo.leaveStore = this.leaveStoreVal
    },
    //判断跟进模块有没有数据
    hasFollowData(obj) {
      let count = 0,
          result;
      for(var key in obj) {
        if(key === 'source2') {
          count +=1 
        }else if(key === 'followDate') {
          count +=1 
        }else if(key === 'residentTime2') {
          count +=1 
        }/* else if(key === 'nextDate') {
          count +=1 
        } */else if(key === 'situation') {
          count +=1 
        }/* else if(key === 'plan') {
          count +=1 
        } */
      }
      if(count === 0) {
        result = true
      }else if(count === 4) {
        result = true
      }else {
        result = false
      }
      return result
    },
    //判断根据情况哪个没有填写
    whichFollowData(obj) {
      for(var key in obj) {
        if(!obj['source2']) {
          MessageBox.alert('请选择跟进方式')
          return
        }else if(!obj['followDate']) {
          MessageBox.alert('请选择跟进时间')
          return
        }else if(!obj['residentTime2']) {
          MessageBox.alert('请选择跟进时长')
          return
        }/* else if(!obj['nextDate']) {
          MessageBox.alert('请选择下次跟进日期')
          return
        } */else if(!obj['situation']) {
          MessageBox.alert('请描述跟进情况')
          return
        }/* else if(!obj['plan']) {
          MessageBox.alert('请填写下一步跟进计划')
          return
        } */
      }
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
        phone: obj.phone,
        username: obj.username,
        sex: obj.sex, 
        birthday: obj.birthday,
        age: obj.age,
        qq:obj.qq,
        weChat: obj.weChat,
        duty: obj.duty,
        remark: obj.remark,
        "orgId": obj.orgId,
        'address.province': obj.province,
        'address.city': obj.city,
        'address.district': obj.area,
        'address.address': obj.address,
        'address.apartmentType': this.codeList.htCode,   //户型    
        'address.elevator': obj.elevator,
        'opportunity.shopId': obj.shopId,
        'opportunity.arrivalDate':obj.arrivalDate || mango.indexTimeB(new Date())[1],
        'opportunity.deliverDate': obj.deliverDate,
        'opportunity.source': this.codeList.sourceCode || 'Natural',
        //'opportunity.residentTime': obj.residentTime,   //留店时长
        'opportunity.stylePref': this.codeList.spCode,    //风格
        'opportunity.progress': this.codeList.pgCode,    //进度
        'opportunity.colorPref': this.codeList.colorCode,    //颜色偏好
        'opportunity.competingGoods': obj.competingGoods,
        'opportunity.buyReason': this.codeList.brCode,   //购买原因
        'opportunity.budget':obj.budget,    //预算
        'opportunity.depositPaid': obj.depositPaid,     //已缴定金
        'opportunity.argreeDiscount': parseFloat(obj.argreeDiscount)*10,    //协议折扣，例：80（百分之80折扣）
        'opportunity.remark': obj.remark2,
        'opportunity.urgency': obj.urgency || false,   //是否紧急
        'opportunity.level': obj.level || 'A',   //等级
        'record.source': obj.source2,
        'record.followDate': obj.followDate,
        'record.residentTime': obj.residentTime2,   //跟进时长
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/common.scss";
.newCustomerInfo{
  background: $bgCol;
  padding-top: 16vw;
  // position: relative;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
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
