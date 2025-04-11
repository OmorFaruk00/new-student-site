<template>
  <div>



    <div class="form-body">
      <div class="form-header">
        <h4>Personal Information</h4>
      </div>
           
      <div class="row px-3 pt-3">


        <div class="col-lg-12 col-md-12 col-sm-12">
          <div class="form-group">

            <textarea class="form-control" id="about_me" name="about_me"></textarea>

            <label for="about_me">About Me</label>
            <small id="about_me_help" class="form-text text-danger">&nbsp;</small>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
          <div class="form-group">
            <input type="text" class="form-control" id="slug_name" name="slug_name">
            <label for="slug_name">Your public profile name </label>
            <small id="slug_name_help" class="form-text text-danger">&nbsp;</small>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
          <div class="form-group">
            <input type="text" class="form-control" id="site_tag" name="site_tag"
              placeholder="ex. Full Stack Developer">
            <label for="site_tag">Site Tag </label>
            <small id="site_tag_help" class="form-text text-danger">&nbsp;</small>
          </div>
        </div>

        <div class="col-lg-6 col-md-6 col-sm-12">
          <div class="form-group">
            <select class="form-control" id="blood_group" name="blood_group">
              <option selected disabled>Select Blood Group</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
            <label for="blood_group">Blood Group </label>
            <small id="blood_group_help" class="form-text text-danger">&nbsp;</small>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
          <div class="form-group">
            <select class="form-control" id="blood_group" name="blood_group">
              <option selected disabled value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>

            </select>
            <label for="blood_group">Gender</label>
            <small id="blood_group_help" class="form-text text-danger">&nbsp;</small>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12"></div>
        <div class="col-lg-6 col-md-6 col-sm-12"></div>
        <div class="col-lg-6 col-md-6 col-sm-12"></div>
        <div class="col-lg-6 col-md-6 col-sm-12"></div>
        <div class="col-lg-6 col-md-6 col-sm-12"></div>
        <div class="col-lg-6 col-md-6 col-sm-12"></div>
        <div class="col-lg-6 col-md-6 col-sm-12"></div>
        <div class="col-lg-6 col-md-6 col-sm-12"></div>
        <div class="col-lg-6 col-md-6 col-sm-12"></div>
        <div class="col-lg-6 col-md-6 col-sm-12"></div>
        <div class="col-lg-6 col-md-6 col-sm-12"></div>
        <div class="col-lg-6 col-md-6 col-sm-12"></div>
        <div class="col-lg-6 col-md-6 col-sm-12"></div>
        <div class="col-lg-6 col-md-6 col-sm-12"></div>
        <div class="col-lg-6 col-md-6 col-sm-12"></div>
        <div class="col-lg-6 col-md-6 col-sm-12"></div>



      </div>
      <div class="form-header">
        <h4 class="">Father Information</h4>
      </div>
      
      

      <!-- <button type="submit" class="btn btn-default">Submit</button> -->
   

    </div>
  </div>


</template>


<style scoped>
.form-body {
  background: #fff;
  padding-bottom: 100px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

}

.form-centent {
  padding: 20px 20px 80px 20px;
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
.form-header h4{
  padding: 7px 0px;
}

.form-body .form-group {
  margin: 0 0 5px 0;
  position: relative;
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
  border: 2px solid #d9d9d9;
  box-shadow: none;
  padding: 5px 10px 0 10px;
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
  z-index: 1;
  position: absolute;
  top: -9px;
  left: 15px;
  transition: all 0.3s ease 0s;

}

.form-body textarea.form-control {
  min-height: 80px;
  resize: vertical;
  padding-top: 10px;
  font-family: inherit;
  line-height: 1.5;
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
}

.form-body .btn:focus {
  background: #28a745;
  color: #fff;
}

@media only screen and (max-width: 479px) {


  /* .form-body .form-group:last-child {
    text-align: center;
    margin-top: 0;
  } */


}
</style>