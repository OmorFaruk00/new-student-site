<template>
       <nav class="sidebar sidebar-offcanvas" id="sidebar">
      <ul class="nav pt-4">
        <li class="nav-item navbar-brand-mini-wrapper">
          <a class="nav-link navbar-brand brand-logo-mini" href="#"><i class="dropdown-item-icon icon-user"></i></a>
        </li>
        <li class="nav-item nav-profile">
          <a href="#" class="nav-link">
            <div class="profile-image">
              <img class="img-xs rounded-circle" :src="authuser.profile_photo" alt="profile image">
              <div class="dot-indicator bg-success"></div>
            </div>
            <div class="text-wrapper">
              <p class="profile-name">{{authuser.name}}</p>
              <!-- <p class="designation">Administrator</p> -->
            </div>
            <!-- <div class="icon-container">
              <i class="icon-bubbles"></i>
              <div class="dot-indicator bg-danger"></div>
            </div> -->
          </a>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/profile">
            <span class="menu-title">Profile</span>
            <i class="icon-user menu-icon"></i>
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/dashboard">
            <span class="menu-title">Dashboard</span>
            <i class="icon-screen-desktop menu-icon"></i>
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/account-details">
            <span class="menu-title">Accounts Details</span>
            <i class="icon-screen-desktop menu-icon"></i>
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/academic-result">
            <span class="menu-title">Academic Result</span>
            <i class="icon-screen-desktop menu-icon"></i>
          </nuxt-link>
        </li>
        <!-- <li class="nav-item nav-category"><span class="nav-link">UI Elements</span></li> -->
        <!-- <li class="nav-item">
          <a class="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
            <span class="menu-title">Basic UI Elements</span>
            <i class="icon-layers menu-icon"></i>
          </a>
          <div class="collapse" id="ui-basic">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item"> <a class="nav-link" href="pages/ui-features/buttons.html">Buttons</a></li>
              <li class="nav-item"> <a class="nav-link" href="pages/ui-features/dropdowns.html">Dropdowns</a></li>
              <li class="nav-item"> <a class="nav-link" href="pages/ui-features/typography.html">Typography</a></li>
            </ul>
          </div>
        </li> -->
        <!-- <li class="nav-item">
          <a class="nav-link" data-bs-toggle="collapse" href="#icons" aria-expanded="false" aria-controls="icons">
            <span class="menu-title">Icons</span>
            <i class="icon-globe menu-icon"></i>
          </a>
          <div class="collapse" id="icons">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item"> <a class="nav-link" href="pages/icons/font-awesome.html">Font Awesome</a></li>
            </ul>
          </div>
        </li> -->
        <!-- <li class="nav-item">
          <a class="nav-link" data-bs-toggle="collapse" href="#forms" aria-expanded="false" aria-controls="forms">
            <span class="menu-title">Forms</span>
            <i class="icon-book-open menu-icon"></i>
          </a>
          <div class="collapse" id="forms">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item"> <a class="nav-link" href="pages/forms/basic_elements.html">Form Elements</a></li>
            </ul>
          </div>
        </li> -->
        <!-- <li class="nav-item">
          <a class="nav-link" data-bs-toggle="collapse" href="#charts" aria-expanded="false" aria-controls="charts">
            <span class="menu-title">Charts</span>
            <i class="icon-chart menu-icon"></i>
          </a>
          <div class="collapse" id="charts">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item"> <a class="nav-link" href="pages/charts/chartjs.html">ChartJs</a></li>
            </ul>
          </div>
        </li> -->
        <!-- <li class="nav-item">
          <a class="nav-link" data-bs-toggle="collapse" href="#tables" aria-expanded="false" aria-controls="tables">
            <span class="menu-title">Tables</span>
            <i class="icon-grid menu-icon"></i>
          </a>
          <div class="collapse" id="tables">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item"> <a class="nav-link" href="pages/tables/basic-table.html">Basic Table</a></li>
            </ul>
          </div>
        </li> -->
        <li class="nav-item nav-category"><span class="nav-link">Extra Pages</span></li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
            <span class="menu-title">User Pages</span>
            <i class="icon-disc menu-icon"></i>
          </a>
          <div class="collapse" id="auth">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item"> <a class="nav-link" href="#"> Blank Page </a></li>
              <li class="nav-item"> <a class="nav-link" href="#"> Login </a></li>
              <li class="nav-item"> <a class="nav-link" href="#"> Register </a></li>
              <li class="nav-item"> <a class="nav-link" href="#"> 404 </a></li>
              <li class="nav-item"> <a class="nav-link" href="#"> 500 </a></li>
            </ul>
          </div>
        </li>
        <!-- <li class="nav-item nav-category"><span class="nav-link">Help</span></li>
        <li class="nav-item">
          <a class="nav-link" href="../../docs/documentation.html" target="_blank">
            <span class="menu-title">Documentation</span>
            <i class="icon-folder-alt menu-icon"></i>
          </a>
        </li> -->
      </ul>
    </nav>
</template>
<script>


export default {

  data() {
    return {
      authuser: "",    
    };
  },
  mounted() {
    this.authuser = window.$nuxt.$cookies.get("user");
  },

  methods: {
    logout() {
      window.$nuxt.$cookies.remove("token");
      window.$nuxt.$cookies.remove("user");
      // window.$nuxt.$cookies.remove("currentExamSchedule");
      // window.$nuxt.$cookies.remove("currentExamRoutine");
      // window.$nuxt.$cookies.remove("feedbackMiddlewareStatus");
      this.$router.push("/");
    },
   
  }

}
</script>
<style>

</style>