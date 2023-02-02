import { createRouter, createWebHistory } from 'vue-router'

// import Todos from '../components/Todos.vue'
const Todos = { template: '<div>Home</div>' }
const routes = [
    {
        path: '/todos',
        name: 'Todos',
        component: Todos
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router