<template>
  <div class="dailySummary">
    <H3>当日总结</H3>
    <Textarea
    :text="text"
    @changeTextarea="changeTextarea"></Textarea>
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
  props:['list', 'curDay', 'text'],
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
      this.$emit('changeDailySummaryTextarea', str)
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
}
</style>
