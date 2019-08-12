
<template>
  <div class="progress">
    <atest-header title="认证进度"
                  @onSearch="onSearch" />

    <div class="content">
      <atest-recordCard ref="recordCard" />
    </div>
  </div>
</template>

<script>
import AtestHeader from '@/components/4s/starAtest/AtestHeader'
import AtestRecordCard from '@/components/4s/starAtest/AtestRecordCard'
import { parseTime, geMonthLastDay } from '@/utils/tools.js'
export default {
  components: {
    AtestHeader,
    AtestRecordCard

  },
  methods: {
    //搜索
    onSearch (searchVal) {
      let params = {
        page: 1,
        limit: 10,
        starLevel: 1,
        // status: 1,
        startDate: parseTime(new Date(), '{y}-{m}') + '-01',
        endDate: parseTime(geMonthLastDay(), '{y}-{m}-{d}'),
        sort: 'desc',
        key: searchVal
      }
      this.$refs.recordCard._initData(params)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding-top: 89.5px;
}
</style>
