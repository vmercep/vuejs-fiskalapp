<template>
    <div>
        <h3>Računi:</h3>
        <br>
        <router-link to="/racuniAdd">
                   <button class="btn btn-primary">Novi Račun</button> 
                </router-link> 

                <br> <br>
        <em v-if="racuni.loading">Loading bills...</em>
        <span v-if="racuni.error" class="text-danger">ERROR: {{racuni.error}}</span>
        <ul v-if="racuni.items">


    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-racuni"
    ></b-pagination>

    <p class="mt-3">Current Page: {{ currentPage }}</p>

            
        <div>
            <b-table 
            id="my-racuni" 
            striped hover 
            :items="racuni.items" 
            :fields="fields" 
            :per-page="perPage" 
            :current-page="currentPage">
                <template #cell(details)="racuni">
                    <router-link :to="'/detaljiRacuna/'+racuni.item.id ">
                        <button class="btn btn-primary"> Detalji</button> 
                        </router-link>
                </template>
                <template #cell(fiskalizirano)="data">
                    {{data.item.jir}}
                </template>
            </b-table>
        </div>


<!--

             <br> <br>
            <li v-for="user in users.items" :key="user.id">
                <router-link :to="'/korisnici/' + user.id">
                    {{user.id+ '. => ' + user.firstName + ' ' + user.lastName }}
                </router-link>
                <br>
            </li>-->
        </ul>

    </div>
    
</template>

<script>
export default {
    name: 'RacuniPage',
    data() {
      return {
        perPage: 5,
        currentPage: 1,
        fields: ['brojRacuna','datumRacuna','iznos','details','fiskalizirano']
      }
    },
    computed: {
        
        racuni () {
            return this.$store.state.racuni.all;
            
        },
        rows() {
        return this.$store.state.racuni.all.items.length;
        }
    },
    created () {
        this.$store.dispatch('racuni/getAllByYear');
    }
};
</script>