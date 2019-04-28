<template>
  <div class="dailySummary">
    <H3>当日总结</H3>
    <textarea
    v-model="textareaVal"
    :disabled="disabled"
    maxlength="300"
    @change="changeTextarea"></textarea>
    <span>({{textareaVal.length}}/300)</span>
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
      this.$emit('changeDailySummaryTextarea', e.target.value)
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
}
</style>
