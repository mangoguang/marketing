<template>
    <div class="addAdress">
      <mybanner :title="title" style="background:#f8f8f8">
       <!--  <button type="button" @click="close" style="color:#FF3B30">意向关闭</button> -->
      </mybanner>
      <title-bar :text="titleModule.info">
         <button type="button"  @click="submit">保存</button>
      </title-bar>
      <ul class="list">
        <li>
          <intention-select v-bind="formInfo.intention" :value="goodsValue" :id="customerId" :url="path" :showIcon="selectIcon"/>
        </li>
        <li @click="openStore">
         <store-select v-bind="formInfo.store" :value="shopName"  :showIcon="selectIcon"/>
        </li>
        <li>
          <date-select day='end' v-bind="formInfo.time" :value="form.arrivalDate" @update="updateTime" :showIcon="selectIcon"/>
        </li>
        <!-- <li>
          <duration-select v-bind="formInfo.duration" :value="form.residentTime" @update="updateDuration" :showIcon="selectIcon"/>
        </li> -->
        <li>
          <source-select v-bind="formInfo.source" :value="sourceName" @update="updateSource" :showIcon="selectIcon"/>
        </li>
         <li>
          <date-select v-bind="formInfo.deliver" :value="form.deliverDate" @update="updateDeliver" :showIcon="selectIcon"/>
        </li>
      </ul>
       <ul class="list">
        <li>
          <address-select v-bind="formInfo.address" :value="address" :id="customerId" :url="path" :showIcon="selectIcon"/>
        </li>
         <li>
          <yan-input v-bind="formInfo.house" :value="apartmentType" :readonly='true' @click="listen"/>
        </li>
        <li>
          <yan-input v-bind="formInfo.elevator" :value="elevator" :readonly='true'  @click="listen"/>
        </li>
        <li>
          <reason-select v-bind="formInfo.reason" :value="buyReasonName" @update="updateReason" :showIcon="selectIcon"/>
        </li>
        <li>
          <style-select v-bind="formInfo.style" :value="stylePrefName" @update="updateStyle" :showIcon="selectIcon"/>
        </li>
        <li>
          <progress-select v-bind="formInfo.progress" :value="progressName" @update="updateProgress" :showIcon="selectIcon"/>
        </li>
      </ul>
      <ul class="list">
         <li style="border-top:1px solid transparent;">
          <!-- <yan-input v-bind="formInfo.goods" v-model.trim="form.competingGoods" :readonly='readonly' :maxlength='100'/> -->
          <yan-one-input v-bind="formInfo.goods" v-model.trim="form.competingGoods" :readonly='readonly' :maxlength='100'/>
        </li>
        <li>
          <color-select v-bind="formInfo.color" :value="colorPrefName" @update="updateColor" :showIcon="selectIcon"/>
        </li>
        <li>
          <yan-input v-bind="formInfo.budget" v-model.trim="form.budget" :readonly='readonly' :maxlength='8'/>
        </li>
       
         <li>
          <yan-input v-bind="formInfo.paid" v-model.trim="form.depositPaid" :readonly='readonly' :maxlength='8'/>
        </li>
        <li>
          <discount-select v-bind="formInfo.discount" :value="argreeDiscountTxt" @update="updateDiscount" :showIcon="selectIcon"/>
        </li>
      </ul>
      <yan-textarea v-bind="formInfo.remark" :maxlength='200' :readonly='readonly' v-model="form.remark"></yan-textarea>
      <div class="select">
        <classify-select style="margin-bottom:2.666vw" label="意向分类" @update="updateClassify" name="classify" :checked="form.level" :options="formInfo.classify"/>
        <classify-select label="是否紧急" @update="updateUrgency" name="urgency" :checked="urgency" :options="formInfo.urgency"/>
      </div>
      <div>
         <title-bar :text="titleModule.report">
           <!-- <button type="button" @click="addRecord" >添加记录</button> -->
         </title-bar>
         <record-pannel :recordList="recordList"/>
      </div>
      <p class="last">到底啦</p>
      <yan-layer-prompt v-if="isPrompt"  v-model='failReason' @update='layerUpdate' @cancel="layerCancel">
        <span slot='update'>确定</span>
        <span slot='cancel'>取消</span>
      </yan-layer-prompt>
    </div>
</template>

