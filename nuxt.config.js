const https = require('https');
module.exports = {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  // mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */

  buildModules: [
    '@nuxtjs/pwa',
    // '@nuxtjs/router',
    '@nuxtjs/moment'
  ],
  routerModule: {
    /* module options */
  }
  ,
  loadingIndicator: {
    name: '~/components/loading.vue',
    color: '#3B8070',
    background: 'white'
  },
  head: {
    title: 'Students Portal | DIU-Dhaka International University',

    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        hid: 'description',
        name: 'description',
        itemprop: 'description',
        content: 'Dhaka International University DIU is one of the leading, familiar and note-worthy private universities in Bangladesh which was established on 7th April 1995. It is a non-profitable institution having strict academic discipline'
      },
      {
        hid: 'keyword',
        name: 'keywords',
        itemprop: 'keywords',
        content: 'DIU, Dhaka International University, Dhaka, Dhaka International, University, Private Universities In Bangladesh, Universities In Bangladesh'
      },
      {name: 'author', content: 'DIU-Dhaka International University'},
    ],


    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.png'},
      // {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'},
      {rel: 'stylesheet', href: '/assets/vendors/css/vendor.bundle.base.css'},
      {rel: 'stylesheet', href: '/assets/vendors/font-awesome/css/font-awesome.min.css'},
      {rel: 'stylesheet', href: '/assets/css/vertical-light-layout/style.css'},
      {rel: 'stylesheet', href: '/assets/css/vertical-light-layout/welcome.css'},
      {rel: 'stylesheet', href: '/assets/css/vertical-light-layout/dashboard.css'},
      // { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/vue-multiselect@2.1.6/dist/vue-multiselect.min.css" },


    ],
    script: [
      {src: '/assets/vendors/js/vendor.bundle.base.js'},
      {src: '/assets/vendors/js/chart.js'},
      // {src: 'https://cdn.jsdelivr.net/npm/chart.js'},
      // {src: '/bootstrap/js/jquery-3.3.1.slim.min.js'},
      // { src: "https://cdn.jsdelivr.net/npm/vue-multiselect@2.1.6", defer: true },




    ],
  },
  router: {
    linkActiveClass: 'active',
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    "@nuxtjs/router",
    'cookie-universal-nuxt',
    '@nuxtjs/robots',
    ['nuxt-lazy-load', {
      defaultImage: '/images/loading.gif',
      directiveOnly: true
    }],
    ['vue-scrollto/nuxt', {
      duration: 500,
      easing: "ease",
      offset: 0,
      force: true,
      cancelable: true,
      onStart: false,
      onDone: false,
      onCancel: false,
      x: false,
      y: true
    }],
  ],

  // https://github.com/nuxt-community/robots-module
  robots: {
    UserAgent: '*',
    Allow: '/',
  },

  //axios
  axios: {
    init(axios, context) {
      axios.defaults.httpsAgent = new https.Agent({rejectUnauthorized: false});
    },
    headers: {'Access-Control-Allow-Origin': '*'},
    baseURL: 'https://api.diu.ac',
  },
  toast: {
    position: 'top-right',
    duration: 2000
  },
  generate: {
    fallback: true, // if you want to use '404.html' instead of the default '200.html'
  },

  // css: [
  //   // '@/assets/style/style.css'
  // ],

  plugins: [
    {src: '@/plugins/datepicker.js', ssr: false},
    {src: '@/plugins/vue-multiselect.js', ssr: false},
  ],

  pwa: {
    icon: true, // enable the icon module
    // source:'~/static/app_icon.png',
    manifest: {
      name: 'Students Portal - DIU',
      short_name: 'DIU Students',
      lang: 'en',
      description: 'Let it go! Let it go! Not saying let go of your education, but let go of the little stuff that tends to dictate whether or not you have a bad day in school. It\'s HARD to do when you\'re an adult, much less a kid.',
      display: 'standalone',
      background_color: '#18ac4f',
      useWebmanifestExtension: false
    },
    meta: {
      mobileAppIOS: true,
    }
  },

  server: {
    port: 3001,
    host: '0.0.0.0' // default: localhost
  },

  loading: {
    throttle: 0
  },

}
