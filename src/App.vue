<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import Toolbar from './components/old/toolbar.vue'
import $ from "jquery";
import "./assets/lib/layer/mobile/need/layer.css";
// import layer from './assets/lib/layer/mobile/layer.js' webpack.base.js中设置了，此处不需要引用了
// import './assets/lib/share/js/jquery.share.min.js'
export default {
  name: "app",
  created: function() {
    // this.checkLogin();
     this.checkLogin2();  
  },
  methods: {
    checkLogin: function() {
      if (null == this.cookies.get("session")) {
        this.$router.push({ path: "/newlogin" });
      } else {
        // this.$router.push({ path: "/login" });
      }
    },
    checkLogin2: function() {  
      //请求后端
      this.axi.post("/checklogin", {}).then(
        response => {
          if(response.retCode==1){
            console.log("已登录");
            //跳转
            this.$router.push({path:'/newIndex'});
          }else{
            console.log("请登录");
            this.$router.push({path:'/newlogin'});
          }
        },
        response => {
          alert("Error");
          //Error
        }
      );
    },
  }
  // components: {
  //   // Toolbar
  // },
  // mounted:function(){
  //   // this.share();
  // },
  // methods:{
  //   // share:function(){
  //   //   $('#share-3').share();
  //   // }
  // }
};
</script>
<!--
<style>
/*@import './assets/lib/share/css/share.min.css';*/
  /* @import './assets/css/normalize.css';
  @import './assets/iconfonts/iconfont.css';  */
</style>
<style lang="scss">
  // @import './assets/css/main.scss';  //这样能引入此css 但是svg文件无法解析 报错啦
</style>
-->