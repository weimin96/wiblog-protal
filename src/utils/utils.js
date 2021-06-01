
// 获取url参数
export function getQueryVariable(variable) {
  const url = window.location.href
  const query = url.substring(url.lastIndexOf('?') + 1)
  const vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (pair[0] === variable) {
      return decodeURI(pair[1])
    }
  }
  return ('')
}
