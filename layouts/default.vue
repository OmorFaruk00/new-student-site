<template>
  <div class="container-scroller">
    <div class="page-body-wrapper">
      <nav class="sidebar sidebar-offcanvas" :class="{ active: isSidebarActive }" id="sidebar">
        <ul class="nav pt-4">
          <div class="desktop-logo text-center">
            <a class="navbar-brand brand-logo" href="/dashboard">
              <img src="/images/logo.png" alt="logo" class="logo-dark" style="margin-bottom: 20px;" />
            </a>
            <hr>
          </div>
          <li class="nav-item" :class="{ 'active-nav': $route.path.replace(/\/+$/, '') === '/dashboard' }">
            <nuxt-link class="nav-link" to="/dashboard">
              <i class="fa fa-tachometer menu-icon"></i>
              <span class="menu-title" @click="taggleMenu()">Dashboard</span>
            </nuxt-link>
          </li>

          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="collapse" href="#payment" aria-expanded="false" aria-controls="payment">
              <i class="fa fa-credit-card menu-icon"></i>
              <span class="menu-title ">Payment Info <i class="fa fa-angle-down"
                  style="margin-left: 50px !important;"></i></span>
            </a>
            <div class="collapse" id="payment">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item" :class="{ 'active': $route.path === '/payment' }" @click="taggleMenu()"> <nuxt-link
                    class="nav-link" to="/payment"> <i class="fa fa-circle me-2" style="font-size: 8px !important;"></i>
                    Pay Fees </nuxt-link></li>
                <li class="nav-item" :class="{ 'active': $route.path === '/account-details' }" @click="taggleMenu()">
                  <nuxt-link class="nav-link" to="/account-details"> <i class="fa fa-circle me-2"
                      style="font-size: 8px !important;"></i> Account Details
                  </nuxt-link>
                </li>
                <li class="nav-item" :class="{ 'active': $route.path === '/hostel-account-details' }"
                  @click="taggleMenu()">
                  <nuxt-link class="nav-link" to="/hostel-account-details"> <i class="fa fa-circle me-2"
                      style="font-size: 8px !important;"></i> Hostel Accounts Details
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </li>

          <li class="nav-item" :class="{ 'active-nav': $route.path === '/download-form' }">
            <nuxt-link class="nav-link" to="/download-form">
              <i class="fa fa-download menu-icon"></i>
              <span class="menu-title" @click="taggleMenu()">Download Form</span>
            </nuxt-link>
          </li>
          <li class="nav-item" :class="{ 'active-nav': $route.path === '/academic-result' }">
            <nuxt-link class="nav-link" to="/academic-result">
              <i class="fa fa-book menu-icon"></i>
              <span class="menu-title" @click="taggleMenu()"> Results</span>
            </nuxt-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
              <i class="fa fa-line-chart menu-icon"></i>
              <span class="menu-title ">Improvement <i class="fa fa-angle-down"
                  style="margin-left: 50px !important;"></i></span>
            </a>
            <div class="collapse" id="auth">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item" :class="{ 'active': $route.path === '/improvement/formfillup' }"
                  @click="taggleMenu()"> <nuxt-link class="nav-link" to="/improvement/formfillup"> <i
                      class="fa fa-circle me-2" style="font-size: 8px !important;"></i> Eligible Subject </nuxt-link>
                </li>
                <li class="nav-item" :class="{ 'active': $route.path === '/improvement/result' }" @click="taggleMenu()">
                  <nuxt-link class="nav-link" to="/improvement/result"> <i class="fa fa-circle me-2"
                      style="font-size: 8px !important;"></i> Improvement Result
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item" :class="{ 'active-nav': $route.path === '/attendance' }">
            <nuxt-link class="nav-link" to="/attendance">
              <i class="fa fa-clock-o menu-icon"></i>
              <span class="menu-title" @click="taggleMenu()">Attendance</span>
            </nuxt-link>
          </li>
          <li class="nav-item" :class="{ 'active-nav': $route.path === '/class-routine' }">
            <nuxt-link class="nav-link" to="/class-routine">
              <i class="fa fa-calendar menu-icon"></i>
              <span class="menu-title" @click="taggleMenu()"> Routine</span>
            </nuxt-link>
          </li>
          <li class="nav-item" :class="{ 'active-nav': $route.path === '/mail-account' }">
            <nuxt-link class="nav-link" to="/mail-account">
              <i class="fa fa-envelope menu-icon"></i>
              <span class="menu-title" @click="taggleMenu()">Mail Account</span>
            </nuxt-link>
          </li>
          <li class="nav-item" :class="{ 'active-nav': $route.path === '/education-materials' }">
            <nuxt-link class="nav-link" to="/education-materials">
              <i class="fa fa-graduation-cap menu-icon"></i>
              <span class="menu-title" @click="taggleMenu()">Education Meterials</span>
            </nuxt-link>
          </li>
          <li class="nav-item" :class="{ 'active-nav': $route.path === '/profile' }">
            <nuxt-link class="nav-link" to="/profile">
              <i class="fa fa-user menu-icon"></i>
              <span class="menu-title" @click="taggleMenu()">Profile</span>

            </nuxt-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="collapse" href="#tolet" aria-expanded="false" aria-controls="tolet">
              <i class="fa fa-bed menu-icon"></i>
              <span class="menu-title">To-let <i class="fa fa-angle-down"
                  style="margin-left: 95px !important;"></i></span>
            </a>
            <div class="collapse" id="tolet">
              <ul class="nav flex-column sub-menu">

                <li class="nav-item" :class="{ 'active': $route.path === '/to-let/publish' }" @click="taggleMenu()">
                  <nuxt-link class="nav-link" to="/to-let/publish"> <i class="fa fa-circle me-2"
                      style="font-size: 8px !important;"></i> To-Let
                    Publish</nuxt-link>
                </li>
                <li class="nav-item" :class="{ 'active': $route.path === '/to-let/find' }" @click="taggleMenu()">
                  <nuxt-link class="nav-link" to="/to-let/find"> <i class="fa fa-circle me-2"
                      style="font-size: 8px !important;"></i> To-let
                    Find</nuxt-link>
                </li>
                <li class="nav-item" :class="{ 'active': $route.path === '/to-let/request' }" @click="taggleMenu()">
                  <nuxt-link class="nav-link" to="/to-let/request"> <i class="fa fa-circle me-2"
                      style="font-size: 8px !important;"></i> To-let
                    Request</nuxt-link>
                </li>
              </ul>
            </div>
          </li>




          <li class="nav-item" :class="{
            'active-nav': ['/blog-post', '/blog-post/create'].includes($route.path) ||
              $route.path.startsWith('/blog-post/edit')
          }">
            <nuxt-link class="nav-link" to="/blog-post">
              <i class="fa fa-newspaper-o menu-icon"></i>
              <span class="menu-title" @click="taggleMenu()">Blog/Fourm</span>
            </nuxt-link>
          </li>
          <li class="nav-item" :class="{ 'active-nav': $route.path === '/blood_bank' }">
            <nuxt-link class="nav-link" to="/blood_bank">
              <i class="fa fa-suitcase menu-icon"></i>
              <span class="menu-title" @click="taggleMenu()">Blood Donate</span>
            </nuxt-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="collapse" href="#feedback" aria-expanded="false"
              aria-controls="feedback">
              <i class="fa fa-comment menu-icon"></i>
              <span class="menu-title ">Feedback <i class="fa fa-angle-down"
                  style="margin-left: 70px !important;"></i></span>
            </a>
            <div class="collapse" id="feedback">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item" :class="{ 'active': $route.path === '/staffs-service-feedback' }"
                  @click="taggleMenu()"> <nuxt-link class="nav-link" to="/staffs-service-feedback"> <i
                      class="fa fa-circle me-2" style="font-size: 8px !important;"></i> Staffs</nuxt-link></li>
                <li class="nav-item" :class="{ 'active': $route.path === '/teachers-service-feedback' }"
                  @click="taggleMenu()">
                  <nuxt-link class="nav-link" to="/teachers-service-feedback"> <i class="fa fa-circle me-2"
                      style="font-size: 8px !important;"></i>
                    Teachers
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item" :class="{ 'active-nav': $route.path === '/support-ticket' }">
            <nuxt-link class="nav-link" to="/support-ticket">
              <i class="fa fa-headphones menu-icon"></i>
              <span class="menu-title" @click="taggleMenu()">Support</span>
            </nuxt-link>
          </li>
          <li class="nav-item" :class="{ 'active-nav': $route.path === '/campus-adda' }">
            <nuxt-link class="nav-link" to="/campus-adda">
              <i class="fa fa-user-secret menu-icon"></i>
              <span class="menu-title" @click="taggleMenu()">Campus Adda</span>
            </nuxt-link>
          </li>
        </ul>
      </nav>
      <div class="main-panel">
        <div class="content-wrapper">
          <nav class="navbar rounded ">
            <div class="">
              <img src="/images/logo.png" alt="logo" class="mobile-logo"
                style="margin-bottom: 20px; height: 30px; width: 40px; margin-left: 20px;" />
              <button @click="toggleSidebar" class="navbar-toggler navbar-toggler align-self-center border-none"
                type="button" data-toggle="minimize">
                <span class="fa fa-bars menu-btn"></span>
              </button>
            </div>
            <div class="navbar-menu-wrapper d-flex align-items-center">
              <ul class="navbar-nav navbar-nav-right">

                <Notification />

                <li class="nav-item dropdown  user-dropdown ">
                  <a class="nav-link dropdown-toggle" id="UserDropdown" href="#" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <img v-if="authuser.profile_photo" class="img-xs rounded-circle ms-2" :src="authuser.profile_photo"
                      alt="Profile image"><span v-else><i class="fa fa-user text-muted"
                        style="padding-right: 10px !important;"></i></span> <span
                      class="font-weight-bold d-none d-xl-inline-flex me-2"> {{ authuser.name }}</span> <i
                      class="fa fa-angle-down"></i></a>
                  <div class="dropdown-menu dropdown-menu-right navbar-dropdown log-out-dropdown"
                    aria-labelledby="UserDropdown">
                    <nuxt-link to="/profile" class="dropdown-item" active-class="active-link"><i
                        class="fa fa-user text-muted" style="padding-right: 10px !important;"></i> View Profile
                    </nuxt-link>
                    <nuxt-link to="/change-password" class="dropdown-item" active-class="active-link"><i
                        class="fa fa-cog text-muted" style="padding-right: 10px !important;"></i> Change Password
                    </nuxt-link>

                    <a class="dropdown-item" @click="logout()"><i class="fa fa-sign-out text-muted"
                        style="padding-right: 10px !important;"></i>Log
                      Out</a>
                  </div>
                </li>
              </ul>
              <button @click="toggleSidebarMobile"
                class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button">
                <i class="fa fa-bars"></i>
              </button>
            </div>
          </nav>
          <div class="mt-3">
            <nuxt />
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import Notification from '@/components/Notification.vue';

export default {
  middleware: "authenticated",
  components: {
    Notification
  },

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
      window.$nuxt.$cookies.remove("currentExamSchedule");
      window.$nuxt.$cookies.remove("SupportTicketNotification");
      window.$nuxt.$cookies.remove("Announcement");
      localStorage.removeItem("deshboardData");
      this.$router.push("/");
    },
    toggleSidebar() {
      const body = document.body;
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
<style scoped>

</style>
