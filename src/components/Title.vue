<template>
    <div class="detailtitle">
        <i class="iconfont icon-fanhui" @click="handleBack"></i>
        <span><slot></slot></span>
    </div>
</template>

<script>
export default {
    methods:{
        handleBack(){
            // this.$router.back()
            // 当用户点击back的时候，希望调用者来去决定做什么样的功能
            this.$emit("back")
        }
    }
}
</script>

<style lang="scss" scoped>
 .detailtitle{
    height:50px;
    width:100%;
    background: #fff;
    position: fixed;
    top:0;
    left:0;
    line-height: 50px;
    text-align: center;
    z-index:10;
    i{
        position: absolute;
        left:0px;
    }
}
</style>
