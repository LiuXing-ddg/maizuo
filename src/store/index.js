import Vue from 'vue'
import Vuex from 'vuex'
import instance from "@/utils/http"
import cinema from "./module/cinemamodule"
import tabbar from "./module/tabbarmodule"
import city from "./module/city"
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState({
        reducer(data) {
            return {
                city: data.city
            }
        }
    })],
    state: {

    },
    mutations: {

    },
    actions: {},
    getters: {},
    modules: {
        cinema,
        tabbar,
        city
    },
})