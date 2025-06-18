<template>
  <section>
    <div class="auth-info text-center">
     <h4>   Registration</h4>
    <p>  Hello ! {{ student_name }}. Please put the following information bellow:</p>
   </div>
    <div class="login-box">
      <form class="auth_from" id="registrationForm" @submit.prevent="registrationStudents()">



      <div class="form-group">
          <input type="email" class="form-control" required v-model="reg.email" placeholder="Email Address"/>
          <small id="email_help" class="text-danger"></small>
        </div>
        <div class="form-group">
          <input type="email" class="form-control" required v-model="reg.confirmed_office_email" placeholder="Confirm Email Address"/>
          <small id="confirmed_office_email_help" class="text-danger"></small>
        </div>
        <div class="form-group">
          <input id="password" type="password" class="form-control" v-model="reg.password" placeholder="Password"/>
          <i :class="showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'" class="toggle-password" @click="togglePassword"></i>
          <small id="password_help" class="form-text text-danger"></small>
        </div>
        <div class="form-group">
          <input id="confirmPassword" type="password" class="form-control" v-model="reg.password_confirmation" placeholder="Confirm Password"/>
          <i :class="showCPassword ? 'fa fa-eye' : 'fa fa-eye-slash'" class="toggle-password" @click="toggleCofirmPassword"></i>
          <small id="password_confirmation_help" class="text-danger"></small>
        </div>


        <button type="submit" class="btn-sign mt-3">Register</button>
      </form>
       <div class="text-center pt-2">
          <p class="text-muted">Already have an account? <nuxt-link to="/" class="signup">Sign In</nuxt-link> </p>
        </div>
    </div>

  </section>
</template>


<script>
export default {
  layout: "authLayout",
  data() {
    return {
      student_name: "",
      reg: {
        student_id: "",
        email: "",
        confirmed_office_email: "",
        password: "",
        password_confirmation: "",

      },

        showPassword: false,
        showCPassword: false,
    };
  },
  mounted() {
    this.student_name = window.$nuxt.$cookies.get("student_name");
    this.reg.student_id = window.$nuxt.$cookies.get("student_id");
  },
  methods: {
    async registrationStudents() {
      return await this.$axios
        .post("/student/registration", this.reg)
        .then(response => {
          $(".form-text").html("&nbsp;");
          this.$toast.success("Registration successfull", {
            icon: "error_outline"
          });
          this.$router.push("/auth/account_vefified");
        })
        .catch(error => {
          this.$toast.error(error.response.data.error, {
            icon: "error_outline"
          });
          $(".form-text").html("&nbsp;");
          $.each(error.response.data, function (index, value) {
            $("#" + index + "_help").html(value[0]);
          });
          if (error.response.status == 422) {
            this.$toast.error("Validation Error", { icon: "error_outline" });
          }
        });
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
      const passwordInput = document.getElementById("password");
      passwordInput.type = this.showPassword ? "text" : "password";
    },
    toggleCofirmPassword() {
      this.showCPassword = !this.showCPassword;
      const passwordInput = document.getElementById("confirmPassword");
      passwordInput.type = this.showCPassword ? "text" : "password";
    },
  }
};
</script>
