<template>
  <div class="ai-analysis-page">
    <h1>AI智能匹配分析</h1>
    
    <!-- 分析概览 -->
    <div class="analysis-section">
      <h2>匹配分析概览</h2>
      <div class="overview-cards">
        <div class="overview-card">
          <div class="overview-title">今日总匹配次数</div>
          <div class="overview-value">128</div>
        </div>
        <div class="overview-card">
          <div class="overview-title">平均匹配成功率</div>
          <div class="overview-value">89.2%</div>
        </div>
        <div class="overview-card">
          <div class="overview-title">平均匹配耗时</div>
          <div class="overview-value">2.3秒</div>
        </div>
        <div class="overview-card">
          <div class="overview-title">高紧急度匹配完成率</div>
          <div class="overview-value">98.5%</div>
        </div>
      </div>
    </div>

    <!-- 匹配案例分析 -->
    <div class="analysis-section">
      <h2>最新匹配案例分析</h2>
      <div class="case-container">
        <div class="case-card">
          <div class="case-header">
            <div class="case-title">匹配ID: MATCH20240515001</div>
            <div class="case-status status-confirmed">已确认</div>
          </div>
          
          <div class="case-details">
            <div class="detail-item">
              <div class="detail-label">捐赠物资:</div>
              <div class="detail-value">帐篷 (50顶)</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">需求灾区:</div>
              <div class="detail-value">四川省汶川县</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">总匹配度:</div>
              <div class="detail-value highlight">92.5%</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">匹配时间:</div>
              <div class="detail-value">2024-05-15 14:30:25</div>
            </div>
          </div>

          <!-- AI匹配分析详情 -->
          <div class="ai-analysis-details">
            <h3>AI匹配分析</h3>
            
            <div class="matching-factor">
              <div class="factor-header">
                <div class="factor-name">物资类型匹配</div>
                <div class="factor-score">100%</div>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar" style="width: 100%"></div>
              </div>
            </div>

            <div class="matching-factor">
              <div class="factor-header">
                <div class="factor-name">数量匹配</div>
                <div class="factor-score">90%</div>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar" style="width: 90%"></div>
              </div>
            </div>

            <div class="matching-factor">
              <div class="factor-header">
                <div class="factor-name">类别匹配</div>
                <div class="factor-score">95%</div>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar" style="width: 95%"></div>
              </div>
            </div>

            <div class="matching-factor">
              <div class="factor-header">
                <div class="factor-name">需求紧急度</div>
                <div class="factor-score">90%</div>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar" style="width: 90%"></div>
              </div>
            </div>

            <div class="matching-factor">
              <div class="factor-header">
                <div class="factor-name">地理位置匹配</div>
                <div class="factor-score">85%</div>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar" style="width: 85%"></div>
              </div>
            </div>

            <div class="matching-reason">
              <h4>匹配理由</h4>
              <p>该捐赠物资与灾区需求高度匹配，物资类型完全一致，数量满足90%的需求。由于灾区需求紧急度为"非常紧急"，系统优先匹配了距离较近的捐赠资源，以确保物资能够快速送达。</p>
            </div>
          </div>
        </div>

        <!-- 更多案例可以在这里添加 -->
      </div>
    </div>

    <!-- 匹配趋势分析 -->
    <div class="analysis-section">
      <h2>匹配趋势分析</h2>
      <div class="trend-chart">
        <div class="chart-placeholder">
          <div class="chart-title">最近7天匹配成功率趋势</div>
          <div class="chart-bars">
            <div class="chart-bar" style="height: 75%"><div class="bar-label">周一</div></div>
            <div class="chart-bar" style="height: 82%"><div class="bar-label">周二</div></div>
            <div class="chart-bar" style="height: 88%"><div class="bar-label">周三</div></div>
            <div class="chart-bar" style="height: 85%"><div class="bar-label">周四</div></div>
            <div class="chart-bar" style="height: 90%"><div class="bar-label">周五</div></div>
            <div class="chart-bar" style="height: 92%"><div class="bar-label">周六</div></div>
            <div class="chart-bar" style="height: 89%"><div class="bar-label">周日</div></div>
          </div>
        </div>
      </div>
    </div>

    <!-- AI匹配算法说明 -->
    <div class="analysis-section">
      <h2>AI匹配算法说明</h2>
      <div class="algorithm-explanation">
        <p>我们的AI智能匹配系统采用了多层级的匹配算法，综合考虑以下因素：</p>
        <ul>
          <li><strong>物资类型匹配</strong>：确保捐赠物资与灾区需求的物资类型完全一致</li>
          <li><strong>数量匹配</strong>：计算捐赠数量与需求数量的匹配比例</li>
          <li><strong>类别匹配</strong>：考虑物资的具体类别和规格是否符合需求</li>
          <li><strong>需求紧急度</strong>：优先匹配紧急度较高的需求</li>
          <li><strong>地理位置匹配</strong>：考虑捐赠地点与灾区的距离，优化运输时间</li>
          <li><strong>捐赠者优先级</strong>：考虑捐赠者的历史记录和信誉</li>
        </ul>
        <p>系统使用机器学习模型不断优化匹配算法，根据实际匹配结果和反馈持续改进匹配精度和效率。</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AIAnalysisPage'
}
</script>

