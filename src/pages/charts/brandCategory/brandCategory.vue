<template>
  <div>
    <v-touch v-on:swiperight="swiperright">
      <mybanner :title="title" />
      <myselect />
    </v-touch>
  </div>
</template>

<script>
import mybanner from "../../../components/banner";
import myselect from "../../../components/charts/select";
export default {
  data() {
    return {
      title: "品牌品类报表"
    };
  },
  components: {
    mybanner,
    myselect
  },
  methods: {
    // 右侧滑动
    swiperright() {
      this.$router.push({ path: "/ReportForms" });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>