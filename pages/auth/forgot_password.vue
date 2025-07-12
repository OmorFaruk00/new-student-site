<template>
  <section>
    <div class="auth-info text-center mb-4" v-if="ispasswordReset">
      <h4>Forgot Password</h4>
      <p >Enter your email address below and we'll send you a link to reset your password.</p>
    </div>
      <div class="auth-info text-center mb-4" v-if="isEmailReset">
      <h4>Forgot Email</h4>
      <p >Enter your registration code to retrieve your registered email address.</p>
    </div>

    <div class="login-box mx-auto  shadow rounded bg-white">
      <!-- Tabs -->
      <ul class="nav nav-tabs mb-5" role="tablist">
        <li class="nav-item">
          <a class="nav-link me-3" :class="{ active: ispasswordReset }" @click="passwordResetform" role="tab">Forgot
            Password</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="{ active: isEmailReset }" @click="emailResetForm" role="tab" >Forgot Email</a>
        </li>
      </ul>

      <!-- Tab content -->
      <div class="tab-content">
        <!-- Forgot Password -->
        <div v-if="ispasswordReset">
          <form @submit.prevent="passwordForgot">
            <div class="mb-3">
              <input type="email" class="form-control" v-model="email" placeholder="Enter your email" required />
            </div>
            <button class="btn-sign w-100">Send</button>
          </form>
        </div>

        <!-- Forgot Email -->
        <div v-if="isEmailReset">
          <form @submit.prevent="emailReset">
            <div class="mb-3">
              <input type="text" class="form-control" v-model="reg_code" placeholder="Enter your registration no"
                required />
            </div>
            <div class="alert alert-success" v-if="email_address">
              Your Email Address is {{ email_address }}
            </div>
            <button class="btn-sign w-100">Find My Email</button>
          </form>
        </div>
      </div>

      <hr />

      <!-- Sign in link -->
      <div class="text-center pt-2">
        <p class="text-muted">
          Already have an account?
          <NuxtLink to="/" class="signup text-success fw-bold">Sign In</NuxtLink>
        </p>
      </div>
    </div>
  </section>
</template>


<script>
export default {
  layout: "authLayout",
  data() {
    return {
      email: "",
      reg_code: "",
      email_address: "",
      ispasswordReset: true,
      isEmailReset: false,
    };
  },
  methods: {
    passwordResetform() {
      this.ispasswordReset = true;
      this.isEmailReset = false;
    },
    emailResetForm() {
      this.ispasswordReset = false;
      this.isEmailReset = true;
    },
    async passwordForgot() {
      try {
        const response = await this.$axios.post("/student/forgot_password", {
          email: this.email,
        });
        this.$toast.success(response.data.success);
      } catch (error) {
        if (error.response?.status === 422) {
          this.$toast.error("Validation Error");
        } else {
          this.$toast.error(error.response?.data?.error || "Something went wrong");
        }
      }
    },
    async emailReset() {
      return await this.$axios.post('/student/email_reset', {
        reg_code: this.reg_code,
      })
        .then((response) => {
          this.email_address = response.data.email;
        })
        .catch((error) => {
          this.email_address = "";
          this.$toast.error(error.response.data.error, { icon: "error_outline" });
          $(".form-text").html("&nbsp;");
          $.each(error.response.data, function (index, value) {
            $("#" + index + "_help").html(value[0]);
          });
          if (error.response.status == 422) {
            this.$toast.error('Validation Error', { icon: "error_outline" });
          }
        })
    },
  },
};
</script>

<style scoped>
.tab-content {
  border: none !important;
  margin-top: -30px;
  padding: 0px !important;
}

.nav-tabs {
  border-bottom: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  font-size: 14px !important;
  /* padding-left: 20px; */

}

.nav-tabs .nav-link {
  border: none;
  border-bottom: 2px solid transparent;
  color: #666;
  font-weight: 500;
  background-color: transparent;
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 5px 0px;
  /* margin:0px 5px; */
}

.nav-tabs .nav-link.active {
  color: #18ac4f;
  border-bottom: 2px solid #18ac4f;
}

/* @media (max-width: 576px) {
  .nav-tabs .nav-link {
    font-size: 14px;
    padding: 0.4rem 0.6rem;
  }

  .login-box {
    padding: 1rem !important;
  }
} */
</style>
