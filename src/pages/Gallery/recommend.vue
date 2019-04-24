<template>
  <div class="r-index">
    <banner :title="'品牌介绍'"/>
    <div class="recommend" v-html="myhtml"></div>
  </div>
</template>

<script>
import {IndexModel} from '../../utils/index'
const indexModel = new IndexModel()
import banner from '../../components/banner'
import { b64DecodeUnicode, changeImgStyle, changeVedioStyle } from '../../utils/msManage'
export default {
  components: {banner},
  data() {
    return {
      myhtml: ''
    }
  },
  created() {
    this.getContent()
  },
  methods: {
    //获取富文本信息
    getContent() {
      let brand = this.$route.query.brand
      indexModel.brandIntroduce(brand).then(res => {
        let temp = res.data.introduce
        this.myhtml = changeImgStyle(b64DecodeUnicode(temp))
        this.myhtml = changeVedioStyle(this.myhtml)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.r-index {
  height: 100vh;
  width: 100vw;
  overflow: scroll;
}
.recommend {
  word-break: break-word !important;
  margin-top: 16vw;
  box-sizing: border-box;
}
</style>
