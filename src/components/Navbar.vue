<template>
  <nav class="navbar-container">
    <div class="navbar-title">遥感数据管理系统</div>
    <div class="navbar-links">
      <router-link to="/data-query">数据查询</router-link>
      <router-link to="/data-directory">数据目录树浏览</router-link>
      <router-link to="/download-list">数据下载清单</router-link>
      <router-link to="/faq">FAQ</router-link>
    </div>
    <div class="navbar-account">
      <span v-if="!isLoggedIn">当前未登录</span>
      <router-link v-if="!isLoggedIn" to="/login" class="btn">登录</router-link>
      <router-link v-if="!isLoggedIn" to="/admin-login" class="btn">管理员登录</router-link>
      <router-link v-if="!isLoggedIn" to="/register" class="btn">注册</router-link>
      <span v-if="isLoggedIn">登入账户: {{ accountId }}</span>
      <router-link v-if="isLoggedIn" to="/change-password">修改密码</router-link>
      <a v-if="isLoggedIn" @click.prevent="logout" class="logout-link">退出</a>


    </div>
  </nav>
</template>

<script>
import axios from "axios";

export default {
  name: 'Navbar',
  data() {
    return {
      isLoggedIn: false,
      accountId: null
    };
},
  computed: {
    isLoggedIn() {
      return this.accountId !== null;  // 如果accountId不为null，则表示用户已登录
    }
  },
  methods: {
    logout() {
      // 这里可以调用后端API来注销用户，但这取决于您的后端实现
      // 以下是一个示例代码：
      axios.post('http://127.0.0.1:8000/api/v1/logout/', {}, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        localStorage.removeItem('token');  // 清除令牌
        this.accountId = null;  // 清除账户ID
        this.$router.push({ name: 'Login' });  // 重定向到登录页面
      })
      .catch(error => {
        console.error("Error logging out:", error);
        alert('退出失败，请重试。');
      });
    },
    // ... 其他方法 ...
  },
  created() {
    axios.get('http://127.0.0.1:8000/api/v1/check_login_status/', {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      if (response.data.isLoggedIn) {
        this.isLoggedIn = true;
        this.accountId = response.data.accountId;
      }
    })
    .catch(error => {
      console.error("Error checking login status:", error);
    });
  }
}
</script>

<style>
/* 根据需要添加或修改样式 */
.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-links {
  display: flex;
  gap: 10px;
}

.navbar-account {
  display: flex;
  gap: 10px;
}

.btn-register {
  background-color: #007BFF;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.btn-register:hover {
  background-color: #0056b3;
}
.btn {
  background-color: #007BFF;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;
  margin-right: 10px;
}

.btn:hover {
  background-color: #0056b3;
}

.logout-link {
  color: #007BFF;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.3s;
}

.logout-link:hover {
  color: #0056b3;
}
</style>
