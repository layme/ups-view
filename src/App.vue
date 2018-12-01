<template>
    <div id="app">
        <router-view @login="loginDirect" @logout="logoutDirect" />
    </div>
</template>

<script>
    export default {
        data () {
            return {}
        },
        methods: {
        // 登录
    loginDirect: function (newPath) {
      this.signin(() => {
        this.$router.replace({ path: newPath || '/' })
      })
    },

    // 退出
    logoutDirect: function () {
      // 清除session
      // util.session('token', '')
      // 清除请求权限控制
      // instance.interceptors.request.eject(myInterceptor)
      // 清除菜单权限
      // this.$root.hashMenus = {}
      // 清除请求头token
      // instance.defaults.headers.common['Authorization'] = ''
      // 回到登录页
      this.$router.replace({ path: '/login' })
    }
        }
    }
</script>

<style lang="less">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>
