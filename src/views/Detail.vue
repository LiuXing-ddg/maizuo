<template>
    <div class="detail" v-if="filmInfo">
        <m-title v-title="40" @back="handleBack">
            {{filmInfo.name}}
        </m-title>
        <div class="imgbox">
            <img :src="filmInfo.poster" alt="">
        </div>
        <div class="film-detail">
            <div class="col">
                <div class="film-name">
                    <span class="name">{{filmInfo.name}}</span>
                    <span class="item">{{filmInfo.filmType.name}}</span>
                </div> 
                <div class="film-grade">
                    <span class="grade">{{filmInfo.grade}}</span> 
                    <span class="grade-text">分</span>
                </div>
            </div> 
        <div class="type grade-text">{{filmInfo.category}}</div>
        <div class="time grade-text">{{filmInfo.premiereAt | dateFilter}}</div> 
        <div class="adress grade-text">{{filmInfo.nation}} | {{filmInfo.runtime}}分钟</div>
        <div class="contend grade-text" :class="{synopsis:isActive}">{{filmInfo.synopsis}}</div> 
        <div class="toggle"><i @click="isActive=!isActive" class="iconfont" :class="isActive?'icon-xiangxia':'icon-xiangshang'"></i></div>
        </div>
        <!---演员列表--->
        <div class="yy">
            <h4>演职人员</h4>
            <Swiper v-if="filmInfo.actors" cName="actors">
            <li v-for="(data,index) in filmInfo.actors"
                :key="data.name"
                class="swiper-slide"
                v-swiper="{
                    current:index,
                   
                    length:filmInfo.actors.length,
                    swipe:'actors',
                    free:{
                        slidesPerView: 3.2,
                        spaceBetween: 30,
                        freeMode: true,
                    }
                }"
            >   
                <img :src="data.avatarAddress" alt="">
                <span class="actors-name">{{filmInfo.actors[index].name}}</span>
                <span class="actors-role">{{filmInfo.actors[index].role}}</span>
            </li>
            </Swiper>
            <div v-else>暂无演职人员</div>
        </div>
        <div class="pic">
            <div class="jz">
                <span class="one">剧照</span>
                <span class="all" @click="isPhotoShow=true">全部({{filmInfo.photos && filmInfo.photos.length}})</span>
            </div>
       <Swiper v-if="filmInfo.photos" cName="photos">
            <div v-for="(data,index) in filmInfo.photos"
                :key="data"
                class="swiper-slide"
                @click="previewImg(index)"
                v-swiper="{
                    current:index,
                    length:filmInfo.photos.length,
                    swipe:'photos',
                    free:{
                        slidesPerView: 2.2,
                        spaceBetween: 30,
                        freeMode: true,
                    }
                }"
            >   
                <img :src="data" alt="">
            </div>
        </Swiper>
        <div v-else>暂无剧照</div>
        <Photo @event="previewImg" v-show="isPhotoShow" :list="filmInfo.photos">
            <m-title @back="handlePhoto">
                剧照({{filmInfo.photos && filmInfo.photos.length}})
            </m-title>

        </Photo>
        </div>
    </div>
</template>
<script>
import instance from "@/utils/http"
import Swiper from "@/components/Swiper"
import Vue from "vue"
import Photo from "./Detail/Photo"
import {ImagePreview} from 'vant';
Vue.use(ImagePreview);
export default {
     components:{
        Swiper,
        Photo
    },
    data(){
        return{
            filmInfo:null,
             isActive:true,
             isPhotoShow:false

        }
    },
    methods:{
        handlePhoto(){
             this.isPhotoShow = false
        },
        handleBack(){
            this.$router.back()  //采用的编程式导航跳转
        },
        previewImg(index){
            ImagePreview({
                images:this.filmInfo.photos,
                startPosition:index,
                closeable:true
            })
        }
    },
    created(){
        instance.get(`/gateway?filmId=${this.$route.params.id}&k=839204`,{
            headers:{
                'X-Host':'mall.film-ticket.film.info'
            }
        }).then(res=>{
            this.filmInfo=res.data.data.film
        })
    }
}
</script>
<style lang="scss" scoped>
img{
        width: 100%;
    }
    .imgbox{
        width: 100%;
        img{
             width: 100%;
        }
    }
    .film-detail {
        padding: 15px;
        padding-top: 12px;
        background-color: #fff;
        .toggle{
            text-align: center;
        }
        .col{
            height: 26.5px;
        }
        .film-name {
        width: 250px;
        float: left;
            .name {
            color: #191a1b;
            font-size: 18px;
            height: 24px;
            line-height: 24px;
            margin-right: 7px;
            }
           .item {
            font-size: 9px;
            color: #fff;
            background-color: #d2d6dc;
            height: 14px;
            line-height: 14px;
            padding: 0 2px;
            border-radius: 2px;
            display: inline-block;
            }
        }
        .film-grade {
            width: calc(100% - 250px);
            text-align: right;
            color: #ffb232;
            text-align: right;
            float: left;
            .grade {
                font-size: 18px;
                font-style: italic;
                text-align: right;
                color: #ffb232;
            }
            .grade-text {
                font-size: 10px;
                text-align: right;
                color: #ffb232;
            }
        }
        .grade-text {
            font-size: 13px;
            color: #797d82;
            margin-top: 5px;
        }
        .synopsis{
            height: 50px;
            overflow: hidden;
        }
    }
    .yy{
        background-color: #fff;
        width: 100%;
        
        padding-left: 15px;
    }
    .swiper-wrapper li{
        margin-right: 20px !important  ;
    }
    .actors-name{
        display: block;
        text-align: center;
        padding-top: 10px;
        font-size: 12px;
        color: #191a1b;
        width: 85px;
        height: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .actors-role{
        display: block;
        text-align: center;
        font-size: 10px;
        color: #797d82;
    }
    .detail{
        margin-bottom: 80px;
    }
    .pic{
        .jz{
            height: 62px;
            width: 100%;
            padding: 15px;
            .one {
                font-size: 16px;
                text-align: left;
                color: #191a1b;
                display: inline-block;
                height: 22.5px;
                line-height: 22px;
                font-size: 18px;
                font-weight: bold;
            }
            .all{
                font-size: 13px;
                color: #797d82;
                margin-left: 250px;
                display: inline-block;
                height: 22.5px;
                line-height: 22px;
            }
        }
    }
    div {
        box-sizing: border-box;
        }
        .swiper-wrapper div{
            margin-right: 10px !important  ;
        }
</style>