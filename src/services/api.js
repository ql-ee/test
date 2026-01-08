// API服务层 - 使用axios调用真实后端接口
import axios from 'axios'

// 创建axios实例
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api', // 后端API基础URL
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器 - 添加token认证
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('userToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器 - 统一处理响应
apiClient.interceptors.response.use(
  response => {
    // 假设后端返回格式为 { code: 200, data: {}, message: '' }
    if (response.data.code === 200) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      }
    } else {
      return Promise.reject(new Error(response.data.message || '请求失败'))
    }
  },
  error => {
    return Promise.reject(error)
  }
)

// 登录接口
export const login = async (account, password) => {
  return apiClient.post('/login', {
    account,
    password
  });
};

// 发送验证码接口
export const sendVerificationCode = async (account) => {
  return apiClient.post('/verification-code', {
    account
  });
};

// 注册接口
export const register = async (account, password, verificationCode = '') => {
  return apiClient.post('/register', {
    account,
    password,
    verificationCode
  });
};

// 获取学生列表接口
export const getStudentList = async ({ page = 1, size = 10, sortField = '', sortOrder = '' } = {}) => {
  return apiClient.get('/students', {
    params: {
      page,
      size,
      sortField,
      sortOrder
    }
  });
};

// 添加学生接口
export const addStudent = async (studentData) => {
  return apiClient.post('/students', studentData);
};

// 编辑学生接口
export const updateStudent = async (id, studentData) => {
  return apiClient.put(`/students/${id}`, studentData);
};

// 删除学生接口
export const deleteStudent = async (id) => {
  return apiClient.delete(`/students/${id}`);
};

// 退出登录接口
export const logout = async () => {
  return apiClient.post('/logout');
};
