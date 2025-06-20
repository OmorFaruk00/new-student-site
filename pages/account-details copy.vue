<template>
    <section>
        <div >

            <template>
                
                    <div class="card" >
                        <div class="card-header" style="background: #28a745;">
                            <h3 class="card-title text-center pt-2 text-white">Accounts Information</h3>

                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="table-sorter-wrapper col-lg-12 table-responsive table-bordered">
                                    <table id="sortable-table-2" class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th class="sortStyle">Sl<i class="icon-arrow-down"></i></th>
                                                <th class="sortStyle">Date<i class="icon-arrow-down"></i></th>
                                                <th class="sortStyle">Receipt<i class="icon-arrow-down"></i></th>
                                                <th class="sortStyle">Purpose<i class="icon-arrow-down"></i></th>
                                                <th style="text-align: right;" class="sortStyle">Amount<i
                                                        class="icon-arrow-down"></i></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr v-for="(account, key) in accounts" :key="key">
                                                <td>{{ key + 1 }}</td>
                                                <td>{{ $moment(account.date_bank).format('DD-MM-YYYY') }}</td>
                                                <td>{{ account.receipt_no }}</td>
                                                <td>{{ account.purpose_pay.name }}</td>
                                                <td style="text-align: right">{{ account.amount | numFormat('0') }} Tk
                                                </td>
                                            </tr>
                                         
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                            <th colspan="4" class="text-end">Total:</th>
                                            <th class="text-end">{{ total_amount | numFormat('0') }} Tk</th>
                                            </tr>
                                        </tfoot>
                                      
                                    </table>
  
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                


            </template>
            <template  v-if="accounts_summary != ''">
                
                    <div class="card">
                        <div class="card-header" style="background: #28a745;">
                            <h3 class="card-title text-center pt-2 text-white">Other Information</h3>

                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class=" col-lg-12 table-responsive table-bordered">
                                    <table class="table table-striped">


                                        <tbody>

                                            <tr>
                                                <th>Actual Total Fee</th>
                                                <td style="text-align: right;">{{ accounts_summary.actual_total_fee | numFormat('0') }} Tk</td>
                                            </tr>
                                            <tr>
                                                <th>Special Scholarship</th>
                                                <td style="text-align: right;">{{ accounts_summary.special_scholarship | numFormat('0') }} Tk</td>
                                            </tr>
                                            <tr>
                                                <th>Per Semester Fee Without Scholarship</th>
                                                <td style="text-align: right;">{{ accounts_summary.per_semester_fee_without_scholarship |
                                                    numFormat('0') }} Tk</td>
                                            </tr>
                                            <tr>
                                                <th>Per Semester Fee</th>
                                                <td style="text-align: right;">{{ accounts_summary.per_semester_fee | numFormat('0') }} Tk</td>
                                            </tr>
                                            <tr>
                                                <th>Total Paid</th>
                                                <td style="text-align: right;">{{ accounts_summary.total_paid | numFormat('0') }} Tk</td>
                                            </tr>
                                            <tr>
                                                <th>Total Current Due</th>
                                                <td style="text-align: right;">{{ accounts_summary.total_current_due | numFormat('0') }} Tk</td>
                                            </tr>
                                            <tr>
                                                <th>Total Due </th>
                                                <td>
                                                    <div class="d-flex justify-content-end">
                                                        <nuxt-link class="btn btn-primary mr-4" to="/payment"
                                                            style="margin-top: -3px; margin-right: 30px;">PAY NOW</nuxt-link>
                                                        {{ accounts_summary.total_due | numFormat('0') }} Tk
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>
                


            </template>


        </div>

        <h3 v-if="(accounts.length < 0 || accounts_summary == '')" class="p-4 text-center text-uppercase text-danger">
            <p>😢</p>
            <small>Account Details Not Found</small>
        </h3>
    </section>
</template>

<script>
import Vue from 'vue'
import numeral from 'numeral'
import numFormat from 'vue-filter-number-format'
import { loading } from '../nuxt.config';

Vue.filter('numFormat', numFormat(numeral));
export default {
    // middleware: 'feedbackAuthenticated',
    data() {
        return {
            accounts: [],
            total_amount: "",
            accounts_summary: [],
            loading: true,
        }
    },

    mounted() {
        this.getAccountsInfo();
        this.getAccountsSummary();
    },

    methods: {
        async getAccountsInfo() {
            var token = window.$nuxt.$cookies.get('token');
            var user = window.$nuxt.$cookies.get('user');
            return await this.$axios.get('/student_account_info/' + user.id + '?token=' + token)
                .then((response) => {
                    this.accounts = response.data;

                    var total_amount = 0;
                    $.each(this.accounts, function (index, value) {
                        total_amount += parseFloat(value.amount)
                    });
                    this.total_amount = total_amount;
                })
                .catch((error) => {
                    this.$toast.error('Not found', { icon: "error_outline" });
                })
        },
        async getAccountsSummary() {
            var token = window.$nuxt.$cookies.get('token');
            var user = window.$nuxt.$cookies.get('user');
            return await this.$axios.get('/student_account_info_summary/' + user.id + '?token=' + token)
                .then((response) => {
                    this.accounts_summary = response.data.summary;
                })
        },
    }
}
</script>

