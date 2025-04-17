<template>
  <section>
    <div class="card col-lg-6 col-md-4 col-sm-12 offset-lg-3 offset-md-4">
      <div class="card-header">Download Admit Card</div>
      <div class="card-body">
        <div v-if="total_current_due < 501 + per_semester_fee / 2" class="row">
          <div class="">
            <button
              :disabled="midloading"
              @click="admitCardPrint('mid')"
              class="btn btn-primary mb-4 w-100"
            >
              <i class="fa fa-download mr-2"></i> Download Mid-Term Admit Card
              <i v-if="midloading" class="fa fa-spinner fa-spin ml-1"></i>
            </button>
          </div>
        </div>
        <div v-if="total_current_due < 501" class="row">
          <div class="">
            <button
              :disabled="finalloading"
              @click="admitCardPrint('final')"
              class="btn btn-primary w-100"
            >
              <i class="fa fa-download mr-2"></i> Download Final Admit Card
              <i v-if="finalloading" class="fa fa-spinner fa-spin ml-1"></i>
            </button>
          </div>
        </div>

        <div v-else class="row">
          <div class="col-lg-6 col-md-6 col-sm-12 offset-lg-3 offset-md-3">
            <h5 class="text-center text-info">
              *** Please Clear Total Current Due Amount ***
            </h5>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
  
  
  <script>
import download from "downloadjs";

export default {
  // middleware: ['authenticated', 'feedbackAuthenticated'],

  data: function () {
    return {
      total_current_due: "",
      per_semester_fee: "",
      midloading: false,
      finalloading: false,
    };
  },
  methods: {
    async getAccountsSummary() {
      var token = window.$nuxt.$cookies.get("token");
      var user = window.$nuxt.$cookies.get("user");
      return await this.$axios
        .get("/student_account_info_summary/" + user.id + "?token=" + token)
        .then((response) => {
          this.total_current_due = response.data.summary.total_current_due;
          this.per_semester_fee = response.data.summary.per_semester_fee;
        });
    },

    async admitCardPrint(term) {
      var token = window.$nuxt.$cookies.get("token");
      var user = window.$nuxt.$cookies.get("user");
      // alert(term);
      if (term == "mid") {
        this.midloading = true;
      }
      if (term == "final") {
        this.finalloading = true;
      }

      if (!user) {
        this.$toast.info("Please login as a student", {
          icon: "error_outline",
        });
        return false;
      } else {
        return await this.$axios
          .get(`/student-admit-card/${term}?token=${token}`, {
            responseType: "blob",
          })
          .then((response) => {
            const content = response.headers["content-type"];
            download(response.data, "admit_card", content);

            this.$toast.success("Admit Card Download Successfully", {
              icon: "error_outline",
            });
          })
          .catch((error) => {
            if (error.response.status == 401) {
              this.$toast.info("Please Clear Total Current Due Amount", {
                icon: "error_outline",
              });
            } else if (error.response.status == 400) {
              this.$toast.info("No semester found in RMS", {
                icon: "error_outline",
              });
            } else {
              this.$toast.info("Something went to wrong", {
                icon: "error_outline",
              });
            }
          })
          .finally((final) => {
            this.midloading = false;
            this.finalloading = false;
          });
      }
    },
  },
  created() {
    this.getAccountsSummary();
  },
};
</script>
  