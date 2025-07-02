<template>

  <div class="card rounded mb-3">
    <h3 class="fw-bold px-4 pt-3">Select Payment Method</h3>
    <div class="px-4">
      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" id="mobile-tab" data-bs-toggle="tab" href="#mobile" role="tab" aria-controls="home"
            aria-selected="true">Mobile Banking</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="credit-card" data-bs-toggle="tab" href="#edit-mobile" role="tab"
            aria-controls="mobile" aria-selected="false">Credit Card</a>
        </li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane fade show active" id="mobile" role="tabpanel" aria-labelledby="mobile-tab">
          <div class="row">
            <div class="col-lg-4 col-md-3 col-sm-12">
              <div class="pay-card p-3 mb-3  mx-auto">
                <img src="/images/bkash.png" alt="" class="pay-img">
              </div>
            </div>
            <div class="col-lg-6 col-md-9 col-sm-12 py-3">
              <div class="form-group">
                <select class="form-control" id="batch_mate_id" name="batch_mate_id" required
                  v-model="bkash_payment_type">
                  <option selected disabled value="" class="custom-select">Select Payment Type
                  </option>
                  <option v-for="(item, index) in purposes" :key="index" :value="item.id">
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <input type="number" class="form-control" v-model="bkash_amount" required placeholder="Amount">
              </div>
              <div class="pb-5 float-end">
                <button :disabled="bloading" type="submit" class="btn btn-primary" @click="paymentBkash">
                  Pay<i v-if="bloading" class="fa fa-spinner fa-spin"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-4 col-md-3 col-sm-12">
              <div class="pay-card p-3 mb-3  mx-auto">
                <img src="https://nagad.com.bd/_nuxt/img/logo.a4624c6.svg" alt="" class="pay-img">
              </div>
            </div>
            <div class="col-lg-6 col-md-9 col-sm-12 py-3">
              <div class="form-group">
                <select class="form-control" id="batch_mate_id" name="batch_mate_id" required
                  v-model="nagad_payment_type">
                  <option selected disabled value="" class="custom-select">Select Payment Type
                  </option>
                  <option v-for="(item, index) in purposes" :key="index" :value="item.id">
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <input type="number" class="form-control" v-model="nagad_amount" required placeholder="Amount">
              </div>
              <div class="pb-5 float-end">
                <button :disabled="nloading" type="submit" class="btn btn-primary" @click="paymentNagad">
                  Pay<i v-if="nloading" class="fa fa-spinner fa-spin"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-4 col-md-3 col-sm-12">
              <div class="pay-card p-3 mb-3  mx-auto">
                <img src="/images/rocket.png" class="pay-img">

              </div>
            </div>
            <div class="col-lg-6 col-md-9 col-sm-12 py-3">
              <h6 class="text-muted">Please open ROCKET app on your Mobile. Then Click On Bill Pay
                >> Search: 2944 >> Input registration code >> Click on Validate >> Then go as
                per app instructions.</h6>
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="edit-mobile" role="tabpanel" aria-labelledby="credit-card">
          <div class="row">
            <div class="col-lg-4 col-md-4 col-sm-12">
              <div class="pay-card p-3 mb-3  mx-auto">
                <img src="images/card.png" style="height: 220px;width:100%;">
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 py-3">
              <div class="form-group">
                <select class="form-control" id="batch_mate_id" name="batch_mate_id" required
                  v-model="card_payment_type">
                  <option selected disabled value="" class="custom-select">Select Payment Type
                  </option>
                  <option v-for="(item, index) in purposes" :key="index" :value="item.id">
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <input type="number" class="form-control" v-model="card_amount" required placeholder="Amount">
              </div>
              <div class="row">
                <div class="col-9 col-md-9 col-sm-12 mb-3">
                  <input type="checkbox" name="option1" v-model="isChecked">
                  &nbsp; I agree to the
                  <a href="https://diu.ac/terms_and_conditions" target="_blank">Terms &
                    Conditions</a>
                  and
                  <a href="https://diu.ac/terms_and_conditions" target="_blank">Refund
                    Policy</a>
                </div>

                <div class="col-lg-3 col-md-3 col-sm-12 text-end">
                  <button :disabled="cloading" type="submit" class="btn btn-primary" @click="paymentCard">
                    Pay <i v-if="cloading" class="fa fa-spinner fa-spin"></i>
                  </button>
                  <br>
                  <span class="text-muted" style="font-size: 12px;">Service charge may
                    apply</span>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  </div>




