<template>
  <div class=" main-body">
    <div v-if="tolets.length > 0">
      <div class="d-flex justify-content-between pt-3 find-header">
        <h2>To-Let Find</h2>
        <div>
          <button class="btn btn-outline-success my-2 my-sm-0" type="button" value="male" :disabled="loading"
            @click="searchByGender('male')">
            For Male
            <div v-if="loading" class="spinner-border text-primary ml-2 spinner-border-sm" role="status"
              aria-hidden="true"></div>
          </button>
          <button class="btn btn-outline-success my-2 my-sm-0" type="button" @click="searchByGender('female')"
            :disabled="loading">
            For Female
            <div v-if="loading" class="spinner-border text-primary ml-2 spinner-border-sm" role="status"
              aria-hidden="true"></div>
          </button>
        </div>
        <!-- <form class="form-inline d-inline-flex ">
          <input v-model="search" class=" mr-sm- " type="search" placeholder="Search" aria-label="Search"
           />
          <button class="btn btn-outline-success my-2 my-sm-0" type="button" @click="SearchTolet()" :disabled="loading">
            Search
            <div v-if="loading" class="spinner-border text-primary ml-2 spinner-border-sm" role="status"
              aria-hidden="true"></div>
          </button>
        </form> -->
        <div class="input-group" style="width: 300px; border:2px solid #18AC4F; border-radius: 0.25rem;">
          <input type="text" class="form-control" placeholder="Search" v-model="search">
          <div class="input-group-append" style="height:40px;">
            <button class="btn btn-secondary" type="button" style="background-color: #18AC4F;height:40px;"
              @click="SearchTolet()" :disabled="loading">
              <i class="fa fa-search text-black"></i>
            </button>
            <div v-if="loading" class="spinner-border text-primary ml-2 spinner-border-sm" role="status"
              aria-hidden="true"></div>
          </div>
        </div>



      </div>
      <div>
        <div class="row pb-3">
          <div class="col-md-6 col-lg-4 col-sm-12 pt-4" v-for="(tolet, i) in tolets" :key="tolet._id">
            <div class="card rounded">
              <div class="card-body">
                <div>
                  <p><strong>Published By : </strong> {{ tolet.created_by }}</p>
                  <p><strong>Email : </strong> {{ tolet.email }}</p>
                  <p><strong>Contact : </strong> 0{{ tolet.phone }}</p>
                </div>

                <hr />
                <h6 class="card-subtitle mb-2 text-muted">Details</h6>
                <div class="row">
                  <div class="col-6">
                    <p>
                      <strong>
                        {{ tolet.available_seat }}
                        {{ tolet.type }} Available</strong>
                    </p>
                  </div>
                  <div class="col-6">
                    <p>
                      <strong>Rent {{ tolet.rent }} Taka Per {{ tolet.type }}
                      </strong>
                    </p>
                  </div>
                  <div class="col-6">
                    <p>
                      <strong>Campus {{ tolet.campus }}</strong>
                    </p>
                  </div>
                  <div class="col-6">
                    <p>
                      <strong>For {{ tolet.gender }} Student</strong>
                    </p>
                  </div>
                  <div class="col-6">
                    <p>Maid {{ tolet.maid }}</p>
                  </div>
                  <div class="col-6">
                    <p>Wifi {{ tolet.wifi }}</p>
                  </div>
                  <div class="col-6">
                    <p>Fridge {{ tolet.fridge }}</p>
                  </div>
                  <div class="col-6">
                    <p>{{ tolet.person_per_room }}&nbsp; Person Per Room</p>
                  </div>
                  <div class="col-6">
                    <p>{{ tolet.bathroom_type }}&nbsp; Bathroom</p>
                  </div>
                  <div class="col-6">
                    <p>{{ tolet.room_type }} &nbsp; Floor Room</p>
                  </div>
                  <div class="col-12">
                    <p>
                      <strong>Available From : </strong>
                      {{ tolet.available_from }}
                    </p>
                  </div>
                </div>

                <div class="pb-3">
                  <p class="card-text pt-2 details">
                    {{ tolet.details }}
                  </p>
                  <a class="float-right text-primary pt-2 more-details" :class="loading ? 'disabled' : ''"
                    @click="ToletDetails(tolet.id)">
                    More Details</a>
                </div>
                <hr />
                <h6 class="card-subtitle mb-2 text-muted">Address</h6>

                <p class="card-text address">
                  {{ tolet.address }}
                </p>

                <div class="d-flex justify-content-end">
                  <div v-if="profile.id == tolet.creater_id" class="d-flex justify-content-between align-items-center">
                    <h4 class="text-primary">Published</h4>
                    <button class="btn btn-danger" @click="withdrawTolet(i, tolet.id)" :disabled="loading">
                      Withdraw Request
                    </button>
                  </div>
                  <div v-else>
                    <button class="btn btn-primary" @click="
                      SeatBooking(
                        tolet.id,
                        tolet.available_seat,
                        tolet.creater_id
                      )
                      ">
                      Booking
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="ToletDetailsModel" tabindex="-1" role="dialog" aria-labelledby="ToletDetailsModel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Tolet Details
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p><strong>Published By : </strong> {{ details.created_by }}</p>
              <p><strong>Email : </strong> {{ details.email }}</p>
              <p><strong>Contact : </strong> 0{{ details.phone }}</p>
              <hr />
              <h6 class="card-subtitle mb-2 text-muted">Details</h6>
              <div class="row">
                <div class="col-6">
                  <p>
                    <strong>
                      {{ details.available_seat }}
                      {{ details.type }} Available</strong>
                  </p>
                </div>
                <div class="col-6">
                  <p>
                    <strong>Rent {{ details.rent }} Taka Per {{ details.type }}
                    </strong>
                  </p>
                </div>
                <div class="col-6">
                  <p>
                    <strong>Campus {{ details.campus }} </strong>
                  </p>
                </div>
                <div class="col-6">
                  <p>
                    <strong>For {{ details.gender }} Student</strong>
                  </p>
                </div>
                <div class="col-6">
                  <p>Maid {{ details.maid }}</p>
                </div>
                <div class="col-6">
                  <p>Wifi {{ details.wifi }}</p>
                </div>
                <div class="col-6">
                  <p>Fridge {{ details.fridge }}</p>
                </div>
                <div class="col-6">
                  <p>{{ details.person_per_room }} &nbsp;Person Per Room</p>
                </div>
                <div class="col-6">
                  <p>{{ details.bathroom_type }} &nbsp;Bathroom</p>
                </div>
                <div class="col-6">
                  <p>{{ details.room_type }}&nbsp;Floor Room</p>
                </div>
                <div class="col-6">
                  <p>
                    <strong>Available From : </strong>
                    {{ details.available_from }}
                  </p>
                </div>
              </div>

              <div class="pb-3">
                <p class="card-text pt-2">
                  {{ details.details }}
                </p>
              </div>
              <hr />
              <h6 class="card-subtitle mb-2 text-muted ">Address</h6>

              <p class="card-text">
                {{ details.address }}
              </p>

              <div class="d-flex justify-content-end">
                <div v-if="this.profile.id == details.creater_id">
                  <h4 class="text-primary">published</h4>
                </div>
                <div v-else>
                  <button class="btn btn-primary" @click="
                    SeatBooking(
                      details.id,
                      details.available_seat,
                      details.creater_id
                    )
                    ">
                    Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="BookingModel" tabindex="-1" role="dialog" aria-labelledby="BookingModel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="">
                <!-- Tolet Details -->
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label>Seat/Room</label>
                <input type="number" class="form-control" placeholder="Enter Required Seat or Room" v-model="seat" />
              </div>
              <span id="seat_error" class="text-danger"></span>
              <p class="text-danger" v-if="error.seat" v-text="error.seat[0]"></p>
              <div class="d-flex justify-content-end">
                <button class="btn btn-primary" @click="SeatBookingSubmit()">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12">
        <div class="row">
          <div class="col-lg-2 col-md-2 col-sm-12">
            Showing <span v-html="meta.from || 0"></span> to
            <span v-html="meta.to || 0"></span>
            of
            <span v-html="meta.total"></span> entries
          </div>

          <div class="col-lg-10 col-md-10 col-sm-12" v-if="!loading">
            <nav aria-label="Page navigation example" class="my-3 mx-2">
              <ul class="pagination pagination-sm justify-content-end" :class="loading ? 'disabled' : ''">
                <li class="page-item" :class="meta.current_page > 1 ? '' : 'disabled'">
                  <a class="page-link" href="javaScript:void(0)" @click="paginatePreview" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                  </a>
                </li>
                <li class="page-item" v-for="(row, index) in meta.last_page" :key="index"
                  :class="row == meta.current_page ? 'active' : ''">
                  <a class="page-link" href="javaScript:void(0)" @click="paginatePageWise(row)" v-text="row"></a>
                </li>
                <li class="page-item" :class="meta.last_page > meta.current_page ? '' : 'disabled'">
                  <a class="page-link" href="javaScript:void(0)" @click="paginateNext" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading" class="text-center mt-5">
      <i class="fa fa-spinner text-primary fa-spin fa-4x"></i>
    </div>

  </div>
