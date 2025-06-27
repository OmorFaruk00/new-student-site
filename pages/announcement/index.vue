<template>
  <div class="row g-3 mb-3" v-if="notices">
    <div class="col-12 col-sm-6 col-lg-4" v-for="notice in notices" :key="notice.id">
      <div class="bg-white shadow-sm rounded p-3 h-100 d-flex flex-column justify-content-between">
        <div class="announcement px-2 pb-2">
          <p class="mb-1">
            <a :href="'/announcement/' + notice.slug" class="text-decoration-none text-dark">
              <i class="fa fa-file me-2 text-muted"></i>{{ notice.title }}
            </a>
          </p>
          <small class="text-muted">
            <i class="fa fa-calendar me-2"></i>
            {{ notice.published_date }}
          </small>
        </div>
        <div v-if="loading" class="d-flex justify-content-center align-items-center pt-2">
          <i class="fa fa-spinner fa-spin fa-2x text-primary"></i>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      notices: '',
      loading: false
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      return await this.$axios.get('/public-diu-website/notice-event?type=notice')
        .then((response) => {
          this.notices = response.data.data;
        })
        .catch((error) => {
          this.$toast.error('Data Not Found!', { icon: "error_outline" });
        })
    },

  }
}
</script>
