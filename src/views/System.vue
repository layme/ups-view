<template>
  <div class="about">
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
                  <el-button icon="el-icon-search" type="primary" @click="findSystem" plain>查 询</el-button>
              </el-form-item>
          </el-form>
      </el-card>
      <el-card class="box-card">
          <el-button icon="el-icon-circle-plus-outline" type="primary" @click="addMenu" plain>添 加</el-button>
          <el-table
              :data="systemList"
              stripe
              style="width: 100%">
              <el-table-column
                  prop="name"
                  label="名称">
              </el-table-column>
              <el-table-column
                  prop="address"
                  label="代码">
              </el-table-column>
              <el-table-column
                  prop="order"
                  label="URL地址">
              </el-table-column>
              <el-table-column
                  prop="status"
                  label="创建时间">
              </el-table-column>
              <el-table-column
                  label="操作">
                  <template slot-scope="scope">
                      <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                      <el-button type="text" size="small">编辑</el-button>
                      <el-button type="text" size="small">删除</el-button>
                  </template>
              </el-table-column>
          </el-table>
          <el-pagination class="pagination"
              layout="prev, pager, next"
              :total="50">
          </el-pagination>
      </el-card>
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
                systemList: []
            }
        },
        methods: {
            findSystem () {
                console.log('findSystem!')
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

    .pagination {
        margin: 10px 50px 0 0;
        text-align: right;
    }
</style>
