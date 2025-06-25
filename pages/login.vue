<template>
	<div>

		<div class="row">
			<div class="col-lg-9 col-md-8 col-sm-12 login-half-bg d-flex flex-row">
				<div class="login-body">

				</div>
			</div>
			<div class="col-lg-3 col-md-4 col-sm-12">
				<div id="cursor"></div>
				<div id="phone">
					<div class="brand-logo">
						<img src="/images/logo.png" alt="logo">
						<h4 class="pt-3 text-white">Students Portal - DIU</h4>
					</div>
					<div class="copy-right">
						<span>Developed & Powered by: <strong>IT-Team, DIU</strong></span><br>
						<span>© 2025 <strong> Dhaka International University</strong></span><br>
						<span>Any advice, complaint or query: <strong> it@diu-bd.net</strong></span>
					</div>


					<div id="content-wrapper">

						<div class="card" id="login">

							<form>
								<h1>Sign in</h1>




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
								<div class="d-flex justify-content-between w-100 pb-4">
									<div>
									<button class="btn-help">Community Help</button>
									</div>
									<div>
									<button class="btn-help">Face To Face Help</button>
									</div>
								</div>



								<button class="btn-sign">Login</button>
							</form>
							<a href="javascript:void(0)" class="account-check">Already an account? <b>Sign in</b></a>
						</div>



						<div class="card hidden" id="register">

							<form v-if="verify">
								<h1>Verify Accounts</h1>
								<div class="input">
									<select id="role" class="validate">
										<option value="" disabled selected>Select Department</option>
										<option value="student">Student</option>
										<option value="teacher">Teacher</option>
										<option value="admin">Admin</option>
									</select>
									</div>
								<div class="input">
									<input id="password" type="password" class="validate">
									<label for="password">Password</label>
								</div>
								<div class="input">
									<input id="password" type="password" class="validate">
									<label for="password">Password</label>
								</div>
								<div class="input">
									<input id="password" type="password" class="validate">
									<label for="password">Password</label>
								</div>


								<div class="input">
									<input id="confirm-password" type="password" class="validate">
									<label for="confirm-password">Confirm Password</label>
								</div>


								<button   class="btn-sign mt-3" @click="verifyAccounts()">Verify</button>
							</form>
							<form v-if="register">
								<h1>Registration</h1>

								<div class="input">
									<input id="password" type="password" class="validate">
									<label for="password">E-Mail Address</label>
								</div>
								<div class="input">
									<input id="password" type="text" class="validate">
									<label for="password">Confirm E-Mail Address</label>
								</div>
								<div class="input">
									<input id="password" type="password" class="validate">
									<label for="password">Password</label>
								</div>


								<div class="input">
									<input id="confirm-password" type="password" class="validate">
									<label for="confirm-password">Confirm Password</label>
								</div>


								<button   class="btn-sign mt-3" @click="verifyAccounts()">Register</button>
							</form>
							<a href="javascript:void(0)" id="gotologin" class="account-check">Don't have an account?
								<b>Sign
									up</b></a>
						</div>



					</div>



				</div>
			</div>
		</div>


	</div>







</template>


<style scoped>
.login-body {
	/* background-image: linear-gradient(to top, rgba(13, 60, 157, 0.7), rgba(18, 77, 198, 0.7)), url("/images/auth.jpeg"); */
	background-image: url("/images/auth.jpeg");
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	background-attachment: fixed;
	width: 100%;
	height: 100vh;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
}

.brand-logo {
	text-align: center;
	margin-top: 50px;

}
.brand-logo img {
	width: 150px;
	height: 80px;
	margin-top: -30px;
}
.copy-right {
	text-align: center;
	top: auto;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
	padding: 20px;
	position: absolute;
	width: 100%;
	color: #fff;
	font-size: 14px;
	font-weight: 400;
}


#cursor {
	pointer-events: none;
	display: none;
	position: absolute;
	margin-top: -20px;
	margin-left: -20px;
	width: 30px;
	height: 30px;
	z-index: 3;
	background-color: rgba(255, 255, 255, 0.4);
	border-radius: 50%;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2), inset 0px 0px 10px rgba(255, 255, 255, 0.8);
}

*,
*:before,
*:after {
	-webkit-box-sizing: inherit;
	box-sizing: inherit;
}

#phone {
	width: 450px;
	height: 100vh !important;
	overflow: hidden;
	/* background-image: linear-gradient(to top, rgba(13, 60, 157, 0.7), rgba(18, 77, 198, 0.7),url("https://images.unsplash.com/photo-1508190163356-0569b6d34878?auto=format&fit=crop&w=2000&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D")); */
	background-image: linear-gradient(to top, rgba(13, 60, 157, 0.7), rgba(18, 77, 198, 0.9));
	background-size: cover;
	position: absolute;
	box-shadow: 0 10px 60px rgba(0, 0, 0, 0.25), 0 10px 20px rgba(0, 0, 0, 0.22);
}

#content-wrapper {
	width: 100%;
	height: 100%;
	position: relative;
}

h1 {
	font-size: 24px;
	font-weight: 800;
	text-align: center;
	margin-top: 0px;
}

.btn-sign {
	display: block;
	border-radius: 10px;
	border: none;
	width: 100%;
	background-color: #2069ff;
	color: #fff;
	padding: 15px;
	text-transform: uppercase;
	letter-spacing: 1px;
	box-shadow: 0px 10px 30px rgba(23, 83, 209, 0.3);
	transition: all 0.2s ease;
	font-weight: 700;
}

