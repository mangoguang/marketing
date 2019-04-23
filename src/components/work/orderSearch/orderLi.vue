<template>
  <li class="orderLi">
    <p>{{obj.username}}</p>
    <p>{{obj.demandTime}}</p>
    <p>{{obj.status}}</p>
  </li>
</template>

<script>
export default {
  name: 'orderLi',
  props: ['obj'],
  components: {
    
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .orderLi{
    display: flex;
    justify-content: space-between;
    p{
      flex: 1;
      color: #666;
      text-align: center;
      font-size: 16px;
      line-height: 3em;
      border-bottom: 1px solid #f1f1f1;
    }
    p:first-child{
      text-align: left;
    }
    p:last-child{
      text-align: right;
    }
  }
</style>

