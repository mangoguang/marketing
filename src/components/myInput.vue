<template>
  <li>
    <label 
      :for="`${inputID}`" 
      :class='`${labelType}`'>
      <span>{{labelContent}}</span>
    </label>
    <input 
      :id="`${inputID}`" 
      :type="type" 
      :class="`${inputType}`"
      v-on:focus='focusInput()'  
      @blur="blurInput()"
      v-on:input="$emit('input',$event.target.value)"
      :value='value'
      maxlength="20">
  </li>
</template>

<script>
export default {
  name: 'myInput',
  props:['type','labelContent','value','Msg'],
  data(){
    return{
      inputType:'inputType',
      inputNewPwd:'inputNewPwd',
      labelType:'labelType',
      inputID:'',
      inputContent:''
    }
  },
  mounted(){
    // console.log('Msg',this.Msg)
    //页面开始时候有缓存，样式改变。
    if(this.Msg){
      if(this.Msg.length){
        this.labelType = 'labelStatus2'
        this.inputType = 'inputStatus1'
      }
    }
  },
  created(){
    //给每个li组件加一个ID
    this.inputID = Math.floor(Math.random()*10000);
    // console.log(this.inputID)
    //页面开始时候输入框为空，不加载动画。
    if(this.value.length){

    }else{
      this.labelType = 'labelStatus3'
    }
  },
  methods:{
    focusInput : function(){
      if(this.value.length){
        this.inputType = 'inputStatus1'
        this.labelType = 'labelStatus2'
      }else{
        this.inputType = 'inputStatus1'
        this.labelType = 'labelStatus1'
      }  
    },
    blurInput:function(){
      if(this.value.length){
        this.inputType = 'inputStatus1'
        this.labelType = 'labelStatus2'
      }else{
        this.inputType = 'inputType'
        this.labelType = 'labelType'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
li{
  font-family: PINGPANG;
  list-style: none;
  position: relative;
  height: 11.33vw;
}
input{
  outline-style: none;
  outline-width: 0;
  border-style: none;
  text-shadow: none;
  box-shadow: none;
  outline-color: transparent

}
.labelType{
  font-size: 4vw;
  letter-spacing: .66vw;
  color: #909090;   
  line-height: 11.6vw;  
    }
    //span位置
    .labelType{
      position: absolute;
      left: 1px;
      top: -4px;
      animation: moveDown .5s;
      @keyframes moveDown {
        from{
          top: -6.5vw;
        }
        to{
          top: -4px;
        }
      }
      }
    .labelStatus1{
      position: absolute;
      left: 1px;
      top: -6.5vw;
      animation: moveUP .5s;
      @keyframes moveUP {
        from{
          top: 5px;
        }
        to{
          top: -6.5vw;
        }
      }
      span{
        color: #bebebe;
        font-size:3.2vw;
        letter-spacing: 4px;
      }
    }
    .labelStatus2{
      position: absolute;
      left: 1px;
      top: -6.5vw;
      span{
        color: #bebebe;
        font-size:3.2vw;
        letter-spacing: 4px; 
      }
    }
    .labelStatus3{
      position: absolute;
      left: 1px;
      top: -4px;
        span{
        font-size: 4vw;
        letter-spacing: 5px;
        color: #909090;   
        line-height: 10vw; 
      }
    }
    .inputType{
      display: block;
      border-bottom: 1px solid #ccc;
      width: 80vw;
      height: 8vw;
      font-size: 4vw;
      margin-top: 10vw;
      color: #262628;
      -webkit-appearance:none;/*清除ios默认圆角*/
      border-radius:0;
    }
    .inputStatus1{
      display: block;
      border-bottom: 2px solid #ccc;
      width: 80vw;
      height: 8vw;
      font-size: 4vw;
      margin-top: 10vw;
      color: #262628;  
      -webkit-appearance:none;/*清除ios默认圆角*/
      border-radius:0;   
      }


</style>

