<template>
    <div class="form-body col-lg-6 col-md-6 col-sm-12 mx-auto">
      <div class="form-header">
                  <h4 class="">Change Password</h4>
          </div>
    
    <form class="form-centent" @submit.prevent="changePasswordForm()">
      <div class="form-group mb-4 mt-3">
        <label>Current Password <span class="text-danger">*</span></label>
        <i class="fa fa-lock text-primary"></i>
        <input required="" name="login[password]" type="password" class="form-control" placeholder="Enter Current Password"  v-model="current_password">
      </div>
      <div class="form-group mb-4">
        <label>New Password <span class="text-danger">*</span></label>
        <i class="fa fa-lock text-primary"></i>
        <input required="" name="login[password]" type="password" class="form-control" placeholder="Enter New Password" v-model="password">
      </div>
      <div class="form-group mb-4">
        <label>Confirmed Password <span class="text-danger">*</span></label>
        <i class="fa fa-lock text-primary"></i>
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
    // middleware: 'feedbackAuthenticated',
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
.form-body {
    background: #ecf0f4;
    /* background: #fff;  */
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

}

.form-centent {
    padding: 20px 20px 30px 20px;
}

.form-header {
    background: #28a745;
    /* padding: 5px 0px; */
    color: #fff;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}

.form-header h4 {
    padding: 7px 0px;
}

.form-body .form-group {
    margin: 0 0 10px 0;
    position: relative;
}



.form-body .form-group i {
    width: 50px;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    color: #000 !important;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    opacity: 1;
    top: 2px;
}

.form-body .form-control {
    height: 50px;
    /* background: #ecf0f4; */
    background: #ffff;
    border: 2px solid #d9d9d9;
    box-shadow: none;
    padding: 5px 10px 0 40px;
    font-size: 16px;
    color: #000;
    position: relative;
    transition: all 0.3s ease 0s;
    border-radius: 5px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}



.form-body .form-control:focus {
    box-shadow: none;
    outline: 0 none;
    /* border-color: #28a745; */
    border-color: #000;
}

.form-body .form-control::-webkit-input-placeholder,
.form-body .form-control::-moz-placeholder,
.form-body .form-control::placeholder {
    color: #c4c4c4;
}

.form-body .form-group label {
    padding: 2px 7px;
    /* background: #28a745; */
    background: #f5f5f5;
    font-size: 14px;
    color: #000;
    /* letter-spacing: 0.5px; */
    margin-bottom: 10px;
    /* border-radius: 3px; */
    opacity: 1;
    z-index: 1;
    position: absolute;
    top: -9px;
    left: 15px;
    transition: all 0.3s ease 0s;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

}

.form-body textarea.form-control {
    min-height: 80px;
    resize: vertical;
    padding-top: 10px;
    font-family: inherit;
    line-height: 1.5;
}



/* .form-body .btn {
    padding: 15px 30px;
    background: #28a745;
    float: right;
    border: none;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    border-radius: 6px;
    text-transform: uppercase;
}

.form-body .btn:focus {
    background: #28a745;
    color: #fff;
} */

@media only screen and (max-width: 479px) {


    /* .form-body .form-group:last-child {
      text-align: center;
      margin-top: 0;
    } */


}
</style>

 