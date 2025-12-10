<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface Mission {
  id: number
  title: string
  description: string
  reward: string
  completed: boolean
  claimed: boolean
}

const missions = ref<Mission[]>([
  {
    id: 1,
    title: 'Entrenamiento Básico',
    description: 'Captura un Pokémon de tipo Volador en la Ruta 1.',
    reward: '5 Pokéballs',
    completed: true,
    claimed: false
  },
  {
    id: 2,
    title: 'Explorador Novato',
    description: 'Visita 3 zonas diferentes del mapa.',
    reward: '1 Poción',
    completed: false,
    claimed: false
  },
  {
    id: 3,
    title: 'Desafío de Gimnasio',
    description: 'Derrota a Brock en Ciudad Plateada.',
    reward: 'Medalla Roca',
    completed: false,
    claimed: false
  },
  {
    id: 4,
    title: 'Coleccionista',
    description: 'Registra 10 Pokémon en tu Pokédex.',
    reward: 'Bicicleta',
    completed: false,
    claimed: false
  }
])

const claimReward = (mission: Mission) => {
  if (mission.completed && !mission.claimed) {
    mission.claimed = true
    alert(`¡Has recibido: ${mission.reward}!`)
  }
}
</script>

<template>
  <div class="missions-container">
    <div class="header">
      <button @click="router.push('/map')" class="back-btn">⬅ Volver al Mapa</button>
      <h1>Tablón de Misiones</h1>
    </div>

    <div class="missions-list">
      <div 
        v-for="mission in missions" 
        :key="mission.id" 
        class="mission-card"
        :class="{ 'completed': mission.completed, 'claimed': mission.claimed }"
      >
        <div class="mission-info">
          <h3>{{ mission.title }}</h3>
          <p>{{ mission.description }}</p>
          <div class="reward-tag">🎁 Recompensa: {{ mission.reward }}</div>
        </div>
        
        <div class="mission-action">
          <button 
            v-if="!mission.completed" 
            class="status-btn pending" 
            disabled
          >
            En Progreso
          </button>
          
          <button 
            v-else-if="!mission.claimed" 
            class="status-btn claim" 
            @click="claimReward(mission)"
          >
            Reclamar
          </button>
          
          <button 
            v-else 
            class="status-btn claimed" 
            disabled
          >
            ✅ Completado
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.missions-container {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  color: white;
}

.header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
  border-bottom: 2px solid #444;
  padding-bottom: 1rem;
}

.back-btn {
  background: transparent;
  border: 1px solid #666;
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
}

.missions-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.mission-card {
  background: #2a2a2a;
  border: 1px solid #444;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  transition: all 0.3s;
}

.mission-card:hover {
  transform: translateX(5px);
  border-color: #666;
}

.mission-card.completed {
  border-color: #ff9800;
  background: rgba(255, 152, 0, 0.05);
}

.mission-card.claimed {
  opacity: 0.6;
  border-color: #4caf50;
  background: rgba(76, 175, 80, 0.05);
}

.mission-info h3 {
  margin: 0 0 0.5rem 0;
  color: #fff;
}

.mission-info p {
  margin: 0 0 1rem 0;
  color: #ccc;
  font-size: 0.9rem;
}

.reward-tag {
  display: inline-block;
  background: #333;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  color: #ffd700;
  border: 1px solid #555;
}

.status-btn {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  min-width: 120px;
}

.status-btn.pending {
  background: #444;
  color: #888;
  cursor: default;
}

.status-btn.claim {
  background: linear-gradient(135deg, #ff9800, #f57c00);
  color: white;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
  animation: pulse-btn 2s infinite;
}

.status-btn.claimed {
  background: transparent;
  border: 1px solid #4caf50;
  color: #4caf50;
  cursor: default;
}

@keyframes pulse-btn {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@media (max-width: 600px) {
  .mission-card {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .mission-action {
    width: 100%;
    text-align: right;
  }
}
</style>
