<template>
  <div >
    <div class="row">
      <div class="col-lg-8 col-md-8 col-sm-12 ">
        <div class="row g-3 mb-3">
          <div class="col-lg-4 col-md-4 col-sm-12">
            <div class="bg-white shadow-sm p-3 rounded d-flex justify-content-start align-items-center"
              style="height:100px;">
              <div class="payment  d-flex justify-content-center align-items-center me-2"
                style="background-color: #2563eb;">
                <i class="fa fa-file-text text-white"></i>
              </div>
              <div>
                <h5 v-if="dashboard.account" class="mb-0 fw-bold text-dark pt-1">৳{{
                  dashboard.account.total_paid.toFixed(2) }}</h5>
                <small class="text-muted fw-bold">Total Paid</small>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-12">
            <div class="bg-white shadow-sm p-3 rounded d-flex justify-content-start align-items-center"
              style="height:100px;">
              <div class="payment d-flex justify-content-center align-items-center me-2"
                style=" background-color: orange;">
                <i class="fa fa-file-text text-white"></i>
              </div>
              <div>
                <h5 v-if="dashboard.account" class="mb-0 fw-bold text-dark pt-1">৳{{
                  dashboard.account.current_due.toFixed(2) }}</h5>
                <small class="text-muted fw-bold">Current Due</small>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-12">
            <div class="bg-white shadow-sm p-3 rounded d-flex justify-content-start align-items-center"
              style="height:100px;">
              <div class="payment  d-flex justify-content-center align-items-center me-2"
                style="background-color: #000;">
                <i class="fa fa-file-text text-white"></i>
              </div>
              <div>
                <h5 v-if="dashboard.account" class="mb-0 fw-bold text-dark pt-1">৳{{
                  dashboard.account.total_due.toFixed(2) }}</h5>
                <small class="text-muted fw-bold">Total Due</small>
              </div>
            </div>
          </div>
          <div class="col-lg-8 col-md-8 col-sm-12">
            <div class="bg-white shadow-sm rounded">
              <h4 class="fw-semibold p-3">Semester’s Grade</h4>
              <hr>
              <div style="height: 250px">
                <canvas id="semesterChart" class="p-3"></canvas>
              </div>
              <div v-if="isResult" class="d-flex justify-content-center align-items-center pb-4">
                <i class="fa fa-spinner fa-spin fa-4x text-primary"></i>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-12">
            <div class="bg-white shadow-sm rounded h-100">
              <h4 class="fw-semibold p-3">Summary</h4>
              <hr />
              <div v-if="dashboard.result" class="p-3">
                <div class="d-flex justify-content-between mb-2">
                  <span class="fw-semibold">
                    <i class="fa fa-star me-2 text-muted"></i>GPA
                  </span>
                  <span class="fw-bold text-dark">{{ dashboard.result.cgpa }}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span class="fw-semibold">
                    <i class="fa fa-file-text me-2 text-muted"></i>Average Grade
                  </span>
                  <span class="fw-bold text-dark">{{ dashboard.result.grade_letter }}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span class="fw-semibold">
                    <i class="fa fa-file-text text-muted me-2"></i>Total Credit
                  </span>
                  <span class="fw-bold text-dark">{{ dashboard.result.total_credit_earned }}</span>
                </div>
                <div class="d-flex justify-content-between">
                  <span class="fw-semibold">
                    <i class="fa fa-file-text text-muted me-2"></i>Credit Exempted
                  </span>
                  <span class="fw-bold text-dark">{{ dashboard.result.exempted_credit }}</span>
                </div>
              </div>
              <div v-if="loading" class="d-flex justify-content-center align-items-center pb-4">
                <i class="fa fa-spinner fa-spin fa-4x text-primary"></i>
              </div>
            </div>
          </div>
          <div class="col-lg-8 col-md-8 col-sm-12">
            <div class="bg-white shadow-sm rounded pb-4">
              <h4 class="fw-semibold p-3">Your Overall Performance This Semester</h4>
              <hr>
              <h4 class="px-3">Class Attendance: 46/50</h4>
              <hr>
              <h4 class="px-3">Quiz Taken: 11/12</h4>
              <hr>
              <h4 class="px-3">Assignment Submited: 21/25</h4>
              <hr>
              <h4 class="px-3">Presentation Completed: 46/50</h4>
              <hr>
              <h4 class=""></h4>
            </div>

          </div>

          <div class="col-lg-4 col-md-4 col-sm-12">
            <div class="bg-white shadow-sm rounded h-100">
              <h4 class="fw-semibold p-3">Attendance</h4>
              <hr>

              <div class="attendence-progress blue">
                <span class="attendence-progress-left">
                  <span class="attendence-progress-bar"></span>
                </span>
                <span class="attendence-progress-right">
                  <span class="attendence-progress-bar"></span>
                </span>
                <div class="attendence-progress-value">70%</div>
              </div>

              <div class="pt-4 p-3">
                <div class="d-flex justify-content-between">
                  <p class="progress-title">Present</p>
                  <p class="progress-title">{{ present }}</p>
                </div>
                <div class="progress green">
                  <div class="progress-bar" :style="{ width: present + '%', background: '#5fad56 !important' }">
                  </div>
                </div>
                <div class="d-flex justify-content-between">
                  <p class="progress-title">Absent</p>
                  <p class="progress-title">{{ absent }}</p>
                </div>
                <div class="progress  pink">
                  <div class="progress-bar" :style="{ width: absent + '%', background: '#ff4b7d !important' }">
                  </div>
                </div>
                <div class="d-flex justify-content-between">
                  <p class="progress-title">Permission</p>
                  <p class="progress-title">02</p>
                </div>
                <div class="progress green">
                  <div class="progress-bar" style=" width:20%; background: #5fad56 !important">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <div class="bg-white shadow-sm rounded  mb-3">
          <h4 class="fw-semibold p-3">Announcements</h4>
          <hr>
          <div class="announcement px-3 pb-3 pt-1">
            <div v-if="dashboard.notice">
              <p v-for="notice in dashboard.notice" :key="notice.id">
                <a :href="'/announcement/' + notice.slug" class="text-decoration-none text-dark">
                  <span class="me-2 text-dark">●</span>{{ notice.title }}
                </a>
              </p>
              <nuxt-link to="/announcement" class="btn-see"> See More</nuxt-link>
            </div>
            <div v-if="loading" class="d-flex justify-content-center align-items-center pb-4">
              <i class="fa fa-spinner fa-spin fa-4x text-primary"></i>
            </div>
          </div>
        </div>

        <div class="bg-white shadow-sm  rounded" v-if="dashboard.routine" style="height: 330px;">
          <h4 class="fw-semibold p-3">Today's Class Update</h4>
          <hr>
          <ul class="list-unstyled small mb-0 p-5">
            <li v-for="routine in dashboard.routine" :key="routine.id">
              <span class="fw-semibold">{{ routine.course_name }} ({{ routine.course_code }})</span> <br>
              <span class=" me-2">Today, {{ routine.start_time }} - {{ routine.end_time }} &nbsp; &nbsp; Room: {{
                routine.room }}</span>
            </li>


          </ul>
        </div>

      </div>

    </div>




  </div>

