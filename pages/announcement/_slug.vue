<template>
  <div class="bg-white shadow-sm rounded  mb-3">
    <h4 class="fw-semibold p-3">Announcement Details</h4>
    <hr>
    <div class=" px-3 pb-3">
      <div v-if="notice">
        <h4>{{ notice.title }}</h4>
       <div v-html="notice.description"></div>
        <p> <small class="text-muted">
            <i class="fa fa-calendar me-2"></i>
            {{ notice.published_date }}
          </small></p>
        <div>
          <a :href="notice.notice_files[0].file_url" class="text-decoration-none" target="_blank" download  >
            <i class="fa fa-download me-1 text-muted"></i> <strong style="cursor: pointer;color: #18AC4F !important;">Download</strong>
          </a>
        </div>
      </div>
      <div v-if="loading" class="d-flex justify-content-center align-items-center pb-4">
        <i class="fa fa-spinner fa-spin fa-4x text-primary"></i>
      </div>
    </div>
  </div>
</template>

<script>import Vue from "vue";

export default {
  data() {
    return {
      loading: true,
      notice: '',
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.loading = true;
      var slug = this.$route.params.slug;
      return await this.$axios.get('/public-diu-website/notice/' + slug)
        .then((response) => {
          this.notice = response.data.data;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error('Not found', { icon: "error_outline" });
        })
    },

  },
};
</script>

