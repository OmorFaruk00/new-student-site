<template>
    <section>
      <div class="form-horizontal col-8 mx-auto">
        <div class="form-header mb-5">
                <h4>Download Bank Slip</h4>
            </div>
        <div class="px-3 ">
            
  
          <div class="row">
            <div class="mb-4">
              <div class="form-group">
                <label for="">Bank Name <span class="text-danger">*</span></label>
                <select name="semester" id="bank_name" v-model="bank_id"
                        class="form-control">
                  <option value="" selected disabled hidden>Select one</option>
                  <option v-for="(bank, index) in banks" :key="index" :value="bank.id" v-text="bank.name">
                                      
                  </option>
                </select>
              </div>
            </div>  
    
  
            <div class="mb-4">
              <div class="form-group">
                <label for="">Fee Type <span class="text-danger">*</span></label>
                <select name="fee_type" id="fees_type" v-model="fees_type" class="form-control">
                  <option value="" selected disabled hidden>Select one</option>
  
                  <option value="Registration Fee">Registration Fee</option>
                  <option value="Admission Fee">Admission Fee</option>
                  <option value="Tuition Fee">Tuition Fee</option>
                  <option value="Examination Fee">Examination Fee</option>
                  <option value="Improvement Fee">Improvement Fee</option>
                  <option value="Marks Sheet Fee">Marks Sheet Fee</option>
                  <option value="Provisional Certificate Fee">Provisional Certificate Fee</option>
                  <option value="Library Fee">Library Fee</option>
                  <option value="Fine / Late Fee">Fine / Late Fee</option>
                  <option value="Others">Others</option>
  
                </select>
              </div>
            </div>
  
            <div class="mb-2">
              <div class="form-group">
                <label for="">Amount</label>
                <input type="number" min=0 oninput="validity.valid||(value='');" class="form-control" v-model="amount"
                       placeholder="Enter amount">
              </div>
            </div>
  
            <div class="float-right mb-4">
              <button  class="btn btn-primary btn-block" @click="addFeeType"><i
                class="fa fa-plus-circle"></i> Add
              </button>
            </div>
  
            <div class="col-12">
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
                  <tr v-for="(row,index) in all_fees" :key="index">
                    <td>{{ row.fee_type }}</td>
                    <td>
                      <input type="number" :value="row.fee_amount" class="form-control" readonly>
                    </td>
  
                    <td>
                      <button type="button" class="btn btn-danger" @click="delete_row(row)"><i
                        class="fa fa-trash"></i></button>
                    </td>
                  </tr>
                  </tbody>
                </table>
  
              </div>
            </div>
  
            <div class="float-right">
              <button style="margin-top: 25px" class="btn btn-primary btn-block" @click="downloadBankSlip"> Download
              </button>
            </div>
  
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  
  import download from 'downloadjs'
  
  export default {
    // middleware: 'feedbackAuthenticated',
    name: "bank-slip",
  
    data() {
      return {
        bank_id: '',
        branch_id: '',
        fees_type: '',
        amount: '',
        all_fees: [],
        banks:'',
        branches:'',
      }
    },
    mounted() {
      this.getBanks();
    },
  
    methods: {
  
      addFeeType() {
  
        var vm = this;
  
        if (!vm.bank_id) {
          this.$toast.success('Please Select bank', {icon: "error_outline"});
          return false;
        } 
        // else if (!vm.branch_id) {
        //   this.$toast.success('Please Select branch', {icon: "error_outline"});
        //   return false;
        // }
         else if (!vm.fees_type) {
          this.$toast.success('Please Select fees type', {icon: "error_outline"});
          return false;
        } else if (!vm.amount) {
          this.$toast.success('Please type amount', {icon: "error_outline"});
          return false;
        } else {
  
          vm.all_fees.push({
            fee_type: vm.fees_type,
            fee_amount: vm.amount,
          });
  
          vm.fees_type = '';
          vm.amount = '';
  
        }
      },
  
      delete_row: function (row) {
        this.all_fees.splice(this.all_fees.indexOf(row), 1);
      },
  
      downloadBankSlip() {
  
        var vm = this;
        var token = window.$nuxt.$cookies.get('token');
        var user = window.$nuxt.$cookies.get('user');
  
        if (!user) {
  
          this.$toast.info('Please login as a student', {icon: "error_outline"});
          return false;
  
        } else if (!vm.all_fees.length > 0) {
          this.$toast.info('Please choose fees', {icon: "error_outline"});
          return false;
  
        } else {
  
          return this.$axios.post('/student/bank-slip-form?token=' + token, {
            all_fees: vm.all_fees,
            bank_id: vm.bank_id,
          }, {
            responseType: 'blob',
          })
            .then((response) => {
  
              const content = response.headers['content-type'];
              download(response.data, + '_form', content);
  
              this.$toast.success('Bank Deposit Form Download Successfully', {icon: "error_outline"});
              vm.all_fees = [];
              vm.bank_id = '';
              vm.branch_id = '';
              vm.amount = '';
  
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
      async getBanks() {
        return await this.$axios.get('/get_active_banks')
          .then((response) => {
            this.banks = response.data;
          })
          .catch((error) => {
          })
      },
      // async fetchBankBranch() {
      //   return await this.$axios.get('/get_active_bank_branch'+ '/' +this.bank_id)
      //     .then((response) => {
      //       this.branches = response.data;
      //     })
      //     .catch((error) => {
      //     })
      // },
    }
  }
  </script>
  <style scoped>
  /* .form-horizontal {
      background: #fff;
      padding-bottom: 40px;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  
  } */
  .custom-arrow-icon {
  position: absolute;
  right: 1rem;
  top: 60%;
  transform: translateY(-50%);
  color: #FF5722; /* your desired icon color */
  pointer-events: none;
}
  </style>
  
  
  