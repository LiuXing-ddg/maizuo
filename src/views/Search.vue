<template>
<div class="search">
    <div class="query">
        <!-- <input type="text" v-model="mytext">
        <button @click="handleChangepage">取消</button> -->
       
        <van-search
            v-model="mytext"
            show-action autofocus="true"
            placeholder="搜索关键词"
            @cancel="handleChangepage"
        />
       
        <div v-show="mytext">
            <ul v-if="searchDatalist.length">
                <Cinema-item
                    v-for="data in searchDatalist"
                    :key="data.cinemaId"
                    :data="data"
                >
                </Cinema-item>
            </ul>
            <div v-else>
                没有匹配到你输入影院
            </div>
        </div>
    </div>

   <div v-show="!mytext" class="distance">
       <p>离你最近</p>
       <ul>
           <!-- <li
            v-for="data in topDataList"
            :key="data.cinemaId"
           >{{data.name}}
           </li> -->
           <van-list>
               <van-cell v-for="data in topDataList" 
               :key="data.cinemaId" 
               :title="data.name" 
               :label="data.address"
               @click="clickMe(data.cinemaId)"
               />
           </van-list>
       </ul>
   </div>
   </div>
</template>
<script>
import Vue from 'vue';
import {Search,List,Cell} from 'vant';
Vue.use(Search);
Vue.use(List)
Vue.use(Cell)
import CinemaItem from "./Cinema/CinemaItem"
import {mapState,mapGetters,mapActions,mapMutations} from "vuex"
export default {
    components:{
        CinemaItem
    },
    data(){
        return{
            mytext:""
        }
    },
    methods:{
        clickMe(cinemaId){
            console.log(cinemaId)
            this.$router.push(`/cinema/${cinemaId}/film`)
        },
        handleChangepage(){
            this.$router.back()
        },
        ...mapActions("cinema",["getCinemaActions"]),
        ...mapMutations("tabbar",["hide","show"])
    },
    computed:{
        ...mapState("cinema",["cinemaList"]),
        ...mapGetters("cinema",["topDataList"]),
        searchDatalist(){
            return this.cinemaList.filter(item=>item.name.includes(this.mytext)||
                item.name.toUpperCase().includes(this.mytext) ||  
                item.name.toLowerCase().includes(this.mytext)
            )
        }
    },
    mounted(){
        this.hide()
        if(this.cinemaList.length>0){
            // console.log("seach 使用vuex缓存的数据")
        }else{
            this.getCinemaActions()
        }
    },
    destroyed(){
        this.show()
    }
}
</script>
<style lang="scss" scoped>
    .distance{
        padding-left:10px;
        p{
            font-size: 13px;
            line-height: 13px;
            color: #bdc0c5;
            margin: 18px 0;
        }
        ul{
            display: flex;
            flex-wrap: wrap;
            li{
                margin-bottom: 10px;
                margin-right: 10px;
                height: 30px;
                background-color: hsla(0,0%,96%,.6);
                line-height: 14px;
                border-radius: 3px;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                font-size: 13px;
                padding: 8px 12px;
            }
        }
    }
</style>