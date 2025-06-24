<template>
    <div class="form-horizontal col-lg-8 col-md-8 col-sm-12 ">
      <div class="form-header">
                  Change Password
          </div>

    <form class="p-3" @submit.prevent="changePasswordForm()">
      <div class="form-group" style="margin-bottom: 20px !important;">
        <label>Current Password <span class="text-danger">*</span></label>
        <!-- <i class="fa fa-lock text-primary"></i> -->
        <input required="" name="login[password]" type="password" class="form-control" placeholder="Enter Current Password"  v-model="current_password">
      </div>
      <div class="form-group" style="margin-bottom: 20px !important;">
        <label>New Password <span class="text-danger">*</span></label>
        <input required="" name="login[password]" type="password" class="form-control" placeholder="Enter New Password" v-model="password">
      </div>
      <div class="form-group" style="margin-bottom: 20px !important;">
        <label>Confirmed Password <span class="text-danger">*</span></label>
        <input required="" name="login[password]" type="password" class="form-control" placeholder="Enter Confirmed  Password" v-model="password_confirmation">
      </div>
      <div class="d-flex justify-content-end">
  <button type="submit" class="btn btn-primary">Submit</button>
</div>
    </form>
    </div>

  </template>
  <script>
  export default {
    data() {
      return {
        current_password: "",
        password: "",
        password_confirmation: "",
        showCurrentPassword: false,
        showPassword: false,
        showCPassword: false,
      }
    },
    methods: {
      async changePasswordForm() {
        var token = window.$nuxt.$cookies.get('token');
        return await this.$axios.post('/student/change_password?token=' + token, {
          current_password: this.current_password,
          password: this.password,
          password_confirmation: this.password_confirmation,
        })
          .then((response) => {
            $(".form-text").html("&nbsp;");
            this.$toast.success('Password Changed Successfully');
            this.logout();
          })
          .catch((error) => {
            this.$toast.error('Password Changed Failed');
            $(".form-text").html("&nbsp;");
            $.each(error.response.data, function (index, value) {
              $("#" + index + "_help").html(value[0]);
            });
          })
      },
      logout() {
        window.$nuxt.$cookies.remove('token');
        window.$nuxt.$cookies.remove('user');
        this.$router.push('/');
      }
    }
  }
  </script>
<style scoped>
.form-horizontal {
    background: #ecf0f4;
    padding-bottom: 20px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

}
</style>


