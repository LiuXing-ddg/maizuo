<template>
    <div class="films">
        <Swiper cName="swipe">
            <div 
                class="swiper-slide"
                v-for="(banner,index) in banners"
                :key="banner.bannerId"
                v-swiper="{
                    current:index,
                    length:banners.length,
                    swipe:'swipe'
                }"
            >
                <img :src="banner.imgUrl" alt="">
            </div>
        </Swiper>
        <Title></Title>
         <router-view></router-view>
    </div>
</template>
<script>
import Title from "@/views/films/title"
import Swiper from "@/components/Swiper"
import instance from "@/utils/http"
import {mapState} from "vuex"
export default {
     components:{
        Title,
        Swiper//注册组件
    },
    data(){
        return{
            banners:[]
        }
    },
    computed:{
        ...mapState("city",["cityId"])
    },
    created(){
        instance.get(`/gateway?type=2&cityId=${this.cityId}&k=4937405`,{
            headers:{
                "X-Host": 'mall.cfg.common-banner'
            }
        }).then(res=>{
            this.banners=res.data.data
        })
    }
}
</script>
<style lang="scss" scoped>
    .swiper-slide{
        img{
            width: 100%;
        }
    }
</style>