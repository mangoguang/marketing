<template>
    <div class="addAdress">
      <mybanner :title="title" style="background:#fff">
        <button type="button" @click="close" v-if="status==2" style="color:#FF3B30">意向关闭</button>
         <button type="button" @click="close" v-if="status==3" style="color:#FF3B30">战败原因</button>
      </mybanner>
      <title-bar :text="titleModule.info">
        <button type="button" v-if="status==2" @click="modify">修改</button>
         
      </title-bar>
      <ul class="list">
        <li>
          <intention-select v-bind="formInfo.intention" :value="form.intention" :id="customerId" :url="path" :showIcon="selectIcon"/>
        </li>
        <li>
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
      <div>
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
      <yan-layer-msg v-if="isMsg" @confirm="confirm" :info="list">
        <span slot='confirm'>确定</span>
      </yan-layer-msg>
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
      selectIcon:false,
      readonly:true,
      failReason:'',
      isPrompt:false,
      isMsg:false,
      isModify:false,
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
     yanLayerMsg,
     colorSelect,
     discountSelect
  },
  watch:{
    $route(to,from){
    console.log('进来了');
      if(to.params.status==2){
        //this.$router.go(0);
        this.status=2;
      }
      if(to.params.status==3){
        //this.$router.go(0);
        this.status=3;
      }
      if(to.params.status==4){
        //this.$router.go(0);
        this.status=4;
      }
      
    }
  },
  computed:{
    ...mapState('intention',[
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
    modify(){
      this.isModify=true;
     
    },
    close(){

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
   }
 
  },
  beforeRouteEnter(to,from,next){
   if(to.params.status==2){
      next();
   }
   if(to.params.status==3){
      next();
   }
   if(to.params.status==4){
      next();
   }
   
  }, 
  beforeRouteUpdate(to, from, next) {
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
