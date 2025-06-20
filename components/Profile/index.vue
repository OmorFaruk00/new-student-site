<template>
    <div class="row ">       

        <div class="col-lg-6 col-md-6 col-sm-12 mb-4">
            <div class="student-profile">
                <div class="text-center">
                    <div class="position-relative d-inline-block">
                        <img class="profile-img" :src="profile.profile_photo" :alt="profile.name" >                        

                        <label for="uploadImage" class="edit-icon">
                            <i class="fa fa-camera" @click="$refs.profile_photo.click()" style="cursor: pointer;"></i>

                        </label>
                        <input type="file" class="custom-file-input" name="profile_photo" ref="profile_photo"
                        id="profile_photo" @change="handleProfilePicUpload()" accept="images/*" style="display: none;"/>

                        <!-- <input type="file" id="uploadImage" style="display: none;" /> -->
                    </div>
                    <h4 class="pt-3">{{ profile.name }}</h4>
                    <hr>
                </div>
                <table class="table">
                    <tr>
                        <th width="20%">Reg Code</th>
                        <td width="1%">:</td>
                        <td>{{ profile.reg_code }}</td>
                    </tr>
                    <tr>
                        <th width="20%">Roll</th>
                        <td width="1%">:</td>
                        <td>{{ profile.roll_no }}</td>
                    </tr>
                    <tr>
                        <th width="20%">Email </th>
                        <td width="1%">:</td>
                        <td>{{ profile.email }}</td>
                    </tr>
                    <tr>
                        <th width="20%">Phone</th>
                        <td width="1%">:</td>
                        <td>{{ profile.phone_no }}</td>
                    </tr>
                </table>

            </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 mb-4">
            <div class="student-profile">
                <div class=" pt-0">
                    <h4 class="info-title pb-2 pt-5">General Information
                    </h4>
                    <table class="table">
                        <tr>
                            <th width="20%">Blood Group</th>
                            <td width="1%">:</td>
                            <td>{{ profile.blood_group }}</td>
                        </tr>
                        <tr>
                            <th width="20%">Gender </th>
                            <td width="1%">:</td>
                            <td>{{ profile.gender }}</td>
                        </tr>
                        <tr>
                            <th width="20%">Date of Birth </th>
                            <td width="1%">:</td>
                            <td>{{ $moment(profile.dob).format("MMMM D, YYYY") }}</td>
                        </tr>

                        <tr>
                            <th width="20%">Birth Place </th>
                            <td width="1%">:</td>
                            <td>{{ profile.birth_place }}</td>
                        </tr>

                        <tr>
                            <th width="20%">Nationality </th>
                            <td width="1%">:</td>
                            <td>{{ profile.nationality }}</td>
                        </tr>
                        <tr>
                            <th width="20%">Marital Status</th>
                            <td width="1%">:</td>
                            <td>{{ profile.marital_status }}</td>
                        </tr>

                        <tr>
                            <th width="20%">Admission Date</th>
                            <td width="1%">:</td>
                            <td>{{ $moment(profile.adm_date).format("MMMM D, YYYY") }}</td>
                        </tr>

                        <tr>
                            <th width="20%">Student's Birth/NID No</th>
                            <td width="1%">:</td>
                            <td>{{ profile.birth_or_nid_no }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>

        <div class="col-lg-6 col-md-6 col-sm-12 mb-4">
            <div class="student-profile">

                <div class=" pt-0">
                    <h4 class="mb-0 info-title">Father Information
                    </h4>
                    <table class="table">
                        <tr>
                            <th width="20%">Fathers's Name </th>
                            <td width="1%">:</td>
                            <td>{{ profile.father_name }}</td>
                        </tr>
                        <tr>
                            <th width="20%">Father's Cell No </th>
                            <td width="1%">:</td>
                            <td>{{ profile.father_cellno }}</td>
                        </tr>
                        <tr>
                            <th width="20%">Father's Occupation</th>
                            <td width="1%">:</td>
                            <td>{{ profile.father_occupation }}</td>
                        </tr>

                        <tr>
                            <th width="20%">Father's NID No </th>
                            <td width="1%">:</td>
                            <td>{{ profile.father_nid_no }}</td>
                        </tr>

                    </table>
                </div>
            </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 mb-4">
            <div class="student-profile">
                <div class=" pt-0">
                    <h4 class="mb-0 info-title">Mother Information
                    </h4>
                    <table class="table">
                        <tr>
                            <th width="20%">Mother's Name </th>
                            <td width="1%">:</td>
                            <td>{{ profile.mother_name }}</td>
                        </tr>
                        <tr>
                            <th width="20%">Mother's Cell No </th>
                            <td width="1%">:</td>
                            <td>{{ profile.mother_cellno?profile.mother_cellno:'N/A' }}</td>
                        </tr>
                        <tr>
                            <th width="20%">Mother's Occupation</th>
                            <td width="1%">:</td>
                            <td>{{ profile.mother_occupation }}</td>
                        </tr>

                        <tr>
                            <th width="20%">Mother's NID No </th>
                            <td width="1%">:</td>
                            <td>{{ profile.mother_nid_no }}</td>
                        </tr>

                    </table>
                </div>
            </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 mb-4">
            <div class="student-profile">


                <div class=" pt-2 pb-4" >
                    <h4 class="mb-0 info-title">Guardian Information


                    </h4>
                    <table class="table" >
                        <tr>
                            <th width="20%">Guardian Name </th>
                            <td width="1%">:</td>
                            <td>{{ profile.guardian_name }}</td>
                        </tr>
                        <tr>
                            <th width="20%">Guardian Cell No </th>
                            <td width="1%">:</td>
                            <td>{{ profile.guardian_cellno}}</td>
                        </tr>
                        <tr>
                            <th width="20%">Guardian Occupation</th>
                            <td width="1%">:</td>
                            <td>{{ profile.guardian_occupation }}</td>
                        </tr>

                      

                    </table>
                </div>
            </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 mb-4">
            <div class="student-profile">

                <div class=" pt-0">
                    <h4 class="mb-0 info-title">Emergency Information</h4>
                    <table class="table">
                        <tr>
                            <th width="20%">Emergency Person Name </th>
                            <td width="1%">:</td>
                            <td>{{ profile.emergency_name }}</td>
                        </tr>
                        <tr>
                            <th width="20%">Emergency Cell No </th>
                            <td width="1%">:</td>
                            <td>{{ profile.emergency_cellno }}</td>
                        </tr>
                        <tr>
                            <th width="20%">Emergency Address </th>
                            <td width="1%">:</td>
                            <td>{{ profile.emergency_address }}</td>
                        </tr>

                        <tr>
                            <th width="20%">Emergency Person Relation</th>
                            <td width="1%">:</td>
                            <td>{{ profile.emergency_relation }}</td>
                        </tr>

                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {     
      profile: [],
      update_phone: "",
      update_email: "",
      otp: "",
      error: "",
      field: "",
      personal_info: "",
      guardian_info: "",
      parent_info: ""
    };
  },
  mounted() {
    this.getAuthUserProfile();
  },
  methods: {    
    async getAuthUserProfile() {
    
      var token = window.$nuxt.$cookies.get("token");
      return await this.$axios
        .get("/student/profile?token=" + token)
        .then(response => {
          this.profile = response.data;
          if (profile.blood_status == null) {
            $("#bloodModal").modal("show");
          }
          if (this.profile.profile_photo == null) {
            // this.$toast.error('Please upload profile photo first !', {
            this.$toast.error("Please upload profile photo first !", {
              icon: "error_outline",
              position: "top-left"
              // position: "top-left"
            });
          }
        })
        .catch(error => {
          this.$toast.error(error.response.data.error, {
            icon: "error_outline"
          });
        })
        .catch(error => {
          if (error) {
            this.$toast.error(error.response.data.error, {
              icon: "error_outline"
            });
          }
        });
    },
    downloadCV() {
      var slug = this.profile.slug_name;
      // window.location = "http://api.diu.ac/student/public/download_cv/" + slug
      window.location = "http://api.diu.ac/student/public/download_cv/" + slug;
    },
    async handleProfilePicUpload() {
      var token = window.$nuxt.$cookies.get("token");

      let formData = new FormData();
      formData.append("profile_photo", this.$refs.profile_photo.files[0]);

      return await this.$axios
        .post(
          "/student/profile/upload_profile_photo?token=" + token,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(response => {
          $(".form-text").html("&nbsp;");
          this.$toast.success(response.data.success);
          this.getAuthUserProfile();
        })
        .catch(error => {
          this.$toast.error(error.response.data.profile_photo[0], {
            icon: "error_outline"
          });
          $(".form-text").html("&nbsp;");
          $.each(error.response.data, function(index, value) {
            $("#" + index + "_help").html(value[0]);
          });
        });
    }
  }
};
</script>


