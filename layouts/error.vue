<template>
    <div>
        <section class="page_404">
            <div class="">
                <div class="">
                    <div class="">
                        <div class="text-center">
                            <div class="four_zero_four_bg"></div>

                            <div class="contant_box_404">
                                <h3 class="h2">Look like you're lost</h3>

                                <p>the page you are looking for not avaible!</p>
                                <a href="/" class="link_404">Go to Home</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
  layout: "empty",

};
</script>
<style scoped>
/*======================
    404 page
=======================*/

.page_404 {
    padding: 40px 0;
    background: #fff;
    height: 100vh;
    font-family: "Arvo", serif;
}

.page_404 img {
    width: 100%;
}

.four_zero_four_bg {
    background-image: url(https://cdn.dribbble.com/users/722246/screenshots/3066818/404-page.gif);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    height: 60vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 70px;
}

.four_zero_four_bg h1 {
    font-size: 80px;
}

.four_zero_four_bg h3 {
    font-size: 80px;
}

.link_404 {
    color: #fff !important;
    padding: 10px 20px;
    background: #39ac31;
    margin: 20px 0;
    display: inline-block;
    text-decoration: none;
    border-radius: 5px;
}

.contant_box_404 {
    margin-top: -50px;
}
</style>
