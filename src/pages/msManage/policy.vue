<template>
  <div class="policy">
    <banner :title="title"/>
    <!-- list为传入参数，getparmas为组件点击得到的选项-->
    <div class='treeList'>
      <treeList :list='list' :getParmas='getParmas' :getStatus='getStatus'/>
    </div>
    <listComp :class="listComp"/>
  </div>
</template>

<script>
import {IndexModel} from '../../utils/index'
const indexModel = new IndexModel()
import {mapMutations} from 'vuex'
import treeList from '../../components/msManage/service/eggTreeListComp'
import listComp from '../../components/msManage/service/eggListComp'
import banner from '../../components/banner'
export default {
  components:{ treeList,listComp,banner },
  data() {
    return {
      listComp: 'listComp',
      list: [
        {
          name: "订单管理",  
          categoryId: "orderManage",
          child: 
        [{
          name: "已完成订单", 
          categoryId: "finishOrder"
        },
        {
          name: "未完成订单", 
          categoryId: "unfinishOrder"
        }]
        },
        {
          name: "仓储物流",  
          categoryId: "storage"
        },
        {
          name: "配送安装",  
          categoryId: "send",
          child: 
        [{
          name: "已完成订单", 
          categoryId: "finishOrder"
        },
        {
          name: "未完成订单", 
          categoryId: "unfinishOrder"
        }]
        },
        {
          name: "售后处理",  
        categoryId: "sellout"
        },
        {
          name: "增值服务",  
          categoryId: "service"
        }
      ],
      title: ''
    }
  },
  created() {
    // this.getCategoriesList()
    this.initParmas()
    this.initTitile()
    this.initTop()
  },
  methods: {
    ...mapMutations(['setParmas']),
    //获取分类列表
    getCategoriesList() {
      const type = 'article'
      const categoryId = this.$route.query.categoryId
      indexModel.getCategories().then(res => {
        this.list = res.data
        // console.log(123,this.list)
        this.initTop()
      })
    },
    //判断传进来的一级参数
    initTitile() {
      this.title = this.$route.query.name
    },
    //初始化列表的active状态
    initParmas() {
      if(this.$route.query.type === 1) {    //type从acticle传回来变成字符串1
        this.setParmas({})
      }
    },
    //获取每一级的参数name
    getParmas(val) {
      this.setParmas(val)
      console.log(val)
    },
    //获取子级状态设置css
    getStatus(val) {
      if(!val) {
        this.listComp = 'listComp1'
      }else {
        this.listComp = 'listComp'
      }
    },
    //初始化列表的高度设置css
    initTop() {
      if(this.list.length) {
         if(this.list[0].child) {
        this.listComp = 'listComp'
        }else if(!this.list[0].child) {
          this.listComp = 'listComp1'
        }
      }else {
        this.listComp = 'listComp0'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.policy {
  position: relative;
  .treeList {
    padding-top: 16vw;
  }
  .listComp {
    position: absolute;
    top: 40vw;
    left: 0;
  }
   .listComp1 {
    position: absolute;
    top: 28vw;
    left: 0;
  }
   .listComp0 {
    position: absolute;
    top: 18vw;
    left: 0;
  }
}
</style>