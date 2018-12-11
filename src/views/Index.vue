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
            <div v-for="(x,key0) in resourceList" :key="key0">
              <el-submenu v-if="x.children !== undefined && x.children.length > 0" :index="x.path">
                <template slot="title">
                  <i :class="x.icon"></i>
                  <span>{{ x.name }}</span>
                </template>
                <el-menu-item v-for="(y,key1) in x.children" :key="key1" :index="y.path">
                  {{ y.name }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="x.path">
                <i :class="x.icon"></i>
                <span slot="title">{{ x.name }}</span>
              </el-menu-item>
            </div>
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
  import instance from '../axios'

  export default {
    data () {
      return {
        defaultActive: this.$router.currentRoute.path,
        computedHeight: {
          height: '',
          'overflow-y': 'auto'
        },
        resourceList: this.$router.options.routes[0].children.slice(1)
      }
    },
    mounted () {
      this.computedHeight.height = window.innerHeight - 75 + 'px'
      window.onresize = () => {
        this.computedHeight.height = window.innerHeight - 75 + 'px'
      }
    },

    methods: {
      findMenuList () {
        let vm = this
        // vm.axios.
      }
    },

    updated () {
      this.defaultActive = this.$router.currentRoute.path
    }
  }
</script>

<style lang="less">
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
