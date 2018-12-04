<template>
  <div class="about">
    <el-card class="box-card">
      <el-form :inline="true" :model="formParam" class="demo-form-inline">
        <el-form-item label="角色名称">
          <el-input v-model="formParam.name" placeholder="角色名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色类型">
          <el-select v-model="formParam.type" placeholder="请选择" clearable>
            <el-option
              v-for="item in roleTypeOptions"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择系统">
          <el-select v-model="formParam.systemCode" placeholder="请选择" clearable>
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
      <el-row type="flex" class="row-bg" justify="end">
        <el-col :span="1">
          <el-button icon="el-icon-circle-plus-outline" type="primary" @click="addMenu" plain>添 加</el-button>
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
          prop="systemName"
          label="系统名称">
        </el-table-column>
        <el-table-column
          prop="type"
          label="角色类型">
        </el-table-column>
        <el-table-column
          prop="modifyTime"
          label="修改时间">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">停用</el-button>
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
  </div>
</template>

<script>
  export default {
    data () {
      return {
        formParam: {
          name: '',
          type: '',
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
        roleTypeOptions: [{
          name: '普通角色',
          code: '0'
        }, {
          name: '数据区域角色',
          code: '1'
        }, {
          name: '区域角色',
          code: '2'
        }, {
          name: '数据角色',
          code: '3'
        }],
        roleList: [],
        total: 0
      }
    },
    methods: {
      findSystem () {
        console.log('findSystem!')
      },
      addMenu () {
        console.log('addMenu!')
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