</template>
<script>
export default {
  mounted() {
    this.getData().then(() => {
      this.drowChart();
    });
  },
  data() {
    return {
      present: 60,
      absent: 40,
      dashboard: '',
      semesterList: [],
      cgpaList: [],
      isResult: true,
      loading: true,

    }
  },
  methods: {
    async getData() {
      var token = window.$nuxt.$cookies.get("token");
      var user = window.$nuxt.$cookies.get("user");
      return await this.$axios
        .get("/student/dashboard/" + user.id + "?token=" + token)
        .then((response) => {
          this.dashboard = response.data;
          console.log(response.data)

        })
        .catch((error) => {
          if (error.response.status == 400) {
            this.$toast.error(error.response.data.message, {
              icon: "error_outline",
            });
            return;
          }
          this.$toast.error("Not found", { icon: "error_outline" });
        }).finally((final) => {
          this.isResult = false;
          this.loading = false;
        });
    },

    drowChart() {
      const ctx = document.getElementById('semesterChart').getContext('2d');

      const semesterChart = new Chart(ctx, {
        type: 'bar',

        data: {
          labels: this.dashboard.result.semester_list,
          datasets: [{
            label: 'GPA',
            data: this.dashboard.result.cgpa_list,
            backgroundColor: '#4CAF50',
            borderRadius: 5, barThickness: 10,
            maxBarThickness: 10
          }],

        },
        options: {
          responsive: true,             // chart resizes with screen
          maintainAspectRatio: false,  // allows fixed height
          scales: {
            y: {
              beginAtZero: true,
              max: 4.0,
              ticks: {
                stepSize: 0.2
              }
            }

          }
        }
      });
    }
  }
};
</script>
