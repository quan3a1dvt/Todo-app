import { createApp } from 'vue'
import './main.css'
import App from './App.vue'
// import Datepicker from '@vuepic/vue-datepicker'
// import '@vuepic/vue-datepicker/dist/main.css'
import Datepicker from 'vue3-datepicker/src/datepicker/Datepicker.vue'

import FlagIcon from 'vue-flag-icon'
import i18n from './lang/i18n'


const app = createApp(App);
app.use(FlagIcon)
app.use(i18n)
app.component('Datepicker', Datepicker);
app.mount('#app');

