<template>
  <div class="policy paddingTop">
    <banner :title="title"/>
    <!-- list为传入参数，getparmas为组件点击得到的选项-->
    <div class='treeList'>
      <treeList :style="{'paddingTop':`${paddingTop}vw`}"
        :getParmas='getParmas' 
        :getStatus='getStatus'/>
    </div>
    <listComp :class="listComp"/>
  </div>
</template>

<script>
import {mapMutations,mapState} from 'vuex'
import treeList from '../../components/msManage/service/eggTreeListComp'
import listComp from '../../components/msManage/service/eggListComp'
import banner from '../../components/banner'
import {isIPhoneX} from '../../utils/msManage'
export default {
  components:{ treeList,listComp,banner },
  data() {
    return {
      listComp: 'listComp',
      title: '',
      paddingTop: ''
    }
  },
  computed: {
    ...mapState({
      list: state => state.treeList.list,
      parmas: state => state.treeList.parmas
    })
  },
  watch: {
    parmas() {
      this.init()
    },
    list() {
      this.initTop()
    }
  },
  created() {
    // this.getCategoriesList()
    this.initParmas()
    this.initTitile()
    this.isIPhoneX()
  },
  mounted() {
    // this.initTop()
    this.init()
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
        if(this.list[0].subCateList) {
        this.listComp = 'listComp'
        }else if(!this.list[0].subCateList) {
          this.listComp = 'listComp1'
        }
      }
    },
    init() {
      if(!this.parmas.name1) {
        this.listComp = 'listComp0'
      }
    },
    isIPhoneX (){
      let phone = this.phoneSize()
      if(phone === 'iphonex') {
        this.paddingTop = '22'
      }else if(phone === 'iphone') {
        this.paddingTop = '16'
      }else {
        this.paddingTop = '16'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.policy {
  position: relative;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  // margin-bottom: 10vw;
  .treeList {
    padding-top: 16vw;
  }
  .listComp {
    position: absolute;
    top: 44vw;
    left: 0;
  }
   .listComp1 {
    position: absolute;
    top: 30vw;
    left: 0;
  }
   .listComp0 {
    position: absolute;
    top: 16vw;
    left: 0;
  }
}
</style>