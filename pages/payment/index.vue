<template>
    <div>

        <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-12 mx-auto py-5 ">
               <div class="card p-4 mb-5">
                <img src="/images/bkash.png" style="height: 100px;width:100%;" alt="">
                <nuxt-link to="/payment/bkash" class="btn btn-primary w-100 mt-3 text-center"> Pay with bkash</nuxt-link>
               </div>

               <div class="card p-4 mb-5">
                <img src="https://nagad.com.bd/_nuxt/img/logo.a4624c6.svg" style="height: 100px;width:100%;" alt="">
                <nuxt-link to="/payment/nagad" class="btn btn-primary w-100 mt-3 text-center"> Pay with Nagad</nuxt-link>
               </div>

               <div class="card p-4">
                <img src="/images/card.png" style="height: 200px;width:100%;" alt="">
                <nuxt-link to="/payment/card" class="btn btn-primary  w-100 mt-3 text-center"> Pay with card</nuxt-link>
               </div>
            </div>
        </div>
        
    </div>
</template>
<style>
.nuxt-progress {
  position: fixed;
  width: 100%;
  display: none;
  height: 100%;
}
</style>