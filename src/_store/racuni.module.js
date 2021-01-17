import { racuniService } from '../_services';
import { router } from '../_helpers';



export const racuni = {
    namespaced: true,
    state: {all:{}, stavke:{}},
    actions: {
        getAll({ commit }) {
            commit('getAllRequest');

            racuniService.getAll()
                .then(
                    racuni => commit('getAllSuccess', racuni),
                    error => commit('getAllFailure', error)
                );
        },
        getAllByYear({ commit }) {
            commit('getAllRequest');

            racuniService.getAllByYear()
                .then(
                    racuni => commit('getAllSuccess', racuni),
                    error => commit('getAllFailure', error)
                );
        },
        insertNewBill({ dispatch, commit }, racun)
        {
            commit('getAllRequest');

            racuniService.dodajRacun(racun)
            .then(
                settings => {
                    commit('getAllSuccess', racun);
                    router.push('/racuni');
                },
                error => {
                    commit('getAllFailure', error);
                    //router.push('/korisnici/'+userObj.id);
                    dispatch('alert/error', error, { root: true });
                }
            );


        },
        getBrojRacuna({ commit }) {
            commit('getAllRequest');

            racuniService.getBrojRacuna()
                .then(
                    racunBroj => commit('getBrojRacunaSuccess', racunBroj),
                    error => commit('getAllFailure', error)
                );
        },

        
        getRacunById({ commit }, { id })
        {
            commit('getAllRequest');

            racuniService.getById(id)
                .then(
                    racun => commit('getByIdSuccess', racun),
                    error => commit('getByIdFailure', error)
                );


        },

        stavkerRacuna({ commit }, { id })
        {
            commit('getAllStavke');

            racuniService.getStavkeRacuna(id)
                .then(
                    stavke => commit('getAllStavkeSuccess', stavke),
                    error => commit('getAllStavkeFailure', error)
                );


        },

        fiskaliziraj({ commit},id)
        {
            commit('fiskaliziraj');

            racuniService.fiskaliziraj(id)
                .then(
                    racun => commit('getByIdSuccess', racun),
                    error => commit('fiskaliziranoFailure', error)
                );
        }
             
    },
    mutations: {
        getAllStavke(state) {
            state.stavke = { loading: true };
        },
        getAllRequest(state) {
            state.all = { loading: true };
        },
        getAllSuccess(state, racuni) {
            state.all = { items: racuni };
        },
        getAllFailure(state, error) {
            state.all = { error };
        },
        insertNewBill(state)
        {
            state.all = { loading: true };
        },
        getBrojRacunaSuccess(state, racunBroj) {
            state.all = { item: racunBroj };
        },

        getByIdSuccess(state, racun) {
            state.all = { item: racun };
        },
        getByIdFailure(state, error) {
            state.all = { error };
        },
        getAllStavkeSuccess(state, stavke) {
            state.stavke = { item: stavke };
        },
        getAllStavkeFailure(state, error) {
            state.stavke = { error };
        },
        fiskaliziraj(state) {
            state.all = { loading: true };
        },
        fiskaliziranoSuccess(state, racuni) {
            state.all = { items: racuni };
        },
        fiskaliziranoFailure(state, error) {
            state.all = { error };
        },
    }
}