</template>
<style scoped>
.nav-tabs .nav-link {
  background: none !important;
}
.tab-content {
  border: none;
  padding: 30px 0px;
}

.nav {
  border-bottom: none;
}

.nav-link {
  border: none;
}

.nav-item .active {
  border-bottom: 4px solid #18ac4f;
}

.pay-card {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  border-radius: 30px;
  padding: 54px 0px;
}

.pay-card .pay-img {
  margin: 30px 0px !important;
  height: 100px;
  width: 100%;
}
</style>


<script>

export default {
  data() {
    return {
      purposes: "",
      bkash_payment_type: "",
      nagad_payment_type: "",
      card_payment_type: "",
      bkash_amount: "",
      nagad_amount: "",
      card_amount: "",
      bloading: false,
      nloading: false,
      cloading: false,
      isChecked: false,
    };
  },
  mounted() {
    this.getPurpose();

  },
  methods: {
    async paymentBkash() {
      var token = window.$nuxt.$cookies.get("token");
      var user = window.$nuxt.$cookies.get("user");
      var student_id = user.id;

      if (this.bkash_payment_type === "") {
        this.$toast.error('Please Select Payment Type', { icon: "error_outline" });
      } else if (this.bkash_amount === "") {
        this.$toast.error('Please Enter Amount', { icon: "error_outline" });
      } else {
        this.bloading = true;
        return await this.$axios
          .post("/bkash-payment/create-payment" + '?token=' + token, {
            student_id: student_id,
            payment_type: this.bkash_payment_type,
            amount: this.bkash_amount,
          })
          .then((response) => {
            window.$nuxt.$cookies.set("bkash_payment_id", response.data.paymentId, {
              path: "/",
              maxAge: 1800
            });
            window.open(response.data.bkashURL, '_blank');
            this.bkash_payment_type = "";
            this.bkash_amount = "";
            this.bloading = false;
          })
          .catch((error) => {
            console.log(error);
          });

      }



    },
    async paymentNagad() {
      var token = window.$nuxt.$cookies.get("token");
      var user = window.$nuxt.$cookies.get("user");
      var student_id = user.id;

      if (this.nagad_payment_type === "") {
        this.$toast.error('Please Select Payment Type', { icon: "error_outline" });
      } else if (this.nagad_amount === "") {
        this.$toast.error('Please Enter Amount', { icon: "error_outline" });
      } else {
        this.nloading = true;
        return await this.$axios
          .post("/nagad/create-payment" + '?token=' + token, {
            student_id: student_id,
            purpose_id: this.nagad_payment_type,
            amount: this.nagad_amount,
          })
          .then((response) => {

            window.$nuxt.$cookies.set("nagadOrderId", response.data.orderId, {
              path: "/",
              maxAge: 1800
            });
            window.open(response.data.nagadUrl, '_blank');
            this.nagad_payment_type = "";
            this.nagad_amount = "";
            this.nloading = false;
          })
          .catch((error) => {
            console.log(error);
          });

      }



    },
    async paymentCard() {
      var token = window.$nuxt.$cookies.get("token");
      var user = window.$nuxt.$cookies.get("user");
      var student_id = user.id;

      if (this.card_payment_type === "") {
        this.$toast.error('Please Select Payment Type', { icon: "error_outline" });
      }
      else if (this.card_amount === "") {
        this.$toast.error('Please Enter Amount', { icon: "error_outline" });
      }
      else if (this.isChecked == false) {
        this.$toast.error('Please agree terms and conditions', { icon: "error_outline" });
      }
      else {
        this.cloading = true;
        return await this.$axios
          .post("/card/create_payment" + '?token=' + token, {
            student_id: student_id,
            payment_type: this.card_payment_type,
            amount: this.card_amount,
          })
          .then((response) => {
            window.$nuxt.$cookies.remove("order_id");
            window.$nuxt.$cookies.set("order_id", response.data.orderId, {
              path: "/",
              maxAge: 1800
            });
            window.open(response.data.url, '_blank');
            this.card_payment_type = "";
            this.card_amount = "";
            this.cloading = false;
          })
          .catch((error) => {
            console.log(error);
          });

      }

    },
    async getPurpose() {
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
