<template>
  <div class="feedback">
    <mybanner :title="title" style="position:static;border:none;"/>
    <div class="textareaBox">
      <textarea name="" id=""  placeholder="请描述你的反馈意见，我们将不断改进" maxlength="250" v-model="remark"></textarea>
      <span>{{remark.length}}/250</span>
    </div>
    <upload ref="upload" :path="path" picLen='3' :clear="isClear"/>
    <div class="form">
      <yan-input v-bind="contactObj" v-model="phone" :showIcon="false"/>
    </div>
    <btn text="提交" @click.native="submit"/>
    <message-box :type="messageBox.type" :btnNum='messageBox.btnNum' v-if="messageBox.showMessageBox">
      {{messageBox.tip}}
    <template v-slot:btn-group>
        <button type="button" @click="remove">移除</button>
        <button type="button" @click="cancel">取消</button>
    </template>
    <template v-slot:btn>
        <button type="button" @click="cancel">确定</button>
    </template>
  </message-box>
  </div>
</template>

<script>
import mybanner from '../../components/banner'
import Btn from "../../components/personal/Btn"
import yanInput from "../../components/yanInput"
import messageBox from '../../components/msManage/yanMessageBox'
import upload from '../../components/upload/filesUpload'
import { mapState, mapMutations } from 'vuex'
import mango from '../../js'
import { IndexModel } from '../../utils'
const indexModel=new IndexModel()
export default {
  data () {
    return {
      messageTip:{
        showMessageBox:false,
        btnNum:1,
        type:true,
        tip:'提交成功！感谢您的反馈~'
      },
      path:'/feedback',
      isClear:true
    }
  },
  components:{
      mybanner,
      Btn,
      yanInput,
      messageBox,
      upload
  },
  computed:{
    ...mapState('feedback',['title','contactObj','messageBox']),
    ...mapState(['Files']),
    remark:{
      get(){
        return this.$store.state.feedback.remark
      },
      set(val){
       this.updateRemark(val)
      }
    },
    phone:{
      get(){
        return this.$store.state.feedback.contact
      },
      set(val){
        this.updateContact(val)
      }
    }
  },
  methods:{
    ...mapMutations('feedback',['setMessageBox','updateRemark','updateContact','updateImgList']),
    ...mapMutations(['setFiles','setPicVal']),
    submit(){
      if(this.valid()){ 
           let f=new FormData();
          if(this.Files.length>0){
            for(let i=0;i<this.Files.length;i++){
              f.append('dataFile',this.Files[i]);
            }
          }
          let obj=this.updateParams()
          let keys=[];
          for(let key in obj){
            f.append(key,obj[key])
            keys.push(key)
          }
           indexModel.feedback(f,keys,obj).then(res => {
            if(res.code===0){
              this.messageTip.tip=res.msg;
              this.messageTip.showMessageBox=true;
              this.setMessageBox(this.messageTip);
              this.updateRemark('');
              this.updateContact('');
              this.setFiles([]);
              this.setPicVal([]);
            }else{
              this.messageTip.tip=res.msg;
              this.messageTip.type=false;
              this.messageTip.showMessageBox=true;
              this.setMessageBox(this.messageTip);
              this.updateRemark('');
              this.updateContact('');
              this.setFiles([]);
              this.setPicVal([]);
               
            }
          }).catch((reject) => {
            if(reject === 510){
              this.submit()
            }
          }) 
      }
    
     
    },
    updateParams(){
      let tempObj={};
      let temp={
        'phone':this.phone,
        'feedbackInfo':this.remark
      }
      for(let key in temp){
        if(temp[key]||temp[key]===0){
          tempObj[key]=temp[key]
        }
      }
      return tempObj
    },
    cancel(){
      this.messageTip.showMessageBox=false;
      this.setMessageBox(this.messageTip);
      if(this.messageTip.type){
         this.$router.go(-1);
      }
    },
    getImgs(array){
     console.log(array);
      this.updateImgList(array);
    },
    valid(){
      if(this.remark==''){
          mango.tip('反馈信息不能为空');
          return false;
      }
      // let reg=/^1[34578]\d{9}$/;
      // if(!reg.test(this.phone)){
      //   mango.tip('请输入正确的手机号码');
      //   return false;
      // }
      return true;
    }

  },
  beforeRouteEnter(to,from,next){
    if(!to.meta.isUseCache){
      next(vm => {
        vm.updateRemark('');
        vm.updateContact('');
        vm.setFiles([]);
        vm.setPicVal([]);
        vm.path='/feedback';
        vm.isClear=true;
      })
    }else{
      next();
    }
  }
};
</script>

<style lang="scss" scoped>
.feedback{
  height:100vh;
  .textareaBox{
    position: relative;
    width:100vw;
    border-bottom: 1px solid #e1e1e1;
    padding:3.466vw 4.533vw;
    box-sizing: border-box;
    background:#fff;
    textarea::-moz-placeholder{
      color:#909090;
      font-size: 3.733vw;
    }
     textarea:-moz-placeholder{
      color:#909090;
      font-size: 3.733vw;
    }
    textarea::-ms-input-placeholder{
      color:#909090;
      font-size: 3.733vw;
    }
    textarea::-webkit-input-placeholder{
      color:#909090;
      font-size: 3.733vw;
    }
    textarea{
      width:100%;
      height:40.8vw;
      font-size: 3.733vw;
      color:#363636;
      resize: none;
      -webkit-tap-hightlight-color:rgba(0,0,0,0);
    }
    span{
      position: absolute;
      bottom:2.666vw;
      right:4.533vw;
      font-size: 2.4vw;
      color:#909090;
    }

  }
  .form{
    border-top:1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
    margin-bottom: 13.333vw;
    background: #fff;
    padding-left: 4.266vw;
  }
}

</style>
