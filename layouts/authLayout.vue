

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
               <nuxt />

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



<script>
export default {
    // layout: "authLayout",
    mounted() {
  const inputs = $(".input input");

  // Check on load if value exists
  inputs.each(function () {
    if ($(this).val()) {
      $(this).parent(".input").find("label").addClass("label-active label-blue");
      $(this).addClass("line-active");
    }
  });

  // Focus
  inputs.focus(function () {
    const inputWrapper = $(this).parent(".input");
    inputWrapper.find("label").addClass("label-active label-blue");
    $(this).addClass("line-active");
  });

  // Blur
  inputs.blur(function () {
    const inputWrapper = $(this).parent(".input");
    if ($(this).val() === "") {
      inputWrapper.find("label").removeClass("label-active label-blue");
      $(this).removeClass("line-active");
    } else {
      inputWrapper.find("label").addClass("label-active label-blue");
      $(this).addClass("line-active");
    }
  });
}

};
</script>

