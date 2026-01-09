<template>
  <div class="matching-result-list">
    <h2>智能匹配结果</h2>
    <div class="filter-section">
      <div class="filter-row">
        <div class="filter-group">
          <label for="search">搜索：</label>
          <input type="text" id="search" v-model="searchQuery" placeholder="输入物资名称或灾区名称">
        </div>
        <div class="filter-group">
          <label for="status">匹配状态：</label>
          <select id="status" v-model="filterStatus">
            <option value="">全部</option>
            <option value="pending">待确认</option>
            <option value="confirmed">已确认</option>
            <option value="cancelled">已取消</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="minMatch">最低匹配度：</label>
          <select id="minMatch" v-model="filterMinMatch">
            <option value="">全部</option>
            <option value="80">80%以上</option>
            <option value="70">70%以上</option>
            <option value="60">60%以上</option>
            <option value="50">50%以上</option>
          </select>
        </div>
        <div class="filter-group">
          <button class="btn btn-primary" @click="applyFilters">应用筛选</button>
          <button class="btn btn-secondary" @click="resetFilters">重置</button>
        </div>
      </div>
    </div>
    
    <div class="matching-table-container">
      <table class="matching-table">
        <thead>
          <tr>
            <th>匹配ID</th>
            <th>捐赠物资</th>
            <th>需求灾区</th>
            <th>匹配数量</th>
            <th>匹配度</th>
            <th>匹配时间</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="matching in filteredMatchingResults" :key="matching.id">
            <td>{{ matching.id }}</td>
            <td>
              <div class="material-info">
                <div class="material-name">{{ matching.donation.materialName }}</div>
                <div class="donor-info">捐赠方：{{ matching.donation.donorName }}</div>
              </div>
            </td>
            <td>
              <div class="disaster-info">
                <div class="disaster-name">{{ matching.demand.disasterArea }}</div>
                <div class="demand-info">需求：{{ matching.demand.materialName }}</div>
              </div>
            </td>
            <td>{{ matching.matchedQuantity }} {{ matching.donation.unit }}</td>
            <td>
              <span :class="['match-degree', getMatchDegreeClass(matching.matchDegree)]">
                {{ matching.matchDegree }}%
              </span>
            </td>
            <td>{{ matching.matchingTime }}</td>
            <td>
              <span :class="['status-badge', matching.status]">
                {{ statusMap[matching.status] }}
              </span>
            </td>
            <td>
              <router-link :to="'/matching/' + matching.id" class="btn btn-sm btn-info">查看详情</router-link>
              <button v-if="matching.status === 'pending'" class="btn btn-sm btn-primary" @click="confirmMatching(matching.id)">确认匹配</button>
              <button v-if="matching.status === 'pending'" class="btn btn-sm btn-warning" @click="cancelMatching(matching.id)">取消匹配</button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div v-if="filteredMatchingResults.length === 0" class="no-results">
        暂无匹配结果
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
  
  <!-- 取消匹配原因弹窗 -->
  <div v-if="showCancelReasonModal" class="modal-overlay">
    <div class="modal-dialog">
      <div class="modal-header">
        <h3>取消匹配原因</h3>
        <button @click="showCancelReasonModal = false" class="close-btn">×</button>
      </div>
      <div class="modal-body">
        <div class="reason-options">
          <label class="radio-label">
            <input type="radio" v-model="cancelReason" value="物资信息错误"> 物资信息错误
          </label>
          <label class="radio-label">
            <input type="radio" v-model="cancelReason" value="需求已变更"> 需求已变更
          </label>
          <label class="radio-label">
            <input type="radio" v-model="cancelReason" value="匹配精度不足"> 匹配精度不足
          </label>
          <label class="radio-label">
            <input type="radio" v-model="cancelReason" value="其他原因"> 其他原因
          </label>
          <textarea v-if="cancelReason === '其他原因'" v-model="otherReason" class="other-reason-input" placeholder="请输入其他原因..."></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button @click="showCancelReasonModal = false" class="btn btn-secondary">取消</button>
        <button @click="confirmCancelWithReason()" class="btn btn-warning">确认提交</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MatchingResultList',
  data() {
    return {
      // 取消匹配原因弹窗相关
      showCancelReasonModal: false,
      cancelReason: '',
      otherReason: '',
      currentCancelId: null,
      
      matchingResults: [
        {
          id: 101,
          donation: {
            materialName: '矿泉水',
            donorName: '爱心基金会',
            unit: '箱',
            totalQuantity: 1000
          },
          demand: {
            disasterArea: '四川地震灾区',
            materialName: '饮用水',
            unit: '箱',
            totalQuantity: 1000
          },
          matchedQuantity: 1000,
          matchDegree: 95,
          matchingTime: '2024-05-21 14:30',
          status: 'confirmed'
        },
        {
          id: 102,
          donation: {
            materialName: '帐篷',
            donorName: '救援物资协会',
            unit: '顶',
            totalQuantity: 500
          },
          demand: {
            disasterArea: '云南地震灾区',
            materialName: '临时住所',
            unit: '顶',
            totalQuantity: 400
          },
          matchedQuantity: 400,
          matchDegree: 88,
          matchingTime: '2024-05-22 09:15',
          status: 'pending'
        },
        {
          id: 103,
          donation: {
            materialName: '方便面',
            donorName: '食品公司',
            unit: '箱',
            totalQuantity: 2000
          },
          demand: {
            disasterArea: '河南洪水灾区',
            materialName: '方便食品',
            unit: '箱',
            totalQuantity: 1500
          },
          matchedQuantity: 1500,
          matchDegree: 82,
          matchingTime: '2024-05-22 16:45',
          status: 'pending'
        },
        {
          id: 104,
          donation: {
            materialName: '药品',
            donorName: '医药公司',
            unit: '箱',
            totalQuantity: 300
          },
          demand: {
            disasterArea: '贵州暴雨灾区',
            materialName: '医疗物资',
            unit: '箱',
            totalQuantity: 250
          },
          matchedQuantity: 250,
          matchDegree: 92,
          matchingTime: '2024-05-23 11:20',
          status: 'confirmed'
        },
        {
          id: 105,
          donation: {
            materialName: '棉被',
            donorName: '纺织企业',
            unit: '床',
            totalQuantity: 800
          },
          demand: {
            disasterArea: '西藏雪灾灾区',
            materialName: '保暖物资',
            unit: '床',
            totalQuantity: 600
          },
          matchedQuantity: 600,
          matchDegree: 78,
          matchingTime: '2024-05-23 14:10',
          status: 'pending'
        }
      ],
      searchQuery: '',
      filterStatus: '',
      filterMinMatch: '',
      currentPage: 1,
      itemsPerPage: 10,
      statusMap: {
        pending: '待确认',
        confirmed: '已确认',
        cancelled: '已取消'
      }
    }
  },
  computed: {
    filteredMatchingResults() {
      let results = [...this.matchingResults];
      
      // 搜索筛选
      if (this.searchQuery) {
        const searchLower = this.searchQuery.toLowerCase();
        results = results.filter(matching => 
          matching.donation.materialName.toLowerCase().includes(searchLower) ||
          matching.demand.disasterArea.toLowerCase().includes(searchLower)
        );
      }
      
      // 状态筛选
      if (this.filterStatus) {
        results = results.filter(matching => matching.status === this.filterStatus);
      }
      
      // 匹配度筛选
      if (this.filterMinMatch) {
        const minMatch = parseInt(this.filterMinMatch);
        results = results.filter(matching => matching.matchDegree >= minMatch);
      }
      
      // 分页
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return results.slice(startIndex, startIndex + this.itemsPerPage);
    },
    totalPages() {
      let results = [...this.matchingResults];
      
      // 应用筛选逻辑
      if (this.searchQuery) {
        const searchLower = this.searchQuery.toLowerCase();
        results = results.filter(matching => 
          matching.donation.materialName.toLowerCase().includes(searchLower) ||
          matching.demand.disasterArea.toLowerCase().includes(searchLower)
        );
      }
      
      if (this.filterStatus) {
        results = results.filter(matching => matching.status === this.filterStatus);
      }
      
      if (this.filterMinMatch) {
        const minMatch = parseInt(this.filterMinMatch);
        results = results.filter(matching => matching.matchDegree >= minMatch);
      }
      
      return Math.ceil(results.length / this.itemsPerPage);
    }
  },
  methods: {
    getMatchDegreeClass(degree) {
      if (degree >= 90) return 'high';
      if (degree >= 80) return 'medium';
      if (degree >= 70) return 'low';
      return '';
    },
    applyFilters() {
      this.currentPage = 1;
    },
    resetFilters() {
      this.searchQuery = '';
      this.filterStatus = '';
      this.filterMinMatch = '';
      this.currentPage = 1;
    },
    confirmMatching(id) {
      if (confirm('确定要确认该匹配吗？')) {
        const matching = this.matchingResults.find(m => m.id === id);
        if (matching) {
          matching.status = 'confirmed';
          alert('匹配已确认');
        }
      }
    },
    cancelMatching(id) {
      // 保存当前要取消的匹配ID并显示原因弹窗
      this.currentCancelId = id;
      this.showCancelReasonModal = true;
    },
    confirmCancelWithReason() {
      if (!this.cancelReason) {
        alert('请选择取消匹配的原因');
        return;
      }
      const finalReason = this.cancelReason === '其他原因' ? this.otherReason : this.cancelReason;
      if (this.cancelReason === '其他原因' && !this.otherReason) {
        alert('请输入其他原因的具体内容');
        return;
      }
      
      // 更新匹配状态
      const matching = this.matchingResults.find(m => m.id === this.currentCancelId);
      if (matching) {
        matching.status = 'cancelled';
        alert('匹配已取消，原因：' + finalReason);
      }
      
      // 重置表单和弹窗
      this.showCancelReasonModal = false;
      this.cancelReason = '';
      this.otherReason = '';
      this.currentCancelId = null;
    }
  }
}
</script>

