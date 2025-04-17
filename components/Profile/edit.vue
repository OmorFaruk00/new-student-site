<template>
    <div>
        <form class="form-horizontal" @submit.prevent="savePersonalInfoForm()">
            <div class="form-header">
                <h4>Personal Information</h4>
            </div>
            <div class="row px-3 pt-3">
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="form-group">

                        <textarea class="form-control" id="about_me" name="about_me"
                            v-model="profile.about_me"></textarea>

                        <label for="about_me">About Me</label>
                        <small id="about_me_help" class="form-text text-danger">&nbsp;</small>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group">
                        <input type="text" class="form-control" id="slug_name" name="slug_name"
                            v-model="profile.slug_name">
                        <label for="slug_name">Your public profile name </label>
                        <small id="slug_name_help" class="form-text text-danger">&nbsp;</small>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group">
                        <input type="text" class="form-control" id="site_tag" name="site_tag"
                            placeholder="ex. Full Stack Developer" v-model="profile.site_tag">
                        <label for="site_tag">Site Tag </label>
                        <small id="site_tag_help" class="form-text text-danger">&nbsp;</small>
                    </div>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group">
                        <select class="form-control" id="blood_group" name="blood_group" v-model="profile.blood_group">
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
                        <select class="form-control" id="blood_group" name="blood_group" v-model="profile.gender">
                            <option selected disabled value="">Select Gender</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>

                        </select>
                        <label for="blood_group">Gender</label>
                        <small id="blood_group_help" class="form-text text-danger">&nbsp;</small>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group focused">
                        <input type="text" class="form-control datepicker" id="dob" name="dob" v-model="profile.dob">
                        <label for="dob">Date Of Birth * <small>(Format: 1993-12-30)</small></label>
                        <small id="dob_help" class="form-text text-danger">&nbsp;</small>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group focused">
                        <input type="text" class="form-control" id="birth_place" name="birth_place"
                            v-model="profile.birth_place">
                        <label for="birth_place">Birth Place *</label>
                        <small id="birth_place_help" class="form-text text-danger">&nbsp;</small>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group focused">
                        <input type="text" class="form-control" id="nationality" name="nationality"
                            v-model="profile.nationality">
                        <label for="nationality">Nationality *</label>
                        <small id="nationality_help" class="form-text text-danger">&nbsp;</small>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group focused">
                        <select class="form-control" id="marital_status" name="marital_status"
                            v-model="profile.marital_status">
                            <option selected value="">Select Marital Status</option>
                            <option value="Married">Married</option>
                            <option value="Single">Single</option>
                            <option value="Widowed">Widowed</option>
                            <option value="Divorced">Divorced</option>
                        </select>
                        <label for="marital_status">Marital Status *</label>
                        <small id="marital_status_help" class="form-text text-danger">&nbsp;</small>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group focused">
                        <input type="text" class="form-control" id="birth_or_nid_no" name="birth_or_nid_no"
                            placeholder="" v-model="profile.birth_or_nid_no">
                        <label for="birth_or_nid_no">Birth Or NID no</label>
                        <small id="birth_or_nid_no_help" class="form-text text-danger">&nbsp;</small>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group focused">
                        <input type="text" class="form-control" id="another_contact_no" name="another_contact_no"
                            placeholder="ex. 017xx, 018xx" v-model="profile.phone_no">
                        <label for="another_contact_no">Contact No</label>
                        <small id="another_contact_no_help" class="form-text text-danger">&nbsp;</small>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group focused">
                        <textarea class="form-control" id="parmanent_address" name="parmanent_address"
                            v-model="profile.parmanent_address"></textarea>
                        <label for="parmanent_address">Permanent Address *</label>
                        <small id="parmanent_address_help" class="form-text text-danger">&nbsp;</small>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group focused">
                        <textarea class="form-control" id="mailing_address" name="mailing_address"
                            v-model="profile.mailing_address"></textarea>
                        <label for="mailing_address">Mailing Address *</label>
                        <small id="mailing_address_help" class="form-text text-danger">&nbsp;</small>
                    </div>
                </div>
            </div>
            <div class="form-header">
                <h4 class="">Father Information</h4>
            </div>
            <div class="row px-3 pt-3">
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group focused">
                        <input type="text" class="form-control" id="father_name" name="father_name"
                            v-model="profile.father_name">
                        <label for="father_name">Father Name *</label>
                        <small id="father_name_help" class="form-text text-danger">&nbsp;</small>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group focused">
                        <input type="text" class="form-control" id="father_cellno" name="father_cellno"
                            v-model="profile.father_cellno">
                        <label for="father_cellno">Father Cell No *</label>
                        <small id="father_cellno_help" class="form-text text-danger">&nbsp;</small>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group focused">
                        <input type="text" class="form-control" id="father_occupation" name="father_occupation"
                            v-model="profile.father_occupation">
                        <label for="father_occupation">Father Occupation *</label>
                        <small id="father_occupation_help" class="form-text text-danger">&nbsp;</small>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group focused">
                        <input type="text" class="form-control" id="father_nid_no" name="father_nid_no"
                            v-model="profile.father_nid_no">
                        <label for="father_nid_no">Father NID No</label>
                        <small id="father_nid_no_help" class="form-text text-danger">&nbsp;</small>
                    </div>
                </div>
            </div>


            <div class="form-header">
                <h4 class="">Mother Information</h4>
            </div>
            <div class="row px-3 pt-3">
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group focused">
                        <input type="text" class="form-control" id="mother_name" name="mother_name"
                            v-model="profile.mother_name">
                        <label for="mother_name">Mother Name *</label>
                        <small id="mother_name_help" class="form-text text-danger">&nbsp;</small>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group focused">
                        <input type="text" class="form-control" id="mother_cellno" name="mother_cellno"
                            v-model="profile.mother_cellno">
                        <label for="mother_cellno">Mother Cell No *</label>
                        <small id="mother_cellno_help" class="form-text text-danger">&nbsp;</small>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group focused">
                        <input type="text" class="form-control" id="mother_occupation" name="mother_occupation"
                            v-model="profile.mother_occupation">
                        <label for="mother_occupation">Mother Occupation *</label>
                        <small id="mother_occupation_help" class="form-text text-danger">&nbsp;</small>
                    </div>

                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group focused">
                        <input type="text" class="form-control" id="mother_nid_no" name="mother_nid_no"
                            v-model="profile.mother_nid_no">
                        <label for="mother_nid_no">Mother NID No</label>
                        <small id="mother_nid_no_help" class="form-text text-danger">&nbsp;</small>
                    </div>
                </div>
            </div>

            <div class="form-header">
                <h4 class="">Guardian Information</h4>
            </div>
            <div class="row px-3 pt-3">
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group focused">
                        <input type="text" class="form-control" id="guardian_name" name="guardian_name" v-model="profile.guardian_name">
                        <label for="guardian_name">Guardian Name *</label>
                        <small id="guardian_name_help" class="form-text text-danger">&nbsp;</small>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group focused">
                        <input type="text" class="form-control" id="guardian_cellno" name="guardian_cellno" v-model="profile.guardian_cellno">
                        <label for="guardian_cellno">Guardian Cell No *</label>
                        <small id="guardian_cellno_help" class="form-text text-danger">&nbsp;</small>
                    </div>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="form-group focused">
                        <input type="text" class="form-control" id="guardian_occupation" name="guardian_occupation" v-model="profile.guardian_occupation">
                        <label for="guardian_occupation">Guardian Occupation *</label>
                        <small id="guardian_occupation_help" class="form-text text-danger">&nbsp;</small>
                    </div>
                </div>

            </div>

            <div class="form-header">
                <h4 class="">Emergency Information</h4>
            </div>
            <div class="row px-3 pt-3">
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group focused">
                        <input type="text" class="form-control" id="emergency_name" name="emergency_name" v-model="profile.emergency_name">
                        <label for="emergency_name">Emergency Name *</label>
                        <small id="emergency_name_help" class="form-text text-danger">&nbsp;</small>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group focused">
                        <input type="text" class="form-control" id="emergency_cellno" name="emergency_cellno" v-model="profile.emergency_cellno">
                        <label for="emergency_cellno">Emergency Cell No *</label>
                        <small id="emergency_cellno_help" class="form-text text-danger">&nbsp;</small>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group focused">
                        <input type="text" class="form-control" id="emergency_occupation" name="emergency_occupation" v-model="profile.emergency_occupation">
                        <label for="emergency_occupation">Emergency Occupation *</label>
                        <small id="emergency_occupation_help" class="form-text text-danger">&nbsp;</small>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group focused">
                        <input type="text" class="form-control" id="emergency_relation" name="emergency_relation" v-model="profile.emergency_relation">
                        <label for="emergency_relation">Emergency Person Relation *</label>
                        <small id="emergency_relation_help" class="form-text text-danger">&nbsp;</small>
                    </div>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="form-group focused">
                        <textarea class="form-control" id="emergency_address" name="emergency_address" v-model="profile.emergency_address"></textarea>
                        <label for="emergency_address">Emergency Address</label>
                        <small id="emergency_address_help" class="form-text text-danger">&nbsp;</small>
                    </div>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="form-group focused">
                        <input type="file" class=" form-control" name="upload_cv_file" ref="upload_cv_file"
                            id="upload_cv_file" v-on:change="handleFileUpload()" accept="">
                        <label class="custom-file-label" for="upload_cv_file">Upload Your CV</label>
                        <small id="upload_cv_file_help" class="form-text text-danger">&nbsp;</small>
                    </div>
                </div>

            </div>




            <button type="submit" class="btn btn-primary" style="margin-right: 20px;">Submit</button>


        </form>
    </div>


