<template>
  <div class="index">
    <Search :origin='origin' :type='"msIndex"'/>
    <yan-circle-list :link="link"/>
    <Footer />
  </div>
</template>

<script>
import {IndexModel} from '../../utils/index'
const indexModel = new IndexModel()
import yanCircleList from "../../components/msManage/yanCircleList"
import Footer from '../../components/Footer'
import Search from '../../components/msManage/search/eggSearchInp'
export default {
  components: {yanCircleList, Footer, Search},
  data() {
    return {
      link: [],
      origin: true
    }
  },
  created() {
    this.getData()
    this.test()
  },
  methods: {
    test() {
      indexModel.test().then(res => {
        console.log(123,res)
      })
    },
  //获取首页一级列表接口
   getData() {
      indexModel.getCategory1List().then(res => {
        this.link = this.getNewArr(res.data)
      }).catch(err => {
        console.log(err)
      })
   },
   //获取新数组 （添加路径/颜色）
   getNewArr(arr) {
     arr.map((item, index) => {
      if(item.name == '服务政策') {
        item.link = '/policy'
        item.bgColor = '#FF2D55'
      }else if(item.name == '英雄故事') {
        item.link = '/story'
        item.bgColor = '#FF964B'
      }else if(item.name == '金管家服务') {
        item.link = '/policy'
        item.bgColor = '#FFCC00'
      }else if(item.name == '常见问题') {
        item.link = '/question'
        item.bgColor = '#007AFF'
      }
    })
    return arr
   }
  }
}
</script>

<style lang="scss" scoped>

</style>