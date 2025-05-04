<template>
  <section>
    <div class="login-box">
      <form
        class="form-login"
        id="checkStudentsForm"
        @submit.prevent="checkStudents()"
      >
        <h4 style="padding-bottom: 15px; margin-top: -15px; text-align: center">
          Check your account
        </h4>
        <div class="form-group">
          <label>Department</label>
          <select
            id="role"
            class="form-control"
            v-model="department_id"
            v-on:change="getBatch"
          >
            <option selected value="">Select Department</option>
            <option
              v-for="department in departments"
              :value="department.id"
              v-bind:key="department.id"
            >
              {{ department.name }}
            </option>
          </select>
          <small id="department_id_help" class="text-danger"></small>
        </div>
        <div class="form-group">
          <label>Batch</label>
          <select
            class="form-control"
            id="batch_id"
            name="batch_id"
            v-model="batch_id"
          >
            <option selected value="">Select Batch</option>
            <option
              v-for="batch in batches"
              :value="batch.id"
              v-bind:key="batch.id"
            >
              {{ batch.batch_name }}
            </option>
          </select>
          <small id="batch_id_help" class="text-danger"></small>
        </div>

        <div class="form-group">
          <label for="reg_code">Registration Code</label>
          <input
            id="reg_code"
            type="text"
            class="form-control"
            placeholder="Registration Code Ex: CS-D-01-23-456789"
            v-model="registration_code"
          />
          <small id="registration_code_help" class="text-danger"></small>
        </div>
        <div class="form-group">
          <label for="roll">Roll No</label>
          <input
            id="roll"
            type="text"
            class="form-control"
            placeholder="Enter Roll"
            v-model="roll_no"
          />
          <small id="roll_no_help" class="text-danger"></small>
        </div>
        <div class="form-group">
          <label for="phone">Phone No</label>
          <input
            id="phone"
            type="text"
            class="form-control"
            placeholder="Phone No. As provided in the Admission Form"
            v-model="phone_no"
          />
          <small id="phone_no_help" class="text-danger"></small>
        </div>

        <button type="submit" class="btn-sign mt-3">Verify</button>
      </form>
    </div>
    <div class="check-login">
      <nuxt-link to="/" class="check-title"
        >Already an account? <b class="sign-up">Sign In</b></nuxt-link
      >
    </div>
  </section>
</template>



<script>
export default {
  layout: "authLayout",
  data() {
    return {
      departments: [],
      batches: [],
      phone_no: "",
      department_id: "",
      batch_id: "",
      registration_code: "",
      roll_no: "",
    };
  },
  mounted() {
    this.getDepartment();
  },
  methods: {
    async getDepartment() {
      return await this.$axios
        .get("/public/get_departments")
        .then((response) => {
          this.departments = response.data;
        })
        .catch((error) => {});
    },
    async getBatch() {
      return await this.$axios
        .get("/public/get_batch_id_name/" + this.department_id + "")
        .then((response) => {
          this.batches = response.data;
        })
        .catch((error) => {});
    },
    async checkStudents() {
      var department_id = this.department_id == "" ? 0 : this.department_id;
      var batch_id = this.batch_id == "" ? 0 : this.batch_id;
      var registration_code =
        this.registration_code == "" ? 0 : this.registration_code;
      var roll_no = this.roll_no == "" ? 0 : this.roll_no;
      var phone_no = this.phone_no == "" ? 0 : this.phone_no;
      return await this.$axios
        .get(
          "/public/check_student/" +
            department_id +
            "/" +
            batch_id +
            "/" +
            registration_code +
            "/" +
            roll_no +
            "/" +
            phone_no +
            ""
        )
        .then((response) => {
          if (response.data.exists) {
            this.$toast.error(
              "You have already an account. we are redirecting to you on login page.",
              { icon: "error_outline" }
            );
            this.$router.push("/");
          }
          if (response.data.temp) {
            window.$nuxt.$cookies.set("student_name", response.data.name, {
              path: "/",
            });
            window.$nuxt.$cookies.set("student_id", response.data.temp, {
              path: "/",
            });
            this.$router.push("/auth/registration");
          }
        })
        .catch((error) => {
          this.$toast.error(error.response.data.error, {
            icon: "error_outline",
          });
          $(".form-text").html("&nbsp;");
          $.each(error.response.data, function (index, value) {
            $("#" + index + "_help").html(value[0]);
          });
          if (error.response.status == 422) {
            this.$toast.error("Validation Error", { icon: "error_outline" });
          }
        });
    },
  },
};
</script>

