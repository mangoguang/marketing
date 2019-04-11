<template>
    <div class="addAdress">
      <mybanner :title="title" style="background:#fff">
        <button type="button" @click="update">保存</button>
      </mybanner>
      <ul class="list">
        <li>
          <follow-select v-bind="formInfo.follow" v-model="form.follow" :showIcon="selectIcon" class="li_border"/>
        </li>
        <li>
          <date-select v-bind="formInfo.time" v-model="form.time" :showIcon="selectIcon"/>
        </li>
      </ul>
      <yan-textarea v-bind="formInfo.report" v-model="form.report"/>
      <div class="next">
         <date-select v-bind="formInfo.nextTime" v-model="form.time" :showIcon="selectIcon"/>
      </div>
      <yan-textarea v-bind="formInfo.plan" v-model="form.plan"/>
      <p class="title">附件图片</p>
      <upload picLen='5'/>
    </div>
</template>

<script>
import Vue from 'vue'
import mybanner from '../../../components/banner'
import Btn from '../../../components/personal/Btn'
import yanInput from '../../../components/yanInput'
import yanTextarea from '../../../components/yanTextarea'
import followSelect from '../../../components/mySelect/followSelect'
import dateSelect from '../../../components/mySelect/dateSelect'
import upload from '../../../components/upload/filesUpload'
import { Picker, Toast } from 'mint-ui';
import { mapState, mapMutations } from 'vuex'
Vue.component(Picker.name, Picker);
export default {
  data () {
    return {
      form:{
       follow:'',
       time:'',
       report:'',
       nextTime:'',
       plan:''
      },
      selectIcon:true
    
    }
  },
  components:{
     mybanner,
     Btn,
     yanInput,
     yanTextarea,
     followSelect,
     dateSelect,
     upload
  },
  computed:{
    ...mapState('followRecord',[
      'title',
      'formInfo'
    ])
  },
  created(){
   
  },
  
  mounted(){

  },
  methods:{
   update(){
     this.$router.push({path:'/intention'})
   }
      
  }
};
</script>

<style lang="scss" scoped>
 .addAdress{
   width:100vw;
   min-height: 100vh;
   position: relative;
   box-sizing: border-box;
  padding-top:16.466vw;
  .list{
    width:100vw;
    border-bottom: 1px solid #e1e1e1;
    background: #fff;
    li{
      padding-left:4.266vw;
      .li_border{
        border-bottom: 1px solid #e1e1e1;
        padding-left:none;
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
  .title{
    color:#363636;
    font-size:4vw;
    padding:0 4.266vw;
  }

 }
</style>
