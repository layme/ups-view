<template>
  <el-row :gutter="40" class="main">
    <el-col :span="8" :offset="5">
      <img style="width: 100%" src="../assets/404.jpg"/>
    </el-col>
    <el-col :span="6">
      <el-row class="grid-font">
        <div>
          唉呀呀，
        </div>
        <div>
          页面找不到 le...
        </div>
        <div>
          >_&lt;
        </div>
      </el-row>
      <el-row style="margin-top: 20%">
        <el-button icon="el-icon-back" @click="goBack"> 返回上一个页面</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data () {
      return {}
    },
    methods: {
      goBack () {
        this.$router.back()
      }
    }
  }
</script>

<style scoped lang="less">
  .main {
    padding-top: 60px;
  }

  .grid-font {
    font-size: 34px;
  }

</style>
