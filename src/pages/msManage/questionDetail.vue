<template>
  <div class="question">
    <banner :title="'常见问题'"/>
    <div class="content">
      <div class="title">
        <h1>{{questionData.title}}</h1>
        <eggCollectBtn class="collectBtn"
          :isCollect='isCollect' 
          @click.native="collect"/>
      </div>
      <p>{{questionData.detail}}</p>
    </div>
  </div>
</template>

<script>
import banner from '../../components/banner'
import eggCollectBtn from '../../components/msManage/eggCollectBtn'
import Vuex, { mapMutations, mapState } from 'vuex'
export default {
  components: { banner, eggCollectBtn },
  data() {
    return {
      questionData: {},
      isCollect: true
    }
  },
  computed: {
    ...mapState({
     
    })
  },
  created() {
    console.log(this.$route.query.questionId)
    let id = this.$route.query.questionId
    this.getData(id)
     //获取收藏列表常见问题路由"/collectList"传过来的常见问题questionId
    // console.log(this.$route.params.questionId);
  },
  methods: {
    getData(id) {
      // axios获取问题详情内容

      this.questionData = {
        title: '床垫除螨哪种工具?除螨哪',  //  问题标题
        detail: '除螨用*************除螨用除螨用123231除螨用除螨用123231',  //  问题解答内容
        questionId: '20190220123'  //  问题id
      }
    },
    collect() {
      //axios 收藏/移除收藏
      this.isCollect = !this.isCollect
    }
  }
}
</script>

<style lang="scss" scoped>
.question {
  .content {
    padding-top: 16vw;
    background:#fff;
    box-shadow:0px 2px 6px 0px rgba(136,136,136,0.2);
    .title {
      border-bottom: 1px solid #e1e1e1;
      padding-right:4.25vw;
      margin-left: 4.25vw;
      box-sizing: border-box;
      position: relative;
      h1 {
        white-space:pre-wrap;
        color: #363636;
        font-size: 4.8vw;
        padding-top: 3vw;
        padding-bottom: 3vw;
        width: 76%;
      }
      .collectBtn {
        position: absolute;
        top: 3vw;
        right: 4.25vw;
      }
    }
    p {
      white-space:pre-wrap;
      padding:0 4.25vw;
      color: #666;
      padding-top: 2vw;
      padding-bottom: 4vw;
    }
  }
}
</style>
