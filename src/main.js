import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // برای استفاده از استایل‌های Vuetify

const vuetify = createVuetify();

createApp(App).use(vuetify).mount('#app');
