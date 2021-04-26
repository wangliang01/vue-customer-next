export function getQueryString(name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const url = window.location.href.includes('#') ? getHashQueryString(window.location.href) : window.location.search
  const r = url.substr(1).match(reg)
  if (r != null) return decodeURIComponent(unescape(r[2]))
  return null
}

export function getHashQueryString(url) {
  const [, search] = url.split('?')
  if (search) {
    return `?${decodeURIComponent(search)}`
  }
  return ''
}
