let getWeekDate = function() {
  let date = new Date()
  let [year, month, nowDay, weekDay] = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getDay()]
  let [startYear, endYear, startMonth, endMonth] = [year, year, month, month]
  let curMonthEndDay = new Date(year, month, 0).getDate()
  let [startDay, endDay] = []
  // 判断本周第一天日期
  if (nowDay > weekDay) {
    startDay = nowDay - weekDay + 1
  } else if (nowDay === weekDay && nowDay === 1) {
    startDay = nowDay
  } else {
    if (month > 1) {
      startDay = new Date(year, month, 0).getDate() - (weekDay - nowDay - 1)
    } else {
      startMonth = 12
      startYear = year - 1
      startDay = new Date(year, month, 0).getDate() - (weekDay - nowDay - 1)
    }
  }
  // 判断本周最后一天日期
  if (nowDay < curMonthEndDay - (7 - weekDay)) {
    endDay = nowDay + 7 - weekDay
  } else if (nowDay === curMonthEndDay - (7 - weekDay)) {
    endDay = nowDay
  } else {
    if (month < 12) {
      endDay = nowDay + (7 - weekDay) - new Date(year, month, 0).getDate()
    } else {
      endYear = year + 1
      endMonth = 1
      endDay = nowDay + (7 - weekDay) - new Date(year, month, 0).getDate()
    }
  }
  return {
    startDate: `${startYear}-${startMonth}-${startDay}`,
    endDate: `${endYear}-${endMonth}-${endDay}`
  }
  // console.log('本周其实日期：', `${startYear}-${startMonth}-${startDay}`, `${endYear}-${endMonth}-${endDay}`)
}

export default getWeekDate()