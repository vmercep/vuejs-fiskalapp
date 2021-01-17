<template>
        
        <div>
        <h3>Postavke:</h3>
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
                <label name="product_name">Certificate name:</label>
                <input type="text" class="form-control" v-model="settings.items.certificateName" id="settings_certificatename" disabled > 
                
                <b-button v-b-modal.modal-1 @click="sendInfo()">Details</b-button>

                <b-modal id="modal-1" title="Certificate details" ok-only>
                    <span v-if="certificate.error" class="text-danger">ERROR: {{certificate.error}}</span>
                    <ul v-if="certificate.items">       
                    <p class="my-4">Sn:  {{certificate.items.certSn}}</p>
                    <p class="my-4">Validity:  {{certificate.items.certValidity}}</p>
                    <p class="my-4">DN:  {{certificate.items.certificateDn}}</p>
                    </ul>
                </b-modal>
                </div>
                <div>
            </div>
            <div class="form-group">
                <label name="product_name">Certificate password:</label>
                <input type="text" class="form-control" v-model="settings.items.certificatePassword" id="settings_certificatepassword" required >
            </div>
            <label>Certificate File: 
                <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
             </label>
            <div class="form-group">
                <button class="btn btn-primary" @click="save">Save</button>
            </div>
            
       <!-- </form>                -->


        </ul>



    </div>


</template>


<script>
export default {
    name: 'SettingsCertificate',
    data () {
        return {
            settingsData:{},
            isEditing: false,
            file: '',
            certificate: '',
        }
    },
    computed: {
        settings () {
            return this.$store.state.settingsMethod.settings;
        }

    },
    created () {
        this.$store.dispatch('settingsMethod/getAll'); 
        this.$store.dispatch('settingsMethod/getCertificate' );
    },
    methods: {
        save()
            {
                // Validation
                var id = (this.settings.items.id);
                const { dispatch } = this.$store;
                this.isEditing= true;
                var password=(this.settings.items.certificatePassword);

                let formData = new FormData();

            /*
                Add the form data we need to submit
            */
                formData.append('file', this.file);
                this.$store.dispatch('settingsMethod/uploadCertificate', formData);
                return this.$store.dispatch('settingsMethod/updateCertificatePassword',  password );

            },
            /*
        Handles a change on the file upload
      */
      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      },
      sendInfo()
      {     
          this.certificate=this.$store.state.settingsMethod.certificate;
      }

        
    }
};
</script>