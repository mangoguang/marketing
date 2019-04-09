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
          <date-select v-bind="formInfo.time" v-model="form.time" :showIcon="selectIcon"/>
        </li>
        <li>
          <duration-select v-bind="formInfo.duration" v-model="form.duration" :showIcon="selectIcon"/>
        </li>
        <li>
          <source-select v-bind="formInfo.source" v-model="form.source" :showIcon="selectIcon"/>
        </li>
      </ul>
       <ul class="list">
        <li>
          <address-select v-bind="formInfo.address" v-model="form.address" :showIcon="selectIcon"/>
        </li>
         <li>
          <yan-input v-bind="formInfo.house" v-model="form.house" :showIcon="inputIcon"/>
        </li>
        <li>
          <yan-input v-bind="formInfo.elevator" v-model="form.elevator" :showIcon="inputIcon"/>
        </li>
        <li>
          <reason-select v-bind="formInfo.reason" v-model="form.reason" :showIcon="selectIcon"/>
        </li>
        <li>
          <style-select v-bind="formInfo.style" v-model="form.style" :showIcon="selectIcon"/>
        </li>
        <li>
          <progress-select v-bind="formInfo.progress" v-model="form.progress" :showIcon="selectIcon"/>
        </li>
      </ul>
      <ul class="list">
         <li>
          <yan-input v-bind="formInfo.goods" v-model="form.goods" :showIcon="inputIcon"/>
        </li>
        <li>
          <yan-input v-bind="formInfo.color" v-model="form.color" :showIcon="inputIcon"/>
        </li>
        <li>
          <yan-input v-bind="formInfo.budget" v-model="form.budget" :showIcon="inputIcon"/>
        </li>
         <li>
          <yan-input v-bind="formInfo.paid" v-model="form.paid" :showIcon="inputIcon"/>
        </li>
        <li>
          <discount-select v-bind="formInfo.discount" v-model="form.discount" :showIcon="selectIcon"/>
        </li>
      </ul>
      <yan-textarea v-bind="formInfo.remark"></yan-textarea>
      <div class="select">
        <classify-select style="margin-bottom:2.666vw" label="意向分类" @update="updateClassify" name="classify" :options="formInfo.classify"/>
        <classify-select label="是否紧急" @update="updateUrgency" name="classify" :options="formInfo.urgency"/>
      </div>
      <div>
         <title-bar :text="titleModule.report">
           <button type="button">添加记录</button>
         </title-bar>
      </div>
      <div>
         <title-bar :text="titleModule.order"/>
      </div>
      <p class="last">到底啦</p>
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
import progressSelect from '../../../components/mySelect/progressSelect'
import discountSelect from '../../../components/mySelect/discountSelect'
import classifySelect from '../../../components/mySelect/classifySelect'
import upload from '../../../components/upload/filesUpload'
import { Picker, Toast } from 'mint-ui';
import { mapState, mapMutations } from 'vuex'
Vue.component(Picker.name, Picker);
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
        progress:'',
        goods:'',
        color:'',
        budget:'',
        paid:'',
        discount:'',
        remark:'',
        classify:'',
        urgency:''
      },
      selectIcon:true,
      inputIcon:false
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
     discountSelect,
     classifySelect
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
    this.form.classify=option;
   },
   updateUrgency(option){
    console.log(option);
    this.form.urgency=option;
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
  }

 }
</style>
