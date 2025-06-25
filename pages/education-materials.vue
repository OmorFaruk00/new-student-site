<template>
  <section>
    <div class="form-horizontal rounded">

      <div class="form-header">Education Materials</div>

      <div class=" px-4">

        <form id="checkStudentsForm" @submit.prevent="getMaterials()">
          <div class="row">
            <div class="col-lg-8 col-md-8 col-sm-12">
              <div class="form-group focused">
                <label for="materials_type">Find Material *</label>
                <select v-model="filter.materials_type" class="form-control" id="materials_type" name="materials_type"
                  required="">
                  <option selected value="">Select material name</option>
                  <option value="Syllabus">Syllabus</option>
                  <option value="Questions">Questions</option>
                  <option value="Lesson Plans">Lesson Plans</option>
                  <option value="Lecture Sheets">Lecture Sheets</option>
                </select>

                <small id="materials_type_help" class="form-text text-danger">&nbsp;</small>
              </div>
            </div>

            <div class="col-lg-8 col-md-8 col-sm-12">
              <div class="form-group focused">
                <label for="department_id">Department *</label>
                <select class="form-control" id="department_id" name="department_id" v-model="filter.department_id"
                  required="">
                  <option selected value="">Select Department</option>
                  <option v-for="(department, index) in departments" :key="index" :value="department">{{
                    department
                  }}
                  </option>
                </select>

                <small id="department_id_help" class="form-text text-danger">&nbsp;</small>
              </div>
            </div>

            <div class="col-lg-8 col-md-8 col-sm-12">
              <div class="form-group diu-focused">
                <label for="semester" class="">Semester</label>
                <select class="form-control" id="semester" name="semester" v-model="filter.semester" required="">
                  <option selected disabled hidden value="">Select semester</option>
                  <option v-for="(n, index) in 12" :key="index" :value="n">{{ n }}</option>
                </select>
                <small id="semester_help" class="form-text text-danger">&nbsp;</small>
              </div>
            </div>

            <div class="col-lg-8 col-md-8 col-sm-12 mb-4">
              <div class="form-group">
                <button type="submit" style="margin-top: 0;margin-left: 0"
                  class="btn btn-primary btn-block">Find</button>
              </div>
            </div>
          </div>
        </form>


        <div class="row mb-3 pb-5">
          <div class="">
            <div v-if="filter.materials_type == 'Syllabus'" class="table-responsive">
              <table class="table table-bordered mb-0" v-if="materials.syllabus.length > 0">
                <thead class="thead-dark">
                  <tr>
                    <th class="text-left" colspan="4">Syllabus Materials</th>
                  </tr>
                </thead>
                <tr>
                  <th>SL</th>
                  <th>Name</th>
                  <th style="text-align: center;">Download</th>
                </tr>
                <tr v-for="(material, key) in materials.syllabus">
                  <td>{{ key + 1 }}</td>
                  <td class="text-left">
                    <p><strong>Syllabus Name :</strong> {{ material.name }} <br>
                      <strong>Desciption : </strong>{{ material.description }}
                    </p>
                  </td>
                  <td>
                    <div class="d-flex justify-content-center">
                      <button type="button" class="btn btn-primary btn-sm"
                        @click="downloadMaterials('syllabus', material.id, material.download_key)">Download
                      </button>
                    </div>
                  </td>
                </tr>
              </table>
              <h3 class="p-4 text-center text-uppercase text-danger" v-else>
                <p>😢</p>
                <small>Syllabus Materials Not Found</small>
              </h3>
            </div>
            <div v-if="filter.materials_type == 'Questions'" class="table-responsive">
              <table class="table table-bordered mb-0" v-if="materials.questions.length > 0">
                <thead class="thead-dark">
                  <tr>
                    <th class="text-left" colspan="4">Questions Materials</th>
                  </tr>
                </thead>
                <tr>
                  <th>SL</th>
                  <th>Name</th>
                  <th style="text-align: center;">Download</th>
                </tr>
                <tr v-for="(material, key) in materials.questions">
                  <td>{{ key + 1 }}</td>
                  <td class="text-left">
                    <p><strong>Semester :</strong> {{ material.semester }} <br>
                      <strong>Course Name :</strong> {{ material.name }} <strong v-if="material.course_code != ''"> |
                        Course Code : </strong>{{ material.course_code }} <br>
                      <strong>Session : </strong>{{ material.session }} <br>
                      <strong>Desciption : </strong>{{ material.description }}
                    </p>
                  </td>
                  <td>
                    <div class="d-flex justify-content-center">
                      <button type="button" class="btn btn-primary btn-sm mr-5"
                        @click="downloadMaterials('questions', material.id, material.download_key)">Download
                      </button>
                    </div>
                  </td>
                </tr>
              </table>
              <h3 class="p-4 text-center text-uppercase text-danger" v-else>
                <p>😢</p>
                <small>Questions Materials Not Found</small>
              </h3>
            </div>
            <div v-if="filter.materials_type == 'Lesson Plans'">
              <table class="table table-bordered mb-0" v-if="materials.lesson_plans.length > 0">
                <thead class="thead-dark">
                  <tr>
                    <th class="text-left" colspan="4">Lesson Plans Materials</th>
                  </tr>
                </thead>
                <tr>
                  <th>SL</th>
                  <th>Name</th>
                  <th style="text-align: center;">Download</th>
                </tr>
                <tr v-for="(material, key) in materials.lesson_plans">
                  <td>{{ key + 1 }}</td>
                  <td class="text-left">
                    <p><strong>Semester :</strong> {{ material.semester }}</p>
                    <p><strong>Course Name :</strong> {{ material.name }} <strong v-if="material.course_code != ''"> |
                        Course Code : </strong>{{ material.course_code }}</p>
                    <p><strong>Session : </strong>{{ material.session }}</p>
                  </td>
                  <td>
                    <div class="d-flex justify-content-center">
                      <button type="button" class="btn btn-primary btn-sm"
                        @click="downloadMaterials('lesson_plans', material.id, material.download_key)">Download
                      </button>
                    </div>
                  </td>
                </tr>
              </table>
              <h3 class="p-4 text-center text-uppercase text-danger" v-else>
                <p>😢</p>
                <small>Lesson Plans Materials Not Found</small>
              </h3>
            </div>
            <div v-if="filter.materials_type == 'Lecture Sheets'">
              <table class="table table-bordered mb-0" v-if="materials.lecture_sheets.length > 0">
                <thead class="thead-dark">
                  <tr>
                    <th class="text-left" colspan="4">Lecture Sheets Materials</th>
                  </tr>
                </thead>
                <tr>
                  <th>SL</th>
                  <th>Name</th>
                  <th style="text-align: center;">Download</th>
                </tr>
                <tr v-for="(material, key) in materials.lecture_sheets">
                  <td>{{ key + 1 }}</td>
                  <td class="text-left">
                    <p><strong>Semester :</strong> {{ material.semester }}</p>
                    <p><strong>Course Name :</strong> {{ material.name }} <strong v-if="material.course_code != ''"> |
                        Course Code : </strong>{{ material.course_code }}</p>
                    <p><strong>Session : </strong>{{ material.session }}</p>
                  </td>
                  <td>
                    <div class="d-flex justify-content-center">
                      <button type="button" class="btn btn-primary btn-sm"
                        @click="downloadMaterials('lecture_sheets', material.id, material.download_key)">Download
                      </button>
                    </div>
                  </td>
                </tr>
              </table>
              <h3 class="p-4 text-center text-uppercase text-danger" v-else>
                <p>😢</p>
                <small>Lecture Sheets Materials Not Found</small>
              </h3>
            </div>
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
      departments: [],
      semester: "",
      materials: {
        syllabus: "",
        questions: "",
        lesson_plans: "",
        lecture_sheets: "",
      },
      filter: {
        materials_type: "",
        department_id: "",
        semester: "",
      },
    }
  },
  mounted() {
    this.getDepartment();
  },
  methods: {
    async getDepartment() {
      return await this.$axios.get('/public/get_departments_without_shift')
        .then((response) => {
          this.departments = response.data;
        })
        .catch((error) => {
        })
    },
    async getMaterials() {
      var token = window.$nuxt.$cookies.get('token');
      this.materials.syllabus = "";
      this.materials.questions = "";
      this.materials.lesson_plans = "";
      this.materials.lecture_sheets = "";
      if (this.filter.materials_type == 'Syllabus') {
        return await this.$axios.post('/find_material_syllabus?token=' + token, this.filter)
          .then((response) => {
            this.materials.syllabus = response.data.data;
            $(".form-text").html("&nbsp;");
          })
          .catch((error) => {
            this.$toast.error(error.response.data.error, { icon: "error_outline" });
            $(".form-text").html("&nbsp;");
            $.each(error.response.data, function (index, value) {
              $("#" + index + "_help").html(value[0]);
            });
            if (error.response.status == 422) {
              this.$toast.error('Validation Error', { icon: "error_outline" });
            }
          })
      }
      if (this.filter.materials_type == 'Questions') {
        return await this.$axios.post('/find_material_questions?token=' + token, this.filter)
          .then((response) => {
            this.materials.questions = response.data.data;
            $(".form-text").html("&nbsp;");
          })
          .catch((error) => {
            this.$toast.error(error.response.data.error, { icon: "error_outline" });
            $(".form-text").html("&nbsp;");
            $.each(error.response.data, function (index, value) {
              $("#" + index + "_help").html(value[0]);
            });
            if (error.response.status == 422) {
              this.$toast.error('Validation Error', { icon: "error_outline" });
            }
          })
      }
      if (this.filter.materials_type == 'Lesson Plans') {
        return await this.$axios.post('/find_material_lesson_plans?token=' + token, this.filter)
          .then((response) => {
            this.materials.lesson_plans = response.data.data;
            $(".form-text").html("&nbsp;");
          })
          .catch((error) => {
            this.$toast.error(error.response.data.error, { icon: "error_outline" });
            $(".form-text").html("&nbsp;");
            $.each(error.response.data, function (index, value) {
              $("#" + index + "_help").html(value[0]);
            });
            if (error.response.status == 422) {
              this.$toast.error('Validation Error', { icon: "error_outline" });
            }
          })
      }
      if (this.filter.materials_type == 'Lecture Sheets') {
        return await this.$axios.post('/find_material_lecture_sheets?token=' + token, this.filter)
          .then((response) => {
            this.materials.lecture_sheets = response.data.data;
            $(".form-text").html("&nbsp;");
          })
          .catch((error) => {
            this.$toast.error(error.response.data.error, { icon: "error_outline" });
            $(".form-text").html("&nbsp;");
            $.each(error.response.data, function (index, value) {
              $("#" + index + "_help").html(value[0]);
            });
            if (error.response.status == 422) {
              this.$toast.error('Validation Error', { icon: "error_outline" });
            }
          })
      }
    },
    async downloadMaterials(type, id, key) {
      var token = window.$nuxt.$cookies.get('token');
      return await this.$axios.get('/material/' + type + '/' + id + '/' + key + '/download?token=' + token, { responseType: 'blob' })
        .then((response) => {
          var filename = type + '_' + id;
          const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', filename + '.pdf') //or any other extension
          document.body.appendChild(link)
          link.click()
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error('Not found', { icon: "error_outline" });
        })
    }
  }
}
</script>
