<template>
  <div>
      <!-- <router-link :to="setting">设置</router-link> -->
      <div class="myhead">
          <div class="headimg">头像</div>
          <div class="usernick">
              <p>名称 <i>等级</i></p>
          </div>
      </div>
      <div class="mybody1">
          <div>信用</div>
          <div>优惠券</div>
          <div>钱包</div>
      </div>
      <div class="mybody2">
          <div>我的收藏</div>
          <div>收货管理</div>
          <div><a href="#/setting">设置</a></div>
          <div>企业绑定</div>
      </div>
      
      <a class="out" href="javascript:;" @click="loginOut()">退出</a>
  </div>
</template>
<script>
import '../../assets/css/my/my.scss';
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
