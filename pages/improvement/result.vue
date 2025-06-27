<template>
  <section>
    <div class="card rounded db-gp form-horizontal rouded">
      <div class="form-header">Improvement Exam Result</div>

      <div class="card-body" v-if='examSchedules==null'>
        <div class="text-center text-danger">
          You Have Not Applied Any Improvement Exam
        </div>
      </div>
      <div class="card-body col-lg-8 col-md-8 col-sm-12" v-if='examSchedules!=null'>
        <div class="form-group focused mb-0">
          <label for="type">Exam Schedule *</label>
          <select v-model="selectedExamSchedule_id" class="custom-select form-control" id="selectedExamSchedule_id"
                  name="currentExamSchedule" v-on:change="examScheduleChange()">
            <option selected disabled value="">Select Improvement Exam</option>
            <option v-for="(examSchedule, key, index) in examSchedules" v-bind:value="examSchedule.id">
              {{ examSchedule.name }}
            </option>
          </select>

        </div>
        <br>
      </div>
        <div class="text-center" v-if="loading">
          <i class="fa fa-spinner fa-spin fa-4x text-primary"></i>
        </div>

     <div class="table-responsive px-3">
      <table class="table table-bordered mb-4 table-sm" v-if='impResults!=null'>
        <tr>
          <th>SL.</th>
          <th>Course</th>
          <th>Incourse/Final Total</th>
          <th>Course Total</th>
          <th>Letter Grade</th>
          <th>Grade Point</th>
        </tr>
        <tr v-for="(course, key, index) in impResults" v-if="impResults!=null">
          <td>{{ key + 1 }}</td>
          <td class="align-middle">
            <p>
              <span> {{ course.name }}</span><br>
              <strong>Code: </strong>{{ course.code }},
              <strong>Credit: </strong>{{ course.credit }},
              <strong>Type: </strong>{{ course.course_type }}
            </p>
          </td>
          <td class="align-middle">
            <p>
              <strong> Incourse Total: </strong> {{ course.incourse_total }}
              <strong> Final Total: </strong> {{ course.final_total }}
            </p>
          </td>
          <td class="align-middle">
            <p>
              {{ course.course_total }}
            </p>
          </td>
          <td class="align-middle">
            <p>
              {{ course.letter_grade }} <br>
            </p>
          </td>
          <td class="align-middle">
            <p>
              {{ course.grade_point }}
            </p>
          </td>
        </tr>


      </table>

     </div>

    </div>
  </section>
</template>


<script>
export default {
  data() {
    return {
      examSchedules: null,
      impResults: null,
      selectedExamSchedule_id: "",
      loading:false,
    }
  },
  mounted() {
    this.getAppliedImprovementExamSchedule();
  },
  methods: {
    async examScheduleChange() {
      var token = window.$nuxt.$cookies.get('token');
      this.impResults = null;
      this.loading = true;

      if (this.selectedExamSchedule_id == '') {
        return;
      }
      return await this.$axios.post('/get_improvement_marksheet_for_student?token=' + token, {
        'selectedExamSchedule_id': this.selectedExamSchedule_id,
      })
        .then((response) => {
          // console.log("get_improvement_marksheet_for_student", response.data.data);
          this.impResults = response.data.data;
        })
        .catch((error) => {
          this.$toast.error('No Result found', {icon: "error_outline"});
        }).finally((final) => {
            this.loading = false;
          });
    },


    async getAppliedImprovementExamSchedule() {
      var token = window.$nuxt.$cookies.get('token');
      return await this.$axios.get('/get_applied_improvement_exam_schedule?token=' + token)
        .then((response) => {
          // console.log('get_applied_improvement_exam_schedule', response.data.data);
          this.examSchedules = response.data.data;
        })
        .catch((error) => {
          this.$toast.error('ExamSchedule Not Found!', {icon: "error_outline"});
        })
    }
  }
}
</script>
