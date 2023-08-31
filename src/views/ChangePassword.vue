<template>
  <div class="password-change-container">
    <h2>修改密码</h2>
    <div class="input-group">
      <label for="oldPassword">旧密码</label>
      <input type="password" id="oldPassword" v-model="oldPassword">
    </div>
    <div class="input-group">
      <label for="newPassword">新密码</label>
      <input type="password" id="newPassword" v-model="newPassword">
    </div>
    <button @click="changePassword">确认修改</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      oldPassword: '',
      newPassword: ''
    };
  },
  methods: {
    changePassword() {
      axios.post('http://127.0.0.1:8000/api/v1/change_password/', {
        current_password: this.oldPassword,  // 修改参数名称
        new_password: this.newPassword
      }, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        alert('密码修改成功！');
      })
      .catch(error => {
        console.error("Error changing password:", error);
        alert('密码修改失败，请重试。');
      });
    }
  }
}
</script>

<style>
/* 您可以使用之前的全局样式或添加新的样式 */
</style>
