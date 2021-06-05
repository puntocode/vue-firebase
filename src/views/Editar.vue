<template>
  <h2 class="mt-5">Editar {{  $route.params.id }} - {{ tarea }}</h2>
    <form form class="mt-3" @submit.prevent="updateTarea(tarea)">
        <Input :tarea="tarea" />
    </form>
</template>

<script>
import Input from '../components/Input'
import {mapActions, mapState} from 'vuex'

export default {
    components: {
        Input
    },
    computed: {
        ...mapState(['tarea'])
    },
    methods: {
        ...mapActions(['updateTarea', 'setTarea'])
    },
    created(){
        this.setTarea(this.$route.params.id)
    }
}
</script>

<style>

</style>