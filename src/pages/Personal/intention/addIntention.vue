<template>
    <div class="addAdress">
      <mybanner :title="title" style="background:#f8f8f8">
        <button type="button" @click="submit">保存</button>
      </mybanner>
      <title-bar :text="titleModule.info"></title-bar>
      <ul class="list">
        <li>
          <intention-select v-bind="formInfo.intention" :value="goodsValue" :id="customerId" :url="path" :showIcon="selectIcon"/>
        </li>
        <li @click="openStore">
         <store-select v-bind="formInfo.store" :value="shopName"  :showIcon="selectIcon"/>
        </li>
        <li>
          <date-select v-bind="formInfo.time" :value="form.arrivalDate" @update="updateTime" :showIcon="selectIcon"/>
        </li>
        <li>
          <duration-select v-bind="formInfo.duration" :value="form.residentTime" @update="updateDuration" :showIcon="selectIcon"/>
        </li>
        <li>
          <source-select v-bind="formInfo.source" :value="sourceName" @update="updateSource" :showIcon="selectIcon"/>
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
         <li>
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
          <date-select v-bind="formInfo.deliver" :value="form.deliverDate" @update="updateDeliver" :showIcon="selectIcon"/>
        </li>
         <li>
          <yan-input v-bind="formInfo.paid" v-model.trim="form.depositPaid" :readonly='readonly' :maxlength='8'/>
        </li>
        <li>
          <discount-select v-bind="formInfo.discount" :value="form.argreeDiscount" @update="updateDiscount" :showIcon="selectIcon"/>
        </li>
      </ul>
      <yan-textarea v-bind="formInfo.remark" :maxlength='200' :readonly='readonly' v-model="form.remark"></yan-textarea>
      <div class="select">
        <classify-select style="margin-bottom:2.666vw" label="意向分类" @update="updateClassify" name="classify" :checked="form.level" :options="formInfo.classify"/>
        <classify-select label="是否紧急" @update="updateUrgency" name="urgency" :checked="urgency" :options="formInfo.urgency"/>
      </div>
     <!--  <div v-if="status==='New'">
         <title-bar :text="titleModule.report">
           <button type="button" @click="addRecord">添加记录</button>
         </title-bar>
         <record-pannel :recordList="form.recordList"/>
      </div>
      <p class="last">到底啦</p>
      <yan-layer-prompt v-if="isPrompt" placeholder="请输入战败原因" v-model='failReason' @update='layerUpdate' @cancel="layerCancel">
        <span slot='update'>确定</span>
        <span slot='cancel'>取消</span>
      </yan-layer-prompt> -->
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
        residentTime:'',   //留店时长
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
      },
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
      go:-1
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
        let obj={};
        if(this.$route.query.addressId){
          this.$store.state.addressList.map((item,index) => {
            console.log(item);
            if(item.addressId===this.$route.query.addressId){
              console.log('进来了');
              obj=Object.assign({},item);
            }
          })
          let address=`${obj.province}${obj.city}${obj.district}${obj.address}`;
          let elevator=obj.elevator==='Y'?'有':'无';
          this.address=address;
          this.apartmentType=obj.apartmentType;
          this.elevator=elevator;
          this.form.addressId=this.$route.query.addressId;
        }else{
          this.address='未收集地址';
          this.apartmentType='未收集户型';
          this.elevator='未收集';    
        }
        
      }
      if(from.name==='intentionProduct'){
        console.log('进来intentionProduct');
        console.log(this.$store.state.checkedList.length);
        //let list=JSON.parse(localStorage.getItem('product'));
        if(this.$store.state.checkedList.length>0){
          this.goodsValue=this.$store.state.checkedList[0].goodsName;
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
  created(){
    this.updateTitle('新建意向');
    this.$route.meta.keepAlive=true;
  },
  activated(){
    this.customerId=this.$route.params.customerId;
    this.path=this.$route.fullPath;
    this.url=this.$route.query.url;
    console.log(this.checkedList);
    this.getProduct();
    this.getShop();
    console.log("回退进了created");
    this.isFirstEnter=true;
  },
  mounted(){
   
  },
  methods:{
    ...mapMutations('addIntention',['updateTitle']),
    ...mapMutations(['updateAddress','setCheckedList','updateSearchProductList']),
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
        this.goodsValue=this.$store.state.checkedList[0].goodsName;
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
     this.$router.replace({name:'followRecord',query:{oppId:this.oppId}});
   },
    listen(){
      if(this.form.address===''){
        mango.tip('请先选择地址');
      }
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
    //console.log(shops);
    let list=JSON.parse(shops);
    //console.log(list)
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
      if(this.form.goodsList.length<=0){
        mango.tip('意向产品不能为空');
        return false;
      }
      if(this.form.arrivalDate===''){
        mango.tip('进店日期不能为空');
        return false;
      }
      if(this.form.shopId===''){
        mango.tip('门店不能为空');
        return false;
      }
      if(this.form.residentTime===''){
        mango.tip('留店时长不能为空');
        return false;
      }
      if(this.form.source===''){
        mango.tip('客户来源不能为空');
        return false;
      }
      if(this.form.addressId===''){
        mango.tip('请选择地址,如无地址请先新建地址');
        return false;
      }
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
          mango.tip('需求日期不能小于到店日期');
          return false;
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
        let Akey=[];
        let form=new FormData();
        form.append('customerId',this.customerId);
        form.append('opportunity.oppId',this.form.oppId);
         
        if(this.form.goodsList.length>0){
          for(let i=0;i<this.form.goodsList.length;i++){
             form.append(`opportunity.goodsList[${i}].goodsId`,this.form.goodsList[i].goodsId);
             form.append(`opportunity.goodsList[${i}].quantity`,this.form.goodsList[i].quantity);
             Akey.push(`opportunity.goodsList[${i}].goodsId`);
             Akey.push(`opportunity.goodsList[${i}].quantity`);
          }
        }
        form.append('opportunity.addressId',this.form.addressId);
        form.append('opportunity.shopId',this.form.shopId);
        form.append('opportunity.arrivalDate',this.form.arrivalDate);
        form.append('opportunity.deliverDate',this.form.deliverDate);
        form.append('opportunity.residentTime',this.form.residentTime);
        form.append('opportunity.source',this.form.source);
        form.append('opportunity.stylePref',this.form.stylePref);
        form.append('opportunity.progress',this.form.progress);
        form.append('opportunity.colorPref',this.form.colorPref);
        form.append('opportunity.competingGoods',this.form.competingGoods);
        form.append('opportunity.buyReason',this.form.buyReason);
        form.append('opportunity.budget',this.form.budget);
        form.append('opportunity.depositPaid',this.form.depositPaid);
        form.append('opportunity.argreeDiscount',this.form.argreeDiscount);
        form.append('opportunity.remark',this.form.remark);
        form.append('opportunity.urgency',this.form.urgency);
        form.append('opportunity.level',this.form.level);

        let Bkey=['customerId','opportunity.oppId','opportunity.addressId','opportunity.shopId','opportunity.arrivalDate',
        'opportunity.deliverDate','opportunity.residentTime','opportunity.source','opportunity.stylePref','opportunity.progress',
        'opportunity.colorPref','opportunity.competingGoods','opportunity.buyReason','opportunity.budget','opportunity.depositPaid',
        'opportunity.argreeDiscount','opportunity.remark','opportunity.urgency','opportunity.level'];
        let key=[...Akey,...Bkey];
        let lastKey=[];
        for(let i=0;i<key.length;i++){
          if(form.get(key[i])!==''){
            lastKey.push(key[i]);
          }else{
            form.delete(key[i]);
          }
        }
        indexModel.updateOpportunity(form,[...lastKey]).then(res => {
            if(res.code==0){
              mango.tip(res.msg);
              this.setCheckedList([]);
              this.updateSearchProductList([]);
               this.$destroy();
               
              this.$router.back(this.go);
              console.log("执行了");
            }else{
              mango.tip(res.msg);
            }
        })
     }
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
   updateDuration(value){
     console.log(value);
     if(!value){
       this.form.residentTime='0分钟';
       return;
     }
    this.form.residentTime=value;
     
    
   },
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
        residentTime:'',   //留店时长
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
   }
  },
  //  beforeRouteEnter(to,from,next){
   // console.log("进来addIntention",to);
    // if(from.name==='selectAddress'){
    //   to.meta.keepAlive=true;
    //   next();
    // }
    // if(from.name==='searchProduct'){
    //   to.meta.keepAlive=true;
    //   next();
    // }
    // if(from.name==='intentionProduct'){
    //   to.meta.keepAlive=true;
    //   next();
    // }
    // if(from.name==='chooseShop'){
    //     to.meta.keepAlive=true;
    //     next();
      
    // }
    // if(from.name==='intention'){
    //   to.meta.keepAlive=false;
    //   next();
    // }
    // if(from.name==='/enquiryInfo'){
    //   to.meta.keepAlive=false; 
    //   next();
    // }
    // if(from.name==='/CustomerInfo'){
    //   to.meta.keepAlive=false;   
    //   next();
    // }
    // to.meta.keepAlive=true;
    // next();
  // }
  beforeRouteLeave(to,from,next){
   console.log(to.name);
   //console.log(from);
    if(to.name==='/enquiryInfo'){
        //from.meta.keepAlive=false;
        if(!from.meta.keepAlive){
          //this.setCheckedList([]);
          this.clearKeepAlive();
          this.$destroy();
          next();    
        }
    }
    if(to.name==='/CustomerInfo'){
        //from.meta.keepAlive=false;
        if(!from.meta.keepAlive){
          //this.setCheckedList([]);
          this.clearKeepAlive();
           this.$destroy();
          next();    
        }
         next();    
    }
    // if(to.name==='intentionProduct'){
    //     //from.meta.keepAlive=false;
      
    //     from.meta.keepAlive=true;
    //     next();
      
    // }
    
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
