<template>
    <li @click="clickli">
        <h4>{{data.name}}</h4>
        <p>{{data.address}}</p>
    </li>
</template>

<script>
export default {
    props:["data","click"],
    methods:{
        clickli(){
            this.$emit('click')
        }
    }
}
</script>


<style lang="scss" scoped>
    li{
        padding:15px;
        border-bottom: 1px solid #f5f5f5;
        p{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
</style>
