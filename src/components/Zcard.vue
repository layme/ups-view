<template>
    <el-card shadow="hover" @click="open(url)">
        <img :src="img" class="image">
        <div style="padding: 14px; text-align: left">
            <span>{{ name }}</span>
            <br/>
            <span class="desc">{{ desc }}</span>
        </div>
        <a :href="url" v-show="false"></a>
    </el-card>
</template>

<script>
    export default {
        name: 'Z-card',
        props: {
            img: String,
            name: String,
            desc: String,
            url: String
        },
        methods: {
            open (url) {
                window.open(url, '_blank')
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-card {
        padding: 0px;
        margin: 10px;
        width: 300px;
        float: left;
    }

    .desc {
        font-size: 13px;
        color: #999;
        margin-top: 13px;
        line-height: 12px;
    }

    .image {
        width: 100%;
        display: block;
    }

    .el-card {
        cursor: pointer;
    }
</style>
