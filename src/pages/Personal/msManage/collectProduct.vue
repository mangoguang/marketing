<template>
  <div class="collect">
    <SwipeDelete v-for="(item, index) in list" :key="index" 
      :list="item" 
      :index="index"
      :cancleCollect='cancleCollect'/>
  </div>
</template>

<script>
import SwipeDelete from "../../../components/Gallery/collect/index";
import { IndexModel } from "../../../utils/index";
const indexModel = new IndexModel();
export default {
  components: { SwipeDelete },
  data() {
    return {
      list: [],
      ajaxData: {},
      newList: []
    };
  },
  created() {
    let ajaxData = localStorage.getItem("ajaxData");
    this.ajaxData = JSON.parse(ajaxData);
    this.getData(1);
  },
  methods: {
    getData(page) {
      let obj = {
        type: 3,
        account: this.ajaxData.account,
        page: page,
        limit: 10
      };
      indexModel.getCollect(obj).then(res => {
        if (res.data) {
          this.list = res.data;
        }
      });
    },
    cancleCollect(val) {
      this.list.splice(val, 1)
    }
  }
};
</script>

