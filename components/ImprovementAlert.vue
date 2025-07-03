<template>
  <div>
    <div v-if="currentExamSchedule && alertVisible">
        <div class="my-3" id="showAlert">
          <div class="custom-alert">
            <div class="d-flex flex-row flex-nowrap align-items-center justify-content-between w-100">
              <div class="flex-grow-1 flex-shrink-1 me-2" style="min-width: 0;">
                <strong class="d-block text-truncate"
                  style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  Improvement Exam Scheduled
                </strong>
              </div>
              <div class="d-flex align-items-center gap-2">
                <button class="show-btn" @click="showModal">Show</button>
                <button class="close-btn" aria-label="Close"
                  @click="hideAlert">
                  &times;
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>



    <!-- Exam Schedule Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-semibold" id="exampleModalLabel"> {{ currentExamSchedule.length }} Improvement
              Exam Scheduled
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-2" v-if="currentExamSchedule != ''">
            <div class="mb-4">
              <div class="table-responsive mb-3" v-for="(singleCurrentExamSchedule, index) in currentExamSchedule"
                :key="index">
                <table class="table table-bordered mb-0 custom-table ">
                  <tbody>
                    <tr>
                      <th >Name</th>
                      <td >{{ singleCurrentExamSchedule.name }}</td>
                    </tr>
                    <tr>
                      <th >Form Fill-up Last Date</th>
                      <td >{{ singleCurrentExamSchedule.form_fillup_last_date }}</td>
                    </tr>
                    <tr>
                      <th >Exam Start Date</th>
                      <td>{{ singleCurrentExamSchedule.exam_start_date }}</td>
                    </tr>
                    <tr v-if="singleCurrentExamSchedule.departmentNames">
                      <td colspan="2" >
                        <div class="d-flex flex-wrap gap-1 rounded" style="font-size: 10px !important;">
                          <span class="badge badge-primary rounded"
                            v-for="(dept, deptIndex) in singleCurrentExamSchedule.departmentNames" :key="deptIndex">
                            {{ dept }}
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="closeModal">
              Close
            </button>
            <a href="/improvement/formfillup" type="button" class="btn btn-primary">Apply</a>
          </div>
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
      alertVisible: true

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
    showModal() {
        $('#exampleModal').modal('show');
    },
    closeModal() {
        $('#exampleModal').modal('hide');

    },
    hideAlert() {
      this.alertVisible = false;
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
.custom-table th,
.custom-table td {
  padding: 4px 5px;
  font-size: 12px;
}

.custom-alert {
  background-color: #ffc107;
  color: #000;
  border-radius: 0.5rem;
  padding: 1rem 1.5rem;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}

.custom-alert-text {
  max-width: 80%;
}

.show-btn {
  background-color: #ff009a;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-weight: bold;
  border-radius: 0.375rem;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  text-transform: uppercase;
}
.show-btn:hover {
  color: #000 !important;

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
