import Vue from "vue"
import moment from "moment"
Vue.filter("actorFilter", data => {
    if (data) {
        return data.map(item => item.name).join(" ")
    } else {
        return "暂无主演"
    }
})
Vue.filter("dateFilter", date => {
    return moment(date * 1000).format("YYYY-MM-DD");
})