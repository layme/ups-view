<template>
  <el-menu router :default-active="defaultActive">
    <div v-for="(x,key0) in resourceList" :key="key0">
      <el-submenu v-if="x.children !== undefined && x.children.length > 0" :index="x.path">
        <template slot="title">
          <i :class="x.icon"></i>
          <span>{{ x.name }}</span>
        </template>
        <el-menu-item v-for="(y,key1) in x.children" :key="key1" :index="y.path">
          {{ y.name }}
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else :index="x.path">
        <i :class="x.icon"></i>
        <span slot="title">{{ x.name }}</span>
      </el-menu-item>
    </div>
  </el-menu>
</template>

<script>
  export default {
    name: 'ZMenu',
    props: ['msg', 'defaultActive', 'resourceList']
  }
</script>
