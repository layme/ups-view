<template>
  <div class="about">
    <el-card class="box-card">
      <el-form :inline="true" :model="formParam" class="demo-form-inline">
        <el-form-item label="选择应用">
          <el-select v-model="formParam.appCode" placeholder="请选择">
            <el-option
              v-for="item in appOptions"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="listApp" plain>查 询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-row type="flex" class="row-bg" justify="end">
        <el-col :span="2">
          <el-button icon="el-icon-circle-plus-outline" style="float: right; padding: 8px;" type="primary"
                     @click="openSaveOrUp()" v-action="searchBtn" plain>添 加
          </el-button>
        </el-col>
      </el-row>
      <el-table
        :data="appList"
        stripe
        size="mini"
        v-loading="loading"
        style="width: 100%">
        <el-table-column
          prop="appName"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="appCode"
          label="代码">
        </el-table-column>
        <el-table-column
          prop="appUrl"
          label="访问域名">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="创建时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="openSaveOrUp(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="delConfirm(scope.$index)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="formParam.page"
                     :page-sizes="[10, 20]"
                     :page-size="formParam.limit"
                     layout="total, sizes, prev, pager, next"
                     :total="total">
      </el-pagination>
    </el-card>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
      <el-form :model="appSaveOrUpDto" status-icon :rules="rules" ref="appSaveOrUpForm">
        <el-form-item prop="appName">
          <el-input v-model="appSaveOrUpDto.appName" placeholder="应用名称 (必填 自如网 最多15字)" maxlength="15"></el-input>
        </el-form-item>
        <el-form-item prop="appCode">
          <el-input v-model="appSaveOrUpDto.appCode" placeholder="应用代码 (必填 ziroom 最多10字)" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item prop="appUrl">
          <el-input v-model="appSaveOrUpDto.appUrl" placeholder="访问地址 (必填 http://www.ziroom.com 最多30字)"
                    maxlength="30"></el-input>
        </el-form-item>
        <el-form-item prop="appDesc">
          <el-input v-model="appSaveOrUpDto.appDesc" placeholder="应用描述 (非必填 最多20字)"
                    maxlength="20"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="validForm('appSaveOrUpForm')" plain>保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { instance, catchError } from '../axios'

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
        searchBtn: '/order/detail.action',
        formParam: {
          appCode: '',
          page: 1,
          limit: 10
        },
        loading: false,
        appOptions: [],
        appList: [],
        total: 0,
        dialogVisible: false,
        appSaveOrUpDto: {
          fid: '',
          appName: '',
          appCode: '',
          appUrl: '',
          appDesc: ''
        },
        title: '添加应用',
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
        },
        appDelDto: {
          appFid: ''
        }
      }
    },
    methods: {
      listApp () {
        let vm = this
        vm.loading = true
        instance.get('/api/application/list',
          { params: vm.formParam })
          .then((resp) => {
            if (resp.data.code === 200) {
              vm.total = resp.data.body.total
              vm.appList = resp.data.body.rows
            } else {
              this.$message({
                message: resp.data.message,
                type: 'warning'
              })
            }
            vm.loading = false
          })
          .catch((err) => {
            vm.loading = false
            catchError(err)
          })
      },
      openSaveOrUp (val) {
        this.dialogVisible = true
        if (val) {
          this.title = '修改应用'
          this.appSaveOrUpDto.fid = val.fid
          this.appSaveOrUpDto.appName = val.appName
          this.appSaveOrUpDto.appCode = val.appCode
          this.appSaveOrUpDto.appUrl = val.appUrl
          this.appSaveOrUpDto.appDesc = val.appDesc
        } else {
          this.title = '添加应用'
          this.appSaveOrUpDto = {
            fid: '',
            appName: '',
            appCode: '',
            appUrl: '',
            appDesc: ''
          }
        }
      },
      validForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogVisible = false
            this.saveOrUpApp()
          } else {
            return false
          }
        })
      },
      saveOrUpApp () {
        let vm = this
        vm.loading = true
        instance.post('/api/application/saveOrUp',
          JSON.stringify(vm.appSaveOrUpDto))
          .then((resp) => {
            if (resp.data.code === 200) {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              vm.listApp()
            } else {
              this.$message({
                message: resp.data.message,
                type: 'warning'
              })
            }
            vm.loading = false
          })
          .catch((err) => {
            vm.loading = false
            catchError(err)
          })
      },
      delConfirm (val) {
        console.info('val => ', val)
        this.$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delApp(val)
        }).catch(() => {
        })
      },
      delApp (val) {
        let vm = this
        vm.loading = true
        vm.appDelDto.appFid = vm.appList[val].fid
        instance.post('/api/application/del',
          JSON.stringify(vm.appDelDto))
          .then((resp) => {
            if (resp.data.code === 200) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              vm.listApp()
            } else {
              this.$message({
                message: resp.data.message,
                type: 'warning'
              })
            }
            vm.loading = false
          })
          .catch((err) => {
            vm.loading = false
            catchError(err)
          })
      },
      handleSizeChange (val) {
        this.formParam.limit = val
        this.formParam.page = 1
        this.listApp()
      },
      handleCurrentChange (val) {
        this.formParam.page = val
        this.listApp()
      }
    },
    created () {
      this.listApp()
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
