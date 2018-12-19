<template>
  <div class="trackRecord">
    <ul>
      <li v-for="(item,index) in dealOrderInfoDetails.demandList"
        :key="index" @click="getTrackDetails(index)">
        <p>{{ index + 1}}</p>
        <div class="product">
          <p>{{item.intention}}</p>
          <span>{{item.updateTime}}</span>
        </div>
        <span class="details">详情</span>
        <div class="right-icon">
          <img src="../../../assets/imgs/rightside.png" alt="">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuex, { mapMutations, mapState } from 'vuex'
import VueRouter from 'vue-router'

export default {
  data(){
    return{
    }
  },
  computed: {
    ...mapState({
      dealOrderInfoDetails: state => state.dealOrderInfoDetails.dealOrderInfoDetails
    })
  },
  methods:{
    //进入跟踪详情页面，传入demandId
    getTrackDetails(index) {
      let [id, query] = [this.$route.params.id, {
        demandId: this.dealOrderInfoDetails.demandList[index].demandId,
        product:this.dealOrderInfoDetails.demandList[index].intention
      }]
      // 如果路由中的params存在参数id，则表明由“我的客户”模块进入，需要传入recordForm参数，
      // 以供识别是否显示recordForm组件
      if (id) {
        query.recordForm = true
      }
      this.$router.push({
        path:'/trackDetails', 
        query: query
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.trackRecord{
  ul{
    li{
      background: #fff;
      margin-top: 2vw;
      height: 17.33vw;
      display: flex;
      align-items: center;
      padding: 0 4.66vw;
      p{
        color: #999;
        font-size: 4.53vw;
        flex: 0.1;
      }
      span{
        color: #909090;
        font-size: 3.73vw;
      }
      .product{
        display: flex;
        flex-direction: column;
        flex: 0.9;
        p{
          color: #363636;
        }
      }
      .right-icon{
        padding-left:2vw;
        img{
          width: 1.86vw;
          height: 3.06vw;
        }
        
        
      }
    }
  }
}
</style>
