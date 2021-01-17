<template>
        
        <div>
            
        <h3>Postavke:</h3>
        <br>
        <router-link to="/certifikati">
                   <button class="btn btn-primary">Certifikati</button> 
                </router-link> 

                <br> <br>
        <em v-if="settings.loading">Loading settings...</em>
        <span v-if="settings.error" class="text-danger">ERROR: {{settings.error}}</span>
        <ul v-if="settings.items">   
            <br>


            <!--<form v-on:submit.prevent="editProduct">-->
            <div class="form-group">
                <label name="product_id">ID</label>
                <input type="text" class="form-control" v-model="settings.items.id" id="settings_id" disabled >
            </div>

            <div class="form-group">
                <label name="product_name">OIB</label>
                <input type="text" class="form-control" v-model="settings.items.oib" id="settings_oib" required >
            </div>
              <div class="form-group">
                <label name="product_name">Naziv</label>
                <input type="text" class="form-control" v-model="settings.items.naziv" id="settings_naziv" required >
            </div>
            <div class="form-group">
                <label name="product_name">Vlasnik</label>
                <input type="text" class="form-control" v-model="settings.items.vlasnik" id="settings_vlasnik" required >
            </div>
            <div class="form-group">
                <label name="product_name">email</label>
                <input type="text" class="form-control" v-model="settings.items.email" id="settings_email" required >
            </div>
            <div class="form-group">
                <label name="product_name">ProdajnoMjesto</label>
                <input type="text" class="form-control" v-model="settings.items.tipJedinica" id="settings_tipJedinica" required >
            </div>
            <div class="form-group">
                <label name="product_name">NaplatniUređaj</label>
                <input type="text" class="form-control" v-model="settings.items.naplatniUredjaj" id="settings_naplatniUredjaj" required >
            </div>
            <div class="form-group">
                <label name="product_name">Godina</label>
                <input type="text" class="form-control" v-model="settings.items.godina" id="settings_godina" required >
            </div>
            <div class="form-group">
                <button class="btn btn-primary" @click="save">Save</button>
            </div>
            
       <!-- </form>                -->


        </ul>



    </div>


</template>

<script>
export default {
    name: 'SettingsPage',
    data () {
        return {
            settingsData:{},
            isEditing: false,
            file: ''
        }
    },
    computed: {
        settings () {
            return this.$store.state.settingsMethod.settings;
        }

    },
    created () {
        this.$store.dispatch('settingsMethod/getAll'); 
    },
    methods: {
        save()
            {
                // Validation
                var id = (this.settings.items.id);
                const { dispatch } = this.$store;
                this.settings.items.godina=Number(this.settings.items.godina);
                this.isEditing= true;


                return this.$store.dispatch('settingsMethod/updateSettings',  this.settings.items );

            }
        
    }
};
</script>