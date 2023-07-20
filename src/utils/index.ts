import message from 'antd/lib/message'
/*
* 工具函数封装
* */

//格式化金额
export const formatMoney = (num: number | string): string => {
  const a = parseFloat(num.toString());
  return a.toLocaleString('zh-CN', {style: 'currency', currency: 'CNY'})
}

// 格式化数字
export const formatNum = (num: number | string) => {
  const a = num.toString()
  if (a.indexOf('.') > -1) return a.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  return a.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
}


// 格式化日期
export const toLocalDate = (date?: Date, rule?: string) => {
  let curDate = new Date();
  if (date) {
    curDate = new Date(date)
  }
  if (rule === 'yyyy-MM-dd') return curDate.toLocaleDateString().replaceAll('/', '-')
  if (rule === 'HH:mm:ss') return curDate.toLocaleTimeString().replaceAll('/', '-')
  return curDate.toLocaleString().replaceAll('/', '-')
}

// 格式化日期
export const formateDate = (date?: Date, rule?: string) => {
  let curDate = new Date();
  if (date) {
    curDate = new Date(date)
  }
  let fmt = rule || "yyyy-MM-dd HH:mm:ss";
  fmt = fmt.replace(/(y+)/,curDate.getFullYear().toString())
  type OType = {
    [key: string]: number
  }
  const o:OType = {
    'M+': curDate.getMonth() + 1,
    'd+': curDate.getDate(),
    'H+': curDate.getHours(),
    'm+': curDate.getMinutes(),
    's+': curDate.getSeconds()
  }
  for (let k in o) {
    // fmt = fmt.replace(new RegExp(`(${k})`),o[k]>9?o[k].toString():'0'+o[k].toString())
    fmt = fmt.replace(new RegExp(`(${k})`),('00'+o[k]).substr(o[k].toString().length))
  }
  return fmt
}

export const MessageHandleError = (msg: string) => {
    void message.error(msg)
}