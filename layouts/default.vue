<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper">
      <nav class="sidebar sidebar-offcanvas" :class="{ active: isSidebarActive }" id="sidebar">
        <ul class="nav pt-4">
          <div class="desktop-logo text-center">
            <a class="navbar-brand brand-logo" href="#">
              <img src="/images/logo.png" alt="logo" class="logo-dark" style="margin-bottom: 20px;" />
            </a>
            <hr>
          </div>
          <li class="nav-item" :class="{ 'active-nav': $route.path === '/dashboard' }">
            <nuxt-link class="nav-link" to="/dashboard">
              <i class="fa fa-tachometer menu-icon"></i>
              <span class="menu-title" @click="taggleMenu()">Dashboard</span>
            </nuxt-link>
          </li>
          <li class="nav-item" :class="{ 'active-nav': $route.path === '/profile' }">
            <nuxt-link class="nav-link" to="/profile">
              <i class="fa fa-user menu-icon"></i>
              <span class="menu-title" @click="taggleMenu()">Profile</span>

            </nuxt-link>
          </li>
          <li class="nav-item" :class="{ 'active-nav': $route.path === '/download-form' }">
            <nuxt-link class="nav-link" to="/download-form">
              <i class="fa fa-download menu-icon"></i>
              <span class="menu-title" @click="taggleMenu()">Download Form</span>
            </nuxt-link>
          </li>
          <li class="nav-item" :class="{ 'active-nav': $route.path === '/Payment' }">
            <nuxt-link class="nav-link" to="/Payment">
              <i class="fa fa-credit-card menu-icon"></i>
              <span class="menu-title" @click="taggleMenu()">Pay Now</span>
            </nuxt-link>
          </li>
          <li class="nav-item" :class="{ 'active-nav': $route.path === '/account-details' }">
            <nuxt-link class="nav-link" to="/account-details">
              <i class="fa fa-university menu-icon" aria-hidden="true"></i>
              <span class="menu-title" @click="taggleMenu()">Accounts Details</span>
            </nuxt-link>
          </li>
          <li class="nav-item" :class="{ 'active-nav': $route.path === '/hostel-account-details' }">
            <nuxt-link class="nav-link" to="/hostel-account-details">
              <i class="fa fa-university menu-icon" aria-hidden="true"></i>
              <span class="menu-title" @click="taggleMenu()">Hostel Accounts Details</span>
            </nuxt-link>
          </li>
          <li class="nav-item" :class="{ 'active-nav': $route.path === '/academic-result' }">
            <nuxt-link class="nav-link" to="/academic-result">
              <i class="fa fa-book menu-icon"></i>
              <span class="menu-title" @click="taggleMenu()">Academic Result</span>
            </nuxt-link>
          </li>
          <li class="nav-item" :class="{ 'active-nav': $route.path === '/mail-account' }">
            <nuxt-link class="nav-link" to="/mail-account">
              <i class="fa fa-envelope menu-icon"></i>
              <span class="menu-title" @click="taggleMenu()">Mail Account</span>
            </nuxt-link>
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
          <li class="nav-item" :class="{ 'active-nav': $route.path === '/education-materials' }">
            <nuxt-link class="nav-link" to="/education-materials">
              <i class="fa fa-graduation-cap menu-icon"></i>
              <span class="menu-title" @click="taggleMenu()">Education Meterials</span>
            </nuxt-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
              <i class="fa fa-line-chart menu-icon px-1"></i>
              <span class="menu-title ">Improvement <i class="fa fa-angle-down"
                  style="margin-left: 50px !important;"></i></span>
            </a>
            <div class="collapse" id="auth">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item" :class="{ 'active': $route.path === '/improvement/formfillup' }"
                  @click="taggleMenu()"> <nuxt-link class="nav-link" to="/improvement/formfillup"> <i
                      class="fa fa-book me-2"></i> Eligible Subject </nuxt-link></li>
                <li class="nav-item" :class="{ 'active': $route.path === '/improvement/result' }" @click="taggleMenu()">
                  <nuxt-link class="nav-link" to="/improvement/result"> <i class="fa fa-file-text me-2"></i> Result
                  </nuxt-link>
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
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="collapse" href="#feedback" aria-expanded="false"
              aria-controls="feedback">
              <i class="fa fa-comment menu-icon px-1"></i>
              <span class="menu-title ">Feedback <i class="fa fa-angle-down"
                  style="margin-left: 70px !important;"></i></span>
            </a>
            <div class="collapse" id="feedback">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item" :class="{ 'active': $route.path === '/staffs-service-feedback' }"
                  @click="taggleMenu()"> <nuxt-link class="nav-link" to="/staffs-service-feedback"> <i
                      class="fa fa-comment  me-2"></i> Staffs</nuxt-link></li>
                <li class="nav-item" :class="{ 'active': $route.path === '/teachers-service-feedback' }"
                  @click="taggleMenu()">
                  <nuxt-link class="nav-link" to="/teachers-service-feedback"> <i class="fa fa-comment  me-2"></i>
                    Teachers
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item" :class="{ 'active-nav': $route.path === '/support-ticket' }">
            <nuxt-link class="nav-link" to="/support-ticket">
              <i class="fa fa-headphones menu-icon"></i>
              <span class="menu-title" @click="taggleMenu()">Support Ticket</span>
            </nuxt-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="collapse" href="#tolet" aria-expanded="false" aria-controls="tolet">
              <i class="fa fa-bed menu-icon px-1"></i>
              <span class="menu-title">To-let <i class="fa fa-angle-down"
                  style="margin-left: 95px !important;"></i></span>
            </a>
            <div class="collapse" id="tolet">
              <ul class="nav flex-column sub-menu">

                <li class="nav-item" :class="{ 'active': $route.path === '/to-let/publish' }" @click="taggleMenu()">
                  <nuxt-link class="nav-link" to="/to-let/publish"> <i class="fa fa-file-text me-2"></i> To-Let
                    Publish</nuxt-link>
                </li>
                <li class="nav-item" :class="{ 'active': $route.path === '/to-let/findt' }" @click="taggleMenu()">
                  <nuxt-link class="nav-link" to="/to-let/find"> <i class="fa fa-search me-2"></i> To-let
                    Find</nuxt-link>
                </li>
                <li class="nav-item" :class="{ 'active': $route.path === '/to-let/request' }" @click="taggleMenu()">
                  <nuxt-link class="nav-link" to="/to-let/request"> <i class="fa fa-pencil-square-o me-2"></i> To-let
                    Request</nuxt-link>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item" :class="{ 'active-nav': $route.path === '/campus-adda' }">
            <nuxt-link class="nav-link" to="/campus-adda">
              <i class="fa fa-user-secret menu-icon"></i>
              <span class="menu-title" @click="taggleMenu()">Campus Adda</span>
            </nuxt-link>
          </li>
          <li class="nav-item" :class="{ 'active-nav': $route.path === '/blood_bank' }">
            <nuxt-link class="nav-link" to="/blood_bank">
              <i class="fa fa-suitcase menu-icon"></i>
              <span class="menu-title" @click="taggleMenu()">Blood Donate</span>
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
                <li class="nav-item dropdown  user-dropdown ">
                  <div class="card border rounded px-2 py-1">
                    <nuxt-link to="/support-ticket" class="d-block text-center">
                      <img src="/images/support.png" alt="Support" height="20">
                    </nuxt-link>
                  </div>
                </li>
                <li class="nav-item dropdown">
                  <Notification />

                </li>
                <li class="nav-item dropdown  user-dropdown ">
                  <a class="nav-link dropdown-toggle" id="UserDropdown" href="#" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <img class="img-xs rounded-circle ms-2" :src="authuser.profile_photo" alt="Profile image"> <span
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
.nav-link {
  font-family: 'Roboto', sans-serif;
  color: #6c757d !important;
}