<style scoped>
.student-profile {
    background: #ecf0f4;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.profile-img {
    width: 170px;
    height: 170px;
    object-fit: cover;
    object-position: top; 
    border-radius: 50%;
    border: 4px solid #fff;
}


.edit-icon {
    position: absolute;
    bottom: 20px;
    right: 0;
    background: #000;
    color: white;
    border-radius: 50%;
    padding: 6px;
    cursor: pointer;
    font-size: 14px;
    /* border: 2px solid #fff; */
}

.info-title {
    font-size: 18px;
    font-weight: 600;
    color: #000;
    padding-bottom: 10px;
    padding-left: 5px;
}



.student-profile .table th,
.student-profile .table td {
    font-size: 14px;
    padding: 12px 10px;
    color: #000;
}

@media (max-width: 576px) {
    .student-profile {   
    padding: 10px;
    
}

    .student-profile .table th,
    .student-profile .table td {
        font-size: 12px;
        /* or smaller if needed */
        padding: 5px 2px;
    }

    .info-title {
        font-size: 14px;
        font-weight: 600;
        color: #000;
        padding-bottom: 10px;
        padding-left: 3px;
    }

    /* .content-wrapper {
        background: #ecf0f4;
        padding: 50px 0px 0px 0px;
        width: 100%;
        -webkit-box-flex: 1;
        -ms-flex-positive: 1;
        flex-grow: 1;
    } */
}

.table th,  th,
.table td
 { 
  line-height: 1;
  border:none;
}
</style>