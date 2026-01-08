<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>AI智能物资分配系统</h3>
          <p>利用人工智能技术，高效匹配捐赠物资与灾区需求，让每一份爱心都能及时送达。</p>
        </div>
        <div class="footer-section">
          <h3>快速链接</h3>
          <ul class="footer-links">
            <li><router-link to="/">首页</router-link></li>
            <li><router-link to="/donation/create">发布捐赠</router-link></li>
            <li><router-link to="/demand/create">发布需求</router-link></li>
            <li><router-link to="/ai-analysis">AI分析</router-link></li>
            <li><router-link to="/user">个人中心</router-link></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>联系方式</h3>
          <p>邮箱：contact@relief-system.com</p>
          <p>电话：400-123-4567</p>
          <p>地址：北京市朝阳区科技园区123号</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 AI智能物资分配系统. 保留所有权利.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Vue 3 组合式API
</script>

<style scoped>
.footer {
  background-color: rgba(44, 62, 80, 0.95);
  color: #ffffff;
  padding: 40px 0 20px;
  margin-top: auto;
}

.footer .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 30px;
}

.footer-section h3 {
  color: #3498db;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 600;
}

.footer-section p {
  color: #bdc3c7;
  line-height: 1.6;
  margin-bottom: 10px;
  font-size: 14px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 12px;
}

.footer-links a {
  color: #bdc3c7;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 14px;
}

.footer-links a:hover {
  color: #3498db;
}

.footer-bottom {
  border-top: 1px solid #34495e;
  padding-top: 20px;
  text-align: center;
}

.footer-bottom p {
  color: #7f8c8d;
  font-size: 13px;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer {
    padding: 30px 0 15px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .footer-section {
    text-align: center;
  }

  .footer-bottom {
    padding-top: 15px;
  }
}

@media (max-width: 576px) {
  .footer {
    padding: 20px 0 10px;
  }

  .footer-content {
    gap: 20px;
  }

  .footer-section h3 {
    font-size: 16px;
    margin-bottom: 15px;
  }

  .footer-section p,
  .footer-links a {
    font-size: 13px;
  }

  .footer-bottom p {
    font-size: 12px;
  }
}
</style>