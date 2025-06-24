<template>
  <section>
    <div class=" form-horizontal rounded">
      <div class="form-header">Eligible Improvement Subject</div>
      <div class="px-3 col-lg-8 col-md-8 col-sm-12">
        <div class=" mb-4">
          <div class="form-group focused mb-0">
            <label for="type">Exam Schedule *</label>
            <select v-model="currentExamSchedule" class="custom-select form-control" id="currentExamSchedule"
              name="currentExamSchedule">
              <option selected value="">Select Exam Type</option>
              <option v-for="(currentExamScheduleSingle, key) in currentExamScheduleData" :key="key"
                v-bind:value="currentExamScheduleSingle.id">{{ currentExamScheduleSingle.name }}
              </option>
            </select>
          </div>
        </div>
        <div class=" mb-4">
          <div class="form-group focused mb-0">
            <label for="type">Exam Type *</label>
            <select v-model="type" class="custom-select form-control" id="type" name="type"
              v-on:change="getEligibleSubjects()">
              <option selected value="">Select Exam Type</option>
              <option value="eligible_for_incourse">In-course</option>
              <option value="eligible_for_final">Final</option>
            </select>
          </div>
        </div>
        <div class="text-center" v-if="loading">
          <i class="fa fa-spinner fa-spin fa-4x text-primary"></i>
        </div>
        <div class="text-center py-4">
          <small style="font-size: .98rem; margin-top: 8px;" class="form-text text-danger">&nbsp;NB.: For Vaiva & Thesis
            Improvement you should have to apply both (Final & In-course) otherwise marks will be not updated </small>
        </div>


      </div>

      <div class="table-responsive px-3 p-4" v-if="eligible_for_subjects && eligible_for_subjects.length > 0">
        <table class="table table-bordered mb-0 table-sm">
          <tr>
            <th>SL.</th>
            <th>Course</th>
            <th>Course Marks</th>
            <th>Grade</th>
            <th>Applied Times</th>
            <th>Exam Fee</th>
            <th style="text-align: right;">Apply</th>
          </tr>
          <tr v-for="(course, key) in eligible_for_subjects" :key="key" v-if="eligible_for_subjects">
            <td>{{ key + 1 }}</td>
            <td class="align-middle">
              <p>
                <span>{{ course.name }}</span> <br>
                <strong>Code: </strong>{{ course.code }},
                <strong>Credit: </strong>{{ course.credit }},
                <strong>Type: </strong>{{ course.course_type }}
              </p>
            </td>
            <td class="align-middle">
              <p>
                <strong> Incourse Total: </strong> {{ course.incourse_total }}
                <strong> Final Total: </strong> {{ course.final_total }} <br>
                <strong> Course Total: </strong> {{ course.course_total }}
              </p>
            </td>
            <td class="align-middle">
              <p>
                <strong> Letter Grade: </strong> {{ course.letter_grade }} <br>
                <strong> Grade Point: </strong> {{ course.grade_point }}
              </p>
            </td>

            <td class="align-middle">
              <span v-if="course.applied_times == 0"> Not Applied </span>
              <span v-else-if="course.applied_times == 1"> {{ course.applied_times }} Time </span>
              <span v-else> {{ course.applied_times }} Times </span>

            </td>

            <td class="align-middle" v-if="type == 'eligible_for_incourse'">{{ course.course_fee }}</td>
            <td class="align-middle" v-if="type == 'eligible_for_final'">{{ course.course_fee }}</td>

            <td class="align-middle">
              <button
                v-if="(course.payment_status == 0 && course.applied_in_current_exam_shedule == false) || course.payment_status == null"
                type="submit" class="btn btn-primary btn-sm" @click="applyImprovementRequest(course.id)">Apply
              </button>

              <button v-else-if="(course.payment_status == 0 && course.applied_in_current_exam_shedule == true)"
                type="submit" class="btn btn-danger btn-sm" @click="cancelImprovementRequest(course.id)">Remove
              </button>

              <strong class="text-success" v-else-if="(course.payment_status == 1)">Payment Complete</strong>
            </td>
          </tr>
        </table>
      </div>

      <button class="btn btn-lg btn-primary mt-4 mx-3" v-if="showDownloadButton == true" type="button"
        name="downloadApplication" @click="downloadApplication()">Download Application Form
      </button>
    </div>
  </section>
</template>


<script>
import download from 'downloadjs'

