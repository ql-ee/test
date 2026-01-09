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
            <!-- 普通信息展示模式 -->
            <div v-if="!isEditing" class="user-info">
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
                <label>注册时间：</label>
                <span>{{ userInfo.registerTime }}</span>
              </div>
            </div>
            
            <!-- 编辑模式表单 -->
            <div v-else class="edit-form">
              <div class="info-item">
                <label>用户名：</label>
                <input type="text" v-model="editForm.username" class="form-input">
              </div>
              <div class="info-item">
                <label>真实姓名：</label>
                <input type="text" v-model="editForm.realName" class="form-input">
              </div>
              <div class="info-item">
                <label>联系方式：</label>
                <input type="tel" v-model="editForm.phone" class="form-input">
              </div>
              <div class="info-item">
                <label>邮箱：</label>
                <input type="email" v-model="editForm.email" class="form-input">
              </div>
              
              <div class="info-item">
                <label>注册时间：</label>
                <span>{{ userInfo.registerTime }}</span>
              </div>
            </div>
            
            <!-- 操作按钮 -->
            <div class="action-buttons">
              <div v-if="!isEditing">
                <button class="btn btn-primary" @click="startEdit">编辑信息</button>
                <button class="btn btn-secondary" @click="changePassword">修改密码</button>
              </div>
              <div v-else>
                <button class="btn btn-primary" @click="saveEdit">保存</button>
                <button class="btn btn-secondary" @click="cancelEdit">取消</button>
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
        registerTime: '2024-01-15 10:30'
      },
      // 编辑信息相关
      isEditing: false,
      editForm: {},
      originalUserInfo: {},
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
    },
    // 编辑信息相关方法
    startEdit() {
      this.isEditing = true;
      // 复制当前用户信息到编辑表单
      this.editForm = JSON.parse(JSON.stringify(this.userInfo));
      // 保存原始信息以便取消编辑时恢复
      this.originalUserInfo = JSON.parse(JSON.stringify(this.userInfo));
    },
    saveEdit() {
      // 验证表单数据
      if (!this.editForm.username || !this.editForm.realName || !this.editForm.phone || !this.editForm.email) {
        alert('请填写所有必填字段');
        return;
      }
      
      // 简单的邮箱格式验证
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.editForm.email)) {
        alert('请输入有效的邮箱地址');
        return;
      }
      
      // 简单的手机号格式验证
      const phoneRegex = /^1[3-9]\d{9}$/;
      if (!phoneRegex.test(this.editForm.phone)) {
        alert('请输入有效的手机号码');
        return;
      }
      
      // 保存编辑后的信息
      this.userInfo = JSON.parse(JSON.stringify(this.editForm));
      this.isEditing = false;
      alert('信息编辑成功');
    },
    cancelEdit() {
      // 恢复原始信息并退出编辑模式
      this.userInfo = JSON.parse(JSON.stringify(this.originalUserInfo));
      this.isEditing = false;
    },
    changePassword() {
      alert('修改密码功能将在后续版本中实现');
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

.form-input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  width: 250px;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.edit-form {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 4px;
  border: 1px solid #e9ecef;
  margin-bottom: 15px;
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