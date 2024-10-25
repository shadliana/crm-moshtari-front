import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/components/Login";
import Register from "@/components/Register";
import List from "@/components/OpportunityList";

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/list',
    name: 'List',
    component: List,
  },
]
console.log(import.meta.env);


const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes
});


export default router
