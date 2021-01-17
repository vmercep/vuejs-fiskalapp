<template>

    <div class="jumbotron">
       
                <div class="col-sm-11 offset-sm-1">
                    <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
                    <Nav />
                    <router-view/>
                </div>

    </div>
  
</template>

<script>
import Nav from '../components/Nav';

export default {
    name: 'app',
    computed: {
        alert () {
            return this.$store.state.alert
        }
    },
    watch:{
        $route (to, from){
            // clear alert on location change
            this.$store.dispatch('alert/clear');
        }
    },
    components: {
    Nav
  }   
};



</script>

<style>
  @import '//netdna.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css';
</style>