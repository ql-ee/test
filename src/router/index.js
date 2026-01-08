import { createRouter, createWebHistory } from 'vue-router'

// 懒加载页面组件
const HomePage = () => import('../pages/HomePage.vue')
const DonationPage = () => import('../pages/DonationPage.vue')
const DonationCreate = () => import('../pages/DonationCreate.vue')
const DonationList = () => import('../pages/DonationList.vue')
const DonationDetail = () => import('../pages/DonationDetail.vue')
const DemandPage = () => import('../pages/DemandPage.vue')
const DemandCreate = () => import('../pages/DemandCreate.vue')
const DemandList = () => import('../pages/DemandList.vue')
const DemandDetail = () => import('../pages/DemandDetail.vue')
const MatchingPage = () => import('../pages/MatchingPage.vue')
const MatchingResultList = () => import('../pages/MatchingResultList.vue')
const MatchingDetail = () => import('../pages/MatchingDetail.vue')
const LogisticsPage = () => import('../pages/LogisticsPage.vue')
const LogisticsList = () => import('../pages/LogisticsList.vue')
const LogisticsDetail = () => import('../pages/LogisticsDetail.vue')
const UserCenterPage = () => import('../pages/UserCenterPage.vue')
const AdminPage = () => import('../pages/AdminPage.vue')
const AIAnalysisPage = () => import('../pages/AIAnalysisPage.vue')
// 添加登录、注册和学生管理页面
const LoginPage = () => import('../pages/LoginPage.vue')
const RegisterPage = () => import('../pages/RegisterPage.vue')
const StudentPage = () => import('../pages/StudentPage.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/donation',
    name: 'DonationPage',
    component: DonationPage,
    children: [
      {
        path: 'create',
        name: 'DonationCreate',
        component: DonationCreate
      },
      {
        path: 'list',
        name: 'DonationList',
        component: DonationList
      },
      {
        path: ':id',
        name: 'DonationDetail',
        component: DonationDetail
      }
    ]
  },
  {
    path: '/demand',
    name: 'DemandPage',
    component: DemandPage,
    children: [
      {
        path: 'create',
        name: 'DemandCreate',
        component: DemandCreate
      },
      {
        path: 'list',
        name: 'DemandList',
        component: DemandList
      },
      {
        path: ':id',
        name: 'DemandDetail',
        component: DemandDetail
      }
    ]
  },
  {
    path: '/matching',
    name: 'MatchingPage',
    component: MatchingPage,
    children: [
      {
        path: 'list',
        name: 'MatchingResultList',
        component: MatchingResultList
      },
      {
        path: ':id',
        name: 'MatchingDetail',
        component: MatchingDetail
      }
    ]
  },
  {
    path: '/logistics',
    name: 'LogisticsPage',
    component: LogisticsPage,
    children: [
      {
        path: 'list',
        name: 'LogisticsList',
        component: LogisticsList
      },
      {
        path: ':id',
        name: 'LogisticsDetail',
        component: LogisticsDetail
      }
    ]
  },
  {
    path: '/user',
    name: 'UserCenterPage',
    component: UserCenterPage
  },
  {
    path: '/admin',
    name: 'AdminPage',
    component: AdminPage
  },
  {
    path: '/ai-analysis',
    name: 'AIAnalysisPage',
    component: AIAnalysisPage
  },
  // 添加登录、注册和学生管理页面路由
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage
  },
  {
    path: '/student',
    name: 'StudentPage',
    component: StudentPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router