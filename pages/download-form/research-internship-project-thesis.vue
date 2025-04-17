<template>
  <section>
    <div class="form-horizontal col-lg-8 mx-auto">
      <div class="form-header mb-5">
        <h4>Research / Internship / Project / Thesis Form</h4>
      </div>
      <div class="px-3">
        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-12 mb-3">
            <div class="form-group">
              <label for=""
                >Title of the Report <span class="text-danger">*</span></label
              >
              <input
                type="text"
                v-model="title"
                class="form-control"
                placeholder="Title of the Report"
              />
            </div>
          </div>

          <div class="col-lg-6 col-md-6 col-sm-12 mb-3">
            <div class="form-group">
              <label for=""
                >Name of the Organization
                <span class="text-danger">*</span></label
              >
              <input
                type="text"
                v-model="organization"
                class="form-control"
                placeholder="Name of the Organization"
              />
            </div>
          </div>

          <div class="col-lg-6 col-md-6 col-sm-12 mb-3">
            <div class="form-group">
              <label for=""
                >Name of the Supervisor
                <span class="text-danger">*</span></label
              >
              <input
                type="text"
                v-model="supervisor"
                class="form-control"
                placeholder="Name of the Supervisor"
              />
            </div>
          </div>

          <div class="col-lg-6 col-md-6 col-sm-12 mb-3">
            <div class="form-group">
              <label for="">Name of the Co-Supervisor (if any)</label>
              <input
                type="text"
                v-model="co_supervisor"
                class="form-control"
                placeholder="Name of the Co-Supervisor (if any)"
              />
            </div>
          </div>

          <div class="col-lg-12 col-md-12 col-sm-12 mb-3">
            <div class="form-group">
              <label for=""
                >Organization Address <span class="text-danger">*</span></label
              >
              <textarea
                name="address"
                v-model="address"
                id=""
                cols="30"
                rows="2"
                class="form-control"
                placeholder="Organization Address"
              ></textarea>
            </div>
          </div>

          <div class="col-lg-12 col-md-12 col-sm-12">
            <div class="form-group">
              <div>
                <label for="interest_field">Interest Field</label>
                <multiselect
                  v-model="interest_field"
                  :options="options"
                  :multiple="true"
                  :searchable="true"
                  placeholder="select"
                  label="label"
                  track-by="value"
                  class=""
                />
              </div>
            </div>
          </div>

          <div class="">
            <button
              :disabled="loading"
              style="margin-top: 25px"
              class="btn btn-primary btn-block"
              @click="downloadForm"
            >
              Download
              <i v-if="loading" class="fa fa-spinner fa-spin ml-1"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import download from "downloadjs";

export default {
  // middleware: 'feedbackAuthenticated',
  name: "research-internship-project-thesis",
  data() {
    return {
      title: "",
      organization: "",
      supervisor: "",
      co_supervisor: "",
      address: "",
      selected: null,
      interest_field: [],
      loading: false,
      options: [
        { value: "Not Applicable", label: "Not Applicable" },
        { value: "Structural Engineering", label: "Structural Engineering" },
        {
          value: "Geotechnical Engineering",
          label: "Geotechnical Engineering",
        },
        {
          value: "Environmental Engineering",
          label: "Environmental Engineering",
        },
        {
          value: "Transportational Engineering",
          label: "Transportational Engineering",
        },
        {
          value: "Water Resource Engineering",
          label: "Water Resource Engineering",
        },
      ],
    };
  },

  methods: {
    downloadForm() {
      var vm = this;
      vm.loading = true;
      var token = window.$nuxt.$cookies.get("token");

      if (!vm.title) {
        this.$toast.success("Please enter title of the report", {
          icon: "error_outline",
        });
        return false;
      } else if (!vm.organization) {
        this.$toast.success("Please enter name of the organization", {
          icon: "error_outline",
        });
        return false;
      } else if (!vm.supervisor) {
        this.$toast.success("Please enter name of the supervisor", {
          icon: "error_outline",
        });
        return false;
      } else if (!vm.address) {
        this.$toast.success("Please enter organization address", {
          icon: "error_outline",
        });
        return false;
      } else if (!vm.interest_field.length > 0) {
        this.$toast.success("Please select interest field", {
          icon: "error_outline",
        });
        return false;
      } else {
        return this.$axios
          .get(
            "/student/research-internship-project-thesis-form?token=" + token,
            {
              params: {
                title: vm.title,
                organization: vm.organization,
                supervisor: vm.supervisor,
                co_supervisor: vm.co_supervisor,
                address: vm.address,
                interest_field: vm.interest_field.map((item) => item.value),
              },
              responseType: "blob",
            }
          )
          .then((response) => {
            const content = response.headers["content-type"];
            download(
              response.data,
              "research_internship_project_thesis_form",
              content
            );

            this.$toast.success(
              "Research / Internship / Project / Thesis Form Download Successfully",
              { icon: "error_outline" }
            );
            vm.title = '';
            vm.organization = '';
            vm.supervisor = '';
            vm.co_supervisor = '';
            vm.address = '';
            vm.interest_field = [];
            vm.loading = false;
          })
          .catch((error) => {
            if (error.response.status == 400) {
              this.$toast.success("Something went wrong.Please try again!.", {
                icon: "error_outline",
              });
            } else if (error.response.status == 422) {
              this.$toast.success("Validation Error!.", {
                icon: "error_outline",
              });
            } else {
              this.$toast.success("Something went wrong.Please try again!.", {
                icon: "error_outline",
              });
            }
          });
      }
    },
  },
};
</script>

<style scoped lang="scss">
:deep(.multiselect__tags) {
  min-height: 50px;
  padding-top: 15px;
}
</style>
