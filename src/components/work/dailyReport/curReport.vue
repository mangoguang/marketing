<template>
  <div class="curReport">
    <H3>{{curDay}}数据</H3>
    <DailyUl
    :list="list" />
  </div>
</template>


<script>
import DailyUl from '../daily/dailyUl'
import H3 from '../dailyReport/h3'

export default {
  name: 'curReport',
  components:{
    DailyUl,
    H3
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

  }
}
</script>

<style lang="scss" scoped>

.curReport{
  h3{
    position: relative;
    font-size: 16px;
    font-size: 300;
    color: #007fff;
    line-height: 3em;
    padding-left: 4vw;
    border-bottom: 1px solid #e1e1e1;
  }
  h3:after{
    content: '';
    display: block;
    position: absolute;
    width: 2px;
    height: 20px;
    left: 0;
    top: 50%;
    margin-top: -10px;
    background: #007fff;
  }
}
</style>
