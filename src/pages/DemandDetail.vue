<template>
  <div class="demand-detail">
    <div class="card">
      <div class="card-header">
        <h2>需求详情</h2>
        <button class="btn btn-secondary" @click="goBack">返回列表</button>
      </div>
      <div class="card-body">
        <div class="detail-section">
          <h3>基本信息</h3>
          <div class="detail-grid">
            <div class="detail-item">
              <label>灾区名称：</label>
              <span>{{ demandDetail.disasterArea }}</span>
            </div>
            <div class="detail-item">
              <label>需求物资：</label>
              <span>{{ demandDetail.materialName }}</span>
            </div>
            <div class="detail-item">
              <label>数量：</label>
              <span>{{ demandDetail.quantity }} {{ demandDetail.unit }}</span>
            </div>
            <div class="detail-item">
              <label>物资类别：</label>
              <span>{{ demandDetail.category }}</span>
            </div>
            <div class="detail-item">
              <label>紧急程度：</label>
              <span :class="['urgency-badge', demandDetail.urgency]">
                {{ demandDetail.urgency }}
              </span>
            </div>
            <div class="detail-item">
              <label>发布时间：</label>
              <span>{{ demandDetail.publishTime }}</span>
            </div>
            <div class="detail-item">
              <label>当前状态：</label>
              <span :class="['status-badge', demandDetail.status]">
                {{ statusMap[demandDetail.status] }}
              </span>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <h3>需求描述</h3>
          <div class="description-box">
            {{ demandDetail.description || '无详细描述' }}
          </div>
        </div>

        <div class="detail-section">
          <h3>联系人信息</h3>
          <div class="detail-grid">
            <div class="detail-item">
              <label>联系人：</label>
              <span>{{ demandDetail.contactName }}</span>
            </div>
            <div class="detail-item">
              <label>联系电话：</label>
              <span>{{ demandDetail.contactPhone }}</span>
            </div>
            <div class="detail-item">
              <label>灾区位置：</label>
              <span>{{ demandDetail.location }}</span>
            </div>
          </div>
        </div>

        <div v-if="demandDetail.matchingInfo" class="detail-section">
          <h3>匹配信息</h3>
          <div class="matching-info">
            <div class="detail-grid">
              <div class="detail-item">
                <label>匹配捐赠方：</label>
                <span>{{ demandDetail.matchingInfo.donorName }}</span>
              </div>
              <div class="detail-item">
                <label>匹配物资：</label>
                <span>{{ demandDetail.matchingInfo.materialName }}</span>
              </div>
              <div class="detail-item">
                <label>匹配数量：</label>
                <span>{{ demandDetail.matchingInfo.quantity }} {{ demandDetail.matchingInfo.unit }}</span>
              </div>
              <div class="detail-item">
                <label>匹配时间：</label>
                <span>{{ demandDetail.matchingInfo.matchingTime }}</span>
              </div>
              <div class="detail-item">
                <label>匹配度：</label>
                <span class="match-degree">{{ demandDetail.matchingInfo.matchDegree }}%</span>
              </div>
            </div>
            <div class="action-buttons">
              <router-link :to="'/matching/' + demandDetail.matchingInfo.matchingId" class="btn btn-info">查看匹配详情</router-link>
            </div>
          </div>
        </div>

        <div v-if="demandDetail.logisticsInfo" class="detail-section">
          <h3>物流信息</h3>
          <div class="logistics-info">
            <div class="detail-grid">
              <div class="detail-item">
                <label>物流单号：</label>
                <span>{{ demandDetail.logisticsInfo.trackingNumber }}</span>
              </div>
              <div class="detail-item">
                <label>物流公司：</label>
                <span>{{ demandDetail.logisticsInfo.carrier }}</span>
              </div>
              <div class="detail-item">
                <label>当前位置：</label>
                <span>{{ demandDetail.logisticsInfo.currentLocation }}</span>
              </div>
              <div class="detail-item">
                <label>预计送达：</label>
                <span>{{ demandDetail.logisticsInfo.estimatedDelivery }}</span>
              </div>
              <div class="detail-item">
                <label>物流状态：</label>
                <span>{{ demandDetail.logisticsInfo.status }}</span>
              </div>
            </div>
            <div class="action-buttons">
              <router-link :to="'/logistics/' + demandDetail.logisticsInfo.logisticsId" class="btn btn-info">查看物流详情</router-link>
            </div>
          </div>
        </div>

        <div class="action-section">
          <button v-if="demandDetail.status === 'pending'" class="btn btn-warning" @click="cancelDemand">取消需求</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DemandDetail',
  data() {
    return {
      demandDetail: {
        id: 1,
        disasterArea: '四川地震灾区',
        materialName: '饮用水',
        quantity: 1000,
        unit: '箱',
        category: '饮用水',
        urgency: '紧急',
        description: '灾区急需饮用水，满足灾民基本生活需求。由于地震导致供水系统损坏，目前灾区居民面临严重的饮用水短缺问题，急需大量瓶装饮用水支援。',
        contactName: '王救援',
        contactPhone: '13800138001',
        location: '四川省雅安市',
        publishTime: '2024-05-20 14:30',
        status: 'matched',
        matchingInfo: {
          matchingId: 102,
          donorName: '爱心基金会',
          materialName: '矿泉水',
          quantity: 1000,
          unit: '箱',
          matchingTime: '2024-05-21 16:30',
          matchDegree: 92
        },
        logisticsInfo: {
          logisticsId: 202,
          trackingNumber: 'YT9876543210',
          carrier: '圆通快递',
          currentLocation: '运输中 - 成都中转站',
          estimatedDelivery: '2024-05-26 12:00',
          status: '运输中'
        }
      },
      statusMap: {
        pending: '待匹配',
        matched: '已匹配',
        delivering: '配送中',
        completed: '已完成',
        cancelled: '已取消'
      }
    }
  },
  mounted() {
    // 这里可以根据路由参数获取真实的需求信息
    const demandId = this.$route.params.id;
    console.log('获取需求详情，ID:', demandId);
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    cancelDemand() {
      if (confirm('确定要取消该需求吗？')) {
        this.demandDetail.status = 'cancelled';
        delete this.demandDetail.matchingInfo;
        delete this.demandDetail.logisticsInfo;
        alert('需求已取消');
      }
    }
  }
}
</script>

<style scoped>
.demand-detail {
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
}

.card-header h2 {
  margin: 0;
  color: #333;
  font-size: 24px;
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

.description-box {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
  color: #333;
  min-height: 80px;
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

.matching-info, .logistics-info {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #e9ecef;
}

.match-degree {
  color: #28a745;
  font-weight: bold;
}

.action-buttons {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}

.action-section {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
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