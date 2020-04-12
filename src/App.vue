<template>
  <div id="app">
      <router-view></router-view> 
      <Tabbar v-show="isTabbarShow"></Tabbar>
  </div>
</template>
<script>
//引入Tabbar组件
import Tabbar from "@/components/Tabbar"
import {mapState} from "vuex"
export default {
  components:{
    Tabbar
  },
  computed:{
    ...mapState("tabbar",["isTabbarShow"])
  },
  mounted(){
    // console.log(this.$store.state.tabbar.isTabbarShow)
    //console.log(this.isTabbarShow) 
  }
}
</script>


<style lang="scss">
    .app-enter-active{
      animation: move .5s;
    }
    .app-leave-active{
      animation: move .5s reverse;
    }

    @keyframes move{
      0%{
        opacity: 0;
        transform: translateY(50px)
      }
      100%{
        opacity: 1;
        transform: translateY(0px)
      }
    }
</style>


