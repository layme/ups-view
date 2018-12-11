<template>
  <div class="about">
    <el-card class="box-card">
      <el-form :inline="true" :model="formParam" class="demo-form-inline">
        <el-form-item label="选择应用">
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
          <el-button icon="el-icon-search" type="primary" @click="findApp" plain>查 询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-row type="flex" class="row-bg" justify="end">
        <el-col :span="2">
          <el-button icon="el-icon-circle-plus-outline" type="primary" @click="dialogFormVisible = true" plain>添 加
          </el-button>
        </el-col>
      </el-row>
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
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="formParam.pageIndex"
                     :page-sizes="[10, 20]"
                     :page-size="10"
                     layout="total, sizes, prev, pager, next"
                     :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加应用" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="applicationDto" status-icon :rules="rules" ref="applicationForm">
        <el-form-item prop="appName">
          <el-input v-model="applicationDto.appName" placeholder="应用名称 (必填  自如网)"></el-input>
        </el-form-item>
        <el-form-item prop="appCode">
          <el-input v-model="applicationDto.appCode" placeholder="应用代码 (必填  ziroom)"></el-input>
        </el-form-item>
        <el-form-item prop="appUrl">
          <el-input v-model="applicationDto.appUrl" placeholder="访问地址 (必填  http://www.ziroom.com)"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('applicationForm')">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      const regURl = /((ht|f)tps?:)\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/
      var validateAppUrl = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入访问地址'))
        } else if (!regURl.test(value)) {
          callback(new Error('请检查地址格式'))
        } else {
          callback()
        }
      }
      return {
        formParam: {
          systemCode: '',
          pageIndex: 1,
          pageSize: 10
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
        systemList: [],
        total: 0,
        dialogFormVisible: false,
        formLabelWidth: '80px',
        applicationDto: {
          appName: '',
          appCode: '',
          appUrl: ''
        },
        rules: {
          appName: [
            { required: true, message: '请输入应用名称', trigger: 'blur' }
          ],
          appCode: [
            { required: true, message: '请输入应用代码', trigger: 'blur' }
          ],
          appUrl: [
            { validator: validateAppUrl, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      findApp () {
        console.log('findApp!')
      },
      openDialog () {
        this.dialogFormVisible = true
        this.applicationDto = {
          appName: '',
          appCode: '',
          appUrl: ''
        }
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addApp()
          } else {
            return false
          }
        })
      },
      addApp () {
        console.log('addApp!')
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
