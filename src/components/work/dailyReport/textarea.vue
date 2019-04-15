<template>
  <textarea @change="changeTextarea" :value="text" name="" id="" cols="30" rows="10"></textarea>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'textArea',
  props: ['text'],
  watch: {
    text() {
      console.log('successss111', this.text)
    }
  },
  methods: {
    changeTextarea(event) {
      this.$emit('changeTextarea', event.target.value)
    }
  }
}
</script>
<style lang="scss" scoped>
  textarea{
    display: block;
    width: 100%;
    height: 40vw;
    box-sizing: border-box;
    padding: 2vw;
    color: #666;
    font-size: 14px;
  }
</style>
