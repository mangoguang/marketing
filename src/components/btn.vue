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
  width: 100%;
  height: 13.1vw;
  background-color: #363636;
  border-radius: 1.3vw;
  font-family: "MicrosoftYaHei";
  font-size: 4.5vw;
  letter-spacing: 5px;
  color: #eff9fd;
  margin-top: 6vw;
  text-align: center;
  line-height: 13.1vw;
}
</style>
