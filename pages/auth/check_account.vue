<template>
    <section>
   
                <div class="login-box">
                    <form >
								<h4>Check your account</h4>
								<div class="input">
									<select id="role" class="validate">
										<option value="" disabled selected>Select Department</option>
										<option value="student">Student</option>
										<option value="teacher">Teacher</option>
										<option value="admin">Admin</option>
									</select>
									</div>

									<div class="input">
									<select id="role" class="validate">
										<option value="" disabled selected>Select Batch</option>
										<option value="student">Student</option>
										<option value="teacher">Teacher</option>
										<option value="admin">Admin</option>
									</select>
									</div>
								<div class="input">
									<label for="password">Registration Code</label>
									<input id="password" type="password" class="validate">
									
								</div>
								<div class="input">
									<label for="password">Roll No</label>
									<input id="password" type="password" class="validate">
									
								</div>
								<div class="input">
									<label for="password">Phone No</label>
									<input id="password" type="password" class="validate">
									
								</div>
							

								<button   class="btn-sign mt-3" @click="verifyAccounts()">Verify</button>
							</form>
                   
                </div>
                <div class="check-login">
                    <nuxt-link to="#" class="check-title">Don't have an account? <b>Sign Up</b></nuxt-link>
                </div>

                
    </section>
</template>



<script>
export default {
    layout: "authLayout",
    

    
};
</script>