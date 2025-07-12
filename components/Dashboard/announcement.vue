<template>

   <div class="bg-white shadow-sm rounded  mb-3" v-if="announcement">
          <h4 class="fw-semibold p-3">Announcements</h4>
          <hr>
          <div class="announcement px-3 pb-3 pt-1">
            <div >
              <p v-for="notice in announcement" :key="notice.id">
                <a :href="'/announcement/' + notice.slug" class="text-decoration-none text-dark">
                  <i class="fa fa-circle me-2" style="font-size: 12px !important;"></i> {{ notice.title }}
                </a>
              </p>
              <nuxt-link to="/announcement" class="btn-see"> See More</nuxt-link>
            </div>
            <div v-if="loading" class="d-flex justify-content-center align-items-center pb-4">
              <i class="fa fa-spinner fa-spin fa-4x text-primary"></i>
            </div>
          </div>
        </div>
</template>
<script>

export default {
  data() {
    return {
      announcement: [],
      loading: false

    };
  },


  mounted() {

    const Announcement = this.$cookies.get("Announcement");

    if (Announcement) {
      this.announcement = Announcement;
    } else {
      this.getData();
    }

  },
  methods: {
    async getData() {
      this.loading = true;
      var token = window.$nuxt.$cookies.get("token");
      return await this.$axios
        .get("/student/dashboard-announcement?token=" + token)
        .then(response => {
          console.log(response.data);
          window.$nuxt.$cookies.set("Announcement", response.data, {
            path: "/",
            maxAge: 1800
          });
          this.announcement = response.data;
        })
        .catch(error => {
          console.log(error);

        }).finally((final) => {
          this.loading = false;
        });;
    },



  }
}
</script>
<style scoped>
@media (min-width: 1000px) and (max-width: 1200px) {
  .custom-dropdown {
    margin-left: -100px !important;
  }
}
</style>
