<template>
  <div class="index">
    <Search :origin='origin'/>
    <yan-circle-list :link="link"/>
    <Footer />
  </div>
</template>

<script>
import yanCircleList from "../../components/msManage/yanCircleList"
import Footer from '../../components/Footer'
import Search from '../../components/msManage/search/eggSearchInp'
export default {
  components: {yanCircleList, Footer, Search},
  data() {
    return {
      link:[
        {
          link:'/policy',//路由
          imgUrl:('./static/images/ms-policy.png'),//图片
          name:'服务政策',//名称
          bgColor:'#FF2D55',//背景颜色,
          category1id: 'servicePolicy'
        },
        {
          link:'/story',
          imgUrl:('./static/images/ms-story.png'),//图片
          name:'英雄故事',
          bgColor:'#FF964B',
          category1id: 'story'
        },
        {
          link:'/policy',
          imgUrl:('./static/images/ms-service.png'),//图片
          name:'金管家服务',
          bgColor:'#FFCC00',
          category1id: 'serviceMsmanege'
        },
        {
          link:'/question',
          imgUrl:('./static/images/ms-question.png'),//图片
          name:'常见问题',
          bgColor:'#007AFF',
          category1id: 'question'
        }
      ],
      origin: true
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
}
</style>