import { createApp } from 'vue';
import './styles/style.scss'
import App from './App.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faList, faBars, faListCheck, faPlus, faClipboardList,
    faClipboardCheck, faBarsProgress, faXmark
} from '@fortawesome/free-solid-svg-icons';

library.add(faList, faBars, faListCheck, faPlus,
    faClipboardList, faClipboardCheck, faBarsProgress, faXmark);

const app = createApp(App);


app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
