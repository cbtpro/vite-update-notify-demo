<template>
  <div id="app">
    <a-config-provider :locale="zhCN">
      <a-layout class="layout">
        <!-- 头部 -->
        <a-layout-header class="header">
          <div class="logo">
            <img src="/vite.svg" alt="Logo" class="logo-img" />
            <span class="logo-text">Vue + Ant Design Vue</span>
          </div>
          <div class="header-actions">
            <a-space>
              <a-tooltip title="当前版本信息">
                <a-button type="text" @click="showVersionInfo">
                  <template #icon>
                    <InfoCircleOutlined />
                  </template>
                  版本信息
                </a-button>
              </a-tooltip>
            </a-space>
          </div>
        </a-layout-header>

        <!-- 内容区域 -->
        <a-layout-content class="content">
          <div class="content-wrapper">
            <!-- 路由视图 -->
            <router-view />
          </div>
        </a-layout-content>

        <!-- 底部 -->
        <a-layout-footer class="footer">
          <div class="footer-content">
            <span>© 2025 Vue + Ant Design Vue 项目</span>
            <a-space>
              <a href="https://vuejs.org" target="_blank">
                <img src="./assets/vue.svg" alt="Vue" class="footer-logo" />
              </a>
              <a href="https://vitejs.dev" target="_blank">
                <img src="/vite.svg" alt="Vite" class="footer-logo" />
              </a>
            </a-space>
          </div>
        </a-layout-footer>
      </a-layout>

      <!-- 版本更新通知组件 -->
      <VersionNotification />

      <!-- 版本信息弹窗 -->
      <a-modal
        v-model:open="versionModalVisible"
        title="版本信息"
        :footer="null"
        width="400px"
      >
        <a-descriptions :column="1" bordered size="small">
          <a-descriptions-item label="当前版本">
            <a-tag color="blue">{{ currentVersionInfo?.version || '加载中...' }}</a-tag>
          </a-descriptions-item>
          <a-descriptions-item label="构建时间">
            {{ formatBuildTime(currentVersionInfo?.buildTime) }}
          </a-descriptions-item>
          <a-descriptions-item label="时间戳">
            {{ currentVersionInfo?.timestamp }}
          </a-descriptions-item>
        </a-descriptions>
        
        <div style="margin-top: 16px; text-align: right;">
          <a-button type="primary" @click="versionModalVisible = false">
            确定
          </a-button>
        </div>
      </a-modal>
    </a-config-provider>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { InfoCircleOutlined } from '@ant-design/icons-vue'
import VersionNotification from './components/VersionNotification.vue'
import { versionService, type VersionInfo } from './services/versionService'

// 响应式数据
const versionModalVisible = ref(false)
const currentVersionInfo = ref<VersionInfo | null>(null)

// 版本相关功能
const showVersionInfo = async () => {
  currentVersionInfo.value = await versionService.checkVersion()
  versionModalVisible.value = true
}

const formatBuildTime = (buildTime?: string) => {
  if (!buildTime) return '未知'
  return new Date(buildTime).toLocaleString('zh-CN')
}

onMounted(async () => {
  // 获取初始版本信息
  currentVersionInfo.value = await versionService.checkVersion()
})
</script>

<style scoped>
.layout {
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 0 24px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-img {
  width: 32px;
  height: 32px;
}

.logo-text {
  font-size: 18px;
  font-weight: 600;
  color: #1890ff;
}

.content {
  padding: 24px;
  background: #f0f2f5;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.footer {
  background: #fff;
  text-align: center;
  border-top: 1px solid #e8e8e8;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-logo {
  width: 20px;
  height: 20px;
  opacity: 0.6;
  transition: opacity 0.3s;
}

.footer-logo:hover {
  opacity: 1;
}

@media (max-width: 768px) {
  .header {
    padding: 0 16px;
  }
  
  .content {
    padding: 16px;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 8px;
  }
}
</style>