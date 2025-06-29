<template>
  <section>
    <div class="card">
      <div class="form-header">Support Ticket Create</div>
      <div class="px-3">

        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-end ">

            <button v-if="supportTicketDetails.status == 'active'" class="btn btn-danger" type="button" style="margin-right: 10px;"
                    @click="changeStatus('canceled')">Cancel
            </button>


            <button v-if="supportTicketDetails.status == 'solved'" class="btn btn-info" type="button" style="margin-right: 10px;"
                    @click="changeStatus('active')">Re Open
            </button>
            <nuxt-link to="/support-ticket" class="btn btn-primary">Ticket Lists</nuxt-link>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <div class="table-responsive">


              <div v-if="supportTicketDetails.supportTicketReplies">
                <table class="table table-bordered" v-if="supportTicketDetails.supportTicketReplies.length > 0">
                  <tbody>

                  <tr>
                    <td class="bg-light text-left">Ticket Reply</td>
                    <td class="bg-light text-left">Message</td>
                  </tr>

                  <tr v-for="(row,index) in  supportTicketDetails.supportTicketReplies" :key="index">

                    <td class="text-left" style="width: 20%">

                      <span v-if="row.created_by != null">
                        <div>
                        <div class="db-pic-thumbs-round-md">
                          <img :src="url + '/' + row.user.profile_photo_file"
                               alt="">
                        </div>

                        <br>
                        <span v-text="row.user.name"></span> <br>
                        <span style="font-size: 11px;"
                              v-text="row.user.rel_designation.name"></span> <span
                          style="font-size: 11px;" v-html="row.user.rel_department.name"></span>
                        <br>
                        <span v-html="row.reply_date_time"></span> <br>
                      </div>
                      </span>

                      <span v-else>
                        Me
                      </span>

                    </td>

                    <td class="text-left">

                      <span v-html="row.reply_text"></span>

                      <div v-if="row.support_ticket_reply_files">
                        <br>
                        <a v-for="(row,index) in row.support_ticket_reply_files" :key="index"
                           target="_blank" :href="url + '/' + row.file_url"
                           :title="row.file_url">
                          <span class="material-icons">file_download</span>
                        </a>
                      </div>

                    </td>
                  </tr>

                  </tbody>
                </table>
              </div>


              <hr>


              <table class="table table-bordered">
                <tbody>

                <tr>
                  <td colspan="6" class="bg-light text-left">Ticket Details</td>
                </tr>
                <tr>
                  <th style="width: 20%">Id</th>
                  <td>
                    <span v-html="'IST-S-'+supportTicketDetails.id" class="badge badge-primary"></span>
                  </td>

                  <th>Status</th>
                  <td v-html="supportTicketDetails.status" class="text-capitalize"></td>

                  <th>Priority</th>
                  <td v-text="supportTicketDetails.priority" class="text-capitalize"></td>
                </tr>

                <tr>
                  <th>Subject</th>
                  <td colspan="3" class="text-left" v-text="supportTicketDetails.subject"></td>
                  <th>Type</th>
                  <td v-text="supportTicketDetails.type" class="text-capitalize"></td>
                </tr>

                <tr>
                  <th>Purpose</th>
                  <td colspan="5" class="text-left" v-text="supportTicketDetails.purpose"></td>
                </tr>

                <tr>
                  <th>Created By</th>
                  <td colspan="2">
                    <span v-text="supportTicketDetails.created_name"></span>
                  </td>

                  <th>Created at</th>
                  <td colspan="2" v-text="supportTicketDetails.created_at"></td>
                </tr>

                <template v-if="supportTicketDetails.assign_name">
                  <tr>
                    <th>Assign To</th>
                    <td colspan="2">
                      <span v-text="supportTicketDetails.assign_name"></span>
                    </td>

                    <th>Assign Time</th>
                    <td colspan="2" v-text="supportTicketDetails.assign_date_time"></td>
                  </tr>
                </template>

                <template v-if="supportTicketDetails.deny_name && supportTicketDetails.deny_date_time">
                  <tr>
                    <th>Deny By</th>
                    <td colspan="2">
                      <span v-text="supportTicketDetails.deny_name"></span>
                    </td>

                    <th>Deny at</th>
                    <td colspan="2" v-text="supportTicketDetails.deny_date_time"></td>

                  </tr>

                  <tr>
                    <th>Deny Report</th>
                    <td colspan="5" class="text-left" v-text="supportTicketDetails.deny_reason">
                    </td>
                  </tr>

                </template>


                <template v-if="supportTicketDetails.cancel_date_time">
                  <tr>
                    <th>Canceled By</th>
                    <td colspan="2">

                    <span
                      v-if="supportTicketDetails.canceled_by == null && supportTicketDetails.cancel_date_time != null">Me</span>
                      <span
                        v-if="supportTicketDetails.canceled_by != null && supportTicketDetails.cancel_date_time != null && supportTicketDetails.cancel_name"
                        v-text="supportTicketDetails.cancel_name"></span>

                    </td>

                    <th>Canceled at</th>
                    <td colspan="2" v-text="supportTicketDetails.cancel_date_time"></td>
                  </tr>
                </template>

                <template v-if="supportTicketDetails.completed_name && supportTicketDetails.completed_date_time">
                  <tr>
                    <th>Completed By</th>
                    <td colspan="2">
                      <span v-text="supportTicketDetails.completed_name"></span>
                    </td>

                    <th>Completed at</th>
                    <td colspan="2" v-text="supportTicketDetails.completed_date_time"></td>
                  </tr>
                </template>

                <template v-if="supportTicketDetails.permission_seeker_date_time">
                  <tr>
                    <th>Permission Asked at</th>
                    <td colspan="5" v-text="supportTicketDetails.permission_seeker_date_time"></td>
                  </tr>
                </template>

                <template v-if="supportTicketDetails.permission_seeker_name">
                  <tr>
                    <th>Permission Given By</th>
                    <td colspan="5">
                      <span v-text="supportTicketDetails.permission_seeker_name"></span>
                    </td>
                  </tr>

                  <tr>
                    <th>Permission Status</th>
                    <td colspan="2">
                                    <span v-if="supportTicketDetails.permission_status">
                                        <span class="badge text-uppercase"
                                              :class="supportTicketDetails.permission_status == 'yes' ? 'badge-success' : 'badge-danger'"
                                              v-text="supportTicketDetails.permission_status"></span>
                                    </span>
                    </td>

                    <th>Permission Given Feedback at</th>
                    <td colspan="2" v-text="supportTicketDetails.permission_seeker_feedback_date_time"></td>


                  </tr>
                </template>

                <template
                  v-if="supportTicketDetails.supportTicketFiles && supportTicketDetails.supportTicketFiles.length > 0">
                  <tr>
                    <th>Uploaded File</th>
                    <td colspan="5" class="text-left">

                      <a v-for="(row,index) in supportTicketDetails.supportTicketFiles" :key="index"
                         target="_blank" :href="url + '/' + row.file_url"
                         :title="row.file_url">
                        <span class="material-icons">file_download</span>
                      </a>


                    </td>
                  </tr>
                </template>

                </tbody>
              </table>

              <hr>

              <table class="table table-bordered" v-if="supportTicketDetails.status == 'active'">
                <tbody>

                <tr>
                  <td class="bg-light text-left">Reply</td>
                </tr>

                <tr>
                  <th>

                    <div class="col-lg-12 col-md-12 col-sm-12">
                      <div class="form-group text-left">
                          <textarea class="form-control" placeholder="Enter reply" name="reply"
                                    id="reply" cols="30" rows="2" v-model="reply"></textarea>
                      </div>

                      <div class="form-group text-left">
                        <input type="file" id="file_input" class="" name="file[]" v-on:change="fileValidationCheck"
                               multiple="multiple" accept=".doc,.docx,application/pdf,image/*">
                        <br>
                        <span class="text-danger">File extension must be doc,docx,pdf,jpeg,jpg,png and max file size 1024KB</span>

                      </div>
                    </div>

                    <div class="col-lg-12 col-md-12 col-sm-12 text-left">
                      <button type="button" @click="supportTicketReply" class="btn btn-primary">Submit
                      </button>
                    </div>

                  </th>
                </tr>

                </tbody>
              </table>

            </div>
          </div>

        </div>


      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "index",
  // middleware: 'feedbackAuthenticated',
  data() {
    return {
      id: this.$route.params.id,
      supportTicketDetails: '',
      reply: '',
      url: this.$axios.defaults.baseURL,
    }
  },

  methods: {
    async fetchTicketDetails() {
      var token = window.$nuxt.$cookies.get('token');

      return await this.$axios.get('student/support-ticket/' + this.id + '?token=' + token)
        .then((response) => {
          // console.log(response.data.data);
          this.supportTicketDetails = response.data.data;

          // console.log(this.supportTicketDetails.canceled_by,'.....')
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

    supportTicketReply() {
      var vm = this;
      var token = window.$nuxt.$cookies.get('token');

      if (!vm.reply) {
        toastr.error("Please enter reply");
        return false;
      } else {

        var formData = new FormData();
        var filesLength = document.getElementById('file_input').files.length;
        for (var i = 0; i < filesLength; i++) {
          formData.append("file[]", document.getElementById('file_input').files[i]);
        }

        formData.append('ticketId', vm.id);
        formData.append('reply', vm.reply);

        return this.$axios.post('/student/support-ticket-reply?token=' + token, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then((response) => {

            this.$toast.success(response.data.message, {icon: "error_outline"});
            vm.reply = '';
            $("#file_input").val('');

            this.fetchTicketDetails();

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

      }
    },

    changeStatus(status) {
      var token = window.$nuxt.$cookies.get('token');

      if (confirm("Do you really want to " + status + " ?")) {

        return this.$axios.post('/student/support-ticket-status?token=' + token, {
          ticketId: this.id,
          status: status
        })
          .then((response) => {

            this.$toast.success(response.data.message, {icon: "error_outline"});
            this.fetchTicketDetails();

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

      }
    },

    fileValidationCheck() {

      var formData = new FormData();
      var filesLength = document.getElementById('file_input').files.length;
      for (var i = 0; i < filesLength; i++) {

        var FileSize = document.getElementById('file_input').files[i].size / 1024 / 1024; // in MiB
        if (FileSize > 1) {
          alert('File max size must be 1024KB');
          $("#file_input").val('');
          return false;
        }

      }
    }
  },

  created() {
    this.fetchTicketDetails()
  }
}
</script>

<style scoped>

</style>
