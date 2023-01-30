import { createApp } from 'vue'
import './main.css'
import App from './App.vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
// import {en, vi} from '@vuepic/vue-datepicker/dist/locale'
import FlagIcon from 'vue-flag-icon'
import i18n from './lang/i18n'


const app = createApp(App);
app.use(FlagIcon)
app.use(i18n)
app.component('Datepicker', Datepicker);
app.mount('#app');

