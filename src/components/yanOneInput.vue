<template>
  <div class="inputBox">
      <label>
          <span>{{label}}</span>
          <textarea :value="value" :style="color" 
          :readonly='readonly' :placeholder="placeholder" @input="$emit('input',$event.target.value)"
          :maxlength='maxlength' rows="1" cols="1"></textarea>
      </label>
      <div class="icon-right" v-if="showIcon">
        <img src="../assets/imgs/rightside.png" alt="">
      </div>
   </div>
</template>

<script>
export default {
  props:['value','label','placeholder','showIcon','readonly','color','maxlength'],
  data(){
    return{

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
    //align-items: center;
    align-items: flex-start;
    font-size: 0;
    span{
      display: inline-block;
      font-size: 4vw;
      width:22.4vw;
      //line-height: 7vw;
    }
    
    
  }
   textarea::-moz-placeholder{
      color:#999;
      font-size:4vw;
    }
     textarea:-moz-placeholder{
      color:#999;
      font-size:4vw;
    }
    textarea::-ms-input-placeholder{
      color:#999;
      font-size:4vw;
    }
    textarea::-webkit-input-placeholder{
      color:#999;
      font-size:4vw;
    }
    textarea{
      color:#363636;
      font-size:4vw;
      flex: 1;
      outline: none;
      resize: none;
      border:none;
      //height:12vw;
      line-height: 12vw;
      overflow: scroll;
      //padding-top:1vw;
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
