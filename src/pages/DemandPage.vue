<template>
  <div class="demand-page">
    <h1>灾区需求管理</h1>
    <div class="demand-nav">
      <router-link to="/demand/create" class="nav-item" :class="{ active: $route.path === '/demand/create' }">发布需求</router-link>
      <router-link to="/demand/list" class="nav-item" :class="{ active: $route.path === '/demand/list' }">我的需求</router-link>
    </div>
    <div class="demand-content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DemandPage'
}
</script>

<style scoped>
.demand-page {
  padding: 20px 0;
  max-width: 1200px;
  margin: 0 auto;
}

.demand-nav {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.nav-item {
  padding: 10px 20px;
  margin-right: 10px;
  text-decoration: none;
  color: #555;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
  font-size: 16px;
  font-weight: 500;
}

.nav-item:hover {
  color: #007bff;
}

.nav-item.active {
  color: #007bff;
  border-bottom-color: #007bff;
}

.demand-content {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}
</style>