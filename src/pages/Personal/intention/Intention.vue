<template>
    <div class="addAdress">
      <mybanner :title="title" style="background:#fff">
        <button type="button" @click="addRecord" v-if="isRecord">保存</button>

        <button type="button" @click="close" v-if="this.form.status==='New'&&!isRecord" style="color:#FF3B30">意向关闭</button>
         <button type="button" @click="closeReason" v-if="this.form.status==='Closed'" style="color:#FF3B30">战败原因</button>
      </mybanner>
      <div>
        <title-bar :text="titleModule.info">
          <button type="button" v-if="this.form.status==='New'" @click="modify">修改</button>
        </title-bar>
        <ul class="list">
          <li>
            <intention-select v-bind="formInfo.intention" :value="goodsValue"  :showIcon="selectIcon"/>
          </li>
          <li>
          <store-select v-bind="formInfo.store" :value="form.shopName"  :showIcon="selectIcon"/>
          </li>
          <li>
            <date-select v-bind="formInfo.time" :value="form.arrivalDate"  :showIcon="selectIcon"/>
          </li>
          <li>
            <duration-select v-bind="formInfo.duration" :value="form.residentTime"  :showIcon="selectIcon"/>
          </li>
          <li>
            <source-select v-bind="formInfo.source" :value="form.sourceName"  :showIcon="selectIcon"/>
          </li>
        </ul>
        <ul class="list">
          <li>
            <address-select v-bind="formInfo.address" :value="address"  :showIcon="selectIcon"/>
          </li>
          <li>
            <yan-input v-bind="formInfo.house" :value="apartmentTypeName" :readonly='readonly'/>
          </li>
          <li>
            <yan-input v-bind="formInfo.elevator" :value="elevator" :readonly='readonly'/>
          </li>
          <li>
            <reason-select v-bind="formInfo.reason" :value="form.buyReasonName"  :showIcon="selectIcon"/>
          </li>
          <li>
            <style-select v-bind="formInfo.style" :value="form.stylePrefName"  :showIcon="selectIcon"/>
          </li>
          <li>
            <progress-select v-bind="formInfo.progress" :value="form.progressName" :showIcon="selectIcon"/>
          </li>
        </ul>
        <ul class="list">
          <li>
            <yan-input v-bind="formInfo.goods" :value="form.competingGoods" :readonly='readonly'/>
          </li>
          <li>
            <color-select v-bind="formInfo.color" :value="form.colorPrefName" :showIcon="selectIcon"/>
          </li>
          <li>
            <yan-input v-bind="formInfo.budget" :value="budget" :readonly='readonly'/>
          </li>
          <li>
            <date-select v-bind="formInfo.deliver" :value="form.deliverDate"  :showIcon="selectIcon"/>
          </li>
          <li>
            <yan-input v-bind="formInfo.paid" :value="depositPaid" :readonly='readonly'/>
          </li>
          <li>
            <discount-select v-bind="formInfo.discount" :value="argreeDiscount"  :showIcon="selectIcon"/>
          </li>
        </ul>
        <yan-textarea v-bind="formInfo.remark" :readonly='readonly' :value="form.remark"></yan-textarea>
        <div class="select">
          <classify-select style="margin-bottom:2.666vw" label="意向分类"  name="classify" :checked="form.level" :options="formInfo.classify"/>
          <classify-select label="是否紧急"  name="urgency" :checked="urgency" :options="formInfo.urgency"/>
        </div>
        <div>
          <title-bar :text="titleModule.report">
            <button type="button" v-if="this.form.status==='New'" @click="addRecord">添加记录</button>
          </title-bar>
          <record-pannel :recordList="form.recordList"/>
        </div>
        <div v-if="this.form.status==='Approved'">
          <title-bar :text="titleModule.order"/>

          <order-info class="order" :orderList="item" v-for="(item,index) in form.orderList" :key="index"/>
        </div>
        <p class="last">到底啦</p>
        <yan-layer-prompt v-if="isPrompt" placeholder="请输入战败原因" v-model='failReason' @update='layerUpdate' @cancel="layerCancel">
          <span slot='update'>确定</span>
          <span slot='cancel'>取消</span>
        </yan-layer-prompt>
        <yan-layer-msg v-if="isMsg" @confirm="confirm" :info="list">
          <span slot='confirm'>确定</span>
        </yan-layer-msg>
      </div>
      
    </div>
</template>

