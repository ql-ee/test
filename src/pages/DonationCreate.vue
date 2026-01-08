<template>
  <div class="donation-create">
    <div class="card">
      <h2>发布捐赠物资</h2>
      <form @submit.prevent="submitDonation">
        <div class="form-group">
          <label for="materialName">物资名称</label>
          <input type="text" id="materialName" v-model="donationForm.materialName" required placeholder="请输入物资名称">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="quantity">数量</label>
            <input type="number" id="quantity" v-model.number="donationForm.quantity" required min="1" placeholder="请输入数量">
          </div>
          <div class="form-group">
            <label for="unit">单位</label>
            <select id="unit" v-model="donationForm.unit" required>
              <option value="箱">箱</option>
              <option value="件">件</option>
              <option value="套">套</option>
              <option value="袋">袋</option>
              <option value="公斤">公斤</option>
              <option value="吨">吨</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label for="category">物资类别</label>
          <select id="category" v-model="donationForm.category" required>
            <option value="食品">食品</option>
            <option value="饮用水">饮用水</option>
            <option value="帐篷">帐篷</option>
            <option value="衣物">衣物</option>
            <option value="药品">药品</option>
            <option value="医疗设备">医疗设备</option>
            <option value="生活用品">生活用品</option>
            <option value="其他">其他</option>
          </select>
        </div>
        <div class="form-group">
          <label for="description">物资描述</label>
          <textarea id="description" v-model="donationForm.description" rows="4" placeholder="请详细描述物资情况"></textarea>
        </div>
        <div class="form-group">
          <label for="contactName">联系人</label>
          <input type="text" id="contactName" v-model="donationForm.contactName" required placeholder="请输入联系人姓名">
        </div>
        <div class="form-group">
          <label for="contactPhone">联系电话</label>
          <input type="tel" id="contactPhone" v-model="donationForm.contactPhone" required placeholder="请输入联系电话">
        </div>
        <div class="form-group">
          <label for="location">物资位置</label>
          <input type="text" id="location" v-model="donationForm.location" required placeholder="请输入物资存放位置">
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" @click="resetForm">重置</button>
          <button type="submit" class="btn btn-primary">发布捐赠</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DonationCreate',
  data() {
    return {
      donationForm: {
        materialName: '',
        quantity: null,
        unit: '箱',
        category: '食品',
        description: '',
        contactName: '',
        contactPhone: '',
        location: ''
      }
    }
  },
  methods: {
    submitDonation() {
      // 这里可以添加表单验证和提交逻辑
      console.log('捐赠表单提交:', this.donationForm);
      alert('捐赠发布成功！');
      this.$router.push('/donation/list');
    },
    resetForm() {
      this.donationForm = {
        materialName: '',
        quantity: null,
        unit: '箱',
        category: '食品',
        description: '',
        contactName: '',
        contactPhone: '',
        location: ''
      };
    }
  }
}
</script>

<style scoped>
.donation-create {
  padding: 20px 0;
}

.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

h2 {
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
}

form {
  max-width: 600px;
}

.form-group {
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  gap: 20px;
}

.form-row .form-group {
  flex: 1;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
}

input, select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #007bff;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 30px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
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
</style>