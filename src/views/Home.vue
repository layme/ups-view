<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p class="hello">{{ hello }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hello: '晚上好'
    }
  }
}
</script>

<style scoped>
  .hello {
    color: gainsboro;
  }
</style>
