<template>
    <div class="tab">
        <div><span @click="handleChangePage('/films/Nowplaying')">正在热映</span></div>
        <div><span @click="handleChangePage('/films/Comingsoon')">即将上映</span></div>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
    methods:{
        handleChangePage(path){
            this.$router.push(path)
        }
    }
}
</script>
<style lang="scss" scoped>
   .tab{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        height: 30px;
        div{
            width: 50%;
            text-align: center;
        }
    }
</style>