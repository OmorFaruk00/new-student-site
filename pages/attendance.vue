<template>
  <section>
    <div class="form-horizontal db-gp">
      <div class="form-header py-2">Attendance Report</div>
      <div class="px-3">

        <form @submit.prevent="getAttendance">

          <div class="col-lg-4 col-lg-4 col-sm-12 offset-lg-4 offset-md-4 mb-2 mt-5">
            <div class="form-group focused mb-4">
              <select v-model="mSemester" class="custom-select form-control" id="semester" name="semester"
                      @change="getCourseOnPresentSemester()" required>
                <option value="" selected disabled hidden>select semester</option>
                <option v-for="(n,index) in 12" :key="index" :value="n">{{ n }}</option>
              </select>
              <label for="semester">Semester *</label>
            </div>
          </div>

          <div class="col-lg-4 col-lg-4 col-sm-12 offset-lg-4 offset-md-4 mb-2">
            <div class="form-group focused mb-0">
              <select v-model="mCourse" class="custom-select form-control" id="course" name="course" required>
                <option value="" selected disabled hidden>select course</option>
                <option v-for="(course, key) in courses" :key="key" :value="course.course_id">{{ course.course_code }} -
                  {{ course.course_name }}
                </option>
              </select>
              <label for="course">Course *</label>
            </div>
          </div>

          <div class="col-lg-4 col-lg-4 col-sm-12 offset-lg-4 offset-md-4 my-4">
            <button :disabled="loading" style="margin-left: 0px" type="submit" name="button" class="btn btn-sm btn-primary btn-block"> Show
              Attendance <i v-if="loading" class="fa fa-spinner fa-spin"></i>
            </button>
          </div>
        </form>

      </div>


      <div class="col-lg-6 col-md-6 col-sm-12 offset-lg-3 offset-md-3 mb-3 pt-5">
        <div v-if="attendances != ''" style="display:block;margin-left:10px">
          <br>
          <b>Class Count:</b> {{ classHappendCount }} <br>
          <b>You Present: </b> {{ totalAttendanceCount }}
        </div>

        <div class="table-responsive" v-if="attendances != ''">
          <table class="table table-striped table-bordered">
            <thead>
            <tr>
              <th>SL.</th>
              <th>Date</th>
              <th>A/P</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="(att,key,index) in attendances" :key="index">
              <td>{{ index + 1 }}</td>
              <td class="align-middle">
                {{ $moment(key).format('DD-MM-YYYY') }}
              </td>
              <td>
                {{ att }}
              </td>
            </tr>
            </tbody>
          </table>
        </div>

      </div>

    </div>
  </section>
</template>


<script>
export default {
  // middleware: 'feedbackAuthenticated',
  data() {
    return {
      mSemester: '',
      mCourse: '',
      courses: [],
      attendances: [],
      classHappendCount: 0,
      totalAttendanceCount: 0,
      loading: false
    }
  },

  methods: {
    async getCourseOnPresentSemester() {

      var token = window.$nuxt.$cookies.get('token');

      if (!this.mSemester) {
        this.$toast.error('Please, select a semester.', {icon: "error_outline"});
        return;
      }

      return await this.$axios.get('/student/get-course?semester=' + this.mSemester + '&token=' + token)
        .then((response) => {
          this.courses = response.data;

        })
        .catch((error) => {
          this.$toast.error('Not Course Found!', {icon: "error_outline"});
          this.courses = null;
        })
    },

    async getAttendance() {

      if (this.mSemester == null) {
        this.$toast.error('Please, select a semester.', {icon: "error_outline"});
        return;
      }

      if (!this.mCourse) {
        this.$toast.error('Select A Course!', {icon: "error_outline"});
        return;
      }

      var token = window.$nuxt.$cookies.get('token');

      this.attendances = '';
      this.loading = true;

      return await this.$axios.get('/student/get-course-attendance/' + this.mCourse + '?semester=' + this.mSemester + '&token=' + token)
        .then((response) => {
          this.attendances = response.data.attendance;
          this.classHappendCount = response.data.classHappendCount;
          this.totalAttendanceCount = response.data.totalAttendanceCount;

        })
        .catch((error) => {
          this.$toast.error('No attendance Found!', {icon: "error_outline"});
        }).finally((final) => {
          this.loading = false;
        })
    },

  }
}
</script>
