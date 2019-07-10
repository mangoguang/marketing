<!--  -->
<template>
  <div class="check">
    <RecordHeader :title="'店面SI标准一阶段'" />
    <div class="contentBox">
      <div
      v-for="(item, index) in bigCategoryList"
      :key="`bigCategoryList${index}`"
      :class="{paddingTop10: index === 0}"
      >
        <SubHeader
        class="firstTitle"
        v-if="index === 0"
        :text="item.title"
        :totalPoints="total.totalPoints"
        :deductMarks="total.deductMarks"
        />
        <CheckTitle
        v-else
        :title="item.title"
        :index="index"
        @changeStatus="changeStatus"
        />
        <CheckContent
        :list="item.checkList"
        :status="statusList[index]"
        />
      </div>
      <!-- 底部按钮 -->
      <div class="btnBot">
        <button @click="reset" :class="{on: !btnBotStatus}">重置</button>
        <button @click="submit" :class="{on: btnBotStatus}">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import RecordHeader from '../../../components/4s/record/header'
import SubHeader from '../../../components/4s/starCheck/subHeader'
import CheckContent from '../../../components/4s/starCheck/checkContent'
import CheckTitle from '../../../components/4s/starCheck/checkTitle'
export default {
  components : {
    RecordHeader,
    SubHeader,
    CheckContent,
    CheckTitle
  },
  data () {
    return {
      total: {
        totalPoints: 23,
        deductMarks: 9
      },
      btnBotStatus: true,
      bigCategoryList: [
        {
          status: true,
          title: 'SI/VI应用规范及维护',
          checkList: [
            {
              text: '店面',
              status: true
            }, {
              text: '店面面积',
              status: true
            }, {
              text: '店面类型',
              status: false
            }, {
              text: '装修时间/到期时间',
              status: false
            }
          ]
        }, {
          status: false,
          title: 'SI/VI检查',
          checkList: [
            {
              text: '店面',
              status: true
            }, {
              text: '店面面积',
              status: true
            }, {
              text: '店面类型',
              status: false
            }, {
              text: '装修时间/到期时间',
              status: false
            }
          ]
        }, {
          status: false,
          title: '形象检查',
          checkList: [
            {
              text: '店面',
              status: true
            }, {
              text: '店面面积',
              status: true
            }, {
              text: '店面类型',
              status: false
            }, {
              text: '装修时间/到期时间',
              status: false
            }
          ]
        }
      ]
    }
  },
  computed: {
    statusList() {
      return this.bigCategoryList.map((item) => {
        return item.status
      })
    }
  },
  methods: {
    // 控制评分细则的显示/隐藏
    changeStatus(index, status) {
      this.bigCategoryList[index].status = status
    },
    // 重置表单
    reset() {
      this.btnBotStatus = false
    },
    // 提交表单
    submit() {
      this.btnBotStatus = true
    }
  },
  mounted() {
    console.log('success', this.statusList)
  }
}
</script>
<style lang='scss' scoped>
.check {
  .contentBox{
    position: relative;
    padding-top: 46vw;
    padding-bottom: 13.34vw;
    box-sizing: border-box;
    min-height: 100vh;
  }
  .btnBot{
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    align-self: flex-end;
    height: 13.34vw;
    display: flex;
    button{
      width: 50%;
      box-sizing: border-box;
      border: 1px solid #007AFF;
      background: #fff;
      font-size: 16px;
      color: #007AFF;
    }
    button.on{
      background: #007AFF;
      color: #fff;
    }
  }
}
</style>