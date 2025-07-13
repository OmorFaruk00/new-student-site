<template>
  <section>
   <div class="auth-info text-center">
     <h4>Student Login</h4>
    <p>Hey enter your details to sign in to your account</p>
   </div>
    <div class="login-box">
      <form @submit.prevent="submitLoginForm()" autocomplete="off">
        <div class="form-group">
          <input type="email" class="form-control" required v-model="email"  placeholder="Email Address"/>
        </div>
        <div class="form-group">
          <input id="password" type="password" class="form-control" v-model="password"  placeholder="Password"/>
          <i :class="isVisible ? 'fa fa-eye' : 'fa fa-eye-slash'"    class="toggle-password" @click="togglePassword"></i>
        </div>
    <div>
 <div class="float-start" id="remember"  style="margin-top: -10px;">
   <input id="checkbox-2" class="checkbox-custom" name="checkbox-2" type="checkbox">
  <label for="checkbox-2" class="checkbox-custom-label text-muted">Remember me
</label>
 </div>
</div>


        <button class="btn-sign">Log in</button>
      </form>
       <div class="text-center pt-2">
        <a href="/auth/forgot_password" class="forget_password">Forgot Password?</a>
       </div>
       <hr>
        <div class="text-center">
          <p class="text-muted">Don't have an account? <nuxt-link to="/auth/check_account" class="signup">Sign Up</nuxt-link> </p>
        </div>

    </div>

  </section>
</template>



<script>
export default {
  layout: "authLayout",
  data() {
    return {
      isVisible: false,
      email: "",
      password: "",
    };
  },

  methods: {
    async submitLoginForm() {
      return await this.$axios
        .post("/student/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          $(".form-text").html("&nbsp;");

          window.$nuxt.$cookies.remove("token");
          window.$nuxt.$cookies.remove("user");
          window.$nuxt.$cookies.remove("currentExamSchedule");

          window.$nuxt.$cookies.set("token", response.data.token, {
            path: "/",
            maxAge: 1800,
          });

          window.$nuxt.$cookies.set("user", response.data.user, {
            path: "/",
            maxAge: 1800,
          });
          window.location.href = "/dashboard";
        })
        .catch((error) => {
          this.$toast.error(error.response.data.error, {
            icon: "error_outline",
          });
          $(".form-text").html("&nbsp;");
          $.each(error.response.data, function (index, value) {
            $("#" + index + "_help").html(value[0]);
          });
          if (error.response.status == 404) {
            this.$router.push("auth/account_verified");
          }
          if (error.response.status == 422) {
            this.$toast.error("Validation Error", { icon: "error_outline" });
          }
        });
    },

    togglePassword() {
      this.isVisible = !this.isVisible;
      const passwordInput = document.getElementById("password");
      passwordInput.type = this.isVisible ? "text" : "password";
    },
  },
};
</script>
