
<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue'
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
  allowedPokemon: string[]
}

const ZONE_DATA: Record<number, ZoneInfo> = {
  1: {
    name: 'Pueblo Paleta',
    description: 'Un pueblo tranquilo donde todo comienza.',
    npcs: [
      { id: 1, name: 'Profesor Oak', role: 'Investigador Pokémon' },
      { id: 2, name: 'Tu Mamá', role: 'Apoyo Moral' }
    ],
    background: '#8bc34a',
    allowedPokemon: ['Bulbasaur', 'Charmander', 'Squirtle']
  },
  2: {
    name: 'Ruta 1',
    description: 'Camino lleno de Pidgeys y Rattatas.',
    npcs: [
      { id: 3, name: 'Joven Chano', role: 'Entrenador Novato' }
    ],
    background: '#aed581',
    allowedPokemon: ['Pidgey', 'Rattata']
  },
  3: {
    name: 'Ciudad Verde',
    description: 'La ciudad de la eternidad verde.',
    npcs: [
      { id: 5, name: 'Enfermera Joy', role: 'Centro Pokémon' },
      { id: 6, name: 'Oficial Jenny', role: 'Policía' }
    ],
    background: '#4caf50',
    allowedPokemon: ['Nidoran', 'Mankey']
  },
  4: {
    name: 'Bosque Verde',
    description: 'Un laberinto natural lleno de bichos.',
    npcs: [
      { id: 8, name: 'Cazabichos Jose', role: 'Entrenador' }
    ],
    background: '#2e7d32',
    allowedPokemon: ['Caterpie', 'Weedle', 'Pikachu']
  },
  5: {
    name: 'Ciudad Plateada',
    description: 'Una ciudad de piedra gris.',
    npcs: [
      { id: 10, name: 'Brock', role: 'Líder de Gimnasio' }
    ],
    background: '#9e9e9e',
    allowedPokemon: ['Geodude', 'Onix']
  }
}

// Fallback
const currentZoneInfo = computed(() => {
  return ZONE_DATA[zoneId.value] || {
    name: 'Zona Desconocida',
    description: '...',
    npcs: [],
    background: '#333',
    allowedPokemon: []
  }
})

// === State 1: Reactive NPC List ===
// We initialize it with the zone data, but it can be mutated
const dynamicNpcs = reactive<{ id: number; name: string; role: string }[]>([])

// Populate dynamic list when zone changes
watch(zoneId, (newId) => {
  const info = ZONE_DATA[newId]
  if (info) {
    dynamicNpcs.splice(0, dynamicNpcs.length, ...info.npcs)
  }
}, { immediate: true })

const addVisitor = () => {
  const visitors = ['Turista', 'Fotógrafo', 'Viajero', 'Investigador']
  const randomRole = visitors[Math.floor(Math.random() * visitors.length)]
  dynamicNpcs.push({
    id: Date.now(),
    name: `${randomRole} #${Math.floor(Math.random() * 100)}`,
    role: 'Visitante'
  })
}

// === State 2: Trainers Visibility ===
const showTrainers = ref(true)

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

// === State 3: Capture Mode ===
const isCapturing = ref(false)
const captureMessage = ref('')

const toggleCapture = () => {
  isCapturing.value = !isCapturing.value
  if (isCapturing.value) {
    captureMessage.value = "Buscando Pokémon salvaje..."
    // Simulate finding one after 3 seconds
    setTimeout(() => {
      if (isCapturing.value) {
        captureMessage.value = "¡Un Pidgey salvaje apareció!"
      }
    }, 2000)
  } else {
    captureMessage.value = ""
  }
}


const goBack = () => {
  router.push('/map')
}

const goToMissions = () => {
  router.push('/missions')
}
</script>

