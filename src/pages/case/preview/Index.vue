<template>
  <div class="preview">
    <preview-pic @onDeleteImg="onDeleteImg"></preview-pic>
  </div>
</template>
<script>
import PreviewPic from '@/components/case/PreviewPic/Index'
export default {
  components: {
    PreviewPic
  },
  data() {
    return {}
  },
  methods: {
    onDeleteImg(val) {
      console.log(val)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>