export default {
  data() {
    return {
      eligible_for_subjects: "",
      type: "",
      subject: {
        course: [],
      },
      today: "",
      currentExamScheduleData: "",
      currentExamSchedule: '',
      showDownloadButton: false,
      loading: false,
    }
  },
  mounted() {
    this.today = new Date().toLocaleDateString("fr-CA");
    this.getCurrentImprovementExamSchedule();
  },
  methods: {

    async getCurrentImprovementExamSchedule() {
      var token = window.$nuxt.$cookies.get('token');
      return await this.$axios.get('/get_current_improvement_exam_schedule?token=' + token)
        .then((response) => {
          this.currentExamScheduleData = response.data.data;
        })
        .catch((error) => {
          this.$toast.error('currentExamSchedule Not found', { icon: "error_outline" });
        })
    },
    async getEligibleSubjects() {
      this.showDownloadButton = false;
      this.loading = true;

      if (this.currentExamSchedule == '') {
        this.$toast.error('Select An Exam Schedule', { icon: "error_outline" });
        this.type = '';
        return;
      }

      var token = window.$nuxt.$cookies.get('token');

      if (this.type != '') {
        return await this.$axios.get('/' + this.type + '/' + this.currentExamSchedule + '?token=' + token)
          .then((response) => {
            this.eligible_for_subjects = response.data;

            for (var key in response.data) {
              if (this.showDownloadButton == false && response.data[key].payment_status != null) {
                this.showDownloadButton = true;
              }
            }
          })
          .catch((error) => {
            this.$toast.error('Not found', { icon: "error_outline" });
            this.eligible_for_subjects = null;
          }).finally((final) => {
            this.loading = false;
          });
      } else {
        this.eligible_for_subjects = null;
      }
    },

    // async examScheduleChange() {
    //   this.getEligibleSubjects();
    // },

    async applyImprovementRequest(course_id) {

      if (confirm("Do you really want to apply?")) {
        var token = window.$nuxt.$cookies.get('token');
        var type = '';

        if (this.type == '') {
          return;
        }

        if (this.type == 'eligible_for_incourse') {
          type = 'incourse';
        } else if (this.type == 'eligible_for_final') {
          type = 'final';
        }

        return await this.$axios.post('/apply_improvement_request?token=' + token, {
          'currentExamSchedule_id': this.currentExamSchedule,
          'type': type,
          'course_id': course_id,
        })
          .then((response) => {
            this.getEligibleSubjects();
            this.$toast.success(response.data.success, { icon: "error_outline" });
          })
          .catch((error) => {
            this.$toast.error(error.response.data.error, { icon: "error_outline" });
          })
      }
    },

    async cancelImprovementRequest(course_id) {

      if (confirm("Do you really want to remove?")) {
        var type = '';

        if (this.type == 'eligible_for_incourse') {
          type = 'incourse';
        } else if (this.type == 'eligible_for_final') {
          type = 'final';
        }

        var token = window.$nuxt.$cookies.get('token');
        return await this.$axios.post('/cancel_improvement_request?token=' + token, {
          'currentExamSchedule_id': this.currentExamSchedule,
          'type': type,
          'course_id': course_id
        })
          .then((response) => {
            this.getEligibleSubjects();
            this.$toast.success(response.data.success, { icon: "error_outline" });
          })
          .catch((error) => {
            this.$toast.error(error.response.data.error, { icon: "error_outline" });
          })
      }

    },

    async downloadApplication() {
      var token = window.$nuxt.$cookies.get('token');
      var user = window.$nuxt.$cookies.get('user');

      var type = '';
      var typeMsg = '';

      if (this.type == 'eligible_for_incourse') {
        type = 'incourse';
        typeMsg = 'In-Course';
      } else if (this.type == 'eligible_for_final') {
        type = 'final';
        typeMsg = 'Final';
      }

      if (!user) {
        this.$toast.info('Please login as a student', { icon: "error_outline" });
        return false;
      } else {
        return await this.$axios.get(`/download_application/${this.currentExamSchedule}/${type}?token=${token}`, {
          responseType: 'blob',
        })
          .then((response) => {

            const content = response.headers['content-type'];

            download(response.data, `${type}_improvement_examination_form`, content);

            this.$toast.success(`${typeMsg} Improvement Examination Form Download Successfully`, { icon: "error_outline" });

          })
          .catch((error) => {

            var errors = error.response;
            console.log(errors);

          })
      }
    }
  }
}
</script>
