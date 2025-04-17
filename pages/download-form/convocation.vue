<template>
  <section>
    <div class="form-horizontal col-lg-6 mx-auto">
      <div class="form-header py-2">Download Convovation Form</div>

      <div class="px-3">


        <h5 class="card-title">For Dual Degree (Second Degree Information)</h5>

        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-12 ">
            <div class="form-check p-4">
              <input type="checkbox" v-model="second_degree" class="form-check-input" id="second">
              <label class="form-check-label" for="second">Second Degree Information</label>
            </div>
          </div>
        </div>

        <div class="row" v-if="second_degree == true">
          <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="form-group">
              <label for="">Program / Degree</label>
              <input type="text" class="form-control" v-model="form.program" placeholder="Enter program or degree">
            </div>
          </div>

          <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="form-group">
              <label for="">Major In</label>
              <input type="text" class="form-control" v-model="form.major_in" placeholder="Enter major in">
            </div>
          </div>

          <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="form-group">
              <label for="">Roll No</label>
              <input type="number" class="form-control" v-model="form.roll_no" placeholder="Enter roll">
            </div>
          </div>

          <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="form-group">
              <label for="">Registration No</label>
              <input type="text" class="form-control" v-model="form.registration_no"
                     placeholder="Enter registration no">
            </div>
          </div>

          <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="form-group">
              <label for="">Batch</label>
              <input type="text" class="form-control" v-model="form.batch" placeholder="Enter batch">
            </div>
          </div>

          <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="form-group">
              <label for="">Session</label>
              <input type="text" class="form-control" v-model="form.session" placeholder="Enter session">
            </div>
          </div>

          <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="form-group">
              <label for="">Group</label>
              <input type="text" class="form-control" v-model="form.group" placeholder="Enter group">
            </div>
          </div>

          <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="form-group">
              <label for="">Duration of the Course (Month)</label>
              <input type="text" class="form-control" v-model="form.duration_of_the_course"
                     placeholder="Enter duration of the course">
            </div>
          </div>

          <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="form-group">
              <label for="">Shift</label>
              <select name="shift" id="shift" class="form-control" v-model="form.shift">
                <option value="" selected disabled hidden>Select one</option>
                <option value="First Shift">First Shift</option>
                <option value="Second Shift">Second Shift</option>
              </select>
            </div>
          </div>

          <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="form-group">
              <label for="">Passing Year</label>
              <input type="text" class="form-control" v-model="form.passing_year" placeholder="Enter passing year">
            </div>
          </div>

          <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="form-group">
              <label for="">Result (CGPA)</label>
              <input type="text" class="form-control" v-model="form.result" placeholder="Enter result">
            </div>
          </div>

          <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="form-group">
              <label for="">Result Published Date</label>

              <no-ssr>
                <datepicker class="custom-datepicker form-control" placeholder="Select date" v-model="form.result_published_date"></datepicker>
              </no-ssr>
            </div>
          </div>

        </div>

      
          <div class="pb-5">
            <button class="btn btn-primary" :disabled="loading" @click="getConvocationForm">Download
              <i
                v-if="loading" class="fa fa-spinner fa-spin ml-1"></i>
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
  name: "convocation",

  data() {
    return {
      second_degree: '',
      form: {
        program: '',
        major_in: '',
        roll_no: '',
        registration_no: '',
        batch: '',
        session: '',
        group: '',
        duration_of_the_course: '',
        shift: '',
        passing_year: '',
        result: '',
        result_published_date: '',
      },
      loading: false
    }
  },

  methods: {
    async getConvocationForm() {
      var vm = this;

      vm.loading = true;
      var token = window.$nuxt.$cookies.get('token');
      var user = window.$nuxt.$cookies.get('user');

      if (vm.second_degree == true) {
        if (!vm.form.program) {
          this.$toast.info('Please enter program', {icon: "error_outline"});
          return false;
        } else if (!vm.form.major_in) {
          this.$toast.info('Please enter major', {icon: "error_outline"});
          return false;
        } else if (!vm.form.roll_no) {
          this.$toast.info('Please enter roll no', {icon: "error_outline"});
          return false;
        } else if (!vm.form.registration_no) {
          this.$toast.info('Please enter registration no', {icon: "error_outline"});
          return false;
        } else if (!vm.form.batch) {
          this.$toast.info('Please enter batch', {icon: "error_outline"});
          return false;
        } else if (!vm.form.session) {
          this.$toast.info('Please enter session', {icon: "error_outline"});
          return false;
        } else if (!vm.form.group) {
          this.$toast.info('Please enter group', {icon: "error_outline"});
          return false;
        } else if (!vm.form.duration_of_the_course) {
          this.$toast.info('Please enter duration of the course', {icon: "error_outline"});
          return false;
        } else if (!vm.form.shift) {
          this.$toast.info('Please select shift', {icon: "error_outline"});
          return false;
        } else if (!vm.form.passing_year) {
          this.$toast.info('Please enter passing year', {icon: "error_outline"});
          return false;
        } else if (!vm.form.result) {
          this.$toast.info('Please enter result', {icon: "error_outline"});
          return false;
        } else if (!vm.form.result_published_date) {
          this.$toast.info('Please enter result published date', {icon: "error_outline"});
          return false;
        } else {
          this.convocationDownloadApi()
        }
      } else {
        this.convocationDownloadApi()
      }

    },

    convocationDownloadApi() {

      var vm = this;
      var token = window.$nuxt.$cookies.get('token');
      var user = window.$nuxt.$cookies.get('user');
      vm.loading = true;

      return this.$axios.get('/student/convocation-form?token=' + token, {
        params: {
          program: vm.form.program,
          major_in: vm.form.major_in,
          roll_no: vm.form.roll_no,
          registration_no: vm.form.registration_no,
          batch: vm.form.batch,
          student_session: vm.form.session,
          group: vm.form.group,
          duration_of_the_course: vm.form.duration_of_the_course,
          shift: vm.form.shift,
          passing_year: vm.form.passing_year,
          result: vm.form.result,
          result_published_date: vm.form.result_published_date,
          second_degree: vm.second_degree,
        },
        responseType: 'blob',
      })
        .then((response) => {

          const content = response.headers['content-type'];
          download(response.data, 'convocation', content);

          this.$toast.success('Convocation Form Download Successfully', {icon: "error_outline"});

          vm.form.program = '';
          vm.form.major_in = '';
          vm.form.roll_no = '';
          vm.form.registration_no = '';
          vm.form.batch = '';
          vm.form.session = '';
          vm.form.group = '';
          vm.form.duration_of_the_course = '';
          vm.form.shift = '';
          vm.form.passing_year = '';
          vm.form.result = '';
          vm.form.result_published_date = '';
          vm.second_degree = '';
          vm.loading = false;

        })
        .catch((error) => {

          this.$toast.info('Somethings went to wrong', {icon: "error_outline"});

        }).finally((final) => {
          this.loading = false;
        })
    }
  }
}
</script>

<style scoped>
/deep/ .custom-datepicker input {

  border: none !important;
  padding: 5px 10px 0 10px;
  width: 100% !important;
  

}
</style>
