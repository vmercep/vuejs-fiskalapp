import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage'
import LoginPage from '../login/LoginPage'
import RacuniPage from '../racuni/RacuniPage'
import KorisniciPage from '../korisnici/KorisniciPage'
import KorisniciAdd from '../korisnici/KorisniciAddNew'
import SettingsPage from '../settings/SettingsPage.vue'
import ArtikliPage from '../artikli/ArtikliPage.vue'
import ArtikliAdd from '../artikli/ArtikliAdd.vue'
import RacuniAdd from '../racuni/RacuniAdd.vue'
import SettingsCertificate from '../settings/SettingsCertificate.vue'
import LogPage from '../log/LogPage.vue'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/racuni', component: RacuniPage },
    { path: '/korisnici', component: KorisniciPage },
    {
      path: '/korisnici/:id',
      name: 'korisnikSingle',
      component: () => import('../korisnici/KorisniciSingleView.vue')
    },
    {
      path: '/uredi/:id',
      name: 'KorisniciEdit',
      component: () => import('../korisnici/KorisniciEdit.vue')
    },
    { path: '/korisniciAdd', component: KorisniciAdd },
    { path: '/settings', component: SettingsPage },
    { path: '/artikli', component: ArtikliPage },
    { path: '/artikliAdd', component: ArtikliAdd },
    {
      path: '/urediArtikl/:id',
      name: 'ArtikliEdit',
      component: () => import('../artikli/ArtikliEdit.vue')
    },
    { path: '/racuniAdd', component: RacuniAdd },
    { path: '/certifikati', component: SettingsCertificate },
    {
      path: '/detaljiRacuna/:id',
      name: 'RacuniDetails',
      component: () => import('../racuni/RacuniDetails.vue')
    },
    { path: '/log', component: LogPage },
    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})