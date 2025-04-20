<template>
  <div class="container mt-3">
    <div class="form-horizontal">
      <div class="form-header">
        <h4>Create Post</h4>
      </div>
      <div class="px-3 py-4">
        <div class="form-group mb-4">
          <label>Title <span class="text-danger">*</span></label>
          <p class="text-danger" v-if="error.title" v-text="error.title[0]"></p>
          <input
            v-model="title"
            type="text"
            class="form-control"
            placeholder="Please enter title"
          />
        </div>
        <div class="mb-4 form-group">
          <label class="form-label">Select Categories</label>
          <multiselect
            v-model="selectedCategories"
            :options="categories"
            :multiple="true"
            :searchable="true"
            placeholder="Pick categories"
            label="name"
            track-by="id"
            class="custom-multiselect "
          />
        </div>

        <div class="mb-4 form-group">
          <label class="form-label">Select Tags</label>
          <multiselect
            v-model="selectedTags"
            :options="tags"
            :multiple="true"
            :searchable="true"
            placeholder="Pick tags"
            label="name"
            track-by="id"
            class="custom-multiselect "
          />
        </div>
        <div class="mb-4 form-group">
            <label>Description <span class="text-danger">*</span></label>
          <textarea id="ckeditor" v-model="description"></textarea>
          <p class="text-danger" v-if="error.description" v-text="error.description[0]"></p>
        </div>

        <div class="form-group focused mx-auto">
            <label>Image <span class="text-danger">*</span></label>
          <div class="custom-file">           
            <input
              type="file"
              class="custom-file-input form-control"
              name="image"
              ref="image"
              id="image"
              accept="images/*"
            />
            <p class="text-danger" v-if="error.file" v-text="error.file[0]"></p>
  

            <label class="custom-file-label" for="image">Upload Image </label>
          </div>
         
        </div>

        <div class="form-group">
        <button @click="postCreate" class="btn btn-primary float-right">
          Submit
        </button>
      </div>
     
      </div>

     
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      selectedCategories: [],
      selectedTags: [],
      categories: [],
      tags: [],
      title: "",
      description: "",
      image: "",
      error: "",
    };
  },
  mounted() {
    this.loadCKEditor();

  },
  methods: {
    async postCreate() {
      var token = window.$nuxt.$cookies.get("token");

      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("description", this.description);
      this.selectedCategories.forEach((category, index) => {
        formData.append(`category_ids[${index}]`, category.id);
      });

      this.selectedTags.forEach((tag, index) => {
        formData.append(`tags_ids[${index}]`, tag.id);
      });
      formData.append("file", this.$refs.image.files[0]);
    
       if(this.title == ""){
        this.$toast.error('Please Enter Title', { icon: "error_outline" });
        return;
      }
      else if(this.description == ""){
        this.$toast.error('Please Enter Description', { icon: "error_outline" });
        return;
      }
      else if(this.$refs.image.files[0] == undefined){
        this.$toast.error('Please Select Image', { icon: "error_outline" });
        return;
      }
      else{

      return await this.$axios
        .post("student-blog/post?token=" + token, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.$toast.success('Post Created Successfuly', { icon: "error_outline" });
            this.$router.push({ path: "/blog-post" });
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.error = error.response.data;
          } else {
            this.$toast.error("Something Wrong");
          }
        });
    }
    },
    async getCategory() {
      var token = window.$nuxt.$cookies.get("token");
      var user = window.$nuxt.$cookies.get("user");
      return await this.$axios
        .get("/student-blog/category" + "?token=" + token)
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getTag() {
      var token = window.$nuxt.$cookies.get("token");
      var user = window.$nuxt.$cookies.get("user");
      return await this.$axios
        .get("/student-blog/tag" + "?token=" + token)
        .then((response) => {
          this.tags = response.data;
          console.log(rsponse.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadCKEditor() {
      if (typeof window !== "undefined") {
        const script = document.createElement("script");
        script.src = "https://cdn.ckeditor.com/4.16.2/standard/ckeditor.js";
        script.onload = () => {
          CKEDITOR.replace("ckeditor"); // Initialize CKEditor on the textarea

          // Optionally listen to content changes
          CKEDITOR.instances['ckeditor'].on('change', () => {
            this.description = CKEDITOR.instances['ckeditor'].getData(); // Update description when content changes
          });
        };
        document.head.appendChild(script);
      }
    },
    saveContent() {
      const editorData = CKEDITOR.instances.ckeditor.getData();
      console.log("Editor Content:", editorData);
    },
  },

  created() {
    this.getCategory();
    this.getTag();
  },
};
</script>
<style scoped lang="scss">
:deep(.multiselect__tags) {
  min-height: 50px;
  padding-top: 15px;
}
.form-control[type=file]:not(:disabled):not([readonly]){
  padding-top: 15px;
}
</style>
  