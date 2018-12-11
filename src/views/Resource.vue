<template>
  <div>
    <el-card class="box-card">
      <el-form :inline="true" :model="formParam" class="demo-form-inline">
        <el-form-item label="选择应用">
          <el-select v-model="formParam.applicationCode" placeholder="请选择">
            <el-option
              v-for="item in applicationOptions"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="findResource" plain>查 询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card menu-card">
          <div slot="header">
            <span>资源树预览</span>
          </div>
          <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="box-card edit-box">
          <div slot="header">
            <span>资源编辑</span>
            <el-button icon="el-icon-circle-plus-outline" style="float: right; padding: 8px "
                       type="primary" @click="dialogFormVisible = true" plain>新增资源
            </el-button>
          </div>
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
          <el-pagination class="pagination"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page.sync="formParam.pageIndex"
                         :page-sizes="[10, 20]"
                         :page-size="10"
                         layout="total, sizes, prev, pager, next"
                         :total="total">
          </el-pagination>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="添加资源" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="resourceDto" status-icon :rules="rules" ref="resourceForm">
        <el-form-item prop="appName">
          <el-input v-model="resourceDto.parentName" placeholder="上级名称 (非必填)"></el-input>
        </el-form-item>
        <el-form-item prop="resName">
          <el-input v-model="resourceDto.resName" placeholder="资源名称 (必填)"></el-input>
        </el-form-item>
        <el-form-item prop="resPath">
          <el-input v-model="resourceDto.resPath" placeholder="资源路径 (必填)"></el-input>
        </el-form-item>
        <el-form-item prop="resIcon">
          <el-input v-model="resourceDto.resIcon" placeholder="资源图标 (非必填)"></el-input>
        </el-form-item>
        <el-form-item prop="orderNo">
          <el-input v-model="resourceDto.orderNo" placeholder="排序 (必填)"></el-input>
        </el-form-item>
        <el-form-item prop="resType">
          <el-select v-model="resourceDto.resType" placeholder="请选择资源类型  (必填)"
                     style="width: 100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('resourceForm')">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        formParam: {
          applicationCode: ''
        },
        applicationOptions: [{
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
        menuDetail: [],
        total: 0,
        dialogFormVisible: false,
        options: [{
          label: '菜单',
          value: '1'
        }, {
          label: '操作',
          value: '2'
        }],
        resourceDto: {
          applicationFid: '',
          parentFid: '',
          parentName: '',
          resName: '',
          resIcon: '',
          resPath: '',
          orderNo: '',
          resType: ''
        },
        rules: {
          resName: [
            { required: true, message: '请输入资源名称', trigger: 'blur' }
          ],
          resPath: [
            { required: true, message: '请输入资源路径', trigger: 'blur' }
          ],
          orderNo: [
            { required: true, message: '请输入序号', trigger: 'blur' }
          ],
          resType: [
            { required: true, message: '请选择资源类型', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      findResource () {
        console.log('findMenu!')
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addResource()
          } else {
            return false
          }
        })
      },
      addResource () {
        console.log('addMenu!')
      },
      handleNodeClick () {
        console.log('handleNodeClick!')
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
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
    margin: 20px 50px 0 0;
    text-align: right;
  }
</style>
