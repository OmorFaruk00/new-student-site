<template>
    <section>
        <div class="form-horizontal mb-3 no-print col-lg-4 col-md-6 col-sm-12 mx-auto mt-3 p-3">
          <div class="mb-4">
            <h4>Card Payment</h4>
            <p>Here you can pay with Card.</p>
            <img src="/images/card.png" style="height: 200px;width:100%;" alt="">
            
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
            <div class="form-group focused">
                <input type="number" class="form-control" v-model="amount" required>
                <label for="">Amount *</label>
                <small id="" class="form-text text-danger">&nbsp;</small>
            </div>  
            <div class="form-group focused">
                <input type="checkbox" name="option1"   v-model="isChecked"> &nbsp; &nbsp; I agree to the <a href="https://diu.ac/terms_and_conditions" target="_blank">Terms & Conditions</a>  and  <a href="https://diu.ac/terms_and_conditions" target="_blank">Refund Policy </a>
            </div>         
            
            <div class="pb-5">
                <button :disabled="loading" type="submit" class="btn btn-primary w-100" @click="payment">
                    Pay With Card <i v-if="loading" class="fa fa-spinner fa-spin"></i>
                </button>
            </div>
            <!-- <span style="display: block; text-align: center; margin-top:  10px;">Service Charge may apply.</span> -->

        </div>
    </section>
</template>

<script>

export default {
    // middleware: "feedbackAuthenticated",
    data() {
        return {
            purposes: "",
            payment_type: "",
            amount: "",          
            loading: false,
            isChecked: false,
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
            } 
            else if (this.amount === "") {
                this.$toast.error('Please Enter Amount', {icon: "error_outline"});
            }
            else if (this.isChecked ==false) {
                this.$toast.error('Please agree terms and conditions', {icon: "error_outline"});
            }
            else{
                this.loading=true;
                 return await this.$axios
                .post("/card/create_payment" + '?token=' + token,{
                    student_id:student_id,
                    payment_type:this.payment_type,
                    amount:this.amount,
                   

                })
                .then((response) => {
                    window.$nuxt.$cookies.remove("order_id");
                    window.$nuxt.$cookies.set("order_id", response.data.orderId, {
                    path: "/",
                    maxAge: 1800
                    });
                    window.open(response.data.url, '_blank');
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
<style>
.nuxt-progress {
  position: fixed;
  width: 100%;
  display: none;
  height: 100%;
}
</style>