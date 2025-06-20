<template>
    <section>

        <div class="login-box">
            <form @submit.prevent="submitLoginForm()" autocomplete="off">
                <div class="form-icon"><i class="fa fa-user"></i></div>
                <div class="input">
                    <input id="email" type="email" class="validate" v-model="email">
                    <label for="email"> Email</label>
                </div>
                <div class="input">
                    <input id="password" type="password" class="validate" v-model="password">
                    <label for="password">Password</label>
                    <i :class="isVisible ? 'fa fa-eye' : 'fa fa-eye'" @click="togglePassword"></i>

                </div>
                <span class="checkbox remember">
                    <input type="checkbox" id="remember" />
                    <label for="remember">Remember me</label>
                </span>
                <span class="checkbox forgot">
                    <a href="#">Forgot Password?</a>
                </span>



                <button class="btn-sign">Login</button>
            </form>

        </div>
        <div class="check-login">
            <nuxt-link to="/auth/check_account" class="check-title">Don't have an account? <b class="sign-up">Sign Up</b></nuxt-link>
        </div>


    </section>
</template>



<script>
export default {
    layout: "authLayout",
    data() {
        return {
            isVisible: false,
            email: "omorfaruk5020@gmail.com",
            password: "Diu@12345",
            
        };
    },

    methods: {
        async submitLoginForm() {
      return await this.$axios
        .post("/student/login", {
          email: this.email,
          password: this.password
        })
        .then(response => {
          $(".form-text").html("&nbsp;");

          window.$nuxt.$cookies.remove("token");
          window.$nuxt.$cookies.remove("user");
          window.$nuxt.$cookies.remove("currentExamSchedule");

          window.$nuxt.$cookies.set("token", response.data.token, {
            path: "/",
            maxAge: 1800
          });

          window.$nuxt.$cookies.set("user", response.data.user, {
            path: "/",
            maxAge: 1800
          });
          window.location.href = "/profile";
        })
        .catch(error => {
          this.$toast.error(error.response.data.error);
          $(".form-text").html("&nbsp;");
          $.each(error.response.data, function(index, value) {
            $("#" + index + "_help").html(value[0]);
          });
          if (error.response.status == 404) {
            this.$router.push("auth/account_verified");
          }
          if (error.response.status == 422) {
            this.$toast.error("Validation Error");
          }
        });
    },
        togglePassword() {
            this.isVisible = !this.isVisible;
            const passwordInput = document.getElementById("password");
            passwordInput.type = this.isVisible ? "text" : "password";
        }
    },
  

};
</script>