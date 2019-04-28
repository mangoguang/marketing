<template>
  <div class="dailyPlan">
    <H3>明日目标及重点工作安排</H3>
    <textarea
    @change="changeTextarea"
    maxlength="300"
    v-model="textareaVal"
    :disabled="disabled"></textarea>
    <span>({{textareaVal.length}}/300)</span>
  </div>
</template>


<script>
import DailyUl from '../daily/dailyUl'
import H3 from '../dailyReport/h3'
import Textarea from '../dailyReport/textarea'

export default {
  name: 'dailyPlan',
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
      this.$emit('changeDailyPlanTextarea', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>

.dailyPlan{
  h3{
    color: #FF2D55;
  }
  h3:after{
    background: #FF2D55;
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
