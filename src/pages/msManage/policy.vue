<template>
  <div class="policy">
    <banner :title="title"/>
    <!-- list为传入参数，getparmas为组件点击得到的选项-->
    <div class='treeList'>
      <treeList :getParmas='getParmas' :getStatus='getStatus'/>
    </div>
    <listComp :class="listComp"/>
  </div>
</template>

<script>
import {mapMutations,mapState} from 'vuex'
import treeList from '../../components/msManage/service/eggTreeListComp'
import listComp from '../../components/msManage/service/eggListComp'
import banner from '../../components/banner'
export default {
  components:{ treeList,listComp,banner },
  data() {
    return {
      listComp: 'listComp',
      title: ''
    }
  },
  computed: {
    ...mapState({
      list: state => state.treeList.list
    })
  },
  created() {
    // this.getCategoriesList()
    this.initParmas()
    this.initTitile()
    this.initTop()
  },
  methods: {
    ...mapMutations(['setParmas']),
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