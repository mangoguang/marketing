<template>
  <div class="customerInfo">
    <deal-header :list='list'/>
    <ul class="infoNav">
      <li
        v-for="(item, index) in customerTabStatus"
        :key="`customerInfoBtn${index}`"
        :class="{active: customerTabStatus[index].status}"
        @click="infoSelect(index)"
      ><span>{{item.name}}</span></li>
    </ul>
    <!-- 客户信息-->
    <div v-show="customerTabStatus[0].status">
      <customer-msg :list="list" :editMsg='editMsg' v-if='!editStatus'/>
      <div v-else style="margin-top:2.666vw;" >
        <newDescript :select='this.list.headPortrait? false : true' :list='list' :areaType='true' :type='"descript"'/>
        <btn @click.native="saveMsg()" :text="'保存资料'" class="theBtn"></btn>
      </div>
    </div>
    <!-- 意向信息-->
    <intentionMsg v-show="customerTabStatus[1].status" :list='list.opportunityList' :orgId='list.orgId' :phone="phone"/>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import {IndexModel} from '../../utils/index'
import variable from '../../js/variable'
const indexModel = new IndexModel()
import { mapMutations, mapState } from "vuex"
import btn from "../../components/btn";
import dealHeader from '../../components/customer/dealCustomer/dealHeader'
import customerDescript from '../../components/customer/customerInfo/customerDescript'
import newDescript from '../../components/customer/newCustomerInfo/newDescript'
import intentionMsg from '../../components/customer/customerShare/intentionMsg'
import CustomerMsg from '../../components/customer/customerShare/customerMsg'
import mango from '../../js'
import {btnList} from '../../utils/gallery'
export default {
  name:'customerInfo',
  components:{
    btn,
    dealHeader, 
    customerDescript,
    newDescript,
    intentionMsg,
    customerDescript,
    CustomerMsg
  },
  beforeRouteEnter(to,from,next) {
    next(vm => {
      if(from.name === 'selectAddress') {
        vm.editStatus = true
      }else {
        vm.setUpLoadUrl('')
      }
    })
  },
  data(){
    return{
      btns: mango.btnList(['客户信息', '意向信息'], 0),
      list: [],
      editStatus: false,
      shops: '',
      shpoId:'',
      index: '',
      phone:'',
      wechat:''
    }
  },
  computed: {
    ...mapState({
      customerTabStatus: state => state.tabStatus.customerTabStatus,
      newCustomerInfo: state => state.customer.newCustomerInfo,
      upLoadUrl: state => state.loadImgUrl.upLoadUrl,
      descriptShopVal: state => state.chooseShop.descriptShopVal
    })
  },
  destroyed() {
    this.setUpLoadUrl('')
  },
  methods: {
    ...mapMutations(['setNewCustomerInfo',"setCustomerInfoBtns", "setCustomerTabStatus",'setUpLoadUrl','initDescriptShopList','getDescriptShopVal']),
    infoSelect(index) {
      this.setCustomerTabStatus(mango.btnList(['客户信息', '意向信息'], index))
    },
    getData() {
      indexModel.getCustomerDetails(this.$route.query.id).then(res => {
        if(res.data) {
          this.list = res.data
          this.phone = this.list.phone
          this.wechat = this.list.weChat
        }
      }).catch((reject) => {
        if (reject === 510) {
          this.getData()
        }
      })
    },
     //编辑按钮
    editMsg(val) {
      this.editStatus = val
    },
      //保存资料
    async saveMsg() {
      if(!this.newCustomerInfo.sex) {
        MessageBox.alert('性别不能为空')
        return
      }
      if(!this.newCustomerInfo.username) {
        MessageBox.alert('称呼不能为空')
        return
      }
      let testName=/^[\u4e00-\u9fa5]{2,}$/
      if(!testName.test(this.newCustomerInfo.username)){
        MessageBox.alert('称呼只能输入中文且不能少于2个字')
        return
      }

        let passName=await this.recycleName(this.newCustomerInfo.username);
        console.log(passName,'ss')
        if(!passName){
          MessageBox.alert('姓氏不存在')
          return;
        }
        let testPhone = variable.testPhone(this.newCustomerInfo.phone)
        if((!this.newCustomerInfo.phone||this.newCustomerInfo.phone==='')&&!this.newCustomerInfo.weChat){
          MessageBox.alert('请填写手机号码或微信号')
          return
        }
        if(!this.newCustomerInfo.phone||this.newCustomerInfo.phone===''){
          if(this.phone!==''&&this.newCustomerInfo.phone===''){
            MessageBox.alert('手机号码不能修改为空')
            return
          }
          this.wx(this.newCustomerInfo.weChat)
        }
        if(this.newCustomerInfo.phone&&this.phone!==this.newCustomerInfo.phone) {
           let ishasPhone;
            if(!testPhone) {
              MessageBox.alert('请填写正确手机号码')
              return
            }else {
              ishasPhone=await this.checkPhone('phone',this.newCustomerInfo.phone)
            }
            if(ishasPhone){
              return
            }
            this.wx(this.newCustomerInfo.weChat);
        }
        if(this.newCustomerInfo.phone&&this.phone===this.newCustomerInfo.phone){
            this.wx(this.newCustomerInfo.weChat);
        }
    },
    //check
    async wx(wechat){
        let testWeChat = variable.testWeChat(wechat)
        let ishasWeChat;
        if(this.wechat&&!wechat){
          MessageBox.alert('微信号不能修改为空')
          return
        }
        if(wechat&&this.wechat!==wechat){
          if(!testWeChat) {
            MessageBox.alert('请填写正确微信号')
            return
          }else {
            ishasWeChat=await this.checkPhone('wechat',wechat)
            console.log(ishasWeChat);
          }
        }else if(wechat&&this.wechat===wechat){
          ishasWeChat=false
        }else{
          ishasWeChat=false
        }
        if(ishasWeChat){
          return
        }
        
        this.saveData();
    },
    async checkName(name){
      let isExist;
      await indexModel.checkLastName({lastName:name}).then((res) => {
        console.log('检查名字',res)
        if(res.data){
          isExist=true
        }else{
          isExist=false
        }
      }).catch((reject) => {
        if (reject === 510) {
          this.checkName()
        }
      })
      return isExist;
    }, 
    async recycleName(str){
      console.log('str',str)
      let lastName;
      let strLen=str.length-1;
      let isExist;
      console.log(lastName);
      for(let i=0;i<strLen;i++){
        lastName=str.slice(0,i+1);
        isExist=await this.checkName(lastName)
        break;
      }
      return isExist
    },
    //验证手机
    async checkPhone(type,value) {
      let ishas;
      let existName;
      if(type==='phone'){
        existName="手机号"
      }else{
        existName="微信号"
      }
      await mango.getAjax('/v3/app/customer/check', {
        value: value,
        type: type,
        orgId: this.newCustomerInfo.orgId
      }).then((res) => {
          if(res.status==1) {
            MessageBox.alert(`该${existName}已存在`)
            ishas=true;
          }
          if(res.status==0){
            ishas=false;
            console.log(ishas);  
          }
        
      }).catch((reject) => {
          if (reject === 510) {
            this.checkPhone()
          }
        })
        return ishas;
    },
    //保存数据
    saveData() {
      console.log(this.newCustomerInfo);
      let formdata = new FormData()
      /*let file = this.newCustomerInfo.dataFiles.getAll('record.dataFile')
      console.log('file',file);
      for(let i = 0; i < file.length; i++){
        formdata.append('record.dataFile',file[i]);
      } */
      
      //let formdata = this.newCustomerInfo.dataFiles
      if(this.upLoadUrl) {
        let blob=this.changeFormData(this.upLoadUrl);
        formdata.append("dataFile", blob, Date.now() + ".jpg");
      }
      let obj = this.updateParams(this.newCustomerInfo)
      let arr = []
      for(var key in obj) {
        formdata.append(key,obj[key])
        arr.push(key)
      }
     indexModel.updateCustomer(formdata,arr,obj).then(res => {
        if(res.status) {
           MessageBox.alert('更新成功').then(action => {
            this.editStatus = false
            this.getData()
          })
        }else {
           MessageBox.alert('更新失败')
        }
      }).catch((reject) => {
        if (reject === 510) {
          this.saveData()
        }
      })
    },
      //base64转成formdata形式上传
    changeFormData(url) {
      let bytes = window.atob(url.split(",")[1]);
      let temp = new ArrayBuffer(bytes.length);
      let ia = new Uint8Array(temp);
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      //Blob对象
      let blob = new Blob([temp], { type: "image/jpeg" }); //type为图片的格式
      return blob
      //FormData对象
      //let formdata = this.newCustomerInfo.dataFiles
      //formdata.append("dataFile", blob, Date.now() + ".jpg");
      //console.log('123',formdata.getAll('dataFile'))
    },
     //获取参数
     updateParams(obj) {
      let tempObj = {}
      let temp = {
        "phone": obj.phone,
        "username": obj.username,
        "sex": obj.sex, 
        "birthday": obj.birthday,
        "age": obj.age,
        "qq":obj.qq,
        "weChat": obj.weChat,
        "duty": obj.duty,
        "remark": obj.remark,
        "customerId": this.$route.query.id,
        "orgId": obj.orgId || this.list.orgId
      }
      for (let key in temp) {
        if (temp[key] || temp[key] === 0) {
          tempObj[key] = temp[key]
        }
      }
      return tempObj
    },
    //获取门店id
    getShopId(name) {
      if(this.shops && this.shops.length) {
        this.shops.forEach((item, index) => {
          if(item.name === name) {
            this.shopId = item.crmId
          }
      });
      }
      this.$set(this.newCustomerInfo,'orgId',this.shopId)
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
    //获取门店index
    getShopName(id) {
      if(this.shops && this.shops.length) {
        this.shops.forEach((item,index) => {
          if(item.crmId === id) {
            this.index = index
          }
        })
      }
      let shopsList = btnList(this.shops,this.index)
      this.initDescriptShopList(shopsList)
      this.getDescriptShopVal()
    } 
  },
  //
  activated() {
    // isUseCache为false时才重新刷新获取数据
    if(!this.$route.meta.isUseCache){  
      this.editStatus = false
      let shops = localStorage.getItem('shops')
      this.shops = JSON.parse(shops)
      this.getData()
      this.$route.meta.customerUseCache = false;  
    } 
  },
    //
  beforeRouteLeave (to, from, next) { 
  // /Customer   
    if (to.name === 'address' || to.name === 'chooseShop'){
      this.$route.meta.isUseCache = true; 
    }else {
      this.$route.meta.isUseCache = false; 
      this.setUpLoadUrl('') 
    }        
    next();
  },
   beforeRouteEnter (to, from, next) { 
    next(vm => {
      let shops = localStorage.getItem('shops')
      if (from.name === 'chooseShop'){
        vm.shops = JSON.parse(shops)
        if(vm.descriptShopVal) {
          vm.getShopId(vm.descriptShopVal)
        }
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.customerInfo{
  padding-bottom:4vw;
  box-sizing: border-box; 
  
  .active {
    
    color: #007aff;
    font-weight: bold;
    span{
      background: #f8f8f8;
    }
  }
  .theBtn {
    background:rgba(0,122,255,1);
    border: .13vw solid rgba(0,93,194,1);
    width: 80%;
    margin:0 auto;
  }
}
</style>
