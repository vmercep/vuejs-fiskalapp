<template>
    <div>
        <h1>Zdravo {{user.firstName}}!</h1>
    </div>
</template>

<script>
export default {
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