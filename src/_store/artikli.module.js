import { artikliService } from '../_services';
import { router } from '../_helpers';



export const artikli = {
    namespaced: true,
    state: {
        all: {},
        sifreMjera: {},
        vrsteArtikla: {}
    },
    actions: {
        getAll({ commit }) {
            commit('getAllRequest');

            artikliService.getAll()
                .then(
                    artikli => commit('getAllSuccess', artikli),
                    error => commit('getAllFailure', error)
                );
        },   
        
        getById({ commit }, { id }) {
            commit('getByIdRequest', { id });

            artikliService.getById(id)
                .then(
                    artikl => commit('getByIdSuccess', artikl),
                    error => commit('getByIdFailure', error)
                );
        },
        updateArtikl({ dispatch, commit }, userObj ) {
            commit('updateUser', userObj);

            artikliService.updateArtikl(userObj)
            .then(
                userObj => {
                    commit('updateUserSuccess', userObj);
                    router.push('/artikli');
                },
                error => {
                    commit('updateUserFailure', error);
                    //router.push('/korisnici/'+userObj.id);
                    dispatch('alert/error', error, { root: true });
                }
            );
        },
        addArtikl({ dispatch, commit }, userObj ) {
            commit('addUser', userObj);

            artikliService.addArtikl(userObj)
            .then(
                userObj => {
                    commit('addArtiklSuccess', userObj);
                    router.push('/artikli');
                },
                error => {
                    commit('addArtiklFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
        },
        getAllSifreArtikala({ commit }) {
            commit('getAllRequest');

            artikliService.getAllSifreArtikala()
                .then(
                    artikli => commit('getAllSuccess', artikli),
                    error => commit('getAllFailure', error)
                );
        },
        getBySifraArtikala({ dispatch, commit }, sifraArtikla) {
            commit('getAllRequest');

            return new Promise((resolve, reject) => {
            artikliService.getBySifraArtikala(sifraArtikla)
            .then(
                sifraArtikla => {
                    console.log('Success');
                    commit('getAllSuccess', sifraArtikla);
                    resolve(sifraArtikla)
                },
                error => {
                    console.log('Error');
                    //commit('getAllFailure', error);
                    //dispatch('alert/error', error, { root: true });
                    //reject(error)
                }
            );
        }    )
    }  



    },
    
    mutations: {
        getByIdRequest(state) {
            state.all = { loading: true };
        },
        getByIdSuccess(state, artikl) {
            state.all = { artikl };
        },
        getByIdFailure(state, error) {
            state.all = { error };
        },
        updateUser(state) {
            state.all = { loading: true };
        },
        updateUserSuccess(state, artikl){
            state.all = { artikl} ;
        },

        updateUserFailure(state, error) {
            state.all = { error };
        },
        addUser(state) {
            state.all = { loading: true };
        },
        addArtiklSuccess(state, artikl){
            state.all = { artikl} ;
        },

        addArtiklFailure(state, error) {
            state.all = { error };
        },
        getAllRequest(state) {
            state.all = { loading: true };
        },
        getAllSuccess(state, artikl) {
            state.all = { items: artikl };
        },
        getAllFailure(state, error) {
            state.all = { error };
        },
        getSifreMjeraSuccess(state, sifreMjera) {
            state.sifreMjera = { sifreMjera };
        },
        //getAllvrsteArtiklaSuccess
        getAllvrsteArtiklaSuccess(state, vrsteArtikla) {
            state.vrsteArtikla = { vrsteArtikla };
        }
    }
}
