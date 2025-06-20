<template>
  <section>
    <div class="form-horizontal col-lg-6 mx-auto">
      <div class="form-header">
        <h4> Permission For Exam Form</h4>
      </div>
      <div class="px-3 pb-2">
        <div class="form-group">
          <label for="">Payment Amount</label>
          <input type="number" min="0" oninput="validity.valid||(value='');" class="form-control"
            v-model="payment_amount" placeholder="Enter payment amount" />
        </div>
        <div class="form-group">
          <label for="">Payment Date</label>
          <no-ssr>
            <datepicker placeholder="Select date" class="custom-datepicker form-control" v-model="payment_date">
            </datepicker>
          </no-ssr>
        </div>
        <div class="form-group">
          <label for="">Exam Date</label>
          <no-ssr>
            <datepicker placeholder="Select date" class="custom-datepicker form-control" v-model="exam_date">
            </datepicker>
          </no-ssr>
        </div>
        <div class="pb-5">
          <button :disabled="loading" class="btn btn-primary" @click="getExaminationPermissionForm">
            Download
            <i v-if="loading" class="fa fa-spinner fa-spin ml-1"></i>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import download from "downloadjs";

export default {
  // middleware: 'feedbackAuthenticated',
  name: "permission-for-exam",

  data() {
    return {
      payment_amount: "",
      payment_date: "",
      exam_date: "",
      loading: false,
    };
  },

  methods: {
    async getExaminationPermissionForm() {
      var vm = this;
      var token = window.$nuxt.$cookies.get("token");
      var user = window.$nuxt.$cookies.get("user");

      if (!user) {
        this.$toast.info("Please login as a student", {
          icon: "error_outline",
        });
        return false;
      } else if (!vm.payment_amount) {
        this.$toast.info("Please insert payment amount", {
          icon: "error_outline",
        });
        return false;
      } else if (!vm.payment_date) {
        this.$toast.info("Please select payment date", {
          icon: "error_outline",
        });
        return false;
      } else if (!vm.exam_date) {
        this.$toast.info("Please select exam date", { icon: "error_outline" });
        return false;
      } else {
        vm.loading = true;
        return await this.$axios
          .get("/student/permission-for-exam-form?token=" + token, {
            params: {
              // student_id: user.id,
              payment_amount: vm.payment_amount,
              payment_date: vm.payment_date,
              exam_date: vm.exam_date,
            },
            responseType: "blob",

          })
          .then((response) => {
            const content = response.headers["content-type"];
            download(response.data, "permission_for_exam", content);

            this.$toast.success(
              "Permission For Exam Form Download Successfully",
              { icon: "error_outline" }
            );

            vm.payment_amount = "";
            vm.payment_date = "";
            vm.exam_date = "";
            vm.loading = false;
          })
          .catch((error) => {
            this.$toast.info("Somethings went to wrong", {
              icon: "error_outline",
            });
          });
      }
    },
  },
};
</script>

<style scoped>
/deep/ .custom-datepicker input {

  border: none !important;
  padding: 5px 10px 0 10px;
  width: 100% !important;


}
</style>