</template>

<script>
export default {
    middleware: 'feedbackAuthenticated',
    data() {
        return {
            profile: "",
            cv_file: ''
        }
    },
    mounted() {
        this.getAuthUserProfile();
    },
    methods: {
        async getAuthUserProfile() {
            var token = window.$nuxt.$cookies.get('token');
            return await this.$axios.get('/student/profile?token=' + token)
                .then((response) => {
                    this.profile = response.data;
                })
                .catch((error) => {
                    this.$toast.error('Not found', { icon: "error_outline" });
                })
        },
        async savePersonalInfoForm() {
            var token = window.$nuxt.$cookies.get('token');
            return await this.$axios.post('/student/profile/personal?token=' + token, this.profile)
                .then((response) => {
                    $(".form-text").html("&nbsp;");
                    this.$toast.success('Updated Successfuly Done');
                    this.getAuthUserProfile();
                })
                .catch((error) => {
                    this.$toast.error(error.response.data.error, { icon: "error_outline" });
                    $(".form-text").html("&nbsp;");
                    $.each(error.response.data, function (index, value) {
                        $("#" + index + "_help").html(value[0]);
                    });
                })
        },
        async profileVisibilityChange() {
            var token = window.$nuxt.$cookies.get('token');
            return await this.$axios.get('/student/profile/personal/change-visibility?token=' + token)
                .then((response) => {
                    $(".form-text").html("&nbsp;");
                    this.$toast.success(response.data.message, { icon: "error_outline" });

                    this.getAuthUserProfile();
                })
                .catch((error) => {
                    this.$toast.error(error.response.data.error, { icon: "error_outline" });
                    $(".form-text").html("&nbsp;");
                    $.each(error.response.data, function (index, value) {
                        $("#" + index + "_help").html(value[0]);
                    });
                })
        },
        async handleFileUpload() {
            var token = window.$nuxt.$cookies.get('token');

            let formData = new FormData();
            formData.append('upload_cv_file', this.$refs.upload_cv_file.files[0]);
            return await this.$axios.post('/student/profile/upload_cv?token=' + token, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((response) => {
                    $(".form-text").html("&nbsp;");
                    this.$toast.success(response.data.success, { icon: "error_outline" });
                    this.getAuthUserProfile();
                })
                .catch((error) => {
                    this.$toast.error(error.response.data.upload_cv_file[0], { icon: "error_outline" });
                    $(".form-text").html("&nbsp;");
                    $.each(error.response.data, function (index, value) {
                        $("#" + index + "_help").html(value[0]);
                    });
                });
        }
    }
}
</script>

<style scoped>
.form-horizontal {
    background: #ecf0f4;
    padding-bottom: 70px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

}
</style>
