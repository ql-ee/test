<template>
  <div class="student-container">
    <!-- 工具栏 -->
    <div class="toolbar">
      <button class="btn btn-primary" @click="dialogVisible = true">添加学生</button>
      <button class="btn btn-secondary" @click="handleRefresh">刷新数据</button>
      <button class="btn btn-danger" @click="handleLogout">退出登录</button>
    </div>

    <!-- 学生列表表格 -->
    <div class="student-card">
      <table class="student-table">
        <thead>
          <tr>
            <th width="80" @click="handleSort('id')">
              ID <span :class="getSortIcon('id')"></span>
            </th>
            <th @click="handleSort('name')">
              姓名 <span :class="getSortIcon('name')"></span>
            </th>
            <th @click="handleSort('age')">
              年龄 <span :class="getSortIcon('age')"></span>
            </th>
            <th width="100" @click="handleSort('gender')">
              性别 <span :class="getSortIcon('gender')"></span>
            </th>
            <th @click="handleSort('class')">
              班级 <span :class="getSortIcon('class')"></span>
            </th>
            <th @click="handleSort('score')">
              成绩 <span :class="getSortIcon('score')"></span>
            </th>
            <th width="200">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in studentList" :key="student.id">
            <td>{{ student.id }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.age }}</td>
            <td>{{ student.gender === 'male' ? '男' : '女' }}</td>
            <td>{{ student.class }}</td>
            <td>{{ student.score }}</td>
            <td>
              <button class="btn btn-sm btn-primary" @click="handleEdit(student)">编辑</button>
              <button class="btn btn-sm btn-danger" @click="handleDelete(student.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 分页控件 -->
      <div class="pagination-container">
        <div class="pagination-info">
          共 {{ total }} 条记录，当前第 {{ currentPage }} 页，共 {{ Math.ceil(total / pageSize) }} 页
        </div>
        <div class="pagination-controls">
          <button 
            class="btn btn-sm" 
            @click="handleCurrentChange(1)" 
            :disabled="currentPage === 1"
          >
            首页
          </button>
          <button 
            class="btn btn-sm" 
            @click="handleCurrentChange(currentPage - 1)" 
            :disabled="currentPage === 1"
          >
            上一页
          </button>
          <button 
            class="btn btn-sm" 
            @click="handleCurrentChange(currentPage + 1)" 
            :disabled="currentPage === Math.ceil(total / pageSize)"
          >
            下一页
          </button>
          <button 
            class="btn btn-sm" 
            @click="handleCurrentChange(Math.ceil(total / pageSize))" 
            :disabled="currentPage === Math.ceil(total / pageSize)"
          >
            末页
          </button>
          <select v-model="pageSize" class="page-size-select" @change="handleSizeChange">
            <option value="5">5条/页</option>
            <option value="10">10条/页</option>
            <option value="20">20条/页</option>
            <option value="50">50条/页</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 添加/编辑对话框 -->
    <div v-if="dialogVisible" class="dialog-overlay">
      <div class="dialog-container">
        <div class="dialog-header">
          <h3 class="dialog-title">{{ dialogTitle }}</h3>
          <button class="dialog-close" @click="dialogVisible = false">&times;</button>
        </div>
        <div class="dialog-content">
          <form @submit.prevent="handleSubmit" class="student-form">
            <div class="form-group">
              <label for="student-name">姓名</label>
              <input 
                type="text" 
                id="student-name" 
                v-model="form.name" 
                placeholder="请输入学生姓名"
                required
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label for="student-age">年龄</label>
              <input 
                type="number" 
                id="student-age" 
                v-model="form.age" 
                min="1" 
                max="100" 
                placeholder="请输入学生年龄"
                required
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label>性别</label>
              <div class="radio-group">
                <label>
                  <input type="radio" v-model="form.gender" value="male" required />
                  <span>男</span>
                </label>
                <label>
                  <input type="radio" v-model="form.gender" value="female" required />
                  <span>女</span>
                </label>
              </div>
            </div>
            <div class="form-group">
              <label for="student-class">班级</label>
              <input 
                type="text" 
                id="student-class" 
                v-model="form.class" 
                placeholder="请输入班级"
                required
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label for="student-score">成绩</label>
              <input 
                type="number" 
                id="student-score" 
                v-model="form.score" 
                min="0" 
                max="100" 
                step="0.5"
                placeholder="请输入成绩"
                required
                class="form-input"
              />
            </div>
            <div class="form-actions">
              <button type="button" class="btn btn-secondary" @click="dialogVisible = false">取消</button>
              <button type="submit" class="btn btn-primary" :disabled="dialogLoading">
                {{ dialogLoading ? '处理中...' : '确定' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStudentList, addStudent, updateStudent, deleteStudent, logout } from '../services/api.js'

export default {
  name: 'StudentPage',
  data() {
    return {
      studentList: [],
      dialogVisible: false,
      dialogTitle: '添加学生',
      isEdit: false,
      form: {
        id: '',
        name: '',
        age: '',
        gender: 'male',
        class: '',
        score: ''
      },
      loading: false,
      dialogLoading: false,
      // 分页相关
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 排序相关
      sortField: '',
      sortOrder: ''
    }
  },
  mounted() {
    // 检查登录状态
    if (!localStorage.getItem('isLoggedIn')) {
      this.$router.push('/login')
      return
    }
    // 初始化学生数据
    this.initData()
  },
  methods: {
    async initData() {
      this.loading = true
      try {
        const response = await getStudentList({
          page: this.currentPage,
          size: this.pageSize,
          sortField: this.sortField,
          sortOrder: this.sortOrder
        })
        this.studentList = response.data.list
        this.total = response.data.total
      } catch (error) {
        alert('获取学生列表失败')
      } finally {
        this.loading = false
      }
    },
    async handleRefresh() {
      await this.initData()
      alert('数据已刷新')
    },
    async handleLogout() {
      try {
        await logout()
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('userToken')
        localStorage.removeItem('userInfo')
        this.$router.push('/login')
        alert('已退出登录')
      } catch (error) {
        alert('退出登录失败')
      }
    },
    handleEdit(row) {
      this.isEdit = true
      this.dialogTitle = '编辑学生'
      this.form = { ...row }
      this.dialogVisible = true
    },
    async handleDelete(id) {
      if (confirm('确定要删除该学生吗？')) {
        try {
          await deleteStudent(id)
          this.studentList = this.studentList.filter(student => student.id !== id)
          alert('删除成功')
        } catch (error) {
          alert('删除失败')
        }
      }
    },
    async handleSubmit() {
      // 表单验证已通过HTML5 required属性处理
      this.dialogLoading = true
      try {
        if (this.isEdit) {
          // 编辑学生
          const response = await updateStudent(this.form.id, this.form)
          const index = this.studentList.findIndex(item => item.id === this.form.id)
          if (index !== -1) {
            this.studentList[index] = response.data
          }
          alert('编辑成功')
        } else {
          // 添加学生
          const response = await addStudent(this.form)
          this.studentList.push(response.data)
          alert('添加成功')
        }
        this.dialogVisible = false
        this.resetForm()
      } catch (error) {
        alert(this.isEdit ? '编辑失败' : '添加失败')
      } finally {
        this.dialogLoading = false
      }
    },
    resetForm() {
      this.isEdit = false
      this.dialogTitle = '添加学生'
      this.form = {
        id: '',
        name: '',
        age: '',
        gender: 'male',
        class: '',
        score: ''
      }
    },
    // 分页相关方法
    handleCurrentChange(page) {
      if (page < 1) return
      const totalPages = Math.ceil(this.total / this.pageSize) || 1
      if (page > totalPages) return
      this.currentPage = page
      this.initData()
    },
    handleSizeChange() {
      this.currentPage = 1
      this.initData()
    },
    // 排序相关方法
    handleSort(field) {
      // 如果点击的是当前排序字段，则切换排序顺序
      if (this.sortField === field) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        // 否则设置新的排序字段和默认排序顺序
        this.sortField = field
        this.sortOrder = 'asc'
      }
      // 重置到第一页
      this.currentPage = 1
      // 重新获取数据
      this.initData()
    },
    getSortIcon(field) {
      if (this.sortField !== field) {
        return 'sort-icon'
      }
      return this.sortOrder === 'asc' ? 'sort-icon asc' : 'sort-icon desc'
    }
  }
}
</script>

