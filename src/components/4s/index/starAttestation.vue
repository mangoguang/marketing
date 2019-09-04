<!--  -->
<template>
  <div>
    <ContentBox class="wrapper"
                :title="'星级认证'">
      <div class="iconBox-wrapper">
        <div class="icon-box">
          <iconBox v-for="item in comListData"
                   :key="item.text"
                   :type="'gradeReport'"
                   :iconData="item"
                   @click.native="handleClick(item.link)" />
        </div>
      </div>

    </ContentBox>
  </div>
</template>

<script>
import ContentBox from './contentBox'
import IconBox from './iconBox'
export default {
  components: {
    ContentBox,
    IconBox
  },
  data () {
    return {
      iconList: [
        {
          icon: './static/images/4s/atest.png',
          bgIcon: './static/images/4s/starCheck.png',
          text: '星级认证',
          link: 'starAtest'
        },
        {
          icon: './static/images/4s/star_re.png',
          bgIcon: './static/images/4s/starResult.png',
          text: '认证进度',
          link: 'ApplyRecord'
        }
      ],
      certPositionType: localStorage.getItem('supervisor')

    };
  },
  computed: {
    comListData () {
      if (localStorage.getItem('certPositionType') == 'supervisor') {
        this.iconList.splice(0, 1)
        return this.iconList
      } else {
        return this.iconList
      }
    }
  },
  methods: {
    handleClick (linkName) {
      this.$router.push({
        name: linkName
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.wrapper {
  margin: 0 auto;
  margin: 4.4vw;
  .iconBox-wrapper {
    width: 100%;
    box-sizing: border-box;
  }
  .icon-box {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
}
</style>