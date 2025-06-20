
<template>
    <section>
        <div class="card card-body mb-3 no-print col-lg-6 col-md-8 col-sm-12 mx-auto mt-5">
            
            <h4 class="text-center text-info mb-4">Payment Successfully Done.</h4>
            <button  class="btn btn-info w-100" @click="printReceipt">Downlod Receipt<i v-if="loading" class="fas fa-spinner fa-spin"></i></button>
            <!-- <nuxt-link class="btn btn-danger w-100" to="/profile-show">Home</nuxt-link> -->
        </div>
    </section>
</template>

<script>
// import print from 'print-js';
import Vue from "vue";

export default {
    layout() {
    return 'default';
  },
    // middleware: "feedbackAuthenticated",
    data() {
        return {
           
            loading: false,
        };
    },
    mounted() {
        // this.getPurpose();
    },
    methods: {
        


        async printReceipt() {
            this.loading=true;
            var slug = this.$route.params.slug;
            var token = window.$nuxt.$cookies.get("token");
            return await this.$axios.get('/bkash/print-receipt/' + slug , {responseType: 'blob'})
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'Payment_Receipt.pdf');
          document.body.appendChild(link)
          link.click();
          this.loading=false;
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error('Not found', {icon: "error_outline"});
        })
        },

    

     

    
    },
};
</script>

<style>
.nuxt-progress {
  position: fixed;
  width: 100%;
  display: none;
  height: 100%;
}
</style>