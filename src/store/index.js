import { createStore } from 'vuex'
import router from '../router'

export default createStore({
  /*----------------------------------------state-----------------------------------------------*/
  state: {
    tareas: [],
    tarea: {nombre:'', categoria: [], estado:'', numero: 0, id:''},
    user: null
  },
    /*----------------------------------------mutations-----------------------------------------------*/
  mutations: {
    //cargar usuario en el state
    setUser(state, payload){
      state.user = payload
    },
    //carga en el array tarea
    cargar(state, payload) {
      state.tareas = payload
    },
    set(state, payload){
      state.tareas.push(payload)
    },
    delete(state, payload){
      state.tareas = state.tareas.filter(item => item.id !== payload)
    },
    tarea(state, payload) {
      if (!state.tareas.find(item => item.id === payload)){
        console.log('no existe el id')
        router.push('/home')
        return 
      }
      state.tarea = state.tareas.find(item => item.id === payload)
      console.log(state.tarea)
      console.log('tarea vuex: ', state.tarea)
    },
    update(state, payload) {
      state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item)
      router.push('/home')
    }
  },
  /*----------------------------------------actions-----------------------------------------------*/
  actions: {
    //ingreso de usuario
    async ingresoUsuario({commit}, user){
      try {
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAvPuEXMKEwURF_6Om2pLkTtv1jxyaTx8U',{
          method: 'POST',
          body: JSON.stringify({
            email: user.email, 
            password: user.password,
            returnSecureToken: true
          })
        });

        const userDB = await res.json();
        if(userDB.error){
          return console.log(userDB.error)
        }

        commit('setUser', userDB)
        localStorage.setItem('user', JSON.stringify(userDB))
        router.push('/home')

      } catch (error) {
        console.log(error);
      }
    },
    //carga usuario en la mutacion
    async registrarUsuario({commit}, user){
      try {
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAvPuEXMKEwURF_6Om2pLkTtv1jxyaTx8U', {
          method: 'POST',
          body: JSON.stringify({
            email: user.email,
            password: user.password,
            returnSecureToken: true
          })
        })
        const dataDB = await res.json();
        
        if(dataDB.error){
          return console.log(dataDB.error)
        }

        commit('setUser', dataDB)
        router.push('/home')

      } catch (error) {
        console.log(error);
      }
    },
    //leer de la Base de datos
    async cargarTareas({commit, state}){
      console.log('cargarTareas', state)
      if(localStorage.getItem('user')) commit('setUser', JSON.parse(localStorage.getItem('user')))
      else return commit('setUser', null)

      try{
        const res = await fetch(`https://vue-api-rest-udemy-default-rtdb.firebaseio.com/tareas/${state.user.localId}.json?auth=${state.user.idToken}`)
        const dataDB = await res.json()
        const arrayDatos = []

        for(let id in dataDB){
          arrayDatos.push(dataDB[id])
        }
        console.log(arrayDatos);
        commit('cargar', arrayDatos)
      }catch(error){
        console.error(error);
      }
    },
    //carga las tareas en la BD
    async setTareas({commit, state}, tarea){ //la palabra async para utilizar
      try{
        //await -> espera que se haga toda esta peticion
        const res = await fetch(`https://vue-api-rest-udemy-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, { //envia el id ->si no existe crea, sino actualiza
          method: 'PUT',
          headers: { 'content-Type': 'application/json' },
          body: JSON.stringify(tarea) //convierte lo recibido a JSON
        }) 

        const dataDB = await res.json();
        commit('set', dataDB)
      }catch(error){
        console.log(error)
      }
    },
    setTarea({commit}, id){
      commit('tarea', id)
    },
    //eliminar de la BD
    async deleteTarea({commit, state}, id){
      try{
        await fetch(`https://vue-api-rest-udemy-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
          method: 'DELETE'
        })
      }catch(error){
        console.log(error);
      }
      
      commit('delete', id)
    },
    //Actualizar de la BD
    async updateTarea({ commit, state }, tarea) {
      try {
        const res = await fetch(`https://vue-api-rest-udemy-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
          method: 'PATCH',
          body: JSON.stringify(tarea)
        })
        const dataDB = await res.json()
        commit('update', dataDB)
      } catch (error) {
        console.log(error)
      }
    },
    //cierre de sesion
    cerrarSesion({ commit }) {
      commit('setUser', null)
      localStorage.removeItem('user') //elimina del localstorage
      router.push('/')
    }
  },
  /*----------------------------------------modules-----------------------------------------------*/
  modules: {
  },
  /*----------------------------------------getter-----------------------------------------------*/
  getters: {
    usuarioAutenticado(state){
      return !!state.user; //si existe el usuario retorna true else false
    }
  }

})
