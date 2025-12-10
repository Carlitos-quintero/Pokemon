<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const zoneId = computed(() => Number(route.params.id))

// --- Data Dictionary for Zones ---
interface ZoneInfo {
  name: string
  description: string
  npcs: { id: number; name: string; role: string }[]
  background: string
}

const ZONE_DATA: Record<number, ZoneInfo> = {
  1: {
    name: 'Pueblo Paleta',
    description: 'Un pueblo tranquilo donde todo comienza. El aire es fresco y lleno de promesas.',
    npcs: [
      { id: 1, name: 'Profesor Oak', role: 'Investigador Pokémon' },
      { id: 2, name: 'Tu Mamá', role: 'Apoyo Moral' }
    ],
    background: '#8bc34a' // Greenish
  },
  2: {
    name: 'Ruta 1',
    description: 'Camino lleno de Pidgeys y Rattatas. Cuidado con la hierba alta.',
    npcs: [
      { id: 3, name: 'Joven Chano', role: 'Entrenador Novato' },
      { id: 4, name: 'Ayudante de Tienda', role: 'Vendedor' }
    ],
    background: '#aed581' // Light Green
  },
  3: {
    name: 'Ciudad Verde',
    description: 'La ciudad de la eternidad verde. Famosa por su gimnasio cerrado.',
    npcs: [
      { id: 5, name: 'Enfermera Joy', role: 'Centro Pokémon' },
      { id: 6, name: 'Oficial Jenny', role: 'Policía' },
      { id: 7, name: 'Viejo Borracho', role: 'Tutorial Catch' }
    ],
    background: '#4caf50' // Strong Green
  },
  4: {
    name: 'Bosque Verde',
    description: 'Un laberinto natural lleno de bichos. Difícil de navegar sin mapa.',
    npcs: [
      { id: 8, name: 'Cazabichos Jose', role: 'Entrenador' },
      { id: 9, name: 'Cazabichos Juan', role: 'Entrenador' }
    ],
    background: '#2e7d32' // Dark Green
  },
  5: {
    name: 'Ciudad Plateada',
    description: 'Una ciudad de piedra gris. Hogar del Líder de Gimnasio Brock.',
    npcs: [
      { id: 10, name: 'Brock', role: 'Líder de Gimnasio' },
      { id: 11, name: 'Guía de Museo', role: 'Información' }
    ],
    background: '#9e9e9e' // Grey
  }
}

// Fallback for unknown IDs
const currentZone = computed(() => {
  return ZONE_DATA[zoneId.value] || {
    name: 'Zona Desconocida',
    description: 'Esta zona aún no ha sido descubierta.',
    npcs: [],
    background: '#333'
  }
})

// --- Fake Online Data ---
interface Trainer {
  id: number
  name: string
  avatar: string
}
const onlineTrainers = ref<Trainer[]>([
  { id: 1, name: 'AshK', avatar: '🧢' },
  { id: 2, name: 'GaryO', avatar: '🚗' },
  { id: 3, name: 'MistyW', avatar: '💧' }
])

const goBack = () => {
  router.push('/map')
}

const goToMissions = () => {
  router.push('/missions')
}

// Just a placeholder for capture logic
const startCapture = () => {
  alert(`Buscando Pokémon salvajes en ${currentZone.value.name}...`)
}
</script>

<template>
  <div class="lobby-container" :style="{ '--zone-bg': currentZone.background }">
    <div class="header">
      <button @click="goBack" class="back-btn">⬅ Volver al Mapa</button>
      <div class="title-section">
        <h1>{{ currentZone.name }}</h1>
        <p class="description">{{ currentZone.description }}</p>
      </div>
    </div>

    <div class="content-grid">
      <!-- NPCs Section -->
      <section class="panel">
        <h2>👥 NPCs</h2>
        <div class="list" v-if="currentZone.npcs.length">
          <div v-for="npc in currentZone.npcs" :key="npc.id" class="list-item">
            <span class="icon">👤</span>
            <div class="details">
              <strong>{{ npc.name }}</strong>
              <small>{{ npc.role }}</small>
            </div>
            <button class="action-btn">Hablar</button>
          </div>
        </div>
        <div v-else class="empty-state">No hay nadie por aquí.</div>
      </section>

      <!-- Main Actions -->
      <section class="panel central">
        <div class="big-actions">
          <button class="big-btn capture" @click="startCapture">
            <span>🐾</span> Buscar Pokémon
          </button>
          <button class="big-btn missions" @click="goToMissions">
            <span>📜</span> Misiones
          </button>
          <button class="big-btn pvp disabled">
            <span>⚔️</span> PVP (Bloqueado)
          </button>
        </div>
      </section>

      <!-- Online Trainers -->
      <section class="panel">
        <h2>🟢 Online en {{ currentZone.name }}</h2>
        <div class="list">
          <div v-for="trainer in onlineTrainers" :key="trainer.id" class="list-item">
            <span class="icon">{{ trainer.avatar }}</span>
            <span>{{ trainer.name }}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.lobby-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  color: white;
  min-height: 80vh;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #444;
  padding-bottom: 1rem;
}

.back-btn {
  align-self: flex-start;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #666;
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
}

.title-section h1 {
  margin: 0;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.description {
  color: #aaa;
  font-style: italic;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 2rem;
}

@media (max-width: 800px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

.panel {
  background: rgba(42, 42, 42, 0.9);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #444;
  backdrop-filter: blur(5px);
}

.list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(0, 0, 0, 0.3);
  padding: 0.8rem;
  border-radius: 8px;
}

.details {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.action-btn {
  background: #2196f3;
  border: none;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  color: white;
}

.big-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  justify-content: center;
}

.big-btn {
  padding: 1.5rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  transition: transform 0.2s;
  font-weight: bold;
}

.big-btn:hover:not(.disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.capture { background: linear-gradient(135deg, #ff6b6b, #d32f2f); color: white; }
.missions { background: linear-gradient(135deg, #feca57, #ff9800); color: #212121; }
.pvp { background: #444; cursor: not-allowed; color: #888; border: 1px dashed #666; }

.empty-state {
  color: #666;
  font-style: italic;
  text-align: center;
  padding: 1rem;
}
</style>
