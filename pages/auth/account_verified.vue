<template>
    <section class="forgot-password">
        <div class="diu-ap-header">
            <strong>Verify your email address</strong>
        </div>
        <p><strong>A fresh verification link has been sent to your email address.</strong> Before proceeding, please check your email for a verification link. If you did not receive the email</p>

        <form class="mt-3" id="registrationForm" @submit.prevent="requestAnother()">
            <div class="form-group diu-focused">
              <label for="email" class="">E-Mail Address</label>
                <input id="email" type="email" class="form-control" name="email" v-model="email" autofocus>
                <small id="email_help" class="form-text text-danger">&nbsp;</small>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-sm">Send again</button>
                <nuxt-link to="/" class="btn btn-danger btn-sm float-right">Back</nuxt-link>
            </div>
        </form>
    </section>
</template>
<script>
    export default {
        layout: "authLayout",
        data() {
            return {
                token: "",
                email: "",
            }
        },
        mounted() {
            if (this.$route.query.token != undefined) {
                this.verifyToken( this.$route.query.token );
            }
        },
        methods: {
            async verifyToken ( token ) {
                return await this.$axios.get('/student/verify_account/'+token)
                .then((response) => {
                    this.$toast.success(response.data.success, {icon: "error_outline"});
                    this.$router.push('/');
                })
                .catch((error) => {
                    this.$toast.error(error.response.data.error, {icon: "error_outline"});
                    if (error.response.status == 400) {
                        this.$router.push('/');
                    }
                })
            },
            async requestAnother () {
                return await this.$axios.post('/student/verification/resend', {
                    email: this.email,
                })
                .then((response) => {
                    $(".form-text").html("&nbsp;");
                    this.$toast.success(response.data.success, {icon: "error_outline"});
                })
                .catch((error) => {
                    this.$toast.error(error.response.data.error, {icon: "error_outline"});
                    $(".form-text").html("&nbsp;");
                    $.each(error.response.data, function(index, value){
                        $("#" + index + "_help").html(value[0]);
                    });
                    if (error.response.status == 422) {
                        this.$toast.error('Validation Error', {icon: "error_outline"});
                    }
                })
            },
        }
    }
</script>
