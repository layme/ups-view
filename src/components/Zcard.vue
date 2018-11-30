<template>
    <el-col :span="4" @click="open(url)">
        <el-card :body-style="{ padding: '0px' }" style="margin: 10px" shadow="hover">
            <img :src="img" class="image">
            <div class="bottom">
                <span>{{ name }}</span>
                <div>
                    <span class="desc">{{ desc }}</span>
                    <a :href="url" v-show="false"></a>
                </div>
            </div>
        </el-card>
    </el-col>
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
                console.info("open => ", url)
                window.open(url, '_top')
            }
        }
    }
</script>

<style lang="less" scoped>
    .desc {
        font-size: 13px;
        color: #999;
        margin-top: 13px;
    }

    .image {
        width: 100%;
        display: block;
    }

    .bottom {
        padding: 14px;
        line-height: 24px;
        text-align: left;
    }

    .el-card {
        cursor: pointer;
    }
</style>
