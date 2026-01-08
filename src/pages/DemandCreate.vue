<template>
  <div class="demand-create">
    <div class="card">
      <div class="card-header">
        <h2>发布灾区需求</h2>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitDemand">
          <div class="form-group">
            <label for="disasterArea">灾区名称</label>
            <input type="text" id="disasterArea" v-model="demandForm.disasterArea" required placeholder="请输入灾区名称">
          </div>

          <div class="form-group">
            <label for="materialName">需求物资名称</label>
            <input type="text" id="materialName" v-model="demandForm.materialName" required placeholder="请输入需求物资名称">
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="quantity">需求数量</label>
              <input type="number" id="quantity" v-model.number="demandForm.quantity" required min="1" placeholder="请输入需求数量">
            </div>
            <div class="form-group">
              <label for="unit">单位</label>
              <select id="unit" v-model="demandForm.unit" required>
                <option value="">请选择单位</option>
                <option value="箱">箱</option>
                <option value="件">件</option>
                <option value="个">个</option>
                <option value="条">条</option>
                <option value="双">双</option>
                <option value="袋">袋</option>
                <option value="瓶">瓶</option>
                <option value="箱">箱</option>
                <option value="吨">吨</option>
                <option value="公斤">公斤</option>
                <option value="其他">其他</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="category">物资类别</label>
            <select id="category" v-model="demandForm.category" required>
              <option value="">请选择物资类别</option>
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

          <div class="form-group">
            <label for="urgency">紧急程度</label>
            <select id="urgency" v-model="demandForm.urgency" required>
              <option value="">请选择紧急程度</option>
              <option value="一般">一般</option>
              <option value="紧急">紧急</option>
              <option value="非常紧急">非常紧急</option>
            </select>
          </div>

          <div class="form-group">
            <label for="description">需求描述</label>
            <textarea id="description" v-model="demandForm.description" rows="4" placeholder="请详细描述灾区需求情况、物资用途等信息"></textarea>
          </div>

          <div class="form-group">
            <label for="contactName">联系人</label>
            <input type="text" id="contactName" v-model="demandForm.contactName" required placeholder="请输入联系人姓名">
          </div>

          <div class="form-group">
            <label for="contactPhone">联系电话</label>
            <input type="tel" id="contactPhone" v-model="demandForm.contactPhone" required placeholder="请输入联系电话">
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="resetForm">重置</button>
            <button type="submit" class="btn btn-primary">发布需求</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DemandCreate',
  data() {
    return {
      demandForm: {
        disasterArea: '',
        materialName: '',
        quantity: null,
        unit: '',
        category: '',
        urgency: '',
        description: '',
        contactName: '',
        contactPhone: ''
      }
    }
  },
  methods: {
    submitDemand() {
      // 表单验证
      if (!this.demandForm.disasterArea || !this.demandForm.materialName || !this.demandForm.quantity || 
          !this.demandForm.unit || !this.demandForm.category || !this.demandForm.urgency ||
          !this.demandForm.contactName || !this.demandForm.contactPhone) {
        alert('请填写所有必填字段');
        return;
      }

      // 模拟提交需求
      console.log('提交需求:', this.demandForm);
      alert('需求发布成功！');
      this.$router.push('/demand/list');
    },
    resetForm() {
      this.demandForm = {
        disasterArea: '',
        materialName: '',
        quantity: null,
        unit: '',
        category: '',
        urgency: '',
        description: '',
        contactName: '',
        contactPhone: ''
      };
    }
  }
}
</script>

<style scoped>
.demand-create {
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

form {
  max-width: 800px;
}

.form-group {
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.form-row .form-group {
  flex: 1;
  margin-bottom: 0;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
}

input[type="text"],
input[type="number"],
input[type="tel"],
select,
textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
}

input[type="text"]:focus,
input[type="number"]:focus,
input[type="tel"]:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>