<template>
    <div class="addAdress">
      <mybanner :title="title" style="background:#fff">
        <button type="button" @click="update" v-if="status==1">保存</button>
        <button type="button" @click="close" v-if="status==2" style="color:#FF3B30">意向关闭</button>
         <button type="button" @click="close" v-if="status==3" style="color:#FF3B30">战败原因</button>
      </mybanner>
      <title-bar :text="titleModule.info">
        <button type="button" v-if="status==2" v-show="!isModify" @click="modify">修改</button>
         <button type="button" v-if="status==2" v-show="isModify" @click="submit">保存</button>
      </title-bar>
      <ul class="list">
        <li>
          <intention-select v-bind="formInfo.intention" :value="form.intention" :id="customerId" :url="path" :showIcon="selectIcon"/>
        </li>
        <li @click="openStore">
         <store-select v-bind="formInfo.store" :value="form.store"  :showIcon="selectIcon"/>
        </li>
        <li>
          <date-select v-bind="formInfo.time" :value="form.time" @update="updateTime" :showIcon="selectIcon"/>
        </li>
        <li>
          <duration-select v-bind="formInfo.duration" :value="form.duration" @update="updateDuration" :showIcon="selectIcon"/>
        </li>
        <li>
          <source-select v-bind="formInfo.source" :value="form.source" @update="updateSource" :showIcon="selectIcon"/>
        </li>
      </ul>
       <ul class="list">
        <li>
          <address-select v-bind="formInfo.address" :value="form.address" :id="customerId" :url="path" :showIcon="selectIcon"/>
        </li>
         <li>
          <yan-input v-bind="formInfo.house" :value="form.house" :readonly='readonly'/>
        </li>
        <li>
          <yan-input v-bind="formInfo.elevator" :value="form.elevator" :readonly='readonly'/>
        </li>
        <li>
          <reason-select v-bind="formInfo.reason" :value="form.reason" @update="updateReason" :showIcon="selectIcon"/>
        </li>
        <li>
          <style-select v-bind="formInfo.style" :value="form.style" @update="updateStyle" :showIcon="selectIcon"/>
        </li>
        <li>
          <progress-select v-bind="formInfo.progress" :value="form.progress" @update="updateProgress" :showIcon="selectIcon"/>
        </li>
      </ul>
      <ul class="list">
         <li>
          <yan-input v-bind="formInfo.goods" v-model="form.goods" :readonly='readonly'/>
        </li>
        <li>
          <color-select v-bind="formInfo.color" :value="form.color" @update="updateColor" :showIcon="selectIcon"/>
        </li>
        <li>
          <yan-input v-bind="formInfo.budget" v-model="form.budget" :readonly='readonly'/>
        </li>
        <li>
          <date-select v-bind="formInfo.deliver" :value="form.deliver" @update="updateDeliver" :showIcon="selectIcon"/>
        </li>
         <li>
          <yan-input v-bind="formInfo.paid" v-model="form.paid" :readonly='readonly'/>
        </li>
        <li>
          <discount-select v-bind="formInfo.discount" :value="form.discount" @update="updateDiscount" :showIcon="selectIcon"/>
        </li>
      </ul>
      <yan-textarea v-bind="formInfo.remark" :readonly='readonly'></yan-textarea>
      <div class="select">
        <classify-select style="margin-bottom:2.666vw" label="意向分类" @update="updateClassify" name="classify" :checked="classify" :options="formInfo.classify"/>
        <classify-select label="是否紧急" @update="updateUrgency" name="urgency" :checked="urgency" :options="formInfo.urgency"/>
      </div>
      <div v-show="status!==1">
         <title-bar :text="titleModule.report">
           <button type="button" v-if="status==2">添加记录</button>
         </title-bar>
         <record-pannel/>
      </div>
      <div v-show="status==4">
        <title-bar :text="titleModule.order"/>
        <order-info class="order"/>
      </div>
      <p class="last">到底啦</p>
      <yan-layer-prompt v-if="isPrompt" placeholder="请输入战败原因" v-model='failReason' @update='layerUpdate' @cancel="layerCancel">
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
import { Toast } from 'mint-ui';
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      form:{
        intention:'',
        store:'',
        time:'',
        duration:'',
        source:'',
        address:'',
        house:'',
        elevator:'',
        reason:'',
        style:'',
        progress:'',
        goods:'',
        color:'',
        budget:'',
        deliver:'',
        paid:'',
        discount:'',
        remark:''
      },
      reasonCode:'',
      sourceCode:'',
      styleCode:'',
      colorCode:'',
      progressCode:'',
      classify:'',
      urgency:'',
      selectIcon:true,
      readonly:false,
      failReason:'',
      isPrompt:false,
      isMsg:false,
      isModify:false,
      customerId:'',
      oppId:'',
      addressId:'',
      path:'',
      status:'',
      shopId:''
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
     colorSelect,
     discountSelect
  },
  watch:{
    $route(to,from){
      console.log(from);
      if(to.params.status==1){
        this.selectIcon=true;
        this.readonly=false;
        this.updateTitle('新建意向');
        this.status=1;
        this.isModify=false;
        this.path=this.$route.path;
        /* this.updateAddress([]);
        this.setCheckedList([]); */
      }
      if(to.params.status==2){
        this.updateTitle('意向详情');
        this.status=2;
        this.path=this.$route.path;
        if(this.isModify){
          this.isModify=true;
          this.selectIcon=true;
          this.readonly=false;
        }else{
          this.isModify=false;
          this.selectIcon=false;
          this.readonly=true;
        }
       /*  this.updateAddress([]);
        this.setCheckedList([]); */
      }
      if(to.params.status==3){
        this.selectIcon=false;
        this.readonly=true;
        this.updateTitle('意向详情');
        this.status=3;
        this.isModify=false;
        this.path=this.$route.path;
        /* this.updateAddress([]);
        this.setCheckedList([]); */
      }
      if(to.params.status==4){
        this.selectIcon=false;
        this.readonly=true;
        this.updateTitle('意向详情');
        this.status=4;
        this.isModify=false;
        this.path=this.$route.path;
        /* this.updateAddress([]);
        this.setCheckedList([]); */
      }
      if(from.name==='selectAddress'){
        let obj={};
        this.$store.state.addressList.map((item,index) => {
          console.log(item);
          if(item.addressId===this.$route.query.addressId){
            console.log('进来了');
            obj=Object.assign({},item);
          }
        })
        let address=`${obj.province}${obj.city}${obj.district}${obj.address}`;
        let elevator=obj.elevator?'有':'无';
        this.$set(this.form,'address',address);
        this.$set(this.form,'house',obj.apartmentType);
        this.$set(this.form,'elevator',elevator);
        this.addressId=this.$route.query.addressId;
      }
      if(from.name==='intentionProduct'){
        this.form.intention=this.$store.state.checkedList[0].crmId;
      }
      if(from.name==='chooseShop'){
        let shops=JSON.parse(localStorage.getItem('shops'));
        let shopIndex=localStorage.getItem('shopIndex');
        shops.map((item,index) => {
          if(shopIndex==index){
            this.shopId=item.id;
            this.form.store=item.name;
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
  created(){
   this.customerId=this.$route.params.customerId;
  },
  activated(){
    
  },
  mounted(){

  },
  methods:{
    ...mapMutations('addIntention',['updateTitle']),
    ...mapMutations(['updateAddress','setCheckedList']),
    valid(){
      if(this.customerId==''){
        mango.tip('客户ID不能为空');
        return false;
      }
      if(this.checkedList.length<=0){
        mango.tip('意向产品不能为空');
        return false;
      }
      if(this.addressId==''){
        mango.tip('地址ID不能为空');
        return false;
      }
      

    },
    modify(){
      this.isModify=true;
      this.selectIcon=true;
      this.readonly=false;
    },
    submit(){
      this.isModify=false;
      this.selectIcon=false;
      this.readonly=true;
    },
    close(){

    },
    openStore(){
      if(!this.isModify){
       return;
      }
       this.$router.push({name:'chooseShop'});
      
    },
    update(){

      //this.$router.push({name:'address',params:{customerId:this.customerId},query:{redirect:this.path}})
    },
   updateClassify(option){
    this.classify=option;
    console.log("选择"+this.classify);
   },
   updateUrgency(option){
    this.urgency=option;
    console.log("选择"+this.urgency);
   },
   layerUpdate(){
     console.log("确定");
     console.log(this.failReason);
   },
   layerCancel(){
     console.log("取消");
     console.log(this.failReason);
   },
   confirm(){
     console.log("取消");
   },
   //选择更新进店日期
   updateTime(value,anotherVal){
     this.form.time=anotherVal;
   },
   //选择更新留店时长
   updateDuration(value){
    this.form.duration=value;
   },
   //选择更新购买原因
   updateReason(name,code){
     this.form.reason=name;
     this.reasonCode=code;
   },
   //选择更新客户来源
   updateSource(name,code){
     this.form.source=name;
     this.sourceCode=code;
   },
   //选择更新装修风格
   updateStyle(name,code){
     this.form.style=name;
     this.styleCode=code;
   },
   //选择更新装修进度
   updateProgress(name,code){
     this.form.progress=name;
     this.progressCode=code;
   },
   //选择更新颜色偏好
   updateColor(name,code){
     this.form.color=name;
     this.colorCode=code;
   },
   //选择更新需求日期
   updateDeliver(value,anotherVal){
     this.form.deliver=anotherVal;
   },
   //选择更新折扣
   updateDiscount(arr){
     console.log(arr);
     let discount=arr.join('.')+"折"
     this.form.discount=discount;
   },
   //地址公共函数
   updateAddressView(){
    let obj=this.$store.state.addressList.find((item) => {
      return item.id=this.$route.query.addressId;
    })
    let address=`${obj.province}${obj.city}${obj.district}${obj.address}`;
    let elevator=obj.elevator?'有':'无';
    this.$set(this.form,'address',address);
    this.$set(this.form,'house',obj.apartmentType);
    this.$set(this.form,'elevator',elevator);
   }
  },
  beforeRouteEnter(to,from,next){
    console.log(to);
    console.log(from);
    if(from.name==='selectAddress'){
      to.meta.keepAlive=true;
      next();
    }
    if(from.name==='searchProduct'){
      to.meta.keepAlive=true;
      next();
    }
    if(from.name==='intentionProduct'){
      to.meta.keepAlive=true;
       next();
    }
    next();
  }, 
  beforeRouteUpdate(to, from, next) {
    if(to.params.status==1){
        this.selectIcon=true;
        this.readonly=false;
        this.updateTitle('新建意向');
        this.status=1;
        this.isModify=false;
        this.path=this.$route.path;
      }
      if(to.params.status==2){
        this.updateTitle('意向详情');
        this.status=2;
        if(this.isModify){
          this.isModify=true;
          this.selectIcon=true;
          this.readonly=false;
        }else{
          this.isModify=false;
          this.selectIcon=false;
          this.readonly=true;
        }
         this.path=this.$route.path;
        
      }
      if(to.params.status==3){
        this.selectIcon=false;
        this.readonly=true;
        this.updateTitle('意向详情');
        this.status=3;
        this.isModify=false;
        this.path=this.$route.path;
        
      }
      if(to.params.status==4){
        this.selectIcon=false;
        this.readonly=true;
        this.updateTitle('意向详情');
        this.status=4;
        this.isModify=false;
        this.path=this.$route.path;
       
      }
      next();
  },
   beforeRouteLeave(to, from, next){
    
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
