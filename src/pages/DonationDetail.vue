<template>
  <div class="donation-detail">
    <div class="card">
      <div class="card-header">
        <h2>捐赠物资详情</h2>
        <button class="btn btn-secondary" @click="goBack">返回列表</button>
      </div>
      <div class="card-body">
        <div class="detail-section">
          <h3>基本信息</h3>
          <div class="detail-grid">
            <div class="detail-item">
              <label>物资名称：</label>
              <span>{{ donationDetail.materialName }}</span>
            </div>
            <div class="detail-item">
              <label>数量：</label>
              <span>{{ donationDetail.quantity }} {{ donationDetail.unit }}</span>
            </div>
            <div class="detail-item">
              <label>物资类别：</label>
              <span>{{ donationDetail.category }}</span>
            </div>
            <div class="detail-item">
              <label>发布时间：</label>
              <span>{{ donationDetail.publishTime }}</span>
            </div>
            <div class="detail-item">
              <label>当前状态：</label>
              <span :class="['status-badge', donationDetail.status]">
                {{ statusMap[donationDetail.status] }}
              </span>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <h3>物资描述</h3>
          <div class="description-box">
            {{ donationDetail.description || '无详细描述' }}
          </div>
        </div>

        <div class="detail-section">
          <h3>联系人信息</h3>
          <div class="detail-grid">
            <div class="detail-item">
              <label>联系人：</label>
              <span>{{ donationDetail.contactName }}</span>
            </div>
            <div class="detail-item">
              <label>联系电话：</label>
              <span>{{ donationDetail.contactPhone }}</span>
            </div>
            <div class="detail-item">
              <label>物资位置：</label>
              <span>{{ donationDetail.location }}</span>
            </div>
          </div>
        </div>

        <div v-if="donationDetail.matchingInfo" class="detail-section">
          <h3>匹配信息</h3>
          <div class="matching-info">
            <div class="detail-grid">
              <div class="detail-item">
                <label>匹配灾区：</label>
                <span>{{ donationDetail.matchingInfo.disasterArea }}</span>
              </div>
              <div class="detail-item">
                <label>匹配需求：</label>
                <span>{{ donationDetail.matchingInfo.demandName }}</span>
              </div>
              <div class="detail-item">
                <label>匹配时间：</label>
                <span>{{ donationDetail.matchingInfo.matchingTime }}</span>
              </div>
              <div class="detail-item">
                <label>匹配度：</label>
                <span class="match-degree">{{ donationDetail.matchingInfo.matchDegree }}%</span>
              </div>
            </div>
            <div class="action-buttons">
              <router-link :to="'/matching/' + donationDetail.matchingInfo.matchingId" class="btn btn-info">查看匹配详情</router-link>
            </div>
          </div>
        </div>

        <div v-if="donationDetail.logisticsInfo" class="detail-section">
          <h3>物流信息</h3>
          <div class="logistics-info">
            <div class="detail-grid">
              <div class="detail-item">
                <label>物流单号：</label>
                <span>{{ donationDetail.logisticsInfo.trackingNumber }}</span>
              </div>
              <div class="detail-item">
                <label>物流公司：</label>
                <span>{{ donationDetail.logisticsInfo.carrier }}</span>
              </div>
              <div class="detail-item">
                <label>当前位置：</label>
                <span>{{ donationDetail.logisticsInfo.currentLocation }}</span>
              </div>
              <div class="detail-item">
                <label>预计送达：</label>
                <span>{{ donationDetail.logisticsInfo.estimatedDelivery }}</span>
              </div>
            </div>
            <div class="action-buttons">
              <router-link :to="'/logistics/' + donationDetail.logisticsInfo.logisticsId" class="btn btn-info">查看物流详情</router-link>
            </div>
          </div>
        </div>

        <div class="action-section">
          <button v-if="donationDetail.status === 'pending'" class="btn btn-warning" @click="cancelDonation">取消捐赠</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DonationDetail',
  data() {
    return {
      donationDetail: {
        id: 1,
        materialName: '矿泉水',
        quantity: 500,
        unit: '箱',
        category: '饮用水',
        description: '瓶装矿泉水，生产日期2024年5月，保质期12个月，每箱24瓶，每瓶550ml。',
        contactName: '张三',
        contactPhone: '13800138000',
        location: '北京市朝阳区某某仓库',
        publishTime: '2024-05-20 10:30',
        status: 'matched',
        matchingInfo: {
          matchingId: 101,
          disasterArea: '某地震灾区',
          demandName: '饮用水需求',
          matchingTime: '2024-05-21 15:45',
          matchDegree: 95
        },
        logisticsInfo: {
          logisticsId: 201,
          trackingNumber: 'SF1234567890',
          carrier: '顺丰速运',
          currentLocation: '运输中 - 成都中转站',
          estimatedDelivery: '2024-05-25 18:00'
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
    // 这里可以根据路由参数获取真实的捐赠信息
    const donationId = this.$route.params.id;
    console.log('获取捐赠详情，ID:', donationId);
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    cancelDonation() {
      if (confirm('确定要取消该捐赠吗？')) {
        this.donationDetail.status = 'cancelled';
        delete this.donationDetail.matchingInfo;
        delete this.donationDetail.logisticsInfo;
        alert('捐赠已取消');
      }
    }
  }
}
</script>

<style scoped>
.donation-detail {
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