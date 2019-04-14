<template>
  <div class="dailyPlan">
    <H3>明日目标及重点工作安排</H3>
    <Textarea @changeTextarea="changeTextarea"></Textarea>
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
  props:['list', 'curDay'],
  data(){
    return{

    }
  },
  created() {
  
  },
  mounted() {

  },
  methods:{
    changeTextarea(str) {
      this.$emit('changeDailyPlanTextarea', str)
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
}
</style>
