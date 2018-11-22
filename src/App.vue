<template>
    <div id="app">
        <el-container>
            <el-header>自如旅居 · 权限管理系统</el-header>
            <el-container style="height: 1230px">
                <el-aside style="width: 200px">
                    <div style="margin: 20px 20px;" size="mini">
                        <el-button icon="el-icon-date" circle @click="$router.push('/')"></el-button>
                    </div>
                    <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose">
                        <el-menu-item index="/">
                            <i class="el-icon-menu"></i>
                            <span slot="title">系统管理</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-document"></i>
                            <span slot="title">菜单管理</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-setting"></i>
                            <span slot="title">角色管理</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-setting"></i>
                            <span slot="title">用户管理</span>
                        </el-menu-item>
                        <el-menu-item index="4">
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
    export default {
        data () {
            return {
                isCollapse: false,
                isCollapseIcon: 'el-icon-caret-left',
                asideWidth: 220
            }
        },
        methods: {
            handleOpen (key, keyPath) {
                console.log(key, keyPath)
            },
            handleClose (key, keyPath) {
                console.log(key, keyPath)
            },
            switchCollapse () {
                let vm = this
                vm.isCollapse = !vm.isCollapse
                if (vm.isCollapse) {
                    vm.isCollapseIcon = 'el-icon-caret-right'
                    vm.asideWidth = 150
                } else {
                    vm.isCollapseIcon = 'el-icon-caret-left'
                    vm.asideWidth = 220
                }
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
        margin-top: 20px;
        margin-left: 20px;
        background-color: #F2F6FC;
        width: 100%;
        height: 100%;
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
