import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import { store } from './_store';
import { router } from './_helpers';
import App from './app/App';
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';



Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)
// Import the styles directly. (Or you could add them via script tags.)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import {
  ValidationObserver,
  ValidationProvider,
  extend
} from "vee-validate";

import * as rules from "vee-validate/dist/rules";
// Register it globally
// main.js or any entry file.
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});



  

Vue.use(require('vue-moment'));
Vue.use(BootstrapVue);



new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});