<template>
  <div class="remark">
    <p>{{label}}</p>
    <textarea name="" id="" :placeholder="placeholder" :readonly='readonly' :value="value" @input="$emit('input',$event.target.value)"></textarea>
  </div>
</template>

<script>
export default {
  props:['value','label','placeholder','readonly'],
  data(){
    return{

    }
  }
 
}
</script>

<style lang="scss" scoped>
 .remark{
    p{
      color:#363636;
      font-size:4vw;
      padding-left: 4.266vw;
      margin-top:4vw;
      margin-bottom:2.666vw;
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
      width:100vw;
      min-height: 23.733vw;
      background: #fff;
      outline: none;
      resize: none;
      border:1px solid #e1e1e1;
      border-left:none;
      border-right: none;
      padding:4.266vw;
      box-sizing: border-box;
    }
  }
</style>