<style scoped>
.matching-result-list {
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

.matching-table-container {
  overflow-x: auto;
}

.matching-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.matching-table th,
.matching-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.matching-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.matching-table tr:hover {
  background-color: #f5f5f5;
}

.material-info,
.disaster-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.material-name,
.disaster-name {
  font-weight: 500;
  color: #333;
}

.donor-info,
.demand-info {
  font-size: 12px;
  color: #666;
}

.match-degree {
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  display: inline-block;
}

.match-degree.high {
  color: #28a745;
  background-color: #d4edda;
}

.match-degree.medium {
  color: #ffc107;
  background-color: #fff3cd;
}

.match-degree.low {
  color: #dc3545;
  background-color: #f8d7da;
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

.status-badge.confirmed {
  background-color: #d4edda;
  color: #155724;
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

.btn-warning {
  background-color: #ffc107;
  color: #212529;
}

.btn-warning:hover:not(:disabled) {
  background-color: #e0a800;
}

/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-dialog {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
  overflow: hidden;
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  color: #333;
  font-size: 20px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.close-btn:hover {
  background-color: #f0f0f0;
}

.modal-body {
  padding: 20px;
}

.reason-options {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  cursor: pointer;
  padding: 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.radio-label:hover {
  background-color: #f5f5f5;
}

.radio-label input[type="radio"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.other-reason-input {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  min-height: 80px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
}

.other-reason-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.modal-footer {
  padding: 20px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>