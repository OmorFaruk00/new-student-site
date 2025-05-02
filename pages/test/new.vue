<template>
    <section>
   
                <div class="login-box">
                    <form>
                        <div class="form-icon"><i class="fa fa-user"></i></div>
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
                    <nuxt-link to="/auth/check_account" class="check-title">Don't have an account? <b>Sign Up</b></nuxt-link>
                </div>

                
    </section>
</template>



<script>
export default {
    layout: "authLayout",
    

    
};
</script>