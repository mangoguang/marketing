<template>
  <div class="inputBox">
      <label @click="openTimePicker">
          <span>{{label}}<span class="yan-red" v-show="required">*</span></span>
          <input  type="text" :value="value" readonly :placeholder="placeholder" @input="$emit('input',$event.target.value)">
      </label>
      <div class="icon-right" v-if="showIcon">
        <img src="../../assets/imgs/rightside.png" alt="">
      </div>
      <mt-datetime-picker
        v-model="pickerVisible"
        type="time"
        hourFormat="{value} 小时"
        minuteFormat="{value} 分钟"
        @confirm="handleConfirm"
        ref='time'>
      </mt-datetime-picker>
   </div>
</template>

<script>
import Vue from 'vue'
import { DatetimePicker } from 'mint-ui';
Vue.component(DatetimePicker.name, DatetimePicker);
export default {
  props:['value','label','placeholder','showIcon','required'],
  data(){
    return{
      pickerVisible:''
    }
  },
  methods:{
    handleConfirm(){
      if(this.pickerVisible){
        let durationAttr=this.pickerVisible.split(':');
        let hour= parseInt(durationAttr[0])<=0?'':parseInt(durationAttr[0])+"小时";
        let minute=parseInt(durationAttr[1])<=0?'':parseInt(durationAttr[1])+"分钟";
        let duration=hour+minute;
        this.$emit('update',duration);
      }else{
        this.$emit('update','');
      }
    },
    openTimePicker(){
      if(this.showIcon){
         this.$refs.time.open();
      }else{
        return;
      }
     
    }
   
  }
 
}
</script>

<style lang="scss" scoped>
.inputBox{
  font-size: 4vw;
  color:#363636;
  height:12vw;
  line-height: 12vw;
  padding-right:4.266vw;
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  label{
    width:100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    span{
      display: inline-block;
      width:22.4vw;
    }
    .yan-red{
      display: inline;
      color:#FB222B;
    }
    
  }
  input:-moz-input-placeholder{
    font-size: 4vw;
    color:#909090;
  }
  input::-moz-input-placeholder{
    font-size: 4vw;
    color:#909090;
  }
  input::-ms-input-placeholder{
    font-size: 4vw;
    color:#909090;
  }
  input::-webkit-input-placeholder{
    font-size: 4vw;
    color:#909090;
  }
  input{
    color:#363636;
    font-size: 4vw;
    flex: 1;
  }
  .icon-right{
    margin-left:2.133vw;
    //padding-right:4.266vw;
    img{
      width: 1.86vw;
      height: 3.06vw;
    }
  }
}
</style>
