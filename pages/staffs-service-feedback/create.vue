<template>
  <section>
    <div class="card rounded">
      <div class="px-3">

        <div class="d-flex justify-content-between py-3">

          <div class="">
            <h4>Staffs Service Feedback Create</h4>
          </div>

          <div class="">
            <nuxt-link to="/staffs-service-feedback" class="btn btn-primary">Feedback Lists</nuxt-link>
          </div>

        </div>

        <form @submit.prevent="createServiceFeedback()">
          <div class="row">

            <div style="display: none" class="">
              <div class="form-group">

                <input class="form-control" type="number" v-model="semester" readonly>

                <label for="">Semester <span class="text-danger">*</span></label>
              </div>
            </div>

            <div class="form-horizontal mb-3">
              <div class="form-group">
                <label for="">Department <span class="text-danger">*</span></label>

                <model-list-select v-if="employeeDepartments.length > 0"
                                   @input="departmentWiseEmployee()"
                                   :list="employeeDepartments"
                                   v-model="employee_department_id"
                                   option-value="id"
                                   :custom-text="nameAndShortCode"
                                   placeholder="select department">
                </model-list-select>



                <select style="display: none" name="semester" class="form-control"></select>


              </div>
            </div>

            <div>

            </div>

            <div class=" mb-3">
              <div class="table-responsive">
                <table class="table table-bordered bg-gray">

                  <thead>
                  <tr>
                    <th class="text-center">ক্রঃ নং<br> Serial No</th>
                    <th class="text-center"> নির্বাচন করুন<br> select</th>
                    <th class="text-center"> প্রোফাইল<br> Profile</th>

                    <th class="text-center"> পয়েন্ট<br>Point</th>

                  </tr>
                  </thead>

                  <tbody>

                  <tr v-for="(row,index) in departmentWiseEmployees" :key="index">
                    <td> {{ index + 1 }}</td>
                    <td>
                      <input type="checkbox" v-model="row.select">
                    </td>

                    <td>

                      <img :src="row.photo_url" :alt="row.name" class="imgClass"> <br>
                      {{ row.name }} <br>
                      {{ row.designation }} <br>
                      {{ row.department }}
                    </td>

                    <td>

                      <table class="table table-bordered">

                        <thead>
                        <tr>
                          <th class="text-center">বিবরণ <br>Description</th>
                          <th class="text-center">অতুলনীয় (৫) <br>Excellent (5)</th>
                          <th class="text-center">অতি ভালো (৪) <br>Very Good (4)</th>
                          <th class="text-center">ভালো (৩) <br>Good (3)</th>
                          <th class="text-center">চলনসই (২) <br>Not Bad (2)</th>
                          <th class="text-center">খারাপ (১) <br>Bad (1)</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr v-for="(feedbackCategory,i) in row.feedbackCategories" :key="i">
                          <td class="text-left">
                            {{ feedbackCategory.title }} <br>
                            {{ feedbackCategory.english_title }}
                          </td>
                          <td>
                            <input style="cursor: pointer" type="radio" value="5" v-model="feedbackCategory.point">
                          </td>
                          <td>
                            <input style="cursor: pointer" type="radio" value="4" v-model="feedbackCategory.point">
                          </td>
                          <td>
                            <input style="cursor: pointer" type="radio" value="3" v-model="feedbackCategory.point">
                          </td>
                          <td>
                            <input style="cursor: pointer" type="radio" value="2" v-model="feedbackCategory.point">
                          </td>
                          <td>
                            <input style="cursor: pointer" type="radio" value="1" v-model="feedbackCategory.point">
                          </td>
                        </tr>
                        </tbody>

                      </table>
                    </td>

                  </tr>

                  </tbody>


                </table>
              </div>
            </div>

            <div class="d-flex justify-content-end">
              <div class="form-group">
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  </section>
</template>

<script>
import 'vue-search-select/dist/VueSearchSelect.css'
import {ModelListSelect} from 'vue-search-select'

