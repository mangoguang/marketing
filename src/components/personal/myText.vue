<template>
  <div class="myText">
    <div class="title">
      <div class="line"></div>
      <p>{{pTitle}}</p>
    </div>
    <textarea :disabled="textareaStatus" :placeholder="`${pla}`" 
      v-on:input="$emit('input',$event.target.value)"
      :value='value'>
      </textarea>
  </div>
</template>

<script>
import Vue from 'vue'
import mango from '../../js'
export default {
  props:['pTitle','pla','value','changeDay'],
  data(){
    return{

    }
  },
  computed: {
    textareaStatus() {
      let date = new Date()
      return mango.indexTimeB(date)[1] != this.changeDay
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
.myText{
  width: 100vw;
  padding-top: 5.46vw;
  textarea:disabled{
    color: #999
  }
  .title{
    display: flex;
    margin-left: 4.26vw;
    align-items: center;
    line-height: 3em;
    .line{
      border-radius: 0.266vw;
      background: #007aff;
      width: 0.53vw;
      height: 4vw;
      margin-right: 1vw;
    }
    p{
      color: #363636;
      font-size: 4vw;
    }
  }
  textarea{
    border-top: 1px solid #ccc;
    border-bottom:1px solid #ccc; 
    width: 100vw;
    padding: 4.26vw;
    height: 23.7vw;
    overflow: scroll;
    box-sizing: border-box;
    font-size: 4vw;
    color: #999;
    background: #fff;
  }
}
</style>
