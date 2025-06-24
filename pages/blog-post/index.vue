<template>
  <div class="bg-white rounded">
    <div class="">
      <div class="form-header d-flex justify-content-between py-3">
        <h3>Blog Post</h3>
        <div>
          <nuxt-link to="/blog-post/create" class="btn btn-primary">Create Post</nuxt-link>
        </div>

      </div>
      <div class="table-responsive p-4">
        <table class="table table-striped table-bordered" v-if="posts.length > 0">
          <thead>
            <tr>
              <th>Sl</th>
              <th>Title</th>
              <th>Description</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(post, index) in posts" :key="post.id">
              <td>{{ index + 1 }}</td>
              <td>
                <div class="description">
                  {{ post.title }}
                </div>
              </td>
              <td>
                <div class="description pt-2" v-html="post.description"></div>
              </td>
              <td><img :src="post.image" alt="" height="80px" width="100px"></td>
              <td>
                <nuxt-link :to="'/blog-post/edit/' + post.id" class="btn btn-bs btn-sm"><i class="fa fa-edit"></i>
                </nuxt-link>
                <button class="btn btn-danger btn-sm" @click="confirmDelete(post.id)"><i class="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-center card p-3 mx-auto" v-else>
          <h4>No Post Found</h4>
        </div>
      </div>

    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      posts: [],
    };
  },
  methods: {

    async confirmDelete(postId) {
      if (confirm("Are you sure you want to delete this post?")) {
        var token = window.$nuxt.$cookies.get("token");
        var user = window.$nuxt.$cookies.get("user");
        return await this.$axios
          .delete("/student-blog/post/" + postId + "?token=" + token)
          .then((response) => {
            this.$toast.success('Post Delete Successfuly', { icon: "error_outline" });
            this.getData();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    async getData() {
      var token = window.$nuxt.$cookies.get("token");
      var user = window.$nuxt.$cookies.get("user");
      return await this.$axios
        .get("/student-blog/post" + '?token=' + token)
        .then((response) => {
          this.posts = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

  },

  created() {
    this.getData();
  }
};
</script>

<style scoped>
.description {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
}
</style>
