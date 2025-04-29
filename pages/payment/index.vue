<template>
    <div>

        <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12 mx-auto pt-5 ">
               <div class="card p-4 mb-5  mx-auto">
                <img src="/images/bkash.png" style="height: 100px;width:100%;" alt="">
                <nuxt-link to="/payment/bkash" class="btn btn-primary btn-lg w-100 mt-3 text-center"> Pay with bkash</nuxt-link>
               </div>
            </div>
                <div class="col-lg-6 col-md-6 col-sm-12 mx-auto py-2 pt-5 ">
               <div class="card p-4 mb-5  mx-auto">
                <img src="https://nagad.com.bd/_nuxt/img/logo.a4624c6.svg" style="height: 100px;width:100%;" alt="">
                <nuxt-link to="/payment/nagad" class="btn btn-primary btn-lg w-100 mt-3 text-center"> Pay with Nagad</nuxt-link>
               </div>
            </div>
                <div class="col-lg-6 col-md-6 col-sm-12 mx-auto py-2 ">
               <div class="card p-4 mb-5  mx-auto">
                <img src="/images/card.png" style="height: 200px;width:100%;" alt="">
                <nuxt-link to="/payment/card" class="btn btn-primary btn-lg w-100 mt-3 text-center"> Pay with card</nuxt-link>
               </div>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12 mx-auto py-2 ">

               <div class="card mb-3 p-4  mx-auto">
                <img src="/images/rocket.png" style="height: 200px;width:100%; margin-bottom: 20px;" alt="">
                <h6>Please open ROCKET app on your Mobile. Then Click On Bill Pay >> Search: 2944 >> Input registration code >> Click on Validate >> Then go as per app instructions.</h6>                
               </div>
               </div>
            
        </div>
        
    </div>
</template>
<style scoped>
.nuxt-progress {
  position: fixed;
  width: 100%;
  display: none;
  height: 100%;
}
@media (min-width: 1124px) {
    .card{
        width: 75% !important;
    }

}
</style>