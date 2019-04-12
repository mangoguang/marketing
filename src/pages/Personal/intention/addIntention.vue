<template>
    <div class="addAdress">
      <mybanner :title="title" style="background:#fff">
        <button type="button" @click="update">保存</button>
      </mybanner>
      <title-bar :text="titleModule.info">
        <button type="button">修改</button>
      </title-bar>
      <ul class="list">
        <li>
          <intention-select v-bind="formInfo.intention" v-model="form.intention" :showIcon="selectIcon"/>
        </li>
        <li>
         <store-select v-bind="formInfo.store" v-model="form.store" :showIcon="selectIcon"/>
        </li>
        <li>
          <date-select v-bind="formInfo.time" v-model="form.time" @update="updateTime" :showIcon="selectIcon"/>
        </li>
        <li>
          <duration-select v-bind="formInfo.duration" v-model="form.duration" @update="updateDuration" :showIcon="selectIcon"/>
        </li>
        <li>
          <source-select v-bind="formInfo.source" v-model="form.source" @update="updateSource" :showIcon="selectIcon"/>
        </li>
      </ul>
       <ul class="list">
        <li>
          <address-select v-bind="formInfo.address" v-model="form.address" :showIcon="selectIcon"/>
        </li>
         <li>
          <yan-input v-bind="formInfo.house" v-model="form.house"/>
        </li>
        <li>
          <yan-input v-bind="formInfo.elevator" v-model="form.elevator"/>
        </li>
        <li>
          <reason-select v-bind="formInfo.reason" v-model="form.reason" @update="updateReason" :showIcon="selectIcon"/>
        </li>
        <li>
          <style-select v-bind="formInfo.style" v-model="form.style" @update="updateStyle" :showIcon="selectIcon"/>
        </li>
        <li>
          <progress-select v-bind="formInfo.progress" v-model="form.progress" @update="updateProgress" :showIcon="selectIcon"/>
        </li>
      </ul>
      <ul class="list">
         <li>
          <yan-input v-bind="formInfo.goods" v-model="form.goods"/>
        </li>
        <li>
          <color-select v-bind="formInfo.color" v-model="form.color" @update="updateColor" :showIcon="selectIcon"/>
        </li>
        <li>
          <yan-input v-bind="formInfo.budget" v-model="form.budget"/>
        </li>
        <li>
          <date-select v-bind="formInfo.deliver" v-model="form.deliver" @update="updateDeliver" :showIcon="selectIcon"/>
        </li>
         <li>
          <yan-input v-bind="formInfo.paid" v-model="form.paid"/>
        </li>
        <li>
          <yan-input v-bind="formInfo.discount" v-model="form.discount"/>
        </li>
      </ul>
      <yan-textarea v-bind="formInfo.remark"></yan-textarea>
      <div class="select">
        <classify-select style="margin-bottom:2.666vw" label="意向分类" @update="updateClassify" name="classify" :checked="classify" :options="formInfo.classify"/>
        <classify-select label="是否紧急" @update="updateUrgency" name="urgency" :checked="urgency" :options="formInfo.urgency"/>
      </div>
      <div v-show="true">
         <title-bar :text="titleModule.report">
           <button type="button">添加记录</button>
         </title-bar>
         <record-pannel/>
      </div>
      <div v-show="true">
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
import classifySelect from '../../../components/mySelect/classifySelect'
import upload from '../../../components/upload/filesUpload'
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
        intention:'DR-1103床垫',
        store:'红星美凯龙',
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
      inputIcon:false,
      failReason:'',
      isPrompt:false,
      isMsg:false,
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
      ]
    }
  },
  components:{
     mybanner,
     yanInput,
     yanTextarea,
     dateSelect,
     upload,
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
     colorSelect
  },
  computed:{
    ...mapState('addIntention',[
      'title',
      'formInfo',
      'titleModule'
    ])
  },
  created(){
   
  },
  
  mounted(){

  },
  methods:{
   update(){
     this.$router.push({path:'/address'})
   },
   updateClassify(option){
    console.log(option);
    this.classify=option;
    console.log("选择"+this.classify);
   },
   updateUrgency(option){
    console.log(option);
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
     this.$set(this.form,'time',anotherVal);
   },
   //选择更新留店时长
   updateDuration(value){
     this.$set(this.form,'duration',value);
   },
   //选择更新购买原因
   updateReason(name,code){
     this.$set(this.form,'reason',name);
     this.reasonCode=code;
   },
   //选择更新客户来源
   updateSource(name,code){
     this.$set(this.form,'source',name);
     this.sourceCode=code;
   },
   //选择更新装修风格
   updateStyle(name,code){
     this.$set(this.form,'style',name);
     this.styleCode=code;
   },
   //选择更新装修进度
   updateProgress(name,code){
     this.$set(this.form,'progress',name);
     this.progressCode=code;
   },
   //选择更新颜色偏好
   updateColor(name,code){
     this.$set(this.form,'color',name);
     this.colorCode=code;
   },
   //选择更新需求日期
   updateDeliver(value,anotherVal){
     this.$set(this.form,'deliver',anotherVal);
   }
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
