<template>
  <div class="index">
    <yan-circle-list :link="link"/>
    <Footer />
  </div>
</template>

<script>
import yanCircleList from "../../components/msManage/yanCircleList"
import Footer from '../../components/Footer'
export default {
  components: {yanCircleList, Footer},
  data() {
    return {
      title:'金管家首页',
      link:[
        {
          link:'/policy',//路由
          imgUrl:('./static/images/ms-policy.png'),//图片
          name:'服务政策',//名称
          bgColor:'#FF2D55'//背景颜色,
        },
        {
          link:'/story',
          imgUrl:('./static/images/ms-story.png'),//图片
          name:'英雄故事',
          bgColor:'#FF964B'
        },
        {
          link:'/service',
          imgUrl:('./static/images/ms-service.png'),//图片
          name:'金管家服务',
          bgColor:'#FFCC00'
        },
        {
          link:'/question',
          imgUrl:('./static/images/ms-question.png'),//图片
          name:'常见问题',
          bgColor:'#007AFF'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
}
</style>