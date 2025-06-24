<template>
    <section>
      <div class="card db-gp rounded">
        <template v-if="rents">
          <div class="table-responsive">
            <div class="card-header text-left">
                <h6>Rent List</h6>
            </div>
            <div class="p-3 ">
              <table class="table table-striped table-bordered" style="width: 40%;">
              <thead>
              <tr>
                <th>SL</th>
                <th>Hostel</th>
                <th>In Date</th>
                <th>Out Date</th>
                <th>Bed Type</th>
                <th>Monthly Rent</th>
              </tr>
              </thead>

              <tbody>
              <tr v-for="(rent, key) in rents" :key="key">
                <td>{{ key + 1 }}</td>
                <td>{{ hostel_name }}</td>
                <td>{{ $moment(rent.start_date).format('DD-MM-YYYY') }}</td>
                <td v-if="rent.end_date">{{ $moment(rent.end_date).format('DD-MM-YYYY')}}</td>
                <td v-else>Till Now</td>
                <td>{{ rent.bed_type}}</td>
                <td>{{ rent.monthly_fee | numFormat('0') }} Tk</td>
              </tr>



              </tbody>

            </table>
            </div>
          </div>
        </template>

        <template v-if="accounts">
          <div class="form-header p-3 h6">Hostel Accounts Information</div>
          <div class="table-responsive p-3">
            <table class="table table-striped table-bordered p-3">
              <thead>
              <tr>
                <th>SL</th>
                <th>Date</th>
                <th>Receipt</th>
                <th>Purpose</th>
                <th style="text-align: right;">Amount</th>
              </tr>
              </thead>

              <tbody>
              <tr v-for="(account, key) in accounts" :key="key">
                <td>{{ key + 1 }}</td>
                <td>{{ $moment(account.date).format('DD-MM-YYYY') }}</td>
                <td>{{ account.receipt_no }}</td>
                <td>{{ account.purpose }}</td>
                <td style="text-align: right;">{{ account.amount | numFormat('0') }} Tk</td>
              </tr>

              <tr v-if="total_paid">
                <th colspan="4"></th>
                <th style="text-align: right;">Total Paid: {{ total_paid | numFormat('0') }} Tk</th>
              </tr>
              <tr v-if="total_due">
                <th colspan="4"></th>
                <th style="text-align: right;"> Total Due: {{ total_due | numFormat('0') }} Tk</th>
              </tr>
              </tbody>

            </table>
          </div>
        </template>
        <template v-else>
            <div>
                <h3 class="p-4 text-center text-uppercase text-danger">
                    <p>😢</p>
                    <small>Account Details Not Found</small>
                </h3>
            </div>
        </template>



      </div>

      <!-- <h3 v-if="(accounts.length <0 )" class="p-4 text-center text-uppercase text-danger">
        <p>😢</p>
        <small>Account Details Not Found</small>
      </h3> -->
    </section>
  </template>

  <script>
  import Vue from 'vue'
  import numeral from 'numeral'
  import numFormat from 'vue-filter-number-format'

  Vue.filter('numFormat', numFormat(numeral));
  export default {
    // middleware: 'feedbackAuthenticated',
    data() {
      return {
        accounts: "",
        total_paid: "",
        total_due: "",
        rents:"",
        hostel_name:"",

      }
    },

    created() {
      this.getAccountsInfo();
    },

    methods: {
      async getAccountsInfo() {
        var token = window.$nuxt.$cookies.get('token');
        var user = window.$nuxt.$cookies.get('user');
        return await this.$axios.get('/student-portal-hostel-due/' + user.id)
          .then((response) => {
            this.accounts = response.data.account_info;
            this.total_paid = response.data.paid_amount;
            this.total_due = response.data.total_due;
            this.hostel_name = response.data.hostel;
            this.rents = response.data.rent;

          })
          .catch((error) => {
            this.$toast.error('Not found', {icon: "error_outline"});
          })
      },

    }
  }
  </script>
