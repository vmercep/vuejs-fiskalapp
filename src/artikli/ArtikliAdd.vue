<template>
        
        <div>
        <h3>Dodaj novi artikl:</h3>


            <!--<form v-on:submit.prevent="editProduct">-->

            <div class="form-group">
                <label name="product_name">Naziv</label>
                <input type="text" class="form-control" v-model="artikl.naziv" id="artikl_naziv" required >
            </div>
            <div class="form-group">
                <label name="product_name">Cijena</label>
                <input type="text" class="form-control" v-model="artikl.cijena" id="artikl_cijena" required >
            </div>
                      
            <div class="form-group">
                <label name="product_name">ŠifraMjere</label>
                    <b-form-select v-model="artikl.sifraMjere" :options="artiklisifarnik.sifreMjera.sifreMjera" id="artikl_sifraMjere_select"></b-form-select>               
                </div>


            <div class="form-group">
                <label name="product_name">Vrsta</label>
                    <b-form-select v-model="artikl.vrstaArtikla" :options="artiklisifarnik.vrsteArtikla.vrsteArtikla" id="artikl_vrstaArtikla_select" ></b-form-select>               
                
            </div>

            <div class="form-group">
                <button class="btn btn-primary" @click="save">Save</button>
            </div>
            
        <!--</form>                -->
        



    </div>


</template>

<script>
export default {
    name: 'ArtiklAdd',
    data () {
        return {
            artikl:{},
            vrstaArtikla:{},
            sifraMjere:{},
            isEditing: false,
            options: [ ],
            selected: null
        }
    },
    computed: {
        artiklsingle () {
            return this.$store.state.artikli;          
        },
        artiklisifarnik () {
            return this.$store.state.sifarnik;          
        }

    },
    created () {
        this.$store.dispatch('sifarnik/getAllSifreMjera'); 
        this.$store.dispatch('sifarnik/getAllVrsteArtikla'); 

    },
    methods: {
        save()
            {
                // Validation
                const { dispatch } = this.$store;
                this.artikl.cijena=Number(this.artikl.cijena);
                this.$store.dispatch('artikli/addArtikl',  this.artikl );
            }
        
    }
};
</script>