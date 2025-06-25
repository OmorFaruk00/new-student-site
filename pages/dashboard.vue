<template>
  <div class="">
    <div class="row">
      <div class="col-lg-8 col-md-8 col-sm-12 ">
        <div class="row g-3 mb-3">


          <div class="col-lg-4 col-md-4 col-sm-12">
            <div class="bg-white shadow-sm p-3 rounded d-flex justify-content-start align-items-center"
              style="height:100px;">
              <div class="rounded-circle d-flex justify-content-center align-items-center me-3"
                style="width: 48px; height: 48px; background-color: #2563eb;">
                <i class="fa fa-file-text text-white" style="font-size: 20px;"></i>
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
              <div class="rounded-circle d-flex justify-content-center align-items-center me-3"
                style="width: 48px; height: 48px; background-color: orange;">
                <i class="fa fa-file-text text-white" style="font-size: 20px;"></i>
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
              <div class="rounded-circle d-flex justify-content-center align-items-center me-3"
                style="width: 48px; height: 48px; background-color: #000;">
                <i class="fa fa-file-text text-white" style="font-size: 20px;"></i>
              </div>
              <div>
                <h5 v-if="dashboard.account" class="mb-0 fw-bold text-dark pt-1">৳{{
                  dashboard.account.total_due.toFixed(2) }}</h5>
                <small class="text-muted fw-bold">Total Due</small>
              </div>
            </div>
          </div>

          <div class="col-lg-12 col-md-12 col-sm-12">
            <div class="bg-white shadow-sm p-3 rounded">
              <h4 class="fw-semibold">Semester’s Grade</h4>
              <hr>
              <canvas id="semesterChart"></canvas>
              <div v-if="isResult" class="d-flex justify-content-center align-items-center">
                <i class="fa fa-spinner fa-spin fa-4x text-primary"></i>
              </div>



            </div>
          </div>




          <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="bg-white shadow-sm p-3 rounded" style="height: 275px;">
              <h4 class="fw-semibold">Summary</h4>
              <hr>
              <table class="table table-borderless table-sm mb-0">
                <tbody>
                  <tr>
                    <td class="fw-semibold"> <i class="fa fa-star me-2 text-muted"></i>GPA</td>
                    <td v-if="dashboard.result" class="text-start fw-bold">: &nbsp; &nbsp; {{ dashboard.result.cgpa }}
                    </td>

                  </tr>

                  <tr>
                    <td class="fw-semibold"> <i class="fa fa-file-text me-2 text-muted"></i>Avarage Grade</td>
                    <td v-if="dashboard.result" class="text-start fw-bold">: &nbsp; &nbsp; {{
                      dashboard.result.grade_letter }}</td>
                  </tr>
                  <tr>
                    <td class="fw-semibold"> <i class="fa fa-file-text me-2 text-muted"></i>Total Credit</td>
                    <td v-if="dashboard.result" class="text-start fw-bold">: &nbsp; &nbsp; {{
                      dashboard.result.total_credit_earned }}</td>
                  </tr>
                  <tr>
                    <td class="fw-semibold"> <i class="fa fa-file-text me-2 text-muted"></i>Credit Examped</td>
                    <td v-if="dashboard.result" class="text-start fw-bold">: &nbsp; &nbsp; {{
                      dashboard.result.exempted_credit }}</td>
                  </tr>

                </tbody>
              </table>

            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="bg-white shadow-sm p-3 rounded">
              <h4 class="fw-semibold">Attendance</h4>
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

              <div class="pt-4">
                <div class="d-flex justify-content-between">
                  <p class="progress-title">Present</p>
                  <p class="progress-title">{{ present + '%' }}</p>
                </div>
                <div class="progress green">
                  <div class="progress-bar" :style="{ width: present + '%', background: '#5fad56 !important' }">
                  </div>
                </div>

                <div class="d-flex justify-content-between">
                  <p class="progress-title">Absent</p>
                  <p class="progress-title">{{ absent + '%' }}</p>
                </div>

                <div class="progress  pink">
                  <div class="progress-bar" :style="{ width: absent + '%', background: '#ff4b7d !important' }">

                  </div>
                </div>

              </div>


            </div>
          </div>


        </div>

      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <div class="bg-white shadow-sm rounded p-3 mb-3">
          <h4 class="fw-semibold">Announcements</h4>
          <hr>
          <div class="announcement pb-2">
            <div v-if="dashboard.notice">
              <p v-for="notice in dashboard.notice" :key="notice.id">
                <a :href="'https://diu.ac/notice-details/' + notice.slug" class="text-decoration-none text-dark"
                  target="_blank">
                  <span class="me-2 text-dark">●</span>{{ notice.title }}
                </a>
              </p>



            </div>
          </div>
        </div>

        <div class="bg-white shadow-sm p-3 rounded" v-if="dashboard.routine">
          <h4 class="fw-semibold">Today's Class Update</h4>
          <hr>
          <ul class="list-unstyled small mb-0">
            <!-- <p>{{ dashboard.routine }}</p> -->
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
            borderRadius: 5, barThickness: 20,
            maxBarThickness: 30
          }],

        },
        options: {
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
