<template>
  <section>
    <div class="card">
      <div class="card-body">

        <div class="row">

         <div class="d-flex justify-content-between pb-3">
          <div class="">
            <h4>Teachers Service Feedback Create</h4>
          </div>

          <div class="">
            <nuxt-link to="/teachers-service-feedback" class="btn btn-primary">Feedback Lists</nuxt-link>
          </div>
         </div>

          <div class="col-lg-12 col-md-12 col-sm-12 mb-4">
            <p style="font-size: 14px;color: darkgreen">
              *** নিম্নলিখিত প্রতিটি বিষয়ের উপর শিক্ষকদের মূল্যায়ন করুন। দক্ষতা অনুযায়ী ১ (খারাপ ) থেকে ৫ (অতুলনীয় )
              পর্যন্ত
              যে
              কোন একটি নম্বর বক্স চিহ্নিত করুন। উল্লেখ্য, আপনার মূল্যায়ন সম্পূর্ণ গোপন রাখা হবে এবং সংশ্লিষ্ট শিক্ষকের
              কাছে
              কখনোই জানানো হবে না ।

            </p>

            <br>
            <p style="font-size: 14px;color: darkgreen">*** Make evaluation report of your teacher. Give your opinion in
              the box below from bad to excellent.It
              is notice that evaluation report should be confidential and never published</p>

          </div>

        </div>

        <form @submit.prevent="createServiceFeedback()">
          <div class="row">

            <div style="display: none" class="col-lg-10 col-md-10 col-sm-12 offset-lg-1 offset-md-1 mb-3">
              <div class="form-group">
                <input class="form-control" type="number" v-model="semester" readonly>
                <label for="">Semester <span class="text-danger">*</span></label>
              </div>
            </div>

            <div class="form-horizontal mb-4">
              <div class="form-group">
                <label for="">Course / Teacher Name <span class="text-danger">*</span></label>
                <select name="semester" id="teacher_id" v-model="teacher"
                        class="form-control">
                  <option value="" selected disabled hidden>Select one</option>
                  <option v-for="(row,index) in teachers" :key="index"
                          :value="row">
                    {{ row.course_code }} -
                    {{ row.course_name }} /
                    {{ row.teacher_name }} ({{ row.teacher_position }})
                  </option>
                </select>

               
              </div>
            </div>

            <div class="">
              <div class="table-responsive">
                <table class="table table-bordered bg-gray">

                  <thead>
                  <tr>
                    <th class="text-center">ক্রঃ নং <br> Sl. No</th>
                    <th class="text-center">বিবরণ <br>Description</th>
                    <th class="text-center">অতুলনীয় (৫) <br>Excellent (5)</th>
                    <th class="text-center">অতি ভালো (৪) <br>Very Good (4)</th>
                    <th class="text-center">ভালো (৩) <br>Good (3)</th>
                    <th class="text-center">চলনসই (২) <br>Not Bad (2)</th>
                    <th class="text-center">খারাপ (১) <br>Bad (1)</th>
                  </tr>
                  </thead>

                  <tbody>
                  <tr v-for="(feedback,index) in feedbacks" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>
                      {{ feedback.title }} <br>
                      {{ feedback.english_title }}
                    </td>
                    <td>
                      <input style="cursor: pointer" type="radio" value="5" v-model="feedback.point">
                    </td>
                    <td>
                      <input style="cursor: pointer" type="radio" value="4" v-model="feedback.point">
                    </td>
                    <td>
                      <input style="cursor: pointer" type="radio" value="3" v-model="feedback.point">
                    </td>
                    <td>
                      <input style="cursor: pointer" type="radio" value="2" v-model="feedback.point">
                    </td>
                    <td>
                      <input style="cursor: pointer" type="radio" value="1" v-model="feedback.point">
                    </td>
                  </tr>
                  </tbody>


                </table>
              </div>
            </div>

            <div class="form-horizontal py-5">
              <div class="form-group">
              <textarea class="form-control"
                        placeholder="সংশ্লিষ্ট  শিক্ষক  কিভাবে  তার দক্ষতা আরও  বৃদ্ধি করতে পারেন / How the concerned teacher can further enhance his skills ?"
                        name="skillIncrease"
                        id="skillIncrease" cols="30" rows="2"
                        v-model="skillIncrease"></textarea>

                <label for="">সংশ্লিষ্ট শিক্ষক কিভাবে তার দক্ষতা আরও বৃদ্ধি করতে পারেন / How the concerned teacher can
                  further enhance his skills ?</label>
              </div>
            </div>

            <div class="form-horizontal pt-3">
              <div class="form-group">
              <textarea class="form-control"
                        placeholder="অন্যান্য  মন্তব্য  (সংশ্লিষ্ট  শিক্ষক  সংক্রান্ত ) / Other Comments (Concerned Teachers)"
                        name="otherComments"
                        id="otherComments" cols="30" rows="2"
                        v-model="otherComments"></textarea>

                <label for="">অন্যান্য মন্তব্য (সংশ্লিষ্ট শিক্ষক সংক্রান্ত ) / Other Comments (Concerned
                  Teachers)</label>
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

