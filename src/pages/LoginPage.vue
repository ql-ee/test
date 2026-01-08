<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">登录</h2>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">手机号/邮箱</label>
          <input 
            type="text" 
            id="username" 
            v-model="loginForm.username" 
            placeholder="请输入手机号或邮箱"
            required
            class="form-input"
          />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input 
            type="password" 
            id="password" 
            v-model="loginForm.password" 
            placeholder="请输入密码"
            required
            class="form-input"
          />
        </div>
        <div class="form-group">
          <button type="submit" :disabled="loading" class="login-button">
            {{ loading ? '登录中...' : '登录' }}
          </button>
        </div>
        <div v-if="errorMsg" class="error-message">{{ errorMsg }}</div>
        <div class="login-tip">
          没有账号？<router-link to="/register">立即注册</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { login } from '../services/api.js'

export default {
  name: 'LoginPage',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loading: false,
      errorMsg: ''
    }
  },
  methods: {
    async handleLogin() {
      this.errorMsg = ''
      this.loading = true
      try {
        // 调用登录接口
        const response = await login(this.loginForm.username, this.loginForm.password)
        
        // 保存登录状态
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('userToken', response.data.token)
        localStorage.setItem('userInfo', JSON.stringify(response.data.user))
        
        // 使用基础弹窗提示
        alert(response.message)
        this.$router.push('/student')
      } catch (error) {
        this.errorMsg = error.message || '登录失败'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa;
  margin: 0;
  font-family: Arial, sans-serif;
}

.login-card {
  width: 400px;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.login-title {
  text-align: center;
  margin-bottom: 25px;
  color: #303133;
  font-size: 24px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  font-size: 14px;
  color: #606266;
}

.form-input {
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #409eff;
}

.login-button {
  padding: 12px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover:not(:disabled) {
  background-color: #66b1ff;
}

.login-button:disabled {
  background-color: #a0cfff;
  cursor: not-allowed;
}

.error-message {
  color: #f56c6c;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
}

.login-tip {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #606266;
}

.login-tip a {
  color: #409eff;
  text-decoration: none;
}

.login-tip a:hover {
  text-decoration: underline;
}
</style>