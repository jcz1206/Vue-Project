<template>
  <div class="container loginform">
      <h6>登录</h6>
      <form action="">
          <div class="inputdiv">
             <input type="text" placeholder="请输入用户名" v-model="user.username">
          </div>
          <div class="inputdiv">
              <input type="text" placeholder="请输入密码" v-model="user.password">
          </div>
          <div>
              <button @click="login()">登录</button>
          </div>
          <div>
              
              <a href="#/regist">注册</a>
          </div>
      </form>
  </div>
</template>
<script>
import "../assets/css/login/login.scss";
export default {
  data() {
    return {
      user: {
        username: "test001",
        password: "123456"
      }
    };
  },

  created: function() {
    // this.checkLogin();    
    // this.checkLogin2();   
    //  this.cookies.delete('session');
  },
  methods: {
    checkLogin: function() {
      //检查是否存在session
      //cookie操作方法在源码里有或者参考网上的即可
      if (!this.getCookie("session")) {
        //如果没有登录状态则跳转到登录页
        ///this.$router.push("/login");
      } else {
        //否则跳转到登录后的页面
        this.$router.push("/");
      }
    },
    //登录逻辑
    login: function() {
      if (this.user.username != "" && this.user.password != "") {
        this.toLogin();
      }
    },
    toLogin: function() {
      //一般要跟后端了解密码的加密规则
      //这里例子用的哈希算法来自./js/sha1.min.js
      // let password_sha = hex_sha1(hex_sha1( this.password ));

      // //需要想后端发送的登录参数
      // let loginParam = {
      //     account: this.account,
      //     password_sha
      // }

      //设置在登录状态
      // this.isLoging = true;

      //请求后端
      this.axi.post("/login", this.user).then(
        (response) => {
          // console.log(JSON.stringify(response));
          if(response.retCode==1){
            //如果登录成功则保存登录状态并设置有效期
            // let expireDays = 1000 * 60 * 60 * 2;//4 * 15;
            // this.setCookie('session', response.result, expireDays);
            // this.cookies.set('session', response.user, expireDays);
            // req.session.user=response.user;
            //跳转
            this.$router.push({path:'/newIndex'});
          }
        },
        response => {
          alert("Error");
          //Error
        }
      );

    //   //请求后端
    //   this.axi.get("/user?username=" + this.user.username+'&password='+this.user.password,{}).then(
    //     response => { console.log(JSON.stringify(response)); },
    //     response => { alert("Error"); }
    //   );

    //   //请求后端
    //   this.axi.get("/user1/"+this.user.username+'/' + this.user.password, {}).then(
    //     response => { console.log(JSON.stringify(response)); },
    //     response => { alert("Error"); }
    //   );


    //    //请求后端
    //   this.axi.get("/user2/"+this.user.username+'&' + this.user.password, {}).then(
    //     response => { console.log(JSON.stringify(response)); },
    //     response => { alert("Error"); }
    //   );

    }
  }
};
</script>

