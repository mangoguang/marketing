<template>
  <div class="feedback">
    <mybanner :title="title" style="position:static;border:none;background:#fff"/>
    <div class="textareaBox">
      <textarea name="" id=""  placeholder="请描述你的反馈意见，我们将不断改进" maxlength="250" v-model="remark"></textarea>
      <span>{{remark.length}}/250</span>
    </div>
    <div class="uploadBox">
      <ul class="upload_list">
        <li>
          <img src="" alt="">
        </li>
        <li>
          <img src="" alt="">
        </li>
      </ul>
      <div class="upload">
          <img src="../../assets/imgs/upload.png" alt="">
          <span>添加图片</span>
          <input type="file" name="" id="">
      </div>
      <span class="count">2/3</span>
    </div>
    <div class="form">
      <yan-input v-bind="contactObj" v-model="contact" :showIcon="false"/>
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
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      messageTip:{
        showMessageBox:false,
        btnNum:1,
        type:true,
        tip:'提交成功！感谢您的反馈~'
      }
     
    }
  },
  components:{
      mybanner,
      Btn,
      yanInput,
      messageBox
  },
  computed:{
    ...mapState('feedback',['title','contactObj','messageBox']),
    remark:{
      get(){
        return this.$store.state.feedback.remark
      },
      set(val){
       this.updateRemark(val)
      }
    },
    contact:{
      get(){
        return this.$store.state.feedback.contact
      },
      set(val){
        this.updateContact(val)
      }
    }
  },
  methods:{
    ...mapMutations('feedback',['setMessageBox','updateRemark','updateContact']),
    submit(){
      this.messageTip.showMessageBox=true;
      this.setMessageBox(this.messageTip);
    },
    cancel(){
      this.messageTip.showMessageBox=false;
      this.setMessageBox(this.messageTip);
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
  .uploadBox{
    padding:2.666vw 4.266vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    .upload_list{
      display: flex;
      flex-direction: row;
      align-items: center;
      li{
        width:20vw;
        height:20vw;
        border-radius: 1.066vw;
        border:1px solid #e1e1e1;
        overflow: hidden;
        margin-right:1.333vw;
      }
    }
    .upload{
      position:relative;
      width:20vw;
      height:20vw;
      border-radius: 1.066vw;
      border:1px dashed #e1e1e1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img{
        width: 5.333vw;
        margin-bottom: 2.133vw;
      }
      span{
        color:#909090;
        font-size: 2.4vw;
      }
      input{
        opacity: 0;
        position: absolute;
        top:0;
        right:0;
        left:0;
        bottom:0;
      }
    }
    .count{
      position: absolute;
      bottom:2.666vw;
      right:4.533vw;
      color:#909090;
      font-size: 2.4vw;
    }
  }
  .form{
    border-top:1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
    margin-bottom: 13.333vw;
    background: #fff;
  }
}

</style>
