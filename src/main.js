import { createApp } from 'vue'
import './main.css'
import App from './App.vue'
import router from './router/router.js'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
// import DatePicker from 'v-calendar/src/components/DatePicker'
import 'v-calendar/dist/style.css';
import FlagIcon from 'vue-flag-icon'
import i18n from './lang/i18n'
import { vi } from 'date-fns/locale'
const app = createApp(App);
app.use(router)
app.use(FlagIcon)
app.use(i18n)
app.component('Datepicker', Datepicker);
app.mount('#app');