<script>
import Vue from 'vue'
import mybanner from '../../../components/banner'
import titleBar from '../../../components/common/titleBar'
import yanInput from '../../../components/yanInput'
import yanOneInput from '../../../components/yanOneInput'
import yanTextarea from '../../../components/yanTextarea'
import intentionSelect from '../../../components/mySelect/intentionSelect'
import storeSelect from '../../../components/mySelect/storeSelect'
import dateSelect from '../../../components/mySelect/dateSelect'
import durationSelect from '../../../components/mySelect/durationSelect'
import sourceSelect from '../../../components/mySelect/sourceSelect'
import addressSelect from '../../../components/mySelect/addressSelect'
import reasonSelect from '../../../components/mySelect/reasonSelect'
import styleSelect from '../../../components/mySelect/styleSelect'
import colorSelect from '../../../components/mySelect/colorSelect'
import progressSelect from '../../../components/mySelect/progressSelect'
import discountSelect from '../../../components/mySelect/discountSelect'
import classifySelect from '../../../components/mySelect/classifySelect'
import recordPannel from '../../../components/pannel/recordPannel'
import yanLayerPrompt from '../../../components/myLayer/yanLayerPrompt'
import { Toast } from 'mint-ui';
import { mapState, mapMutations } from 'vuex'
import mango from '../../../js'
import { IndexModel } from '../../../utils'
const indexModel=new IndexModel()
export default {
  data () {
    return {
      form:{
        oppId:'',
        goodsList:[],
        addressId:'',
        shopId:'',
        arrivalDate:'',  //进店日期
        budget:'',
        deliverDate:'',    //需求日期
        //residentTime:'',   //留店时长
        source:'',  //客户来源
        stylePref:'',   //风格
        progress:'',   //进度
        colorPref:'',    //颜色偏好
        competingGoods:'',
        buyReason:'',   //购买原因
        depositPaid:'',     //已缴定金
        argreeDiscount:'',    //协议折扣，例：80（百分之80折扣）
        remark:'',
        urgency:'',   //是否紧急
        level:'A'   //等级
      },
      recordList:[],
      isFirstEnter:false,
      goodsValue:'',
      shopName:'',
      sourceName:'',
      apartmentType:'',
      elevator:'',
      address:'',
      buyReasonName:'',
      stylePrefName:'',
      progressName:'',
      colorPrefName:'',
      selectIcon:true,
      readonly:false,
      failReason:'',
      isPrompt:false,
      customerId:'',
      path:'',
      status:'',
      urgency:'否',
      url:'',
      go:-1,
      argreeDiscountTxt:'',
      phone:''
    }
  },
  components:{
     mybanner,
     yanInput,
     yanTextarea,
     dateSelect,
     titleBar,
     intentionSelect,
     storeSelect,
     durationSelect,
     sourceSelect,
     addressSelect,
     reasonSelect,
     styleSelect,
     progressSelect,
     classifySelect,
     recordPannel,
     yanLayerPrompt,
     colorSelect,
     discountSelect,
     yanOneInput
  },
  watch:{
    $route(to,from){
      //console.log(from);
      if(from.name==='selectAddress'){
        //this.$route.meta.isUseCache=true;
        if(this.$store.state.addressList<=0){
          this.form.addressId='';
          this.address='未收集地址';
          this.apartmentType='未收集户型';
          this.elevator='未收集';
          return;
        }
        this.form.addressId=this.$store.state.addressId;
        let obj={};
        if(this.$store.state.addressId){
        // if(this.$route.query.addressId){
          this.$store.state.addressList.map((item,index) => {
            console.log(item);
            //if(item.addressId===this.$route.query.addressId){
              if(item.addressId===this.$store.state.addressId){
              console.log('进来了');
              obj=Object.assign({},item);
            }
          })
          let address=`${obj.province}${obj.city}${obj.district}${obj.address}`;
          let elevator=obj.elevator==='Y'?'有':'无';
          this.address=address;
          this.apartmentType=obj.apartmentType;
          this.elevator=elevator;
          //this.form.addressId=this.$route.query.addressId;
          this.form.addressId=this.$store.state.addressId;
        }else{
          this.address='未收集地址';
          this.apartmentType='未收集户型';
          this.elevator='未收集';    
        }
        
      }
      if(from.name==='intentionProduct'){
        //this.$route.meta.isUseCache=true;
        console.log('进来intentionProduct');
        console.log(this.$store.state.checkedList.length);
        //let list=JSON.parse(localStorage.getItem('product'));
        if(this.$store.state.checkedList.length>0){
          //this.goodsValue=this.$store.state.checkedList[0].goodsName;
          let arr=[];
          this.$store.state.checkedList.map((item,index) => {
            arr.push(item.goodsName);
          })
          //console.log(arr);
          this.goodsValue=arr.join("、");
          this.form.goodsList=this.$store.state.checkedList.map((item,index) => {
            let obj={};
            obj.goodsId=item.crmId;
            obj.goodsName=item.goodsName;
            obj.quantity=item.quantity;
            return obj;
          });
        }else{
          this.goodsValue='';
          this.form.goodsList=[];
        }
     
      }
      if(from.name==='chooseShop'){
        ///this.$route.meta.isUseCache=true;
        console.log("进来chooseShop");
        let shops=JSON.parse(localStorage.getItem('shops'));
        console.log(shops);
        this.go=-2;
        let shopIndex=localStorage.getItem('shopIndex');
        console.log(shopIndex);
        shops.map((item,index) => {
          if(shopIndex==index){
            this.form.shopId=item.id;
            this.shopName=item.name;
          }
        })
      }
      
    }
  },
  computed:{
    ...mapState('addIntention',[
      'title',
      'formInfo',
      'titleModule'
    ]),
    ...mapState(['checkedList'])
  },
  activated(){
    //this.form.oppId=this.$route.query.oppId;
    //this.customerId=this.$route.params.customerId;
    //this.path=this.$route.fullPath;
    //this.url=this.$route.query.url;
    
    //console.log("回退进了activated");
     
  },
  mounted(){
   /*  let inputs=document.getElementsByTagName("input");
    for(let i=0;i<inputs.length;i++){
      inputs[i].click=function(){
        this.scrollIntoView();
      }
    } */
  },
  methods:{
    ...mapMutations('addIntention',['updateTitle']),
    ...mapMutations(['updateAddress','setClassify','setCheckedList','updateSearchProductList','setFiles','setPicVal','setAddressId']),
    getShop(){
      let shops=JSON.parse(localStorage.getItem('shops'));
      console.log(shops);
      let shopIndex=localStorage.getItem('shopIndex');
      console.log(shopIndex);
      shops.map((item,index) => {
        if(shopIndex==index){
          this.form.shopId=item.id;
          this.shopName=item.name;
        }
      })
    },
    getProduct(){
      if(this.$store.state.checkedList.length<=0){
        this.goodsValue='';
        this.form.goodsList=[];
      }else{
        //this.goodsValue=this.$store.state.checkedList[0].goodsName;
        let arr=[];
        this.$store.state.checkedList.map((item,index) => {
          arr.push(item.goodsName);
        })
        //console.log(arr);
        this.goodsValue=arr.join("、");
        this.form.goodsList=this.$store.state.checkedList.map((item,index) => {
          let obj={};
          obj.goodsId=item.crmId;
          obj.goodsName=item.goodsName;
          obj.quantity=item.quantity;
          return obj;
        });
      }
    },
    addRecord(){
     this.$router.push({name:'followRecord',query:{oppId:this.oppId}});
   },
    listen(){
      if(this.form.address===''){
        mango.tip('请先选择地址');
      }
    },
    getOpportunity(id){
      indexModel.getOpportunity(id).then(res => {
        if(res.code===0){
          if(res.data.goodsList.length>0){
            this.setCheckedList([]);
            //this.goodsValue=res.data.goodsList[0].goodsName;
            let arr=[];
            res.data.goodsList.map((item,index) => {
              arr.push(item.goodsName);
            })
            //console.log(arr);
            this.goodsValue=arr.join("、");
           let list=res.data.goodsList.map((item,index) => {
             let obj={};
             obj.crmId=item.goodsId;
             obj.goodsName=item.goodsName;
             obj.quantity=item.quantity;
             return obj;
           })
            this.setCheckedList(list);
            this.form.goodsList=res.data.goodsList;       
          }else{
             this.setCheckedList([]);
             this.form.goodsList=[];
          }
          this.status=res.data.status;
          console.log(4444,res.data.shopId);
          this.shopName=res.data.shopId===''?'':this.getShopName(res.data.shopId);
          this.form.shopId=res.data.shopId;
          this.form.arrivalDate=res.data.arrivalDate;
          //this.form.residentTime=res.data.residentTime;
          this.sourceName=res.data.sourceName;
          this.form.source=res.data.source;
          this.buyReasonName=res.data.buyReasonName==''?'':res.data.buyReasonName;
          this.form.buyReason=res.data.buyReason;
          this.stylePrefName=res.data.stylePrefName==''?'':res.data.stylePrefName;
          this.form.stylePref=res.data.stylePref;
          this.progressName=res.data.progressName==''?'':res.data.progressName;
          this.form.progress=res.data.progress;
          this.form.competingGoods=res.data.competingGoods==''?'':res.data.competingGoods;
          this.colorPrefName=res.data.colorPrefName==''?'':res.data.colorPrefName;
          this.form.colorPref=res.data.colorPref;
          this.form.deliverDate=res.data.deliverDate==''?'':res.data.deliverDate;
          this.form.remark=res.data.remark==''?'':res.data.remark;
          this.form.budget=res.data.budget;
          this.form.depositPaid=res.data.depositPaid;
          this.form.argreeDiscount=res.data.argreeDiscount;
          if(res.data.argreeDiscount!==''){
            let txt=parseFloat(res.data.argreeDiscount)/10;
            console.log('333',txt);
            this.argreeDiscountTxt=txt+"折";
          }else{
            this.argreeDiscountTxt=0;
          }
          this.form.level=res.data.level===''?"A":res.data.level;
          this.recordList=res.data.recordList;
          if(res.data.urgency){
            this.urgency="是";
            this.form.urgency=res.data.urgency?'true':'false';
          }else{
            this.urgency="否";
            this.form.urgency=res.data.urgency?'true':'false';
          }
          let address=res.data.addressId===''?'':this.getAddress(res.data.addressId);
          this.address=address;
          this.form.addressId=res.data.addressId;
        }else{
            mango.tip(res.msg);
        }
        
      }).catch((reject) => {
        if (reject === 510) {
          this.getOpportunity(id)
        }
      })
    },
    getAddress(id){
     indexModel.getAddress(id).then(res => {
          if(res.code===0){
            this.address=`${res.data.provinceName}${res.data.cityName}${res.data.districtName}${res.data.address}`;
            this.apartmentType=res.data.apartmentTypeName;
            this.elevator=res.data.elevator==='Y'?'有电梯':'无电梯';
          }else{
            mango.tip(res.msg);
          }
    }).catch((reject) => {
        if (reject === 510) {
          this.getAddress(id)
        }
      })
   },
   getShopName(id){
    let shops=localStorage.getItem('shops');
    let list=JSON.parse(shops);
   
    let name;
    list.map((item,index) => {
       //console.log(item);
       if(item.id===id){
         return name=item.name;
       } 
     })
     //console.log(arr);
     return name;
   },
    valid(){
      if(this.customerId===''){
        mango.tip('客户ID不能为空');
        return false;
      }
      // if(this.form.goodsList.length<=0){
      //   mango.tip('意向产品不能为空');
      //   return false;
      // }
      if(this.form.arrivalDate===''){
        mango.tip('进店日期不能为空');
        return false;
      }
      if(this.form.shopId===''){
        mango.tip('门店不能为空');
        return false;
      }
      // if(this.form.residentTime===''){
      //   mango.tip('留店时长不能为空');
      //   return false;
      // }
      if(this.form.source===''){
        mango.tip('客户来源不能为空');
        return false;
      }
      if(this.form.addressId===''){
        mango.tip('请选择地址,如无地址请先新建地址');
        return false;
      }
      /* if(this.form.deliverDate===''){
        mango.tip('需求日期不能为空');
        return false;
      } */
      var reg=/^\d{1,}\.{0,1}\d{0,}$/;
      if(this.form.budget!==''&&!reg.test(this.form.budget)){
        mango.tip('预算金额必须为数字');
        return false;
      }
      if(this.form.depositPaid!==''&&!reg.test(this.form.depositPaid)){
        mango.tip('已交定金必须为数字');
        return false;
      }
      if(this.form.deliverDate!==''){
        if(!mango.compareTimeStamp(this.form.arrivalDate,this.form.deliverDate)){
          if(this.form.arrivalDate!==this.form.deliverDate){
            mango.tip('需求日期不能小于到店日期');
            return false;
          }
        }
      }
      if(this.form.budget.length>8){
        this.form.budget=this.form.budget.substring(0,8);
        mango.tip('预算金额不能超过8个字');
        return false;
      }
       if(this.form.depositPaid.length>8){
        this.form.depositPaid=this.form.depositPaid.substring(0,8);
        mango.tip('已交定金不能超过8个字');
        return false;
      }
      if(this.form.competingGoods.length>100){
        this.form.competingGoods=this.form.competingGoods.substring(0,100);
        mango.tip('竞品产品不能超过100个字');
        return false;
      }
      if(this.form.remark.length>200){
        this.form.remark=this.form.remark.substring(0,200);
        mango.tip('备注信息不能超过200个字');
        return false;
      }
      return true;

    },
    submit(){
     if(this.valid()){
        let form=new FormData();
        let obj=this.updateParams(this.form);
        console.log('obj',obj)
        let keys=[];
        for(let key in obj){
          form.append(key,obj[key])
          keys.push(key)
        }
        indexModel.updateOpportunity(form,keys,obj).then(res => {
            if(res.code==0){
              mango.tip(res.msg);
              this.setCheckedList([]);
              this.updateSearchProductList([]);
              this.$router.replace({name:'intention',params:{opportunityId:this.form.oppId}})
            }else{
              mango.tip(res.msg);
            }
        })
     }
    },
    updateParams(obj){
      let tempObj={};
      if(obj.goodsList.length>0){
          for(let i=0;i<obj.goodsList.length;i++){
             this.$set(tempObj,`opportunity.goodsList[${i}].goodsId`,obj.goodsList[i].goodsId);
             this.$set(tempObj,`opportunity.goodsList[${i}].quantity`,obj.goodsList[i].quantity);
          }
      }
      let temp={
      'customerId':this.customerId,
      'opportunity.oppId':obj.oppId,
      'opportunity.addressId':obj.addressId,
      'opportunity.shopId':obj.shopId,
      'opportunity.arrivalDate':obj.arrivalDate,
      'opportunity.deliverDate':obj.deliverDate,
      //'opportunity.residentTime':obj.residentTime,
      'opportunity.source':obj.source,
      'opportunity.stylePref':obj.stylePref,
      'opportunity.progress':obj.progress,
      'opportunity.colorPref':obj.colorPref,
      'opportunity.competingGoods':obj.competingGoods,
      'opportunity.buyReason':obj.buyReason,
      'opportunity.budget':obj.budget,
      'opportunity.depositPaid':obj.depositPaid,
      'opportunity.argreeDiscount':obj.argreeDiscount,
      'opportunity.remark':obj.remark,
      'opportunity.urgency':obj.urgency,
      'opportunity.level':obj.level
      }
      //console.log('temp',temp);
      for(let key in temp){
        if(temp[key]||temp[key]===0){
          tempObj[key]=temp[key]
        }
      }
      //console.log(tempObj);
      return tempObj
    },
    layerUpdate(type){
    if(type===''){
      mango.tip('请选择是否成单');
      return;
     }else{
       let nobj;
       if(type==="2"){
         if(this.failReason===''){
            mango.tip('流失原因不能为空');
            return;
          }else if(this.failReason.length>300){
            mango.tip('流失原因不能超过300字');
            return;
          }else{
              let obj={
                opportunityId:this.form.oppId,
                closeReason:this.failReason,
                type:type
              }
              nobj=Object.assign({},obj);    
          }
       }else{
          if(this.form.deliverDate===''){
            mango.tip('需求日期不能为空');
            return;
          }
          if(this.phone===""||this.phone==="0"||this.phone===0){
            mango.tip("客户手机号码不能为空");
            return;
          }
          let obj={
            opportunityId:this.form.oppId,
            closeReason:'已成单',
            type:type
          }
          nobj=Object.assign({},obj); 
       }
       indexModel.closeOpportunity(nobj).then(res => {
        if(res.code===0){
          mango.tip(res.msg);
          this.isPrompt=false;
          this.$router.go(-1);
        }else{
          mango.tip(res.msg);
          this.isPrompt=true;
        }
        
      }).catch((reject) => {
        if (reject === 510) {
          this.layerUpdate()
        }
      })

     }
    },
    layerCancel(){
      this.isPrompt=false;
    },
    close(){
      this.isPrompt=true;
    },
    openStore(){
      this.$router.push({name:'chooseShop',query: {type: 'addintention'}});
    },
   updateClassify(option){
    this.form.level=option;
    console.log("选择"+this.form.level);
   },
   updateUrgency(option){
    this.urgency=option;
    if(option==='是'){
      this.form.urgency='true';
    }else{
       this.form.urgency='false';
    }
    console.log("选择"+this.urgency);
   },
   //选择更新进店日期
   updateTime(value,anotherVal){
     this.form.arrivalDate=anotherVal;
   },
   //选择更新留店时长
   /* updateDuration(value){
     console.log(value);
     if(!value){
       this.form.residentTime='0分钟';
       return;
     }
    this.form.residentTime=value;
     
    
   }, */
   //选择更新购买原因
   updateReason(name,code){
     this.buyReasonName=name;
     this.form.buyReason=code;
   },
   //选择更新客户来源
   updateSource(name,code){
     this.sourceName=name;
     this.form.source=code;
   },
   //选择更新装修风格
   updateStyle(name,code){
     this.stylePrefName=name;
     this.form.stylePref=code;
   },
   //选择更新装修进度
   updateProgress(name,code){
     this.progressName=name;
     this.form.progress=code;
   },
   //选择更新颜色偏好
   updateColor(name,code){
     this.colorPrefName=name;
     this.form.colorPref=code;
   },
   //选择更新需求日期
   updateDeliver(value,anotherVal){
     this.form.deliverDate=anotherVal;
   },
   //选择更新折扣
   updateDiscount(arr){
     console.log(arr);
     let discount=arr.join('.');
     discount=parseFloat(discount)*10;
     console.log(discount);
     this.form.argreeDiscount=discount;
     let txt=discount/10;
     this.argreeDiscountTxt=txt+"折";
    
   },
   //离开清除缓存
   clearKeepAlive(){
      let obj={
        oppId:'',
        goodsList:[],
        addressId:'',
        shopId:'',
        arrivalDate:'',  //进店日期
        budget:'',
        deliverDate:'',    //需求日期
        //residentTime:'',   //留店时长
        source:'',  //客户来源
        stylePref:'',   //风格
        progress:'',   //进度
        colorPref:'',    //颜色偏好
        competingGoods:'',
        buyReason:'',   //购买原因
        depositPaid:'',     //已缴定金
        argreeDiscount:'',    //协议折扣，例：80（百分之80折扣）
        remark:'',
        urgency:'',   //是否紧急
        level:'A',   //等级
        recordList:[]
      }
      this.form=obj;
      this.goodsValue='';
      this.shopName='';
      this.sourceName='';
      this.apartmentType='';
      this.elevator='';
      this.address='';
      this.buyReasonName='';
      this.stylePrefName='';
      this.progressName='';
      this.colorPrefName='';
      this.selectIcon=true;
      this.readonly=false;
      this.failReason='';
      this.isPrompt=false;
      this.customerId='';
      this.path='';
      this.status='';
      this.urgency='否';
      this.url='';
      this.go=-1;
      this.argreeDiscountTxt='';
   }
  },
  beforeRouteEnter(to,from,next){
    if(!to.meta.isUseCache){
      next(vm => {
        vm.customerId=to.params.customerId;
        vm.phone=to.query.phone;
        vm.path=to.fullPath;
        vm.url=to.query.url;
        vm.failReason="";
        vm.getProduct();
        vm.getShop();
        //this.$route.meta.keepAlive=true;
        if(to.query.oppId){
          vm.updateTitle('意向详情');
          vm.form.oppId=to.query.oppId;
          vm.getOpportunity(vm.form.oppId);
        }
      })
    }
    next();
  },
  beforeRouteLeave(to,from,next){
    if(to.name==="/CustomerInfo"||to.name==="/enquiryInfo"){
      from.meta.isUseCache=false;
      next();
    }
    next();
  }
};
</script>

<style lang="scss" scoped>
 .addAdress{
   width:100vw;
   position: relative;
   box-sizing: border-box;
  padding-top:16.466vw;
  padding-bottom: 6.133vw;
  .list{
    width:100vw;
    border-top:1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
    background: #fff;
    margin-bottom:2.666vw;
    li{
      padding-left:4.266vw;
      :first-child{
         border-bottom: 1px solid #e1e1e1;
      }
    }
    li:last-child{
      :first-child{
         border:none;
      }
    }
  }
  .next{
    width:100vw;
    padding-left:4.266vw;
    border-top: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
    box-sizing: border-box;
    background: #fff;
  }
  .select{
    margin:4.266vw 0;
  }
  .title{
    color:#363636;
    font-size:4vw;
    padding:0 4.266vw;
  }
  .last{
    color:#909090;
    font-size: 3.2vw;
    text-align: center;
    margin-top:6.666vw;
  }
  .order{
    border-top:1px solid #ccc;
    border-bottom:1px solid #ccc;
    background: #fff;  
  }

 }
</style>
