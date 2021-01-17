import { userService } from '../_services';
import { router } from '../_helpers';



export const user = {
    namespaced: true,
    state: {
        all: {}
    },
    actions: {
        getAllById({ commit }, { id }) {
            commit('getByIdRequest', { id });

            userService.getAllById(id)
                .then(
                    user => commit('getByIdSuccess', user),
                    error => commit('getByIdFailure', error)
                );
        },
        updateUser({ dispatch, commit }, userObj ) {
            commit('updateUser', userObj);

            userService.updateUser(userObj)
            .then(
                userObj => {
                    commit('updateUserSuccess', userObj);
                    router.push('/korisnici/'+userObj.id);
                },
                error => {
                    //commit('updateUserFailure', error);
                    //router.push('/korisnici/'+userObj.id);
                    dispatch('alert/error', error, { root: true });
                }
            );
        },
        addUser({ dispatch, commit }, userObj ) {
            commit('addUser', userObj);

            userService.addUser(userObj)
            .then(
                userObj => {
                    commit('addUserSuccess', userObj);
                    router.push('/korisnici');
                },
                error => {
                    commit('addUserFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
        },
        changePassword({ dispatch, commit }, userObj ) {
            commit('updateUser', userObj);

            userService.changePassword(userObj)
            .then(
                userObj => {
                    commit('updateUserSuccess', userObj);
                    //router.push('/korisnici/'+userObj.id);
                },
                error => {
                    //commit('updateUserFailure', error);
                    //router.push('/korisnici/'+userObj.id);
                    dispatch('alert/error', error, { root: true });
                }
            );
        },

    },
    
    mutations: {
        getByIdRequest(state) {
            state.all = { loading: true };
        },
        getByIdSuccess(state, user) {
            state.all = { user };
        },
        getByIdFailure(state, error) {
            state.all = { error };
        },
        updateUser(state, user) {
            state.all = { user };
        },
        updateUserSuccess(state, user){
            state.all = { user} ;
        },

        updateUserFailure(state, error) {
            state.all = { error };
        },
        addUser(state) {
            state.all = { loading: true };
        },
        addUserSuccess(state, user){
            state.all = { user} ;
        },

        addUserFailure(state, error) {
            state.all = { error };
        },

    }
}
