<template>
  <div class="inputBox">
      <label @click="selectArea">
          <span>{{label}}<span class="yan-red" v-show="required">*</span></span>
          <input  type="text" :value="value" :placeholder="placeholder" @input="$emit('input',$event.target.value)">
      </label>
      <div class="icon-right" v-if="showIcon">
        <img src="../../assets/imgs/rightside.png" alt="">
      </div>
      <mt-popup v-model="popupVisible" position="bottom">
        <mt-picker :slots="slots" @change="onValuesChange" :showToolbar="true" value-key="name">
            <div class="btn-group">
              <div @click="cancel">取消</div>
             <!--  <div>请选择省-市-区/县</div> -->
              <div @click="update">确定</div>
            </div>
          </mt-picker>
      </mt-popup>
   </div>
</template>

<script>
import Vue from 'vue'
import { Picker } from 'mint-ui';
Vue.component(Picker.name, Picker);
import {IndexModel} from '../../utils'
const indexModel=new IndexModel()
export default {
  props:['value','label','placeholder','showIcon','required'],
  data(){
    return{
      popupVisible:false,
      cityName:'',
      cityCode:'',
      key:false,
      slots:[
        {
          flex: 1,
          values: ['请选择省'],
          className: 'slot1',
          textAlign: 'center'
        }, {
          divider: true,
          content: '',
          className: 'slot2'
        }, {
          flex: 1,
          values: ['请选择市'],
          className: 'slot3',
          textAlign: 'center'
        },
        {
          divider: true,
          content: '',
          className: 'slot4'
        }, {
          flex: 1,
          values: ['请选择区/县'],
          className: 'slot5',
          textAlign: 'center'
        }
      ],
      pickerArr:[]
    }
  },
  mounted(){
    this.getProvinceArr();
  },
  methods:{
    onValuesChange(picker,values){
      let that=this;
      
      if(that.key){
        let id=values[0].id;
        //根据省id获取市
        indexModel.getArea('DR_CITY').then(res => {
          if(res.code===0){
          picker.setSlotValues(1,that.getReference(id,res.data));
          }
        });
        //根据市id获取区县
        indexModel.getArea('DR_COUNTY').then(res => {
          if(res.code===0){
            let cityId=values[1].id;
            picker.setSlotValues(2,that.getReference(cityId,res.data));
          }
        });
        that.pickerArr=picker.getValues();
    
      }
  
    },
    cancel(){
      let that=this;
      that.popupVisible=false;
    },
    update(){
      let that=this;
      let cityName=`${that.pickerArr[0].name} ${that.pickerArr[1].name} ${that.pickerArr[2].name}`;
      //console.log(cityName);
      let cityCode=`${that.pickerArr[0].code}-${that.pickerArr[1].code}-${that.pickerArr[2].code}`;
      that.$emit('update',cityName,cityCode);
      that.popupVisible=false;
    },
    getProvinceArr(){
      indexModel.getArea('DR_STATE').then(res => {
        if(res.code===0){
          let arr=res.data;
          this.slots[0].values=arr;
          let id=this.slots[0].values[0].id;
          //根据省id获取市
          indexModel.getArea('DR_CITY').then(res => {
            if(res.code===0){
            this.slots[2].values=this.getReference(id,res.data)
            }
          });
          //根据市id获取区县
          indexModel.getArea('DR_COUNTY').then(res => {
            if(res.code===0){
              let cityId=this.slots[2].values[1].id;
              this.slots[4].values=this.getReference(cityId,res.data)
            }
          });
        }
      })
    }, 
    selectArea(){
      let that=this;
      that.popupVisible=true;
      that.key=true;
    },
    getReference(id,arr){
      var newArr=arr.filter(function(item,index,array){
        return (item.parent===id);
      });
      return newArr;
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
