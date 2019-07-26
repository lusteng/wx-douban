function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
} 

export const BASE_PATH = "https://www.easy-mock.com/mock/5d2eebbc6a088d6b468ebcd7/mock/"

export const HOME_NAMES = {
  1: "影院热映",
  2: "豆瓣热门",
  3: "近期热门剧集",
  4: "近期热门综艺节目",
  5: "畅销图书",
  6: "热门单曲榜",
}

export default {
  formatNumber,
  formatTime,
}
