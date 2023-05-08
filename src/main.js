import { createApp } from 'vue'
import '@fortawesome/fontawesome-free'

import PortalVue from 'portal-vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fortawesome/fontawesome-free/js/all.min.js'






import './style.css'
import App from './App.vue'

const app = createApp(App);
app.use(PortalVue)

app.mount('#app')

