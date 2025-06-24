<template>
  <section>
    <div class="card rounded">
      <div class="form-header d-flex justify-content-between">
        <h3>Support Ticket Lists</h3>
        <div class=" d-flex justify-content-end">
          <nuxt-link to="/support-ticket/create" class="btn btn-primary">Create Ticket</nuxt-link>
        </div>

      </div>
      <div class="card-body">
        <div class="row">
          <div class="table-responsive">
            <div class="">
              <table class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Sl</th>
                    <th>Ticket Id</th>
                    <th>Subject</th>
                    <th>Status <sup>Unseen</sup></th>
                    <th>Priority</th>
                    <th>Type</th>
                    <th>Ticket Created Time</th>
                    <th>Permission Status</th>
                    <th class="text-left">Action</th>
                  </tr>
                </thead>

                <tbody>

                  <tr v-for="(row, index) in supportTickets" :key="index">
                    <td v-text="index + 1"></td>
                    <td>
                      <span class="badge badge-primary" v-html="'IST-S-' + row.id"></span>
                    </td>
                    <td v-text="row.subject"></td>
                    <td class="text-capitalize">

                      <p>
                        <span v-text="row.status"></span>
                        <sup v-if="row.status == 'active'" v-html="row.totalRow"></sup>
                      </p>

                    </td>
                    <td class="text-capitalize" v-text="row.priority"></td>
                    <td class="text-capitalize" v-text="row.type"></td>
                    <td v-text="row.created_at"></td>
                    <td>
                      <span v-if="row.permission_status">
                        <span class="badge text-uppercase"
                          :class="row.permission_status == 'yes' ? 'badge-success' : 'badge-danger'"
                          v-text="row.permission_status"></span>
                      </span>

                    </td>
                    <td>

                      <nuxt-link :to="{ name: 'support-ticket-id', params: { id: row.id } }" class="btn btn-primary">

                        <i class="fa fa-eye"></i>

                      </nuxt-link>

                    </td>
                  </tr>

                </tbody>
              </table>
            </div>


            <div class="col-12">
              <div class="row">

                <div class="col-lg-2 col-md-2 col-sm-12">
                  Showing <span v-html="meta.from || 0"></span> to <span v-html="meta.to || 0"></span>
                  of
                  <span v-html="meta.total"></span> entries
                </div>

                <div class="col-lg-10 col-md-10 col-sm-12">
                  <nav aria-label="Page navigation example" class="my-3 mx-2">
                    <ul class="pagination pagination-sm justify-content-end">
                      <li class="page-item" :class="meta.current_page > 1 ? '' : 'disabled'">
                        <a class="page-link" href="javaScript:void(0)" @click="paginatePreview" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                          <span class="sr-only">Previous</span>
                        </a>
                      </li>

                      <li class="page-item" v-for="(row, index) in meta.last_page" :key="index"
                        :class="row == meta.current_page ? 'active' : ''">
                        <a class="page-link" href="javaScript:void(0)" @click="paginatePageWise(row)" v-text="row"></a>
                      </li>

                      <li class="page-item" :class="meta.last_page > meta.current_page ? '' : 'disabled'">
                        <a class="page-link" href="javaScript:void(0)" @click="paginateNext" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                          <span class="sr-only">Next</span>
                        </a>
                      </li>

                    </ul>
                  </nav>
                </div>
              </div>
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
  name: "index",
  data() {
    return {
      supportTickets: [],
      links: [],
      meta: [],
    }
  },

  methods: {
    async getSupportTicketLists() {
      var token = window.$nuxt.$cookies.get('token');

      return await this.$axios.get('student/support-ticket' + '?token=' + token)
        .then((response) => {

          // console.log(response.data.data);
          this.supportTickets = response.data.data;
          this.links = response.data.links;
          this.meta = response.data.meta;
        })
        .catch((error) => {
          if (error.response.status == 400) {
            this.$toast.success('Something went wrong.Please try again!.', { icon: "error_outline" });
          } else if (error.response.status == 422) {
            this.$toast.success('Validation Error!.', { icon: "error_outline" });
          } else {
            this.$toast.success('Something went wrong.Please try again!.', { icon: "error_outline" });
          }
        })
    },

    paginatePreview() {
      let page_number = parseInt(this.meta.current_page - 1);
      this.fetchImportMessagesPaginateprimary(page_number);
    },

    paginateNext() {

      let page_number = parseInt(this.meta.current_page + 1);
      this.fetchImportMessagesPaginateprimary(page_number);

    },

    paginatePageWise(row) {
      this.fetchImportMessagesPaginateprimary(row);
    },

    async fetchImportMessagesPaginateprimary(page) {
      let vm = this;
      let page_number = page;
      var token = window.$nuxt.$cookies.get('token');

      return await this.$axios.get('student/support-ticket?page=' + page_number + '&token=' + token)

        .then(function (response) {

          this.supportTickets = response.data.data;
          this.links = response.data.links;
          this.meta = response.data.meta;

        }).catch(function (error) {
          if (error.response.status == 400) {
            toastr.error(error.response.data.error);
            return false;
          } else {
            toastr.error("Something went wrong");
          }
        });
    },

  },

  created() {
    this.getSupportTicketLists();
  }
}
</script>

<style scoped></style>
