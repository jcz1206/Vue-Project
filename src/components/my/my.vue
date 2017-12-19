<template>
  <div>
      <!-- <router-link :to="setting">设置</router-link> -->
      <a href="#/setting">设置</a>
      <a href="javascript:;" @click="loginOut()">退出</a>
  </div>
</template>
<script>
export default {
  methods:{
      loginOut:function(){
          this.axi.post("/loginOut",{}).then(
              respose=>{
                  if(respose.retCode==0){
                      alert(respose.retMsg);
                  }else{
                      this.$router.push({"path":"/newlogin"});
                  }
              },
              respose=>{
                  alert("Error");
              }
          );
      }
  }
}
</script>
