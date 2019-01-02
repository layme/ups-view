import Vue from 'vue'
import { Message } from 'element-ui'
import { instance, catchError } from '../axios'

Vue.component(Message.name, Message)

// sessionStorage
export const session = function (key, value) {
  if (value === void (0)) {
    let lsVal = sessionStorage.getItem(key)
    if (lsVal && lsVal.indexOf('autostringify-') === 0) {
      return JSON.parse(lsVal.split('autostringify-')[1])
    } else {
      return lsVal
    }
  } else {
    if (typeof (value) === 'object' || Array.isArray(value)) {
      value = 'autostringify-' + JSON.stringify(value)
    }
    return sessionStorage.setItem(key, value)
  }
}

// 生成随机数
export const getUUID = function (len) {
  len = len || 6
  len = parseInt(len, 10)
  len = isNaN(len) ? 6 : len
  let seed = '0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ'
  let seedLen = seed.length - 1
  let uuid = ''
  while (len--) {
    uuid += seed[Math.round(Math.random() * seedLen)]
  }
  return uuid
}
// 深拷贝
export const deepCopy = function (source) {
  if (!source) {
    return source
  }
  let sourceCopy = source instanceof Array ? [] : {}
  for (let item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? deepCopy(source[item]) : source[item]
  }
  return sourceCopy
}

// 菜单数据组织
export const buildMenu = function (array, ckey) {
  console.info('buildMenu => ', array)
  let menuData = []
  let indexKeys = Array.isArray(array) ? array.map((e) => {
    return e.id
  }) : []
  ckey = ckey || 'parentId'
  array.forEach(function (e, i) {
    // 一级菜单
    if (!e[ckey] || (e[ckey] === e.id)) {
      delete e[ckey]
      menuData.push(deepCopy(e)) // 深拷贝
    } else if (Array.isArray(indexKeys)) {
      // 检测ckey有效性
      let parentIndex = indexKeys.findIndex(function (id) {
        return id === e[ckey]
      })
      if (parentIndex === -1) {
        menuData.push(e)
      }
    }
  })
  let findChildren = function (parentArr) {
    if (Array.isArray(parentArr) && parentArr.length) {
      parentArr.forEach(function (parentNode) {
        array.forEach(function (node) {
          if (parentNode.id === node[ckey]) {
            if (parentNode.children) {
              parentNode.children.push(node)
            } else {
              parentNode.children = [node]
            }
          }
        })
        if (parentNode.children) {
          findChildren(parentNode.children)
        }
      })
    }
  }
  findChildren(menuData)
  return menuData
}

// 日期格式化
export const dateFormat = function (source, ignoreMinute) {
}

export const listAppOptions = function () {
  return instance.get('/api/application/options')
    .then((resp) => {
      if (resp.data.code === 200) {
        return resp.data.body
      } else {
        this.$message({
          message: '获取应用下拉框数据失败',
          type: 'warning'
        })
        return []
      }
    })
    .catch((err) => {
      catchError(err)
    })
}
