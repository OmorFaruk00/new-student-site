
<template>
    <section>
        <div class="col-lg-4 col-md-6 col-sm-12 mx-auto card card-body mb-3 no-print  mt-3 py-5">

            <h3 class="text-center mb-4">Payment Successfully Done.</h3>
            <button :disabled="loading" class="btn btn-primary w-100" @click="printReceipt">Downlod Receipt<i v-if="loading" class="fas fa-spinner fa-spin"></i></button>
        </div>
    </section>
</template>

<script>

export default {


    data() {
        return {
            loading: false,
        };
    },



    methods: {

        async printReceipt() {
            this.loading=true;
            var payment_id = window.$nuxt.$cookies.get("bkash_payment_id");
            var token = window.$nuxt.$cookies.get("token");
            return await this.$axios.get('/bkash-payment/print-receipt/' + payment_id + '?token=' + token , {responseType: 'blob'})
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'Bkash_Payment_Receipt.pdf');
          document.body.appendChild(link)
          link.click();
          this.loading=false;
        })
        .catch((error) => {
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
