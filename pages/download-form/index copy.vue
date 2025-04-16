<template>

  <div>

    <div class="row">
      <div class="col-lg-4 col-md-4">
        <div class="glass-card">

          <a href="#?" class="btn">Research /Internship / Project / Thesis</a>
        </div>

      </div>

    </div>

  </div>

</template>



<style lang="scss" scoped>
.container {
  background: #fff;
}

.btn {
  display: inline-block; 
  text-align: center;
  width: 100%;
  padding: 1.222em 2em 1.111em 2em;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  color: #FFF;
  text-decoration: none;
  background: #2AB22E;
  transform: translate3d(0, 0, 0);
  transition: .1s background,
    .1s transform;

  &:hover {
    background: darken(#2AB22E, 5);
    // transform: translate3d(0, 8px, 0);
    margin-bottom: 1.5em;

    &:after,
    &:before {
      height: 0;
      background: darken(#2AB22E, 10);
    }
  }

  &:after,
  &:before {
    content: '';
    position: absolute;
    top: 100%;
    width: 50%;
    height: 8px;
    background: darken(#2AB22E, 5);
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

.glass-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 40px 20px;
  width: 100%;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  // box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
}
</style>
