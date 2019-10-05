<template>
  <div class="preview">
    <preview-pic :imgList="imgList"
                 :imgIndex="this.$route.query.index"
                 @onDeleteImg="onDeleteImg"></preview-pic>
  </div>
</template>
<script>
import PreviewPic from '@/components/case/PreviewPic/Index'
import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    PreviewPic
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      goodCase: state => state.caseStore.goodCase
    }),
    imgList() {
      let pre = this.$route.query.pre
      let { goodCase } = this
      if (pre == 1) {
        let arr = [
          { src: goodCase.spareImgFile1, name: 'spareImgFile1' },
          { src: goodCase.spareImgFile2, name: 'spareImgFile2' },
          { src: goodCase.spareImgFile3, name: 'spareImgFile3' }
        ]
        return arr.filter(item => item.src)
      } else {
        let list = [
          { name: 'frontImgFile', src: goodCase.frontImgFile },
          { name: 'flankImgFile', src: goodCase.flankImgFile },
          { name: 'diagonalImgFile', src: goodCase.diagonalImgFile }
        ]
        return list.filter(item => item.src)
      }
    }
  },
  methods: {
    ...mapMutations(['setGoodCase']),
    onDeleteImg(val) {
      this.setGoodCase({ [val]: '' })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>