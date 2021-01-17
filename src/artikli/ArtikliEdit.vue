<template>
        
        <div>
        <h3>Korisnik:</h3>
        <em v-if="artiklsingle.loading">Loading artikl...</em>
        <span v-if="artiklsingle.error" class="text-danger">ERROR: {{artiklsingle.error}}</span>
        <ul v-if="artiklsingle.all.artikl">   


            <!--<form v-on:submit.prevent="editProduct">-->
            <div class="form-group">
                <label name="product_id">ID</label>
                <input type="text" class="form-control" v-model="artiklsingle.all.artikl.id" id="artikl_id" disabled >
            </div>

            <div class="form-group">
                <label name="product_name">Naziv</label>
                <input type="text" class="form-control" v-model="artiklsingle.all.artikl.naziv" id="artikl_naziv" required >
            </div>
             <div class="form-group">
                <label name="product_name">Sifra</label>
                <input type="text" class="form-control" v-model="artiklsingle.all.artikl.sifra" id="artikl_sifra" disabled >
            </div>
            <div class="form-group">
                <label name="product_name">Cijena</label>
                <input type="text" class="form-control" v-model="artiklsingle.all.artikl.cijena" id="artikl_cijena" required >
            </div>

                <div class="form-group">
                <label name="product_name">ŠifraMjere</label>
                    <b-form-select v-model="artiklsingle.all.artikl.sifraMjere" :options="artiklsifarnik.sifreMjera.sifreMjera" :selected="artiklsingle.all.artikl.sifraMjere" id="artikl_sifraMjere_select"></b-form-select>               
                </div>


            <div class="form-group">
                <label name="product_name">Vrsta</label>
                    <b-form-select v-model="artiklsingle.all.artikl.vrstaArtikla" :options="artiklsifarnik.vrsteArtikla.vrsteArtikla" :selected="artiklsingle.all.artikl.vrstaArtikla" id="artikl_vrstaArtikla_select"></b-form-select>               
                
            </div>

            <div class="form-group">
                <button class="btn btn-primary" @click="save">Save</button>
            </div>
            
        <!--</form>                -->
        

        </ul>



    </div>


</template>

<!-- Litra=1,
        Kilogram=2,
        Komad=3,
        RadniSat=4 -->

<script>
export default {
    name: 'ArtikliEdit',
    data () {
        return {
            artikl:{},
            vrste:{},
            isEditing: false,
            options: [ ],
            selected: null
        }
    },
    computed: {
        artiklsingle () {
            return this.$store.state.artikli;          
        },
        artiklsifarnik () {
            return this.$store.state.sifarnik;          
        }

    },
    created () {
        const id = Number(this.$route.params.id);
        this.$store.dispatch('artikli/getById',{id}); 
        //getAllSifreMjera
        this.$store.dispatch('sifarnik/getAllSifreMjera'); 
        this.$store.dispatch('sifarnik/getAllVrsteArtikla'); 

    },
    methods: {
        //editProduct: function()
        save()
            {
                // nista
                var artiklid = (this.artiklsingle.all.artikl.id);

                //trea prebaciti txt u decimal
                var artiklcijena=this.artiklsingle.all.artikl.cijena;
                this.artiklsingle.all.artikl.cijena=Number(artiklcijena);
                this.artiklsingle.all.artikl.vrstaArtikla=Number(this.artiklsingle.all.artikl.vrstaArtikla);
                this.submitted = true;
                const { dispatch } = this.$store;
                this.$store.dispatch('artikli/updateArtikl',  this.artiklsingle.all.artikl );
            }
        
    }
};
</script>