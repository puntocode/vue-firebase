import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Editar from '../views/Editar.vue'
import Registro from '../views/Registro.vue'
import Ingreso from '../views/Ingreso.vue'
import store from '../store'


const routes = [
  {
    path: '/',
    name: 'Ingreso',
    component: Ingreso
  },
  {
    path: '/editar/:id',
    name: 'Editar',
    component: Editar,
    meta: { usuarioAutenticado: true }
  },
  {
    path: '/registrar-usuario',
    name: 'Registro',
    component: Registro
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { usuarioAutenticado: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.usuarioAutenticado){
    if (store.getters.usuarioAutenticado) next()
    else next('/')
  }
  else next()
})

export default router
