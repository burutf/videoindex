<template>
    <div class="user">
        <el-button type="primary" round>登陆</el-button>
    </div>
</template>

<script>
    export default {
        name:'User'
    }
</script>

<style lang="less" scoped>
.user{
    padding: 10px
}


@media (max-width: 560px) {
  .user {
    box-shadow: -20px 0px 13px -22px rgba(95, 95, 95, 0.664);
  }
}
</style>