<script>
import Vue from 'vue'
import mybanner from '../../../components/banner'
import titleBar from '../../../components/common/titleBar'
import yanInput from '../../../components/yanInput'
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
import orderInfo from '../../../components/pannel/orderInfo'
import yanLayerPrompt from '../../../components/myLayer/yanLayerPrompt'
import yanLayerMsg from '../../../components/myLayer/yanLayerMsg'
import newRecord from '../../../components/customer/newCustomerInfo/newRecord'
import { Toast } from 'mint-ui';
import { mapState, mapMutations } from 'vuex'
import mango from '../../../js'
import { IndexModel } from '../../../utils'
const indexModel=new IndexModel()
export default {
  data () {
    return {
      form:{
        goodsList:[],
        shopName:'',
        arrivalDate:'',
        residentTime:'',
        sourceName:'',
        buyReasonName:'',
        stylePrefName:'',
        progressName:'',
        competingGoods:'',
        colorPrefName:'',
        deliverDate:'',
        remark:'',
        level:'',
        status:'',
        recordList:[],
        orderList:[]
      },
      selectIcon:false,
      readonly:true,
      failReason:'',
      isPrompt:false,
      isMsg:false,
      oppId:'',
      goodsValue:'',
      address:'',
      apartmentTypeName:'',
      elevator:'',
      argreeDiscount:'',
      urgency:'',
      budget:'',
      depositPaid:'',
      list:[
        {
          title:'创建时间：',
          value:''
        },
        {
          title:'战败时间：',
          value:''
        },
        {
          title:'战败原因：',
          value:''
        }
      ],
      customerId:'',
      isRecord:false,
      UpdateRedirect:''
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
     orderInfo,
     yanLayerPrompt,
     yanLayerMsg,
     colorSelect,
     discountSelect,
     newRecord
  },
  computed:{
    ...mapState('intention',[
      'title',
      'formInfo',
      'titleModule'
    ])
  },
  watch:{
    $route(to,from){
      if(from.name==='/CustomerInfo'){
        console.log('/CustomerInfo');
        this.UpdateRedirect=from.fullPath;

      }
      if(from.name==='/enquiryInfo'){
         console.log('/enquiryInfo');
        this.UpdateRedirect=from.fullPath;
      } 
    }
  },
  created(){
   this.getOpportunity();
  
  },
  mounted(){

  },
  methods:{
    ...mapMutations('intention',['setClassify','setUrgency','setTitle']),
    getOpportunity(){
      let id=this.$route.params.opportunityId;
      indexModel.getOpportunity(id).then(res => {
        console.log(res.data);
        if(res.code===0){
          //this.form=res.data;
          this.oppId=res.data.oppId;
          this.customerId=res.data.customerId;
          if(res.data.goodsList.length>0){
            this.goodsValue=res.data.goodsList[0].goodsName;
          }
          if(res.data.status==="Approved"){
            if(res.data.orderList.length>0){
              this.form.orderList=res.data.orderList;
            }  
          }
          this.form.status=res.data.status;
          this.form.shopName=res.data.shopId===''?'未收集':this.getShopName(res.data.shopId);
          this.form.arrivalDate=res.data.arrivalDate;
          this.form.residentTime=res.data.residentTime;
          this.form.sourceName=res.data.sourceName;
          this.form.buyReasonName=res.data.buyReasonName==''?'未收集':res.data.buyReasonName;
          this.form.stylePrefName=res.data.stylePrefName==''?'未收集':res.data.stylePrefName;
          this.form.progressName=res.data.progressName==''?'未收集':res.data.progressName;
          this.form.competingGoods=res.data.competingGoods==''?'未收集':res.data.competingGoods;
          this.form.colorPrefName=res.data.colorPrefName==''?'未收集':res.data.colorPrefName;
          this.form.deliverDate=res.data.deliverDate==''?'未收集':res.data.deliverDate;
          this.form.remark=res.data.remark==''?'未备注':res.data.remark;
          this.budget=res.data.budget;
          this.depositPaid=res.data.depositPaid;
          this.argreeDiscount=res.data.argreeDiscount;
          this.form.level=res.data.level;
          if(res.data.level){
             this.setClassify([res.data.level])
          }
          if(res.data.recordList.length>0){
            this.form.recordList=res.data.recordList;
          }
          if(res.data.urgency==='Y'){
            this.urgency="是";
            this.setUrgency(['是']);
          }else{
            this.urgency="否";
            this.setUrgency(['否']);
          }
          this.list=[
            {
              title:'创建时间：',
              value:res.data.createTime
            },
            {
              title:'战败时间：',
              value:res.data.closeTime
            },
            {
              title:'战败原因：',
              value:res.data.closeReason
            }
          ];
          let addressId=res.data.addressId===''?'未收集':this.getAddress(res.data.addressId);
        }else{
            mango.tip(res.msg);
        }
        
      }).catch((reject) => {
        if (reject === 510) {
          this.getOpportunity()
        }
      })
    },
    modify(){
      console.log(this.customerId);
      this.$router.replace({name:'addintention',params:{customerId:this.customerId},query:{oppId:this.oppId,url:this.UpdateRedirect}});
    },
    close(){
      this.isPrompt=true;
    },
    closeReason(){
      this.isMsg=true;
    },
   layerUpdate(){
     //console.log("确定");
     //console.log(this.failReason);
     if(this.failReason===''){
       mango.tip('战败原因不能为空');
       return;
     }else if(this.failReason.length>300){
       mango.tip('战败原因不能超过300字');
       return;
     }else{
      let obj={
        opportunityId:this.oppId,
        closeReason:this.failReason
      }
      indexModel.closeOpportunity(obj).then(res => {
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
     //console.log("取消");
     //console.log(this.failReason);
   },
   confirm(){
    this.isMsg=false;
   },
   addRecord(){
     this.$router.push({name:'followRecord',query:{oppId:this.oppId}});
     //this.isRecord=true;
     //this.setTitle('新增跟进记录');
   },
   sumitRecord(){
    this.isRecord=false;
    this.setTitle('意向详情');
   },
   getAddress(id){
     indexModel.getAddress(id).then(res => {
          if(res.code===0){
            this.address=`${res.data.provinceName}${res.data.cityName}${res.data.districtName}${res.data.address}`;
            this.apartmentTypeName=res.data.apartmentTypeName;
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
     let list=JSON.parse(localStorage.getItem('shops'));
     //console.log(list)
    let name;
     list.map((item,index) => {
       console.log(item);
       if(item.id===id){
         return name=item.name;
       } 
     })
    return name;    
    
   }

 
  },
  beforeRouteEnter(to,from,next){
    if(from.name==='/CustomerInfo'){
      console.log('/CustomerInfo');
      let path=from.fullPath;
      next(vm => {
        vm.UpdateRedirect=path;
        console.log('456')
      });
    }
    if(from.name==='/enquiryInfo'){
      console.log('/enquiryInfo');
      let path=from.fullPath;
      next(vm => {
         vm.UpdateRedirect=path;
         console.log('1234')
      });
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
