<template>
  <div class="remark">
    <p>{{label}}<span class="yan-red" v-show="required">*</span></p>
    <p v-if="readonly" class="value">{{value}}</p>
    <textarea v-else name="" id="" :maxlength='maxlength' :placeholder="placeholder"  :readonly='readonly' :value="value" @input="$emit('input',$event.target.value)"></textarea>
  </div>
</template>

<script>
export default {
  props:['value','label','placeholder','readonly','maxlength','required'],
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
      margin-top:2.666vw;
      margin-bottom:2.666vw;
       .yan-red{
        color:#FB222B;
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
      overflow: scroll;
    }
    .value{
      padding:4.266vw;
      text-align: justify;
      word-break: break-all;
      background: #fff;
      border-top:1px solid #e1e1e1;
      border-bottom:1px solid #e1e1e1;
    }
  }
</style>
