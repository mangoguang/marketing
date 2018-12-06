<template>
  <div class="followDetails">
    <h1>跟进情况</h1>
    <div class="follow-situtation">
      {{ followTrackDetails.followSituation }}
    </div>
    <ul>
      <li>
        <span>成交率</span>
        <p>{{ followTrackDetails.probability }}</p>
      </li>
      <li>
        <span>下次跟进日期</span>
        <p>{{ followTrackDetails.followTime }}</p>
      </li>
    </ul>
    <h1>跟进计划</h1>
    <div class="follow-plan">
      {{ followTrackDetails.followPlan }}
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuex, { mapMutations, mapState } from 'vuex'
import VueRouter from 'vue-router'

export default {
  props:['followTrackDetail'],
  computed: {
    ...mapState({
      followTrackDetails: state => state.followTrackDetails.followTrackDetails  
    })
  },
  data() {
    return{
    
    }
  }
}
</script>

<style lang="scss" scoped>
.followDetails{
  padding: 0 4.4vw 6.6vw 4.4vw;
  border-top: 2px solid #007aff;
  border-bottom: 2px solid #007aff;
  color: #363636;
  background: #fff;
  h1{
    font-size: 4vw;
    line-height: 3em;
  }
  .follow-situtation ,.follow-plan{
    width: 91.33vw;
    height: 23.46vw;
    overflow: scroll;
    border: 1px solid #e1e1e1;
    border-radius: 1.6vw;
    background: #f8f8f8;
    padding: 4vw;
    box-sizing: border-box;
  }
  ul{
    li{
      display: flex;
      justify-content: space-between;
      line-height: 12vw;
      p{
        color: #999;
      } 
    }
  }
}
</style>
