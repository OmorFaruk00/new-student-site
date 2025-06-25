<template>
  <section>
   <div class="auth-info text-center">
     <h4>Forgot Your Password</h4>
    <p>Hey Enter your email to recover your password.</p>
   </div>
    <div class="login-box py-5" style="height: 300px;">
      <form @submit.prevent="passwordForgot()" autocomplete="off" class="pt-4">
        <div class="form-group">
          <input type="email" class="form-control" required v-model="email"  placeholder="Email Address"  />
        </div>




        <button class="btn-sign">Send</button>
      </form>

       <hr>
        <div class="text-center">
          <p class="text-muted">Already have an account? <nuxt-link to="/" class="signup">Sign In</nuxt-link> </p>
        </div>

    </div>

  </section>
</template>
<script>
    export default {
        layout: 'authLayout',
        data() {
            return {
                email: "",
            }
        },
        methods: {
            async passwordForgot () {
                return await this.$axios.post('/student/forgot_password', {
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
