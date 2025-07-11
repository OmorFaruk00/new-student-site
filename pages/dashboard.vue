<template>
  <div>
    <ImprovementAlert />
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
              <div v-if="loading" class="d-flex justify-content-center align-items-center pb-4">
                <i class="fa fa-spinner fa-spin fa-4x text-primary"></i>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-12">
            <div class="bg-white shadow-sm rounded h-100">
              <h4 class="fw-semibold p-3">Summary</h4>
              <hr />
              <div class="summary-card" v-if="dashboard.result">
                <div class="summary-row">
                  <span class="icon"><i class="fa fa-star"></i></span>
                  <span class="label">GPA</span>
                  <span class="value">: {{ dashboard.result.cgpa }}</span>
                </div>
                <div class="summary-row">
                  <span class="icon"><i class="fa fa-file-text"></i></span>
                  <span class="label">Average Grade</span>
                  <span class="value">: {{ dashboard.result.grade_letter }}</span>
                </div>
                <div class="summary-row">
                  <span class="icon"><i class="fa fa-file-text"></i></span>
                  <span class="label">Total Credit</span>
                  <span class="value">: {{ dashboard.result.total_credit_earned }}</span>
                </div>
                <div class="summary-row">
                  <span class="icon"><i class="fa fa-file-text"></i></span>
                  <span class="label">Credit Exempted</span>
                  <span class="value">: {{ dashboard.result.exempted_credit }}</span>
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
              <h4 class="px-3">Class Attendance: 0/0</h4>
              <hr>
              <h4 class="px-3">Quiz Taken: 0/0</h4>
              <hr>
              <h4 class="px-3">Assignment Submited: 0/0</h4>
              <hr>
              <h4 class="px-3">Presentation Completed: 0/0</h4>
              <hr>
              <h4 class=""></h4>
            </div>

          </div>

          <div class="col-lg-4 col-md-4 col-sm-12">
            <div class="bg-white shadow-sm rounded h-100">
              <h4 class="fw-semibold p-3">Attendance</h4>
              <hr>
              <div v-if="dashboard.attendance">
                <div class="d-flex justify-content-center">
                  <div class="circle_percent" :data-percent="dashboard.attendance.attendancePercentage">
                    <div class="circle_inner">
                      <div class="round_per"></div>
                    </div>
                  </div>
                </div>
                <div class="pt-4 p-3">
                  <div class="d-flex justify-content-between">
                    <p class="progress-title">Present</p>
                    <p class="progress-title">{{ dashboard.attendance.totalPresent }}</p>
                  </div>
                  <div class="progress green">
                    <div class="progress-bar"
                      :style="{ width: dashboard.attendance.totalPresent + '%', background: '#5fad56 !important' }">
                    </div>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p class="progress-title">Absent</p>
                    <p class="progress-title">{{ dashboard.attendance.totalAbsent }}</p>
                  </div>
                  <div class="progress  pink">
                    <div class="progress-bar"
                      :style="{ width: dashboard.attendance.totalAbsent + '%', background: '#ff4b7d !important' }">
                    </div>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p class="progress-title">Total Class</p>
                    <p class="progress-title">{{ dashboard.attendance.classHappendCount }}</p>
                  </div>
                  <div class="progress green">
                    <div class="progress-bar"
                      :style="{ width: dashboard.attendance.classHappendCount + '%', background: '#5fad56 !important' }">
                    </div>
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
                  <i class="fa fa-circle me-2" style="font-size: 12px !important;"></i> {{ notice.title }}
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
          <ul class="list-unstyled small mb-0 px-3">
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
import ImprovementAlert from '@/components/ImprovementAlert.vue';
export default {
  components: {
    ImprovementAlert
  },
  mounted() {

    const deshboardData = localStorage.getItem("deshboardData");

    if (deshboardData) {
      this.dashboard = JSON.parse(deshboardData);
      this.drowChart();
    } else {
      this.getData().then(() => {
        this.drowChart();
      });
    }
    this.progressBar();



  },
  data() {
    return {
      present: 60,
      absent: 40,
      dashboard: '',
      semesterList: [],
      cgpaList: [],
      loading: false,
      per: 50,

    }
  },
  methods: {
    async getData() {
      this.loading = true;
      var token = window.$nuxt.$cookies.get("token");
      var user = window.$nuxt.$cookies.get("user");
      return await this.$axios
        .get("/student/dashboard/" + user.id + "?token=" + token)
        .then((response) => {
          localStorage.setItem("deshboardData", JSON.stringify(response.data));
          this.dashboard = response.data;
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
    },
    progressBar() {
      this.$nextTick(() => {
        $('.circle_percent').each(function () {
          const $this = $(this)
          const $dataV = $this.data('percent')
          const $dataDeg = $dataV * 3.6
          const $round = $this.find('.round_per')

          $round.css('transform', 'rotate(' + parseInt($dataDeg + 180) + 'deg)')
          $this.append('<div class="circle_inbox"><span class="percent_text"></span></div>')

          $this.prop('Counter', 0).animate(
            { Counter: $dataV },
            {
              duration: 2000,
              easing: 'swing',
              step: function (now) {
                $this.find('.percent_text').text(Math.ceil(now) + '%')
              }
            }
          )

          if ($dataV >= 51) {
            $round.css('transform', 'rotate(360deg)')
            setTimeout(function () {
              $this.addClass('percent_more')
            }, 1000)
            setTimeout(function () {
              $round.css('transform', 'rotate(' + parseInt($dataDeg + 180) + 'deg)')
            }, 1000)
          }
        })
      })
    }
  }
};
</script>
