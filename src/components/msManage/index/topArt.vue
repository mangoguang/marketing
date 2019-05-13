<template>
  <div class="topArt">
    <div class="title">
      <h1>热门推荐</h1>
    </div>
    <ul>
      <li v-for="(item, index) in list" :key="index" @click.prevent="toArticle(index)" >
          <div class="list_left">
            <h1>{{item.title}}</h1>
            <div class="list_bottom">
              <!-- <span class="top">置顶</span> -->
              <span class="time">{{item.createTime}}</span>
            </div>
          </div>
          <div class="list_right">
            <img :src=" item.image" alt="" class="img">
          </div>
        </li>
      </ul>
  </div>
</template>

<script>
import { IndexModel } from "../../../utils/index";
const indexModel = new IndexModel();
export default {
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    toArticle(index) {
      this.$router.push({
        path: '/articleDetails',
        query:{articleId: this.list[index].id}
      })
    },
    getData() {
      let account = this._localAjax().account
      let classify = this.$route.query.classify
      indexModel.getTopArt(account, classify).then(res => {
        if(res.data) {
          this.list = res.data
        }
      })
    }
  }
  
}
</script>

<style lang="scss" scoped>
.topArt {
  width: 100vw;
  // margin-bottom: 20vw;
  .title {
    width: 26.66vw;
    // margin: 0 auto;
    margin-left: 2vw;
    h1 {
      color: #363636;
      font-size: 4.8vw;
      font-weight: bold;
      border-bottom: .53vw solid #363636;
      text-align: center;
    }
  }
  ul {
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
        flex: 0.8;
        height: 20.66vw;
        display: flex;
        flex-direction: column;
        align-content: space-between;
        h1 {
          color: #363636;
          font-size: 4.8vw;
          //font-weight: bold;
          flex: 0.8;
          line-height: 1.5em;
        }
        .list_bottom {
          flex: 0.2;
          font-size: 3.73vw;
          .top {
            color: #ff2d55;
          }
          .time {
            color: #909090;
          }
        }
      }
      .list_right {
        flex: 0.25;
        width: 21.33vw;
        height: 21.33vw;
        border:1px solid rgba(225,225,225,1);
        .img {
          width: 21.33vw;
          height: 21.33vw;
        }
      }
    }
  }
}
</style>