</template>
<style scoped>
.details {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 58px;
}

.address {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 40px;
}

.more-details {
  cursor: pointer;
}

@media only screen and (max-width: 880px) {
  .find-header {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .main-body {
    padding: 0 !important;
  }

  .search-box {
    padding-top: 10px;
  }
}
</style>
<script>
export default {
  data() {
    return {
      tolets: "",
      search: "",
      details: "",
      seat: "",
      creater_id: "",
      profile: "",
      id: "",
      available_seat: "",
      error: "",
      links: [],
      meta: [],
      filter: "",
      page: "",
      loading: false
    };
  },
  mounted() {
    this.getAuthUserProfile();
  },
  watch: {
    filter(val) {
      //  console.log(val);
      this.page = 1;
    }
  },
  methods: {
    paginatePreview() {
      let page_number = parseInt(this.meta.current_page - 1);
      this.page = page_number;
      if (this.filter) {
        this.searchByGender(this.filter);
      } else {
        this.getTolet();
      }
    },

    paginateNext() {
      let page_number = parseInt(this.meta.current_page + 1);
      this.page = page_number;
      if (this.filter) {
        this.searchByGender(this.filter);
      } else {
        this.getTolet();
      }
    },

    paginatePageWise(row) {
      window.scrollTo(0, 0);
      this.page = row;
      if (this.filter) {
        this.searchByGender(this.filter);
      } else {
        this.getTolet();
      }
    },

    getAuthUserProfile() {
      var token = window.$nuxt.$cookies.get("token");
      return this.$axios
        .get("/student/profile?token=" + token)
        .then(response => {
          this.profile = response.data;
          this.getTolet();
        })
        .catch(error => {
          this.$toast.error(error.response.data.error, {
            icon: "error_outline"
          });
        });
    },
    getTolet() {
      window.scrollTo(0, 0);
      this.loading = true;
      var token = window.$nuxt.$cookies.get("token");
      return this.$axios
        .get("/tolet?token=" + token + "&page=" + this.page)
        .then(response => {
          this.tolets = response.data.data;
          this.links = response.data.links;
          this.meta = response.data;
        })
        .catch(error => {
          this.$toast.error(error.response.data.error, {
            icon: "error_outline"
          });
        }).finally(() => {
          this.loading = false;
        });
    },
    SearchTolet() {
      this.loading = true;

      var token = window.$nuxt.$cookies.get("token");
      return this.$axios
        .get("/toletsearch/" + this.search + "?token=" + token)
        .then(response => {
          this.tolets = response.data;
        })
        .catch(error => {
          this.$toast.error(error.response.data.error, {
            icon: "error_outline"
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    withdrawTolet(index, id) {
      this.loading = true;
      var token = window.$nuxt.$cookies.get("token");
      this.$axios
        .post("/tolet/withdraw/" + id + "?token=" + token)
        .then(response => {
          this.$toast.success(response.data.message, {
            icon: "check_circle"
          });
          this.tolets.splice(index, 1);
        })
        .catch(error => {
          this.$toast.error(error.response.data.error, {
            icon: "error_outline"
          });
        }).finally(() => {
          this.loading = false;
        });
    },
    searchByGender(gender) {
      this.loading = true;
      var token = window.$nuxt.$cookies.get("token");
      if (this.filter != gender) {
        this.filter = gender;
        this.page = 1;
      }
      return this.$axios
        .get(
          "/tolet/searchgender/" +
          gender +
          "?page=" +
          this.page +
          "&token=" +
          token
        )
        .then(response => {
          this.tolets = response.data.data;
          this.links = response.data.links;
          this.meta = response.data;
        })
        .catch(error => {
          this.$toast.error(error.response.data.error, {
            icon: "error_outline"
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },

    ToletDetails(id) {
      this.loading = true
      var token = window.$nuxt.$cookies.get("token");
      return this.$axios
        .get("/toletdetails/" + id + "?token=" + token)
        .then(response => {
          this.details = response.data[0];
          $("#ToletDetailsModel").modal("show");
        })
        .catch(error => {
          this.$toast.error(error.response.data.error, {
            icon: "error_outline"
          });
        }).finally(() => {
          this.loading = false;
        });
    },

    SeatBooking(id, seat, creater_id) {
      this.available_seat = seat;
      this.id = id;
      this.creater_id = creater_id;
      $("#BookingModel").modal("show");
      $("#ToletDetailsModel").modal("hide");
    },

    SeatBookingSubmit() {
      var token = window.$nuxt.$cookies.get("token");
      if (this.seat <= 0 || this.seat > this.available_seat) {
        $("#seat_error").html("Please Select Available Seat");
      } else {
        $("#seat_error").html("");

        var requested_by = this.profile.name;
        var phone = this.profile.phone_no;
        var email = this.profile.email;
        var requester_id = this.profile.id;
        var data = {
          requested_by: requested_by,
          phone: phone,
          email: email,
          requester_id: requester_id,
          seat: this.seat,
          publish_id: this.id,
          creater_id: this.creater_id
        };

        this.$axios
          .post("/tolet/request", data + "?token=" + token)
          .then(response => {
            this.$toast.success("Request Successfull");
            $("#BookingModel").modal("hide");
            this.seat = "";
          })
          .catch(error => {
            if (error.response.status === 422) {
              // console.log(error.response.data.errors);
              this.error = error.response.data.errors;
            } else {
              this.$toast.error("Something Wrong");
            }
          });
      }
    }
  }
};
</script>
<style scoped>
.form-inline {
  background: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  border: none;

}

.btn-outline-success:hover {
  color: #000;
}
</style>
