import { createRouter, createWebHistory } from 'vue-router'

import App from '../App.vue'
import Home from '../components/Home.vue'
import Post from '../components/Post.vue'
import Edit from '../components/Edit.vue'
import Main from '../components/Main.vue'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/todo',
        component: Main
    },
    {
        path: '/post',
        name: 'Post',
        props: true,
        component: Post
    },
    {
        path: '/post/:id',
        name: 'Edit',
        props: true,
        component: Edit
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router