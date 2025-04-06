<template>
  <div class="container-scroller">
     <div class="container-fluid page-body-wrapper full-page-wrapper">
       <div class="content-wrapper d-flex align-items-stretch auth auth-img-bg">
         <div class="row flex-grow">
           <div class="col-lg-6 d-flex align-items-center justify-content-center">
             <div class="auth-form-transparent text-left p-3">
               <div class="brand-logo">
                 <img src="/images/logo.png" alt="logo">
                 <h4 class="pt-3">Students Portal - DIU</h4>
               </div>
              
               <h4>Welcome back!</h4>
               <h6 class="font-weight-light">Happy to see you again!</h6>
               <form class="pt-3">
                 <div class="form-group">
                   <label for="exampleInputEmail">Username</label>
                   <div class="input-group">
                     <div class="input-group-prepend bg-transparent">
                       <span class="input-group-text bg-transparent border-right-0">
                         <i class="icon-user text-primary"></i>
                       </span>
                     </div>
                     <input type="text" class="form-control form-control-lg border-left-0" id="" placeholder="Username">
                   </div>
                 </div>
                 <div class="form-group">
                   <label for="exampleInputPassword">Password</label>
                   <div class="input-group">
                     <div class="input-group-prepend bg-transparent">
                       <span class="input-group-text bg-transparent border-right-0">
                         <i class="icon-lock text-primary"></i>
                       </span>
                     </div>
                     <input type="password" class="form-control form-control-lg border-left-0" id="exampleInputPassword" placeholder="Password">
                   </div>
                 </div>
                 <div class="my-2 d-flex justify-content-between align-items-center">
                   <div class="form-check">
                     <label class="form-check-label text-muted">
                       <input type="checkbox" class="form-check-input"> Keep me signed in </label>
                   </div>
                   <a href="#" class="auth-link  text-primary font-weight-medium">Forgot password?</a>
                 </div>
                 <div class="my-3">
                   <a class="btn d-grid btn-primary btn-lg font-weight-medium auth-form-btn" href="#">LOGIN</a>
                 </div>
             
                 <div class="text-center mt-4 font-weight-light"> Don't have an account?  <nuxt-link to="/auth/register" class="text-primary font-weight-bold">Create Accounts</nuxt-link>
                 </div>
               </form>
             </div>
           </div>
           <div class="col-lg-6 login-half-bg d-flex flex-row">
           <Footer />
           </div>
         </div>
       </div>
       <!-- content-wrapper ends -->
     </div>
     <!-- page-body-wrapper ends -->
   </div>
</template>
<script>
import Footer from '~/components/Footer.vue';


export default {
  layout: "authLayout",
  components: {
    Footer
  }
}
</script>