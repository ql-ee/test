<template>
  <div class="user-center-page">
    <div class="container">
      <div class="card">
        <div class="card-header">
          <h2>个人中心</h2>
        </div>
        <div class="card-body">
          <div class="user-info-section">
            <h3>基本信息</h3>
            <div class="user-info">
              <div class="info-item">
                <label>用户名：</label>
                <span>{{ userInfo.username }}</span>
              </div>
              <div class="info-item">
                <label>真实姓名：</label>
                <span>{{ userInfo.realName }}</span>
              </div>
              <div class="info-item">
                <label>联系方式：</label>
                <span>{{ userInfo.phone }}</span>
              </div>
              <div class="info-item">
                <label>邮箱：</label>
                <span>{{ userInfo.email }}</span>
              </div>
              <div class="info-item">
                <label>用户角色：</label>
                <span :class="['role-badge', userInfo.role]">
                  {{ roleMap[userInfo.role] }}
                </span>
              </div>
              <div class="info-item">
                <label>注册时间：</label>
                <span>{{ userInfo.registerTime }}</span>
              </div>
            </div>
            <div class="action-buttons">
              <button class="btn btn-primary">编辑信息</button>
              <button class="btn btn-secondary">修改密码</button>
            </div>
          </div>

          <div class="tabs-section">
            <div class="tabs">
              <button 
                v-for="tab in tabs" 
                :key="tab.value" 
                :class="['tab-button', { active: activeTab === tab.value }]"
                @click="activeTab = tab.value"
              >
                {{ tab.label }}
              </button>
            </div>

            <div class="tab-content">
              <!-- 我的捐赠记录 -->
              <div v-if="activeTab === 'donations'" class="tab-panel">
                <h3>我的捐赠记录</h3>
                <div class="table-container">
                  <table class="record-table">
                    <thead>
                      <tr>
                        <th>捐赠ID</th>
                        <th>物资名称</th>
                        <th>数量</th>
                        <th>状态</th>
                        <th>发布时间</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="donation in userDonations" :key="donation.id">
                        <td>{{ donation.id }}</td>
                        <td>{{ donation.materialName }}</td>
                        <td>{{ donation.quantity }} {{ donation.unit }}</td>
                        <td>
                          <span :class="['status-badge', donation.status]">
                            {{ statusMap[donation.status] }}
                          </span>
                        </td>
                        <td>{{ donation.createTime }}</td>
                        <td>
                          <router-link :to="'/donation/' + donation.id" class="btn btn-sm btn-info">查看详情</router-link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-if="userDonations.length === 0" class="no-records">
                  暂无捐赠记录
                </div>
              </div>

              <!-- 我的需求记录 -->
              <div v-if="activeTab === 'demands'" class="tab-panel">
                <h3>我的需求记录</h3>
                <div class="table-container">
                  <table class="record-table">
                    <thead>
                      <tr>
                        <th>需求ID</th>
                        <th>灾区名称</th>
                        <th>物资名称</th>
                        <th>数量</th>
                        <th>紧急度</th>
                        <th>状态</th>
                        <th>发布时间</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="demand in userDemands" :key="demand.id">
                        <td>{{ demand.id }}</td>
                        <td>{{ demand.disasterArea }}</td>
                        <td>{{ demand.materialName }}</td>
                        <td>{{ demand.quantity }} {{ demand.unit }}</td>
                        <td>
                          <span :class="['urgency-badge', demand.urgency]">
                            {{ urgencyMap[demand.urgency] }}
                          </span>
                        </td>
                        <td>
                          <span :class="['status-badge', demand.status]">
                            {{ statusMap[demand.status] }}
                          </span>
                        </td>
                        <td>{{ demand.createTime }}</td>
                        <td>
                          <router-link :to="'/demand/' + demand.id" class="btn btn-sm btn-info">查看详情</router-link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-if="userDemands.length === 0" class="no-records">
                  暂无需求记录
                </div>
              </div>

              <!-- 我的匹配记录 -->
              <div v-if="activeTab === 'matchings'" class="tab-panel">
                <h3>我的匹配记录</h3>
                <div class="table-container">
                  <table class="record-table">
                    <thead>
                      <tr>
                        <th>匹配ID</th>
                        <th>捐赠物资</th>
                        <th>需求灾区</th>
                        <th>匹配度</th>
                        <th>状态</th>
                        <th>匹配时间</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="matching in userMatchings" :key="matching.id">
                        <td>{{ matching.id }}</td>
                        <td>{{ matching.donationMaterial }}</td>
                        <td>{{ matching.demandArea }}</td>
                        <td>
                          <span :class="['match-degree', getMatchDegreeClass(matching.matchDegree)]">
                            {{ matching.matchDegree }}%
                          </span>
                        </td>
                        <td>
                          <span :class="['status-badge', matching.status]">
                            {{ matchingStatusMap[matching.status] }}
                          </span>
                        </td>
                        <td>{{ matching.matchingTime }}</td>
                        <td>
                          <router-link :to="'/matching/' + matching.id" class="btn btn-sm btn-info">查看详情</router-link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-if="userMatchings.length === 0" class="no-records">
                  暂无匹配记录
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
  name: 'UserCenterPage',
  data() {
    return {
      userInfo: {
        username: '爱心用户',
        realName: '张爱心',
        phone: '13800138000',
        email: 'love@example.com',
        role: 'donor',
        registerTime: '2024-01-15 10:30'
      },
      userDonations: [
        {
          id: 1001,
          materialName: '矿泉水',
          quantity: 1000,
          unit: '箱',
          status: 'delivered',
          createTime: '2024-05-20 14:30'
        },
        {
          id: 1002,
          materialName: '方便面',
          quantity: 500,
          unit: '箱',
          status: 'matched',
          createTime: '2024-05-22 09:15'
        }
      ],
      userDemands: [
        {
          id: 2001,
          disasterArea: '四川地震灾区',
          materialName: '帐篷',
          quantity: 200,
          unit: '顶',
          urgency: 'urgent',
          status: 'matched',
          createTime: '2024-05-21 16:45'
        }
      ],
      userMatchings: [
        {
          id: 3001,
          donationMaterial: '矿泉水',
          demandArea: '四川地震灾区',
          matchDegree: 95,
          status: 'confirmed',
          matchingTime: '2024-05-21 10:30'
        }
      ],
      activeTab: 'donations',
      tabs: [
        { label: '我的捐赠', value: 'donations' },
        { label: '我的需求', value: 'demands' },
        { label: '我的匹配', value: 'matchings' }
      ],
      roleMap: {
        donor: '捐赠者',
        demander: '需求方',
        admin: '管理员'
      },
      statusMap: {
        pending: '待审核',
        approved: '已审核',
        matched: '已匹配',
        delivering: '运输中',
        delivered: '已送达',
        completed: '已完成',
        cancelled: '已取消'
      },
      urgencyMap: {
        normal: '一般',
        urgent: '紧急',
        veryUrgent: '非常紧急'
      },
      matchingStatusMap: {
        pending: '待确认',
        confirmed: '已确认',
        cancelled: '已取消'
      }
    }
  },
  methods: {
    getMatchDegreeClass(degree) {
      if (degree >= 90) return 'high';
      if (degree >= 70) return 'medium';
      return 'low';
    }
  }
}
</script>

