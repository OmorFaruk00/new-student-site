<template>
  <div class="form-body col-6 mx-auto">
    <div class="form-header">
                <h4 class="">Change Password</h4>
        </div>
  
  <div class="form-centent">
    <div class="form-group">
      <label>Old Password</label>
      <i class="fa fa-lock"></i>
      <input required="" name="login[password]" type="password" class="form-control" placeholder="Password">
    </div>
    <div class="form-group">
      <label>New Password</label>
      <i class="fa fa-lock"></i>
      <input required="" name="login[password]" type="password" class="form-control" placeholder="Password">
    </div>
    <div class="form-group">
      <label>Confirm Password</label>
      <i class="fa fa-lock"></i>
      <input required="" name="login[password]" type="password" class="form-control" placeholder="Password">
    </div>
  </div>
    <button type="submit" class="btn btn-default">Submit</button>

  </div>


</template>
<style scoped>
.form-body {
  background: #fff;
  /* padding: 20px 20px 80px 20px; */
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding-bottom: 80px;

}
.form-centent {
    padding: 20px 20px 20px 20px;
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
  margin: 0 0 30px 0;
  position: relative;
}

.form-body .form-group:last-child {
  margin: 40px 0 0 0;
}

.form-body .form-group i {
  width: 50px;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  color: #c4c4c4;
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
  border: 2px solid #d9d9d9;
  /* border: 2px solid #000; */
  box-shadow: none;
  padding: 0 20px 0 50px;
  font-size: 16px;
  color: #000;
  position: relative;
  transition: all 0.3s ease 0s;
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.form-body .form-control[type=password] {
  padding: 0 105px 0 50px;
}

.form-body .form-control:focus {
  box-shadow: none;
  outline: 0 none;
  border-color: #28a745;
}

.form-body .form-control::-webkit-input-placeholder,
.form-body .form-control::-moz-placeholder,
.form-body .form-control::placeholder {
  color: #c4c4c4;
}

.form-body .form-group label {
  padding: 2px 7px;
  background: #28a745;
  font-size: 14px;
  color: #fff;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
  border-radius: 3px;
  opacity: 1;
  z-index: 111;
  position: absolute;
  top: -9px;
  left: 15px;
  transition: all 0.3s ease 0s;

}

/* .form-body .form-group:hover label{
      opacity: 1;
      top: -9px;
  } */
.form-body .forgot-pass {
  padding: 5px 10px;
  font-size: 16px;
  font-weight: bold;
  color: #28a745;
  text-transform: capitalize;
  position: absolute;
  top: 50%;
  right: 10px;
  border-left: 1px solid #d8d8d8;
  transform: translateY(-50%);
}

.form-body .signup {
  display: inline-block;
  font-size: 16px;
  color: #8f8f8f;
  text-transform: capitalize;
  margin-top: 8px;
}

.form-body .signup a {
  color: #28a745;
}

.form-body .btn {
  padding: 15px 30px;
  background: #28a745;
  float: right;
  border: none;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  border-radius: 6px;
  text-transform: uppercase;
  margin-right: 20px;
}

.form-body .btn:focus {
  background: #28a745;
  color: #fff;
}

@media only screen and (max-width: 479px) {
  .form-body {
    padding: 40px 20px;
  }

  .form-body .form-group:last-child {
    text-align: center;
    margin-top: 0;
  }

  .form-body .signup {
    display: block;
    margin-bottom: 10px;
  }

  .form-body .btn {
    float: none;
  }
}
</style>