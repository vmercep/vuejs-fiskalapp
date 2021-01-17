<template>
    <div>
        <h3>Artikli:</h3>
        <em v-if="artikli.loading">Učitavam artikle...</em>
        <span v-if="artikli.error" class="text-danger">ERROR: {{artikli.error}}</span>
        <ul v-if="artikli.items">

     
  <div>
              <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        />
    <b-table striped hover :items="artikli.items" :fields="fields">



        <template #cell(edit)="artikli">
            <router-link :to="'/urediArtikl/'+artikli.item.id ">
                  <button class="btn btn-primary"> Uredi</button> 
                </router-link>
        </template>
    </b-table>
  </div>



        </ul>
         <br> <br>
        <router-link to="/artikliAdd">
                   <button class="btn btn-primary">Dodaj artikl</button> 
                </router-link>
    </div>
    
</template>

<script>
export default {
    data() {
      return {
          filters: {
                    id: '',
                    sifra: '',
                    naziv: ''
    },
        fields: [ 'id', {key:'sifra',sortable: true,},'naziv','cijena','edit']
      }
    },
    computed: {
        user () {
            return this.$store.state.authentication.user;
        },
        artikli () {
            return this.$store.state.artikli.all;
            
        }
    },
    created () {
        this.$store.dispatch('artikli/getAll');
    }
};
</script>