<template>
  <div class="donation-list">
    <div class="card">
      <div class="card-header">
        <h2>我的捐赠物资</h2>
        <div class="filter-section">
          <input type="text" v-model="searchKeyword" placeholder="搜索物资名称" class="search-input">
          <select v-model="statusFilter" class="status-filter">
            <option value="">全部状态</option>
            <option value="pending">待匹配</option>
            <option value="matched">已匹配</option>
            <option value="delivering">配送中</option>
            <option value="completed">已完成</option>
            <option value="cancelled">已取消</option>
          </select>
        </div>
      </div>
      <div class="card-body">
        <table class="donation-table">
          <thead>
            <tr>
              <th>物资名称</th>
              <th>数量</th>
              <th>类别</th>
              <th>发布时间</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="donation in filteredDonations" :key="donation.id">
              <td>{{ donation.materialName }}</td>
              <td>{{ donation.quantity }} {{ donation.unit }}</td>
              <td>{{ donation.category }}</td>
              <td>{{ donation.publishTime }}</td>
              <td>
                <span :class="['status-badge', donation.status]">
                  {{ statusMap[donation.status] }}
                </span>
              </td>
              <td>
                <router-link :to="'/donation/' + donation.id" class="btn btn-sm btn-info">查看详情</router-link>
                <button v-if="donation.status === 'pending'" class="btn btn-sm btn-warning" @click="cancelDonation(donation.id)">取消</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="filteredDonations.length === 0" class="empty-state">
          <p>暂无捐赠记录</p>
        </div>
      </div>
      <div class="card-footer">
        <div class="pagination">
          <button :disabled="currentPage === 1" class="page-btn" @click="currentPage--">上一页</button>
          <span class="page-info">第 {{ currentPage }} / {{ totalPages }} 页</span>
          <button :disabled="currentPage === totalPages" class="page-btn" @click="currentPage++">下一页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DonationList',
  data() {
    return {
      donations: [
        { id: 1, materialName: '矿泉水', quantity: 500, unit: '箱', category: '饮用水', publishTime: '2024-05-20 10:30', status: 'matched' },
        { id: 2, materialName: '方便面', quantity: 300, unit: '箱', category: '食品', publishTime: '2024-05-21 14:20', status: 'pending' },
        { id: 3, materialName: '帐篷', quantity: 100, unit: '顶', category: '帐篷', publishTime: '2024-05-22 09:15', status: 'delivering' },
        { id: 4, materialName: '棉被', quantity: 200, unit: '条', category: '衣物', publishTime: '2024-05-23 16:45', status: 'completed' },
        { id: 5, materialName: '医疗急救包', quantity: 50, unit: '个', category: '医疗设备', publishTime: '2024-05-24 11:00', status: 'pending' },
        { id: 6, materialName: '大米', quantity: 1000, unit: '公斤', category: '食品', publishTime: '2024-05-25 13:30', status: 'matched' }
      ],
      searchKeyword: '',
      statusFilter: '',
      currentPage: 1,
      pageSize: 5,
      statusMap: {
        pending: '待匹配',
        matched: '已匹配',
        delivering: '配送中',
        completed: '已完成',
        cancelled: '已取消'
      }
    }
  },
  computed: {
    filteredDonations() {
      let filtered = this.donations;
      
      // 搜索过滤
      if (this.searchKeyword) {
        filtered = filtered.filter(donation => 
          donation.materialName.toLowerCase().includes(this.searchKeyword.toLowerCase())
        );
      }
      
      // 状态过滤
      if (this.statusFilter) {
        filtered = filtered.filter(donation => donation.status === this.statusFilter);
      }
      
      return filtered;
    },
    totalPages() {
      return Math.ceil(this.filteredDonations.length / this.pageSize);
    },
    paginatedDonations() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredDonations.slice(start, end);
    }
  },
  methods: {
    cancelDonation(id) {
      if (confirm('确定要取消该捐赠吗？')) {
        const donation = this.donations.find(d => d.id === id);
        if (donation) {
          donation.status = 'cancelled';
          alert('捐赠已取消');
        }
      }
    }
  }
}
</script>

<style scoped>
.donation-list {
  padding: 20px 0;
}

.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.card-header h2 {
  margin: 0;
  color: #333;
  font-size: 24px;
}

.filter-section {
  display: flex;
  gap: 15px;
  align-items: center;
}

.search-input, .status-filter {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.search-input {
  width: 200px;
}

.status-filter {
  width: 150px;
}

.card-body {
  padding: 20px;
}

.donation-table {
  width: 100%;
  border-collapse: collapse;
}

.donation-table th,
.donation-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.donation-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status-badge.pending {
  background-color: #fff3cd;
  color: #856404;
}

.status-badge.matched {
  background-color: #d1ecf1;
  color: #0c5460;
}

.status-badge.delivering {
  background-color: #d4edda;
  color: #155724;
}

.status-badge.completed {
  background-color: #c3e6cb;
  color: #155724;
}

.status-badge.cancelled {
  background-color: #f8d7da;
  color: #721c24;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s;
}

.btn-sm {
  padding: 4px 8px;
  font-size: 12px;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
  margin-right: 5px;
}

.btn-info:hover {
  background-color: #138496;
}

.btn-warning {
  background-color: #ffc107;
  color: #212529;
}

.btn-warning:hover {
  background-color: #e0a800;
}

.empty-state {
  text-align: center;
  padding: 40px 0;
  color: #666;
}

.card-footer {
  padding: 15px 20px;
  border-top: 1px solid #e0e0e0;
  background-color: #f8f9fa;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.page-btn {
  padding: 6px 12px;
  border: 1px solid #ddd;
  background-color: #fff;
  cursor: pointer;
  border-radius: 4px;
}

.page-btn:hover:not(:disabled) {
  background-color: #e9ecef;
}

.page-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.page-info {
  color: #666;
  font-size: 14px;
}
</style>