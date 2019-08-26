<template>
  <li class="category">
    <div class="icon" :style="{background: color}">
      <!-- <img src="../../../assets/imgs/ms-policy.png" alt=""> -->
      <img v-lazy="list.image" alt="" :key="list.image">
    </div>
    <div class="text">
      <p>{{ list.name }}</p>
    </div>
  </li>
</template>

<script>
export default {
  props: ['list', 'bgColor'],
  data() {
    return {
      color: ''
    }
  },
  mounted() {
    this.color = this.list && this.list.image? '' : this.bgColor
  }
}
</script>

<style lang="scss">
.category {
  //width: 25%;
  margin-right: 7.466vw;
  .icon {
    width: 16vw;
    height: 16vw;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .text {
    color: #666;
    font-size: 3.73vw;
    text-align: center;
    word-wrap: break-word;
    line-height: 1.4em;
    margin-top: 2vw;
    white-space: nowrap;
  }
}
.category:last-child{
  padding-right: 7.466vw;
}
</style>
