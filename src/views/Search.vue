<template>
    <div class="search">
        <div class="query">
            <!-- <input type="text" v-model="mytext">
            <button @click="handleChangepage">取消</button> -->
            <div>
            <van-search
            v-model="mytext"
            show-action autofocus="true"
            placeholder="搜索关键词"
            @cancel="handleChangepage"
           
        /> 
            </div>
        </div>
        <div v-show="mytext">
            <ul v-if="searchDatalist.length">
                <!-- <li
                    v-for="data in searchDatalist"
                    :key="data.cinemaId"
                >{{data.name}}
                </li> -->
                <CinemaItem
                    v-for="data in searchDatalist"
                    :key="data.cinemaId"
                    :data="data"
                >
                </CinemaItem>
            </ul>
            <div v-else>
                没有找到匹配的影院
            </div>
        </div>
         <div class="distance" v-show="!mytext">
             <p>离你最近</p>
             <!-- <ul>
                 <li
                    v-for="data in topDataList"
                    :key="data.cinemaId"
                 >
                    {{data.name}}
                 </li>
             </ul> -->
             <van-list>
                <van-cell 
                v-for="data in topDataList" 
                :key="data.cinemaId" 
                :title="data.name"
                :label="data.adress"
                @click="clickMe(data.cinemaId)"
                 />
             </van-list>
         </div>
    </div>
</template>
<script>
import Vue from 'vue';
import CinemaItem from "./Cinema/CinemaItem"
import {Search,List,Cell} from 'vant';
Vue.use(Search);
Vue.use(List);
Vue.use(Cell);
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
    methods:{
        handleChangepage(){
            this.$router.back()
        },
        clickMe(cinemaId){
            console.log(cinemaId)
            //跳转
            // this.$router.push("/detail/"+cinemaId)
        },
        ...mapActions("cinema",["getCinemaActions"]),
        ...mapMutations("tabbar",["hide","show"])
    },
    mounted(){
        this.hide()
        if(this.cinemaList.length>0){

        }else{
            this.getCinemaActions()
        }
    },
    destroyed(){
        this.show()
    }
}
</script>
<style lang="scss">
    *{
        margin: 0 auto;
        padding: 0;
    }
    
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
                margin-left: 10px;
                height: 30px;
                list-style: none;
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