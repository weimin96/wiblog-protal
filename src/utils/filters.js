
const commentTime = [60 * 60 * 3 * 1000, 60 * 60 * 2 * 1000, 60 * 60 * 1000, 60 * 30 * 1000, 60 * 10 * 1000, 60 * 5 * 1000]
const commentTimeStr = ['三小时前', '两小时前', '一小时前', '半小时前', '10分钟前', '刚刚']
const now = new Date()

const dateFormat = d => {
  const date = new Date(d)
  const year = date.getFullYear()
  const month = change(date.getMonth())
  const day = change(date.getDate())
  const hour = change(date.getHours())
  const minute = change(date.getMinutes())

  function change(t) {
    if (t < 10) {
      return '0' + t
    } else {
      return t
    }
  }

  let result = ''
  for (const index in commentTime) {
    const item = commentTime[index]
    if (now.getTime() - item > date.getTime()) {
      return null
    } else {
      result = commentTimeStr[index]
    }
  }

  // 返回数组内的时间文字
  if (result !== '') {
    return result
  }
  // 同一年不显示年份
  if (now.getFullYear() !== year) {
    result += year + '.'
  }
  return result + month + '.' + day + ' ' + hour + ':' + minute
}

export default {
  dateFormat
}
