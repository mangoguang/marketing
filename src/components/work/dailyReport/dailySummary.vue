<template>
  <div class="dailySummary">
    <H3>当日总结</H3>
    <div v-if="disabled">
      <textarea
      v-model="textareaVal"
      maxlength="300"
      @change="changeTextarea"></textarea>
      <span>({{textareaVal.length}}/300)</span>
    </div>
    <p v-else>{{text}}</p>
  </div>
</template>

<script>
import DailyUl from '../daily/dailyUl'
import H3 from '../dailyReport/h3'
import Textarea from '../dailyReport/textarea'
import { mapState } from 'vuex';

export default {
  name: 'dailySummary',
  components:{
    DailyUl,
    H3,
    Textarea
  },
  props:['list', 'curDay', 'text', 'disabled'],
  data(){
    return{
      textareaVal: ''
    }
  },
  watch: {
    text() {
      this.textareaVal = this.text
    }
  },
  created() {
    
  },
  mounted() {

  },
  methods:{
    changeTextarea(e) {
    
      e.target.value=e.target.value.replace(/[\uff00-\uffff]/g,'')
      console.log('ppp',this.charToUnicode(e.target.value))
      let value = this.charToUnicode(e.target.value)
      console.log('uuuu',this.unicodeToChar(value).charAt(0))
      this.textareaVal=this.textareaVal.replace(/[\uff00-\uffff]/g,'')
      this.$emit('changeDailySummaryTextarea', e.target.value)
    },
    charToUnicode(str) {
        let temp;
        for(let i = 0;i<str.length;i++){
          temp+='\\u' + str[i].charCodeAt(0).toString(16);
        }
        return temp;
    },
    unicodeToChar(str){
        if(str && str.indexOf('\\u')!==-1) {
          var valArr = str.split('\\u'),result = '';
          for (var j = 0,length = valArr.length;j < length;j++){
            result += String.fromCharCode(parseInt(valArr[j], 16));
          }
          //如果不截取，则会出现空白字符，如何也消除不了
          return  result;
        }else{
          alert('不是unicode字符，无需解码!')
        }
    
    }
  }
}
</script>

<style lang="scss" scoped>

.dailySummary{
  h3{
    color: #ff9500;
  }
  h3:after{
    background: #ff9500;
  }
  textarea{
    display: block;
    width: 100%;
    height: 40vw;
    box-sizing: border-box;
    padding: 2vw;
    color: #666;
    font-size: 14px;
  }
  span{
    color: #999;
  }
  p{
    padding: 4vw;
    color: #363636;
    word-break: break-all;
  }
}
</style>