<style scoped>
.user-center-page {
  padding: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
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
  font-size: 24px;
}

.card-body {
  padding: 20px;
}

.user-info-section {
  margin-bottom: 30px;
}

.user-info-section h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #555;
  font-size: 18px;
}

.user-info {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 4px;
  border: 1px solid #e9ecef;
  margin-bottom: 15px;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-item label {
  width: 120px;
  font-weight: 600;
  color: #666;
}

.info-item span {
  color: #333;
  font-size: 16px;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.tabs-section {
  border: 1px solid #e9ecef;
  border-radius: 4px;
  overflow: hidden;
}

.tabs {
  display: flex;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.tab-button {
  padding: 12px 20px;
  background: none;
  border: none;
  border-right: 1px solid #e9ecef;
  cursor: pointer;
  font-size: 16px;
  color: #666;
  transition: all 0.3s;
}

.tab-button:last-child {
  border-right: none;
}

.tab-button:hover {
  background-color: #e9ecef;
}

.tab-button.active {
  background-color: #fff;
  color: #007bff;
  border-bottom: 2px solid #007bff;
}

.tab-content {
  padding: 20px;
}

.tab-panel h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #555;
  font-size: 18px;
}

.table-container {
  overflow-x: auto;
  margin-bottom: 20px;
}

.record-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
}

.record-table th,
.record-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.record-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #666;
}

.record-table tr:hover {
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

.status-badge.approved {
  background-color: #d1ecf1;
  color: #0c5460;
}

.status-badge.matched {
  background-color: #cce7ff;
  color: #0056b3;
}

.status-badge.delivering {
  background-color: #d1ecf1;
  color: #0c5460;
}

.status-badge.delivered {
  background-color: #d4edda;
  color: #155724;
}

.status-badge.completed {
  background-color: #c3e6cb;
  color: #0b2e13;
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

.urgency-badge.normal {
  background-color: #d4edda;
  color: #155724;
}

.urgency-badge.urgent {
  background-color: #fff3cd;
  color: #856404;
}

.urgency-badge.veryUrgent {
  background-color: #f8d7da;
  color: #721c24;
}

.role-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  display: inline-block;
}

.role-badge.donor {
  background-color: #d4edda;
  color: #155724;
}

.role-badge.demander {
  background-color: #cce7ff;
  color: #0056b3;
}

.role-badge.admin {
  background-color: #fff3cd;
  color: #856404;
}

.match-degree {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  display: inline-block;
}

.match-degree.high {
  background-color: #d4edda;
  color: #155724;
}

.match-degree.medium {
  background-color: #fff3cd;
  color: #856404;
}

.match-degree.low {
  background-color: #f8d7da;
  color: #721c24;
}

.no-records {
  text-align: center;
  padding: 40px;
  color: #666;
  font-style: italic;
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

.btn-sm {
  padding: 4px 8px;
  font-size: 12px;
}
</style>