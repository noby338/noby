<template>
    <el-row :gutter="30">
        <el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8" v-for="(cardObj, index) in cardArr" :key="index"
            style="margin-top:20px;height:120px;width:100%;overflow:auto;">
            <el-card @click.native="gotoSite(cardObj.url)" shadow="hover" :body-style="{ padding: '20px' }">
                <el-row class="box-card-header">
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" style="padding:0px;">
                        <img style="width:30px;height:30px;text-align:left;pointer-events: none;"
                            :src="$withBase(cardObj.icon)" :alt="cardObj.title" />
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" style="padding:0px;">
                        <div style="text-align:right;">
                            {{ cardObj.title }}
                        </div>
                    </el-col>
                </el-row>
                <el-row class="box-card-body">
                    <div style="font-size:10px;color:#777777">{{ cardObj.desc }}</div>
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
.link-style {
    width: 100%;
    height: 100%;
    padding: 0px;
}

.box-card {
    width: 100%;
    height: 100%;
}

.box-card-header {
    width: 100%;
    height: 50%;
    margin-bottom: 1px;
    padding: 0px;
}

.box-card-body {
    width: 100%;
    height: 50%;
    margin-top: 1px;
    padding: 0px;
}

.el-card {
    border-radius: 10px;
    border: none;
    background-color: #eeeeee;
    cursor: pointer;
}

</style>