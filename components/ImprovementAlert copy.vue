<template>
  <div v-if="currentExamSchedule != ''">
    <div v-for="(singleCurrentExamSchedule, index) in currentExamSchedule" :key="index">
      <div class="my-3" :id="'upgradeAlert-' + index">
        <div class="custom-alert">
          <div class="custom-alert-text">
            <strong class="text-truncate d-inline-block w-100"
              style="max-width: 100%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
              {{ singleCurrentExamSchedule.name }}
            </strong>
            <div class="pt-2" style="font-size: 13px;">
              <div class="d-flex flex-column flex-sm-row align-items-start flex-wrap">
                <div class="d-inline-flex align-items-center me-sm-4 mb-1">
                  <i class="fa fa-calendar me-1" style="font-size: 11px;"></i>
                  <small>
                    Form Fill-up Last Date:
                    <strong class="ms-1">{{ singleCurrentExamSchedule.form_fillup_last_date.slice(0, 10) }}</strong>
                  </small>
                </div>
                <div class="d-inline-flex align-items-center mb-1">
                  <i class="fa fa-calendar me-1" style="font-size: 11px;"></i>
                  <small>
                    Exam Start Date:
                    <strong class="ms-1">{{ singleCurrentExamSchedule.exam_start_date.slice(0, 10) }}</strong>
                  </small>
                </div>
              </div>
            </div>
          </div>
          <a href="/improvement/formfillup" class="upgrade-btn">Apply</a>
          <button class="close-btn" aria-label="Close"
            :onclick="'document.getElementById(\'upgradeAlert-' + index + '\').style.display = \'none\''">
            &times;
          </button>
        </div>
      </div>
    </div>
  </div>

</template>
<script>

export default {
  data() {
    return {
      authuser: "",
      currentExamSchedule: "",

    };
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
.custom-alert {
  background-color: #ffc107;
  /* Yellow */
  color: #000;
  border-radius: 0.5rem;
  padding: 1rem 1.5rem;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.custom-alert-text {
  max-width: 80%;
}

.upgrade-btn {
  background-color: #ff009a;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-weight: bold;
  border-radius: 0.375rem;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
}

.close-btn {
  position: absolute;
  top: -10px;
  right: -10px;
  background: #fff;
  border-radius: 50%;
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  color: #000;
}
</style>
