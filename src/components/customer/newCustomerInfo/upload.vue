<template>
  <div class="upload">
    <h1>附件图片</h1>
    <ul class="load_box">
      <li style="border: 1px dotted #e1e1e1"
        v-for="(item, index) in list" :key="index">
        <img src="../../../assets/imgs/upload.png" alt="">
        <p>添加图片</p>
      </li>
      <div class="count">
        <span>{{ count }}</span><span>/5</span>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      list: [{
        imgUrl: '',
        name: ''
      },{
        imgUrl: '',
        name: ''
      },{
        imgUrl: '',
        name: ''
      },{
        imgUrl: '',
        name: ''
      },{
        imgUrl: '',
        name: ''
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.upload {
  box-sizing: border-box;
  padding: 4vw;
  h1 {
    font-size: 4vw;
    color: #363636;
    font-weight: normal;
  }
  .load_box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;;
    li {
      width: 20vw;
      height: 20vw;
      border-radius: 1.06vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 2vw;
      margin-bottom: 4vw;
    }
    img {
      width: 5.33vw;
      height: 5.33vw;
      margin-top: 5vw;
    }
    p {
      color: #909090;
      font-size: 2.4vw;
    }
  }
  .count {
    color: #909090;
    font-size: 2.4vw;
    margin-top: 8vw;
  }
}
</style>