.nuxt-link-exact-active .menu-icon {
  color: #18AC4F !important;
  font-weight: bolder;
}

.active-nav .nav-link,
.active-nav .menu-title,
.active-nav .menu-icon {
  color: #fff !important;
}

.active-nav {
  background-color: #18AC4F !important;
  color: #fff !important;
  border-radius: 7px;
  margin: 0px 10px !important;
  padding: 0px 18px !important;
}

.active-nav:hover {
  background-color: #18AC4F !important;
}

.sub-menu .active {
  background-color: #18AC4F !important;
  color: #fff !important;
  border-radius: 7px;
}

.nav-item:hover .nav-link,
.nav-item:hover .menu-title,
.nav-item:hover .menu-icon {
  color: #18AC4F !important;
}

.nav-item:hover .sub-menu .nav-item.active .nav-link {
  color: #fff !important;
}

.nav-item:hover {
  background: #ffff !important;
}

.sub-menu .nav-item .nav-link:hover {
  color: #18AC4F !important;
}

.menu-btn {
  background: #18AC4F !important;
  padding: 8px 12px;
  color: #fff;
  border: none;
  border-radius: 10px;
  margin-left: 20px;
}

.navbar-toggler {
  border: none;
  background: none;
}

.desktop-logo img {
  height: 50px !important;
  width: 100px !important;
  margin-top: 0px !important;
  margin-bottom: 0px !important;
}

.desktop-logo {
  display: block;
  transition: all 0.3s ease;
}

.sidebar-icon-only .desktop-logo {
  display: none !important;
}

.mobile-logo {
  display: none !important;
}

@media (max-width: 1200px) {
  .log-out-dropdown {
    left: -150px !important;

  }
}

@media (max-width: 1000px) {
  .menu-btn {
    display: none !important;
  }

  .desktop-logo {
    display: none !important;
  }


}

@media (min-width: 400px) and (max-width: 800px) {
  .mobile-logo {
    display: block !important;
    margin-bottom: 0px !important;
    margin-top: 20px !important;
  }
}


</style>
