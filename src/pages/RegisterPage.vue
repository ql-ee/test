<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">学生管理系统</h2>
      <form @submit.prevent="handleRegister" class="login-form">
        <div class="form-group">
          <label for="account">手机号/邮箱</label>
          <input 
            type="text" 
            id="account" 
            v-model="registerForm.account" 
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
            v-model="registerForm.password" 
            placeholder="请输入密码（至少6位）" 
            required
            minlength="6"
            class="form-input"
          />
        </div>
        <div class="form-group">
          <label for="confirmPassword">确认密码</label>
          <input 
            type="password" 
            id="confirmPassword" 
            v-model="registerForm.confirmPassword" 
            placeholder="请再次输入密码" 
            required
            minlength="6"
            class="form-input"
          />
        </div>
        <div class="form-group">
          <div class="verification-code">
            <input 
              type="text" 
              id="verificationCode" 
              v-model="registerForm.verificationCode" 
              placeholder="请输入验证码（可选）"
              class="form-input verification-input"
            />
            <button 
              type="button" 
              @click="sendVerificationCode" 
              :disabled="isSendingCode || countdown > 0"
              class="send-code-button"
            >
              {{ countdown > 0 ? `${countdown}秒后重新发送` : '获取验证码' }}
            </button>
          </div>
        </div>
        <div class="form-group">
          <button type="submit" :disabled="loading" class="login-button">
            {{ loading ? '注册中...' : '注册' }}
          </button>
        </div>
        <div v-if="errorMsg" class="error-message">{{ errorMsg }}</div>
        <div class="register-tip">
          已有账号？<router-link to="/login">立即登录</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { register, sendVerificationCode } from '../services/api.js'

export default {
  name: 'RegisterPage',
  data() {
    return {
      registerForm: {
        account: '',
        password: '',
        confirmPassword: '',
        verificationCode: ''
      },
      loading: false,
      errorMsg: '',
      isSendingCode: false,
      countdown: 0,
      timer: null
    }
  },
  methods: {
    async handleRegister() {
      this.errorMsg = ''
      
      // 表单验证
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        this.errorMsg = '两次输入的密码不一致'
        return
      }
      
      // 验证手机号/邮箱格式
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.registerForm.account)
      const isPhone = /^1[3-9]\d{9}$/.test(this.registerForm.account)
      
      if (!isEmail && !isPhone) {
        this.errorMsg = '请输入有效的手机号或邮箱'
        return
      }
      
      this.loading = true
      
      try {
        // 调用注册接口
        const response = await register(this.registerForm.account, this.registerForm.password, this.registerForm.verificationCode)
        
        // 注册成功后跳转到登录页面
        alert(response.message)
        this.$router.push('/login')
      } catch (error) {
        this.errorMsg = error.message || '注册失败'
      } finally {
        this.loading = false
      }
    },
    async sendVerificationCode() {
      // 验证手机号/邮箱格式
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.registerForm.account)
      const isPhone = /^1[3-9]\d{9}$/.test(this.registerForm.account)
      
      if (!isEmail && !isPhone) {
        this.errorMsg = '请先输入有效的手机号或邮箱'
        return
      }
      
      this.isSendingCode = true
      this.errorMsg = ''
      
      try {
        await sendVerificationCode(this.registerForm.account)
        this.errorMsg = '验证码发送成功'
        
        // 开始倒计时
        this.startCountdown()
      } catch (error) {
        this.errorMsg = error.message || '验证码发送失败'
      } finally {
        this.isSendingCode = false
      }
    },
    startCountdown() {
      this.countdown = 60
      
      this.timer = setInterval(() => {
        this.countdown--
        if (this.countdown <= 0) {
          clearInterval(this.timer)
          this.timer = null
        }
      }, 1000)
    }
  },
  beforeUnmount() {
    // 清理定时器
    if (this.timer) {
      clearInterval(this.timer)
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

.verification-code {
  display: flex;
  gap: 10px;
}

.verification-input {
  flex: 1;
}

.send-code-button {
  padding: 0 16px;
  background-color: #67c23a;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.send-code-button:hover:not(:disabled) {
  background-color: #85ce61;
}

.send-code-button:disabled {
  background-color: #c0c4cc;
  cursor: not-allowed;
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

.register-tip {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #606266;
}

.register-tip a {
  color: #409eff;
  text-decoration: none;
}

.register-tip a:hover {
  text-decoration: underline;
}
</style>