<template>
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
</template>
         <script>

export default {
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
