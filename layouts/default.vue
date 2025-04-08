<template>
  <div class="container-scroller">
  <TopBar />

  <div class="container-fluid page-body-wrapper">
    <!-- partials/sidebar -->
      <SideBar />
    <div class="main-panel">
      <div class="content-wrapper">
         <nuxt />
      </div>
    </div>

</div>
<!-- page-body-wrapper ends -->
<!-- <Footer /> -->
</div>
 </template>

<script>
import TopBar from '~/components/TopBar.vue';
import SideBar from '~/components/SideBar.vue';
import Footer from '~/components/Footer.vue';

export default {
  components: {
    TopBar,
    SideBar,
    Footer
  }
}
</script>