<style scoped>
.ai-analysis-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.analysis-section {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #b3d7ff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.analysis-section h2 {
  color: #1a73e8;
  font-size: 1.5rem;
  margin-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;
}

.overview-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.overview-card {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
}

.overview-title {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 5px;
}

.overview-value {
  font-size: 1.8rem;
  font-weight: bold;
  color: #1a73e8;
}

.case-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

.case-card {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 15px;
}

.case-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.case-title {
  font-weight: bold;
  color: #333;
}

.case-status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}

.status-confirmed {
  background-color: #e6f4ea;
  color: #188038;
}

.case-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 20px;
}

.detail-item {
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 3px;
}

.detail-value {
  font-weight: bold;
  color: #333;
}

.detail-value.highlight {
  color: #1a73e8;
  font-size: 1.1rem;
}

.ai-analysis-details {
  margin-top: 20px;
}

.ai-analysis-details h3 {
  color: #1a73e8;
  font-size: 1.1rem;
  margin-bottom: 15px;
}

.matching-factor {
  margin-bottom: 15px;
}

.factor-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.factor-name {
  font-weight: bold;
  color: #333;
}

.factor-score {
  font-weight: bold;
  color: #1a73e8;
}

.progress-bar-container {
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #1a73e8;
  border-radius: 5px;
  transition: width 0.3s ease;
}

.matching-reason {
  margin-top: 20px;
  padding: 15px;
  background-color: rgba(240, 248, 255, 0.7);
  border-radius: 8px;
}

.matching-reason h4 {
  color: #1a73e8;
  margin-bottom: 10px;
  font-size: 1rem;
}

.matching-reason p {
  color: #333;
  line-height: 1.6;
}

.trend-chart {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
}

.chart-placeholder {
  text-align: center;
}

.chart-title {
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.chart-bars {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 200px;
  margin-top: 30px;
}

.chart-bar {
  width: 30px;
  background-color: #1a73e8;
  border-radius: 4px 4px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 5px;
}

.bar-label {
  margin-top: 10px;
  font-size: 0.8rem;
  color: #666;
}

.algorithm-explanation {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  line-height: 1.6;
}

.algorithm-explanation p {
  margin-bottom: 15px;
  color: #333;
}

.algorithm-explanation ul {
  margin-left: 20px;
  margin-bottom: 15px;
}

.algorithm-explanation li {
  margin-bottom: 8px;
  color: #333;
}

.algorithm-explanation strong {
  color: #1a73e8;
}

@media (max-width: 768px) {
  .overview-cards {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .case-container {
    grid-template-columns: 1fr;
  }
  
  .case-details {
    grid-template-columns: 1fr;
  }
}
</style>