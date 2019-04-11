<template>
  <div class="inputBox">
      <label @click="selectArea">
          <span>{{label}}<span class="yan-red" v-show="required">*</span></span>
          <input  type="text" :value="value" readonly  :placeholder="placeholder" @input="$emit('input',$event.target.value)">
      </label>
      <div class="icon-right" v-if="showIcon">
        <img src="../../assets/imgs/rightside.png" alt="">
      </div>
       <mt-popup v-model="popupVisible" position="bottom">
        <mt-picker :slots="provinceSlots" @change="provinceChange"></mt-picker>
        <mt-picker :slots="citySlots" @change="cityChange"></mt-picker>
        <mt-picker :slots="countySlots" @change="countyChange"></mt-picker>
      </mt-popup>
   </div>
</template>

<script>
import Vue from 'vue'
import { Picker } from 'mint-ui';
Vue.component(Picker.name, Picker);
import mango from '../../js/'
import {IndexModel} from '../../utils'
const indexModel=new IndexModel()
export default {
  props:['value','label','placeholder','showIcon','required'],
  data(){
    return{
      popupVisible:false,
      provinceArr:[],
      cityArr:[],
      countyArr:[],
      provinceSlots:[],
      citySlots:[],
      countySlots:[],
      provinceName:'',
      cityName:'',
      countyName:'',
      key:false
    }
  },
  created(){
    this.getProvinceArr();
  },
  methods:{
    provinceChange(picker,values){
        if(this.key){
          this.getProvinceArr();
        }
    },
    cityChange(picker,values){

    },
    countyChange(picker,values){

    },
    getProvinceArr(){
      indexModel.getArea('DR_STATE').then(res => {
        console.log(res);
        if(res.code===0){
          this.provinceArr=res.data;
          let temp=this.filterName(this.provinceArr);
          temp.unshift('请选择省');
          this.provinceSlots=[
            {
              values:temp,
              className:'provinceSlot'
            }
          ]
        }
      })
    },
    getCityArr(){
      indexModel.getArea('DR_CITY').then(res => {
        if(res.code===0){
          this.cityArr=res.data;
          
        }
      })
    },
    getCountyArr(){
      indexModel.getArea('DR_COUNTY').then(res => {
        if(res.code===0){
          this.countyArr=res.data;
        }
      })
    },
    selectArea(){
      this.popupVisible=true;
      this.key=true;
    },
    filterName(arr){
      return arr.filter(function(item,index,array){
        return item.name;
      }) 
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
