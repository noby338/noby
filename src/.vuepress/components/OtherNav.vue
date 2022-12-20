<template>
    <el-row :gutter="20">
        <el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8" v-for="(cardObj, index) in cardArr" :key="index" class="col">
            <el-card @click.native="gotoSite(cardObj.url)" shadow="hover" :body-style="{ padding: '20px' }">
                <el-row class="box-card-header">
                    <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="4">
                        <img :src="$withBase(cardObj.icon)" :alt="cardObj.title" class="card-ico" />
                    </el-col>
                    <el-col :xs="16" :sm="18" :md="20" :lg="20" :xl="20" class="card-title">
                        <!-- <el-tooltip effect="light" :content="cardObj.desc" placement="bottom-start"> -->
                            {{ cardObj.title }}
                        <!-- </el-tooltip> -->
                    </el-col>
                </el-row>
                <el-row class="box-card-body">
                    {{ cardObj.desc }}
                </el-row>
            </el-card>
        </el-col>
    </el-row>
</template>


<script>
export default {
    name: "OtherNav",
    components: {},
    props: {
        arr: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            cardArr: JSON.parse(this.arr),
            type: 'success',
        }
    },
    methods: {
        gotoSite(url) {
            // 在新标签页打开
            window.open(url, '_blank').location;
        },
    },
}
</script>


<style>
.col {
    margin-top: 20px;
    width: 100%;
}

.box-card-header {
    width: 100%;
    height: 50%;
    padding: 0px;
}

.card-title {
    text-align: right
}


.card-ico {
    width: 30px;
    height: 30px;
    text-align: left;
    pointer-events: none;
}

.box-card-body {
    width: 100%;
    height: 50%;
    padding: 0px;
    font-size: 10px;
    color: #777777;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}

.el-card {
    border-radius: 10px;
    border: none;
    background-color: #ebebeb;
    cursor: pointer;
}
</style>