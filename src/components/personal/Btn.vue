<template>
  <div class="btn">
    {{text}}
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  props:['text']
}
</script>

<style lang="scss" scoped>
.btn{
  width: 84.26vw;
  height: 13.73vw;
  background-color: #007AFF;
  border-radius: 0.53vw;
  font-family: "MicrosoftYaHei";
  font-size: 4.8vw;
  letter-spacing: 0.66vw;
  color: #eff9fd;
  text-align: center;
  line-height: 13.73vw;
  margin: auto;
}
</style>
