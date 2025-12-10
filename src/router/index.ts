import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ZoneLobby from '../views/ZoneLobby.vue'
import MissionsView from '../views/MissionsView.vue'
import PvpView from '../views/PvpView.vue'

const routes = [
    { path: '/', redirect: '/map' },
    { path: '/map', component: HomeView },
    { path: '/zone/:id', component: ZoneLobby },
    { path: '/missions', component: MissionsView },
    { path: '/pvp', component: PvpView }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
