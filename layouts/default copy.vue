<template>
  <div class="container-scroller">
    <nav class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
    <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
      <a class="navbar-brand brand-logo" href="#">
        <img src="/images/white-logo.png" alt="logo" class="logo-dark" />
        <img src="/images/white-logo.png" alt="logo-light" class="logo-light">
      </a>
      <a class="navbar-brand brand-logo-mini" href="#"><img src="/images/white-logo.png" alt="logo" /></a>
      <button @click="toggleSidebar" class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
        <span class="icon-menu"></span>
      </button>
    </div>
    <div class="navbar-menu-wrapper d-flex align-items-center">
      <h5 class="mb-0 font-weight-medium d-none d-lg-flex">Welcome To Student Portal</h5>
      <ul class="navbar-nav navbar-nav-right">

        <li class="nav-item dropdown">
          <a class="nav-link count-indicator message-dropdown" id="messageDropdown" href="#" data-bs-toggle="dropdown"
            aria-expanded="false">
            <i class="icon-speech"></i>
            <span class="count">7</span>
          </a>
          <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list pb-0"
            aria-labelledby="messageDropdown">
            <a class="dropdown-item py-3">
              <p class="mb-0 font-weight-medium float-start me-2">You have 7 unread mails </p>
              <span class="badge badge-pill badge-primary float-end">View all</span>
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item preview-item">
              <div class="preview-thumbnail">
                <img src="assets/images/faces/face10.jpg" alt="image" class="img-sm profile-pic">
              </div>
              <div class="preview-item-content flex-grow py-2">
                <p class="preview-subject ellipsis font-weight-medium text-dark">Marian Garner </p>
                <p class="font-weight-light small-text"> The meeting is cancelled </p>
              </div>
            </a>
            <a class="dropdown-item preview-item">
              <div class="preview-thumbnail">
                <img src="assets/images/faces/face12.jpg" alt="image" class="img-sm profile-pic">
              </div>
              <div class="preview-item-content flex-grow py-2">
                <p class="preview-subject ellipsis font-weight-medium text-dark">David Grey </p>
                <p class="font-weight-light small-text"> The meeting is cancelled </p>
              </div>
            </a>
            <a class="dropdown-item preview-item">
              <div class="preview-thumbnail">
                <img src="assets/images/faces/face1.jpg" alt="image" class="img-sm profile-pic">
              </div>
              <div class="preview-item-content flex-grow py-2">
                <p class="preview-subject ellipsis font-weight-medium text-dark">Travis Jenkins </p>
                <p class="font-weight-light small-text"> The meeting is cancelled </p>
              </div>
            </a>
          </div>
        </li>

        <!-- <li class="nav-item dropdown d-none d-xl-inline-flex user-dropdown "> -->
        <li class="nav-item dropdown  user-dropdown ">
          <a class="nav-link dropdown-toggle" id="UserDropdown" href="#" data-bs-toggle="dropdown"
            aria-expanded="false">
            <img class="img-xs rounded-circle ms-2" :src="authuser.profile_photo" alt="Profile image"> <span
              class="font-weight-bold d-none d-xl-inline-flex"> {{ authuser.name }}</span></a>
          <div class="dropdown-menu dropdown-menu-right navbar-dropdown log-out-dropdown"
            aria-labelledby="UserDropdown">

            <div class="dropdown-header text-center">
              <img class="img-md rounded-circle" style="height: 120px; width: 120px;" :src="authuser.profile_photo"
                alt="Profile image">
              <p class="mb-1 mt-3 font-weight-bold">{{ authuser.name }}</p>
              <p class="font-weight-light mb-0">{{ authuser.email }}</p>
            </div>
            <nuxt-link to="/profile" class="dropdown-item" active-class="active-link"><i
                class="dropdown-item-icon icon-user text-primary"></i> My Profile
            </nuxt-link>

            <a class="dropdown-item"><i class="dropdown-item-icon icon-energy text-primary"></i> Activity</a>
            <a class="dropdown-item" @click="logout()"><i class="dropdown-item-icon icon-power text-primary"></i>Sign
              Out</a>
          </div>
        </li>
      </ul>
      <button @click="toggleSidebarMobile" class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button"
    >
        <span class="icon-menu"></span>
      </button>
    </div>
  </nav>

  <div class="container-fluid page-body-wrapper">
    <!-- partials/sidebar -->
    <nav class="sidebar sidebar-offcanvas" :class="{ active: isSidebarActive }" id="sidebar">
      <ul class="nav pt-4">
        <!-- <li class="nav-item navbar-brand-mini-wrapper">
          <a class="nav-link navbar-brand brand-logo-mini" href="#"><i class="dropdown-item-icon icon-user"></i></a>
        </li> -->
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
// import TopBar from '~/components/TopBar.vue';
// import SideBar from '~/components/SideBar.vue';
// import Footer from '~/components/Footer.vue';

export default {
  middleware: "authenticated",
  // components: {
  //   TopBar,
  //   SideBar,
  //   Footer
  // }
  data() {
    return {
      authuser: "",    
      isSidebarActive: false,
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
    toggleSidebar() {
      const body = document.body;
      // alert("toggleSidebar");

      if (
      body.classList.contains('sidebar-toggle-display') ||
      body.classList.contains('sidebar-absolute')
    ) {
      body.classList.toggle('sidebar-hidden');
    } else {
      body.classList.toggle('sidebar-icon-only');
      
    }
    },
    toggleSidebarMobile()
    {
      // alert("toggleSidebarMobile");
      this.isSidebarActive = !this.isSidebarActive;
    }
   
  }
}
</script>
<style>
.active-link {
  background-color: #e6f7ff;
  /* light blue or your choice */
  color: #000;
  /* optional text color */
}

@media (max-width: 1200px) {
  .log-out-dropdown {
    left: -150px !important;

  }
}

@media (max-width: 320px) {
  .log-out-dropdown {
    left: -85px !important;

  }
}
</style>
