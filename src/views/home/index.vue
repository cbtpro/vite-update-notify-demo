<template>
  <div class="home-page">
    <a-card class="welcome-card" :bordered="false">
      <template #title>
        <a-space>
          <RocketOutlined class="title-icon" />
          欢迎使用 Vue + Ant Design Vue
        </a-space>
      </template>
      
      <a-row :gutter="[16, 16]">
        <a-col :span="24" :md="12">
          <a-card size="small" title="🔧 技术栈">
            <a-tag color="blue">Vue 3</a-tag>
            <a-tag color="green">TypeScript</a-tag>
            <a-tag color="orange">Vite</a-tag>
            <a-tag color="purple">Ant Design Vue</a-tag>
            <a-tag color="cyan">Vue Router</a-tag>
          </a-card>
        </a-col>
        
        <a-col :span="24" :md="12">
          <a-card size="small" title="⚡ 功能特性">
            <ul>
              <li>自动版本检查</li>
              <li>实时更新提醒</li>
              <li>响应式设计</li>
              <li>TypeScript 支持</li>
              <li>Vue Router 路由</li>
            </ul>
          </a-card>
        </a-col>
      </a-row>

      <a-divider />

      <div class="demo-section">
        <h3>🎯 演示功能</h3>
        <a-space direction="vertical" style="width: 100%">
          <a-card size="small">
            <a-space>
              <a-button type="primary" @click="showSuccessMessage">
                显示成功消息
              </a-button>
              <a-button @click="showInfoModal">
                打开信息弹窗
              </a-button>
              <a-button type="dashed" @click="triggerVersionCheck">
                手动检查版本
              </a-button>
            </a-space>
          </a-card>

          <a-card size="small" title="计数器示例">
            <a-space align="center">
              <a-button @click="decrease" :disabled="count <= 0">
                <MinusOutlined />
              </a-button>
              <a-statistic :value="count" style="margin: 0 16px" />
              <a-button type="primary" @click="increase">
                <PlusOutlined />
              </a-button>
            </a-space>
          </a-card>
        </a-space>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { message, Modal } from 'ant-design-vue'
import {
  RocketOutlined,
  PlusOutlined,
  MinusOutlined
} from '@ant-design/icons-vue'
import { versionService } from '../../services/versionService'

// 响应式数据
const count = ref(0)

// 计数器功能
const increase = () => {
  count.value++
}

const decrease = () => {
  if (count.value > 0) {
    count.value--
  }
}

// 演示功能
const showSuccessMessage = () => {
  message.success('操作成功！这是一个成功提示消息')
}

const showInfoModal = () => {
  Modal.info({
    title: '信息提示',
    content: '这是一个使用 Ant Design Vue 创建的信息弹窗示例',
    okText: '知道了'
  })
}

const triggerVersionCheck = async () => {
  const latestVersion = await versionService.checkVersion()
  if (latestVersion) {
    message.info(`当前版本: ${latestVersion.version}`)
  } else {
    message.error('获取版本信息失败')
  }
}
</script>

<style scoped>
.home-page {
  padding: 0;
}

.welcome-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.title-icon {
  color: #1890ff;
}

.demo-section {
  margin-top: 24px;
}

.demo-section h3 {
  margin-bottom: 16px;
  color: #262626;
}
</style>