<style scoped>
.student-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.toolbar {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

/* 按钮样式 */
.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background-color: #409eff;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #66b1ff;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #868e96;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background-color: #e35d6a;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-sm {
  padding: 4px 12px;
  font-size: 12px;
  margin-right: 8px;
}

/* 卡片样式 */
.student-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

/* 表格样式 */
.student-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.student-table th,
.student-table td {
  padding: 12px;
  border-bottom: 1px solid #e9ecef;
}

.student-table th {
  background-color: #f8f9fa;
  font-weight: bold;
}

/* 对话框样式 */
.dialog-overlay {
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

.dialog-container {
  background-color: white;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e9ecef;
}

.dialog-title {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.dialog-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  padding: 0;
  width: 24px;
  height: 24px;
  line-height: 1;
}

.dialog-content {
  padding: 20px;
}

/* 表单样式 */
.student-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 分页样式 */
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
}

.pagination-info {
  font-size: 14px;
  color: #606266;
}

.pagination-controls {
  display: flex;
  gap: 8px;
  align-items: center;
}

.pagination-controls .btn {
  background-color: #f8f9fa;
  color: #606266;
  border: 1px solid #dcdfe6;
}

.pagination-controls .btn:hover:not(:disabled) {
  background-color: #ecf5ff;
  border-color: #c6e2ff;
  color: #409eff;
}

.pagination-controls .btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-size-select {
  padding: 6px 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  color: #606266;
  cursor: pointer;
}

.page-size-select:focus {
  outline: none;
  border-color: #409eff;
}

/* 排序图标样式 */
.student-table th {
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sort-icon {
  position: relative;
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-left: 5px;
}

.sort-icon::before,
.sort-icon::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border: 4px solid transparent;
}

.sort-icon::before {
  top: 0;
  border-bottom-color: #c0c4cc;
  border-top-width: 0;
}

.sort-icon::after {
  bottom: 0;
  border-top-color: #c0c4cc;
  border-bottom-width: 0;
}

.sort-icon.asc::before {
  border-bottom-color: #409eff;
}

.sort-icon.desc::after {
  border-top-color: #409eff;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  font-size: 14px;
  color: #606266;
}

.form-input {
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #409eff;
}

.radio-group {
  display: flex;
  gap: 20px;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}
</style>