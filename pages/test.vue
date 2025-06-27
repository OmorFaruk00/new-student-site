<template>
  <!-- Trigger -->
<li class="nav-item dropdown position-relative">
  <a class="nav-link count-indicator" href="#" id="notificationDropdown" role="button"
     data-bs-toggle="dropdown" aria-expanded="false">
    <span class="rounded px-2 py-1 bg-light">
      <i class="fa fa-bell text-dark" style="font-size: 15px;"></i>
    </span>
    <span class="count">7</span>
  </a>

  <!-- Dropdown Menu -->
  <div class="dropdown-menu dropdown-menu-end custom-dropdown" aria-labelledby="notificationDropdown">
    <a class="dropdown-item py-3">
      <p class="mb-0 fw-medium float-start me-2">You have 7 unread mails</p>
      <span class="badge bg-primary float-end">View all</span>
    </a>
    <div class="dropdown-divider"></div>

    <!-- Item -->
    <a class="dropdown-item d-flex align-items-start">
      <div class="me-3">
        <img src="/images/faces/face10.jpg" class="rounded-circle" width="40" height="40" alt="User" />
      </div>
      <div>
        <p class="mb-0 fw-bold text-dark">Marian Garner</p>
        <small class="text-muted">The meeting is cancelled</small>
      </div>
    </a>
  </div>
</li>

</template>
<style>
/* Desktop: Large dropdown */
.custom-dropdown {
  width: 400px;
  max-height: 500px;
  overflow-y: auto;
  border-radius: 10px;
}

/* Mobile: Full width dropdown */
@media (max-width: 576px) {
  .custom-dropdown {
    width: 100vw !important;
    left: 0 !important;
    right: 0 !important;
    top: 100% !important;
    border-radius: 0;
    margin-top: 0 !important;
    padding: 1rem;
  }
}

</style>
