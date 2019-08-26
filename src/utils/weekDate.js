let GetWeekDate = function() {
  this.nowTime = new Date()
  this.init = function() {
      this.dayInWeek = this.nowTime.getDay() // 一周的第几天
      this.dayInWeek == 0 && (this.dayInWeek = 7) // 
      this.thsiWeekFirstDay = this.nowTime.getTime() - (this.dayInWeek - 1) * 86400000;
      this.thisWeekLastDay = this.nowTime.getTime() + (7 - this.dayInWeek) * 86400000;
      return this;
  };
  this.getWeekType = function(type) {
      type = ~~type;
      var firstDay = this.thsiWeekFirstDay + type * 7 * 86400000;
      var lastDay = this.thisWeekLastDay + type * 7 * 86400000;
      return this.getWeekHtml(firstDay, lastDay);
  }
  this.formateDate = function(time) {
      var newTime = new Date(time)
      var year = newTime.getFullYear();
      var month = newTime.getMonth() + 1;
      var day = newTime.getDate();
      return year + "-" + (month >= 10 ? month : "0" + month) + "-" + (day >= 10 ? day : "0" + day);
  };
  this.getWeekHtml = function(f, l) {
      return {
        startDate: this.formateDate(f),
        endDate: this.formateDate(l)
      }
  };
}
var getWeekDate = new GetWeekDate()
var weekDate = getWeekDate.init().getWeekType();

export default weekDate