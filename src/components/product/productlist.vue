<template>
<div>
    <category v-on:child-say="listenToMyBoy"></category>
    <!-- =={{cateid}}== -->
    <div v-for="item in data" v-if="item.cateid==cateid">
        {{item.spuname}}
    </div>
    <div v-for="item in productlist" >
        <div class="prodimg">tupian</div>
        <div class="prodcon">
            <div class="prodname">{{item.spuname}}</div>
            <!-- <div class="prodname">guige</div> -->
            <div>
                <div class="prodprice">
                    <div>{{item.sku[0].salePrice}}</div>
                    <div>{{sumStock|item.sku}}</div>
                </div>
                <div class="prodcart"><i ckass="icon iconfont icon-gouwuchetianjia"></i></div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import '@/assets/css/base/common.scss'
import category from "@/components/product/category.vue";
export default{
    name:"productlist",
    components:{
        category
    },
    data(){
        return {
            data:null,
            cateid:"jksdf",
            productlist:[]
        }
    },
    methods:{
        listenToMyBoy: cateid=>{
            // console.log(cateid+"====");
            // this.cateid=cateid;
            // this.getProductlist(cateid);
        },
        getProductlist:function(cateid){
            // console.log(this.cateid);            
            this.$http.get("/static/json/products.json").then(
                response => {
                    this.data = response.data;
                    response.data.forEach((spu)=>{
                        if(spu.cateid==cateid){
                            this.productlist.push(spu);
                            this.productlist.push(spu);
                            this.productlist.push(spu);
                            this.productlist.push(spu);
                            this.productlist.push(spu);
                        }
                        // console.log(spu.spuname)
                    });
                },
                response => {
                // 响应错误回调
                alert("服务器请求失败");
                }
            );
        }
    }
}
</script>

<!--
            /*
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
            */
            -->