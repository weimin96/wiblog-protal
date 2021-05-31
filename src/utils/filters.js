
// const commentTime = [60 * 60 * 3 * 1000, 60 * 60 * 2 * 1000, 60 * 60 * 1000, 60 * 30 * 1000, 60 * 10 * 1000, 60 * 5 * 1000]
// const commentTimeStr = ['三小时前', '两小时前', '一小时前', '半小时前', '10分钟前', '刚刚']
// const now = new Date()

const vFilter = {
  dateFormat: function(d) {
    if (d === '' || d === undefined || d === null) {
      return ''
    }
    return moment(d).format('YYYY-MM-DD')
  }
}

export default vFilter
