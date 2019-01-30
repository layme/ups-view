<template>
  <div>
    <el-card class="box-card">
      <el-form :inline="true" :model="formParam" class="demo-form-inline">
        <el-form-item label="选择应用">
          <el-select v-model="formParam.appCode" placeholder="请选择">
            <el-option
              v-for="(item,index) in appOptions"
              :key="index"
              :label="item.appName"
              :value="item.appCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="treeRes" plain>查 询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card menu-card">
          <div slot="header">
            <span>资源树预览</span>
          </div>
          <el-tree
            ref="resTree"
            v-loading="treeLoading"
            :data="resTree"
            :props="defaultProps"
            @node-click="handleNodeClick"
            :highlight-current="true"
            node-key="id"
            :default-expanded-keys="[1]"
          ></el-tree>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="box-card edit-box">
          <div slot="header">
            <span>资源编辑</span>
            <el-button icon="el-icon-circle-plus-outline" style="float: right; padding: 8px;" type="primary"
                       @click="openSaveOrUp()" plain>添 加
            </el-button>
          </div>
          <el-table
            :data="resList"
            stripe
            size="mini"
            v-loading="resListLoading"
            style="width: 100%">
            <el-table-column
              prop="resName"
              label="名称">
            </el-table-column>
            <el-table-column
              min-width="180"
              prop="resPath"
              label="URL地址">
            </el-table-column>
            <el-table-column
              prop="orderNo"
              label="排序">
            </el-table-column>
            <el-table-column
              label="状态">
              <template slot-scope="scope">{{ scope.row.resStatus | resStatusFilter }}</template>
            </el-table-column>
            <el-table-column
              label="类型">
              <template slot-scope="scope">{{ scope.row.resType | resTypeFilter }}</template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button @click="openSaveOrUp(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="stopOrStartConfirm(scope.$index)" type="text" size="small">{{ scope.row.resStatus |
                  resStatusBtnFilter }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination class="pagination"
                         @current-change="handleCurrentChange"
                         :current-page.sync="resListDto.page"
                         :page-size="resListDto.limit"
                         layout="total, prev, pager, next"
                         :total="resTotal">
          </el-pagination>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
      <el-form :model="resSaveOrUpDto" status-icon :rules="rules" ref="resForm">
        <el-form-item prop="appName">
          <el-input v-model="resSaveOrUpDto.parentName" placeholder="上级名称 (非必填)" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item prop="resName">
          <el-input v-model.trim="resSaveOrUpDto.resName" placeholder="资源名称 (必填 最多8个字)" maxlength="8"></el-input>
        </el-form-item>
        <el-form-item prop="resType">
          <el-select v-model="resSaveOrUpDto.resType" placeholder="请选择资源类型  (必填)"
                     style="width: 100%" @change="resTypeChange">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <div v-if="isView">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item prop="resPath">
                <el-input v-model.trim="resSaveOrUpDto.resPath" placeholder="资源访问路径 (必填 最多20个字)"
                          maxlength="20"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="resPosition">
                <el-input v-model.trim="resSaveOrUpDto.resPosition" placeholder="资源存储路径 (必填 最多20个字)"
                          maxlength="20"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div v-else>
          <el-form-item prop="resPath">
            <el-input v-model.trim="resSaveOrUpDto.resPath" placeholder="资源路径 (必填 最多20个字)" maxlength="20"></el-input>
          </el-form-item>
        </div>
        <el-form-item prop="resIcon">
          <el-input v-model.trim="resSaveOrUpDto.resIcon" placeholder="资源图标 (非必填 最多15个字)" maxlength="15"></el-input>
        </el-form-item>
        <el-form-item prop="orderNo">
          <el-input v-model.number.trim="resSaveOrUpDto.orderNo" placeholder="排序 (必填)" maxlength="2"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="validForm('resForm')" plain>保 存</el-button>
      </div>
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
          appCode: ''
        },
        appOptions: [],
        treeLoading: false,
        resTree: [],
        currentNode: null,
        defaultProps: {
          children: 'childrenList',
          label: 'resName'
        },
        resListDto: {
          appCode: '',
          parentFid: '',
          page: 1,
          limit: 10
        },
        resListLoading: false,
        resList: [],
        resTotal: 0,
        dialogVisible: false,
        title: '添加资源',
        options: [{
          label: '菜单',
          value: 1
        }, {
          label: '页面',
          value: 2
        }, {
          label: '操作',
          value: 3
        }],
        isView: false,
        resSaveOrUpDto: {
          fid: '',
          appCode: '',
          parentFid: '',
          parentName: '',
          resName: '',
          resIcon: '',
          resPath: '',
          resPosition: '',
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
          resPosition: [
            { required: true, message: '请输入资源路径', trigger: 'blur' }
          ],
          orderNo: [
            { required: true, message: '请输入序号', trigger: 'blur' },
            { type: 'number', message: '序号必须为数字值' }
          ],
          resType: [
            { required: true, message: '请选择资源类型', trigger: 'change' }
          ]
        },
        resStopOrStartDto: {
          resFid: '',
          resStatus: ''
        }
      }
    },
    methods: {
      //
      treeRes () {
        let vm = this
        vm.currentNode = null
        vm.resList = []
        vm.resTotal = 0
        vm.treeLoading = true
        instance.get('/api/resource/tree',
          { params: vm.formParam })
          .then((resp) => {
            if (resp.data.code === 200) {
              if (resp.data.body.length > 0) {
                vm.resTree = [(
                  {
                    id: 1,
                    resName: '根目录',
                    resFid: '0',
                    childrenList: resp.data.body
                  }
                )]
              } else {
                vm.resTree = []
              }
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
      //
      listRes () {
        let vm = this
        if (!vm.currentNode) {
          return
        }
        vm.resListLoading = true
        vm.resListDto.appCode = vm.formParam.appCode
        vm.resListDto.parentFid = vm.currentNode.resFid
        instance.get('/api/resource/list',
          { params: vm.resListDto })
          .then((resp) => {
            if (resp.data.code === 200) {
              vm.resTotal = resp.data.body.total
              vm.resList = resp.data.body.rows
            } else {
              this.$message({
                message: resp.data.message,
                type: 'warning'
              })
            }
            vm.resListLoading = false
          })
          .catch((err) => {
            vm.resListLoading = false
            catchError(err)
          })
      },
      handleCurrentChange (val) {
        this.listRes()
      },
      //
      openSaveOrUp (val) {
        let vm = this
        vm.dialogVisible = true
        vm.resetForm('resForm')
        if (val) {
          vm.title = '修改资源'
          vm.resSaveOrUpDto.fid = val.fid
          vm.resSaveOrUpDto.appCode = val.appCode
          vm.resSaveOrUpDto.parentFid = val.parentFid
          vm.resSaveOrUpDto.parentName = val.parentName
          vm.resSaveOrUpDto.resName = val.resName
          vm.resSaveOrUpDto.resIcon = val.resIcon
          vm.resSaveOrUpDto.resPath = val.resPath
          vm.resSaveOrUpDto.resPosition = val.resPosition
          vm.resSaveOrUpDto.orderNo = val.orderNo
          vm.resSaveOrUpDto.resType = val.resType
          vm.isView = val.resType === 2
        } else {
          vm.title = '添加资源'
          vm.resSaveOrUpDto.appCode = vm.formParam.appCode
          vm.resSaveOrUpDto.parentFid = vm.currentNode.resFid
          vm.resSaveOrUpDto.parentName = vm.currentNode.resName
        }
      },

      resTypeChange (val) {
        this.isView = val === 2
      },

      // 重置表单域
      resetForm (formName) {
        if (this.$refs[formName]) {
          this.$refs[formName].resetFields()
        }
      },

      validForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogVisible = false
            this.saveOrUpRes()
          } else {
            return false
          }
        })
      },
      //
      saveOrUpRes () {
        let vm = this
        instance.post('/api/resource/saveOrUp',
          JSON.stringify(vm.resSaveOrUpDto))
          .then((resp) => {
            if (resp.data.code === 200) {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              vm.listRes()
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
        this.resList[val].resStatus === 1 ? tip = '停用' : tip = '启用'
        this.$confirm('确定' + tip + '吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.stopOrStartRes(val)
        }).catch(() => {
        })
      },
      stopOrStartRes (val) {
        let vm = this
        vm.resStopOrStartDto.resFid = vm.resList[val].fid
        vm.resStopOrStartDto.resStatus = vm.resList[val].resStatus
        instance.post('/api/resource/stopOrStart',
          JSON.stringify(vm.resStopOrStartDto))
          .then((resp) => {
            if (resp.data.code === 200) {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              vm.listRes()
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
      handleNodeClick (data) {
        this.currentNode = data
        this.listRes()
      }
    },
    filters: {
      resStatusBtnFilter (val) {
        switch (val) {
          case 0:
            return '启用'
          case 1:
            return '停用'
        }
      },
      resStatusFilter (val) {
        switch (val) {
          case 0:
            return '停用'
          case 1:
            return '启用'
        }
      },
      resTypeFilter (val) {
        switch (val) {
          case 1:
            return '菜单'
          case 2:
            return '页面'
          case 3:
            return '操作'
        }
      }
    },
    created () {
      utils.listAppOptions().then((data) => {
        this.appOptions = data
      })
    },
    watch: {
      appOptions (val) {
        if (val.length > 0) {
          this.formParam.appCode = val[0].appCode
        }
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
