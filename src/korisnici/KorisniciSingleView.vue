<template>
        
        <div>
        <h3>Korisnik:</h3>
        <em v-if="usersingle.loading">Loading users...</em>
        <span v-if="usersingle.error" class="text-danger">ERROR: {{usersingle.error}}</span>
        <ul v-if="usersingle.user">
             <br>
              <br>

                <section class="event-content">
                <div class="container">
                    <p class="is-size-4 description">Id: {{usersingle.user.id }}</p>
                    <p class="is-size-5"><strong>Ime:</strong> {{ usersingle.user.firstName  }}</p>
                    <p class="is-size-5"><strong>Prezime:</strong> {{  usersingle.user.lastName }}</p>
                    <p class="is-size-5"><strong>OIB:</strong> {{ usersingle.user.oib }}</p>
                    <p class="is-size-5"><strong>UserName:</strong> {{ usersingle.user.userName }}</p>
                </div>
                </section>
                 <br> <br>
                   <router-link :to="'/uredi/' + usersingle.user.id">
                   <a class="button is-lite"><strong>Uredi</strong></a>
                </router-link>
                   

        </ul>
    </div>


</template>

<script>
export default {
    name: 'KorisnikSingle',
    computed: {
        usersingle () {
            return this.$store.state.user.all;
        }
    },
    created () {
        const id = Number(this.$route.params.id);
        this.$store.dispatch('user/getAllById',{id}); //this.events.find(event => event.id === ID);
        //this.$store.dispatch('users/getAll');
    }
};
</script>