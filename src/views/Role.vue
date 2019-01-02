<template>
  <div>
    <el-card class="box-card">
      <el-form :inline="true" :model="formParam" class="demo-form-inline">
        <el-form-item label="角色名称">
          <el-input v-model="formParam.roleName" placeholder="角色名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="选择应用">
          <el-select v-model="formParam.appCode" placeholder="请选择" clearable>
            <el-option
              v-for="(item,index) in appOptions"
              :key="index"
              :label="item.appName"
              :value="item.appCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="listRole" plain>查 询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-row type="flex" class="row-bg" justify="end">
        <el-col :span="2">
          <el-button icon="el-icon-circle-plus-outline" type="primary" @click="openSaveOrUp()" plain>添 加</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="roleList"
        stripe
        size="mini"
        v-loading="roleListLoading"
        style="width: 100%">
        <el-table-column
          prop="roleName"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="appName"
          label="所属应用">
        </el-table-column>
        <el-table-column
          prop="modifyDate"
          label="修改时间">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">{{ scope.row.roleStatus | roleStatusFilter }}</template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="openSaveOrUp(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="stopOrStartConfirm(scope.$index)" type="text" size="small">{{ scope.row.roleStatus | roleStatusBtnFilter }}</el-button>
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
        :total="roleTotal">
      </el-pagination>
    </el-card>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
      <el-row :gutter="20">
        <el-col :span="12">
          <span>角色信息</span>
        </el-col>
        <el-col :span="10" :offset="2">
          <span>资源列表</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 10px">
        <el-col :span="12">
          <el-form :model="roleSaveOrUpDto" status-icon :rules="rules" ref="roleForm">
            <el-form-item prop="appCode">
              <el-select v-model="roleSaveOrUpDto.appCode" placeholder="选择应用 (必选)"
              @change="treeRes" style="width: 100%">
                <el-option
                  v-for="(item,index) in appOptions"
                  :key="index"
                  :label="item.appName"
                  :value="item.appCode">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="roleName">
              <el-input v-model.trim="roleSaveOrUpDto.roleName" placeholder="角色名称 (必填 最多10个字)"
              maxlength="10"></el-input>
            </el-form-item>
            <el-form-item prop="roleDesc">
              <el-input type="textarea" :row="2" v-model.trim="roleSaveOrUpDto.roleDesc"
                        placeholder="角色描述 (非必填 最多30个字)" maxlength="30"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="10" :offset="1" style="height: 300px; border-left: #EBEEF5 1px solid">
          <el-tree
            ref="resTree"
            node-key="resFid"
            v-loading="treeLoading"
            :data="resTree"
            :props="defaultProps"
            :show-checkbox="true"
          ></el-tree>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="validForm('roleForm')" plain>保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { instance, catchError } from '../axios'
  import * as utils from '../assets/util'
  export default {
    data () {
      return {
        formParam: {
          roleName: '',
          appCode: '',
          page: 1,
          limit: 10
        },
        appOptions: [],
        roleListLoading: false,
        roleList: [],
        roleTotal: 0,
        dialogVisible: false,
        title: '添加角色',
        roleSaveOrUpDto: {
          fid: '',
          appCode: '',
          roleName: '',
          roleDesc: '',
          resList: []
        },
        treeLoading: false,
        resTree: [],
        currentNode: null,
        defaultProps: {
          children: 'childrenList',
          label: 'resName'
        },
        rules: {
          appCode: [
            { required: true, message: '请选择应用', trigger: 'change' }
          ],
          roleName: [
            { required: true, message: '请输入角色名称径', trigger: 'blur' }
          ]
        },
        roleStopOrStartDto: {
          roleFid: '',
          roleStatus: ''
        }
      }
    },
    methods: {
      listRole () {
        let vm = this
        vm.roleListLoading = true
        instance.get('/api/role/list',
          { params: vm.formParam })
          .then((resp) => {
            if (resp.data.code === 200) {
              vm.roleTotal = resp.data.body.total
              vm.roleList = resp.data.body.rows
            } else {
              this.$message({
                message: resp.data.message,
                type: 'warning'
              })
            }
            vm.roleListLoading = false
          })
          .catch((err) => {
            vm.roleListLoading = false
            catchError(err)
          })
      },
      treeRes () {
        let vm = this
        vm.resList = []
        vm.resTotal = 0
        vm.treeLoading = true
        instance.get('/api/resource/tree',
          { params: { 'appCode': vm.roleSaveOrUpDto.appCode, 'resStatus': 1 } })
          .then((resp) => {
            if (resp.data.code === 200) {
              vm.resTree = resp.data.body
              vm.$refs.resTree.setCheckedKeys(vm.roleSaveOrUpDto.resList)
            } else {
              this.$message({
                message: resp.data.message,
                type: 'warning'
              })
            }
            vm.treeLoading = false
          })
          .catch((err) => {
            vm.treeLoading = false
            catchError(err)
          })
      },
      openSaveOrUp (val) {
        let vm = this
        vm.dialogVisible = true
        if (val) {
          vm.title = '编辑角色'
          vm.roleSaveOrUpDto.fid = val.roleFid
          vm.roleSaveOrUpDto.appCode = val.appCode
          vm.roleSaveOrUpDto.roleName = val.roleName
          vm.roleSaveOrUpDto.roleDesc = val.roleDesc
          vm.roleSaveOrUpDto.resList = val.resList
          vm.treeRes()
        } else {
          vm.title = '添加角色'
          vm.roleSaveOrUpDto = {
            fid: '',
            appCode: vm.formParam.appCode,
            roleName: '',
            roleDesc: '',
            resList: []
          }
          if (vm.roleSaveOrUpDto.appCode) {
            vm.treeRes()
          }
        }
      },
      validForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogVisible = false
            this.roleSaveOrUpDto.resList = this.$refs.resTree.getCheckedKeys()
            this.saveOrUpRole()
          } else {
            return false
          }
        })
      },
      //
      saveOrUpRole () {
        let vm = this
        instance.post('/api/role/saveOrUp',
          JSON.stringify(vm.roleSaveOrUpDto))
          .then((resp) => {
            if (resp.data.code === 200) {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              vm.listRole()
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
      },
      //
      stopOrStartConfirm (val) {
        console.info('val => ', val)
        let tip = ''
        this.roleList[val].roleStatus === 1 ? tip = '停用' : tip = '启用'
        this.$confirm('确定' + tip + '吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.stopOrStartRole(val)
        }).catch(() => {
        })
      },
      stopOrStartRole (val) {
        let vm = this
        vm.roleStopOrStartDto.roleFid = vm.roleList[val].roleFid
        vm.roleStopOrStartDto.roleStatus = vm.roleList[val].roleStatus
        instance.post('/api/role/stopOrStart',
          JSON.stringify(vm.roleStopOrStartDto))
          .then((resp) => {
            if (resp.data.code === 200) {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              vm.listRole()
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
      },
      handleSizeChange (val) {
        this.formParam.page = 1
        this.listRole()
      },
      handleCurrentChange (val) {
        this.listRole()
      }
    },
    filters: {
      roleStatusBtnFilter (val) {
        switch (val) {
          case 0:
            return '启用'
          case 1:
            return '停用'
        }
      },
      roleStatusFilter (val) {
        switch (val) {
          case 0:
            return '停用'
          case 1:
            return '启用'
        }
      }
    },
    created () {
      utils.listAppOptions().then((data) => {
        this.appOptions = data
      })
      this.listRole()
    }
  }
</script>

<style scoped lang="less">
  .box-card {
    margin-bottom: 20px;
  }

  .pagination {
    margin: 20px 50px 0 0;
    text-align: right;
  }
</style>
