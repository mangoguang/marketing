<template>
  <div class="recommend" v-html="myhtml">
  </div>
</template>

<script>
import {IndexModel} from '../../utils/index'
const indexModel = new IndexModel()
import { b64DecodeUnicode, changeImgStyle } from '../../utils/msManage'
export default {
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
      })
    }
  }
}
</script>