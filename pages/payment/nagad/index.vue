<template>
    <section>
        <div class="form-horizontal mb-3 p-4 no-print col-lg-4 col-md-6 col-sm-12 mx-auto mt-3">
          <div class="mb-3">
            <h4>Nagad Payment</h4>
            <p>Here you can pay with Nagad.</p>
            <img src="https://nagad.com.bd/_nuxt/img/logo.a4624c6.svg" style="height: 100px;width:100%;" alt="">
          </div>
            <div class="form-group mt-3">
                <select class="form-control" id="batch_mate_id" name="batch_mate_id" required v-model="purpose_id">
                    <option selected value="">Select Payment Type</option>
                    <option v-for="(item, index) in purposes" :key="index" :value="item.id">
                        {{ item.name }}
                    </option>
                </select>
                <label for="batch_mate_id">Payment Type *</label>
                <small id="batch_mate_id_help" class="form-text text-danger">&nbsp;</small>
            </div>
            <div class="form-group focused">
                <input type="number" class="form-control" v-model="amount" required>
                <label for="">Amount *</label>
                <small id="" class="form-text text-danger">&nbsp;</small>
            </div>
            <div class="pb-5">
                <button :disabled="loading"  type="submit" class="btn btn-primary w-100" @click="payment">
                    Pay With Nagad <i v-if="loading" class="fa fa-spinner fa-spin"></i>
                </button>
            </div>
        </div>
    </section>
</template>

<script>
// import print from 'print-js';
import Vue from "vue";

export default {
    // middleware: "feedbackAuthenticated",
    data() {
        return {
            purposes: "",
            purpose_id: "",
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

            if (this.purpose_id === "") {
              this.$toast.error('Please Select Payment Type', {icon: "error_outline"});
            } else if (this.amount === "") {
                this.$toast.error('Please Enter Amount', {icon: "error_outline"});
            }else{
                this.loading=true;
                 return await this.$axios
                .post("/nagad/create-payment" + '?token=' + token,{
                    student_id:student_id,
                    purpose_id:this.purpose_id,
                    amount:this.amount,
                })
                .then((response) => {

                    console.log(response.data.nagadUrl);
                    window.$nuxt.$cookies.set("nagadOrderId", response.data.orderId, {
                    path: "/",
                    maxAge: 1800
                    });
                    window.open(response.data.nagadUrl, '_blank');
                    // window.location.href  = response.data.nagadUrl;
                    this.purpose_id = "";
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
<style>
.nuxt-progress {
  position: fixed;
  width: 100%;
  display: none;
  height: 100%;
}
</style>