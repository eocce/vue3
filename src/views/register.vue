<template>
  <div class="container">
    <h2 class="title">Register</h2>
    <div class="input-group">
      <label for="username" class="label">Username</label>
      <input type="text" id="username" v-model="username" placeholder="Enter your username" @input="checkUsername" class="input">
      <span class="error-message" v-if="usernameMessage">{{ usernameMessage }}</span>
    </div>
    <div class="input-group">
      <label for="password" class="label">Password</label>
      <input type="password" id="password" v-model="password" placeholder="Enter your password" class="input">
    </div>
    <div class="input-group">
      <label for="captcha" class="label">Captcha</label>
      <input type="text" id="captcha" v-model="captcha" placeholder="Enter captcha" class="input">
      <img :src="captchaImage" @click="fetchNewCaptcha" alt="Click to refresh captcha" />
    </div>
    <button @click="register" class="button">Register</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      captcha: '',
      captchaKey: '',
      captchaImage: '',
      usernameMessage: ''
    }
  },
  created() {
    this.fetchNewCaptcha();
  },
  methods: {
    fetchNewCaptcha() {
      axios.get("http://127.0.0.1:8000/custom_captcha/refresh/")
        .then(response => {
          // console.log(response.data);
          this.captchaKey = response.data.key;
          this.captchaImage = "http://127.0.0.1:8000" + response.data.image_url;
        })
        .catch(error => {
          console.error("Error fetching new captcha:", error);
        });
    },
    checkUsername() {
      if (this.username) {
        axios.get("http://127.0.0.1:8000/api/v1/check_username/", {
          params: {
            username: this.username
          }
        })
        .then(response => {
          if (response.data.exists) {
            this.usernameMessage = "Username already exists";
          } else {
            this.usernameMessage = "";
          }
        })
        .catch(error => {
          console.error("Error checking username:", error);
        });
      } else {
        this.usernameMessage = "";
      }
    },
    register() {
      axios.post("http://127.0.0.1:8000/api/v1/users/", {
        username: this.username,
        password: this.password,
        captcha: this.captcha,
        captcha_key: this.captchaKey  // 添加这个属性，将验证码的关键发送到后端
      })
        .then(response => {
          // 请求成功，处理成功的情况
          console.log(response);
          if (response.status === 201) {
            // 201 状态码表示创建成功
            alert("注册成功！");
            // 重定向到登录页面或主页面
            this.$router.push({ name: "Login" });
          }
        })
        .catch(error => {
            if (error.response) {
                if (error.response.data.error === "Username already exists") {
                    alert("用户名已被注册！");
                } else if (error.response.data.error === "Incorrect captcha") {
                    alert("验证码错误！");
                } else {
                    // 将对象转换为字符串以便显示
                    const errorMessage = typeof error.response.data === 'object'
                        ? JSON.stringify(error.response.data)
                        : error.response.data;
                    alert("注册失败：" + errorMessage);
                }
            } else {
                alert("注册失败：" + error.message);
            }
        });
    }
  }
}
</script>
<style scoped>
.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.input-group img {
  margin-left: 10px;
  cursor: pointer;
  vertical-align: middle;
}
</style>