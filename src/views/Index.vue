<template>
  <div id="app">
    <el-container>
      <el-header>自如旅居 · 权限管理系统</el-header>
      <el-container :style="computedHeight">
        <el-aside style="width: 200px">
          <div style="margin: 20px 20px;" size="mini">
            <el-button icon="el-icon-date" circle @click="$router.push('/home')"></el-button>
          </div>
          <el-menu router :default-active="defaultActive">
            <el-menu-item index="/system">
              <i class="el-icon-menu"></i>
              <span slot="title">系统管理</span>
            </el-menu-item>
            <el-menu-item index="/menu">
              <i class="el-icon-document"></i>
              <span slot="title">菜单管理</span>
            </el-menu-item>
            <el-menu-item index="/role">
              <i class="el-icon-setting"></i>
              <span slot="title">角色管理</span>
            </el-menu-item>
            <el-menu-item index="/user">
              <i class="el-icon-setting"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="log">
              <i class="el-icon-setting"></i>
              <span slot="title">日志管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main>
          <el-collapse-transition>
            <router-view/>
          </el-collapse-transition>
        </el-main>
      </el-container>
    </el-container>
    <!--<div id="nav">-->
    <!--<router-link to="/">Home</router-link> |-->
    <!--<router-link to="/about">About</router-link>-->
    <!--</div>-->

  </div>
</template>

<script>
  import axios from '../axios'
  export default {
    data () {
      return {
        defaultActive: '/home',
        computedHeight: {
          height: '',
          'overflow-y': 'auto'
        }
      }
    },
    mounted () {
      this.computedHeight.height = window.innerHeight - 75 + 'px'
      window.onresize = function () {
        this.computedHeight.height = window.innerHeight - 75 + 'px'
      }
    },

    methods: {
      findMenuList () {
        let vm = this
        // vm.axios.
      }
    }
  }
</script>

<style lang="less">
  /*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*}*/

  .el-header, .el-footer {
    background-color: #409EFF;
    color: #fff;
    line-height: 60px;
    font-size: 24px;
    transition: width 2s;
    -moz-transition: width 2s; /* Firefox 4 */
    -webkit-transition: width 2s; /* Safari and Chrome */
    -o-transition: width 2s; /* Opera */
  }

  .el-aside {
  }

  .el-main {
    margin: 20px 0 0 20px;
    background-color: #f8f9fc;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
