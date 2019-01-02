<template>
  <div>
    <el-card class="box-card">
      <el-form :inline="true" :model="formParam" class="demo-form-inline">
        <el-form-item label="邮箱前缀">
          <el-input v-model="formParam.account" placeholder="邮箱前缀" clearable></el-input>
        </el-form-item>
        <el-form-item label="工号">
          <el-input v-model="formParam.empCode" placeholder="工号" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="listUser" plain>查 询</el-button>
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
        :data="userList"
        stripe
        size="mini"
        v-loading="userListLoading"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          prop="account"
          label="邮箱前缀">
        </el-table-column>
        <el-table-column
          prop="empName"
          label="姓名">
        </el-table-column>
        <el-table-column
          min-width="260"
          :show-overflow-tooltip="true"
          label="角色">
          <template slot-scope="scope">
            <el-tag style="margin-right: 2px" v-for="(tag,index) in scope.row.roleList" :key="index" size="small">
              {{ tag.roleName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="postName"
          label="职位">
        </el-table-column>
        <el-table-column
          prop="departName"
          label="部门">
        </el-table-column>
        <el-table-column
          label="用户状态">
          <template slot-scope="scope">{{ scope.row.userStatus | userStatusFilter }}</template>
        </el-table-column>
        <el-table-column
          label="员工状态">
          <template slot-scope="scope">{{ scope.row.empValid | empValidFilter }}</template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="openSaveOrUp(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="stopOrStartConfirm(scope.$index)" type="text" size="small">{{ scope.row.userStatus |
              roleStatusBtnFilter }}
            </el-button>
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
                     :total="userTotal">
      </el-pagination>
    </el-card>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="70%">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form :model="userSaveOrUpDto" status-icon :rules="rules" ref="userForm">
            <el-form-item prop="account">
              <el-input v-model.trim="userSaveOrUpDto.account" placeholder="邮箱前缀 (必填 最多10个字)"
                        maxlength="10"></el-input>
            </el-form-item>
            <el-form-item prop="empName">
              <el-input v-model.trim="userSaveOrUpDto.empName" readonly
                        placeholder="关联员工 (非必选)" maxlength="30">
                <el-button slot="append" @click="showEmpSelect">员工选择</el-button>
              </el-input>
            </el-form-item>
            <el-form-item prop="roleName">
              <el-button type="info" plain @click="showRoleSelect">角色选择</el-button>
              <br>
              <el-tag style="margin: 10px 5px 0 0"
                      v-for="(tag,index) in userSaveOrUpDto.roleList"
                      :key="index"
                      closable
                      @close="handleClose(tag)">
                {{tag.roleName}}
              </el-tag>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="16" style="height: 300px; border-left: #EBEEF5 1px solid">
          <z-emp-select :selected="userSaveOrUpDto.employeeFid"
                        v-if="empSelectVisible" @select="handleEmpSelect"/>
          <z-role-select ref="roleSelect" :selected="userSaveOrUpDto.roleList"
                         v-if="roleSelectVisible" @select="handleRoleSelect"/>
          <div style="text-align: center"
               v-if="!(empSelectVisible || roleSelectVisible)">点击左侧按钮进入选择页面
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="validForm('userForm')" plain>保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { instance, catchError } from '../axios'
  import ZEmpSelect from '../components/ZEmpSelect'
  import ZRoleSelect from '../components/ZRoleSelect'

  export default {
    components: { ZEmpSelect, ZRoleSelect },
    data () {
      return {
        formParam: {
          account: '',
          empCode: '',
          page: 1,
          limit: 10
        },
        userListLoading: false,
        userList: [],
        userTotal: 0,
        dialogVisible: false,
        title: '添加用户',
        userSaveOrUpDto: {
          fid: '',
          account: '',
          employeeFid: '',
          empName: '',
          roleList: []
        },
        empSelectVisible: false,
        roleSelectVisible: false,
        rules: {
          account: [{ required: true, message: '请输入邮箱前缀', trigger: 'blur' }]
        },
        userStopOrStartDto: {
          userFid: '',
          userStatus: ''
        }
      }
    },
    methods: {
      listUser () {
        let vm = this
        vm.userListLoading = true
        instance.get('/api/user/list',
          { params: vm.formParam })
          .then((resp) => {
            if (resp.data.code === 200) {
              vm.userTotal = resp.data.body.total
              vm.userList = resp.data.body.rows
            } else {
              this.$message({
                message: resp.data.message,
                type: 'warning'
              })
            }
            vm.userListLoading = false
          })
          .catch((err) => {
            vm.userListLoading = false
            catchError(err)
          })
      },
      handleSizeChange (val) {
        this.formParam.page = 1
        this.listUser()
      },
      handleCurrentChange (val) {
        this.listUser()
      },
      openSaveOrUp (val) {
        let vm = this
        vm.dialogVisible = true
        if (val) {
          vm.userSaveOrUpDto.fid = val.fid
          vm.userSaveOrUpDto.account = val.account
          vm.userSaveOrUpDto.employeeFid = val.employeeFid
          vm.userSaveOrUpDto.empName = val.empName
          vm.userSaveOrUpDto.roleList = val.roleList
        } else {
          vm.userSaveOrUpDto = {
            fid: '',
            account: '',
            employeeFid: '',
            empName: '',
            roleList: []
          }
        }
      },
      showEmpSelect () {
        this.empSelectVisible = true
        this.roleSelectVisible = false
      },
      showRoleSelect () {
        this.roleSelectVisible = true
        this.empSelectVisible = false
      },
      handleClose (tag) {
        if (this.$refs.roleSelect) {
          console.info('handleClose => ', tag)
          this.$refs.roleSelect.changeSelection(tag)
        }
        this.userSaveOrUpDto.roleList.splice(this.userSaveOrUpDto.roleList.indexOf(tag), 1)
      },
      validForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogVisible = false
            this.saveOrUpUser()
          } else {
            return false
          }
        })
      },
      //
      saveOrUpUser () {
        let vm = this
        instance.post('/api/user/saveOrUp',
          JSON.stringify(vm.userSaveOrUpDto))
          .then((resp) => {
            if (resp.data.code === 200) {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              vm.listUser()
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
      stopOrStartConfirm (val) {
        console.info('val => ', val)
        let tip = ''
        this.userList[val].userStatus === 1 ? tip = '停用' : tip = '启用'
        this.$confirm('确定' + tip + '吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.stopOrStartUser(val)
        }).catch(() => {
        })
      },
      stopOrStartUser (val) {
        let vm = this
        vm.userStopOrStartDto.userFid = vm.userList[val].fid
        vm.userStopOrStartDto.userStatus = vm.userList[val].userStatus
        instance.post('/api/user/stopOrStart',
          JSON.stringify(vm.userStopOrStartDto))
          .then((resp) => {
            if (resp.data.code === 200) {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              vm.listUser()
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
      handleEmpSelect (val) {
        this.userSaveOrUpDto.employeeFid = val.fid
        this.userSaveOrUpDto.empName = val.empName
      },
      handleRoleSelect (select, unSelect) {
        let vm = this
        let roleFid = []
        vm.userSaveOrUpDto.roleList.forEach((item) => roleFid.push(item.roleFid))
        select.forEach((item) => {
          if (roleFid.indexOf(item.roleFid) === -1) {
            vm.userSaveOrUpDto.roleList.push({
              roleFid: item.roleFid,
              roleName: item.roleName
            })
          }
        })
        unSelect.forEach((item) => {
          for (let i = 0; i < vm.userSaveOrUpDto.roleList.length; i++) {
            if (item.roleFid === vm.userSaveOrUpDto.roleList[i].roleFid) {
              vm.userSaveOrUpDto.roleList.splice(i, 1)
            }
          }
        })
      }
    },
    filters: {
      userStatusFilter (val) {
        switch (val) {
          case 0:
            return '停用'
          case 1:
            return '启用'
        }
      },
      roleStatusBtnFilter (val) {
        switch (val) {
          case 0:
            return '启用'
          case 1:
            return '停用'
        }
      },
      empValidFilter (val) {
        switch (val) {
          case 0:
            return '无效'
          case 1:
            return '有效'
        }
      }
    },
    created () {
      this.listUser()
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
