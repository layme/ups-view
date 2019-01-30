<template>
  <div id="app">
    <el-container>
      <el-header>自如旅居 · 权限管理系统</el-header>
      <el-container :style="computedHeight">
        <el-aside style="width: 200px">
          <div style="margin: 20px 20px;" size="mini">
            <el-button icon="el-icon-date" circle @click="$router.push('/home')"></el-button>
          </div>
          <z-menu :default-active="defaultActive" :resource-list="resourceList" />
        </el-aside>

        <el-main>
          <el-collapse-transition>
            <router-view/>
          </el-collapse-transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import ZMenu from '../components/ZMenu'
  import { instance, catchError } from '../axios'
  export default {
    components: { ZMenu },
    data () {
      return {
        defaultActive: this.$router.currentRoute.path,
        computedHeight: {
          height: '',
          'overflow-y': 'auto'
        },
        resourceList: this.$router.options.routes[0].children.slice(1),
        menuResDto: {
          appCode: 'ups',
          account: 'renhy'
        },
        menuRes: {}
      }
    },

    mounted () {
      this.computedHeight.height = window.innerHeight - 75 + 'px'
      window.onresize = () => {
        this.computedHeight.height = window.innerHeight - 75 + 'px'
      }
    },

    methods: {
      findMenuRes () {
        let vm = this
        instance.get('/api/resource/menuRes',
          { params: vm.menuResDto })
          .then((resp) => {
            if (resp.data.code === 200) {
              vm.menuRes = resp.data.body
              sessionStorage.setItem('menuTree', resp.data.body.menuTree)
              sessionStorage.setItem('actionList', resp.data.body.actionList)
            } else {
              this.$message({
                message: resp.data.message,
                type: 'warning'
              })
            }
          })
          .catch((err) => {
            catchError(err)
          })
      }
    },
    created () {
      this.findMenuRes()
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
