<template>
  <div class="listComp">
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <div class="list_left">
          <h1>{{item.title}}</h1>
          <div>
            <span v-if="item.top">置顶</span>
            <span>{{item.time}}</span>
          </div>
        </div>
        <div class="list_right">
          <img src="" alt="">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          title: '慕思产品三包服务政策详解',  //  文章标题
          time: '2019-02-20',  //  文章上传时间
          imgUrl: '../img.jpg',  //  文章缩略图
          articleId: '201902201234',  //  文章id
          top: true/false  //  是否置顶文章
        },
        {
          title: '慕思产品三包服务政策详解',  //  文章标题
          time: '2019-02-20',  //  文章上传时间
          imgUrl: '../img.jpg',  //  文章缩略图
          articleId: '201902201234',  //  文章id
          top: true/false  //  是否置顶文章
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.listComp {
  li {
    width: 100vw;
    height: 26.66vw;
    box-shadow:0px 2px 6px 0px rgba(136,136,136,0.2);
    padding: 4.4vw;
    box-sizing: border-box;
    margin-bottom: 2.4vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .list_left {
      h1 {
        color: #363636;
        font-size: 5.4vw;
        font-weight: bold;
      }
    }
    .list_right {
        width: 21.33vw;
        height: 21.33vw;
        border:1px solid rgba(225,225,225,1);
        background:linear-gradient(30deg,rgba(60,182,238,1) 0%,rgba(125,226,255,1) 100%);
    }
  }
  
}
</style>

