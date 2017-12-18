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
  },
  methods: {
    checkLogin: function() {
      //检查是否存在session
      //cookie操作方法在源码里有或者参考网上的即可
      if (!this.getCookie("session")) {
        //如果没有登录状态则跳转到登录页
        this.$router.push("/login");
      } else {
        //否则跳转到登录后的页面
        this.$router.push("/");
      }
    },
    //登录逻辑
    login: function() {
      if (this.user.username != "" && this.user.username != "") {
        this.toLogin();
      }
      // this.$store.dispatch('LoginByUsername', this.user).then(() => {
      //     this.$router.push({ path: '/' }); //登录成功之后重定向到首页
      //     }).catch(err => {
      //     this.$message.error(err); //登录失败提示错误
      //     });
    },
    LoginByUsername: function({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password)
          .then(response => {
            const data = response.data;
            Cookies.set("Token", response.data.token); //登录成功后将token存储在cookie之中
            commit("SET_TOKEN", data.token);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
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
      this.isLoging = true;

      //请求后端
      this.axi.post("/user0", this.user).then(
        response => {
          console.log(JSON.stringify(response));
          if(response.result){
            //如果登录成功则保存登录状态并设置有效期
            // let expireDays = 1000 * 60 * 60 * 24 * 15;
            // this.setCookie('session', response.result, expireDays);
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

