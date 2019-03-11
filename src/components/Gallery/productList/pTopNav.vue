<template>
  <div class="p-topNav">
    <ul >
      <li class="active">
        <span>床</span>
        <div class="dotted"></div>
      </li>
      <li>床垫</li>
      <li>床垫</li>
      <li>床垫</li>
      <li>床垫</li>
      <li>床垫</li>
      <li>床垫</li>
      <li>床垫</li>
      <li>床垫</li>
      <li>床垫</li>
    </ul>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.p-topNav {
  overflow-x: hidden;
  position: relative;
  ul {
    width: 100vw;
    line-height: 10.66vw;
    background: #e2effd;
    overflow-x: auto;
    display: flex;
    white-space: nowrap;
    li {
      padding-left: 5.33vw;
      color: #8eaccc;
      font-size: 3.4vw;
      .dotted {
        width: 3vw;
        height: 3vw;
        border-radius: 50%;
        background: #007aff;
        transform: scale(0.4);
        margin-top: -2vw;
      }
    }
    .active {
      color: #363636;
      font-weight: bold;
      font-size: 3.4vw;
    }
  }
}
</style>

