import { settingsService } from '../_services';


const settings = JSON.parse(localStorage.getItem('settings'));


export const settingsMethod = {
    namespaced: true,
    state: {
        settings: {},
        cetificate: {}
    },
    actions: {
        getAll({ commit }) {
            commit('getAllRequest');

            settingsService.getAll()
                .then(
                    settings => commit('getAllSuccess', settings),
                    error => commit('getAllFailure', error)
                );
        },
        updateSettings({ dispatch, commit }, settings ) {
            commit('getAllRequest', settings);

            settingsService.updateSettings(settings)
            .then(
                settings => {
                    commit('getAllSuccess', settings);
                    //router.push('/settings');
                },
                error => {
                    commit('getAllFailure', error);
                    //router.push('/korisnici/'+userObj.id);
                    dispatch('alert/error', error, { root: true });
                }
            );
        },
        uploadCertificate({ dispatch, commit }, certificate ) {
            commit('getAllRequest', certificate);

            settingsService.uploadCertificate(certificate)
            .then(
                /*
                certificate => {
                    commit('getAllSuccess', certificate);
                },*/
                error => {
                    commit('getAllFailure', error);
                    //router.push('/korisnici/'+userObj.id);
                    dispatch('alert/error', error, { root: true });
                }
            );
        },    
        updateCertificatePassword({ dispatch, commit }, password ) {
            commit('getAllRequest', password);

            settingsService.updateCertificatePassword(password)
            .then(
                password => {
                    commit('getAllSuccess', password);
                    //router.push('/settings');
                },
                error => {
                    commit('getAllFailure', error);
                    //router.push('/korisnici/'+userObj.id);
                    dispatch('alert/error', error, { root: true });
                }
            );
        }, 
        
        getCertificate({ commit }) {
            commit('getCertificate');

            settingsService.getCertificate()
                .then(
                    certificate => commit('getCertificateSuccess', certificate),
                    error => commit('getCertificateFailure', error)
                );
        },
    },
    mutations: {
        getAllRequest(state) {
            state.settings = { loading: true };
        },
        getAllSuccess(state, settings) {
            state.settings = { items: settings };
        },
        getAllFailure(state, error) {
            state.settings = { error };
        },

        getCertificate(state) {
            state.certificate = { loading: true };
        },
        getCertificateSuccess(state, certificate) {
            state.certificate = { items: certificate };
        },
        getCertificateFailure(state, error) {
            state.certificate = { error };
        },



    }
}
