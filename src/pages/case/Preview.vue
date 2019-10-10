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
      goodCase: state => state.caseStore.goodCase,
      alterUploadImg: state => state.caseStore.alterUploadImg
    }),
    imgList() {
      let pre = this.$route.query.pre
      let { alterUploadImg } = this
      if (pre == 1) {
        let arr = [
          { src: alterUploadImg.spareImgFile1, name: 'spareImgFile1' },
          { src: alterUploadImg.spareImgFile2, name: 'spareImgFile2' }
        ]
        return arr.filter(item => item.src)
      } else {
        let list = [
          { name: 'frontImgFile', src: alterUploadImg.frontImgFile },
          { name: 'flankImgFile', src: alterUploadImg.flankImgFile },
          { name: 'diagonalImgFile', src: alterUploadImg.diagonalImgFile }
        ]
        return list.filter(item => item.src)
      }
    }
  },
  methods: {
    ...mapMutations(['setGoodCase', 'setAlterUploadImg']),
    onDeleteImg(val) {
      this.setGoodCase({ [val]: '' })
      this.setAlterUploadImg({ [val]: '' })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>