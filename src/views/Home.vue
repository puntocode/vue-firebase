<template>
  <form class="mt-5" @submit.prevent="procesarFormulario">
       <Input :tarea="tarea" />
  </form>
  <hr>
  <ListaTareas />
</template>

<script>
import Input from '../components/Input'
import ListaTareas from '../components/ListaTareas'
import { mapActions } from 'vuex';

const shortid = require('shortid');

export default {
  name: 'Home',
  components: {
    Input, ListaTareas  
  },
  //----------------------data------------------------------------
  data() {
    return {
       tarea: {id:'', nombre:'', categoria: [], estado:'', numero: 0}
    }
  },
  //----------------------methods--------------------------------
  methods: {
    ...mapActions(['setTareas', 'cargarTareas']),
    procesarFormulario(){
      if(this.tarea.nombre.trim() === ''){
        console.log('nombre Vacío')
        return
      }
      //genera el id
      this.tarea.id = shortid.generate()
      //envia los datos
      this.setTareas(this.tarea)
      //limpia los datos
      this.tarea = {id: '', nombre: '', categoria: [], estado: '', numero: 0}
    },
    
  },
  created(){
    this.cargarTareas()
  }
  
}
</script>