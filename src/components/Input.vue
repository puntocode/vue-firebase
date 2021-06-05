<template>
   <input type="text" v-model.trim="tarea.nombre" placeholder="Nombre Tarea" class="form-control"> 
    <div class="form-check form-check-inline">
      <input type="checkbox" id="check" class="form-check-input" value="Javascript" v-model="tarea.categoria">
      <label for="check" class="form-check-label">Javascript</label>
    </div>
    <div class="mform-check form-check-inline">
      <input type="checkbox" id="check" class="form-check-input" value="Node Js" v-model="tarea.categoria">
      <label for="check" class="form-check-label">Node Js</label>
    </div>
    <div class="mt-2">
      <div class="form-check form-check-inline">
        <input type="radio" id="radio-1" class="form-check-input" value="Activo" v-model="tarea.estado">
        <label for="check" class="form-check-label">Activo</label>
      </div>
      <div class="form-check form-check-inline">
        <input type="radio" id="radio-2" class="form-check-input" value="Inactivo" v-model="tarea.estado">
        <label for="check" class="form-check-label">Inactivo</label>
      </div>
    </div>
    <div class="my-2">
      <input type="number" class="form-control" placeholder="numero" v-model.number="tarea.numero">
    </div>
    <div class="mt-3">
      <button type="submit" class="btn btn-dark btn-block" :disabled="validacion">Enviar</button>
    </div>
</template>

<script>
export default {
    props: {
        tarea: Object
    },
    computed: {
        validacion() {
        return this.tarea.nombre.trim() === '' ? true : false
        }
    },
}
</script>

<style>

</style>