<template>
  <div class="navbar navbar-dark bg-dark">
    <router-link to="/" class="navbar-brand">APP</router-link>
    <div class="d-flex">
        <router-link to="/" class="btn btn-dark" v-if="!usuarioAutenticado">Ingresar</router-link>
        <router-link to="/registrar-usuario" class="btn btn-dark" v-if="!usuarioAutenticado">Registrar</router-link>
        <router-link to="/home" class="btn btn-dark" v-if="usuarioAutenticado">Tareas</router-link>
        <button class="btn btn-dark" v-if="usuarioAutenticado" @click="cerrarSesion">Cerrar Sesión</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, } from 'vuex'

export default{
  methods:{
    ...mapActions(['cerrarSesion'])
  },
  //los getters siempre se mapean el las propiedades computadas
  computed: { 
    ...mapGetters(['usuarioAutenticado'])
  },
}
</script>
