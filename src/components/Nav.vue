
<template>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="success">
        <b-container>   
            <b-navbar-brand to="/racuni" exact exact-active-class="active">Računi</b-navbar-brand>
            <b-navbar-brand to="/artikli" exact exact-active-class="active">Artikli</b-navbar-brand>
            <b-navbar-brand to="/settings" exact exact-active-class="active">Postavke</b-navbar-brand>
            <b-navbar-brand to="/log" exact exact-active-class="active">Log</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
              <!-- Right aligned nav items -->
              <b-navbar-nav class="ml-auto">
                
                <b-nav-item-dropdown right>
                  <!-- Using 'button-content' slot -->
                  <template slot="button-content"><em>Korisnik@{{user.firstName}}</em></template>
                  <b-dropdown-item to="/korisnici">Popis</b-dropdown-item>
                  <b-dropdown-item to="/korisniciAdd">Dodaj novog</b-dropdown-item>
                  <b-dropdown-item v-if="this.$store.state.authentication.status.loggedIn" @click="logout">Odjava</b-dropdown-item>
                </b-nav-item-dropdown>
              </b-navbar-nav>
            </b-collapse>
          </b-container>
      </b-navbar>
    </div>  
</template>


<script>
export default {
  name: 'Nav',
  methods: {
    // Log the user out
    logout() {
      this.$router.push('/login')
    }
  },
  computed: {
        user () {
            return this.$store.state.authentication.user;
        },
  }
}
</script>