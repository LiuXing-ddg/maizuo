import Vue from 'vue'
import VueRouter from 'vue-router'
//这行代码如果注释掉，this上面都不存在$router与$route的api了
Vue.use(VueRouter)
    //引入Films组件
import Films from "@/views/Films"
// import Cinema from "@/views/Cinema"
import Center from "@/views/center"
import Nowplaying from "@/views/films/Nowplaying"
import Comingsoon from "@/views/films/Comingsoon"
import Detail from "@/views/Detail"
const routes = [{
        path: "/films",
        component: Films,
        //进行二级路由的配置
        children: [{
                path: "/films/Nowplaying",
                component: Nowplaying,
            },
            {
                path: "/films/Comingsoon",
                component: Comingsoon
            },
            {
                path: "",
                redirect: "/films/nowplaying" //进行一级路由内部的重定向操作  /films ==> /films/nowplaying
            }
        ]
    },
    {
        path: "/cinema",
        component: () =>
            import ( /* webpackChunkName:'cinema' */ "@/views/Cinema") //webpack的代码分割？
    },
    {
        path: "/center",
        component: Center,
    },
    {
        path: "/city",
        component: () =>
            import ("@/views/City")
    },
    {
        path: "/cinema/search",
        component: () =>
            import ("@/views/Search")
    },
    {
        name: "detail",
        path: "/detail/:id",
        component: Detail,
        props: true
    },
    {
        path: "/",
        redirect: '/films' //重定向  / ==> /films ===> /fimls/nowplaying
    }
]
const router = new VueRouter({
    mode: "hash", //默认采用hash模式
    routes
})
export default router