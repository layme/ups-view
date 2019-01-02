<template>
  <div>
    <el-row>
      <el-form :inline="true" :model="formParam" class="demo-form-inline">
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
    </el-row>
    <el-row>
      <el-table
        ref="roleListTable"
        :data="roleList"
        stripe
        size="mini"
        v-loading="roleListLoading"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色名称">
        </el-table-column>
        <el-table-column
          prop="appName"
          label="所属应用">
        </el-table-column>
      </el-table>
      <el-pagination class="pagination"
                     @current-change="handleCurrentChange"
                     :current-page.sync="formParam.page"
                     :page-size="formParam.limit"
                     layout="total, prev, pager, next"
                     :total="roleTotal">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
  import { instance, catchError } from '../axios'
  import * as utils from '../assets/util'

  export default {
    name: 'ZRoleSelect',
    props: ['selected'],
    data () {
      return {
        rows: JSON.parse(JSON.stringify(this.selected)),
        formParam: {
          appCode: '',
          page: 1,
          limit: 10
        },
        appOptions: [],
        roleListLoading: false,
        roleList: [],
        roleTotal: 0
      }
    },
    methods: {
      listRole () {
        let vm = this
        vm.roleListLoading = true
        instance.get('/api/role/simpleList',
          { params: vm.formParam })
          .then((resp) => {
            if (resp.data.code === 200) {
              vm.roleTotal = resp.data.body.total
              vm.roleList = resp.data.body.rows
              // 等待 DOM 更新后再选中数据
              vm.$nextTick(() => {
                vm.toggleSelection()
              })
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
      handleCurrentChange (val) {
        this.listRole()
      },
      handleSelectionChange (select) {
        let unSelect = []
        if (select.length > 0) {
          this.roleList.forEach((item) => {
            if (select.indexOf(item) === -1) {
              unSelect.push(item)
            }
          })
        } else {
          unSelect = this.roleList
        }
        this.$emit('select', select, unSelect)
      },
      toggleSelection () {
        if (this.rows) {
          this.rows.forEach((row) => {
            this.roleList.forEach((role) => {
              if (row.roleFid === role.roleFid) {
                this.$refs.roleListTable.toggleRowSelection(role, true)
              }
            })
          })
        }
      },
      removeSelection (val) {
        this.roleList.forEach((role) => {
          if (val.roleFid === role.roleFid) {
            this.$refs.roleListTable.toggleRowSelection(role, false)
          }
        })
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
  .pagination {
    margin: 20px 50px 0 0;
    text-align: right;
  }
</style>
