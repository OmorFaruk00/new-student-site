<template>
  <div class=" card ">
    <div class="card-header">
      <h3 class="text-center">To-Let Request</h3>

    </div>
    <div v-if="requests.length > 0" class="table-responsive p-3">

      <table class="table table-striped table-bordered text-left card-body">
        <thead>
          <tr>
            <th scope="row">Request By</th>
            <th scope="row">Email</th>
            <th scope="row">Contact</th>
            <th scope="row">For Seat</th>
            <th scope="row" class="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="request in requests" :key="request.id">
            <td>{{ request.requested_by }}</td>
            <td>{{ request.email }}</td>
            <td>{{ request.phone }}</td>
            <td>{{ request.seat }}</td>
            <td v-if="request.status == 1">
              <h5 class="text-center text-primary">Confirmed</h5>
            </td>
            <td v-else-if="request.status == 2">
              <h5 class="text-center text-danger">Reject</h5>
            </td>
            <td v-else-if="request.status == 0 && request.creater_id == profile.id">
              <button :disabled="loading" class="btn btn-primary" @click="AcceptRequest(request.id)">
                Accept
              </button>
              <button :disabled="loading" class="btn btn-danger" @click="RejectRequest(request.id)">
                Reject
              </button>
            </td>
            <td v-else-if="
              request.status == 0 && request.requester_id == profile.id
            ">
              <h5 class="text-center text-warning">Pending...</h5>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <h2 class="text-center pb-3">No Request Found</h2>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      profile: "",
      requests: "",
      loading: false,
    };
  },
  mounted() {
    this.getAuthUserProfile();
  },

  methods: {
    getAuthUserProfile() {
      var token = window.$nuxt.$cookies.get("token");
      this.$axios
        .get("/student/profile?token=" + token)
        .then(response => {
          this.profile = response.data;
          this.getToletRequest();
        })
        .catch(error => {
          this.$toast.error(error.response.data.error, {
            icon: "error_outline"
          });
        });
    },

    getToletRequest() {
      var token = window.$nuxt.$cookies.get("token");
      var id = this.profile.id;
      return this.$axios
        .get("/getrequest/" + id + "?token=" + token)
        .then(response => {
          this.requests = response.data;
        })
        .catch(error => {
          this.$toast.error(error.response.data.error, {
            icon: "error_outline"
          });
        });
    },
    AcceptRequest(request_id) {
      this.loading = true
      var token = window.$nuxt.$cookies.get("token");
      this.$axios
        .post("/tolet/tolet-accept/" + request_id + "?token=" + token)
        .then(response => {
          this.$toast.success("Request Accepted");
          this.getToletRequest();
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.error = error.response.data;
          } else {
            this.$toast.error("Something Wrong");
          }
        }).finally(() => {
          this.loading = false
        });
    },
    RejectRequest(request_id) {
      this.loading = true
      var token = window.$nuxt.$cookies.get("token");
      this.$axios
        .post("/tolet/requestreject/" + request_id + "?token=" + token)
        .then(response => {
          this.$toast.success("Request Rejected");
          this.getToletRequest();
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.error = error.response.data;
          } else {
            this.$toast.error("Something Wrong");
          }
        }).finally(() => {
          this.loading = false
        });;
    }
  }
};
</script>
