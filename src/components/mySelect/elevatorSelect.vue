<template>
  <div class="inputBox">
      <label @click="openElevatorSelect">
          <span>{{label}}<span class="yan-red" v-show="required">*</span></span>
          <input  type="text" :value="value" readonly  :placeholder="placeholder" @input="$emit('input',$event.target.value)">
      </label>
      <div class="icon-right" v-if="showIcon">
        <img src="../../assets/imgs/rightside.png" alt="">
      </div>
      <mt-popup v-model="popupVisible" position="bottom">
        <mt-picker :slots="slots" @change="onValuesChange" :showToolbar="true"></mt-picker>
      </mt-popup>
   </div>
</template>
true
<script>
import Vue from 'vue'
import { Popup, Picker } from 'mint-ui';
Vue.component(Picker.name, Picker);
Vue.component(Popup.name, Popup);
export default {
  props:['value','label','placeholder','showIcon','required'],
  data(){
    return{
      popupVisible:false,
      slots:[
        {
          flex: 1,
          values: ['是','否'],
          className: 'slot1',
          textAlign: 'center'
        }
      ]
    }
  },
  methods:{
    onValuesChange(picker,values){
      console.log(picker);
      console.log(values);
    },
    openElevatorSelect(){
      this.popupVisible=true;
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
