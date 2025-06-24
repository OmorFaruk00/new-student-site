<template>
  <section>
    <div class="card">
      <div class="card-body">

        <div class="row">
       <div class="d-flex justify-content-between pb-3">
        <div class="">
              <h4>Teachers Service Feedback Lists</h4>
          </div>

          <div class="">
            <nuxt-link to="/teachers-service-feedback/create" class="btn btn-primary">Create Feedback</nuxt-link>
          </div>
       </div>

          <div class="col-12">
            <div class="table-responsive">

              <div class="col-12">
                <table class="table table-striped table-bordered">
                  <thead>
                  <tr>
                    <th>Sl</th>
                    <th>Semester</th>
                    <th>Course</th>
                    <th>Teacher</th>
                    <th>Created At</th>
                  </tr>
                  </thead>

                  <tbody>

                  <tr v-for="(row,index) in teachersFeedback" :key="index">
                    <td v-text="index+1"></td>
                    <td v-text="row.semester"></td>
                    <td v-html="`${row.course_code} / ${row.course_name}`"></td>
                    <td v-text="row.teacher_name"></td>
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

export default {
  name: "index",
  data() {
    return {
      teachersFeedback: [],
    }
  },

  methods: {
    async getTeacherFeedbackLists() {
      var token = window.$nuxt.$cookies.get('token');

      return await this.$axios.get('/student/teacher-service-feedback' + '?token=' + token)
        .then((response) => {

          this.teachersFeedback = response.data.data;

        })
        .catch((error) => {
          if (error.response.status == 400) {
            this.$toast.success('Something went wrong.Please try again!.', {icon: "error_outline"});
          } else if (error.response.status == 422) {
            // this.$toast.success('Validation Error!.', {icon: "error_outline"});
          } else {
            this.$toast.success('Something went wrong.Please try again!.', {icon: "error_outline"});
          }
        })
    },

  },

  created() {
    this.getTeacherFeedbackLists();
  }
}
</script>

<style scoped>

</style>
