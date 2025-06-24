<template>
  <section>
    <div class="card rounded">
      <div class="card-body">

        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-12">
              <h4>Staffs Service Feedback Lists</h4>
          </div>

          <div class="col-lg-6 col-md-6 col-sm-12 d-flex justify-content-end mb-3">
            <nuxt-link to="/staffs-service-feedback/create" class="btn btn-primary">Create Feedback</nuxt-link>
          </div>

          <div class="col-12">
            <div class="table-responsive">

              <div class="col-12">
                <table class="table table-striped table-bordered">
                  <thead>
                  <tr>
                    <th>Sl</th>
                    <th>Semester</th>
                    <th>Department</th>
                    <th>Created At</th>
                  </tr>
                  </thead>

                  <tbody>

                  <tr v-for="(row,index) in universityFeedback" :key="index">
                    <td v-text="index+1"></td>
                    <td v-text="row.semester"></td>
                    <td v-text="row.department.name || 'N/A'"></td>
                    <td v-text="row.created_at"></td>
                  </tr>

                  </tbody>
                </table>
              </div>


            </div>
          </div>


        </div>
      </div>
    </div>
  </section>
</template>

<script>
import download from "downloadjs";

export default {
  name: "index",
  data() {
    return {
      universityFeedback: [],
    }
  },

  methods: {
    async getUniversityFeedbackLists() {
      var token = window.$nuxt.$cookies.get('token');

      return await this.$axios.get('/student/staffs-service-feedback' + '?token=' + token)
        .then((response) => {

          // console.log(response.data.data);
          this.universityFeedback = response.data;

        })
        .catch((error) => {
          if (error.response.status == 400) {
            this.$toast.success('Something went wrong.Please try again!.', {icon: "error_outline"});
          } else if (error.response.status == 422) {
            this.$toast.success('Validation Error!.', {icon: "error_outline"});
          } else {
            this.$toast.success('Something went wrong.Please try again!.', {icon: "error_outline"});
          }
        })
    },

  },

  created() {
    this.getUniversityFeedbackLists();
  }
}
</script>

<style scoped>

</style>
