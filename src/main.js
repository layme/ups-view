import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { isHave } from './assets/action'

Vue.config.productionTip = false
Vue.use(ElementUI)

// 权限指令
Vue.directive('action', {
  bind: function (el, binding) {
    if (isHave(binding.value)) {
      el.parentNode.removeChild(el)
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
