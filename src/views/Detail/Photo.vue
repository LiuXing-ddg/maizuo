<template>
    <div class="photo">
       <slot></slot>
       <ul>
            <li @click="previewImg(index)" v-for="(data,index) in list" :key="data">
                <img :src="data" alt="">
            </li>
        </ul>
    </div>
</template>
<script>
import Vue from "vue"
import {ImagePreview} from 'vant';
Vue.use(ImagePreview);
export default {
    props:["list"],
    methods:{
        previewImg(index){
            this.$emit("event",index)
        }
    }
}
</script>
<style lang="scss" scoped>
*{
    margin: 0 auto;
    padding:0;
}
    .photo{
        position: fixed;
        top:0;
        left:0;
        width:100%;
        min-height:100%;
        background: #fff;
        z-index:10;
        overflow-y:auto;  
        ul{
            position: relative;
            top:50px;
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            
            li{
               width: 48%;
               list-style: none;
               padding: 3px;
                img{
                    width:100%;
                    height:100%;
                }
            }
        }
    }
</style>