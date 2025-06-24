<template>

    <div class="row">

        <div class="">
            <div class="card rounded mb-3">
                <div class="">

                    <ul class="nav nav-tabs" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="profile-tab" data-bs-toggle="tab" href="#profile" role="tab"
                                aria-controls="home" aria-selected="true">Profile</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="edit-profile-tab" data-bs-toggle="tab" href="#edit-profile"
                                role="tab" aria-controls="profile" aria-selected="false">Edit Profile</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="change-password-tab" data-bs-toggle="tab" href="#change-password-1"
                                role="tab" aria-controls="change-password" aria-selected="false">Change password</a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane fade show active" id="profile" role="tabpanel"
                            aria-labelledby="profile-tab">

                           <Profile />

                        </div>
                        <div class="tab-pane fade" id="edit-profile" role="tabpanel" aria-labelledby="edit-profile-tab">
                          <EditProfile />
                        </div>
                        <div class="tab-pane fade" id="change-password-1" role="tabpanel"
                            aria-labelledby="change-password-tab">
                        <ChnagePassword />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



</template>




<script>
import Profile from '~/components/Profile/index.vue'
import EditProfile from '~/components/Profile/edit.vue'
import ChnagePassword from '~/components/Profile/change-password.vue'

export default {
    components: {
        Profile,
        EditProfile,
        ChnagePassword
    }
}
</script>
