<template>
  <section>
    <div class="form-horizontal rounded mb-4">
      <div class="form-header">
        <h4> Mid-term Retake Form</h4>
      </div>
      <div class="p-3 row">
        <div class="col-lg-8 col-md-8 col-sm-12">
          <div class="form-group" style="margin-bottom:20px !important;">
            <label for="">Semester</label>
            <select name="semester" @change="fetchSemesterWiseCourses" id="semester" v-model="semester"
              class="form-control">
              <option value="" selected disabled hidden>Select one</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </div>

          <div class="form-group" style="margin-bottom:20px !important;">
            <label for="">Course Code / Course Title</label>
            <select name="course_id" id="course_id" v-model="course_id" class="form-control">
              <option value="" selected disabled hidden>Select one</option>

              <option :value="row.id" v-for="(row, index) in courses" :key="index">
                {{ row.code }} / {{ row.name }}
              </option>
            </select>
          </div>

          <div class="mb-4">
            <button class="btn btn-bs" @click="addRetakeSubject">
              <i class="fa fa-plus-circle"></i> Add
            </button>
          </div>


        </div>

         <div class="col-lg-8 col-md-8 col-sm-12 mt-4 mb-4" v-if="isdownload">
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead class="">
                  <tr>
                    <th style="width: 15%">Course Code</th>
                    <th class="text-center">Course Title</th>
                    <th class="text-center" style="width: 10%">Action</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(row, index) in retake" :key="index">
                    <td>{{ row.course_code }}</td>
                    <td class="text-center">{{ row.course_name }}</td>
                    <td class="text-center">
                      <button type="button" class="btn btn-danger" @click="delete_row(row)">
                        <i class="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button :disabled="loading" style="margin-top: 25px" class="btn btn-bs" @click="downloadRetakeForm">
              Download <i v-if="loading" class="fa fa-spinner fa-spin ml-1"></i>
            </button>
          </div>
      </div>
    </div>
  </section>
</template>

<script>
import download from "downloadjs";

export default {
  // middleware: "feedbackAuthenticated",
  name: "mid-term-retake",

  data() {
    return {
      semester: "",
      course_id: "",
      courses: [],
      retake: [],
      isdownload: false,
      loading: false,
    };
  },

  methods: {
    fetchSemesterWiseCourses() {
      var vm = this;
      var token = window.$nuxt.$cookies.get("token");
      var user = window.$nuxt.$cookies.get("user");

      return this.$axios
        .get(
          "student/fetch-course-lists/" +
          user.id +
          "/" +
          vm.semester +
          "?token=" +
          token
        )
        .then((response) => {
          vm.courses = response.data.courses;
        })

        .catch((error) => {
          // console.log(error.response);

          if (error.response.status == 400) {
            this.$toast.info("ERP data error", { icon: "error_outline" });
          } else {
            this.$toast.info("Something went to wrong", {
              icon: "error_outline",
            });
          }
        });
    },

    addRetakeSubject() {
      var vm = this;

      if (!vm.semester) {
        this.$toast.success("Please Select semester", {
          icon: "error_outline",
        });
        return false;
      } else if (!vm.course_id) {
        this.$toast.success("Please Select Course Code / Course Title", {
          icon: "error_outline",
        });
        return false;
      } else {
        var items = vm.courses;
        var course_id = vm.course_id;

        let student_course_code = [];
        for (let i = 0; i < items.length; i++) {
          if (items[i].id == course_id) {
            student_course_code.push(items[i].code);
          }
        }

        let student_course_name = [];
        for (let i = 0; i < items.length; i++) {
          if (items[i].id == course_id) {
            student_course_name.push(items[i].name);
          }
        }

        let code_separator = "";
        let code = "";
        student_course_code.forEach((word) => {
          code += code_separator + word;
          code_separator = " [] ";
        });

        let name_separator = "";
        let name = "";
        student_course_name.forEach((word) => {
          name += name_separator + word;
          name_separator = " [] ";
        });

        vm.retake.push({
          course_code: code,
          course_name: name,
        });

        code = "";
        name = "";
        vm.course_id = "";
        vm.isdownload = true;
      }
    },

    delete_row: function (row) {
      this.retake.splice(this.retake.indexOf(row), 1);
    },

    downloadRetakeForm() {
      var vm = this;
      vm.loading = true;
      var token = window.$nuxt.$cookies.get("token");
      var user = window.$nuxt.$cookies.get("user");
      var retake_subject = vm.retake;

      if (!user) {
        this.$toast.info("Please login as a student", {
          icon: "error_outline",
        });
        return false;
      } else if (!vm.retake.length > 0) {
        this.$toast.info("Please choose retake subject", {
          icon: "error_outline",
        });
        return false;
      } else {
        return this.$axios
          .get("student/mid-term-retake-form?token=" + token, {
            params: {
              retake_subject: vm.retake,
            },

            responseType: "blob",
          })
          .then((response) => {
            const content = response.headers["content-type"];
            download(response.data, "retake_form", content);

            this.$toast.success("Mid Term Retake Form Download Successfully", {
              icon: "error_outline",
            });
            vm.retake = [];
            vm.semester = "";
            vm.courses = "";
            vm.loading = false;
            vm.isdownload = false;
          })
          .catch((error) => {
            var errors = error.response;
            console.log(errors);
          });
      }
    },
  },
};
</script>

<style scoped></style>
