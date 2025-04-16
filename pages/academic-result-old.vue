<template>
    <section class="mb-5">
        <div class="card card-body mb-3 pt-4 no-print">

            <form class="form-horizontal" id="findBatchMateResultForm" @submit.prevent="findBatchMateResultForm()">
                <div class="form-group focused">
                    <select class="form-control" id="batch_mate_id" name="batch_mate_id" v-model="batch_mate_id"
                        required>
                        <option selected value="">Select student name</option>
                        <option v-for="(batch_mate, index) in batch_mates" :key="index" :value="batch_mate.id">{{
                            batch_mate.roll_no
                            }} -
                            {{ batch_mate.name }} - {{ batch_mate.reg_code }}
                        </option>
                    </select>
                    <label for="batch_mate_id">Show batch mate result </label>
                    <small id="batch_mate_id_help" class="form-text text-danger">&nbsp;</small>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-sm">Show <i v-if="loading"
                            class="fas fa-spinner fa-spin text-primary"></i></button>
                </div>
            </form>
        </div>

        <div class="row">

            <div class="col-lg-6 col-md-6 col-sm-12 print">
                 
                <div v-if="results.student_info.name && !isloading">
                    <div id="transcriptPrint" class="transcriptPrint">

                        <div class="text-center">
                            <h3>Dhaka International University</h3>
                            <h5>{{ results.student_info.name }}</h5>
                            <h6> Roll : {{ results.student_info.roll_no }}, Reg : {{ results.student_info.reg_code }}

                                <template v-if="results.student_info.session_name">
                                    ,Session : {{ results.student_info.session_name }}
                                </template>
                            </h6>
                        </div>

                        <div class="table-responsive" v-for="(transcript, index) in results.transcript_data.semesters"
                            :key="index">
                            <table class="table" v-for="(semesters, semesterIndex) in transcript" :key="semesterIndex">
                                <thead class="">
                                    <tr>
                                        <th colspan="8" class="text-left bg-primary text-white py-1">Semester : {{
                                            semesters.semester }}</th>
                                    </tr>
                                </thead>
                                <tr>
                                    <th>Course No</th>
                                    <th>Course Title</th>
                                    <th>Credit Hours</th>
                                    <th v-if="semesters.exempted == 0">Incourse</th>
                                    <th v-if="semesters.exempted == 0">Final</th>
                                    <th>Grade Earned</th>
                                    <th style="text-align: right;">Grade Point</th>
                                </tr>
                                <tr v-if="semesters.allocated_courses != 'Semester or Marks not exists' && semesters.allocated_courses != 'Please, clear Due to show result'"
                                    v-for="(course, courseIndex) in semesters.allocated_courses" :key="courseIndex">
                                    <td>{{ course.code }}</td>
                                    <td>{{ course.name }}</td>
                                    <td>{{ course.credit }}</td>
                                    <td v-if="semesters.exempted == 0">{{ course.marks.conti_total }}</td>
                                    <td v-if="semesters.exempted == 0">{{ course.marks.final_total }}</td>
                                    <td><span v-if="semesters.exempted == 0">{{ course.marks.letter_grade }}</span><span
                                            v-else>Exempted</span>
                                    </td>
                                    <td style="text-align: right;"><span v-if="semesters.exempted == 0">{{
                                        course.marks.grade_point | numFormat('0.00')
                                            }}</span><span v-else>Exempted</span></td>
                                </tr>
                                <tr v-if="semesters.allocated_courses == 'Semester or Marks not exists'">
                                    <td colspan="7" class="text-center">Semester or Marks not exists</td>
                                </tr>
                                <tr v-if="semesters.allocated_courses == 'Please, clear Due to show result'">
                                    <td colspan="7" class="text-center">Please, clear Due to show result</td>
                                </tr>
                                <tr
                                    v-if="semesters.allocated_courses != 'Semester or Marks not exists' && semesters.allocated_courses != 'Please, clear Due to show result'">
                                    <th colspan="1">Subject: {{ semesters.total_subject }}</th>
                                    <th colspan="2">Total Credit: {{ semesters.total_credit }}</th>
                                    <th colspan="2">Avg. Grade: {{ semesters.average_grade }}</th>
                                    <th style="text-align: right;" colspan="2">GPA: {{ semesters.total_semester_gpa |
                                        numFormat('0.00') }}</th>
                                </tr>
                            </table>
                        </div>

                        <div class="table-responsive">
                            <table class="table table-striped table-hover mb-0 table-sm">
                                <thead class="thead-dark">
                                    <tr>
                                        <th class="text-left">Total Result</th>
                                    </tr>
                                </thead>
                                <tr>
                                    <td class="text-left">
                                        <span>Total Credit Required:<b> {{
                                            results.transcript_data.results.total_credit_required }}</b></span>
                                        <span>Credit Exempted:<b> {{ results.transcript_data.results.exempted_credit
                                                }}</b></span>
                                        <span>Credit Earned:<b> {{ results.transcript_data.results.total_credit_earned
                                                }}</b></span>
                                        <span>Average Grade:<b> {{ results.transcript_data.results.grade_letter
                                                }}</b></span>
                                        <span>CGPA:<b> {{ results.transcript_data.results.cgpa | numFormat('0.00')
                                                }}</b></span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <button type="button" class="btn btn-primary btn-sm no-print" id="printButton"
                        @click="printButton"><i class="fa fa-print"> </i> &nbsp;Print
                    </button>
                </div>
                <div v-if="isloading" class="text-center mt-5">
                    <i class="fa fa-spinner fa-spin fa-4x text-primary"></i>
                </div>
                <!-- <h3 class="p-4 text-center text-uppercase text-danger" v-else>
                    <p>😢</p>
                    <small>Academic Result Not Found</small>
                </h3> -->
            </div>


            <div class="col-lg-6 col-md-6 col-sm-12 no-print">

                <div v-if="loading" class="text-center mt-5">
                    <i class="fa fa-spinner fa-spin fa-4x text-primary"></i>
                </div>

                <div v-if="batch_mate_results && !loading">

                    <div class="text-center">
                        <h3 v-if="batch_mate_results.student_info.name">Dhaka International University</h3>
                        <h5 v-if="batch_mate_results.student_info.name">{{ batch_mate_results.student_info.name }}</h5>
                        <h6 v-if="batch_mate_results.student_info.name"> Roll : {{
                            batch_mate_results.student_info.roll_no }}, Reg :
                            {{ batch_mate_results.student_info.reg_code }}

                            <template v-if="batch_mate_results.student_info.session_name">
                                ,Session : {{ batch_mate_results.student_info.session_name }}
                            </template>

                        </h6>
                    </div>


                    <div class="transcriptPrint">
                        <div class="table-responsive"
                            v-for="(transcript, transcriptIndex) in batch_mate_results.transcript_data.semesters"
                            :key="transcriptIndex">
                            <table class="table table-striped table-hover mb-0 table-sm"
                                v-for="(semesters, semestersIndex) in transcript" :key="semestersIndex">
                                <thead class="thead-dark">
                                    <tr>
                                        <th colspan="8" class="text-left bg-primary text-white py-1">Semester : {{
                                            semesters.semester }}</th>
                                    </tr>
                                </thead>
                                <tr>
                                    <th>Course No</th>
                                    <th>Course Title</th>
                                    <th>Credit Hours</th>
                                    <th v-if="semesters.exempted == 0">Incourse</th>
                                    <th v-if="semesters.exempted == 0">Final</th>
                                    <th>Grade Earned</th>
                                    <th style="text-align: right;">Grade Point</th>
                                </tr>
                                <tr v-if="semesters.allocated_courses != 'Semester or Marks not exists' && semesters.allocated_courses != 'Please, clear Due to show result'"
                                    v-for="(course, courseIndex) in semesters.allocated_courses" :key="courseIndex">
                                    <td>{{ course.code }}</td>
                                    <td>{{ course.name }}</td>
                                    <td>{{ course.credit }}</td>
                                    <td v-if="semesters.exempted == 0">{{ course.marks.conti_total }}</td>
                                    <td v-if="semesters.exempted == 0">{{ course.marks.final_total }}</td>
                                    <td><span v-if="semesters.exempted == 0">{{ course.marks.letter_grade }}</span><span
                                            v-else>Exempted</span></td>
                                    <td style="text-align: right;"><span v-if="semesters.exempted == 0">{{
                                        course.marks.grade_point | numFormat('0.00')
                                            }}</span><span v-else>Exempted</span></td>
                                </tr>
                                <tr v-if="semesters.allocated_courses == 'Semester or Marks not exists'">
                                    <td colspan="7" class="text-center">Semester or Marks not exists</td>
                                </tr>
                                <tr v-if="semesters.allocated_courses == 'Please, clear Due to show result'">
                                    <td colspan="7" class="text-center">Please, clear Due to show result</td>
                                </tr>
                                <tr
                                    v-if="semesters.allocated_courses != 'Semester or Marks not exists' && semesters.allocated_courses != 'Please, clear Due to show result'">
                                    <th colspan="1">Subject: {{ semesters.total_subject }}</th>
                                    <th colspan="2">Total Credit: {{ semesters.total_credit }}</th>
                                    <th colspan="2">Avg. Grade: {{ semesters.average_grade }}</th>
                                    <th style="text-align: right;" colspan="2">GPA: {{ semesters.total_semester_gpa |
                                        numFormat('0.00') }}</th>
                                </tr>

                            </table>
                        </div>
                    </div>

                    <div class="table-responsive">
                        <table class="table table-striped table-hover mb-0 table-sm"
                            v-if="batch_mate_results.transcript_data.results.total_credit_required">
                            <thead class="thead-dark">
                                <tr>
                                    <th class="text-left">Total Result</th>
                                </tr>
                            </thead>
                            <tr>
                                <td class="text-left">
                                    <span>Total Credit Required:<b> {{
                                        batch_mate_results.transcript_data.results.total_credit_required
                                            }}</b></span>
                                    <span>Credit Exempted:<b> {{
                                        batch_mate_results.transcript_data.results.exempted_credit
                                            }}</b></span>
                                    <span>Credit Earned:<b> {{
                                        batch_mate_results.transcript_data.results.total_credit_earned
                                            }}</b></span>
                                    <span>Average Grade:<b> {{ batch_mate_results.transcript_data.results.grade_letter
                                            }}</b></span>
                                    <span>CGPA:<b> {{ batch_mate_results.transcript_data.results.cgpa }}</b></span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>

                <h3 class="p-4 text-center text-uppercase text-danger" v-if="!batch_mate_results">
                    <p>😢</p>
                    <small>Academic Result Not Found</small>
                </h3>

            </div>

        </div>
    </section>
