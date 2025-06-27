<template>
           <nav class="navbar col-lg-12 col-12 mb-3 rounded ">
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
                  <a class="nav-link count-indicator message-dropdown" id="messageDropdown" href="#"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <span class=" rounded px-2 py-1" style="background: #ecf0f4;">  <i class="fa fa-bell " style="font-size: 15px;"></i></span>

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

                  </div>
                </li>
                <li class="nav-item dropdown  user-dropdown ">
                  <a class="nav-link dropdown-toggle" id="UserDropdown" href="#" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <img class="img-xs rounded-circle ms-2" :src="authuser.profile_photo" alt="Profile image"> <span
                      class="font-weight-bold d-none d-xl-inline-flex me-2"> {{ authuser.name }}</span> <i
                      class="fa fa-angle-down" ></i></a>
                  <div class="dropdown-menu dropdown-menu-right navbar-dropdown log-out-dropdown"
                    aria-labelledby="UserDropdown">

                    <nuxt-link to="/profile" class="dropdown-item" active-class="active-link"><i
                        class="fa fa-user text-primary" style="padding-right: 10px !important;"></i> View Profile
                    </nuxt-link>

                    <a class="dropdown-item" @click="logout()"><i class="fa fa-sign-out text-primary"
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
         </template>
         <script>

export default {
  middleware: "authenticated",

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