.btn-help {
	display: block;
	border-radius: 10px;
	border: none;
	width: 100%;
	background-color: #28a745;
	color: #fff;
	padding: 12px;
	text-transform: uppercase;
	box-shadow: 0px 10px 30px rgba(23, 83, 209, 0.3);
	transition: all 0.2s ease;
	font-size: 12px;
	font-weight: 700;
}

button:hover {
	box-shadow: 0px 2px 10px rgba(23, 83, 209, 0.4)
}

.input {
	position: relative;
	margin-top: 1.5rem;
}

.line-active {
	border-bottom: 1px solid #2069ff !important;
	box-shadow: 0px 1px 0px #2069ff !important;
}
.input select,
.input input {
	background-color: transparent;
	border: none;
	border-bottom: 1px solid #9e9e9e;
	border-radius: 0;
	outline: none;
	height: 2.5rem;
	width: 100%;
	font-size: 1rem;
	padding: 0;
	-webkit-box-shadow: none;
	box-shadow: none;
	box-sizing: content-box;
	transition: all 0.3s ease;
	/* color: #9e9e9e; */

}

.input label {
	/* color: #9e9e9e; */
	color: #000;
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	font-size: 1rem;
	cursor: text;
	transition: transform .2s ease-out;
	transform-origin: 0% 100%;
	text-align: initial;
	transform: translateY(12px);
	pointer-events: none;
}

.label-active {
	transform: translateY(-14px) scale(0.8) !important;
	transform-origin: 0 0 !important;
}

.label-blue {
	color: #2069ff !important;
}

[type="checkbox"]:not(:checked),
[type="checkbox"]:checked {
	position: absolute;
	opacity: 0;
	pointer-events: none;
}

[type="checkbox"]+label {
	position: relative;
	padding-left: 25px;
	cursor: pointer;
	display: inline-block;
	height: 25px;
	line-height: 22px;
	font-size: 1rem;
	user-select: none;
}

[type="checkbox"]+label:before,
[type="checkbox"]:not(.filled-in)+label:after {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 18px;
	height: 18px;
	z-index: 0;
	border: 2px solid #5a5a5a;
	border-radius: 3px;
	margin-top: 2px;
	transition: .2s;
}

[type="checkbox"]:not(.filled-in)+label:after {
	border: 0;
	transform: scale(0);
}

[type="checkbox"]:checked+label:before {
	top: -4px;
	left: -5px;
	width: 12px;
	height: 22px;
	border-top: 2px solid transparent;
	border-left: 2px solid transparent;
	border-right: 2px solid #2069ff;
	border-bottom: 2px solid #2069ff;
	transform: rotate(40deg);
	backface-visibility: hidden;
	transform-origin: 100% 100%;
	border-radius: 1px;
}

.checkbox {
	margin-top: 2rem;
	display: block;
	margin-bottom: 2rem;
}

.remember {
	float: left;
}

.forgot {
	float: right;
}

.forgot a {
	text-decoration: none;
	color: #000;
	font-weight: 900;
	line-height: 22px;
}

.card {
	border-radius: 10px;
	width: 90%;
	position: absolute;
	left: 5%;
	top: 0%;
	background-color: white;
	padding: 27px 30px 46px 30px;
	box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.16);
	transition: all 0.4s 0.1s ease;
	margin-top: -80px;
}

.card form {
	transform: translateX(0px);
	transition: all 0.3s 0.4s ease;
}

#login {
	z-index: 2;
	top: 128px;
}

#register {
	z-index: 2;
	top: 128px;
}

.account-check {
	width: 100%;
	text-align: center;
	position: absolute;
	bottom: 15px;
	left: 0;
	opacity: 0;
	text-decoration: none;
	visibility: hidden;
	color: #fff;
	padding: 10px;
	transition: all 0.2s ease;
}

.account-check:active {
	color: #000;
	transform: translateY(2px);
}

#register.hidden {
	top: 210px !important;
	z-index: 1;
}

#login.hidden {
	top: 310px !important;
	z-index: 1;
}

.card.hidden {
	background-color: #2069ff;
	box-shadow: 0px 20px 40px rgba(23, 83, 209, 0.8);
	padding: 0px 30px 0px 30px;

}

#register.hidden form {
	transform: translateX(20px);
}

#login.hidden form {
	transform: translateX(-20px);
}

.hidden form {
	opacity: 0;
	transition: all 0.3s ease;
}

.hidden .account-check {
	opacity: 1;
	visibility: visible;
	z-index: 2;
	transition: all 0.2s ease;
}

.register-swap {
	animation: register-swap 0.5s ease forwards;
}

.login-swap {
	animation: login-swap 0.5s ease forwards;
}

@keyframes register-swap {
	0% {
		transform: translate(0%; 0%)
	}

	50% {
		transform: translate(50%, 0%);
	}

	0% {
		transform: translate(0%; 0%)
	}
}

@keyframes login-swap {
	0% {
		transform: translate(0%; 0%)
	}

	50% {
		transform: translate(-50%, 0%);
	}

	0% {
		transform: translate(0%; 0%)
	}
}



</style>

<script>

export default {
	// middleware: "authenticated",
	layout: "authLayout",
	components: {
	},
	data() {
		return {
			email: "shantosr3559@gmail.com",
			password: "Shanto@cse82",
			showPassword: false,
			verify: true,
			register: false,
		};
	},
	methods: {
		verifyAccounts() {
			// alert("Verify Accounts");
			this.verify = false;
			this.register = true;
		},

	},
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

		// CARD SWAPPING
		$(".account-check").click(function () {
			$(".card").toggleClass("hidden");
			$("#register").removeClass("register-swap");
			$("#login").removeClass("login-swap");
			setTimeout(function () {
				$("#register").addClass("register-swap");
				$("#login").addClass("login-swap");
			}, 50);
		});






	}


}
</script>
