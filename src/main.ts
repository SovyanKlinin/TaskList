import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './styles/style.scss'
import App from './App.vue';
import { useTask } from './store/tasks';
import  router from './router/index'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faList, faBars, faListCheck, faPlus, faClipboardList,
    faClipboardCheck, faBarsProgress, faXmark
} from '@fortawesome/free-solid-svg-icons';

library.add(faList, faBars, faListCheck, faPlus,
    faClipboardList, faClipboardCheck, faBarsProgress, faXmark);

const pinia = createPinia();
const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(pinia);
app.use(router);

const taskStore = useTask();
taskStore.loadTaskToLocalStorage();

app.mount('#app');
