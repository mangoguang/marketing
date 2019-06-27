<!--  -->
<template>
  <ul class="recordContent">
    <rec-conten 
                v-for="(item, index) in list" :key="item + index"
                @click.native="toCheckDetails(index)"/>
  </ul>
</template>

<script>
import RecConten from './content'
export default {
  components: {
    RecConten
  },
  data () {
    return {
      list: [1,2,3,4,5]
    };
  },
  methods: {
    toCheckDetails(index) {
      this.$router.push({
        name: 'itemDetails',
        params: {
          index: '123'
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>

</style>