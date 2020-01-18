import videojs from "video.js"
import StickyContent from "@/components/videoplugins/components/sticky-content";
import ExitButton from "@/components/videoplugins/components/exit-button";

let Component = videojs.getComponent("Component");
let StickyContainer = videojs.extend(Component, {
    constructor: function (player, options) {
        Component.apply(this, arguments);
    },
    createEl: function () {
        let container = videojs.dom.createEl('div',{
            className: 'vjs-sticky-container'
        });

        let content = new StickyContent(this.player_, {});
        container.appendChild(content.el());

        this.exitButton = new ExitButton(this.player_, {
            className: 'vjs-check-cancel'
        });
        container.appendChild(this.exitButton.el());

        return container
    },
    show: function() {
        if (this.player_.techName_ !== "Flash") {
            let techEl = this.player_.tech_.el();
            let playerEl = this.player_.el();
            techEl.style.clip = 'rect(0 0 ' + playerEl.offsetWidth + 'px' + playerEl.offsetHeight + 'px)';
            videojs.dom.addClass(techEl, 'vjs-blur');
        }

        this.player_.controlBar.el().style.opacity = '0';
        this.el_.style.opacity = '1';
    },
    hide: function () {
        let techEl = this.player_.tech_.el();
        techEl.style.clip = '';
        videojs.dom.removeClass(techEl, 'vjs-blur');
        this.player_.controlBar.el().style.opacity = '';
    },
    dispose: function () {
        this.hide();
    }
});

videojs.registerComponent("StickyContainer", StickyContainer);
export default StickyContainer;