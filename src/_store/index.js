import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from './alert.module';
import { authentication } from './authentication.module';
import { users } from './users.module';
import { user } from './user.module';
import { settingsMethod } from './settings.module';
import { artikli } from './artikli.module';
import { racuni } from './racuni.module';
import { sifarnik } from './sifarnik.module';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert,
        authentication,
        users,
        user,
        settingsMethod,
        artikli,
        racuni,
        sifarnik
    }
});
