<template>

  <div>

    <div class="row">
      <div class="col-lg-4 col-md-4 mb-4">
        <div class="button-card">
          <button type="button"  class="download-btn">Scholarship</button>
        </div>
      </div>
      <div class="col-lg-4 col-md-4 mb-4">
        <div class="button-card">
          <button type="button"  class="download-btn">Re-admission</button>
        </div>
      </div>
      <div class="col-lg-4 col-md-4 mb-4">
        <div class="button-card">
          <nuxt-link to="/download-form/bank-slip" class="download-btn"
          >Bank Slip</nuxt-link
        >
        </div>
      </div>

      <div class="col-lg-4 col-md-4 mb-4">
        <div class="button-card">
          <nuxt-link to="/download-form/bank-slip" class="download-btn"
          >Admit Card</nuxt-link
        >
        </div>
      </div>
      <div class="col-lg-4 col-md-4 mb-4">
        <div class="button-card">
          <nuxt-link to="/download-form/permission-for-exam" class="download-btn"
          >Permission For Exam</nuxt-link
        >
        </div>
      </div>
      <div class="col-lg-4 col-md-4 mb-4">
        <div class="button-card">
          <nuxt-link to="//download-form/mid-term-retake" class="download-btn"
          >Mid Term Retake</nuxt-link
        >
        </div>
      </div>
      <div class="col-lg-4 col-md-4 mb-4">
        <div class="button-card">
          <button type="button"  class="download-btn"> Provisional Certificate</button>
        </div>
      </div>

    </div>

  </div>

</template>



<style lang="scss" scoped>

.download-btn {
  display: inline-block; 
  text-align: center;
  width: 100%;
  padding: 1.222em 2em 1.111em 2em;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  color: #FFF;
  text-decoration: none;
  border: none;
  background: #28a745;
  transform: translate3d(0, 0, 0);
  transition: .1s background,
    .1s transform;

  &:hover {
    background: #28a745;
    color: #000;
    // transform: translate3d(0, 8px, 0);
    // margin-bottom: 1.5em;

   
  }

  &:after,
  &:before {
    content: '';
    position: absolute;
    top: 100%;
    width: 50%;
    height: 8px;
    background: #2AB22E;
    transition: .1s height,
      .1s background;
  }

  &:after {
    right: 0;
    transform: skewX(-45deg);
    transform-origin: 0 0;
  }

  &:before {
    left: 0;
    transform: skewX(45deg);
    transform-origin: 100% 0;
  }
}

.button-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px ;
  width: 100%;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  // box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
}
</style>
