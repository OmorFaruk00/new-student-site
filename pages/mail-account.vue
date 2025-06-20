<template>
  <section>
    <div class="form-horizontal col-lg-6 mx-auto">
      <div class="card-header py-3">
      
        {{
            has_mail_account
              ? "Already created account.Login outlook and get awesome services"
              : "Create Email Account"
        }}
      </div>

      <div class="card-body mt-3  px-3">
        <p style="color: red; text-align: center; font-size: 15px">
          You can check your email from:

          <a href="https://outlook.office.com/" target="_blank" style="color: blue">
            https://outlook.office.com/</a>
        </p>
   
        <form id="changeMailAccountForm" method="" action="JavaScript:void(0);">
          <div class="mt-4">
            <div class="form-group focused">
              <div class="input-group">
                <input type="text" :readonly="has_mail_account" class="form-control" id="username" name="username"
                  placeholder="Your mail username" aria-describedby="username-addon" v-model="account.username" />
                <div class="input-group-append">
                  <span class="input-group-text" id="username-addon">@students.diu.ac</span>
                </div>
                <label for="username">Your email username
                  <small class="d-none d-lg-inline">(
                    <em>You can {{ has_mail_account ? "not" : "" }} change your
                      email username</em>
                    )</small>
                  </label>
              </div>
              <p>
                <small id="username_help" class="form-text text-danger">&nbsp;</small>
              </p>
            </div>
          </div>

          <div class=" " v-if="!has_mail_account">
            <div class="form-group focused e_password">
              <input :type="showPassword?'text':'password'" class="form-control" id="password" name="password" v-model="account.password" />
              <label for="password">Password</label>
              <small id="password_help" class="form-text text-danger">&nbsp;</small>

              <div class="p_eye" @click="showPassword = !showPassword">
                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  stroke-width="2" v-else>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div class="" v-if="!has_mail_account">
            <div class="form-group focused e_password">
              <input :type="showCPassword?'text':'password'" class="form-control" id="confirmed_password" name="confirmed_password"
                v-model="account.confirmed_password" />
              <label for="confirmed_password">Confirm Password</label>
              <small id="confirmed_password_help" class="form-text text-danger">&nbsp;</small>
                <div class="p_eye" @click="showCPassword = !showCPassword">
                <svg v-if="showCPassword" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  stroke-width="2" v-else>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div class=" pb-5">
            <button style="margin-left: 0" type="button" class="btn btn-primary btn-sm" @click="createMailAccount()"
              v-if="has_mail_account == false">
              Create Account
            </button>
     
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  // middleware: "feedbackAuthenticated",
  data() {
    return {
      profile: [],
      account: {
        username: "",
        password: "",
        confirmed_password: "",
      },
      has_mail_account: false,
      showPassword: false,
      showCPassword: false,
    };
  },

  methods: {
    async getAuthUserProfile() {
      var token = window.$nuxt.$cookies.get("token");

      await this.$axios
        .get(`/student/microsoft-student-account-create?token=${token}`)
        .then(async (response) => {
          if (response.data.token) {
            let fetchData = await this.fetchData();

            if (fetchData.diu_email == null) {
              var username = fetchData.email.split("@");
            } else {
              var username = fetchData.diu_email.split("@");
            }

            this.profile = fetchData;
            this.account.username = username[0];

            if (fetchData.diu_email != null) {
              let emailExitCheck = await this.emailExitCheck(
                response.data.token,
                username[0]
              );

              if (emailExitCheck) {
                this.has_mail_account = true;
              }
            }
          }
        })
        .catch((error) => { });
    },

    async fetchData() {
      var token = window.$nuxt.$cookies.get("token");

      let data = await this.$axios.get("/student/profile?token=" + token);

      return data.data;
    },

    async createMailAccount() {
      var token = window.$nuxt.$cookies.get("token");

      if (!this.account.username) {
        this.$toast.error("Please enter username", { icon: "error_outline" });
        return false;
      }

      if (!this.account.password) {
        this.$toast.error("Please enter password", { icon: "error_outline" });
        return false;
      }

      if (!this.account.confirmed_password) {
        this.$toast.error("Please enter confirmed password", {
          icon: "error_outline",
        });
        return false;
      }

      if (this.account.password != this.account.confirmed_password) {
        this.$toast.error("Password and confirmed password doesn't match", {
          icon: "error_outline",
        });
        return false;
      }

      await this.$axios
        .get(`/student/microsoft-student-account-create?token=${token}`)
        .then(async (response) => {
          if (response.data.token) {
            let emailAccount = await this.createAccount(response.data.token);
            // await this.licenseAssign(response.data.token, emailAccount.userPrincipalName)
            await this.studentInfoUpdate(emailAccount.userPrincipalName);
          }

          this.getAuthUserProfile();

          this.$toast.success("Email Created Successfully.");
        })
        .catch((error) => {
          if (error.response.status == 400) {
            this.$toast.error(
              "Another object with the same value for property username already exists.",
              { icon: "error_outline" }
            );
            return false;
          }

          console.log(error.response, "first");
        });
    },

    async createAccount(authToken) {
      let user = {
        accountEnabled: true,
        displayName: this.profile.reg_code,
        mailNickname: `${this.account.username}`,
        userPrincipalName: `${this.account.username}@students.diu.ac`,
        passwordProfile: {
          forceChangePasswordNextSignIn: false,
          password: `${this.account.password}`,
        },
      };

      let token = authToken;

      let data = await this.$axios.post(
        "https://graph.microsoft.com/v1.0/users",
        user,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data.data;
    },

    async licenseAssign(authToken, email) {
      const user = {
        addLicenses: [
          {
            disabledPlans: [],
            skuId: "314c4481-f395-4525-be8b-2ec4bb1e9d91",
          },
        ],
        removeLicenses: [],
      };

      let data = await this.$axios.post(
        `https://graph.microsoft.com/v1.0/users/${email}/assignLicense`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      return data.data;
    },

    async studentInfoUpdate(email) {
      var token = window.$nuxt.$cookies.get("token");

      return await this.$axios
        .post("/student/student-account-update?token=" + token, {
          diu_email: email,
          diu_email_pass: this.account.password,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => { });
    },

    async emailExitCheck(authToken, email) {
      let data = await this.$axios.get(
        `https://graph.microsoft.com/v1.0/users/${email}@students.diu.ac`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      return data.data;
    },
  },

  created() {
     this.getAuthUserProfile();
  },
};
</script>
<style scoped>
.p_eye {
  position: absolute;
  top: 38%;
  right: 15px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #999;
  width: 30px;
  height: 30px;
  margin-bottom: -50px;
}

.form-group {
  position: relative;
}

.p_eye svg {
  width: 24px;
  height: 24px;
  stroke: #666;
}
</style>

