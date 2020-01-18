import "@/assets/vendor/nucleo/css/nucleo.css";
import "@/assets/vendor/font-awesome/css/font-awesome.css";
import "@/assets/scss/argon.scss";
import globalDirectives from "./globalDirectives";
import VueLazyload from "vue-lazyload";
import globalComponents from "@/plugins/globalComponents";
require('video.js/dist/video-js.css');
require('videojs-contrib-ads/dist/videojs-contrib-ads.css');

import "../components/videoplugins/assets/_dotpostion.scss"
import "../components/videoplugins/assets/_socialoverlay.scss"
import "../components/videoplugins/assets/_dammu.scss"
import "../components/videoplugins/assets/_stickyparts.scss"
import "../components/videoplugins/utils/quizlib.scss"
import "../components/videoplugins/utils/tiptree.scss"
import "../components/videoplugins/assets/_resolutionswitcher.scss"
import "../components/videoplugins/assets/_setting.scss"

export default {
  install(Vue) {
    Vue.use(globalComponents);
    Vue.use(globalDirectives);
    Vue.use(VueLazyload);
  }
};
