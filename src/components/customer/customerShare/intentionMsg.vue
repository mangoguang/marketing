<template>
  <div class="intentionMsg">
    <ul>
      <intentionLi 
        v-for="(item, index) in list" :key="index" 
        :list='item' 
        @clicl.native='toIntentionDetails(index)'/>
    </ul>
    <button @click="newCustomer" class="new"></button>
  </div>
</template>

<script>
import intentionLi from './intentionLi'
export default {
  props: ['list'],
  components: { intentionLi },
  methods: {
    toIntentionDetails(index) {
      this.$router.push({
        path: '/',
        id: this.list[index].oppId
      })
    },
    newCustomer() {
      this.$route.push({path:'/'})
    }
  }
}
</script>

<style lang="scss" scoped>
.intentionMsg {
  margin-top: 4vw;
}
</style>
