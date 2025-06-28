<template>
  <div>
    <a class="nav-link count-indicator message-dropdown" id="messageDropdown" href="#" data-bs-toggle="dropdown"
      aria-expanded="false">
      <span class="rounded px-2 py-1" style="background: #ecf0f4;">
        <i class="fa fa-bell" style="font-size: 15px;"></i>
      </span>
      <span class="count">{{ notificationCount }}</span>
    </a>
    <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list pb-0 rounded custom-dropdown"
      aria-labelledby="messageDropdown">
      <div class="dropdown-divider"></div>
      <div v-if="currentExamSchedule != ''">
        <div v-for="(singleCurrentExamSchedule,
          key,
          index) in currentExamSchedule">
          <a href="/improvement/formfillup" class="dropdown-item preview-item">
            <div>
              <p class="ellipsis font-weight-medium text-dark m-0 mb-1">
                {{ singleCurrentExamSchedule.name }}
              </p>
              <p class="small text-muted d-flex align-items-center mb-1" style="font-size: 13px;">
                <i class="fa fa-calendar me-1" style="font-size: 11px;"></i>
                Form Fill-up Last Date: <strong class="ms-1">{{
                  singleCurrentExamSchedule.form_fillup_last_date.slice(0, 10) }}</strong>
              </p>

              <p class="small text-muted d-flex align-items-center mb-0" style="font-size: 13px;">
                <i class="fa fa-calendar me-1" style="font-size: 11px;"></i>
                Exam Start Date: <strong class="ms-1">{{ singleCurrentExamSchedule.exam_start_date.slice(0,
                  10) }}</strong>
              </p>
            </div>
          </a>
          <div class="dropdown-divider"></div>
        </div>
      </div>
      <a class="dropdown-item preview-item">
        <div>
          <p class="preview-subject ellipsis font-weight-medium text-dark m-0">Other Notification</p>
          <p class="font-weight-light small mb-0">Other notification details will be here.</p>
        </div>
      </a>

    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      authuser: "",
      currentExamSchedule: '',
      notificationCount:0,

    };
  },

  mounted() {

    const improvementExamSchedule = this.$cookies.get("currentExamSchedule");
    const count = this.$cookies.get("ExamScheduleNotification");

    if (improvementExamSchedule) {
      this.currentExamSchedule = improvementExamSchedule;
      this.notificationCount =  this.notificationCount + count;
    } else {
      this.getCurrentImprovementExamSchedule();
    }

  },
  methods: {
    async getCurrentImprovementExamSchedule() {
      var token = window.$nuxt.$cookies.get("token");
      return await this.$axios
        .get("/get_current_improvement_exam_schedule?token=" + token)
        .then(response => {
          window.$nuxt.$cookies.set("currentExamSchedule", response.data.data, {
            path: "/",
            maxAge: 1800
          });
             window.$nuxt.$cookies.set("ExamScheduleNotification", response.data.data.length, {
            path: "/",
            maxAge: 1800
          });
          this.currentExamSchedule = response.data.data;
          var count = response.data.data.length;
          this.notificationCount = this.notificationCount + count;
        })
        .catch(error => {
          console.log(error);
          // this.$toast.error("currentExamSchedule Not found", {
          //   icon: "error_outline"
          // });
        });
    },


  }
}
</script>
<style scoped>
@media (min-width: 1000px) and (max-width: 1200px) {
  .custom-dropdown {
    margin-left: -100px !important;
  }
}
</style>
