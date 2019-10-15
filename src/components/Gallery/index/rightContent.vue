<template>
  <div class="m-right"
       ref="classfiyScroll">
    <div class="pictureLink">
      <router-link :to='{name:"recommend",query: {brand: listVal}}'>
        <img v-lazy="imgUrl"
             alt=""
             :key="imgUrl">
      </router-link>
    </div>
    <m-slider class="m-slider"
              :list='imgSliderList'
              @click.native="goNext"
              :myClass='"tukuHome"' />
    <div class="classify">
      <ClassifyComp :type='dataList'
                    :auto='2000' />
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import MSlider from './slider'
import ClassifyComp from './classifyProduct'
import { IndexModel } from '../../../utils/index'
const indexModel = new IndexModel()
export default {
  components: { MSlider, ClassifyComp },
  computed: {
    ...mapState({
      listVal: state => state.leftNavList.listVal,
      classifyScroll: state => state.leftNavList.classifyScroll,
      classifyScrollList: state => state.leftNavList.classifyScrollList
    })
  },
  watch: {
    listVal() {
      this.getDiffList()
      this.getBrandIntroduce()
      this.getAdvert()
    }
  },
  created() {
    this.getBackList()
    this.getAdvert()
    this.getBrandIntroduce()
  },
  data() {
    return {
      imgUrl: '',
      imgSliderList: [],
      dataList: {
        name: '',
        list: []
      },
      key: false
    }
  },
  methods: {
    ...mapMutations([
      'setInitNavList',
      'setClassifyScrollList',
      'initClassifyScrollList',
      'initClassifyScroll',
      'getClassScroll',
      'setProductTabList'
    ]),
    // 获取滚动条高度
    recordScrollPosition(e) {
      if (e.target.scrollTop === 0) {
        return
      }
      let obj = {
        name: this.listVal,
        scroll: e.target.scrollTop
      }
      this.setClassifyScrollList(obj)
    },
    //监听滚动条高度
    listenScrollTop() {
      this.$refs.classfiyScroll.addEventListener(
        'scroll',
        this.recordScrollPosition,
        false
      )
      this.getClassScroll(this.listVal)
      this.$nextTick(() => {
        this.$refs.classfiyScroll.scrollTop = this.classifyScroll
      })
    },
    //获取热门分类
    getCategory() {
      indexModel.MusiCategory().then(res => {
        if (res.data) {
          this.dataList.list = res.data.list
          this.setInitNavList(res.data.list)

          res.data.list.map(item => {
            item.categoryName = item.name
          })
          this.setProductTabList(res.data.list)
        }
      })
    },
    //获取产品分类
    brandCategory() {
      let brand = this.listVal
      indexModel.brandCategory(brand).then(res => {
        if (res.data) {
          this.dataList.list = res.data.list
          res.data.list.map(item => (item.status = false))
          this.setProductTabList(res.data.list)
          this.listenScrollTop()
        }
      })
    },
    //不同分类的数据
    getDiffList() {
      if (this.listVal === '慕思') {
        this.getCategory()
        this.dataList.name = this.listVal
      } else {
        this.brandCategory()
        this.dataList.name = this.listVal
      }
    },
    //返回的时候获取数据
    getBackList() {
      this.listVal && this.getDiffList()
    },
    //获取广告轮播图
    getAdvert() {
      let brand = this.listVal
      indexModel.getAdvert(brand).then(res => {
        this.imgSliderList = res.data.list
      })
    },
    getBrandIntroduce() {
      let brand = this.listVal
      indexModel.brandIntroduce(brand).then(res => {
        if (res.data) {
          this.imgUrl = res.data.imgUrl
        } else {
          this.imgUrl = ''
        }
      })
    },
    //判断是外部链接还是内部id
    isHttps(url) {
      let result = url.indexOf('https') == '-1' ? 'id' : 'https'
      return result
    },
    //判断系统并打开外部链接
    judgeSystem(url) {
      // 判断操作系统
      if (api.systemType == 'android') {
        //Android中的使用方法如下：
        api.openApp(
          {
            androidPkg: 'android.intent.action.VIEW',
            mimeType: 'text/html',
            url: url
          },
          function(ret, err) {
            if (err) {
              alert('链接错误')
            }
          }
        )
      } else {
        //iOS中的使用方法如下：
        api.openApp(
          {
            iosUrl: url
          },
          function(ret, err) {
            if (err) {
              alert('链接错误')
            }
          }
        )
      }
    },
    //轮播图跳转到活动
    goNext(e) {
      let dom = e.target
      let className = dom.className.toLowerCase()
      if (className != 'mint-swipe-item is-active') {
        return false
      }
      let index = dom.getAttribute('data-type')
      if (this.imgSliderList && this.imgSliderList[index].url) {
        let url = this.imgSliderList[index].url
        let type = this.isHttps(url)
        if (type === 'id') {
          if (/^[0-9]+$/.test(url)) {
            this.$router.push({ path: '/productDetails', query: { id: url } })
          } else {
            alert('链接错误')
          }
        } else if (type === 'https') {
          this.judgeSystem(url)
        }
      } else {
        alert('没有相应的链接')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.m-right {
  height: 100vh;
  overflow: scroll;
  box-sizing: border-box;
  background: #fff;
  -webkit-overflow-scrolling: touch;
  .pictureLink {
    padding: 4.26vw;
    padding-bottom: 3vw;
    img {
      width: 70.13vw;
      height: 21.33vw;
      border-radius: 1.4vw;
    }
  }
  .m-slider {
    margin-left: 4vw;
    border-radius: 1.4vw;
  }
}
</style>


