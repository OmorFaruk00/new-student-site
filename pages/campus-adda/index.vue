<template>
  <section>
    <div class="form-horizontal">
      <div class="form-header  py-2">Campus Adda (Registration Form For Campus Adda)</div>
      <div class="px-3">

        <div class="row">
          <div class="col-12">

            <h4 class="text-primary"> Registration requirements:</h4>
            <ul style="list-style: square" class="ml-3">
              <li> ঢাকা ইন্টারন্যাশনাল ইউনিভার্সিটির সকল শিক্ষার্থীরা অংশগ্রহণ করতে পারবে।</li>
              <li> অংশগ্রহণকারীরা অবশ্যই একই ব্যাচের হতে হবে। (একই ব্যাচের একাধিক গ্রূপ হতে পারে)</li>
              <li> সর্বনিম্ন ৪ জন এবং সর্বোচ্চ ৬ জন এর টিম হতে হবে।</li>
              <li> অনুষ্ঠান উপস্থাপনা করতে সক্ষম এমন একজন অবশ্যই থাকতে হবে।</li>
              <li> সাংস্কৃতিক কার্যক্রম (গান,কৌতুক,কবিতা আবৃত্তি) জানে এমন ১জন অবশ্যই থাকতে হবে।</li>
              <li> অংশগ্রহণকারীকে অবশ্যই শুটিং এর সময় ক্যাম্পাসে উপস্থিত থাকতে হবে।</li>
            </ul>
          </div>
        </div>


        <div class="row mt-2">
          <div class="col-12">
            <h4 class="text-primary">Form submit instruction:</h4>
            <ul style="list-style: square" class="ml-3">
              <li> Min 4 and max 6 member allowed</li>
              <li>First, select your team member and press add button</li>
              <li>Second, select your member activities from dropdown</li>
              <li>Third, upload casual image individual team member from choose file</li>
              <li>Fourth, then click submit button</li>
              <li>Fifth, your registration complete</li>
            </ul>
          </div>
        </div>

        <div class="row" v-if="register_check == '1'">
          <div class="col-12">
            <h1 class="text-center text-primary">You have registered</h1>
          </div>
        </div>

        <div class="row" v-if="register_check == '0'">

          <div class="col-lg-12 col-md-12 col-sm-12 mt-4">
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                <tr>
                  <td>Sl</td>
                  <td>Name / Roll</td>
                  <td>Facebook Url</td>
                  <td>Member Activities</td>
                  <td>Image (Casual Image)</td>
                  <td>Action</td>
                </tr>
                </thead>

                <tbody id="docUpload">

                <tr v-for="(row,index) in teamMember" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ row.name }} / {{ row.roll_no }}</td>

                  <td>
                    <div class="form-group" style="min-width: 200px">
                      <input type="text" class="form-control" v-model="row.fb_url" placeholder="enter facebook url">
                    </div>
                  </td>

                  <td>
                    <div class="form-group" style="min-width: 200px">
                      <select v-model="row.member_activity" class="form-control">
                        <option value="Program Anchor">Program Anchor</option>
                        <option value="Cultural">Cultural</option>
                        <option value="Adda Bazz">Adda Bazz</option>
                      </select>
                    </div>

                  </td>
                  <td>
                    <input type="file" accept="image/*">
                    <br>

                    <span class="text-danger">Upload file extension must be jpg / png and max size 1024KB</span>
                  </td>
                  <td>

                    <button v-if="user.id != row.student_id" type="button" class="btn btn-danger"
                            @click="delete_row(row)"><i
                      class="fa fa-trash"></i></button>

                  </td>
                </tr>
                </tbody>

              </table>

            </div>
          </div>

          <div class="col-lg-3 col-md-3"></div>
          <div class="col-lg-4 col-md-4 col-sm-12">
            <div class="form-group focused my-4">

              <select v-model="team_member_id" class="custom-select form-control" name="team_member_id">
                <option value="" selected disabled hidden>select one</option>
                <option v-for="(batch_mate,index) in batch_mates" :key="index" :value="batch_mate.id">
                  {{ batch_mate.roll_no }} - {{ batch_mate.name }} - {{ batch_mate.reg_code }}
                </option>
              </select>

              <label for="semester">Team Member *</label>
            </div>
          </div>

          <div class="col-lg-2 col-md-2 col-sm-12 mt-4">
            <button type="button" @click="addTeamMember" class="btn btn-primary" style="margin-top: -1px;"> Add</button>
          </div>

          <div class="col-lg-3 col-md-3"></div>


          <div class="col-12">
            <button type="button" class="btn btn-primary" @click="submit">submit</button>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>


