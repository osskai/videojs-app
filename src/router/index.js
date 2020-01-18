import Vue from "vue";
import Router from "vue-router";
import AppHeader from "../layout/AppHeader";
import Components from "../views/Components";
import VideoPage from "../views/VideoPage";

Vue.use(Router);

export default new Router({
    linkExactActiveClass: "active",
    mode: "history",
    routes: [
        {
            path: "/",
            name: "components",
            components: {
                header: AppHeader,
                default: Components
            }
        },
        {
            path: "/video",
            name: "video",
            components: {
                header: AppHeader,
                default: VideoPage
            }
        },
    ],
    scrollBehavior: to => {
        if (to.hash) {
            return { selector: to.hash };
        } else {
            return { x: 0, y: 0 };
        }
    }
});
