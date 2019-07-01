<!--  -->
<template>
  <div class="check">
    <RecordHeader />
    <div v-for="(item, index) in bigCategoryList" :key="`bigCategoryList${index}`">
      <SubHeader
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
      bigCategoryList: [
        {
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
    changeStatus(index, status) {
      console.log(index, status)
    } 
  },
  mounted() {
    console.log('success', this.statusList)
  }
}
</script>
<style lang='scss' scoped>
.check {

}
</style>