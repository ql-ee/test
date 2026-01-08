# 物资捐赠与需求匹配系统

## 项目简介
这是一个用于灾区物资捐赠与需求匹配的Web应用系统，旨在高效连接捐赠者与灾区需求，实现物资的精准配送与管理。

## 功能特性

### 捐赠管理
- 发布捐赠信息
- 管理捐赠记录
- 查看捐赠详情

### 需求管理
- 发布灾区需求
- 管理需求记录
- 查看需求详情

### 智能匹配
- 捐赠与需求的智能匹配
- 匹配结果查看
- 确认/取消匹配

### 物流管理
- 物流信息追踪
- 配送状态管理

### 数据分析
- AI数据分析功能
- 数据可视化展示

### 用户管理
- 用户登录
- 个人中心
- 信息管理

## 技术栈

- **前端框架**: Vue 3
- **路由管理**: Vue Router 4
- **构建工具**: Vite 5
- **CSS预处理器**: 原生CSS

## 项目结构

```
src/
├── components/          # 公共组件
│   ├── Footer.vue      # 页脚组件
│   └── Navbar.vue      # 导航栏组件
├── pages/              # 页面组件
│   ├── HomePage.vue    # 首页
│   ├── Donation*.vue   # 捐赠相关页面
│   ├── Demand*.vue     # 需求相关页面
│   ├── Matching*.vue   # 匹配相关页面
│   ├── Logistics*.vue  # 物流相关页面
│   └── AdminPage.vue   # 管理页面
├── router/             # 路由配置
│   └── index.js        # 路由定义
├── App.vue             # 根组件
├── App.css             # 全局样式
└── main.js             # 入口文件
```

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 主要页面说明

### 首页 (HomePage.vue)
- 系统介绍
- 快速入口
- 最新动态

### 捐赠管理
- **捐赠列表**: 查看所有捐赠记录
- **发布捐赠**: 创建新的捐赠信息
- **捐赠详情**: 查看捐赠的详细信息

### 需求管理
- **需求列表**: 查看所有需求记录
- **发布需求**: 创建新的需求信息
- **需求详情**: 查看需求的详细信息

### 智能匹配
- **匹配页面**: 查看匹配结果
- **匹配详情**: 查看匹配的详细信息
- **匹配结果**: 管理匹配状态

### 物流管理
- **物流列表**: 查看所有物流记录
- **物流详情**: 查看物流的详细信息

## 贡献指南

1. Fork 仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 联系方式

如有问题或建议，请通过以下方式联系我们：

- 项目地址: [https://github.com/yourusername/relief-material-distribution](https://github.com/yourusername/relief-material-distribution)
- 邮箱: your.email@example.com
