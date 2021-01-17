<template>
        
        <div>
        <h3>Racun:</h3>
        <em v-if="racun.loading">Loading racun...</em>
        <span v-if="racun.error" class="text-danger">ERROR: {{racun.error}}</span>
        <ul v-if="racun.item">
             <b-form>


                <div class="form-group">
                  <b-form-group id="nacin_placanja-group-2" label="Način plaćanja" label-for="nacin_placanja">
                    {{getNacinPlacanja(racun.item.nacinPlacanja)}}
                  </b-form-group>
                  <b-form-group id="nacin_placanja-group-2" label="Broj računa" label-for="nacin_placanja">
                   <b> {{racun.item.brojRacuna}} </b>
                  </b-form-group>
                   <b-form-group id="nacin_placanja-group-2" label="Datum" label-for="nacin_placanja">
                    <b class="text-info"> {{racun.item.datumRacuna}}</b>
                  </b-form-group>
                  <b-form-group id="nacin_placanja-group-2" label="zki" label-for="nacin_placanja">
                    <b class="text-info"> {{racun.item.zki}}</b>
                  </b-form-group>
                  <b-form-group id="nacin_placanja-group-2" label="jir" label-for="nacin_placanja">
                     <b class="text-info">{{racun.item.jir}}</b>
                  </b-form-group>
                            
    
                  <em v-if="stavke.loading">Loading stavke...</em>
                  <span v-if="stavke.error" class="text-danger">ERROR: {{stavke.error}}</span>
                  <ul v-if="stavke.item">
                  <div>
                    <b-table striped hover :items="stavke.item" :fields="fields">
                        <template #cell(artikl)="data">
                          <b class="text-info">{{ data.value.sifra.toUpperCase() }}</b>
                        </template>
                        <template #cell(naziv)="data">
                         {{ data.item.artikl.naziv }}
                        </template>
                        <template #cell(ukupno)="data">
                         {{ data.item.cijena * data.item.kolicina }}
                        </template>
                    </b-table>
                  </div>
                  </ul>

                  <b-form-group id="nacin_placanja-group-2" label="Iznos ukupno" label-for="nacin_placanja">
                   <b class="text-info"> {{racun.item.iznos}} kuna</b>
                  </b-form-group>
                  <b-form-group id="nacin_placanja-group-2" label="Izradio" label-for="nacin_placanja">
                    {{racun.item.user.firstName + ' ' + racun.item.user.lastName  }}
                  </b-form-group>


          
               
                </div>  
            </b-form>
            <div v-if="racun.item.zki === null">          
                            <b-button class="btn btn-success submit_btn invoice-save-bottom" @click="fiskaliziraj" >
                                <i class="far fa-save"></i>
                                Fiskaliziraj
                            </b-button>
            </div>
             <div v-if="racun.item.zki != null && racun.item.jir===null">          
                            <b-button class="btn btn-success submit_btn invoice-save-bottom" @click="naknadnoFiskaliziraj" >
                                <i class="far fa-save"></i>
                               Naknadno Fiskaliziraj
                            </b-button>
            </div>
        </ul>
    </div>


</template>

<script>
export default {
    name: 'RacuniDetails',
    data() {
      return {
        fields: [
          'id',
          { key: 'artikl', label: 'Sifra'  },
          { key: 'naziv', label: 'Naziv'  },
          'cijena',
          'kolicina',
          'ukupno'
          ]
      }
    },
    computed: {
        racun () {
            return this.$store.state.racuni.all;
        },
        stavke()
        {
          return this.$store.state.racuni.stavke;
        }
    },
    created () {
        const id = Number(this.$route.params.id);
        this.$store.dispatch('racuni/getRacunById',{id}); //this.events.find(event => event.id === ID);
        this.$store.dispatch('racuni/stavkerRacuna',{id});
    },
    methods: {
        //editProduct: function()
          fiskaliziraj()
            {
                // Validation
               console.log(this.racun.item.id);
               const { dispatch } = this.$store;

                return this.$store.dispatch('racuni/fiskaliziraj',  this.racun.item.id );

            },
          naknadnoFiskaliziraj()
            {
                // Validation
               console.log(this.racun.item.id);
            },
            getNacinPlacanja(nacinPlacanja)
            {
              if(nacinPlacanja==1) return "Gotovina";
              if(nacinPlacanja==2) return "Ček";
              if(nacinPlacanja==3) return "Kartice";
              if(nacinPlacanja==1) return "Transakcijski račun";
              if(nacinPlacanja==1) return "Ostalo";
            }
    }
};
</script>