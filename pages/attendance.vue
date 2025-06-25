<template>
  <section>
    <div class="form-horizontal db-gp rounded">
      <div class="form-header">Attendance Report</div>
      <div class="px-3">
        <form @submit.prevent="getAttendance" class="col-lg-8 col-md-8 col-sm-12">
          <div class="mb-3">
            <div class="form-group focused">
              <label for="semester">Semester *</label>
              <select v-model="mSemester" class="custom-select form-control" id="semester" name="semester"
                @change="getCourseOnPresentSemester()" required>
                <option value="" selected disabled hidden>select semester</option>
                <option v-for="(n, index) in 12" :key="index" :value="n">{{ n }}</option>
              </select>
            </div>
          </div>
          <div class="mb-2">
            <div class="form-group focused">
              <label for="course">Course *</label>
              <select v-model="mCourse" class="custom-select form-control" id="course" name="course" required>
                <option value="" selected disabled hidden>select course</option>
                <option v-for="(course, key) in courses" :key="key" :value="course.course_id">{{ course.course_code }} -
                  {{ course.course_name }}
                </option>
              </select>

            </div>
          </div>

          <div class="py-3">
            <button :disabled="loading" style="margin-left: 0px" type="submit" name="button"
              class="btn btn-sm btn-primary btn-block"> Show
              Attendance <i v-if="loading" class="fa fa-spinner fa-spin"></i>
            </button>
          </div>
        </form>

      </div>


      <div class="col-lg-8 col-md-8 col-sm-12  mb-5 py-5 px-3">
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
              <tr v-for="(att, key, index) in attendances" :key="index">
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
        this.$toast.error('Please, select a semester.', { icon: "error_outline" });
        return;
      }

      return await this.$axios.get('/student/get-course?semester=' + this.mSemester + '&token=' + token)
        .then((response) => {
          this.courses = response.data;

        })
        .catch((error) => {
          this.$toast.error('Not Course Found!', { icon: "error_outline" });
          this.courses = null;
        })
    },

    async getAttendance() {

      if (this.mSemester == null) {
        this.$toast.error('Please, select a semester.', { icon: "error_outline" });
        return;
      }

      if (!this.mCourse) {
        this.$toast.error('Select A Course!', { icon: "error_outline" });
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
          this.$toast.error('No attendance Found!', { icon: "error_outline" });
        }).finally((final) => {
          this.loading = false;
        })
    },

  }
}
</script>
