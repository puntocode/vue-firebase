<template>
    <h1 class="my-5">Ingreso</h1>
    <form @submit.prevent="ingresoUsuario({email: email, password: pass1})">
        <input type="email" placeholder="email" class="form-control my-2" v-model.trim="email">
        <input type="password" placeholder="password" class="form-control my-2" v-model.trim="pass1" autocomplete="off">
        <button type="submit" class="btn btn-primary" :disabled="bloquear">Registro</button>
    </form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            email: '',
            pass1: ''
        }
    },
    computed: {
        bloquear(){
            if(!this.email.includes('@')){
                return true
            }
            if(this.pass1.length > 5){
                return false
            }
            return true
        }
    },
    methods: {
        ...mapActions(['ingresoUsuario'])
    }
}
</script>