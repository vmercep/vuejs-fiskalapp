<template>
        
        <div>
        <h3>Korisnik:</h3>
         <br>
            
            <b-button v-b-modal.modal-prevent-closing>Promjeni lozinku</b-button>

        <br> <br>
        <em v-if="usersingle.loading">Loading users...</em>
        <span v-if="usersingle.error" class="text-danger">ERROR: {{usersingle.error}}</span>
        <ul v-if="usersingle.user">  

            <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Promjena lozinke"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Nova lozinka"
          label-for="password-input"
          invalid-feedback="polje je obavezno"
          :state="passwordState">
          <b-form-input
            id="password-input"
            v-model="password"
            :state="passwordState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal> 


            <!--<form v-on:submit.prevent="editProduct">-->
            <div class="form-group">
                <label name="product_id">ID</label>
                <input type="text" class="form-control" v-model="usersingle.user.id" id="user_id" disabled >
            </div>

            <div class="form-group">
                <label name="product_name">Ime</label>
                <input type="text" class="form-control" v-model="usersingle.user.firstName" id="user_firstname" required >
            </div>
             <div class="form-group">
                <label name="product_name">Prezime</label>
                <input type="text" class="form-control" v-model="usersingle.user.lastName" id="user_lastName" required >
            </div>
            <div class="form-group">
                <label name="product_name">Oib</label>
                <input type="text" class="form-control" v-model="usersingle.user.oib" id="user_oib" required >
            </div>
            <div class="form-group">
                <button class="btn btn-primary" @click="save">Save</button>
            </div>
            
        <!--</form>                -->
        

        </ul>



    </div>


</template>

<script>
export default {
    name: 'KorisnikEdit',
    data () {
        return {
            user:{},
            isEditing: false,
            password: '',
            passwordState: null
        }
    },
    computed: {
        usersingle () {
            return this.$store.state.user.all;
        }

    },
    created () {
        const id = Number(this.$route.params.id);
        this.$store.dispatch('user/getAllById',{id}); 
        

    },
    methods: {
        //editProduct: function()
        save()
            {
                // Validation
                var id = (this.usersingle.user.id);
                this.submitted = true;
                const { dispatch } = this.$store;
                this.$store.dispatch('user/updateUser',  this.usersingle.user );
            },
        savePassword(password)
            {
                // Validation
                var id = (this.usersingle.user.id);
                this.submitted = true;
                const { dispatch } = this.$store;
                this.usersingle.user.password=password
                this.$store.dispatch('user/changePassword',  this.usersingle.user );
            },
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.passwordState = valid
            return valid
            },
        resetModal() {
                this.password = ''
                this.passwordState = null
            },
        handleOk(bvModalEvt) {
                // Prevent modal from closing
                bvModalEvt.preventDefault()
                // Trigger submit handler
                this.handleSubmit()
            },
        handleSubmit() {
        // Exit when the form isn't valid
                if (!this.checkFormValidity()) {
                return
                }
                // Push the name to submitted names
                this.savePassword(this.password);
                // Hide the modal manually
                this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-closing')
                })
      }
        
    }
};
</script>