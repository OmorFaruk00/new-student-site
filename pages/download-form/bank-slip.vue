<template>
  <section>
    <div class="form-horizontal rounded">
      <div class="form-header">
        <h4>Download Bank Slip</h4>
      </div>
      <div class=" row px-3 ">
        <div class="col-lg-8 col-md-8 col-sm-12 ">
            <div class="form-group" style="margin-bottom: 20px !important;">
              <label for="">Bank Name <span class="text-danger">*</span></label>
              <select name="semester" id="bank_name" v-model="bank_id" class="form-control">
                <option value="" selected disabled hidden>Select one</option>
                <option v-for="(bank, index) in banks" :key="index" :value="bank.id" v-text="bank.name"></option>
              </select>
            </div>
            <div class="form-group " style="margin-bottom: 20px !important;">
              <label for="">Fee Type <span class="text-danger">*</span></label>
              <select name="fee_type" id="fees_type" v-model="fees_type" class="form-control">
                <option value="" selected disabled hidden>Select one</option>
                <option value="Registration Fee">Registration Fee</option>
                <option value="Admission Fee">Admission Fee</option>
                <option value="Tuition Fee">Tuition Fee</option>
                <option value="Examination Fee">Examination Fee</option>
                <option value="Improvement Fee">Improvement Fee</option>
                <option value="Marks Sheet Fee">Marks Sheet Fee</option>
                <option value="Provisional Certificate Fee">
                  Provisional Certificate Fee
                </option>
                <option value="Library Fee">Library Fee</option>
                <option value="Fine / Late Fee">Fine / Late Fee</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div class="form-group" style="margin-bottom: 20px !important;">
              <label for="">Amount <span class="text-danger">*</span></label>
              <input type="number" min="0" oninput="validity.valid||(value='');" class="form-control" v-model="amount"
                placeholder="Enter amount" />
            </div>

          <div class="float-right pb-5" style="margin-bottom: 20px !important;">
            <button class="btn btn-bs btn-block" @click="addFeeType">
              <i class="fa fa-plus-circle"></i> Add
            </button>
          </div>
          <div class="mb-3" v-if="isdownload">
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in all_fees" :key="index">
                    <td>{{ row.fee_type }}</td>
                    <td>
                      <input type="number" :value="row.fee_amount" class="form-control" readonly />
                    </td>

                    <td>
                      <button type="button" class="btn btn-danger" @click="delete_row(row)">
                        <i class="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="float-right mb-3 pb-5">
              <button :disabled="loading" style="margin: 20px 0px" class="btn btn-bs btn-block"
                @click="downloadBankSlip">
                Download

                <i v-if="loading" class="fa fa-spinner fa-spin ml-1"></i>
              </button>
            </div>
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
  name: "bank-slip",

  data() {
    return {
      bank_id: "",
      branch_id: "",
      fees_type: "",
      amount: "",
      all_fees: [],
      banks: "",
      branches: "",
      isdownload: false,
      loading: false,
    };
  },
  mounted() {
    this.getBanks();
  },

  methods: {
    addFeeType() {
      var vm = this;

      if (!vm.bank_id) {
        this.$toast.error("Please Select bank", { icon: "error_outline" });
        return false;
      }
      // else if (!vm.branch_id) {
      //   this.$toast.success('Please Select branch', {icon: "error_outline"});
      //   return false;
      // }
      else if (!vm.fees_type) {
        this.$toast.error("Please Select fees type", { icon: "error_outline" });
        return false;
      } else if (!vm.amount) {
        this.$toast.error("Please type amount", { icon: "error_outline" });
        return false;
      } else {
        vm.all_fees.push({
          fee_type: vm.fees_type,
          fee_amount: vm.amount,
        });

        vm.fees_type = "";
        vm.amount = "";
        vm.isdownload = true;
      }
    },

    delete_row: function (row) {
      this.all_fees.splice(this.all_fees.indexOf(row), 1);
    },

    downloadBankSlip() {
      var vm = this;
      vm.loading = true;
      var token = window.$nuxt.$cookies.get("token");
      var user = window.$nuxt.$cookies.get("user");

      if (!user) {
        this.$toast.info("Please login as a student");
        return false;
      } else if (!vm.all_fees.length > 0) {
        this.$toast.info("Please choose fees");
        return false;
      } else {
        return this.$axios
          .post(
            "/student/bank-slip-form?token=" + token,
            {
              all_fees: vm.all_fees,
              bank_id: vm.bank_id,
            },
            {
              responseType: "blob",
            }
          )
          .then((response) => {
            const content = response.headers["content-type"];
            download(response.data, +"_form", content);

            this.$toast.success("Bank Deposit Form Download Successfully");
            vm.all_fees = [];
            vm.bank_id = "";
            vm.branch_id = "";
            vm.amount = "";
            vm.isdownload = false;
            vm.loading = false;
          })
          .catch((error) => {
            if (error.response.status == 400) {
              this.$toast.success("Something went wrong.Please try again!.");
            } else if (error.response.status == 422) {
              this.$toast.success("Validation Error!.");
            } else {
              this.$toast.success("Something went wrong.Please try again!.");
            }
          });
      }
    },
    async getBanks() {
      return await this.$axios
        .get("/get_active_banks")
        .then((response) => {
          this.banks = response.data;
        })
        .catch((error) => { });
    },
  },
};
</script>
<style scoped></style>
