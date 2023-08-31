<template>
  <div class="container">
    <h2 class="title">Login</h2>
    <div class="input-group">
      <label for="username" class="label">Username</label>
      <input type="text" id="username" v-model="username" placeholder="Enter your username" class="input">
    </div>
    <div class="input-group">
      <label for="password" class="label">Password</label>
      <input type="password" id="password" v-model="password" placeholder="Enter your password" class="input">
    </div>
    <button @click="login" class="button">Login</button>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      axios.post('http://127.0.0.1:8000/api/v1/login/', {
        username: this.username,
        password: this.password
      })
      .then(response => {
        // 处理响应数据
        console.log(response);
        // 你可能想要在这里保存用户的登录状态和令牌
        localStorage.setItem('token', response.data.token);
        this.$router.push({ name: 'data-directory' });  // 跳转到用户应用页面
      })
      .catch(error => {
        // 处理错误
        console.error(error);
      });
    }
  }
}
</script>

<style scoped>
/* 保留特定于login的样式，如果有的话 */
</style>
