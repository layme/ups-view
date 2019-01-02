<template>
  <div>
    <el-row :gutter="40">
    </el-row>
    <el-row :gutter="40" class="main">
      <el-col :span="8" :offset="5">
        <img style="width: 100%" src="../assets/404.jpg"/>
      </el-col>
      <el-col :span="6">
        <el-form :model="loginDto" status-icon :rules="rules" ref="loginForm">
          <el-form-item prop="account">
            <el-input v-model="loginDto.account" placeholder="用户名">
              <i slot="prefix" class="el-input__icon el-icon-star-on"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginDto.password" placeholder="密  码">
              <i slot="prefix" class="el-input__icon el-icon-star-on"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%" type="primary" @click="submitForm('loginForm')">登 录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loginDto: {
          account: '',
          password: ''
        },
        rules: {
          account: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.login()
          } else {
            return false
          }
        })
      },
      login () {
      }
    }
  }
</script>

<style scoped lang="less">
  .main {
    padding-top: 60px;
  }

  .el-form-item {
    font-size: 34px;
  }

</style>
