
<template>
  <ul>
    <DailyLi
    v-for="(item, index) in list"
    :key="`dailyUl${index}`"
    :number="item.number"
    :title="item.title" />
  </ul>
</template>

<script>
import DailyLi from './dailyLi'
export default {
  name: 'dailyUl',
  props: ['number', 'title', 'list'],
  components: {DailyLi},
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  ul{
    display: flex;
    justify-content: space-between;
    flex-direction: flex-start;
    flex-wrap: wrap;
  }
</style>

