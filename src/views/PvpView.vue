<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="placeholder-view">
    <button @click="router.push('/map')" class="back-btn">⬅ Volver al Mapa</button>
    <h1>⚔️ Arena PVP</h1>
    <div class="content">
      <p>El sistema de combate está en construcción.</p>
      <span class="icon">⚔️</span>
    </div>
  </div>
</template>

<style scoped>
.placeholder-view {
  padding: 2rem;
  color: white;
  text-align: center;
}

.back-btn {
  background: transparent;
  border: 1px solid #666;
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 2rem;
  display: inline-block;
}

.content {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.icon {
  font-size: 4rem;
}
</style>
