import { createRouter, createWebHistory } from "vue-router";
import HomeView from './../views/HomeView.vue';
import TaskEditor from "../components/TaskEditor.vue";
import NewTask from "../components/NewTask.vue";

const routes = [
    {path: '/', name: 'HomeView', component: HomeView},
    {path: '/edit', name: 'TaskEditor', component: TaskEditor},
    {path: '/newtask', name: 'NewTask', component: NewTask},
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;