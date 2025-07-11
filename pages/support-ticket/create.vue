<template>
  <section>

    <div class="form-horizontal rounded">
      <div class="form-header d-flex justify-content-between">
        <h3>Ticket Create</h3>
        <div class=" d-flex justify-content-end">
          <nuxt-link to="/support-ticket" class="btn btn-primary">Ticket Lists</nuxt-link>
        </div>

      </div>

      <form @submit.prevent="createSupportTicket()">
        <div class="row p-4">

          <div class="col-lg-8 col-md-8 col-sm-12  mb-2">
            <div class="form-group">
              <label for="">Request Department (Support Ticket)
                <span class="text-danger">*</span></label>
              <select name="support_ticket_department_id" id="support_ticket_department_id"
                v-model="support_ticket_department_id" class="form-control">
                <option value="" selected disabled hidden>Select one</option>
                <option v-for="(support_ticket_department,
                  index) in support_ticket_departments" :key="index" :value="index" v-text="support_ticket_department">
                </option>
              </select>
              <small v-if="errors.support_ticket_department_id" class="text-danger with-errors"
                v-html="errors.support_ticket_department_id[0]"></small>
            </div>
          </div>

          <div class="col-lg-8 col-md-8 col-sm-12  mb-2">
            <div class="form-group">
              <label for="">Subject <span class="text-danger">*</span></label>
              <input type="text" class="form-control" v-model="subject" placeholder="Enter Subject" />

              <small v-if="errors.subject" class="text-danger with-errors" v-html="errors.subject[0]"></small>
            </div>
          </div>
          <div class="col-lg-8 col-md-8 col-sm-12  mb-2">
            <div class="form-group">
              <label for="">Purpose <span class="text-danger">*</span></label>
              <textarea class="form-control" placeholder="Enter Purpose" name="purpose" id="Purpose" cols="30" rows="2"
                v-model="purpose"></textarea>

            </div>
          </div>

          <div class="col-lg-8 col-md-8 col-sm-12  mb-2">
            <div class="form-group">
              <label for="">Priority <span class="text-danger">*</span></label>
              <select name="priority" id="priority" v-model="priority" class="form-control">
                <option value="" selected disabled hidden>Select one</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>

            </div>
          </div>

          <div class="col-lg-8 col-md-8 col-sm-12  mb-2">
            <div class="form-group">
              <label for="">File</label> <br />
              <input type="file" id="file_input" class="form-control" name="file[]" multiple="multiple"
                v-on:change="fileValidationCheck" accept=".doc,.docx,application/pdf,image/*" />
              <br />

              <span class="text-danger">File extention must be doc,docx,pdf,jpeg,jpg,png and max file
                size 1024KB</span>
            </div>
          </div>

          <div class="col-lg-8 col-md-8 col-sm-12  mb-5">
            <div class="form-group">
              <button type="submit" style="margin-left: 0" class="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    </div>
  </section>
</template>

<script>
import download from "downloadjs";

export default {
  // middleware: "feedbackAuthenticated",
  name: "index",
  data() {
    return {
      subject: "",
      purpose: "",
      priority: "",
      errors: [],
      support_ticket_departments: [],
      support_ticket_department_id: [],
    };
  },

  mounted() {
    this.fetchSupportTicketDepartments();
  },

  methods: {
    fetchSupportTicketDepartments() {

      var token = window.$nuxt.$cookies.get('token');


      this.$axios
        .get(
          `/support-ticket-departments-for-student`
        )
        .then(response => {
          this.support_ticket_departments = response.data;
        })
        .catch((error) => {
          if (error.response.status == 400) {
            // toastr.error(error.response.data.error);
            return false;
          } else if (error.response.status == 401) {
            // toastr.error(error.response.data.message);
            return false;
          } else if (error.response.status == 406) {
            // toastr.error(error.response.data.message);
            return false;
          } else {
            // toastr.error("There was something wrong");
            return false;
          }
        });


    },

    createSupportTicket() {
      var vm = this;
      var token = window.$nuxt.$cookies.get("token");
      var user = window.$nuxt.$cookies.get("user");

      if (!user) {
        this.$toast.primary("Please login as a student", {
          icon: "error_outline"
        });
        return false;
      } else if (!vm.support_ticket_department_id) {
        this.$toast.primary("Please select department", { icon: "error_outline" });
        return false;
      } else if (!vm.subject) {
        this.$toast.primary("Please enter subject", { icon: "error_outline" });
        return false;
      } else if (!vm.purpose) {
        this.$toast.primary("Please enter purpose", { icon: "error_outline" });
        return false;
      } else if (!vm.priority) {
        this.$toast.primary("Please select priority", { icon: "error_outline" });
        return false;
      } else {
        var formData = new FormData();
        var filesLength = document.getElementById("file_input").files.length;
        for (var i = 0; i < filesLength; i++) {
          formData.append(
            "file[]",
            document.getElementById("file_input").files[i]
          );
        }

        formData.append("support_ticket_department_id", vm.support_ticket_department_id);
        formData.append("subject", vm.subject);
        formData.append("purpose", vm.purpose);
        formData.append("priority", vm.priority);
        formData.append("type", "student");

        return this.$axios
          .post("/student/support-ticket?token=" + token, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(response => {
            this.$toast.success(response.data.message, {
              icon: "error_outline"
            });
            vm.support_ticket_department_id = "";
            vm.subject = "";
            vm.purpose = "";
            vm.priority = "";
            $("#file_input").val("");
          })
          .catch(error => {
            if (error.response.status == 400) {
              this.$toast.success("Something went wrong.Please try again!.", {
                icon: "error_outline"
              });
            } else if (error.response.status == 422) {
              this.errors = error.response.data;
              this.$toast.success("Validation Error!.", {
                icon: "error_outline"
              });
            } else {
              this.$toast.success("Something went wrong.Please try again!.", {
                icon: "error_outline"
              });
            }
          });
      }
    },

    fileValidationCheck() {
      var formData = new FormData();
      var filesLength = document.getElementById("file_input").files.length;
      for (var i = 0; i < filesLength; i++) {
        var FileSize =
          document.getElementById("file_input").files[i].size / 1024 / 1024; // in MiB
        if (FileSize > 1) {
          alert("File max size must be 1024KB");
          $("#file_input").val("");
          return false;
        }
      }
    }
  }
};
</script>

<style scoped></style>
