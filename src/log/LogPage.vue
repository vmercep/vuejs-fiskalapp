<template>
    <div>
        <h3>Logovi:</h3>
        <em v-if="log.loading">Učitavam logove...</em>
        <span v-if="log.error" class="text-danger">ERROR: {{log.error}}</span>
        <ul v-if="log.logs">

     
  <div>
    <b-table striped hover :items="log.logs" :fields="fields">
        
    </b-table>
  </div>



        </ul>
         
    </div>
    
</template>

<script>
export default {
    data() {
      return {
        fields: [ 'id', 'mesasgeDateTime','direction','billId']
      }
    },
    computed: {
        user () {
            return this.$store.state.authentication.user;
        },
        log () {
            return this.$store.state.sifarnik.log;
            
        }
    },
    created () {
        this.$store.dispatch('sifarnik/logovi');
    }
};
</script>