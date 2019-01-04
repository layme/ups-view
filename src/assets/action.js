//
export const isHave = (actionName) => {
  let actionList = sessionStorage.getItem('actionList')
  let have = false
  if (actionList.indexOf(actionName) !== -1) {
    have = true
  }
  return have
}
