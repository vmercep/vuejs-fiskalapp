<style>
        body{
            /* font-family: 'Ubuntu', sans-serif; */
            font-family: 'Raleway', sans-serif;
            font-size: 16px;
            font-weight: 300;
        }
        .main-title{
            font-weight: 500;
        }
        .trashIconContainer {
            vertical-align: middle !important;
            padding-top: 10px;
            text-align: center;
        }

        .trashIconContainer i {
            color: #e74c3c !important;
        }

        .btn-success, .panel-success {
            background-color: #27c24c !important;
            border-color: #27c24c !important;
            color: #fff !important;
        }
        .submit_btn {
            min-width: 150px;
            max-width: 250px;
            font-size: 1.2rem;
            height: 60px;
            margin-top: 20px;
            padding: 20px;
        }
        .submit_btn i{
            padding-right:10px;
        }

        @media (min-width: 768px) {
            .invoice-save-bottom {
                min-width: 400px;
            }
            .right-ads{
                float:left;
            }
            .left-ads{
                float:right;
            }
        }
    </style>

<template>
    <div>
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
       <b-form @submit.stop.prevent="handleSubmit(saveInvoice)">


                <div class="form-group">
                <validation-provider name="Nacin placanja" :rules="{ required: true }" v-slot="validationContext">
                <b-form-group id="nacin_placanja-group-2" label="Način plaćanja" label-for="nacin_placanja">
                    <b-form-select 
                            id="nacin_placanja_select"
                            name="nacin_placanja_select"
                            v-model="nacin_placanja" 
                            :options="nacinPlacanja.nacinPlacanja.nacinPlacanja" 
                            :state="getValidationState(validationContext)"
                            aria-describedby="nacin_placanja-feedback"
                            />  
                <b-form-invalid-feedback id="nacin_placanja-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
                            
      
                </validation-provider>



                <label name="broj_racuna">Broj računa</label>
                     <input class="form-control" type="text"  v-model="brojRacuna.all.item" id="broj_racuna" disabled />  
                <label name="datum_racuna">Datum računa</label>
                     <input class="form-control" type="text"  v-model="timestamp" id="datum_racuna" disabled />
                     <input class="form-control" type="text" v-model="user.id" hidden  />
                </div>
          
               
                    <div class="row">
                        <div class="col-md-12">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Šifra</th>
                                            <th scope="col">Naziv</th>
                                            <th scope="col text-right">Cijena</th>
                                            <th scope="col text-right">Količina</th>
                                            <th scope="col text-right">Ukupno</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(invoice_product, k) in invoice_products" :key="k">
                                            <td scope="row" class="trashIconContainer">
                                               <i class="far fa-trash-alt" @click="deleteRow(k, invoice_product)">Briši</i>
                                            </td>
                                                <input class="form-control" type="number" v-model="invoice_product.artiklId" hidden />

                                            <td>   
                                                <vue-bootstrap-typeahead type="text" :data="product_id" v-model="invoice_product.product_no" @input="lookupProduct" :serializer="item => item.sifra" @hit="$event=>onChangeSifra(invoice_product)" required />
                                            </td>
                                            <td>
                                                <input class="form-control" type="text" v-model="invoice_product.product_name" />
                                            </td>
                                            <td>
                                                <input readonly class="form-control text-right" type="number" v-model="invoice_product.cijena" @change="calculateLineTotal(invoice_product)"
                                                />
                                            </td>
                                            <td>
                                                <input class="form-control text-right" type="number" v-model="invoice_product.kolicina" @change="calculateLineTotal(invoice_product)"
                                                />
                                            </td>
                                            <td>
                                                <input readonly class="form-control text-right" type="number" min="0" step=".01" v-model="invoice_product.line_total" />
                                            </td>
                                        </tr>
                                        <tr v-show="invoice_products.length === 0">
                                            <td colspan="6">
                                                <p class="text-center alert-danger p-2">
                                                    Nema produkata
                                                </p>
                                            </td>
                                        </tr>

                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colspan="5" class="text-right">Bez poreza</td>
                                            <td class="text-right">{{invoice_subtotal}}</td>
                                        </tr>
                                        <tr>
                                            <td colspan="5" class="text-right">Tax</td>
                                            <td class="text-right">{{invoice_tax}}%</td>
                                        </tr>
                                        <tr>
                                            <td colspan="5" class="text-right">Ukupno</td>
                                            <td class="text-right">{{invoice_total}}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <div class="col-md-12 mb-2">
                            <button type='button' class="btn btn-info" @click="addNewRow">
                                <i class="fas fa-plus-circle"></i>
                                Dodaj artikal
                            </button>
                        </div>
                        <div class="col-md-12 mb-4 text-center">
                            <b-button type='submit' class="btn btn-success submit_btn invoice-save-bottom" >
                                <i class="far fa-save"></i>
                                Spremi račun
                            </b-button>
                        </div>
                    </div>
                </b-form>

