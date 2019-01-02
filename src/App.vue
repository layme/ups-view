<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    methods: {
      // 顶部消息通知
      message (type, msg) {
        this.$message({
          message: msg,
          type: type
        })
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
