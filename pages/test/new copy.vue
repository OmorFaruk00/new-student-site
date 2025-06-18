<template>
    <div class="container-fluid login-page">
        <div class="row no-gutters">

            <!-- Left: Background Image -->
            <div class="col-xl-9 col-lg-7 col-md-6 col-sm-12 d-none d-md-block login-left">
                <div class="welcome">
                    <h1 id="text3d" class="title">Welcome</h1>
                    <p class="description">“Let it go! Let it go! Not saying let go of your education, but let go of the little stuff that tends to dictate whether or not you have a bad day in school. It's HARD to do when you're an adult, much less a kid.”</p>

                </div>

            </div>

            <!-- Right: Login Box -->
            <div class="col-xl-3  col-lg-5 col-md-6 col-sm-12 login-right">
                <div class="brand-logo">
                    <img src="/images/logo.png" alt="logo">
                    <h4 class="pt-3 text-white">Students Portal - DIU</h4>
                </div>
                <div class="login-box">
                    <form>
                        <h1 class="sing">Sign in</h1>
                        <div class="input">
                            <input id="email" type="email" class="validate">
                            <label for="email"> Email</label>
                        </div>
                        <div class="input">
                            <input id="password" type="password" class="validate">
                            <label for="password">Password</label>
                        </div>
                        <span class="checkbox remember">
                            <input type="checkbox" id="remember" />
                            <label for="remember">Remember me</label>
                        </span>
                        <span class="checkbox forgot">
                            <a href="#">Forgot Password?</a>
                        </span>
                     



                        <button class="btn-sign">Login</button>
                    </form>
                   
                </div>
                <div class="check-login">
                    <nuxt-link to="#" class="check-title">Don't have an account? <b>Sign Up</b></nuxt-link>
                </div>

                <div class="d-flex justify-content-between w-100 pb-4 mt-4">
                            <div>
                                <button class="btn-help" >Community Help</button>
                            </div>
                            <div>
                                <button class="btn-help">Face To Face Help</button>
                            </div>
                        </div>

                <div class="copy-right">
                    Developed & Powered by: <strong>IT-Team, DIU</strong><br />
                    &copy; 2025 <strong>Dhaka International University</strong><br />
                    Any advice, complaint or query: <a href="mailto:it@diu-bd.net" class="text-white"><strong>it@diu-bd.net</strong></a>
                </div>
            </div>


        </div>
    </div>
</template>

<style scoped>


</style>

<script>
export default {
    layout: "authLayout",
    mounted() {
        // INPUT FIELDS
        $(".input input").focus(function () {
            $(this).parent(".input").each(function () {
                $("label", this).addClass("label-active label-blue");
                $("input", this).addClass("line-active");
            });
        }).blur(function () {
            $("input").removeClass("line-active");
            $("label").removeClass("label-blue");
            if ($(this).val() === "") {
                $(this).parent(".input").each(function () {
                    $("label", this).removeClass("label-active");
                });
            }
        });


    }
};
</script>