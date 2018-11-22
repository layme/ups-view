<template>
    <div id="app">
        <el-container>
            <el-header>自如旅居 · 权限管理系统</el-header>
            <el-container>
                <el-aside style="width: 200px;">
                    <el-radio-group v-model="isCollapse" style="margin: 20px 20px;">
                        <el-radio-button :label="false">展开</el-radio-button>
                        <el-radio-button :label="true">收起</el-radio-button>
                    </el-radio-group>
                    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen"
                             @close="handleClose"
                             :collapse="isCollapse">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span slot="title">导航一</span>
                            </template>
                            <el-menu-item-group>
                                <span slot="title">分组一</span>
                                <el-menu-item index="1-1">选项1</el-menu-item>
                                <el-menu-item index="1-2">选项2</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="分组2">
                                <el-menu-item index="1-3">选项3</el-menu-item>
                            </el-menu-item-group>
                            <el-submenu index="1-4">
                                <span slot="title">选项4</span>
                                <el-menu-item index="1-4-1">选项1</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <span slot="title">导航二</span>
                        </el-menu-item>
                        <el-menu-item index="3" disabled>
                            <i class="el-icon-document"></i>
                            <span slot="title">导航三</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航四</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>

                <el-main>
                    <router-view/>
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
                isCollapse: true
            }
        },
        methods: {
            handleOpen (key, keyPath) {
                console.log(key, keyPath)
            },
            handleClose (key, keyPath) {
                console.log(key, keyPath)
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
    }

    .el-aside {
    }

    .el-main {
        background-color: gainsboro;
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

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
</style>
