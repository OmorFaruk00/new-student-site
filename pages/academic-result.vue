<template>
  <div class="row bg-image">
    <div class="no-print">
      <form class="form-horizontal p-4 mb-3" id="findBatchMateResultForm" @submit.prevent="findBatchMateResultForm()">
        <div class="form-group">
           <label for="batch_mate_id">Show batch mate result </label>
          <select class="form-control" id="batch_mate_id" name="batch_mate_id" v-model="batch_mate_id" required>
            <option selected value="">Select student name</option>
            <option v-for="(batch_mate, index) in batch_mates" :key="index" :value="batch_mate.id">
              {{ batch_mate.roll_no }} - {{ batch_mate.name }} -
              {{ batch_mate.reg_code }}
            </option>
          </select>         
          <small id="batch_mate_id_help" class="form-text text-danger">&nbsp;</small>
        </div>
        <div class="form-group pb-4">
          <button type="submit" class="btn btn-primary btn-sm">
            Show
            <i v-if="loading" class="fas fa-spinner fa-spin text-primary"></i>
          </button>
        </div>
      </form>
    </div>
    <div class="col-lg-6 col-md-6 col-sm-12">
      <div class="result transcriptPrint" v-if="results.student_info.name && !isloading" id="transcriptPrint">
        <div class="header">
          <div class="title">
            <img src="/images/diu.png" alt="logo" style="height: 70px; width: 300px; margin-left: -20px" />
            <!-- <span class="logo ">Dhaka International University
                        </span> -->
          </div>
          <div class="subtitle">
            <div><strong>Academic</strong></div>
            <div><strong>Transcript</strong></div>
          </div>
        </div>

        <div class="sub-header">
          ACADEMIC TRANSCRIPT ACADEMIC TRANSCRIPT ACADEMIC TRANSCRIPT ACADEMIC
          TRANSCRIPT ACADEMIC TRANSCRIPT ACADEMIC TRANSCRIPT
        </div>

        <div class="px-4 py-3 result-content">
          <table style="width: 100%; padding: 5px 0px">
            <tr>
              <td style="text-align: left">
                <div>
                  <strong>Name: {{ results.student_info.name }}</strong>
                </div>
                <div>
                  <strong>Reg: {{ results.student_info.reg_code }}</strong>
                </div>
              </td>
              <td style="text-align: right">
                <div class="">
                  <div>
                    <strong>Roll: {{ results.student_info.roll_no }}</strong>
                  </div>
                  <div>
                    <strong>Session: {{ results.student_info.session_name }}</strong>
                  </div>
                </div>
              </td>
            </tr>
          </table>
          <hr style="margin-bottom: -1px; margin-top: -5px" />

          <div class="">
            <div v-for="(transcript, index) in results.transcript_data.semesters" :key="index">
              <div class="table-responsive table-bg" v-for="(semesters, semesterIndex) in transcript" :key="semesterIndex">
                <table class="table table-sm">
                  <thead>
                    <tr>
                      <td class="issue" style="text-align: left" colspan="5">
                        <strong>Semester : {{ semesters.semester }}</strong>
                      </td>
                    </tr>
                    <tr>
                      <th style="text-align: left">Course No</th>
                      <th style="text-align: left">Course Title</th>
                      <th>Credit Hours</th>
                      <th v-if="semesters.exempted == 0">Incourse</th>
                      <th v-if="semesters.exempted == 0">Final</th>
                      <th>Grade Earned</th>
                      <th>Grade Point</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="
                      semesters.allocated_courses !=
                      'Semester or Marks not exists' &&
                      semesters.allocated_courses !=
                      'Please, clear Due to show result'
                    " v-for="(
course, courseIndex
                      ) in semesters.allocated_courses" :key="courseIndex">
                      <td style="text-align: left">{{ course.code }}</td>
                      <td style="text-align: left">{{ course.name }}</td>
                      <td>{{ course.credit }}</td>
                      <td v-if="semesters.exempted == 0">
                        {{ course.marks.conti_total }}
                      </td>
                      <td v-if="semesters.exempted == 0">
                        {{ course.marks.final_total }}
                      </td>
                      <td>
                        <span v-if="semesters.exempted == 0">{{
                          course.marks.letter_grade
                          }}</span><span v-else>Exempted</span>
                      </td>
                      <td style="text-align: right">
                        <span v-if="semesters.exempted == 0">{{
                          course.marks.grade_point | numFormat("0.00")
                          }}</span><span v-else>Exempted</span>
                      </td>
                    </tr>
                    <tr v-if="
                      semesters.allocated_courses ==
                      'Semester or Marks not exists'
                    ">
                      <td colspan="7" class="text-center">
                        Semester or Marks not exists
                      </td>
                    </tr>
                    <tr v-if="
                      semesters.allocated_courses ==
                      'Please, clear Due to show result'
                    ">
                      <td colspan="7" class="text-center">
                        Please, clear Due to show result
                      </td>
                    </tr>
                    <tr v-if="
                      semesters.allocated_courses !=
                      'Semester or Marks not exists' &&
                      semesters.allocated_courses !=
                      'Please, clear Due to show result'
                    ">
                      <th style="text-align: left">
                        Subject: {{ semesters.total_subject }}
                      </th>
                      <th></th>
                      <th>Total Credit: {{ semesters.total_credit }}</th>
                      <th></th>
                      <th></th>
                      <th>Avg. Grade: {{ semesters.average_grade }}</th>
                      <th style="text-align: right">
                        GPA:
                        {{ semesters.total_semester_gpa | numFormat("0.00") }}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="table-responsive">
            <table>
              <tr>
                <th style="text-align: left">Total Result</th>
              </tr>

              <tr>
                <td style="text-align: left">
                  <span>Total Credit Required:<b>
                      {{
                        results.transcript_data.results.total_credit_required
                      }}</b></span>
                  <span>Credit Exempted:<b>
                      {{ results.transcript_data.results.exempted_credit }}</b></span>
                  <span>Credit Earned:<b>
                      {{
                        results.transcript_data.results.total_credit_earned
                      }}</b></span>
                  <span>Average Grade:<b>
                      {{ results.transcript_data.results.grade_letter }}</b></span>
                  <span>CGPA:<b>
                      {{
                        results.transcript_data.results.cgpa | numFormat("0.00")
                      }}</b></span>
                </td>
              </tr>
            </table>
          </div>

          <button :disabled="isdownload" type="button" class="btn btn-primary btn-sm no-print" id="printButton"
            @click="printButton">
            <i class="fa fa-print"> </i> &nbsp;Print
            <i v-if="isdownload" class="fa fa-spinner fa-spin ml-1"></i>
          </button>
        </div>
      </div>
      <div v-if="isloading" class="text-center mt-5">
        <i class="fa fa-spinner fa-spin fa-4x text-primary"></i>
      </div>
    </div>
    <div class="col-lg-6 col-md-6 col-sm-12">
      <div v-if="loading" class="text-center mt-5">
        <i class="fa fa-spinner fa-spin fa-4x text-primary"></i>
      </div>
      <div class="result" v-if="batch_mate_results.student_info.name && !loading">
        <div class="header px-4">
             <div class="title">
            <img src="/images/diu.png" alt="logo" style="height: 70px; width: 300px; margin-left: -20px" />
            
          </div>
          <div class="subtitle">
            <div><strong>Academic</strong></div>
            <div><strong>Transcript</strong></div>
          </div>
        </div>

        <div class="sub-header">
          ACADEMIC TRANSCRIPT ACADEMIC TRANSCRIPT ACADEMIC TRANSCRIPT ACADEMIC
          TRANSCRIPT ACADEMIC TRANSCRIPT ACADEMIC TRANSCRIPT
        </div>

        <div class="px-4 py-3 result-content">
    
               <table style="width: 100%; padding: 5px 0px">
            <tr>
              <td style="text-align: left">
                <div>
                  <strong>Name: {{ batch_mate_results.student_info.name }}</strong>
                </div>
                <div>
                  <strong>Reg: {{ batch_mate_results.student_info.reg_cod }}</strong>
                </div>
              </td>
              <td style="text-align: right">
                <div class="">
                  <div>
                    <strong>Roll: {{ batch_mate_results.student_info.roll_no }}</strong>
                  </div>
                  <div>
                    <strong>Session: {{ batch_mate_results.student_info.session_name }}</strong>
                  </div>
                </div>
              </td>
            </tr>
          </table>
          <hr>

          <div v-for="(transcript, transcriptIndex) in batch_mate_results
            .transcript_data.semesters" :key="transcriptIndex">
            <div class="table-responsive table-bg" v-for="(semesters, semestersIndex) in transcript"
              :key="semestersIndex">
              <table class="table">
                <thead>
                  <tr>
                    <td class="issue" style="text-align: left" colspan="5">
                      <strong>Semester : {{ semesters.semester }}</strong>
                    </td>
                  </tr>
                  <tr>
                    <th style="text-align: left">Course No</th>
                    <th style="text-align: left">Course Title</th>
                    <th>Credit Hours</th>
                    <th v-if="semesters.exempted == 0">Incourse</th>
                    <th v-if="semesters.exempted == 0">Final</th>
                    <th>Grade Earned</th>
                    <th>Grade Point</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="
                    semesters.allocated_courses !=
                    'Semester or Marks not exists' &&
                    semesters.allocated_courses !=
                    'Please, clear Due to show result'
                  " v-for="(course, courseIndex) in semesters.allocated_courses" :key="courseIndex">
                    <td style="text-align: left">{{ course.code }}</td>
                    <td style="text-align: left">{{ course.name }}</td>
                    <td>{{ course.credit }}</td>
                    <td v-if="semesters.exempted == 0">
                      {{ course.marks.conti_total }}
                    </td>
                    <td v-if="semesters.exempted == 0">
                      {{ course.marks.final_total }}
                    </td>
                    <td>
                      <span v-if="semesters.exempted == 0">{{
                        course.marks.letter_grade
                        }}</span><span v-else>Exempted</span>
                    </td>
                    <td style="text-align: right">
                      <span v-if="semesters.exempted == 0">{{
                        course.marks.grade_point | numFormat("0.00")
                        }}</span><span v-else>Exempted</span>
                    </td>
                  </tr>
                  <tr v-if="
                    semesters.allocated_courses ==
                    'Semester or Marks not exists'
                  ">
                    <td colspan="7" class="text-center">
                      Semester or Marks not exists
                    </td>
                  </tr>
                  <tr v-if="
                    semesters.allocated_courses ==
                    'Please, clear Due to show result'
                  ">
                    <td colspan="7" class="text-center">
                      Please, clear Due to show result
                    </td>
                  </tr>
                  <tr v-if="
                    semesters.allocated_courses !=
                    'Semester or Marks not exists' &&
                    semesters.allocated_courses !=
                    'Please, clear Due to show result'
                  ">
                    <th style="text-align: left">
                      Subject: {{ semesters.total_subject }}
                    </th>
                    <th></th>
                    <th>Total Credit: {{ semesters.total_credit }}</th>
                    <th></th>
                    <th></th>
                    <th>Avg. Grade: {{ semesters.average_grade }}</th>
                    <th style="text-align: right">
                      GPA:
                      {{ semesters.total_semester_gpa | numFormat("0.00") }}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="table-responsive">
            <table v-if="
              batch_mate_results.transcript_data.results.total_credit_required
            ">
              <tr>
                <th style="text-align: left">Total Result</th>
              </tr>

              <tr>
                <td style="text-align: left">
                  <span>Total Credit Required:<b>
                      {{
                        batch_mate_results.transcript_data.results
                          .total_credit_required
                      }}</b></span>
                  <span>Credit Exempted:<b>
                      {{
                        batch_mate_results.transcript_data.results
                          .exempted_credit
                      }}</b></span>
                  <span>Credit Earned:<b>
                      {{
                        batch_mate_results.transcript_data.results
                          .total_credit_earned
                      }}</b></span>
                  <span>Average Grade:<b>
                      {{
                        batch_mate_results.transcript_data.results.grade_letter
                      }}</b></span>
                  <span>CGPA:<b>
                      {{ batch_mate_results.transcript_data.results.cgpa }}</b></span>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import print from 'print-js';
