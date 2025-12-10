
<script setup lang="ts">
defineProps<{
  nombre: string
  sprite: string
  tipo: string
}>()
</script>

<template>
  <div class="pokemon-card">
    <img :src="sprite" :alt="nombre" class="pokemon-sprite" />
    <h3 class="pokemon-name">{{ nombre }}</h3>
    <span class="pokemon-type">{{ tipo }}</span>
  </div>
</template>

<style scoped>
.pokemon-card {
  border: 1px solid #646cff;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  background-color: #1a1a1a;
  transition: transform 0.2s;
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pokemon-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(100, 108, 255, 0.4);
}

.pokemon-sprite {
  width: 96px;
  height: 96px;
  image-rendering: pixelated;
}

.pokemon-name {
  margin: 0.5rem 0;
  text-transform: capitalize;
  font-size: 1.2rem;
}

.pokemon-type {
  background-color: #333;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #ccc;
}
</style>
