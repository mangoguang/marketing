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
        <mt-picker :slots="slots" @change="onValuesChange" :showToolbar="true" value-key='name'>
          <div class="btn-group">
              <div @click="cancel">取消</div>
              <div @click="update">确定</div>
            </div>
        </mt-picker>
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
          values: [{name:'有',value:"Y"},{name:'无',value:''}],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      arr:[]

    }
  },
  methods:{
    onValuesChange(picker,values){
      //console.log(picker);
      //console.log(values);
      this.arr=picker.getValues();
    },
    openElevatorSelect(){
      this.popupVisible=true;
    },
    cancel(){
      this.popupVisible=false;
    },
    update(){
      this.$emit('update',this.arr[0].name,this.arr[0].value);
      this.popupVisible=false;
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
.btn-group{
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  //padding:0 4.266vw;
  div{
    //flex:1;
    color:#26a2ff;
    font-size: 16px;
  }
}
</style>