</validation-observer>
    </div>
    
</template>



<script>
import {debounce} from 'lodash';
import moment from 'moment';
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from 'vee-validate/dist/rules';
 /*
// Add the required rule
extend('required', {
  ...required,
  message: 'This field is required'
});
*/

export default {
    name: 'RacuniAdd',
    components: {
    ValidationProvider,
    ValidationObserver
  },
    data() {
      return {
        timestamp: moment().format('DD/MM/YYYY hh:mm'),
        nacin_placanja:'',
        invoice_subtotal: 0,
        invoice_total: 0,
        invoice_tax: 0,
        invoice_products: [{
            artiklId: 0,
            product_no: '',
            product_name: '',
            cijena: '',
            kolicina: '',
            line_total: 0
        }],
        product_id: [ ]
      }
    },
    computed: {
        nacinPlacanja () {
            return this.$store.state.sifarnik;          
        },
        brojRacuna()
        {
            return this.$store.state.racuni;     
        },
        user () {
            return this.$store.state.authentication.user;
        }


    },
    created () {
        this.$store.dispatch('sifarnik/getNacinPlacanja');  
        this.$store.dispatch('racuni/getBrojRacuna');  
        

    },
    methods: { 
        getValidationState({ dirty, validated, valid = null }) {
                return dirty || validated ? valid : null;
        },
        onChangeSifra(invoice_product) {
            console.log( invoice_product)
            console.log(JSON.stringify(this.product_id));
            var valObj =this.product_id.filter(function(el){
                if(el.sifra == invoice_product.product_no) return el;
            });
            invoice_product.product_name=valObj[0].naziv;
            invoice_product.cijena=valObj[0].cijena;
            invoice_product.artiklId=valObj[0].id;
            
        },
        saveInvoice() {
            let removeObsoletesArray = [];

            this.invoice_products.forEach( element => {
            if(element.artiklId != 0){
                removeObsoletesArray.push(element)
            }
            })

            if(removeObsoletesArray.length==0)
            {
                console.log("Fali bar jedna stavka računa");
                //this.errors.push('Fali bar jedna stavka računa');
                return;
            }
            //console.log(JSON.stringify(removeObsoletesArray));
            const data = JSON.stringify({
            brojRacuna:this.brojRacuna.all.item,    
            datumRacuna: moment().format('YYYY-MM-DDThh:mm'),
            nacinPlacanja: this.nacin_placanja,
            userId: this.user.id,
            stavkeRacuna:removeObsoletesArray.map(item=>{
                                     item.kolicina=Number(item.kolicina)
                                          return item;
                                      }) 
            })
            console.log(data);
            this.$store.dispatch('racuni/insertNewBill',data);


            
        },
        calculateTotal() {
            var subtotal, total;
            subtotal = this.invoice_products.reduce(function (sum, product) {
                var lineTotal = parseFloat(product.line_total);
                if (!isNaN(lineTotal)) {
                    return sum + lineTotal;
                }
            }, 0);

            this.invoice_subtotal = subtotal.toFixed(2);

            total = (subtotal * (this.invoice_tax / 100)) + subtotal;
            total = parseFloat(total);
            if (!isNaN(total)) {
                this.invoice_total = total.toFixed(2);
            } else {
                this.invoice_total = '0.00'
            }
        },
        calculateLineTotal(invoice_product) {
            var total = parseFloat(invoice_product.cijena) * parseFloat(invoice_product.kolicina);
            if (!isNaN(total)) {
                invoice_product.line_total = total.toFixed(2);
            }
            this.calculateTotal();
        },
        deleteRow(index, invoice_product) {
            var idx = this.invoice_products.indexOf(invoice_product);
            console.log(idx, index);
            if (idx > -1) {
                this.invoice_products.splice(idx, 1);
            }
            this.calculateTotal();
        },
        addNewRow() {
            this.invoice_products.push({
                artiklId: 0,
                product_no: '',
                product_name: '',
                cijena: '',
                kolicina: '',
                line_total: 0
            });
        },

        
        lookupProduct: debounce(function(invoice_product){
                        this.$store.dispatch('artikli/getBySifraArtikala',invoice_product)
                        .then(data => {
                        this.product_id = data;
                        if(data.length==1)
                            {
                                console.log(JSON.stringify(data));

                            }
                        })
                    }, 500)

    }
    
    
    
};
</script>