<template>
  <div class="container-scroller">
    <nav class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <a class="navbar-brand brand-logo" href="#">
          <img src="/images/logo.png" alt="logo" class="logo-dark" style="margin-bottom: 20px;" />
          <!-- <img src="/images/logo.png" alt="logo-light" class="logo-light"> -->
        </a>
        <a class="navbar-brand brand-logo-mini" href="#"><img src="/images/logo.png" alt="logo" /></a>
        <button @click="toggleSidebar" class="navbar-toggler navbar-toggler align-self-center" type="button"
          data-toggle="minimize">
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
          <li class="nav-item dropdown  user-dropdown ">
            <a class="nav-link dropdown-toggle" id="UserDropdown" href="#" data-bs-toggle="dropdown"
              aria-expanded="false">
              <img class="img-xs rounded-circle ms-2" :src="authuser.profile_photo" alt="Profile image"> <span
                class="font-weight-bold d-none d-xl-inline-flex"> {{ authuser.name }}</span></a>
            <div class="dropdown-menu dropdown-menu-right navbar-dropdown log-out-dropdown"
              aria-labelledby="UserDropdown">

              <!-- <div class="dropdown-header text-center">
                <img class="img-md rounded-circle" style="height: 120px; width: 120px;" :src="authuser.profile_photo"
                  alt="Profile image">
                <p class="mb-1 mt-3 font-weight-bold">{{ authuser.name }}</p>
                <p class="font-weight-light mb-0">{{ authuser.email }}</p>
              </div> -->
              <nuxt-link to="/profile" class="dropdown-item" active-class="active-link"><i
                  class="dropdown-item-icon icon-user text-primary"></i> View Profile
              </nuxt-link>

              <a class="dropdown-item" @click="logout()"><i class="dropdown-item-icon icon-power text-primary"></i>Log
                Out</a>
            </div>
          </li>
        </ul>
        <button @click="toggleSidebarMobile" class="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button">
          <span class="icon-menu"></span>
        </button>
      </div>
    </nav>

    <div class="container-fluid page-body-wrapper">

      <nav class="sidebar sidebar-offcanvas" :class="{ active: isSidebarActive }" id="sidebar">
        <ul class="nav pt-4">

          <li class="nav-item" :class="{ 'active-nav': $route.path === '/dashboard' }">
            <nuxt-link class="nav-link" to="/dashboard">
              <span class="menu-title" @click="taggleMenu()">Dashboard</span>

              <i class="fa fa-tachometer menu-icon"></i>
            </nuxt-link>
          </li>

          <li class="nav-item" :class="{ 'active-nav': $route.path === '/profile' }">
            <nuxt-link class="nav-link" to="/profile">
              <span class="menu-title" @click="taggleMenu()">Profile</span>
              <i class="icon-user menu-icon"></i>

            </nuxt-link>
          </li>


          <li class="nav-item" :class="{ 'active-nav': $route.path === '/download-form' }">
            <nuxt-link class="nav-link" to="/download-form">
              <span class="menu-title" @click="taggleMenu()">Download Form</span>
              <i class="fa fa-download menu-icon"></i>
            </nuxt-link>
          </li>
          <li class="nav-item" :class="{ 'active-nav': $route.path === '/Payment' }">
            <nuxt-link class="nav-link" to="/Payment">
              <span class="menu-title" @click="taggleMenu()">Pay Now</span>
              <i class="fa fa-credit-card menu-icon"></i>
            </nuxt-link>
          </li>
          <li class="nav-item" :class="{ 'active-nav': $route.path === '/account-details' }">
            <nuxt-link class="nav-link" to="/account-details">
              <span class="menu-title" @click="taggleMenu()">Accounts Details</span>
              <i class="fa fa-university menu-icon" aria-hidden="true"></i>
            </nuxt-link>
          </li>
          <li class="nav-item" :class="{ 'active-nav': $route.path === '/hostel-account-details' }">
            <nuxt-link class="nav-link" to="/hostel-account-details">
              <span class="menu-title" @click="taggleMenu()">Hostel Accounts Details</span>
              <i class="fa fa-university menu-icon" aria-hidden="true"></i>
            </nuxt-link>
          </li>

          <li class="nav-item" :class="{ 'active-nav': $route.path === '/academic-result' }">
            <nuxt-link class="nav-link" to="/academic-result">
              <span class="menu-title" @click="taggleMenu()">Academic Result</span>
              <i class="fa fa-book menu-icon"></i>
            </nuxt-link>
          </li>

          <li class="nav-item" :class="{ 'active-nav': $route.path === '/mail-account' }">
            <nuxt-link class="nav-link" to="/mail-account">
              <span class="menu-title" @click="taggleMenu()">DIU Mail Account</span>
              <i class="fa fa-envelope menu-icon"></i>
            </nuxt-link>
          </li>
          <li class="nav-item" :class="{ 'active-nav': $route.path === '/attendance' }">
            <nuxt-link class="nav-link" to="/attendance">
              <span class="menu-title" @click="taggleMenu()">Class Attendance</span>
              <i class="fa fa-clock-o menu-icon"></i>
            </nuxt-link>
          </li>
          <li class="nav-item" :class="{ 'active-nav': $route.path === '/education-materials' }">
            <nuxt-link class="nav-link" to="/education-materials">
              <span class="menu-title" @click="taggleMenu()">Education Meterials</span>
              <i class="fa fa-graduation-cap menu-icon"></i>
            </nuxt-link>
          </li>



          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
              <span class="menu-title">Improvement</span>
              <i class="icon-disc menu-icon"></i>
            </a>
            <div class="collapse" id="auth">
              <ul class="nav flex-column sub-menu">

                <li class="nav-item" :class="{ 'active-nav': $route.path === '/improvement/formfillup' }"> <nuxt-link
                    class="nav-link" to="/improvement/formfillup"> Eligible Subject </nuxt-link></li>
                <li class="nav-item" :class="{ 'active-nav': $route.path === '/improvement/result' }"> <nuxt-link
                    class="nav-link" to="/improvement/result"> Improvement Result </nuxt-link></li>
              </ul>
            </div>
          </li>
          <li class="nav-item" :class="{ 'active-nav': $route.path === '/blog-post' }">
            <nuxt-link class="nav-link" to="/blog-post">
              <span class="menu-title" @click="taggleMenu()">Blog Post</span>
              <i class="fa fa-newspaper-o menu-icon"></i>
            </nuxt-link>
          </li>

          <li class="nav-item" :class="{ 'active-nav': $route.path === '/staffs-service-feedback' }">
            <nuxt-link class="nav-link" to="/staffs-service-feedback">
              <span class="menu-title" @click="taggleMenu()">Staffs Feedback</span>
              <i class="fa fa-comment	 menu-icon"></i>
            </nuxt-link>
          </li>
          <li class="nav-item" :class="{ 'active-nav': $route.path === '/teachers-service-feedback' }">
            <nuxt-link class="nav-link" to="/teachers-service-feedback">
              <span class="menu-title" @click="taggleMenu()">Teachers Feedback</span>
              <i class="fa fa-comment menu-icon"></i>
            </nuxt-link>
          </li>
          <li class="nav-item" :class="{ 'active-nav': $route.path === '/support-ticket' }">
            <nuxt-link class="nav-link" to="/support-ticket">
              <span class="menu-title" @click="taggleMenu()">IT Support Ticket</span>
              <i class="fa fa-life-ring menu-icon"></i>
            </nuxt-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="collapse" href="#tolet" aria-expanded="false" aria-controls="tolet">
              <span class="menu-title">To-let</span>
              <i class="fa fa-bed menu-icon"></i>
            </a>
            <div class="collapse" id="tolet">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item" :class="{ 'active-nav': $route.path === '/to-let/publish' }">
                  <nuxt-link class="nav-link" to="/to-let/publish">T0-Let Publish</nuxt-link>
                </li>
                <li class="nav-item" :class="{ 'active-nav': $route.path === '/to-let/find' }">
                  <nuxt-link class="nav-link" to="/to-let/find">To-let Find</nuxt-link>
                </li>
                <li class="nav-item" :class="{ 'active-nav': $route.path === '/to-let/request' }">
                  <nuxt-link class="nav-link" to="/to-let/request">To-let Request</nuxt-link>
                </li>
              </ul>
            </div>
          </li>


          <li class="nav-item" :class="{ 'active-nav': $route.path === '/campus-adda' }">
            <nuxt-link class="nav-link" to="/campus-adda">
              <span class="menu-title" @click="taggleMenu()">Campus Adda</span>
              <i class="fa fa-user-secret menu-icon"></i>
            </nuxt-link>
          </li>
          <li class="nav-item" :class="{ 'active-nav': $route.path === '/blood_bank' }">
            <nuxt-link class="nav-link" to="/blood_bank">
              <span class="menu-title" @click="taggleMenu()">Blood Donate</span>
              <i class="fa fa-suitcase menu-icon"></i>
            </nuxt-link>
          </li>

        </ul>
      </nav>
      <div class="main-panel">
        <div class="content-wrapper">
          <nuxt />
        </div>
      </div>

    </div>

    <!-- page-body-wrapper ends -->
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
    toggleSidebarMobile() {
      this.isSidebarActive = !this.isSidebarActive;
    },
    taggleMenu() {
      this.isSidebarActive = false;
    }

  }
}
</script>
<style>
.active-link {
  background-color: #e6f7ff;
  color: #000;
}

.nuxt-link-exact-active .menu-icon {
  color: #18AC4F !important;
  font-weight: bolder;
}

.active-nav .nav-link,
.active-nav .menu-title,
.active-nav .menu-icon {
  color: #000 !important;
}

.active-nav {
  background-color: #18AC4F !important;
  border-radius: 4px;
}

.nav-item:hover .nav-link {
  color: #18AC4F !important;

}

.nav-item:hover .sub-menu .nav-link {
  color: #000 !important;

}

.nav-item:hover {
  background: #ffff !important;

}

.sub-menu .nav-item .nav-link:hover {
  color: #18AC4F !important;
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
