export default {
  inserted(el, binding, vnode) {
    const {
      value
    } = binding
    const roles = JSON.parse(localStorage.getItem('ajaxData')).positionList.typeName

    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value

      const hasPermission = permissionRoles.includes(roles)

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`permission指令传的参数错误 例如：v-permission="['admin']"`)
    }
  }
}