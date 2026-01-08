<template>
  <div class="admin-page">
    <div class="container">
      <div class="card">
        <div class="card-header">
          <h2>管理后台</h2>
        </div>
        <div class="card-body">
          <!-- 系统概览 -->
          <div class="overview-section">
            <h3>系统概览</h3>
            <div class="overview-grid">
              <div class="overview-card">
                <div class="overview-number">{{ stats.totalDonations }}</div>
                <div class="overview-label">总捐赠数</div>
              </div>
              <div class="overview-card">
                <div class="overview-number">{{ stats.totalDemands }}</div>
                <div class="overview-label">总需求数</div>
              </div>
              <div class="overview-card">
                <div class="overview-number">{{ stats.totalMatchings }}</div>
                <div class="overview-label">总匹配数</div>
              </div>
              <div class="overview-card">
                <div class="overview-number">{{ stats.totalUsers }}</div>
                <div class="overview-label">总用户数</div>
              </div>
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
              <!-- 捐赠信息管理 -->
              <div v-if="activeTab === 'donations'" class="tab-panel">
                <h3>捐赠信息管理</h3>
                <div class="table-container">
                  <table class="admin-table">
                    <thead>
                      <tr>
                        <th>捐赠ID</th>
                        <th>捐赠者</th>
                        <th>物资名称</th>
                        <th>数量</th>
                        <th>状态</th>
                        <th>发布时间</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="donation in adminDonations" :key="donation.id">
                        <td>{{ donation.id }}</td>
                        <td>{{ donation.donorName }}</td>
                        <td>{{ donation.materialName }}</td>
                        <td>{{ donation.quantity }} {{ donation.unit }}</td>
                        <td>
                          <span :class="['status-badge', donation.status]">
                            {{ statusMap[donation.status] }}
                          </span>
                        </td>
                        <td>{{ donation.createTime }}</td>
                        <td class="action-buttons">
                          <router-link :to="'/donation/' + donation.id" class="btn btn-sm btn-info">查看</router-link>
                          <button v-if="donation.status === 'pending'" class="btn btn-sm btn-primary" @click="approveDonation(donation.id)">审核通过</button>
                          <button class="btn btn-sm btn-danger" @click="deleteDonation(donation.id)">删除</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-if="adminDonations.length === 0" class="no-records">
                  暂无捐赠信息
                </div>
              </div>

              <!-- 需求信息管理 -->
              <div v-if="activeTab === 'demands'" class="tab-panel">
                <h3>需求信息管理</h3>
                <div class="table-container">
                  <table class="admin-table">
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
                      <tr v-for="demand in adminDemands" :key="demand.id">
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
                        <td class="action-buttons">
                          <router-link :to="'/demand/' + demand.id" class="btn btn-sm btn-info">查看</router-link>
                          <button v-if="demand.status === 'pending'" class="btn btn-sm btn-primary" @click="approveDemand(demand.id)">审核通过</button>
                          <button class="btn btn-sm btn-danger" @click="deleteDemand(demand.id)">删除</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-if="adminDemands.length === 0" class="no-records">
                  暂无需求信息
                </div>
              </div>

              <!-- 匹配信息管理 -->
              <div v-if="activeTab === 'matchings'" class="tab-panel">
                <h3>匹配信息管理</h3>
                <div class="table-container">
                  <table class="admin-table">
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
                      <tr v-for="matching in adminMatchings" :key="matching.id">
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
                        <td class="action-buttons">
                          <router-link :to="'/matching/' + matching.id" class="btn btn-sm btn-info">查看</router-link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-if="adminMatchings.length === 0" class="no-records">
                  暂无匹配信息
                </div>
              </div>

              <!-- 用户管理 -->
              <div v-if="activeTab === 'users'" class="tab-panel">
                <h3>用户管理</h3>
                <div class="table-container">
                  <table class="admin-table">
                    <thead>
                      <tr>
                        <th>用户ID</th>
                        <th>用户名</th>
                        <th>真实姓名</th>
                        <th>联系方式</th>
                        <th>角色</th>
                        <th>注册时间</th>
                        <th>状态</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="user in adminUsers" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.username }}</td>
                        <td>{{ user.realName }}</td>
                        <td>{{ user.phone }}</td>
                        <td>
                          <span :class="['role-badge', user.role]">
                            {{ roleMap[user.role] }}
                          </span>
                        </td>
                        <td>{{ user.registerTime }}</td>
                        <td>
                          <span :class="['status-badge', user.status]">
                            {{ user.status === 'active' ? '活跃' : '禁用' }}
                          </span>
                        </td>
                        <td class="action-buttons">
                          <button class="btn btn-sm btn-primary" @click="toggleUserStatus(user.id)">
                            {{ user.status === 'active' ? '禁用' : '启用' }}
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-if="adminUsers.length === 0" class="no-records">
                  暂无用户信息
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
  name: 'AdminPage',
  data() {
    return {
      stats: {
        totalDonations: 150,
        totalDemands: 85,
        totalMatchings: 78,
        totalUsers: 120
      },
      activeTab: 'donations',
      tabs: [
        { label: '捐赠管理', value: 'donations' },
        { label: '需求管理', value: 'demands' },
        { label: '匹配管理', value: 'matchings' },
        { label: '用户管理', value: 'users' }
      ],
      adminDonations: [
        {
          id: 1001,
          donorName: '爱心基金会',
          materialName: '矿泉水',
          quantity: 1000,
          unit: '箱',
          status: 'delivered',
          createTime: '2024-05-20 14:30'
        },
        {
          id: 1002,
          donorName: '慈善机构',
          materialName: '方便面',
          quantity: 500,
          unit: '箱',
          status: 'pending',
          createTime: '2024-05-22 09:15'
        }
      ],
      adminDemands: [
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
      adminMatchings: [
        {
          id: 3001,
          donationMaterial: '矿泉水',
          demandArea: '四川地震灾区',
          matchDegree: 95,
          status: 'confirmed',
          matchingTime: '2024-05-21 10:30'
        }
      ],
      adminUsers: [
        {
          id: 4001,
          username: '爱心用户',
          realName: '张爱心',
          phone: '13800138000',
          role: 'donor',
          registerTime: '2024-01-15 10:30',
          status: 'active'
        },
        {
          id: 4002,
          username: '灾区代表',
          realName: '王救援',
          phone: '13800138001',
          role: 'demander',
          registerTime: '2024-02-20 14:20',
          status: 'active'
        }
      ],
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
      },
      roleMap: {
        donor: '捐赠者',
        demander: '需求方',
        admin: '管理员'
      }
    }
  },
  methods: {
    getMatchDegreeClass(degree) {
      if (degree >= 90) return 'high';
      if (degree >= 70) return 'medium';
      return 'low';
    },
    approveDonation(id) {
      const donation = this.adminDonations.find(d => d.id === id);
      if (donation) {
        donation.status = 'approved';
        alert('捐赠信息审核通过');
      }
    },
    deleteDonation(id) {
      if (confirm('确定要删除该捐赠信息吗？')) {
        this.adminDonations = this.adminDonations.filter(d => d.id !== id);
        alert('捐赠信息已删除');
      }
    },
    approveDemand(id) {
      const demand = this.adminDemands.find(d => d.id === id);
      if (demand) {
        demand.status = 'approved';
        alert('需求信息审核通过');
      }
    },
    deleteDemand(id) {
      if (confirm('确定要删除该需求信息吗？')) {
        this.adminDemands = this.adminDemands.filter(d => d.id !== id);
        alert('需求信息已删除');
      }
    },
    toggleUserStatus(id) {
      const user = this.adminUsers.find(u => u.id === id);
      if (user) {
        user.status = user.status === 'active' ? 'inactive' : 'active';
        alert('用户状态已更新');
      }
    }
  }
}
</script>

<style scoped>
.admin-page {
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

.overview-section {
  margin-bottom: 30px;
}

.overview-section h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #555;
  font-size: 18px;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.overview-card {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.overview-number {
  font-size: 32px;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 5px;
}

.overview-label {
  color: #666;
  font-size: 14px;
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

.admin-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
}

.admin-table th,
.admin-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.admin-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #666;
}

.admin-table tr:hover {
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

.status-badge.active {
  background-color: #d4edda;
  color: #155724;
}

.status-badge.inactive {
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

.action-buttons {
  display: flex;
  gap: 8px;
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

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
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