import Vue from "vue";
import numeral from "numeral";
import numFormat from "vue-filter-number-format";
import download from "downloadjs";

Vue.filter("numFormat", numFormat(numeral));
export default {
  // middleware: 'feedbackAuthenticated',
  data() {
    return {
      results: {
        transcript_data: {
          results: {
            total_credit_required: "",
            total_credit_earned: "",
            cgpa: "",
            grade_letter: "",
          },
        },
        student_info: {
          name: "",
        },
      },
      batch_mate_results: {
        transcript_data: {
          results: {
            total_credit_required: "",
            total_credit_earned: "",
            cgpa: "",
            grade_letter: "",
          },
        },
        student_info: {
          name: "",
        },
      },
      semesters: [],
      batch_mates: [],
      batch_mate_id: "",
      loading: false,
      isloading: true,
      isdownload: false,
      batchMateResultloading: false,
    };
  },
  mounted() {
    this.getProvisionalResult();
    this.getBatchMate();
  },
  methods: {
    async getProvisionalResult() {
      var token = window.$nuxt.$cookies.get("token");
      var user = window.$nuxt.$cookies.get("user");
      return await this.$axios
        .get("/provisional_result/" + user.id + "?token=" + token)
        .then((response) => {
          this.isloading = false;
          this.results = response.data;
        })
        .catch((error) => {
          if (error.response.status == 400) {
            console.log(error.response.data.message, "getProvisionalResult");
            this.$toast.error(error.response.data.message, {
              icon: "error_outline",
            });
            return;
          }
          this.$toast.error("Not found", { icon: "error_outline" });
        });
    },

    async getBatchMate() {
      var token = window.$nuxt.$cookies.get("token");
      var user = window.$nuxt.$cookies.get("user");
      return await this.$axios
        .get("/student_batch_mate/" + user.id + "?token=" + token)
        .then((response) => {
          this.batch_mates = response.data;
        })
        .catch((error) => {
          this.$toast.error("Batch mate Not found", { icon: "error_outline" });
        });
    },

    async findBatchMateResultForm() {
      if (!this.batch_mate_id) {
        this.$toast.error("Select batch mate!", { icon: "error_outline" });
        return;
      }

      var token = window.$nuxt.$cookies.get("token");
      this.loading = true;
      this.batchMateResultloading = true;
      return await this.$axios
        .get("/provisional_result/" + this.batch_mate_id + "?token=" + token)
        .then((response) => {
          this.batch_mate_results = response.data;
        })
        .catch((error) => {
          if (error.response.status == 400) {
            console.log(error.response.data.message, "findBatchMateResultForm");
            this.$toast.error(error.response.data.message, {
              icon: "error_outline",
            });
            return;
          }

          this.$toast.error(error.response.data.message, {
            icon: "error_outline",
          });
        })
        .finally((final) => {
          this.loading = false;
          this.batchMateResultloading = false;
        });
    },

    async printButton() {
      this.isdownload = true;
      var token = window.$nuxt.$cookies.get("token");
      var user = window.$nuxt.$cookies.get("user");

      return await this.$axios
        .get("/provisional_result_print/" + user.id + "?token=" + token, {
          responseType: "blob",
        })
        .then((response) => {
          const content = response.headers["content-type"];
          download(response.data, "academic transcript", content);

          this.$toast.success("Result  Download Successfully", {
            icon: "error_outline",
          });
        })
        .catch((error) => {
          var errors = error.response;
          console.log(errors);
        })
        .finally(() => {
          this.isdownload = false;
        });
    },
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  font-size: 12px;
  margin: 0;
  padding: 0;
}

.result {
  background: #ebf5ec;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 0px 8px;
}

.table-bg {
  background-image: url("/images/white-logo.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 30% 100px;
}

.result-content {}

.header {
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header .logo {
  background: #000;
  color: white;
  padding: 5px 10px;
  font-weight: bold;
  margin-right: 10px;
  height: 40px;
}

.header .title {
  font-size: 20px;
  font-weight: bold;
}

.header .subtitle {
  text-align: right;
  color: #000;
  font-size: 22px;
  font-weight: bold;
  padding-top: 10px;
}

@media (max-width: 1400px) {
  .header .title {
    font-size: 12px;
  }

  .header .logo {
    padding: 12px 10px;
  }

  .header .subtitle {
    font-size: 12px;
  }
}

/* @media print {
  .no-print {
    display: none !important;
  }
} */

.sub-header {
  background: #28a745;
  color: white;
  text-align: center;
  padding: 3px 0;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 1px;
  white-space: nowrap;
  overflow: hidden;
  margin-bottom: -10px;
  margin-top: -10px;
}

.info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.info p {
  line-height: 15px;
}

.info div {
  width: 48%;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  border: none;
}

table th,
table td {
  border: none;
  padding: 1px;
  text-align: right;
  font-size: 12px;
}

.issue {
  margin-top: 20px;
  font-size: 14px;
}

.footer {
  text-align: left;
  font-size: 12px;
  margin: 30px 20px 10px 20px;
  display: flex;
  justify-content: space-between;
}

.page-number {
  text-align: right;
  margin: 0 20px 10px 20px;
  font-size: 11px;
}

.watermark {
  position: absolute;
  top: 300px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.05;
  font-size: 100px;
  z-index: 0;
}
</style>