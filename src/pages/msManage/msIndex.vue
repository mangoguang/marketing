<template>
  <div class="index">
    <Search :origin="origin" :type='"msIndex"'/>
    <yan-circle-list :link="link"/>
    <!-- <egg-scan /> -->
    <!-- <egg-share /> -->
    <div class="entry">
      <router-link to="/gallery">
        <img src="../../assets/imgs/picentry.png" alt>
      </router-link>
      <span style="color: #666">营销助手图库</span>
    </div>
    <Footer/>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import eggShare from "../../components/myApi/eggShare";
import eggScan from "../../components/myApi/eggScan";
import { IndexModel } from "../../utils/index";
const indexModel = new IndexModel();
import yanCircleList from "../../components/msManage/yanCircleList";
import Footer from "../../components/Footer";
import Search from "../../components/msManage/search/eggSearchInp";
export default {
  components: { yanCircleList, Footer, Search, eggShare, eggScan },
  data() {
    return {
      link: [],
      origin: true
    };
  },
  created() {
    this.getData();
    //图库的进入默认热门搜索
    this.setLeftNavList([])
    this.initListVal('慕思')
  },
  methods: {
    ...mapMutations(['setLeftNavList', 'initListVal']),
    //获取首页一级列表接口
    getData() {
      indexModel.getCategory1List()
        .then(res => {
          this.link = this.getNewArr(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取新数组 （添加路径/颜色）
    getNewArr(arr) {
      arr.map((item, index) => {
        if (item.name == "服务政策") {
          item.link = "/policy";
          item.bgColor = "#FF2D55";
          item.iconUrl = "./static/images/ms-policy.png";
        } else if (item.name == "金管家服务") {
          item.link = "/policy";
          item.bgColor = "#FFCC00";
          item.iconUrl = "./static/images/ms-service.png";
        }
      });
      let story = {
        name: "英雄故事",
        link: "/story",
        bgColor: "#FF964B",
        id: "3",
        iconUrl: "./static/images/ms-story.png"
      };
      let question = {
        name: "常见问题",
        link: "/question",
        bgColor: "#007AFF",
        id: "4",
        iconUrl: "./static/images/ms-question.png"
      };
      return [...arr, story, question];
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
  height: 100vh;
  overflow: scroll;
}
.entry {
  padding: 4vw;
  box-sizing: border-box;
  img {
    background: rgba(255, 45, 85, 1);
    width: 20vw;
    height: 20vw;
    display: block;
    border-radius: 2vw;
  }
}
</style>