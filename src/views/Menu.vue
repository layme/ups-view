<template>
    <div>
        <el-card class="box-card">
            <el-form :inline="true" :model="formParam" class="demo-form-inline">
                <el-form-item label="选择系统">
                    <el-select v-model="formParam.systemCode" placeholder="请选择">
                        <el-option
                            v-for="item in systemCodeOptions"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" type="primary" @click="findMenu" plain>查 询</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card class="box-card menu-card">
                    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card class="box-card edit-box">
                    <el-button icon="el-icon-circle-plus-outline" type="primary" @click="addMenu" plain>新增菜单</el-button>
                    <el-table
                        :data="menuDetail"
                        stripe
                        style="width: 100%">
                        <el-table-column
                            prop="name"
                            label="名称">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="URL地址">
                        </el-table-column>
                        <el-table-column
                            prop="order"
                            label="排序">
                        </el-table-column>
                        <el-table-column
                            prop="status"
                            label="状态">
                        </el-table-column>
                        <el-table-column
                            prop="type"
                            label="类型">
                        </el-table-column>
                        <el-table-column
                            label="操作">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                                <el-button type="text" size="small">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                formParam: {
                    systemCode: ''
                },
                systemCodeOptions: [{
                    name: 'UPS权限管理系统',
                    code: 'ups'
                }, {
                    name: '自如驿管理系统',
                    code: 'zryms'
                }, {
                    name: '自如寓管理系统',
                    code: 'zyu'
                }, {
                    name: '特洛伊管理系统',
                    code: 'tory'
                }, {
                    name: 'Z-SPACE管理系统',
                    code: 'zspaceBsm'
                }],
                data: [{
                    label: '主页'
                }, {
                    label: '系统管理',
                    children: [{
                        label: '二级 1-1',
                        children: [{
                            label: '三级 1-1-1'
                        }, {
                            label: '三级 1-1-2'
                        }, {
                            label: '三级 1-1-3'
                        }, {
                            label: '三级 1-1-4'
                        }]
                    }, {
                        label: '二级 1-2',
                        children: [{
                            label: '三级 1-2-1'
                        }, {
                            label: '三级 1-3-2'
                        }]
                    }, {
                        label: '二级 1-3'
                    }]
                }, {
                    label: '菜单管理'
                }, {
                    label: '角色管理'
                }, {
                    label: '用户管理'
                }, {
                    label: '日志管理'
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                menuDetail: []
            }
        },
        methods: {
            findMenu () {
                console.log('findMenu!')
            },
            addMenu () {
                console.log('addMenu!')
            },
            handleNodeClick (data) {
                console.log(data)
            },
            handleClick (row) {
                console.log(row)
            }
        }
    }
</script>

<style scoped lang="less">
    .box-card {
        margin-bottom: 20px;
    }

    .menu-card {
        height: 500px;
    }

    .edit-box {
        height: 500px;
    }
</style>
