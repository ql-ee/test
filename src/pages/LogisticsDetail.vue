<template>
  <div class="logistics-detail">
    <div class="card">
      <div class="card-header">
        <h2>物流详情</h2>
        <div class="header-actions">
          <button class="btn btn-secondary" @click="goBack">返回列表</button>
        </div>
      </div>
      <div class="card-body">
        <div class="detail-section">
          <h3>物流基本信息</h3>
          <div class="detail-grid">
            <div class="detail-item">
              <label>物流ID：</label>
              <span>{{ logisticsDetail.id }}</span>
            </div>
            <div class="detail-item">
              <label>物流单号：</label>
              <span class="tracking-number">{{ logisticsDetail.trackingNumber }}</span>
            </div>
            <div class="detail-item">
              <label>物流公司：</label>
              <span>{{ logisticsDetail.carrier }}</span>
            </div>
            <div class="detail-item">
              <label>物流状态：</label>
              <span :class="['status-badge', logisticsDetail.status]">
                {{ statusMap[logisticsDetail.status] }}
              </span>
            </div>
            <div class="detail-item">
              <label>当前位置：</label>
              <span>{{ logisticsDetail.currentLocation }}</span>
            </div>
            <div class="detail-item">
              <label>预计送达：</label>
              <span>{{ logisticsDetail.estimatedDelivery }}</span>
            </div>
            <div class="detail-item">
              <label>发货地点：</label>
              <span>{{ logisticsDetail.startLocation }}</span>
            </div>
            <div class="detail-item">
              <label>目的地：</label>
              <span>{{ logisticsDetail.destination }}</span>
            </div>
          </div>
        </div>
        
        <div class="detail-section">
          <h3>物资信息</h3>
          <div class="info-card">
            <div class="detail-grid">
              <div class="detail-item">
                <label>物资名称：</label>
                <span>{{ logisticsDetail.materialName }}</span>
              </div>
              <div class="detail-item">
                <label>数量：</label>
                <span>{{ logisticsDetail.quantity }} {{ logisticsDetail.unit }}</span>
              </div>
              <div class="detail-item">
                <label>捐赠ID：</label>
                <span>{{ logisticsDetail.donationId }}</span>
              </div>
              <div class="detail-item">
                <label>需求ID：</label>
                <span>{{ logisticsDetail.demandId }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="detail-section">
          <h3>捐赠方信息</h3>
          <div class="info-card">
            <div class="detail-grid">
              <div class="detail-item">
                <label>捐赠方名称：</label>
                <span>{{ logisticsDetail.donorInfo.donorName }}</span>
              </div>
              <div class="detail-item">
                <label>联系人：</label>
                <span>{{ logisticsDetail.donorInfo.contactName }}</span>
              </div>
              <div class="detail-item">
                <label>联系电话：</label>
                <span>{{ logisticsDetail.donorInfo.contactPhone }}</span>
              </div>
              <div class="detail-item">
                <label>捐赠地址：</label>
                <span>{{ logisticsDetail.donorInfo.address }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="detail-section">
          <h3>需求方信息</h3>
          <div class="info-card">
            <div class="detail-grid">
              <div class="detail-item">
                <label>需求方名称：</label>
                <span>{{ logisticsDetail.demandInfo.demandName }}</span>
              </div>
              <div class="detail-item">
                <label>联系人：</label>
                <span>{{ logisticsDetail.demandInfo.contactName }}</span>
              </div>
              <div class="detail-item">
                <label>联系电话：</label>
                <span>{{ logisticsDetail.demandInfo.contactPhone }}</span>
              </div>
              <div class="detail-item">
                <label>需求地址：</label>
                <span>{{ logisticsDetail.demandInfo.address }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="detail-section">
          <h3>物流跟踪记录</h3>
          <div class="tracking-record">
            <div v-for="(record, index) in logisticsDetail.trackingRecords" :key="index" class="record-item">
              <div class="record-time">{{ record.time }}</div>
              <div class="record-content">{{ record.content }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogisticsDetail',
  data() {
    return {
      logisticsDetail: {
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
        demandId: 2001,
        donorInfo: {
          donorName: '爱心基金会',
          contactName: '张经理',
          contactPhone: '13800138001',
          address: '北京市朝阳区建国路88号'
        },
        demandInfo: {
          demandName: '四川地震灾区',
          contactName: '王救援',
          contactPhone: '13800138002',
          address: '四川省雅安市芦山县'
        },
        trackingRecords: [
          {
            time: '2024-05-23 10:00',
            content: '您的包裹已由圆通快递揽收，单号：YT9876543210'
          },
          {
            time: '2024-05-23 18:00',
            content: '您的包裹已到达北京中转站'
          },
          {
            time: '2024-05-24 06:00',
            content: '您的包裹已发出，正在运往成都中转站'
          },
          {
            time: '2024-05-25 12:00',
            content: '您的包裹已到达成都中转站，正在分拣'
          },
          {
            time: '2024-05-25 18:00',
            content: '您的包裹已发出，正在运往雅安市'
          }
        ]
      },
      statusMap: {
        pending: '待发货',
        transporting: '运输中',
        delivered: '已送达',
        received: '已签收',
        cancelled: '已取消'
      }
    }
  },
  mounted() {
    const logisticsId = this.$route.params.id;
    console.log('获取物流详情，ID:', logisticsId);
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
.logistics-detail {
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

.tracking-number {
  font-weight: bold;
  color: #007bff;
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

.tracking-record {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #e9ecef;
}

.record-item {
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
}

.record-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.record-time {
  font-weight: 600;
  color: #666;
  margin-bottom: 5px;
  font-size: 14px;
}

.record-content {
  color: #333;
  font-size: 16px;
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
</style>