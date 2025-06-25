<template>
  <section class="forgot-password">
    <div class="diu-ap-header">
      <strong>Reset Your Password</strong>
    </div>
    <form id="passwordResetForm" @submit.prevent="passwordReset()">
      <div class="form-group diu-focused e_password">
        <input
          id="password"
          :type="showPassword ? 'text' : 'password'"
          class="form-control"
          name="password"
          v-model="change.password"
        />
        <label for="password" class="">Password</label>
        <small id="password_help" class="form-text text-danger">&nbsp;</small>
        <div id="password_check"></div>
        <div class="p_eye" @click="showPassword = !showPassword">
          <svg
            v-if="showPassword"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            v-else
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </div>
      </div>
      <div class="form-group diu-focused e_password">
        <input
          id="password_confirmation"
          :type="showCPassword ? 'text' : 'password'"
          class="form-control"
          name="password_confirmation"
          v-model="change.password_confirmation"
        />
        <label for="password_confirmation" class="">Confirm Password</label>
        <small id="password_confirmation_help" class="form-text text-danger"
          >&nbsp;</small
        >
        <div class="p_eye" @click="showCPassword = !showCPassword">
          <svg
            v-if="showCPassword"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            v-else
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </div>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary btn-sm">
          Change Password
        </button>
        <nuxt-link to="/" class="btn btn-danger btn-sm float-right"
          >Back</nuxt-link
        >
      </div>
    </form>
  </section>
</template>
<script>
export default {
  layout: "authLayout",
  data() {
    return {
      change: {
        password: "",
        password_confirmation: ""
      },
      token: "",
      showPassword: false,
      showCPassword: false
    };
  },
  mounted() {
    //this.token = "d";
    this.verifyToken(this.$route.query.token);
  },
  methods: {
    async verifyToken(token) {
      return await this.$axios
        .get("/student/verify_token/" + token)
        .then(response => {
          this.token = response.data.token;
        })
        .catch(error => {
          this.$toast.error(error.response.data.error, {
            icon: "error_outline"
          });
          this.$router.push("/auth/forgot_password");
        });
    },
    async passwordReset() {
      return await this.$axios
        .put("/student/reset_password/" + this.token, this.change)
        .then(response => {
          $(".form-text").html("&nbsp;");
          this.$toast.success(response.data.success, { icon: "error_outline" });
          this.$router.push("/");
        })
        .catch(error => {
          this.$toast.error(error.response.data.error, {
            icon: "error_outline"
          });
          $(".form-text").html("&nbsp;");
          $.each(error.response.data, function(index, value) {
            $("#" + index + "_help").html(value[0]);
          });
          if (error.response.status == 422) {
            this.$toast.error("Validation Error", { icon: "error_outline" });
          }
        });
    }
  }
};
</script>
