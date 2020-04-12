<template>
    <div class="cinema">
        <div class="title">
            <div class="left" @click="handleChangePage('/city')">{{cityName}}</div>
            <div>影院</div>
            <div class="right" @click="handleChangePage('/cinema/search')"><i class="iconfont icon-sousuo"></i></div>
        </div>
        <div class="select">
            <div :class="isAreaShow?'active':''" class="left" @click="isAreaShow=!isAreaShow">{{current}}</div>
            <div>App订票</div>
            <div class="right">最近去过</div>
        </div>
        <!--点击城市切换-->
        <div class="area" v-show="isAreaShow">
            <ul>
                <li 
                    v-for="data in areaList"
                    :key="data"
                    @click="handleArea(data)"
                    :class="{active:data===current}"
                >{{data}}</li>
            </ul>
        </div>

        <div class="content" :style="{height:scrollHeight,overflow:'hidden'}">
            <ul>
                <CinemaItem
                    v-for="data in computedDatalist"
                    :key="data.cinemaId"
                    :data="data"
                    @click="clickme"
                >
                </CinemaItem>
            </ul>
        </div>
    </div>
</template>
<script>
import instance from "@/utils/http"
import CinemaItem from "./Cinema/CinemaItem"
import {mapState, mapActions,mapMutations} from "vuex"
import Vue from "vue"
import {Toast} from 'vant'
import BetterScroll from "better-scroll"
Vue.use(Toast);
export default {
    components:{
        CinemaItem
    },
     data(){
        return{
            isAreaShow:false,
            datalist:[], 
            current:"全城",
            scrollHeight:0
        }
    },
    methods:{
        handleArea(data){
           this.current=data
           this.isAreaShow=false;
        },
        handleChangePage(path){
            if(path==="/city"){
                this.setCinemaList([])
            }
            this.$router.push(path)
        },
        ...mapActions("cinema",["getCinemaActions"]),
        ...mapMutations("cinema",["setCinemaList"]),
        clickme(){
            alert("可以传数据 继续写影院详情")
        }
    },
   computed:{
       ...mapState("cinema",["cinemaList"]),
       ...mapState("city",["cityName","cityId"]),
         areaList(){
            let newarr=this.cinemaList.map(item=>item.districtName);
            let arealist=["全城",...Array.from(new Set(newarr))];
            return arealist
        }, 
        computedDatalist(){
            if(this.current==="全城") return this.cinemaList
          return this.cinemaList.filter(item=>item.districtName===this.current)
        }
    },
   created(){
       const toast=Toast.loading({
           message:'亲！别急,正在拼命为您加载',
           forbidClick:true,
           duration:0,
           overlay:true
       })
       if(this.cinemaList.length>0){
           toast.clear()
       }else{
           //触发vuex里面的公用请求数据的方法
           this.getCinemaActions(this.cityId).then(res=>{
               toast.clear()
           })
       }
    },
    mounted(){
        this.scrollHeight=document.documentElement.clientHeight-80-50+"px"
        new BetterScroll(".content",{
            scrollbar:{
                fade:true
            },
            click:true
        })
    }
    }
</script>
<style lang="scss" scoped>
*{
    margin: 0 auto;
    padding: 0px;
}
li{
    list-style: none;
}
    .active{
            border:1px solid orange!important;
            color: orange;
    }
    .title{
        display: flex;
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        background: #fff;
        height: 40px;
        line-height: 40px;
        padding:0 10px;
        border-bottom: 1px solid #f5f5f5;
        z-index: 999;
        div{
            flex: 1;
            text-align: center;
        }
        .left{
            text-align: left;
        }
        .right{
            text-align: right;
        }
    }
    .select{
        position: fixed;
        top: 40px;
        height: 40px;
        line-height: 40px;
        background: #fff;
        width: 100%;
        display: flex;
        border-bottom: 1px solid #f5f5f5;
        z-index: 999;
        div{
            flex: 1;
            text-align: center;
        }
    }
   .area{
        position: fixed;
        top: 80px;
        left: 0px;
        width: 100%;
        z-index: 10;
        background: #fff;
        ul{
            display: flex;  
            flex-wrap: wrap;
            li{
                width:26%;
                padding: 5px;
                border:1px solid #f4f4f4;
                text-align: center;
                margin:5px;
            }
        }
    }
    .content{
        position: relative;
        top: 80px;
        li{
            padding:15px;
            border-bottom: 1px solid #f5f5f5;
        }
    }
    .right i{
        float: right;
        margin-right: 20px;
    }
</style>