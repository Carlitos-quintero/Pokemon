<script setup lang="ts">
import GameMap from '../components/GameMap.vue'
import PokemonCard from '../components/PokemonCard.vue'

const pokemons = [
  {
    nombre: 'pikachu',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    tipo: 'Eléctrico'
  },
  {
    nombre: 'charmander',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
    tipo: 'Fuego'
  },
  {
    nombre: 'bulbasaur',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    tipo: 'Planta'
  }
]
</script>

<template>
  <div class="home-container">
    <GameMap />
    
    <div class="divider"></div>

    <h1>Mis Pokémon</h1>
    <div class="card-grid">
      <PokemonCard
        v-for="pokemon in pokemons"
        :key="pokemon.nombre"
        :nombre="pokemon.nombre"
        :sprite="pokemon.sprite"
        :tipo="pokemon.tipo"
      />
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
}

.divider {
  width: 100%;
  height: 2px;
  background-color: #333;
  margin: 2rem 0;
}

.card-grid {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
