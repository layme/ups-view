<template>
    <div class="home">
        <z-card v-for="(x,index) in systemList" :key="index" :img="x.img" :name="x.name" :desc="x.desc"
                :url="x.url"></z-card>
    </div>
</template>

<script>
    import ZCard from '../components/Zcard'

    export default {
        components: { ZCard },
        data () {
            return {
                systemList: [{
                    img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542887056930&di=49be4dbf84bdd09f8929e2ccb1666837&imgtype=0&src=http%3A%2F%2Fimg.25pp.com%2Fuploadfile%2Fapp%2Ficon%2F20170821%2F1503317922336696.jpg',
                    name: 'Z-space BSM',
                    desc: 'Z-space空间管理系统',
                    url: 'http://zspace.bsm.ziroom.com'
                }, {
                    img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542887056930&di=49be4dbf84bdd09f8929e2ccb1666837&imgtype=0&src=http%3A%2F%2Fimg.25pp.com%2Fuploadfile%2Fapp%2Ficon%2F20170821%2F1503317922336696.jpg',
                    name: 'Z-space BSM',
                    desc: 'Z-space空间管理系统',
                    url: 'http://zspace.bsm.ziroom.com'
                }]
            }
        }
    }
</script>

<style scoped lang="less">
    .home {
        text-align: center;
        width: 100%;
    }
</style>