import {mapActions} from "vuex";

export default {
  name: "index",
  data() {
    return {
      errors: [],
      semester: '',
      teacher: '',
      teachers: [],
      feedbackCategories: [],
      feedbacks: [],
      skillIncrease: '',
      otherComments: '',
    }
  },

  methods: {

    ...mapActions({
      fetchFeedBackStatus: "teacherFeedbackStatus/fetchFeedBackStatus"
    }),

    async getStudentSemesterLists() {
      var token = window.$nuxt.$cookies.get('token');
      var user = window.$nuxt.$cookies.get('user');

      return await this.$axios.get('/get-student-semester/' + user.id + '?token=' + token)
        .then((response) => {
          this.semester = response.data.current_semester;

          this.fetchSemesterWiseTeacherprimarys();
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

    async fetchSemesterWiseTeacherprimarys() {

      var token = window.$nuxt.$cookies.get('token');
      var user = window.$nuxt.$cookies.get('user');

      return await this.$axios.get('/get-student-teacher-course/' + user.id + '/' + this.semester + '?token=' + token)
        .then((response) => {
          this.teachers = response.data.courseAndTeacher;
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

    async fetchCategoriesList() {

      var token = window.$nuxt.$cookies.get('token');
      var user = window.$nuxt.$cookies.get('user');

      var vm = this;

      return await this.$axios.get('/student/teacher-service-feedback-category/' + '?token=' + token)
        .then((response) => {

          const feedbackCategories = response.data;
          for (const value of feedbackCategories) {
            vm.feedbacks.push({
              categoryId: value.id,
              title: value.title,
              english_title: value.english_title,
              point: 2,
            })
          }

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

    async createServiceFeedback() {

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

        return await this.$axios.post('/student/teacher-service-feedback?token=' + token, {
          semester: vm.semester,
          teacher: vm.teacher,
          skillIncrease: vm.skillIncrease,
          otherComments: vm.otherComments,
          feedbacks: vm.feedbacks,
        })
          .then((response) => {

            vm.teacher = '';
            vm.skillIncrease = '';
            vm.otherComments = '';

            this.$toast.success(response.data.message, {icon: "error_outline"});
            this.fetchFeedBackStatus();

          })
          .catch((error) => {

            vm.errors = error.response.data;

            if (error.response.status == 400) {
              this.$toast.error('Something went wrong.Please try again!.', {icon: "error_outline"});
            } else if (error.response.status == 422) {
              this.$toast.error('Validation Error!.', {icon: "error_outline"});
            } else if (error.response.status == 403) {
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
    this.fetchCategoriesList();
  },
}

</script>

<style scoped>
.form-horizontal{
  box-shadow: none;
  padding-bottom:0px !important;
}
</style>