export default {
  name: "index",
  components: {
    ModelListSelect
  },
  data() {
    return {
      semester: '',
      errors: '',
      employeeDepartments: [],
      employee_department_id: '',
      departmentWiseEmployees: [],
    }
  },

  methods: {

    nameAndShortCode(item) {
      return `${item.name}`
    },

    async getStudentSemesterLists() {
      var token = window.$nuxt.$cookies.get('token');
      var user = window.$nuxt.$cookies.get('user');

      return await this.$axios.get('/get-student-semester/' + user.id + '?token=' + token)
        .then((response) => {
          this.semester = response.data.current_semester;
        })
        .catch((error) => {
          if (error.response.status == 400) {
            this.$toast.success('Something went wrong.Please try again!.', {icon: "error_outline"});
          } else if (error.response.status == 422) {
            this.$toast.success('Validation Error!.', {icon: "error_outline"});
          } else {
            this.$toast.success('Something went wrong.Please try again!.', {icon: "error_outline"});
          }
        })
    },

    async getEmployeeDepartmentLists() {
      var token = window.$nuxt.$cookies.get('token');

      return await this.$axios.get('student/employee-department' + '?token=' + token)
        .then((response) => {
          this.employeeDepartments = response.data;
        })
        .catch((error) => {
          if (error.response.status == 400) {
            this.$toast.success('Something went wrong.Please try again!.', {icon: "error_outline"});
          } else if (error.response.status == 422) {
            this.$toast.success('Validation Error!.', {icon: "error_outline"});
          } else {
            this.$toast.success('Something went wrong.Please try again!.', {icon: "error_outline"});
          }
        })
    },

    async departmentWiseEmployee() {

      var token = window.$nuxt.$cookies.get('token');

      return await this.$axios.get('student/department-wise-employee-lists/' + this.employee_department_id + '?token=' + token)
        .then((response) => {
          this.departmentWiseEmployees = response.data.data;
        })
        .catch((error) => {
          if (error.response.status == 400) {
            this.$toast.success('Something went wrong.Please try again!.', {icon: "error_outline"});
          } else if (error.response.status == 422) {
            this.$toast.success('Validation Error!.', {icon: "error_outline"});
          } else {
            this.$toast.success('Something went wrong.Please try again!.', {icon: "error_outline"});
          }
        })
    },


    createServiceFeedback() {
      var vm = this;
      var token = window.$nuxt.$cookies.get('token');
      var user = window.$nuxt.$cookies.get('user');

      if (!user) {

        this.$toast.primary('Please login as a student', {icon: "error_outline"});
        return false;

      } else if (!vm.semester) {

        this.$toast.primary('Please select semester', {icon: "error_outline"});
        return false;

      } else {

        return this.$axios.post('/student/staffs-service-feedback?token=' + token, {

          semester: vm.semester,
          departmentWiseEmployees: vm.departmentWiseEmployees,
          employee_department_id: vm.employee_department_id,

        })
          .then((response) => {
            this.$toast.success(response.data.message, {icon: "error_outline"});

            vm.employee_department_id = '';
            vm.departmentWiseEmployees = [];

          })
          .catch((error) => {

            if (error.response.status == 400) {
              this.$toast.error('Something went wrong.Please try again!.', {icon: "error_outline"});
            } else if (error.response.status == 422) {
              this.$toast.error('Validation Error!.', {icon: "error_outline"});
            } else if (error.response.status == 405) {
              this.$toast.error(error.response.data.message, {icon: "error_outline"});
            } else {
              this.$toast.error('Something went wrong.Please try again!.', {icon: "error_outline"});
            }

          })
      }
    },

  },

  created() {
    this.getStudentSemesterLists();
    this.getEmployeeDepartmentLists();
  }
}

</script>

<style scoped>
.imgClass {
  width: 60px;
  height: 60px;
  border-radius: 100%;
}
.form-horizontal{
  box-shadow: none;
  padding-bottom:0px !important;
}
.ui.fluid.dropdown {
  height: 50px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding-top: 10px;

}

</style>
