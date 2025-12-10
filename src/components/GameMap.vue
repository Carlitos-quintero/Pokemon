
<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import MapZone, { type Zone } from './MapZone.vue'

const router = useRouter()

// Phase 1: Reactive State
const zones = reactive<Zone[]>([
  { id: 1, name: 'Pueblo Paleta', status: 'available' },
  { id: 2, name: 'Ruta 1', status: 'locked' },
  { id: 3, name: 'Ciudad Verde', status: 'locked' },
  { id: 4, name: 'Bosque Verde', status: 'locked' },
  { id: 5, name: 'Ciudad Plateada', status: 'locked' },
])

const desbloquearZona = (index: number) => {
  if (index >= 0 && index < zones.length) {
    // Only unlock if it's currently locked
    if (zones[index].status === 'locked') {
      zones[index].status = 'available'
    }
  }
}

const handleZoneClick = (id: number) => {
  const zoneIndex = zones.findIndex(z => z.id === id)
  const zone = zones[zoneIndex]

  // Enforce Lock - The Boss "Caos de Estados" requires order!
  if (zone.status === 'locked') {
    alert("¡Zona Bloqueada! Debes completar la anterior primero.")
    return
  }

  router.push(`/zone/${id}`)
  
  // Logic to simulate unlocking the next zone upon entering/completing "Available" zone
  if (zone.status === 'available') {
    zone.status = 'completed'
    desbloquearZona(zoneIndex + 1)
  }
}
</script>

<template>
  <div class="game-map-wrapper">
    <div class="game-map">
      <h2 class="title">Mapa de Kanto - Reactivo</h2>
      <div class="path-container">
        <!-- SVG Connector Line -->
        <svg class="path-svg" viewBox="0 0 400 600" preserveAspectRatio="none">
          <path d="M200,550 C200,500 150,450 150,400 C150,350 250,300 250,250 C250,200 150,150 150,100" 
                stroke="rgba(255, 255, 255, 0.3)" 
                stroke-width="8" 
                fill="none" 
                stroke-dasharray="10 10" />
        </svg>

        <MapZone
          v-for="(zone, index) in zones"
          :key="zone.id"
          :zone="zone"
          @click-zone="handleZoneClick"
          class="zone-node"
          :style="{ 
            alignSelf: index % 2 === 0 ? 'center' : (index % 4 === 1 ? 'flex-start' : 'flex-end'),
            marginLeft: index % 2 !== 0 ? (index % 4 === 1 ? '20%' : '-20%') : '0'
          }" 
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-map-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.game-map {
  background: linear-gradient(180deg, #1e3c72 0%, #2a5298 100%);
  padding: 2rem 1rem;
  border-radius: 20px;
  width: 100%;
  max-width: 450px;
  min-height: 600px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  position: relative;
  overflow: hidden;
}

.game-map::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: radial-gradient(#ffffff 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.1;
  pointer-events: none;
}

.title {
  color: white;
  text-align: center;
  margin-bottom: 2rem;
  font-family: 'Avenir', sans-serif;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  position: relative;
  z-index: 2;
}

.path-container {
  display: flex;
  flex-direction: column-reverse; /* Bottom to top progression */
  align-items: center;
  gap: 3rem;
  position: relative;
  padding: 2rem 0;
}

.path-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.zone-node {
  position: relative;
  z-index: 1;
}
</style>
