<template>
        
        <div>
        <h3>Dodaj novog korisnika:</h3>


            <!--<form v-on:submit.prevent="editProduct">-->

            <div class="form-group">
                <label name="product_name">UserName</label>
                <input type="text" class="form-control" v-model="user.userName" id="user_userName" required >
            </div>
            <div class="form-group">
                <label name="product_name">Password</label>
                <input type="text" class="form-control" v-model="user.password" id="user_password" required >
            </div>
            <div class="form-group">
                <label name="product_name">Ime</label>
                <input type="text" class="form-control" v-model="user.firstName" id="user_firstname" required >
            </div>
             <div class="form-group">
                <label name="product_name">Prezime</label>
                <input type="text" class="form-control" v-model="user.lastName" id="user_lastName" required >
            </div>
            <div class="form-group">
                <label name="product_name">Oib</label>
                <input type="text" class="form-control" v-model="user.oib" id="user_oib" required >
            </div>
            <div class="form-group">
                <button class="btn btn-primary" @click="save">Save</button>
            </div>
            
        <!--</form>                -->
        



    </div>


</template>

<script>
export default {
    name: 'KorisnikAdd',
    data () {
        return {
            user:{}
        }
    },
    methods: {
        //editProduct: function()
        save()
            {
                // Validation
                const { dispatch } = this.$store;
                this.$store.dispatch('user/addUser',  this.user );
            }
        
    }
};
</script>