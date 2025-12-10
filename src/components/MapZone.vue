<script setup lang="ts">
export type ZoneStatus = 'locked' | 'available' | 'completed'

export interface Zone {
  id: number
  name: string
  status: ZoneStatus
}

defineProps<{
  zone: Zone
}>()

defineEmits<{
  (e: 'click-zone', id: number): void
}>()
</script>

<template>
  <div 
    class="map-zone-wrapper"
    @click="$emit('click-zone', zone.id)"
  >
    <div 
      class="zone-btn"
      :class="zone.status"
    >
      <div class="inner-icon">
        <span v-if="zone.status === 'locked'">🔒</span>
        <span v-else-if="zone.status === 'completed'">🏆</span>
        <span v-else>⚔️</span>
      </div>
      
      <!-- Stars or Progress indicators could go here -->
      <div v-if="zone.status === 'completed'" class="stars">
        ⭐⭐⭐
      </div>
    </div>
    
    <div class="zone-label">{{ zone.name }}</div>
  </div>
</template>

<style scoped>
.map-zone-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  width: 120px;
  transition: transform 0.2s;
}

.map-zone-wrapper:hover {
  transform: scale(1.05);
  z-index: 10;
}

.zone-btn {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid;
  background-color: #444;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  position: relative;
  margin-bottom: 0.5rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.inner-icon {
  font-size: 2rem;
}

/* Locked State */
.locked {
  background-color: #555;
  border-color: #333;
  color: #888;
  filter: grayscale(0.8);
}

/* Available State */
.available {
  background: linear-gradient(135deg, #ffca28, #ffa000);
  border-color: #fff;
  color: white;
  box-shadow: 0 0 20px rgba(255, 200, 0, 0.5);
  animation: bounce 2s infinite;
}

/* Completed State */
.completed {
  background: linear-gradient(135deg, #66bb6a, #43a047);
  border-color: #fff;
  color: white;
}

.zone-label {
  background: white;
  color: #333;
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 0.9rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  text-align: center;
  white-space: nowrap;
}

.stars {
  position: absolute;
  top: -15px;
  font-size: 0.8rem;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
</style>
