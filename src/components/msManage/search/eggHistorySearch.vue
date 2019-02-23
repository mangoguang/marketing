<template>
  <div class="eggHistorySearch">
    <div class="title">
      <span>历史搜索</span>
      <button @click="emptyHisList">清除</button>
    </div>
    <ul>
      <li v-for="(item, index) in list" :key="index">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        '床架',
        '床架床架',
        '床架12',
        '床架',
        '床架',
        '床架',
        '床架',
        '床架'
      ]
    }
  },
  methods: {
    emptyHisList() {
      this.list = []
    },
    matchWord(word) {
      
    }
  }
}
</script>

<style lang="scss" scoped>
.eggHistorySearch {
  padding: 4.4vw;
  .title {
    display: flex;
    justify-content: space-between;
    color: #363636;
    font-size: 3.4vw;
    margin-bottom: 2.8vw;
    button {
      color: #007aff;
      font-size: 3.2vw;
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      background: #f8f8f8;
      padding:0 4vw;
      color: #666;
      font-size: 3.46vw;
      line-height: 8vw;
      margin-right: 2vw;
      margin-bottom: 2vw;
      border-radius: 0.53vw;
    }
  }
}
</style>

