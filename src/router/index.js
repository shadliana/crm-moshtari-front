import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/components/Login";
import Register from "@/components/Register";
import OpportunityRoute from "@/router/opportunity-route";
import UserRoute from "@/router/user-route";

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

    ...OpportunityRoute,
        ...UserRoute
]

const router = createRouter({

  history: createWebHistory(process.env.BASE_URL),
  routes
});


export default router
