<template>
  <div class="matching-detail">
    <div class="card">
      <div class="card-header">
        <h2>匹配结果详情</h2>
        <div class="header-actions">
          <button class="btn btn-secondary" @click="goBack">返回列表</button>
          <button v-if="matchingDetail.status === 'pending'" class="btn btn-primary" @click="confirmMatching">确认匹配</button>
          <button v-if="matchingDetail.status === 'pending'" class="btn btn-warning" @click="cancelMatching">取消匹配</button>
        </div>
      </div>
      <div class="card-body">
        <div class="detail-section">
          <h3>匹配基本信息</h3>
          <div class="detail-grid">
            <div class="detail-item">
              <label>匹配ID：</label>
              <span>{{ matchingDetail.id }}</span>
            </div>
            <div class="detail-item">
              <label>匹配时间：</label>
              <span>{{ matchingDetail.matchingTime }}</span>
            </div>
            <div class="detail-item">
              <label>匹配状态：</label>
              <span :class="['status-badge', matchingDetail.status]">
                {{ statusMap[matchingDetail.status] }}
              </span>
            </div>
            <div class="detail-item">
              <label>匹配度：</label>
              <span class="match-degree">{{ matchingDetail.matchDegree }}%</span>
            </div>
          </div>
        </div>
        
        <div class="detail-section">
          <h3>捐赠物资信息</h3>
          <div class="info-card">
            <div class="detail-grid">
              <div class="detail-item">
                <label>物资名称：</label>
                <span>{{ matchingDetail.donation.materialName }}</span>
              </div>
              <div class="detail-item">
                <label>捐赠数量：</label>
                <span>{{ matchingDetail.donation.totalQuantity }} {{ matchingDetail.donation.unit }}</span>
              </div>
              <div class="detail-item">
                <label>匹配数量：</label>
                <span>{{ matchingDetail.matchedQuantity }} {{ matchingDetail.donation.unit }}</span>
              </div>
              <div class="detail-item">
                <label>物资类别：</label>
                <span>{{ matchingDetail.donation.category }}</span>
              </div>
              <div class="detail-item">
                <label>捐赠方：</label>
                <span>{{ matchingDetail.donation.donorName }}</span>
              </div>
              <div class="detail-item">
                <label>联系人：</label>
                <span>{{ matchingDetail.donation.contactName }}</span>
              </div>
              <div class="detail-item">
                <label>联系电话：</label>
                <span>{{ matchingDetail.donation.contactPhone }}</span>
              </div>
              <div class="detail-item">
                <label>捐赠地址：</label>
                <span>{{ matchingDetail.donation.donationAddress }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="detail-section">
          <h3>灾区需求信息</h3>
          <div class="info-card">
            <div class="detail-grid">
              <div class="detail-item">
                <label>灾区名称：</label>
                <span>{{ matchingDetail.demand.disasterArea }}</span>
              </div>
              <div class="detail-item">
                <label>需求物资：</label>
                <span>{{ matchingDetail.demand.materialName }}</span>
              </div>
              <div class="detail-item">
                <label>需求数量：</label>
                <span>{{ matchingDetail.demand.totalQuantity }} {{ matchingDetail.demand.unit }}</span>
              </div>
              <div class="detail-item">
                <label>需求类别：</label>
                <span>{{ matchingDetail.demand.category }}</span>
              </div>
              <div class="detail-item">
                <label>紧急程度：</label>
                <span :class="['urgency-badge', matchingDetail.demand.urgency]">
                  {{ matchingDetail.demand.urgency }}
                </span>
              </div>
              <div class="detail-item">
                <label>联系人：</label>
                <span>{{ matchingDetail.demand.contactName }}</span>
              </div>
              <div class="detail-item">
                <label>联系电话：</label>
                <span>{{ matchingDetail.demand.contactPhone }}</span>
              </div>
              <div class="detail-item">
                <label>灾区地址：</label>
                <span>{{ matchingDetail.demand.location }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="matchingDetail.status === 'confirmed'" class="detail-section">
          <h3>物流信息</h3>
          <div class="logistics-info">
            <div class="detail-grid">
              <div class="detail-item">
                <label>物流单号：</label>
                <span>{{ matchingDetail.logisticsInfo.trackingNumber }}</span>
              </div>
              <div class="detail-item">
                <label>物流公司：</label>
                <span>{{ matchingDetail.logisticsInfo.carrier }}</span>
              </div>
              <div class="detail-item">
                <label>当前位置：</label>
                <span>{{ matchingDetail.logisticsInfo.currentLocation }}</span>
              </div>
              <div class="detail-item">
                <label>预计送达：</label>
                <span>{{ matchingDetail.logisticsInfo.estimatedDelivery }}</span>
              </div>
            </div>
            <div class="action-buttons">
              <router-link :to="'/logistics/' + matchingDetail.logisticsInfo.logisticsId" class="btn btn-info">查看物流详情</router-link>
            </div>
          </div>
        </div>
        
        <div class="detail-section">
          <h3>AI匹配分析</h3>
          <div class="analysis-card">
            <div class="analysis-item">
              <div class="analysis-title">匹配理由：</div>
              <div class="analysis-content">
                {{ matchingDetail.aiAnalysis.matchingReason }}
              </div>
            </div>
            <div class="analysis-item">
              <div class="analysis-title">匹配度分析：</div>
              <div class="analysis-content">
                <div v-for="(factor, index) in matchingDetail.aiAnalysis.matchFactors" :key="index" class="factor-item">
                  <div class="factor-name">{{ factor.name }}：</div>
                  <div class="factor-bar">
                    <div class="factor-fill" :style="{ width: factor.score + '%' }"></div>
                  </div>
                  <div class="factor-score">{{ factor.score }}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MatchingDetail',
  data() {
    return {
      matchingDetail: {
        id: 101,
        matchingTime: '2024-05-21 14:30',
        status: 'pending',
        matchDegree: 95,
        matchedQuantity: 1000,
        donation: {
          materialName: '矿泉水',
          totalQuantity: 1000,
          unit: '箱',
          category: '饮用水',
          donorName: '爱心基金会',
          contactName: '张经理',
          contactPhone: '13800138001',
          donationAddress: '北京市朝阳区'
        },
        demand: {
          disasterArea: '四川地震灾区',
          materialName: '饮用水',
          totalQuantity: 1000,
          unit: '箱',
          category: '饮用水',
          urgency: '紧急',
          contactName: '王救援',
          contactPhone: '13800138002',
          location: '四川省雅安市'
        },
        aiAnalysis: {
          matchingReason: '基于物资类型、数量和灾区紧急程度的综合匹配。捐赠物资为矿泉水，需求为饮用水，物资类型高度匹配；捐赠数量1000箱，需求数量1000箱，数量完全匹配；灾区需求紧急程度为紧急，优先匹配。',
          matchFactors: [
            { name: '物资类型匹配', score: 100 },
            { name: '数量匹配', score: 100 },
            { name: '类别匹配', score: 100 },
            { name: '需求紧急度', score: 90 },
            { name: '地理位置匹配', score: 70 }
          ]
        },
        logisticsInfo: {
          logisticsId: 201,
          trackingNumber: 'YT9876543210',
          carrier: '圆通快递',
          currentLocation: '运输中 - 成都中转站',
          estimatedDelivery: '2024-05-26 12:00'
        }
      },
      statusMap: {
        pending: '待确认',
        confirmed: '已确认',
        cancelled: '已取消'
      }
    }
  },
  mounted() {
    const matchingId = this.$route.params.id;
    console.log('获取匹配详情，ID:', matchingId);
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    confirmMatching() {
      if (confirm('确定要确认该匹配吗？确认后将生成物流信息。')) {
        this.matchingDetail.status = 'confirmed';
        alert('匹配已确认，物流信息已生成');
      }
    },
    cancelMatching() {
      if (confirm('确定要取消该匹配吗？取消后将无法恢复。')) {
        this.matchingDetail.status = 'cancelled';
        delete this.matchingDetail.logisticsInfo;
        alert('匹配已取消');
      }
    }
  }
}
</script>

<style scoped>
.matching-detail {
  padding: 20px;
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
}

.card-header h2 {
  margin: 0;
  color: #333;
  font-size: 24px;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.card-body {
  padding: 20px;
}

.detail-section {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.detail-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.detail-section h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #555;
  font-size: 18px;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.detail-item label {
  font-weight: 600;
  color: #666;
  font-size: 14px;
}

.detail-item span {
  color: #333;
  font-size: 16px;
}

.info-card {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #e9ecef;
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

.match-degree {
  color: #28a745;
  font-weight: bold;
  font-size: 18px;
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

.logistics-info {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #e9ecef;
}

.action-buttons {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}

.analysis-card {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #e9ecef;
}

.analysis-item {
  margin-bottom: 20px;
}

.analysis-item:last-child {
  margin-bottom: 0;
}

.analysis-title {
  font-weight: 600;
  margin-bottom: 10px;
  color: #666;
}

.analysis-content {
  color: #333;
}

.factor-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.factor-name {
  width: 100px;
  font-weight: 500;
}

.factor-bar {
  flex: 1;
  height: 10px;
  background-color: #e9ecef;
  border-radius: 5px;
  overflow: hidden;
}

.factor-fill {
  height: 100%;
  background-color: #28a745;
  transition: width 0.3s ease;
}

.factor-score {
  width: 50px;
  font-weight: 600;
  text-align: right;
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