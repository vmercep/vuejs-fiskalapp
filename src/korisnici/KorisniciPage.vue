<template>
    <div>
        <h3>Korisnici aplikacije:</h3>
        <em v-if="users.loading">Loading users...</em>
        <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
        <ul v-if="users.items">

     
  <div>
    <b-table striped hover :items="users.items" :fields="fields">
        <template #cell(edit)="users">
            <router-link :to="'/uredi/'+users.item.id ">
                  <button class="btn btn-primary"> Uredi</button> 
                </router-link>
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
    data() {
      return {
        fields: [ 'firstName', 'lastName','oib','edit']
        //items: [ { } ]
      }
    },
    computed: {
        user () {
            return this.$store.state.authentication.user;
        },
        users () {
            return this.$store.state.users.all;
            
        }
    },
    created () {
        this.$store.dispatch('users/getAll');
    }
};
</script>