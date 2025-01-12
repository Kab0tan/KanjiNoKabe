<template>
  <div class="about">
    <ElRow>
      <ElCol :span="12">
        <ElScrollbar height="100px" class="scrollbar">
          <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
            {{ item }}
          </p>
        </ElScrollbar>
      </ElCol>
      <ElCol :span="12">
        <div>OUI</div>
      </ElCol>
    </ElRow>
  </div>
</template>

<script setup>
import { ElRow, ElCol, ElScrollbar } from 'element-plus'
</script>

<!-- <template>
  <div>
    <h1>Example Data</h1>
    <ul>
      <li v-for="item in campaign" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const campaign = ref(null)
async function callRoute() {
  try {
    const response = await fetch('/m_campaign/324').get()
    campaign.value = await response.json()
  } catch (error) {
    console.error('Error:', error)
  }
}
onMounted(() => {
  callRoute()
})
</script> -->
