<template>
  <!-- <div>
        <h2>To let publish page</h2>
    </div> -->
  <section>
    <div class="form-horizontal rounded">
      <h3 class="form-header p-3">To-Let Publish</h3>
      <div class=" my-3">
        <div class="row p-3">
          <div class="">
            <form method="post" id="toletform">
              <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12 mb-3">
                  <div class="form-group">
                    <label>To-Let Type</label>
                    <p class="text-danger" v-if="error.type" v-text="error.type[0]"></p>
                    <select class="form-control" v-model="type">
                      <option value="" selected disabled>Select Type</option>
                      <option value="Seat">Seat</option>
                      <option value="Room">Room</option>
                      <option value="Sublet">Sublet</option>
                    </select>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 mb-3">
                  <div class="form-group">
                    <label>Gender</label>
                    <p class="text-danger" v-if="error.gender" v-text="error.gender[0]"></p>
                    <select class="form-control" v-model="gender">
                      <option value="" selected disabled>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <!-- <option value="Both">Both</option> -->
                    </select>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12  mb-3">
                  <div class="form-group">
                    <label>Campus</label>
                    <p class="text-danger" v-if="error.campus" v-text="error.campus[0]"></p>
                    <select class="form-control" v-model="campus">
                      <option value="" selected disabled>Select Campus</option>
                      <option value="Banani">Banani</option>
                      <option value="Badda">Badda</option>
                      <option value="Green Road">Green Road</option>
                    </select>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12  mb-3">
                  <div class="form-group">
                    <label>Room Type</label>
                    <p class="text-danger" v-if="error.room_type" v-text="error.room_type[0]"></p>
                    <select class="form-control" v-model="room_type">
                      <option value="" selected disabled>
                        Select Room Type
                      </option>
                      <option value="Plaster">Plaster Floor</option>
                      <option value="Tiles">Tiles Floor</option>
                      <option value="Mosaic ">Mosaic Floor</option>
                    </select>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12  mb-3">
                  <div class="form-group">
                    <label>Available Seat/Room</label>
                    <p class="text-danger" v-if="error.available_seat" v-text="error.available_seat[0]"></p>
                    <input v-model="available_seat" type="number" class="form-control"
                      placeholder="Enter Available seat/room" />
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12  mb-3">
                  <div class="form-group">
                    <label>Available From</label>
                    <p class="text-danger" v-if="error.available_from" v-text="error.available_from[0]"></p>
                    <input v-model="available_from" type="date" class="form-control" placeholder="" />
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12  mb-3">
                  <div class="form-group">
                    <label>Rent Per Seat/Room</label>
                    <p class="text-danger" v-if="error.rent" v-text="error.rent[0]"></p>
                    <input v-model="rent" type="number" class="form-control" placeholder="Enter Rent" />
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12  mb-3">
                  <div class="form-group">
                    <label>Person Per Room</label>
                    <p class="text-danger" v-if="error.person_per_room" v-text="error.person_per_room[0]"></p>
                    <input v-model="person_per_room" type="number" class="form-control"
                      placeholder="Enter Person Per Room" />
                  </div>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-12  mb-3">
                  <div class="d-flex justify-content-between align-items-center">
                    <p class="mb-0 wifi-label">Wifi Available</p>
                    <div class="d-flex align-items-center">
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="wifi" id="wifi-yes" value="Available"
                          v-model="wifi" />
                        <label class="" for="wifi-yes">Yes</label>
                      </div>
                      <div class="form-check form-check-inline" style="margin-left: 20px;">
                        <input class="form-check-input" type="radio" name="wifi" id="wifi-no" value="Not Available"
                          v-model="wifi" />
                        <label class="" for="wifi-no">No</label>
                      </div>
                    </div>
                  </div>
                  <p class="text-danger" v-if="error.wifi" v-text="error.wifi[0]"></p>
                </div>


                <div class="col-lg-6 col-md-6 col-sm-12 mt-2">
                  <div class="d-flex justify-content-between align-items-center">
                    <p>Maid Available</p>
                    <div class="d-flex align-items-center">
                      <div class="form-check form-check-inline">

                      <input class="form-check-input" type="radio" name="maid" id="maid" value="Available"
                        v-model="maid" />
                      <label class="" for="">Yes</label>
                    </div>
                    <div class="form-check form-check-inline" style="margin-left: 20px;">
                      <input class="form-check-input" type="radio" name="maid" id="maid" value="Not Available"
                        v-model="maid" />
                      <label class=""  for="">No</label>
                    </div>

                    </div>
                  </div>
                  <p class="text-danger" v-if="error.maid" v-text="error.maid[0]"></p>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                  <div class="d-flex justify-content-between align-items-center">
                    <p>Fridge Available</p>
                    <div class="d-flex align-items-center mb-3">
                      <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="fridge" id="fridge" value="Available"
                        v-model="fridge" />
                      <label class="" for="">Yes</label>
                    </div>
                    <div class="form-check form-check-inline" style="margin-left: 20px;">
                      <input class="form-check-input" type="radio" name="fridge" id="fridge" value="Not Available"
                        v-model="fridge" />
                      <label class="" for="">No</label>
                    </div>
                    </div>
                  </div>
                  <p class="text-danger" v-if="error.fridge" v-text="error.fridge[0]"></p>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 mt-2">
                  <div class="d-flex justify-content-between align-items-center">
                    <p class="pr-3">Bathroom Type</p>
                    <div class="d-flex align-items-center">
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="bathroom" id="bathroom" value="Attach"
                        v-model="bathroom_type" />
                      <label class="" for="">Attach</label>
                    </div>
                      <div class="form-check form-check-inline" style="margin-left: 20px;">
                      <input class="form-check-input" type="radio" name="bathroom" id="bathroom" value="Common"
                        v-model="bathroom_type" />
                      <label class="" for="">Common</label>
                    </div>
                  </div>
                  </div>
                  <p class="text-danger" v-if="error.bathroom_type" v-text="error.bathroom_type[0]"></p>
                </div>
              </div>

              <div class="form-group mt-3 mb-3" style="margin-bottom: 20px !important;">
                <label>Other Details</label>
                <p class="text-danger" v-if="error.details" v-text="error.details[0]"></p>
                <textarea v-model="details" type="text" class="form-control" placeholder="Enter Details" />
              </div>
              <div class="form-group mb-3">
                <label>Address</label>
                <p class="text-danger" v-if="error.address" v-text="error.address[0]"></p>
                <textarea v-model="address" type="text" class="form-control" placeholder="Enter Address" />
              </div>
            </form>
          </div>

          <div class=" mt-4">
            <button style="margin-left: 0" class="btn btn-primary btn-block" @click="ToLetPublish">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      error: "",
      profile: "",
      type: "",
      gender: "",
      campus: "",
      details: "",
      address: "",
      rent: "",
      available_seat: "",
      available_from: "",
      bathroom_type: "",
      room_type: "",
      wifi: "",
      maid: "",
      fridge: "",
      person_per_room: ""
    };
  },
  mounted() {
    this.getAuthUserProfile();
  },
  methods: {
    async getAuthUserProfile() {
      var token = window.$nuxt.$cookies.get("token");
      return this.$axios
        .get("/student/profile?token=" + token)
        .then(response => {
          this.profile = response.data;
        })
        .catch(error => {
          this.$toast.error(error.response.data.error, {
            icon: "error_outline"
          });
        });
    },
    ToLetPublish() {
      var data = {
        type: this.type,
        gender: this.gender,
        campus: this.campus,
        details: this.details,
        address: this.address,
        rent: this.rent,
        available_seat: this.available_seat,
        available_from: this.available_from,
        person_per_room: this.person_per_room,
        fridge: this.fridge,
        maid: this.maid,
        wifi: this.wifi,
        room_type: this.room_type,
        bathroom_type: this.bathroom_type
      };
      var token = window.$nuxt.$cookies.get("token");
      this.$axios
        .post("/tolet/tolet-publish?token=" + token, data)
        .then(response => {
          this.error = "";
          this.profile = "";
          this.type = "";
          this.gender = "";
          this.campus = "";
          this.details = "";
          this.address = "";
          this.rent = "";
          this.available_seat = "";
          this.available_from = "";
          this.bathroom_type = "";
          this.room_type = "";
          this.wifi = "";
          this.maid = "";
          this.fridge = "";
          this.person_per_room = "";
          this.$toast.success("published Successfully");
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.error = error.response.data;
          } else {
            this.$toast.error("Something Wrong");
          }
        });
    }
  }
};
</script>
