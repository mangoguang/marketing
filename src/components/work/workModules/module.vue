<template>
  <li class="module">
    <div></div>
    <h3>{{obj.title}}</h3>
  </li>
</template>

<script>
export default {
  name: 'module',
  props: ['obj'],
  data() {
    return{

    }
  },
  mounted(){

  },
  created(){

  },
  methods:{
    
  }
}
</script>

<style lang="scss" scoped>
  .module{
    width: 20vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    div{
      width: 13.3vw;
      height: 13.3vw;
      background: #dfdfdf;
    }
    h3{
      font-size: 14px;
      color: #363636;
    }
  }
</style>

