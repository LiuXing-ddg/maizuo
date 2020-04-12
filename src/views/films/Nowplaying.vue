<template>
    <div class="nowplaying">
        <ul>
            <router-link
                v-for="data in datalist"
                :key="data.filmId"
                :to="{
                    name:'detail',
                    params:{id:data.filmId},                     
                }"
                tag="li"
            >
            <div class="img">
                <img :src="data.poster" alt="">
            </div>
            <div class="dec">
                <div class="name">
                    <span class="one">{{data.name}}</span>
                    <span class="two">{{data.filmType.name}}</span>
                </div>
                <p>观众评分：{{data.grade}}</p>
                <p class="actors">主演:{{data.actors | actorFilter}}</p>
                <p class="label">{{data.nation}} | 110分钟</p>
            </div>
            <div class="buy"><span>购票</span></div>
            </router-link>
        </ul>
    </div>
</template>

<script>
import instance from "@/utils/http"
import {mapState} from "vuex"
export default {
    data(){
        return {
            datalist:[]
        } 
    },
     computed:{
        ...mapState("city",["cityId"])
    },
    created(){
        instance.get(`/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=1&k=9924256`,{
            headers:{
                "X-Host": 'mall.film-ticket.film.list'
            }
        }).then(res=>{
          
            this.datalist=res.data.data.films
        })
    },
}
</script>

<style lang="scss" scoped>
*{
    margin: 0 auto;
    padding:0;
}
    li{
        padding: 15px 15px 15px 0;
        height: 94px;
        position: relative;
        list-style: none;
        .img{
            width: 66px;
            height: 94px;
            background: rgb(249, 249, 249);
            float: left;
            img{
               width: 66px;
                height: 94px;
            }
        }
        .dec{
            float: left;
            padding:5px 10px;
            width: 200px;
            p{
                font-size: 13px;
                margin-top: 4px;
                color: #797d82;
            }
            .name .two{
                font-size: 9px;
                color: #fff;
                background-color: #d2d6dc;
                height: 14px;
                line-height: 14px;
                padding: 0 2px;
                border-radius: 2px;
                display: inline-block;
                vertical-align: middle;
            }
        }
        .buy{
            float: left;
            height: 30px;
            width: 50px;
            text-align: center;
            line-height: 30px;
            margin-top: 28px;
            border: 2px solid pink;
            border-radius: 10px;
            span{
                color: red;
            }
        }
    }
</style>
