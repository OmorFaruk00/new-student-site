<template>
  <section>
    <div class="card mx-auto mb-4 rounded" style="max-width: 780px">
      <div class="form-header">
        <h3>Donate Blood</h3>
      </div>
      <div class="card-body ">
        <form @submit.prevent="wantToDonateBlood" v-if="!profile.blood_status || profile.blood_status === 0">
          <div class="mb-2 w-100 ">
            <div class="text-center">
              <img src="/images/nodonor.png" alt="" />
              <h6 class="mt-2">You Are Not A Blood Donor.</h6>
            </div>
          </div>
          <div class="row px-4">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <h5 class="text-primary mb-2">Want to be a Blood Donor ?</h5>
              <div class="form-group">
                <div class="form-group form-check">
                  <input type="checkbox" class="form-check-input" id="Donate_before" v-model="last_donate" />
                  <label for="Donate_before" class="mt-1">Do You Donate Blood Previously ?</label>
                </div>
              </div>
              <div class="form-group" v-if="last_donate">
                <label for="">Last Donate Date</label>
                <no-ssr>
                  <datepicker placeholder="Select date" v-model="donate_date"></datepicker>
                </no-ssr>
              </div>
            </div>
          </div>
          <span class="text-danger d-block" v-if="error.donate_date">{{
            error.donate_date[0]
            }}</span>
          <span class="text-danger d-block" v-if="error.donor_status">{{
            error.donor_status[0]
            }}</span>
          <button class="btn btn-primary ml-0">I Agree</button>
        </form>

        <div v-else>
          <div class="mb-2 w-100">
            <div class="text-center">
              <img src="/css/images/donor.png" alt="" />
              <h5 class="mt-2">You Are a Blood Donor.</h5>
              <h6 class="text-center">
                ( <span class="text-danger">{{ profile.blood_group }}</span> )
              </h6>
              <button class="btn btn-primary ml-0" v-if="donor_status" @click.prevent="donateBloodNow">
                Donate Now
              </button>
            </div>
          </div>
          <h5 class="text-primary text-capitalize mt-4">
            I Don't Want to Donate Blood For Some Time.
          </h5>
          <button class="btn btn-primary ml-0" @click.prevent="denyBloodDonate">
            I Agree
          </button>
        </div>
      </div>
    </div>
    <div class="col-12 mx-auto form-horizontal rounded px-4 ">
      <h6 class="pt-4">Blood Donning Students:</h6>
      <div class="row ">
        <div class="col-md-3 col-12 form-group">
          <select class="custom-select form-control" @change="getBloodDonor" id="blood_group" v-model="blood_group">
            <option selected value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A−</option>
            <option value="B+">B+</option>
            <option value="B-">B−</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB−</option>
            <option value="O+">O+</option>
            <option value="O-">O−</option>
          </select>
        </div>
      </div>
      <div class="spinner-border text-primary mt-5 mx-auto d-block" role="status" v-if="loading">
        <span class="sr-only">Loading...</span>
      </div>
      <div v-else>
        <div v-if="blood_donor && blood_donor['data']">
          <div class="table-responsive mt-4">
            <table class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Blood Group</th>
                  <th>Campus</th>
                  <th>Batch | Roll</th>
                  <th>Department</th>
                  <th>Total Donate</th>
                  <th>Last Donate</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(donor, i) in blood_donor.data" :key="i">
                  <td>{{ i + 1 }}</td>
                  <td>{{ donor.NAME ? donor.NAME : "N/A" }}</td>
                  <td>{{ donor.PHONE_NO ? donor.PHONE_NO : "N/A" }}</td>
                  <td>{{ donor.EMAIL ? donor.EMAIL : "N/A" }}</td>
                  <td class="text-danger">
                    {{ donor.BLOOD_GROUP ? donor.BLOOD_GROUP : "N/A" }}
                  </td>
                  <td>
                    <span v-if="donor.CAMPUS_ID == 1">BANANI</span>
                    <span v-else-if="donor.CAMPUS_ID == 2">GREEN ROAD</span>
                    <span v-else-if="donor.CAMPUS_ID == 3">SHATARKUL</span>
                    <span v-else>N/A</span>
                  </td>
                  <td>
                    {{
                      donor.rel_batch ? donor.rel_batch.BATCH_NAME : "N/A"
                    }}|{{ donor.ROLL_NO ? donor.ROLL_NO : "N/A" }}
                  </td>
                  <td>
                    {{
                      donor.rel_department && donor.rel_department.NAME
                        ? donor["rel_department"].NAME
                        : "N/A"
                    }}
                  </td>
                  <td class="text-center">
                    <span class="text-success">{{
                      donor.rel_student_blood
                        ? donor.rel_student_blood.length
                        : 0
                    }}</span>
                    <span v-if="
                      donor.rel_student_blood &&
                      donor.rel_student_blood.length > 1
                    ">times</span>
                    <span v-else>time</span>
                  </td>

                  <td>
                    {{
                      donor.last_donate
                        ? $moment(donor.last_donate, "YYYYMMDD").fromNow()
                        : "Not Donated Yet"
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="row">
            <div class="col-lg-10 col-md-10 bpagination ml-auto">
              <nav aria-label="Page navigation example" class="my-3 mx-2">
                <ul class="pagination pagination-sm justify-content-lg-end">
                  <li class="page-item" :class="blood_donor.current_page > 1 ? '' : 'disabled'">
                    <a class="page-link p-2" href="javaScript:void(0)"
                      @click="getBloodDonor(blood_donor.current_page - 1)" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                      <span class="sr-only">Previous</span>
                    </a>
                  </li>

                  <li class="page-item" v-for="(row, index) in last_page" :key="index"
                    :class="blood_donor.current_page === row ? 'disabled' : ''">
                    <a class="page-link p-2" href="javaScript:void(0)" @click="getBloodDonor(row)" v-text="row"></a>
                  </li>

                  <li class="page-item " :class="blood_donor.last_page > blood_donor.current_page
                      ? ''
                      : 'disabled'
                    ">
                    <a class="page-link p-2" href="javaScript:void(0)"
                      @click="getBloodDonor(blood_donor.current_page + 1)" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                      <span class="sr-only">Next</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

        </div>
        <h3 class="mt-1" v-else>No Blood Donor Found.</h3>
      </div>
    </div>
  </section>
</template>

<style scoped>
html {
  scroll-behavior: smooth;
}

label {
  font-size: 1rem;
}

.bpagination {
  overflow-x: auto;
}
</style>
<script>
export default {
  head() {
    return {
      title: "Blood Bank"
    };
  },
  mounted() {
    this.getAuthUserProfile();
    this.getBloodDonor();
  },
  data() {
    return {
      blood_donor: [],
      donor_status: "",
      donate_date: "",
      last_donate: false,
      loading: false,
      profile: "",
      blood_group: "",
      error: "",

      last_page: null
    };
  },

  methods: {
    donateBloodNow() {
      let token = window.$nuxt.$cookies.get("token");
      this.$axios
        .post("student/blood?token=" + token, {
          donateNow: true,
          wantToDonate: true
        })
        .then(response => {
          if (response.status === 200) {
            // this.getAuthUserProfile();
            // this.getBloodDonor();

            this.profile.blood_status = response.data.donor_blood_status;
          }
        })
        .catch(error => {
          if (error && error.response.status === 401) {
            window.location.reload();
          }
          this.$toast.error("You Can not Donate Now,Please Try Again", {
            icon: "error_outline"
          });
        });
    },
    denyBloodDonate() {
      let token = window.$nuxt.$cookies.get("token");
      this.$axios
        .post("student/blood?token=" + token, {
          wantToDonate: false
        })
        .then(response => {
          if (response.status === 200) {
            // this.getAuthUserProfile();
            // this.getBloodDonor();
            this.last_donate = false;
            this.donate_date = "";
            this.profile.blood_status = response.data.donor_blood_status;
          }
        })
        .catch(error => {
          if (error && error.response.status === 401) {
            window.location.reload();
          }
          if (error && error.response.status === 422) {
            this.error = error.response.data;
            setTimeout(() => {
              this.error = "";
            }, 5000);
          }
          this.$toast.info(
            error.response.data.donor_status
              ? error.response.data.donor_status[0]
              : "You Cannot Donate Now,Please Try Again",
            {
              icon: "error_outline",
              duration: 6000
            }
          );
          if (error.response && error.response.data.donor_blood_status) {
            this.profile.blood_status = error.response.data.donor_blood_status;
          }
        });
    },
    wantToDonateBlood() {
      let token = window.$nuxt.$cookies.get("token");
      this.$axios
        .post("student/blood?token=" + token, {
          wantToDonate: true,
          last_donate: this.last_donate,
          donate_date: this.donate_date
            ? this.$moment(this.donate_date).format("YYYY/M/D h:mm:ss")
            : null
        })
        .then(response => {
          if (response.status === 200) {
            this.profile.blood_status = response.data.donor_blood_status;
          }
        })
        .catch(error => {
          if (error && error.response.status === 401) {
            window.location.reload();
          }
          if (error && error.response.status === 422) {
            this.error = error.response.data;
            setTimeout(() => {
              this.error = "";
            }, 5000);
          }
          this.$toast.info(
            error.response.data.donor_status
              ? error.response.data.donor_status[0]
              : "You Cannot Donate Now,Please Try Again",
            {
              icon: "error_outline",
              duration: 6000
            }
          );
          if (error.response && error.response.data.donor_blood_status) {
            this.profile.blood_status = error.response.data.donor_blood_status;
          }
        });
    },
    getBloodDonor(page = null) {
      this.loading = true;
      let token = window.$nuxt.$cookies.get("token");
      this.$axios
        .get(
          `/student/blood?b_group=${encodeURIComponent(
            this.blood_group
          )}&token=${token}&page=${page}`
        )
        .then(response => {
          this.blood_donor = response.data.donor;
          this.donor_status = response.data.donor_status;
          this.last_page = response.data.donor
            ? response.data.donor.last_page
            : null;
        })
        .catch(() => {
          this.$toast.error("Donor Not Found", {
            icon: "error_outline",
            duration: 6000
          });
        });
      setTimeout(() => {
        this.loading = false;
        window.scrollTo(0, 0);
      }, 1000);
    },
    async getAuthUserProfile() {
      let token = window.$nuxt.$cookies.get("token");
      return await this.$axios
        .get("/student/profile?token=" + token)
        .then(response => {
          this.profile = response.data;
        })
        .catch(error => {
          this.$toast.error(error.response.data.error, {
            icon: "error_outline",
            duration: 6000
          });
        });
    }
  }
};
</script>
