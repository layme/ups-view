<template>
  <div>
    <el-row>
      <el-form :inline="true" :model="formParam" class="demo-form-inline">
        <el-form-item label="工号">
          <el-input v-model="formParam.empCode" placeholder="工号" clearable></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formParam.empName" placeholder="姓名" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="listEmp" plain>查 询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-table
        :data="empList"
        stripe
        size="mini"
        v-loading="empListLoading"
        style="width: 100%">
        <el-table-column label="" width="55">
          <template slot-scope="scope">
            <el-radio :label="scope.row.fid" v-model="radio" @change.native="handleCurrentRow(scope.row)">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop="empCode"
          label="工号">
        </el-table-column>
        <el-table-column
          prop="empName"
          label="姓名">
        </el-table-column>
        <el-table-column
          label="性别">
          <template slot-scope="scope">{{ scope.row.empSex | empSexFilter }}</template>
        </el-table-column>
        <el-table-column
          prop="postName"
          label="职位">
        </el-table-column>
      </el-table>
      <el-pagination class="pagination"
                     @current-change="handleCurrentChange"
                     :current-page.sync="formParam.page"
                     :page-size="formParam.limit"
                     layout="total, prev, pager, next"
                     :total="empTotal">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
  import { instance, catchError } from '../axios'
  export default {
    props: ['selected'],
    data () {
      return {
        formParam: {
          empCode: '',
          empName: '',
          empValid: 1,
          page: 1,
          limit: 10
        },
        empListLoading: false,
        empList: [],
        empTotal: 0,
        radio: this.selected
      }
    },
    methods: {
      listEmp () {
        let vm = this
        vm.empListLoading = true
        instance.get('/api/employee/list',
          { params: vm.formParam })
          .then((resp) => {
            if (resp.data.code === 200) {
              vm.empTotal = resp.data.body.total
              vm.empList = resp.data.body.rows
            } else {
              this.$message({
                message: resp.data.message,
                type: 'warning'
              })
            }
            vm.empListLoading = false
          })
          .catch((err) => {
            vm.empListLoading = false
            catchError(err)
          })
      },
      handleCurrentChange (val) {
        this.listEmp()
      },
      handleCurrentRow (val) {
        this.$emit('select', val)
      }
    },
    filters: {
      empSexFilter (val) {
        switch (val) {
          case 0:
            return '女'
          case 1:
            return '男'
        }
      }
    },
    created () {
      this.listEmp()
    }
  }
</script>

<style scoped lang="less">
  .pagination {
    margin: 20px 50px 0 0;
    text-align: right;
  }
</style>
