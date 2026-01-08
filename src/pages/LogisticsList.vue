<template>
  <div class="logistics-list">
    <h2>物流列表</h2>
    <div class="filter-section">
      <div class="filter-row">
        <div class="filter-group">
          <label for="search">搜索：</label>
          <input type="text" id="search" v-model="searchQuery" placeholder="输入物流单号或物资名称">
        </div>
        <div class="filter-group">
          <label for="status">物流状态：</label>
          <select id="status" v-model="filterStatus">
            <option value="">全部</option>
            <option value="pending">待发货</option>
            <option value="transporting">运输中</option>
            <option value="delivered">已送达</option>
            <option value="received">已签收</option>
            <option value="cancelled">已取消</option>
          </select>
        </div>
        <div class="filter-group">
          <button class="btn btn-primary" @click="applyFilters">应用筛选</button>
          <button class="btn btn-secondary" @click="resetFilters">重置</button>
        </div>
      </div>
    </div>
    
    <div class="logistics-table-container">
      <table class="logistics-table">
        <thead>
          <tr>
            <th>物流ID</th>
            <th>物流单号</th>
            <th>物资名称</th>
            <th>数量</th>
            <th>物流公司</th>
            <th>当前状态</th>
            <th>当前位置</th>
            <th>预计送达</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="logistics in filteredLogistics" :key="logistics.id">
            <td>{{ logistics.id }}</td>
            <td>{{ logistics.trackingNumber }}</td>
            <td>{{ logistics.materialName }}</td>
            <td>{{ logistics.quantity }} {{ logistics.unit }}</td>
            <td>{{ logistics.carrier }}</td>
            <td>
              <span :class="['status-badge', logistics.status]">
                {{ statusMap[logistics.status] }}
              </span>
            </td>
            <td>{{ logistics.currentLocation }}</td>
            <td>{{ logistics.estimatedDelivery }}</td>
            <td>
              <router-link :to="'/logistics/' + logistics.id" class="btn btn-sm btn-info">查看详情</router-link>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div v-if="filteredLogistics.length === 0" class="no-results">
        暂无物流信息
      </div>
    </div>
    
    <div class="pagination">
      <button class="btn btn-sm" @click="currentPage = 1" :disabled="currentPage === 1">首页</button>
      <button class="btn btn-sm" @click="currentPage--" :disabled="currentPage === 1">上一页</button>
      <span class="page-info">第 {{ currentPage }} / {{ totalPages }} 页</span>
      <button class="btn btn-sm" @click="currentPage++" :disabled="currentPage === totalPages">下一页</button>
      <button class="btn btn-sm" @click="currentPage = totalPages" :disabled="currentPage === totalPages">末页</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogisticsList',
  data() {
    return {
      logisticsList: [
        {
          id: 201,
          trackingNumber: 'YT9876543210',
          materialName: '矿泉水',
          quantity: 1000,
          unit: '箱',
          carrier: '圆通快递',
          status: 'transporting',
          currentLocation: '运输中 - 成都中转站',
          estimatedDelivery: '2024-05-26 12:00',
          startLocation: '北京市朝阳区',
          destination: '四川省雅安市',
          donationId: 1001,
          demandId: 2001
        },
        {
          id: 202,
          trackingNumber: 'SF1234567890',
          materialName: '帐篷',
          quantity: 400,
          unit: '顶',
          carrier: '顺丰速运',
          status: 'pending',
          currentLocation: '等待发货',
          estimatedDelivery: '2024-05-28 18:00',
          startLocation: '上海市浦东新区',
          destination: '云南省昭通市',
          donationId: 1002,
          demandId: 2002
        },
        {
          id: 203,
          trackingNumber: 'JD7890123456',
          materialName: '方便面',
          quantity: 1500,
          unit: '箱',
          carrier: '京东物流',
          status: 'delivered',
          currentLocation: '已送达 - 河南灾区',
          estimatedDelivery: '2024-05-24 08:00',
          startLocation: '广州市天河区',
          destination: '河南省郑州市',
          donationId: 1003,
          demandId: 2003
        },
        {
          id: 204,
          trackingNumber: 'ZT4567890123',
          materialName: '药品',
          quantity: 250,
          unit: '箱',
          carrier: '中通快递',
          status: 'received',
          currentLocation: '已签收 - 贵州灾区',
          estimatedDelivery: '2024-05-25 14:00',
          startLocation: '深圳市南山区',
          destination: '贵州省毕节市',
          donationId: 1004,
          demandId: 2004
        },
        {
          id: 205,
          trackingNumber: 'YTO3210987654',
          materialName: '棉被',
          quantity: 600,
          unit: '床',
          carrier: '圆通快递',
          status: 'transporting',
          currentLocation: '运输中 - 西宁中转站',
          estimatedDelivery: '2024-05-27 10:00',
          startLocation: '杭州市西湖区',
          destination: '西藏自治区昌都市',
          donationId: 1005,
          demandId: 2005
        }
      ],
      searchQuery: '',
      filterStatus: '',
      currentPage: 1,
      itemsPerPage: 10,
      statusMap: {
        pending: '待发货',
        transporting: '运输中',
        delivered: '已送达',
        received: '已签收',
        cancelled: '已取消'
      }
    }
  },
  computed: {
    filteredLogistics() {
      let results = [...this.logisticsList];
      
      // 搜索筛选
      if (this.searchQuery) {
        const searchLower = this.searchQuery.toLowerCase();
        results = results.filter(logistics => 
          logistics.trackingNumber.toLowerCase().includes(searchLower) ||
          logistics.materialName.toLowerCase().includes(searchLower)
        );
      }
      
      // 状态筛选
      if (this.filterStatus) {
        results = results.filter(logistics => logistics.status === this.filterStatus);
      }
      
      // 分页
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return results.slice(startIndex, startIndex + this.itemsPerPage);
    },
    totalPages() {
      let results = [...this.logisticsList];
      
      // 应用筛选逻辑
      if (this.searchQuery) {
        const searchLower = this.searchQuery.toLowerCase();
        results = results.filter(logistics => 
          logistics.trackingNumber.toLowerCase().includes(searchLower) ||
          logistics.materialName.toLowerCase().includes(searchLower)
        );
      }
      
      if (this.filterStatus) {
        results = results.filter(logistics => logistics.status === this.filterStatus);
      }
      
      return Math.ceil(results.length / this.itemsPerPage);
    }
  },
  methods: {
    applyFilters() {
      this.currentPage = 1;
    },
    resetFilters() {
      this.searchQuery = '';
      this.filterStatus = '';
      this.currentPage = 1;
    }
  }
}
</script>

<style scoped>
.logistics-list {
  padding: 20px;
}

.filter-section {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  border: 1px solid #e9ecef;
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-group label {
  font-weight: 600;
  color: #666;
}

.filter-group input,
.filter-group select {
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
}

.filter-group input {
  width: 250px;
}

.logistics-table-container {
  overflow-x: auto;
}

.logistics-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.logistics-table th,
.logistics-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.logistics-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.logistics-table tr:hover {
  background-color: #f5f5f5;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  display: inline-block;
}

.status-badge.pending {
  background-color: #fff3cd;
  color: #856404;
}

.status-badge.transporting {
  background-color: #d1ecf1;
  color: #0c5460;
}

.status-badge.delivered {
  background-color: #d4edda;
  color: #155724;
}

.status-badge.received {
  background-color: #c3e6cb;
  color: #0b2e13;
}

.status-badge.cancelled {
  background-color: #f8d7da;
  color: #721c24;
}

.no-results {
  text-align: center;
  padding: 40px;
  color: #666;
  font-style: italic;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.page-info {
  color: #666;
  font-size: 14px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #545b62;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-info:hover:not(:disabled) {
  background-color: #138496;
}
</style>