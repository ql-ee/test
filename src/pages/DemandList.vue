<template>
  <div class="demand-list">
    <div class="card">
      <div class="card-header">
        <h2>我的需求</h2>
      </div>
      <div class="card-body">
        <div class="filter-section">
          <div class="search-box">
            <input type="text" v-model="searchKeyword" placeholder="搜索物资名称" class="search-input">
            <button @click="searchDemand" class="btn btn-primary">搜索</button>
          </div>
          <div class="filter-options">
            <select v-model="statusFilter" class="filter-select">
              <option value="">全部状态</option>
              <option value="pending">待匹配</option>
              <option value="matched">已匹配</option>
              <option value="delivering">配送中</option>
              <option value="completed">已完成</option>
              <option value="cancelled">已取消</option>
            </select>
            <select v-model="categoryFilter" class="filter-select">
              <option value="">全部类别</option>
              <option value="饮用水">饮用水</option>
              <option value="食品">食品</option>
              <option value="衣物">衣物</option>
              <option value="药品">药品</option>
              <option value="帐篷">帐篷</option>
              <option value="被褥">被褥</option>
              <option value="医疗用品">医疗用品</option>
              <option value="救援工具">救援工具</option>
              <option value="其他">其他</option>
            </select>
          </div>
        </div>

        <table class="demand-table">
          <thead>
            <tr>
              <th>灾区名称</th>
              <th>需求物资</th>
              <th>数量</th>
              <th>类别</th>
              <th>紧急程度</th>
              <th>发布时间</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="demand in filteredDemands" :key="demand.id">
              <td>{{ demand.disasterArea }}</td>
              <td>{{ demand.materialName }}</td>
              <td>{{ demand.quantity }} {{ demand.unit }}</td>
              <td>{{ demand.category }}</td>
              <td>
                <span :class="['urgency-badge', demand.urgency]">
                  {{ demand.urgency }}
                </span>
              </td>
              <td>{{ demand.publishTime }}</td>
              <td>
                <span :class="['status-badge', demand.status]">
                  {{ statusMap[demand.status] }}
                </span>
              </td>
              <td>
                <router-link :to="'/demand/' + demand.id" class="btn btn-sm btn-info">查看详情</router-link>
                <button v-if="demand.status === 'pending'" @click="cancelDemand(demand.id)" class="btn btn-sm btn-warning">取消</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="filteredDemands.length === 0" class="empty-state">
          <p>暂无需求记录</p>
        </div>

        <div class="pagination" v-if="filteredDemands.length > 0">
          <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-sm btn-secondary">上一页</button>
          <span class="page-info">第 {{ currentPage }} 页，共 {{ totalPages }} 页</span>
          <button @click="nextPage" :disabled="currentPage === totalPages" class="btn btn-sm btn-secondary">下一页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DemandList',
  data() {
    return {
      demands: [
        {
          id: 1,
          disasterArea: '四川地震灾区',
          materialName: '饮用水',
          quantity: 1000,
          unit: '箱',
          category: '饮用水',
          urgency: '紧急',
          description: '灾区急需饮用水，满足灾民基本生活需求',
          contactName: '王救援',
          contactPhone: '13800138001',
          publishTime: '2024-05-20 14:30',
          status: 'matched',
          matchingInfo: {
            matchingId: 102,
            donor: '爱心基金会',
            donationId: 5,
            matchingTime: '2024-05-21 16:30',
            matchDegree: 92
          }
        },
        {
          id: 2,
          disasterArea: '云南洪灾灾区',
          materialName: '帐篷',
          quantity: 500,
          unit: '顶',
          category: '帐篷',
          urgency: '非常紧急',
          description: '洪水冲毁房屋，急需帐篷安置灾民',
          contactName: '李救助',
          contactPhone: '13800138002',
          publishTime: '2024-05-21 09:15',
          status: 'pending'
        },
        {
          id: 3,
          disasterArea: '河南干旱灾区',
          materialName: '食品',
          quantity: 2000,
          unit: '箱',
          category: '食品',
          urgency: '一般',
          description: '干旱导致农作物减产，需要食品援助',
          contactName: '张救灾',
          contactPhone: '13800138003',
          publishTime: '2024-05-19 16:45',
          status: 'delivering',
          logisticsInfo: {
            logisticsId: 202,
            trackingNumber: 'YT9876543210',
            carrier: '圆通快递',
            currentLocation: '运输中 - 郑州中转站',
            estimatedDelivery: '2024-05-26 12:00'
          }
        },
        {
          id: 4,
          disasterArea: '青海雪灾灾区',
          materialName: '衣物',
          quantity: 3000,
          unit: '件',
          category: '衣物',
          urgency: '紧急',
          description: '雪灾导致气温骤降，需要保暖衣物',
          contactName: '刘志愿',
          contactPhone: '13800138004',
          publishTime: '2024-05-18 11:20',
          status: 'completed'
        },
        {
          id: 5,
          disasterArea: '广东台风灾区',
          materialName: '药品',
          quantity: 500,
          unit: '盒',
          category: '药品',
          urgency: '非常紧急',
          description: '台风过后，需要消毒和常用药品预防疾病',
          contactName: '陈医生',
          contactPhone: '13800138005',
          publishTime: '2024-05-17 15:50',
          status: 'pending'
        }
      ],
      searchKeyword: '',
      statusFilter: '',
      categoryFilter: '',
      currentPage: 1,
      pageSize: 10,
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
    filteredDemands() {
      return this.demands.filter(demand => {
        const matchesSearch = demand.materialName.toLowerCase().includes(this.searchKeyword.toLowerCase()) || 
                              demand.disasterArea.toLowerCase().includes(this.searchKeyword.toLowerCase());
        const matchesStatus = !this.statusFilter || demand.status === this.statusFilter;
        const matchesCategory = !this.categoryFilter || demand.category === this.categoryFilter;
        return matchesSearch && matchesStatus && matchesCategory;
      }).slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    },
    totalPages() {
      const filteredCount = this.demands.filter(demand => {
        const matchesSearch = demand.materialName.toLowerCase().includes(this.searchKeyword.toLowerCase()) || 
                              demand.disasterArea.toLowerCase().includes(this.searchKeyword.toLowerCase());
        const matchesStatus = !this.statusFilter || demand.status === this.statusFilter;
        const matchesCategory = !this.categoryFilter || demand.category === this.categoryFilter;
        return matchesSearch && matchesStatus && matchesCategory;
      }).length;
      return Math.ceil(filteredCount / this.pageSize);
    }
  },
  methods: {
    searchDemand() {
      this.currentPage = 1;
    },
    cancelDemand(demandId) {
      if (confirm('确定要取消该需求吗？')) {
        const demand = this.demands.find(d => d.id === demandId);
        if (demand) {
          demand.status = 'cancelled';
          delete demand.matchingInfo;
          delete demand.logisticsInfo;
          alert('需求已取消');
        }
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
  }
}
</script>

<style scoped>
.demand-list {
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
}

.card-header h2 {
  margin: 0;
  color: #333;
  font-size: 22px;
}

.card-body {
  padding: 20px;
}

.filter-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

.search-box {
  display: flex;
  gap: 10px;
}

.search-input {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-width: 250px;
}

.filter-options {
  display: flex;
  gap: 10px;
}

.filter-select {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-width: 150px;
}

.demand-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  font-size: 14px;
}

.demand-table th,
.demand-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.demand-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #555;
}

.demand-table tr:hover {
  background-color: #f8f9fa;
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

.urgency-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  display: inline-block;
}

.urgency-badge.一般 {
  background-color: #e2e3e5;
  color: #383d41;
}

.urgency-badge.紧急 {
  background-color: #fff3cd;
  color: #856404;
}

.urgency-badge.非常紧急 {
  background-color: #f8d7da;
  color: #721c24;
}

.empty-state {
  text-align: center;
  padding: 50px 0;
  color: #6c757d;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}

.page-info {
  color: #555;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.3s;
}

.btn-sm {
  padding: 4px 8px;
  font-size: 12px;
  margin-right: 5px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
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
</style>