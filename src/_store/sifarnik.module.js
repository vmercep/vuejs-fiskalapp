import { sifarnikService } from '../_services';




export const sifarnik = {
    namespaced: true,
    state: {all:{},vrsteArtikla: {},sifreMjera: {},nacinPlacanja:{}, log:{}},
    actions: {
        getAllSifreMjera({ commit }) {
            commit('getAllRequest');

            sifarnikService.getAllSifreMjera()
                .then(
                    sifreMjera => commit('getSifreMjeraSuccess', sifreMjera),
                    error => commit('getAllFailure', error)
                );
        },  
        getAllVrsteArtikla({ commit }) {
            commit('getAllRequest');

            sifarnikService.getAllVrsteArtikla()
                .then(
                    vrsteArtikla => commit('getAllvrsteArtiklaSuccess', vrsteArtikla),
                    error => commit('getAllFailure', error)
                );
        },
        getNacinPlacanja ({ commit }) {
            commit('getAllRequest');

            sifarnikService.getNacinPlacanja()
                .then(
                    nacinPlacanja => commit('getNacinPlacanjaSuccess', nacinPlacanja),
                    error => commit('getAllFailure', error)
                );
        },
        logovi({ commit }) {
            commit('getAllLogs');

            sifarnikService.getLogs()
                .then(
                    logs => commit('getLogSuccess', logs),
                    error => commit('getAllFailure', error)
                );
        },

             
    },
    mutations: {
        getAllRequest(state) {
            state.all = { loading: true };
        },
        getSifreMjeraSuccess(state, sifreMjera) {
            state.sifreMjera = { sifreMjera };
        },
        //getAllvrsteArtiklaSuccess
        getAllvrsteArtiklaSuccess(state, vrsteArtikla) {
            state.vrsteArtikla = { vrsteArtikla };
        },
        getAllFailure(state, error) {
            state.all = { error };
        },
        getNacinPlacanjaSuccess(state, nacinPlacanja) {
            state.nacinPlacanja = { nacinPlacanja };
        },
        getAllLogs(state) {
            state.log = { loading: true };
        },
        getLogSuccess(state, logs) {
            state.log = { logs };
        },


    }
}
