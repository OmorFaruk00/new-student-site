<template>

    <div class="row">

        <div class="col-md-12 grid-margin ">
            <div class="card">
                <div class="">
                    <!-- <h4 class="card-title">Basic Tab</h4>
                    <p class="card-description">Horizontal bootstrap tab</p> -->
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
                            <div class="media">
                                <img class="profile-img" src="/assets/images/faces/face12.jpg" alt="sample image">
                                <div class="media-body">
                                    <h4 class="mt-0">John Doe</h4>
                                    <p> Fail most room even gone her end like. Comparison dissimilar unpleasant six
                                        compliment two unpleasing any add. Ashamed my company thought wishing
                                        colonel it prevent he in. Pretended residence are something far engrossed
                                        old off. </p>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="change-password-1" role="tabpanel"
                            aria-labelledby="change-password-tab">
                            <h4>change-password us </h4>
                            <p> Feel free to change-password us if you have any questions! </p>
                            <p>
                                <i class="icon-phone text-info"></i> +123456789
                            </p>
                            <p>
                                <i class="icon-envelope text-success"></i> change-passwordus@example.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



</template>



<script>
import Profile from '~/components/Profile/index.vue'

export default {
    components: {
        Profile
    }
}
</script>
