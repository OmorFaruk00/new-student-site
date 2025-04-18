<template>
    <section>
        <div class="form-horizontal p-4 mb-3 no-print col-lg-4 col-md-6 col-sm-12 mx-auto mt-3">
          <div class="mb-3">
            <h4>bKash Payment</h4>
            <p>Here you can pay with bKash.</p>
            <img src="/images/bkash.png" style="height: 100px;width:100%;" alt="">
          </div>
            <div class="form-group">
                <select class="form-control" id="batch_mate_id" name="batch_mate_id" required v-model="payment_type">
                    <option selected value="">Select Payment Type</option>
                    <option v-for="(item, index) in purposes" :key="index" :value="item.id">
                        {{ item.name }}
                    </option>
                </select>
                <label for="batch_mate_id">Payment Type *</label>
                <small id="batch_mate_id_help" class="form-text text-danger">&nbsp;</small>
            </div>
            <div class="form-group">
                <input type="number" class="form-control" v-model="amount" required>
                <label for="">Amount *</label>
                <small id="" class="form-text text-danger">&nbsp;</small>
            </div>
            <div class="pb-5">
                <button :disabled="loading"  type="submit" class="btn btn-primary btn-lg w-100" @click="payment">
                    Pay With Bkash <i v-if="loading" class="fa fa-spinner fa-spin"></i>
                </button>
            </div>
        </div>
    </section>
</template>

<script>
// import print from 'print-js';
// import Vue from "vue";

export default {
    // middleware: "feedbackAuthenticated",
    data() {
        return {
            purposes: "",
            payment_type: "",
            amount: "",
            loading: false,
        };
    },
    mounted() {
        this.getPurpose();
    },
    methods: {
        

        async payment() {
            
            var token = window.$nuxt.$cookies.get("token");
            var user = window.$nuxt.$cookies.get("user");
            var student_id = user.id;

            if (this.payment_type === "") {
              this.$toast.error('Please Select Payment Type', {icon: "error_outline"});
            } else if (this.amount === "") {
                this.$toast.error('Please Enter Amount', {icon: "error_outline"});
            }else{
                this.loading=true;
                 return await this.$axios
                .post("/bkash-payment/create-payment" + '?token=' + token,{
                    student_id:student_id,
                    payment_type:this.payment_type,
                    amount:this.amount,
                })
                .then((response) => {
                    window.$nuxt.$cookies.set("bkash_payment_id", response.data.paymentId, {
                    path: "/",
                    maxAge: 1800
                    });
                    window.open(response.data.bkashURL, '_blank');
                    // window.location.href  = response.data.bkashURL;
                    this.payment_type = "";
                    this.amount = "";
                    this.loading=false;
                })
                .catch((error) => {
                    console.log(error);
                });

            }

           

        },
        async getPurpose() {
            var token = window.$nuxt.$cookies.get("token");
            var user = window.$nuxt.$cookies.get("user");
            return await this.$axios
                .get("/public/get_purpose_pay")
                .then((response) => {
                    this.purposes = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },

    

     

    
    },
};
</script>
<!-- <style>
.nuxt-progress {
  position: fixed;
  width: 100%;
  display: none;
  height: 100%;
}
</style> -->