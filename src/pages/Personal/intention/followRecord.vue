<template>
    <div class="addAdress">
      <mybanner :title="title" style="background:#fff">
        <button type="button" @click="update">保存</button>
      </mybanner>
      <ul class="list">
        <li>
          <follow-select v-bind="formInfo.follow" v-model="form.follow" @update="updateFollow" :showIcon="selectIcon" class="li_border"/>
        </li>
        <li>
          <date-select v-bind="formInfo.time" v-model="form.time" @update="updateTime" :showIcon="selectIcon" class="li_border"/>
        </li>
        <li>
          <duration-select v-bind="formInfo.duration" v-model="form.residentTime"  @update="updateResidentTime" :showIcon="selectIcon"/>
        </li>
      </ul>
      <yan-textarea v-bind="formInfo.report" v-model="form.report"/>
      <div class="next">
         <date-select v-bind="formInfo.nextTime" v-model="form.nextTime"  @update="updateNextTime" :showIcon="selectIcon"/>
      </div>
      <yan-textarea v-bind="formInfo.plan" v-model="form.plan"/>
      <p class="title">附件图片</p>
      <upload picLen='5' :clear="isClear"/>
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
import durationSelect from '../../../components/mySelect/durationSelect'
import { Picker, Toast } from 'mint-ui';
import { mapState, mapMutations } from 'vuex'
Vue.component(Picker.name, Picker);
import { IndexModel } from '../../../utils'
const indexModel=new IndexModel();
import mango from '../../../js'
export default {
  data () {
    return {
      form:{
       follow:'',
       time:'',
       residentTime:'',
       report:'',
       nextTime:'',
       plan:''
      },
      selectIcon:true,
      oppId:'',
      isClear:false
    }
  },
  components:{
     mybanner,
     Btn,
     yanInput,
     yanTextarea,
     followSelect,
     dateSelect,
     upload,
     durationSelect
  },
  computed:{
    ...mapState('followRecord',[
      'title',
      'formInfo'
    ]),
    ...mapState(['Files'])
  },
  created(){
   this.oppId=this.$route.query.oppId;
  },
  methods:{
    ...mapMutations(['setFiles','setPicVal']),
    valid(){
      if(this.form.oppId===''){
        mango.tip('意向ID不能为空');
        return false;
      }
      if(this.form.follow===''){
        mango.tip('请选择跟进方式');
        return false;
      }
      if(this.form.nextTime===''){
        mango.tip('请选择跟进时间');
        return false;
      }
      return true;
    },
   update(){
      if(this.valid()){
        let formData=new FormData();
        formData.append('opportunity.oppId',this.oppId);
        formData.append('record.source',this.form.follow);
        formData.append('record.followDate',this.form.time);
        formData.append('record.nextDate',this.form.nextTime);
        formData.append('record.situation',this.form.report);
        formData.append('record.plan',this.form.plan);
        for(let i=0;i<this.Files.length;i++){
          formData.append('record.dataFile',this.Files[i]);
        }
        let key=['opportunity.oppId','record.source','record.followDate','record.nextDate','record.situation','record.plan'];
        indexModel.updateTrackrecord(formData,key).then(res => {
          if(res.code===0){
            mango.tip(res.msg);
            this.setFiles([]);
            this.setPicVal([]);
            this.isClear=true;
            this.form.follow='';
            this.form.time='';
            this.form.nextTime='';
            this.form.report='';
            this.form.plan='';
          }else{
            mango.tip(res.msg);
            this.setFiles([]);
            this.setPicVal([]);
            this.isClear=true;
            this.form.follow='';
            this.form.time='';
            this.form.nextTime='';
            this.form.report='';
            this.form.plan='';
          };
        })
      }
     
   },
   //选择更新跟进时间
   updateTime(value,anotherVal){
     this.$set(this.form,'time',anotherVal);
   },
   //选择更新下次跟进
   updateNextTime(value,anotherVal){
     this.$set(this.form,'nextTime',anotherVal);
   },
   //选择更新留店时长
   updateResidentTime(value){
    console.log(value);
    this.form.residentTime=value;
   },
   //选择跟进
   updateFollow(arr){
     //console.log(arr);
    this.form.follow=arr[0];
   }
      
  },
  beforeRouteLeave(to,from,next){
    console.log(this);
    this.setFiles([]);
    this.setPicVal([]);
    next();
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
