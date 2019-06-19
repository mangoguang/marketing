<template>
  <li>
    <strong>{{number}}</strong>
    <h5>{{title}}</h5>
  </li>
</template>

<script>
export default {
  name: 'dailyLi',
  props: ['number', 'title']
}
</script>

<style lang="scss" scoped>
  li{
    width: 20vw;
    color: #666;
    text-align: center;
    padding: 5.33vw 1vw;
    strong{
      font-size: 18px;
      line-height: 1em;
    }
    h5{
      font-weight: 300;
      font-size: 12px;
      line-height: 1.2em;
      margin-top: 2.66vw;
    }
  }
</style>