<script>
export default {
  // middleware: 'authenticated',
  // middleware: ['authenticated', 'feedbackAuthenticated'],
  data: function () {
    return {
      batch_mates: [],
      team_member_id: '',
      member_activity: '',
      member_member_activity: '',
      teamMember: [],
      user: [],
      errors: '',
      register_check: '',
      authuser: '',
    }
  },
  mounted() {
    this.authuser = window.$nuxt.$cookies.get("user");

  },
  methods: {

    async registrationCheck() {
      let vm = this;
      var token = window.$nuxt.$cookies.get('token');
      var user = window.$nuxt.$cookies.get('user');
      return await this.$axios.get('already-registered-check' + '?token=' + token)
        .then((response) => {

          vm.register_check = response.data.data

        })
        .catch((error) => {

        })
    },


    async getBatchMate() {
      var token = window.$nuxt.$cookies.get('token');
      var user = window.$nuxt.$cookies.get('user');
      return await this.$axios.get('/student_batch_mate/' + user.id + '?token=' + token)
        .then((response) => {
          this.batch_mates = response.data;
        })
        .catch((error) => {
          this.$toast.error('Not found', {icon: "error_outline"});
        })
    },

    addTeamMember() {

      var vm = this;

      if (vm.teamMember.length > 5) {
        vm.$toast.primary('Only Max 6 Team Members Allowed', {icon: "error_outline"});
        return false;
      }

      if (!vm.team_member_id) {

        this.$toast.success('Please Select batch mate', {icon: "error_outline"});
        return false;

      } else {

        var team_member_id = vm.team_member_id;

        let items = vm.batch_mates;

        let student_details = [];
        for (let i = 0; i < items.length; i++) {
          if (items[i].id == team_member_id) {
            student_details.push(items[i].name);
          }
        }

        let code_separator = "";
        let name = "";
        student_details.forEach(word => {
          name += code_separator + word;
          code_separator = " [] ";
        });

        let student_roll = [];
        for (let i = 0; i < items.length; i++) {
          if (items[i].id == team_member_id) {
            student_roll.push(items[i].roll_no);
          }
        }

        let code_separator2 = "";
        let roll_no = "";
        student_roll.forEach(word => {
          roll_no += code_separator2 + word;
          code_separator2 = " [] ";
        });


        vm.teamMember.push({
          student_id: team_member_id,
          name: name,
          fb_url: 'https://www.facebook.com/',
          roll_no: roll_no,
          member_activity: 'Cultural',
          image_url: '',
        });

        vm.team_member_id = '';
      }
    },

    addDefaultMember() {
      let vm = this;    

      vm.teamMember.push({
        student_id: vm.authuser.id,
        name: vm.user.name,
        fb_url: 'https://www.facebook.com/',
        roll_no: vm.user.roll_no,
        member_activity: 'Program Anchor',
        image_url: '',
      });
    },

    delete_row: function (row) {
      this.teamMember.splice(this.teamMember.indexOf(row), 1);
    },

    submit() {

      let vm = this;

      if (vm.teamMember.length < 4) {
        vm.$toast.primary('Min 4 and Max 6 members allowed', {icon: "error_outline"});
        return false;
      }

      var token = window.$nuxt.$cookies.get('token');
      var formData = new FormData();
      $('#docUpload input').each(function (i, item) {
        if (item.type == 'file') {
          // console.log(item.files[0]);
          formData.append('file[]', item.files[0]);
        }
      });
      formData.append('teamMember', JSON.stringify(vm.teamMember));

      this.$axios.post('student/campus-adda' + '?token=' + token, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response) => {

          this.$toast.success(response.data.message, {icon: "error_outline"});

          vm.teamMember = [];
          vm.$emit('addDefaultMember');

        })
        .catch((error) => {

          vm.errors = error.response.data;

          if (error.response.status == 401) {
            this.$toast.primary(error.response.data.error, {icon: "error_outline"});
          } else if (error.response.status == 400) {
            this.$toast.primary(error.response.data.error, {icon: "error_outline"});
          } else if (error.response.status == 422) {

            this.$toast.primary('Image must be a file of type: jpeg, jpg, png and max size 1024KB', {icon: "error_outline"});
          } else {
            this.$toast.primary('Something went to wrong', {icon: "error_outline"});
          }

        })

    }

  },
  created() {
    this.getBatchMate();
    this.addDefaultMember();
    this.registrationCheck();

    this.$on('addDefaultMember', () => {
      this.addDefaultMember();
      this.registrationCheck();
    });
  }
}
</script>
