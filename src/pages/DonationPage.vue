<template>
  <div class="donation-page">
    <div class="container">
      <h1>捐赠物资管理</h1>
      <div class="donation-nav">
        <router-link to="/donation/create" class="nav-item">发布捐赠</router-link>
        <router-link to="/donation/list" class="nav-item">我的捐赠</router-link>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DonationPage'
}
</script>

<style scoped>
.donation-page {
  padding: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.donation-nav {
  display: flex;
  margin: 20px 0;
  border-bottom: 1px solid #e0e0e0;
}

.nav-item {
  padding: 10px 20px;
  margin-right: 10px;
  text-decoration: none;
  color: #333;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.nav-item:hover {
  color: #007bff;
}

.nav-item.router-link-active {
  color: #007bff;
  border-bottom-color: #007bff;
  font-weight: bold;
}
</style>