</template>

<script>
// import print from 'print-js';
import Vue from 'vue'
import numeral from 'numeral'
import numFormat from 'vue-filter-number-format'

Vue.filter('numFormat', numFormat(numeral));
export default {
    // middleware: 'feedbackAuthenticated',
    data() {
        return {
            results: {
                transcript_data: {
                    results: {
                        total_credit_required: "",
                        total_credit_earned: "",
                        cgpa: "",
                        grade_letter: ""
                    }
                },
                student_info: {
                    name: "",
                }
            },
            batch_mate_results: {
                transcript_data: {
                    results: {
                        total_credit_required: "",
                        total_credit_earned: "",
                        cgpa: "",
                        grade_letter: ""
                    }
                },
                student_info: {
                    name: "",
                }
            },
            semesters: [],
            batch_mates: [],
            batch_mate_id: "",
            loading: false,
            isloading: true,
            batchMateResultloading: false,
        }
    },
    mounted() {
        this.getProvisionalResult();
        this.getBatchMate();
    },
    methods: {

        async getProvisionalResult() {
            var token = window.$nuxt.$cookies.get('token');
            var user = window.$nuxt.$cookies.get('user');
            return await this.$axios.get('/provisional_result/' + user.id + '?token=' + token)
                .then((response) => {
                    this.isloading = false;
                    this.results = response.data;
                })
                .catch((error) => {

                    if (error.response.status == 400) {
                        console.log(error.response.data.message, 'getProvisionalResult')
                        this.$toast.error(error.response.data.message, { icon: "error_outline" });
                        return;
                    }
                    this.$toast.error('Not found', { icon: "error_outline" });
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
                    this.$toast.error('Batch mate Not found', { icon: "error_outline" });
                })
        },

        async findBatchMateResultForm() {

            if (!this.batch_mate_id) {
                this.$toast.error('Select batch mate!', { icon: "error_outline" });
                return;
            }

            var token = window.$nuxt.$cookies.get('token');
            this.loading = true;
            this.batchMateResultloading = true;
            return await this.$axios.get('/provisional_result/' + this.batch_mate_id + '?token=' + token)
                .then((response) => {
                    this.batch_mate_results = response.data;
                })
                .catch((error) => {

                    if (error.response.status == 400) {
                        console.log(error.response.data.message, 'findBatchMateResultForm')
                        this.$toast.error(error.response.data.message, { icon: "error_outline" });
                        return;
                    }

                    this.$toast.error(error.response.data.message, { icon: "error_outline" });
                }).finally((final) => {
                    this.loading = false;
                    this.batchMateResultloading = false;
                })
        },

        async printButton() {
            // if (process.client) {
            //     const element = document.getElementById('transcriptPrint');
            //     if (!element) {
            //         console.error('Element not found');
            //         return;
            //     }

            //     const html2pdf = (await import('html2pdf.js')).default;

            //     const opt = {
            //         margin: 10,
            //         filename: 'provisional-result.pdf',
            //         image: { type: 'jpeg', quality: 0.98 },
            //         html2canvas: {
            //             scale: 2,
            //             useCORS: true,
            //         },
            //         jsPDF: {
            //             unit: 'mm',
            //             format: 'a4',
            //             orientation: 'portrait',
            //         },
            //     };

            //     html2pdf()
            //         .set(opt)
            //         .from(element)
            //         .toPdf()
            //         .get('pdf')
            //         .then(function (pdf) {
            //             const blob = pdf.output('bloburl');
            //             window.open(blob);

            //         });
            // }
        }



    }
}

</script>

<style type="text/css" scoped>
.transcriptPrint table,
.tableBackImage {
    background-image: url(/watermark.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;

}
</style>