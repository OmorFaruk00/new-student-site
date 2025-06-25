<template>
  <section>
    <div class="form-horizontal rounded db-gp">
      <div class="form-header">Class Routine</div>
      <div class="p-3">
        <div class="col-lg-8 col-md-8  col-sm-12  mb-2 pb-5">
          <div class="form-group focused mb-4">
            <label for="semester">Semester *</label>
            <select v-model="semester_id" class="form-control" id="semester" name="semester" required>
              <option value="" selected disabled hidden>Select Semester</option>
              <option v-for="(row, index) in semesters" :key="index" :value="row.id">
                {{ row.semester }}
              </option>
            </select>

          </div>
          <div class="mt-4">
            <button @click="getRoutine" :disabled="loading" type="submit" name="button" class="btn btn-bs">
              Download Routine
              <i v-if="loading" class="fa fa-spinner fa-spin"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
export default {
  data() {
    return {
      semesters: "",
      semester_id: "",
      loading: false,
    };
  },
  created() {
    this.getSemester();
  },

  methods: {
    async getSemester() {
      var token = window.$nuxt.$cookies.get("token");
      var user = window.$nuxt.$cookies.get("user");

      return await this.$axios
        .get("/student/get-semesters/" + user.id + "?token=" + token)
        .then((response) => {
          this.semesters = response.data;
          console.log(this.semesters);
        })
        .catch((error) => {
          this.$toast.error(" Semester Not Found!", { icon: "error_outline" });
        });
    },

    async getRoutine() {

      if (this.semester_id == "") {
        this.$toast.error("Please Select Semester", { icon: "error_outline" });
      } else {
        this.loading = true;
        try {
          const token = window.$nuxt.$cookies.get("token");

          const response = await this.$axios.get(
            `/student/class-routine-download/${this.semester_id}?token=${token}`,
            {
              responseType: "blob",
            }
          );

          const blob = new Blob([response.data], { type: "application/pdf" });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `Class Routine.pdf`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } catch (error) {
          this.$toast.error("This Semester Routine Not Available!", {
            icon: "error_outline",
          });
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>
