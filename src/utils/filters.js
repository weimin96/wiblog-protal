
const commentTime = [60 * 60 * 3 * 1000, 60 * 60 * 2 * 1000, 60 * 60 * 1000, 60 * 30 * 1000, 60 * 10 * 1000, 60 * 5 * 1000]
const commentTimeStr = ['三小时前', '两小时前', '一小时前', '半小时前', '10分钟前', '刚刚']
const now = new Date()
const monthArray = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']

const vFilter = {
  dateFormat: function(d) {
    const date = new Date(d)
    const year = date.getFullYear()
    const month = switchNum(date.getMonth())
    const day = change(date.getDate())

    return month + '月' + day + ', ' + year
  }
}

function change(t) {
  if (t < 10) {
    return '0' + t
  } else {
    return t
  }
}

function switchNum(month) {
  return monthArray[Number(month)]
}

export default vFilter
