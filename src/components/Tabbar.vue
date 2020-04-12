<template>
    <nav>
      <ul>
        <router-link
          v-for="nav in navlist"
          :key="nav.id"
          :to="nav.path"
          tag="li"
          active-class="active"
        >
        <i class="iconfont" :class="nav.icon"></i>
        <span>{{nav.title}}</span>
        </router-link>
      </ul>
    </nav>
</template>

<script>
export default {
    data(){
        return {
        navlist:[
            {id:1,title:"看片",path:"/films",icon:"icon-dianyingyuan"},
            {id:2,title:"影院",path:"/cinema",icon:"icon-goupiao"},
            {id:3,title:"我的",path:"/center",icon:"icon-wodedangxuan"}
        ]
        }
    }
}
</script>

<style lang="scss" scoped>
*{
  margin: 0 auto;
  padding:0px
}
.active{
    color:orange;
  }
  nav{
    position: fixed;
    bottom: 0;
    z-index: 999;
    background: #fff;
    width: 100%;
    border-top: 1px solid #dadada;
    
    // padding-bottom: 50px;
    ul{
      display: flex;
     margin-left: -40px;
      li{
       width: 33.3%;
    text-align: center;
        line-height: 25px;
      
        display: flex;
        flex-direction: column;
      }
    }
  }
</style>
