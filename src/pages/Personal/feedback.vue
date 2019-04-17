<template>
  <div class="feedback">
    <mybanner :title="title" style="position:static;border:none;background:#fff"/>
    <div class="textareaBox">
      <textarea name="" id=""  placeholder="请描述你的反馈意见，我们将不断改进" maxlength="250" v-model="remark"></textarea>
      <span>{{remark.length}}/250</span>
    </div>
    <upload ref="upload" path="this.path" picLen='3' :clear="isClear"/>
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
      isClear:false
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
          f.append('phone',this.phone);
          console.log(f.get('phone'));
          f.append('feedbackInfo',this.remark);
          console.log(f.get('feedbackInfo'));
           for(let i=0;i<this.Files.length;i++){
            f.append('dataFile',this.Files[i]);
          }
           indexModel.feedback(f,['phone','feedbackInfo']).then(res => {
            if(res.code===0){
              this.messageTip.tip=res.msg;
              this.messageTip.showMessageBox=true;
              this.setMessageBox(this.messageTip);
              this.setFiles([]);
              this.setPicVal([]);
              this.updateRemark('');
              this.updateContact('');
              this.isClear=true;
            }else{
              this.messageTip.tip=res.msg;
              this.messageTip.type=false;
              this.messageTip.showMessageBox=true;
              this.setMessageBox(this.messageTip);
              this.setFiles([]);
              this.setPicVal([]);
              this.updateRemark('');
              this.updateContact('');
              this.isClear=true;
            }
          }) 
      }
    
     
    },
    cancel(){
      this.messageTip.showMessageBox=false;
      this.setMessageBox(this.messageTip);
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
      let reg=/^1[34578]\d{9}$/;
      if(!reg.test(this.phone)){
        mango.tip('请输入正确的手机号码');
        return false;
      }
      return true;
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
