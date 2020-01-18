import videojs from 'video.js'
import {TwitterShare, FacebookShare, LinkedInShare} from "@/components/videoplugins/components/overlay-social-button";
import ExitButton from "@/components/videoplugins/components/exit-button";

let Component = videojs.getComponent("Component");
let ShareContainer = videojs.extend(Component, {
    constructor: function (player, options) {
        Component.apply(this, arguments);
        this.exitButton = this.addChild("ExitButton", {
            className: "vjs-social-cancel"
        });
    },
    createEl: function () {
        let overlay = videojs.dom.createEl('div', {
            className: 'vjs-sharing-overlay',
        });
        // let exitButton = new ExitButton(this.player_, {});
        // overlay.appendChild(exitButton.el());

        let container = videojs.dom.createEl('div', {
            className: 'vjs-sharing-container'
        });
        let twitter = new TwitterShare(this.player_, {
            icon: 'twitter',
            text: 'Twitter'
        });
        let facebook = new FacebookShare(this.player_, {
            icon: 'facebook',
            text: 'Facebook'
        });
        let linkedin = new LinkedInShare(this.player_, {
            icon: 'linkedin',
            text: 'LinkedIn'
        });
        container.appendChild(twitter.el());
        container.appendChild(facebook.el());
        container.appendChild(linkedin.el());

        overlay.appendChild(container);

        return overlay
    },
    show: function () {
        this.el_.style.display = 'table';
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

videojs.registerComponent("ShareContainer", ShareContainer);
export default ShareContainer;