<template>
  <div class="lobby-container" :style="{ '--zone-bg': currentZoneInfo.background }">
    <div class="header">
      <button @click="goBack" class="back-btn">⬅ Volver</button>
      <div class="title-section">
        <h1>{{ currentZoneInfo.name }}</h1>
        <p class="description">{{ currentZoneInfo.description }}</p>
      </div>
    </div>

    <!-- Phase 3: Communication - Allowed Pokemon -->
    <div class="pokemon-info-bar">
      <span>🔎 Pokémon en esta zona:</span>
      <span v-for="poke in currentZoneInfo.allowedPokemon" :key="poke" class="poke-tag">{{ poke }}</span>
    </div>

    <div class="content-grid">
      <!-- State 1: Dynamic NPCs -->
      <section class="panel">
        <div class="panel-header">
          <h2>👥 NPCs</h2>
          <button @click="addVisitor" class="small-btn">+ Visitante</button>
        </div>
        <div class="list">
          <div v-for="npc in dynamicNpcs" :key="npc.id" class="list-item">
            <span class="icon">👤</span>
            <div class="details">
              <strong>{{ npc.name }}</strong>
              <small>{{ npc.role }}</small>
            </div>
            <button class="action-btn">Hablar</button>
          </div>
        </div>
      </section>

      <!-- State 3: Capture Interaction -->
      <section class="panel central">
        <div class="big-actions">
          <button class="big-btn capture" @click="toggleCapture" :class="{ 'active': isCapturing }">
            <span>{{ isCapturing ? '🛑 Detener' : '🐾 Iniciar Captura' }}</span>
          </button>
          
          <div v-if="isCapturing" class="capture-state-box">
             <div class="radar-scan">📡</div>
             <p>{{ captureMessage }}</p>
          </div>

          <button class="big-btn missions" @click="goToMissions">
            <span>📜</span> Misiones
          </button>
          <button class="big-btn pvp disabled">
            <span>⚔️</span> PVP
          </button>
        </div>
      </section>

      <!-- State 2: Toggle Trainers -->
      <section class="panel">
        <div class="panel-header">
          <h2>🟢 Online</h2>
          <label class="switch">
            <input type="checkbox" v-model="showTrainers">
            <span class="slider round"></span>
          </label>
        </div>
        
        <div v-if="showTrainers" class="list">
          <div v-for="trainer in onlineTrainers" :key="trainer.id" class="list-item">
            <span class="icon">{{ trainer.avatar }}</span>
            <span>{{ trainer.name }}</span>
          </div>
        </div>
        <div v-else class="empty-state">
           Lista de entrenadores oculta
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
  margin-bottom: 1rem;
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
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.description {
  color: #ccc;
  font-style: italic;
}

.pokemon-info-bar {
  background: rgba(0, 0, 0, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.poke-tag {
  background: #2a2a2a;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
  border: 1px solid #555;
  color: #81c784;
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
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.small-btn {
  background: #008CBA;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
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
}

.capture { background: linear-gradient(135deg, #ff6b6b, #d32f2f); color: white; }
.capture.active { background: #333; border: 2px solid #ff6b6b; color: #ff6b6b; animation: pulse 2s infinite; }

.capture-state-box {
  background: #111;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #333;
}

.radar-scan {
  font-size: 2rem;
  animation: spin 2s linear infinite;
  display: inline-block;
}

.missions { background: linear-gradient(135deg, #feca57, #ff9800); color: #212121; }
.pvp { background: #444; cursor: not-allowed; color: #888; }

/* Switch Toggle Styles */
.switch { position: relative; display: inline-block; width: 40px; height: 24px; }
.switch input { opacity: 0; width: 0; height: 0; }
.slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; }
.slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 4px; bottom: 4px; background-color: white; transition: .4s; }
input:checked + .slider { background-color: #2196F3; }
input:checked + .slider:before { transform: translateX(16px); }
.slider.round { border-radius: 34px; }
.slider.round:before { border-radius: 50%; }

.empty-state { color: #888; text-align: center; padding: 1rem; }

@keyframes spin { 100% { transform: rotate(360deg); } }
@keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(0,0,0,0); } 100% { box-shadow: 0 0 0 0 rgba(0,0,0,0); } }
</style>
