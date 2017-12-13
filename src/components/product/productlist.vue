<template>
<div>
    <category v-on:child-say="listenToMyBoy"></category>
    <div v-for="item in data" v-if="item.cateid==cateid">
        {{item.spuname}}
    </div>
</div>
</template>
<script>
import category from "@/components/product/category.vue";
export default{
    name:"productlist",
    components:{
        category
    },
    data(){
        return {
            data:null,
            cateid:null
        }
    },
    mounted:()=>{
        // this.getProductlist();
        //   this.$http.get("/static/json/products.json").then(
        //         response => {
        //         this.data = response.data;
        //         },
        //         response => {
        //         // 响应错误回调
        //         alert("服务器请求失败");
        //         }
        //     );
    },
    methods:{
        listenToMyBoy: cateid=>{
            console.log(cateid);
            this.cateid=cateid;
            console.log(this.cateid);
            this.getda();
            // getProductlist();
        },
        getda:function(){

        },
        getProductlist:function(){
            // this.axio({
            //     url:"/static/json/products.json",
            //     dataType:"json",
            //     success:(response)=>{
            //         this.data=response.data;
            //     },
            //     error:(response)=>{
            //         layer.alert("报错啦");
            //     }
            // })
            
            // this.$http.get("/static/json/products.json").then(
            //     response => {
            //     this.data = response.data;
            //     },
            //     response => {
            //     // 响应错误回调
            //     alert("服务器请求失败");
            //     }
            // );
        }
    }
}
</script>