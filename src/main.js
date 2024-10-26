import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import router from './router';
import store from './store'; // Store را وارد کنید

createApp(App)
    .use(store) // Store را به اپلیکیشن اضافه کنید
    .use(router)
    .mount('#app');
