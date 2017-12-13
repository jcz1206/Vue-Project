<template>
<div class="head">
    <div class="categorylist">
        <div class="nav2">
            <a v-for="item in data.category" @click="onClickMe(item.id)">{{item.catename}}</a>
        </div>
    </div>
    <div class="search"><i class="icon iconfont icon-sousuo"></i></div>
</div>
</template>
<!--
<style  lang="scss" scoped rel="stylesheet/scss">
//这样引入的话，css内图片的路径要写这个component的相对路径
@import '../../assets/css/product/category.scss';
</style>
-->
<script>
import '../../assets/css/product/category.scss';
//这样引入的话，css内图片的路径要写css的相对路径即可
export default {
  name:"category",
  props:["cateid"],
  data(){
      return {
          data:{
              category:[{
                id:"001",
                catename:"水",
                child:[
                    {
                id:"001001",
                catename:"水1"  
                    },
                    {
                id:"001001",
                catename:"水2"  
                    }
                ]
              },
              {
                id:"002",
                catename:"电" 
              },
              {
                id:"003",
                catename:"木" 
              },
              {
                id:"004",
                catename:"土" 
              },
              {
                id:"005",
                catename:"板材" 
              },
              {
                id:"006",
                catename:"五金" 
              },
              {
                id:"007",
                catename:"油漆" 
              }]
            }
      }
  }
,
methods:{
      onClickMe: function(id){
        this.$emit('child-say',id);
      }, getda:function(){
        console.log("===");
        }
}
}
</script>
