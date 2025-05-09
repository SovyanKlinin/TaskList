import { createRouter, createWebHistory } from "vue-router";
import HomeView from './../views/HomeView.vue';
import Modal from "../views/Modal.vue";

const routes = [
    {path: '/', name: 'HomeView', component: HomeView},
    {path: '/modal', name: 'Modal', component: Modal},
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;