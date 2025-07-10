<template>
  <section class="d-flex">
    <!-- <li class="nav-item dropdown  user-dropdown ">
      <div class="card border rounded px-2 py-1">
        <nuxt-link to="/support-ticket" class="d-block text-center">
          <img src="/images/support.png" alt="Support" height="20">
        </nuxt-link>
      </div>
    </li> -->

    <li class="nav-item dropdown">
      <div>
        <a class="nav-link count-indicator message-dropdown" id="SupportDropdown" href="#" data-bs-toggle="dropdown"
          aria-expanded="false">
          <span class="rounded px-2 py-1" style="background: #ecf0f4;">
            <img src="/images/support.png" alt="Support" height="20">
          </span>
          <span class="count">{{ unseenCount }}</span>
        </a>
        <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list pb-0"
          aria-labelledby="messageDropdown">
          <a href="/support-ticket" class="dropdown-item py-3">
            <p class="mb-0 font-weight-medium float-start me-2">You have {{ unseenCount }} unseen Ticket </p>
            <span class="badge badge-pill badge-primary float-end">View all</span>
          </a>
          <div class="dropdown-divider"></div>
          <div v-for="(ticket, index) in supportTicket">
            <a @click="markSeen(ticket.id)" class="dropdown-item preview-item">

              <div class="preview-item-content flex-grow">
                <p class="preview-subject ellipsis font-weight-medium text-dark  m-0">{{ ticket.subject }}</p>
                <p class="font-weight-medium small-text  m-0"> {{ ticket.status }} </p>
              </div>
            </a>
            <div class="dropdown-divider"></div>
          </div>


        </div>
      </div>
    </li>
    <li class="nav-item dropdown">
      <div>
        <a class="nav-link count-indicator message-dropdown" id="messageDropdown" href="#" data-bs-toggle="dropdown"
          aria-expanded="false">
          <span class="rounded px-2 py-1" style="background: #ecf0f4;">
            <i class="fa fa-bell" style="font-size: 15px;"></i>
          </span>
          <span class="count">{{ currentExamSchedule.length }}</span>
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
          <!-- <a class="dropdown-item preview-item">
            <div>
              <p class="preview-subject ellipsis font-weight-medium text-dark m-0">Other Notification</p>
              <p class="font-weight-light small mb-0">Other notification details will be here.</p>
            </div>
          </a> -->

        </div>
      </div>
    </li>
  </section>
</template>
<script>

export default {
  data() {
    return {
      authuser: "",
      currentExamSchedule: '',
      currentSupportTicket: '',

    };
  },
  computed: {
    supportTicket() {
      return this.$store.state.notifications.supportTicket
    },
    unseenCount() {
      return this.supportTicket.filter(n => !n.seen).length
    }
  },
  created() {
    this.$store.dispatch('notifications/fatchSupportTicket')

  },

  mounted() {

    const improvementExamSchedule = this.$cookies.get("currentExamSchedule");

    if (improvementExamSchedule) {
      this.currentExamSchedule = improvementExamSchedule;
    } else {
      this.getCurrentImprovementExamSchedule();
    }

  },
  methods: {
    markSeen(id) {
      this.$store.dispatch('notifications/markAsSeen', id);
      this.$router.push('/support-ticket/' + id);
    },

    async getCurrentImprovementExamSchedule() {
      var token = window.$nuxt.$cookies.get("token");
      return await this.$axios
        .get("/get_current_improvement_exam_schedule?token=" + token)
        .then(response => {
          window.$nuxt.$cookies.set("currentExamSchedule", response.data.data, {
            path: "/",
            maxAge: 1800
          });
          this.currentExamSchedule = response.data.data;
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
